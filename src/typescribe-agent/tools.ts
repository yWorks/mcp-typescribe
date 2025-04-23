import { tool } from "@langchain/core/tools";
import {
  loadApiDocs,
  TypeScriptApiHandlers,
} from "../mcp-server/core/typescript-api-handlers.js";
import {
  GET_API_OVERVIEW_DEFINITION,
  GET_SYMBOL_RESOURCE_TEMPLATE_DEFINITION,
  DOCUMENTATION_SECTION_RESOURCE_TEMPLATE_DEFINITION,
} from "../mcp-server/schemas/tool-schemas.js";
import { z } from "zod";
import { stringify } from "../mcp-server/utils/format-utils.js";
import { schemas } from "../mcp-server/types/index.js";
import { JSONSchema } from "@langchain/core/utils/json_schema";

export function createTools(file: string, prefix: string = "") {
  let apiHandler: TypeScriptApiHandlers | undefined;

  async function getApiHandler(): Promise<TypeScriptApiHandlers> {
    return (apiHandler ??= await loadApiDocs(file));
  }

  const getApiOverview = tool(
    async () => {
      return stringify((await getApiHandler()).getApiOverview());
    },
    {
      name: prefix + "get_api_overview",
      description: GET_API_OVERVIEW_DEFINITION.description,
    },
  );

  const getDocumentation = tool(
    async ({ id, pageOffset, sectionTitle }) => {
      return (await getApiHandler()).handleGetDocumentation(
        id,
        pageOffset,
        sectionTitle,
      );
    },
    {
      description:
        "Endpoint for loading documentation files. Do not pass symbol ids. This works for loading documentation referenced as URLs from within the documentation of the shape " +
        DOCUMENTATION_SECTION_RESOURCE_TEMPLATE_DEFINITION.uriTemplate.toString(),
      name: prefix + "get_documentation",
      schema: z.object({
        id: z.number().describe("The id of the document to load"),
        pageOffset: z
          .number()
          .optional()
          .describe("An optional page offset for pagination."),
        sectionTitle: z
          .string()
          .optional()
          .describe("The optional slug of the title section to load."),
      }),
    },
  );

  const getSymbolDetails = tool(
    async (params) => {
      return stringify((await getApiHandler()).handleGetSymbolDetails(params));
    },
    {
      name: prefix + "get_symbol_details",
      description:
        "Endpoint for getting API symbol details. Pass in symbol ids or names. Other endpoints will return or list symbol IDs as pure data in text or in the form of URLs of the shape " +
        GET_SYMBOL_RESOURCE_TEMPLATE_DEFINITION.uriTemplate.toString(),
      schema: schemas.get_symbol_details,
    },
  );

  const mapping = [
    {
      entry: "find_implementations",
      name: "Find API Symbol Implementation",
      target: "handleFindImplementations",
    },
    {
      entry: "list_members",
      name: "List API Symbol Members",
      target: "handleListMembers",
    },
    {
      entry: "find_usages",
      name: "Find API Symbol Usages",
      target: "handleFindUsages",
    },
    {
      entry: "get_type_hierarchy",
      name: "Show API Type Hierarchy",
      target: "handleGetTypeHierarchy",
    },
    {
      entry: "search_by_return_type",
      name: "Search API By Return Type",
      target: "handleSearchByReturnType",
    },
    {
      entry: "search_by_description",
      name: "Search API By Description",
      target: "handleSearchByDescription",
    },
    {
      entry: "search_symbols",
      name: "Search API Symbols",
      target: "handleSearchSymbols",
    },
  ] satisfies {
    entry: keyof typeof schemas & string;
    name: string;
    target: keyof TypeScriptApiHandlers;
  }[];

  const tools = mapping.map((schema) => {
    return tool<JSONSchema>(
      async (params) => {
        return stringify(
          await (
            await getApiHandler()
          )[schema.target](params as unknown as never),
        );
      },
      {
        name: prefix + schema.entry,
        schema: schemas[schema.entry],
      },
    );
  });

  return [getApiOverview, getDocumentation, getSymbolDetails, ...tools];
}
