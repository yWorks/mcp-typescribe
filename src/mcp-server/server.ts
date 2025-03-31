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
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { TypeScriptApiHandlers } from "./core/index.js";
import {
  RESOURCE_DEFINITIONS,
  RESOURCE_TEMPLATE_DEFINITIONS,
  TOOL_DEFINITIONS,
} from "./schemas/index.js";
import { schemas } from "./types/index.js";
import { createHandlerResponse } from "./utils/index.js";
import { JSONOutput } from "typedoc";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * TypeScript API Documentation MCP Server
 *
 * This server loads TypeDoc JSON documentation and provides endpoints for querying
 * TypeScript API information.
 */
export class TypeScriptApiServer {
  private server: Server;
  private handlers: TypeScriptApiHandlers | null = null;

  constructor() {
    this.server = new Server(
      {
        name: "typescript-api-server",
        version: "0.1.0",
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
   * Loads the TypeDoc JSON documentation and initializes handlers.
   *
   * @param filePath - Path to the TypeDoc JSON file
   */
  async loadApiDocs(filePath: string): Promise<void> {
    try {
      const docsPath = path.resolve(__dirname, "../../", filePath);
      const data = await fs.readFile(docsPath, "utf-8");
      const apiDocs = JSON.parse(data) as JSONOutput.ProjectReflection;

      // Initialize handlers
      this.handlers = new TypeScriptApiHandlers(apiDocs);

      console.error(`Loaded API documentation with symbols`);
    } catch (error) {
      console.error("Failed to load API documentation:", error);
      throw error;
    }
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
        resourceTemplates: RESOURCE_TEMPLATE_DEFINITIONS,
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
                mimeType: "application/json",
                text: JSON.stringify(handlers.getApiOverview(), null, 2),
              },
            ],
          };
        }

        // Handle symbol details
        const symbolMatch = uri.match(/^api:\/\/symbol\/(.+)$/);
        if (symbolMatch) {
          const symbolName = decodeURIComponent(symbolMatch[1]);
          const results = handlers.searchSymbols(symbolName);

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
                mimeType: "application/json",
                text: JSON.stringify(results[0], null, 2),
              },
            ],
          };
        }

        // Handle search
        const searchMatch = uri.match(/^api:\/\/search\/(.+)$/);
        if (searchMatch) {
          const query = decodeURIComponent(searchMatch[1]);
          const results = handlers.searchSymbols(query);

          return {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify(results, null, 2),
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

      function switchHandlers() {
        switch (name) {
          case "search_symbols":
            return handlers.handleSearchSymbols(
              schemas.searchSymbolsSchema.parse(args),
            );
          case "get_symbol_details":
            return handlers.handleGetSymbolDetails(
              schemas.getSymbolDetailsSchema.parse(args),
            );
          case "list_members":
            return handlers.handleListMembers(
              schemas.listMembersSchema.parse(args),
            );
          case "get_parameter_info":
            return handlers.handleGetParameterInfo(
              schemas.getParameterInfoSchema.parse(args),
            );
          case "find_implementations":
            return handlers.handleFindImplementations(
              schemas.findImplementationsSchema.parse(args),
            );
          case "search_by_return_type":
            return handlers.handleSearchByReturnType(
              schemas.searchByReturnTypeSchema.parse(args),
            );
          case "search_by_description":
            return handlers.handleSearchByDescription(
              schemas.searchByDescriptionSchema.parse(args),
            );
          case "get_type_hierarchy":
            return handlers.handleGetTypeHierarchy(
              schemas.getTypeHierarchySchema.parse(args),
            );
          case "find_usages":
            return handlers.handleFindUsages(
              schemas.findUsagesSchema.parse(args),
            );
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`,
            );
        }
      }

      return createHandlerResponse(switchHandlers());
    });
  }

  /**
   * Initializes the server by setting up handlers and connecting to the transport.
   *
   * @param docsPath - Path to the TypeDoc JSON file
   */
  async initialize(docsPath: string): Promise<void> {
    await this.loadApiDocs(docsPath);
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
