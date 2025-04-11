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

/**
 * All resource definitions for the TypeScript API MCP server.
 */
export const RESOURCE_DEFINITIONS = [
  {
    uri: "api://overview",
    name: "API Overview",
    mimeType: "text",
    description: "Overview of the TypeScript API",
  },
];

/**
 * All resource template definitions for the TypeScript API MCP server.
 */
export const RESOURCE_TEMPLATE_DEFINITIONS = [
  {
    uriTemplate: new UriTemplate("api://symbol/{symbolNameOrId}"),
    name: "Symbol Details",
    mimeType: "text",
    description: "Details about a specific symbol (by name or ID) in the API",
  },
  {
    uriTemplate: new UriTemplate("api://search/{query}"),
    name: "Search Results",
    mimeType: "text",
    description: "Search results for a query",
  },
  {
    uriTemplate: new UriTemplate("api://doc/{id}{?pageOffset}"),
    name: "Load Documentation",
    mimeType: "text",
    description:
      "Loads a documentation page by ID. `pageOffset` is an optional pagination parameter.",
  },
  {
    uriTemplate: new UriTemplate("api://doc/{id}/{section}{?pageOffset}"),
    name: "Load a Section of a Documentation",
    mimeType: "text",
    description:
      "Loads a a section from a documentation page by ID. `pageOffset` is an optional pagination parameter . Section is the slug of the header.",
  },
] satisfies ReadonlyArray<{
  uriTemplate: UriTemplate;
  name: string;
  mimeType: "text";
  description: string;
}>;
