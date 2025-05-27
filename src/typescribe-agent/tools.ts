import { tool } from "@langchain/core/tools";
import { loadApiDocs, TypeScriptApiHandlers } from "../mcp-server/index.js";
import {
  DOCUMENTATION_SECTION_RESOURCE_TEMPLATE_DEFINITION,
  GET_API_OVERVIEW_DEFINITION,
  GET_SYMBOL_RESOURCE_TEMPLATE_DEFINITION,
} from "../mcp-server/index.js";
import { z } from "zod";
import { stringify } from "../mcp-server/index.js";
import { schemas } from "../mcp-server/index.js";
import { JSONSchema } from "@langchain/core/utils/json_schema";

/**
 * Creates a collection of tools for interacting with the TypeScript API,
 * including retrieving API overviews, documentation, symbol details, and
 * performing various searches or operations on the API.
 *
 * @param fileOrApiHandler - The path to the file containing the TypeDoc
 * API JSON to be loaded. Alternatively, an instance of
 * {@link TypeScriptApiHandlers} can be passed (see {@link loadApiDocs}).
 * @param prefix - An optional prefix to be applied to tool names for namespacing.
 * @return An array of tools, each corresponding to a specific API functionality,
 * such as retrieving overviews, fetching documentation, or performing
 * symbol-related queries.
 */
export function createTools(
  fileOrApiHandler: string | TypeScriptApiHandlers,
  prefix: string = "",
) {
  let apiHandler =
    typeof fileOrApiHandler === "string" ? undefined : fileOrApiHandler;
  async function getApiHandler(): Promise<TypeScriptApiHandlers> {
    return (apiHandler ??= await loadApiDocs(fileOrApiHandler as string));
  }

  const getApiOverview = tool(
    async () => {
      return stringify((await getApiHandler()).getApiOverview());
    },
    {
      name: prefix + "get_api_overview",
      description: GET_API_OVERVIEW_DEFINITION.description,
      schema: z.object({}),
    },
  );

  const getDocumentation = tool(
    async ({ id, pageOffset, sectionTitle }) => {
      return (await getApiHandler()).handleGetDocumentation(
        id,
        pageOffset ?? undefined,
        sectionTitle ?? undefined,
      );
    },
    {
      description:
        "Endpoint for retrieving documentation for urls in the documentation of the shape api://doc/{id}/{section}{?pageOffset}. Do not guess IDs or title sections. Do not pass symbol ids, only document IDs. This works for loading documentation referenced as URLs from within the documentation of the shape " +
        DOCUMENTATION_SECTION_RESOURCE_TEMPLATE_DEFINITION.uriTemplate.toString(),
      name: prefix + "get_documentation",
      schema: z.object({
        id: z
          .number()
          .describe(
            "The id of the document to load. Get this from the parsed URL. Do not guess it.",
          ),
        pageOffset: z
          .number()
          .nullable()
          .describe("An optional page offset for pagination."),
        sectionTitle: z
          .string()
          .nullable()
          .describe(
            "The optional slug of the title section to load. Get this from the parsed URL. Do not guess it.",
          ),
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
        "Endpoint for getting API symbol details. Pass in symbol ids or names of symbols. Other endpoints will return or list symbol IDs as pure data in text or in the form of URLs of the shape " +
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
