/**
 * JSON schemas for the TypeScript API MCP server tools.
 * Updated to support name, id, names array, or ids array parameters.
 */
import { schemas } from "../types/index.js";
import { JsonSchema7Type, zodToJsonSchema } from "zod-to-json-schema";
import { UriTemplate } from "@modelcontextprotocol/sdk/shared/uriTemplate.js";

/**
 * All tool definitions for the TypeScript API MCP server.
 */
export const TOOL_DEFINITIONS: ToolType[] = Object.entries(schemas).map(
  (value) =>
    ({
      name: value[0],
      description: value[1].description,
      inputSchema: zodToJsonSchema(value[1]),
    }) as ToolType,
);

type ToolType = {
  name: string;
  description: string;
  inputSchema: JsonSchema7Type;
};

export const GET_API_OVERVIEW_DEFINITION = {
  uri: "api://overview",
  name: "API Overview",
  mimeType: "text",
  description:
    "Provides an overview of the TypeScript API. Along with a list of all symbols and documentation entries.",
} as const;
/**
 * All resource definitions for the TypeScript API MCP server.
 */
export const RESOURCE_DEFINITIONS = [GET_API_OVERVIEW_DEFINITION];

export const GET_SYMBOL_RESOURCE_TEMPLATE_DEFINITION = {
  uriTemplate: new UriTemplate("api://symbol/{symbolNameOrId}"),
  name: "Symbol Details",
  mimeType: "text",
  description: "Details about a specific symbol (by name or ID) in the API",
} as const satisfies ResourceTemplateDefinition;

export type ResourceTemplateDefinition = {
  uriTemplate: UriTemplate;
  name: string;
  mimeType: "text";
  description: string;
};

export const SEARCH_RESOURCE_TEMPLATE_DEFINITION = {
  uriTemplate: new UriTemplate("api://search/{query}"),
  name: "Search Results",
  mimeType: "text",
  description: "Search results for a query",
} as const satisfies ResourceTemplateDefinition;

export const DOCUMENTATION_RESOURCE_TEMPLATE_DEFINITION = {
  uriTemplate: new UriTemplate("api://doc/{id}{?pageOffset}"),
  name: "Load Documentation",
  mimeType: "text",
  description:
    "Loads a documentation page by ID. `pageOffset` is an optional pagination parameter.",
} as const satisfies ResourceTemplateDefinition;

export const DOCUMENTATION_SECTION_RESOURCE_TEMPLATE_DEFINITION = {
  uriTemplate: new UriTemplate("api://doc/{id}/{section}{?pageOffset}"),
  name: "Load a Section of a Documentation",
  mimeType: "text",
  description:
    "Loads a a section from a documentation page by ID. `pageOffset` is an optional pagination parameter . Section is the slug of the header.",
} as const satisfies ResourceTemplateDefinition;

/**
 * All resource template definitions for the TypeScript API MCP server.
 */
export const RESOURCE_TEMPLATE_DEFINITIONS: ReadonlyArray<ResourceTemplateDefinition> =
  [
    GET_SYMBOL_RESOURCE_TEMPLATE_DEFINITION,
    DOCUMENTATION_RESOURCE_TEMPLATE_DEFINITION,
    DOCUMENTATION_SECTION_RESOURCE_TEMPLATE_DEFINITION,
  ];
