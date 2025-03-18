/**
 * JSON schemas for the TypeScript API MCP server tools.
 * Updated to support name, id, names array, or ids array parameters.
 */

/**
 * Base schema for handlers that accept name, id, names array, or ids array.
 */
const BASE_SYMBOL_PARAMS_SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Symbol name',
    },
    id: {
      type: 'number',
      description: 'Symbol ID',
    },
    names: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'Array of symbol names',
    },
    ids: {
      type: 'array',
      items: {
        type: 'number',
      },
      description: 'Array of symbol IDs',
    },
  },
  oneOf: [
    { required: ['name'] },
    { required: ['id'] },
    { required: ['names'] },
    { required: ['ids'] },
  ],
};

/**
 * Schema for the search_symbols tool.
 */
export const SEARCH_SYMBOLS_SCHEMA = {
  type: 'object',
  properties: {
    query: {
      type: 'string',
      description: 'Search query',
    },
    kind: {
      type: 'string',
      description: 'Filter by kind (class, interface, function, enum, etc.)',
      enum: ['class', 'interface', 'function', 'enum', 'type', 'property', 'method', 'any'],
    },
    limit: {
      type: 'number',
      description: 'Maximum number of results to return',
    },
  },
  required: ['query'],
};

/**
 * Schema for the get_symbol_details tool.
 */
export const GET_SYMBOL_DETAILS_SCHEMA = BASE_SYMBOL_PARAMS_SCHEMA;

/**
 * Schema for the list_members tool.
 */
export const LIST_MEMBERS_SCHEMA = {
  ...BASE_SYMBOL_PARAMS_SCHEMA,
  properties: {
    ...BASE_SYMBOL_PARAMS_SCHEMA.properties,
    includeInherited: {
      type: 'boolean',
      description: 'Whether to include inherited members',
    },
  },
};

/**
 * Schema for the get_parameter_info tool.
 */
export const GET_PARAMETER_INFO_SCHEMA = BASE_SYMBOL_PARAMS_SCHEMA;

/**
 * Schema for the find_implementations tool.
 */
export const FIND_IMPLEMENTATIONS_SCHEMA = BASE_SYMBOL_PARAMS_SCHEMA;

/**
 * Schema for the search_by_return_type tool.
 */
export const SEARCH_BY_RETURN_TYPE_SCHEMA = {
  type: 'object',
  properties: {
    typeName: {
      type: 'string',
      description: 'Return type name',
    },
  },
  required: ['typeName'],
};

/**
 * Schema for the search_by_description tool.
 */
export const SEARCH_BY_DESCRIPTION_SCHEMA = {
  type: 'object',
  properties: {
    query: {
      type: 'string',
      description: 'Search query',
    },
  },
  required: ['query'],
};

/**
 * Schema for the get_type_hierarchy tool.
 */
export const GET_TYPE_HIERARCHY_SCHEMA = BASE_SYMBOL_PARAMS_SCHEMA;

/**
 * Schema for the find_usages tool.
 */
export const FIND_USAGES_SCHEMA = BASE_SYMBOL_PARAMS_SCHEMA;

/**
 * All tool definitions for the TypeScript API MCP server.
 */
export const TOOL_DEFINITIONS = [
  {
    name: 'search_symbols',
    description: 'Search for symbols by name or partial name',
    inputSchema: SEARCH_SYMBOLS_SCHEMA,
  },
  {
    name: 'get_symbol_details',
    description: 'Get detailed information about specific symbols by name, ID, or arrays of either',
    inputSchema: GET_SYMBOL_DETAILS_SCHEMA,
  },
  {
    name: 'list_members',
    description: 'List all methods and properties of classes or interfaces by name, ID, or arrays of either',
    inputSchema: LIST_MEMBERS_SCHEMA,
  },
  {
    name: 'get_parameter_info',
    description: 'Get detailed information about function parameters by function name, ID, or arrays of either',
    inputSchema: GET_PARAMETER_INFO_SCHEMA,
  },
  {
    name: 'find_implementations',
    description: 'Find all implementations of interfaces or subclasses of classes by name, ID, or arrays of either',
    inputSchema: FIND_IMPLEMENTATIONS_SCHEMA,
  },
  {
    name: 'search_by_return_type',
    description: 'Find functions or methods that return a specific type',
    inputSchema: SEARCH_BY_RETURN_TYPE_SCHEMA,
  },
  {
    name: 'search_by_description',
    description: 'Search JSDoc comments for specific terms',
    inputSchema: SEARCH_BY_DESCRIPTION_SCHEMA,
  },
  {
    name: 'get_type_hierarchy',
    description: 'Show inheritance/implementation relationships for types by name, ID, or arrays of either',
    inputSchema: GET_TYPE_HIERARCHY_SCHEMA,
  },
  {
    name: 'find_usages',
    description: 'Find where types/functions are used within the API by name, ID, or arrays of either',
    inputSchema: FIND_USAGES_SCHEMA,
  },
];

/**
 * All resource definitions for the TypeScript API MCP server.
 */
export const RESOURCE_DEFINITIONS = [
  {
    uri: 'api://overview',
    name: 'API Overview',
    mimeType: 'application/json',
    description: 'Overview of the TypeScript API',
  },
];

/**
 * All resource template definitions for the TypeScript API MCP server.
 */
export const RESOURCE_TEMPLATE_DEFINITIONS = [
  {
    uriTemplate: 'api://symbol/{symbolName}',
    name: 'Symbol Details',
    mimeType: 'application/json',
    description: 'Details about a specific symbol in the API',
  },
  {
    uriTemplate: 'api://search/{query}',
    name: 'Search Results',
    mimeType: 'application/json',
    description: 'Search results for a query',
  },
];
