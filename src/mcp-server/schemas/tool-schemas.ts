/**
 * JSON schemas for the TypeScript API MCP server tools.
 * Updated to support name, id, names array, or ids array parameters.
 */
import { schemas } from "../types/index.js";
import { JsonSchema7Type, zodToJsonSchema } from "zod-to-json-schema";

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
    uriTemplate: "api://symbol/{symbolNameOrId}",
    name: "Symbol Details",
    mimeType: "text",
    description: "Details about a specific symbol (by name or ID) in the API",
  },
  {
    uriTemplate: "api://search/{query}",
    name: "Search Results",
    mimeType: "text",
    description: "Search results for a query",
  },
];
