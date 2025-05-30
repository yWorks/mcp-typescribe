import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { loadApiDocs, TypeScriptApiHandlers } from "./core/index.js";
import {
  RESOURCE_DEFINITIONS,
  RESOURCE_TEMPLATE_DEFINITIONS,
  TOOL_DEFINITIONS,
} from "./schemas/index.js";
import { schemas } from "./types/index.js";
import { createHandlerResponse, stringify } from "./utils/index.js";

/**
 * TypeScript API Documentation MCP Server
 *
 * This server loads TypeDoc JSON documentation and provides endpoints for querying
 * TypeScript API information.
 */
export class TypescribeServer {
  private server: Server;
  private handlers: TypeScriptApiHandlers | null = null;

  constructor() {
    this.server = new Server(
      {
        name: "typescribe-api-server",
        version: "0.2.0",
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      },
    );

    // Error handling
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  /**
   * Sets up resource handlers for the MCP server.
   */
  private setupResourceHandlers(): void {
    if (!this.handlers) {
      throw new Error("Handlers not initialized. Call loadApiDocs first.");
    }

    const handlers = this.handlers; // Create a local reference to avoid null checks

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: RESOURCE_DEFINITIONS,
    }));

    // Define resource templates
    this.server.setRequestHandler(
      ListResourceTemplatesRequestSchema,
      async () => ({
        resourceTemplates: RESOURCE_TEMPLATE_DEFINITIONS.map((template) => ({
          ...template,
          uriTemplate: template.uriTemplate.toString(),
        })),
      }),
    );

    // Handle resource requests
    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      async (request) => {
        const { uri } = request.params;

        // Handle overview resource
        if (uri === "api://overview") {
          return {
            contents: [
              {
                uri,
                mimeType: "text",
                text: stringify(handlers.getApiOverview()),
              },
            ],
          };
        }

        // Handle symbol details
        const symbolMatch = uri.match(/^api:\/\/symbol\/(.+)$/);
        if (symbolMatch) {
          const symbolName = decodeURIComponent(symbolMatch[1]);
          const results = await handlers.searchSymbols(symbolName);

          if (results.length === 0) {
            throw new McpError(
              ErrorCode.InvalidRequest,
              `Symbol '${symbolName}' not found`,
            );
          }

          return {
            contents: [
              {
                uri,
                mimeType: "text",
                text: stringify(results),
              },
            ],
          };
        }

        // Handle search
        const searchMatch =
          RESOURCE_TEMPLATE_DEFINITIONS[0].uriTemplate.match(uri);
        if (searchMatch) {
          const query = searchMatch.query as string;
          let results;
          if (query.length > 0 && !isNaN(Number(query))) {
            results = handlers.handleGetSymbolDetails({ id: Number(query) });
          } else {
            results = handlers.handleGetSymbolDetails({ name: query });
          }

          return {
            contents: [
              {
                uri,
                mimeType: "text",
                text: stringify(results),
              },
            ],
          };
        }

        // handle documentation lookup api://doc/75634?pageOffset=1
        const docMatch = /api:\/\/doc\/(\d+)(?:\?pageOffset=(\d+))?/.exec(uri);

        if (docMatch) {
          const [, id, pageOffset] = docMatch;
          const results = await handlers.handleGetDocumentation(
            parseInt((id as string) ?? "-1", 10),
            parseInt((pageOffset as string) ?? "0", 10),
          );
          return {
            contents: [
              {
                uri,
                mimeType: "text", // application/yaml
                text: stringify(results),
              },
            ],
          };
        }

        // handle documentation lookup
        const docSectionMatch =
          /api:\/\/doc\/(\d+)\/([^?]+)(?:\?pageOffset=(\d+))?/.exec(uri);
        if (docSectionMatch) {
          const [, id, pageOffset, section] = docSectionMatch;
          const results = await handlers.handleGetDocumentation(
            parseInt((id as string) ?? "-1", 10),
            parseInt((pageOffset as string) ?? "0", 10),
            section as string | undefined,
          );
          return {
            contents: [
              {
                uri,
                mimeType: "text", // application/yaml
                text: stringify(results),
              },
            ],
          };
        }

        throw new McpError(
          ErrorCode.InvalidRequest,
          `Invalid URI format: ${uri}`,
        );
      },
    );
  }

  /**
   * Sets up tool handlers for the MCP server.
   */
  private setupToolHandlers(): void {
    if (!this.handlers) {
      throw new Error("Handlers not initialized. Call loadApiDocs first.");
    }

    const handlers = this.handlers; // Create a local reference to avoid null checks

    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: TOOL_DEFINITIONS,
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      async function switchHandlers() {
        switch (name) {
          case "search_symbols":
            return await handlers.handleSearchSymbols(
              schemas.search_symbols.parse(args),
            );
          case "get_symbol_details":
            return handlers.handleGetSymbolDetails(
              schemas.get_symbol_details.parse(args),
            );
          case "list_members":
            return handlers.handleListMembers(schemas.list_members.parse(args));
          case "get_parameter_info":
            return handlers.handleGetParameterInfo(
              schemas.get_parameter_info.parse(args),
            );
          case "find_implementations":
            return handlers.handleFindImplementations(
              schemas.find_implementations.parse(args),
            );
          case "search_by_return_type":
            return handlers.handleSearchByReturnType(
              schemas.search_by_return_type.parse(args),
            );
          case "search_by_description":
            return handlers.handleSearchByDescription(
              schemas.search_by_description.parse(args),
            );
          case "get_type_hierarchy":
            return handlers.handleGetTypeHierarchy(
              schemas.get_type_hierarchy.parse(args),
            );
          case "find_usages":
            return handlers.handleFindUsages(schemas.find_usages.parse(args));
          default:
        }
      }

      return createHandlerResponse(await switchHandlers());
    });
  }

  /**
   * Initializes the server by setting up handlers and connecting to the transport.
   *
   * @param docsPath - Path to the TypeDoc JSON file
   */
  async initialize(docsPath: string): Promise<void> {
    this.handlers = await loadApiDocs(docsPath);
    this.setupResourceHandlers();
    this.setupToolHandlers();
  }

  /**
   * Runs the server.
   */
  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("TypeScript API MCP server running on stdio");
  }
}
