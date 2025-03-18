/**
 * Handler-related type definitions for the TypeScript API MCP server.
 */

import {ReflectionKind} from "typedoc";

/**
 * Base interface for handler parameters that can accept name, id, or arrays of either.
 */
export interface BaseHandlerParams {
  name?: string;
  id?: number;
  names?: string[];
  ids?: number[];
}

/**
 * Parameters for the search_symbols handler.
 */
export interface SearchSymbolsParams {
  query: string;
  kind?: keyof ReflectionKind | "any";
  limit?: number;
}

/**
 * Parameters for the get_symbol_details handler.
 */
export interface GetSymbolDetailsParams extends BaseHandlerParams {}

/**
 * Parameters for the list_members handler.
 */
export interface ListMembersParams extends BaseHandlerParams {
  includeInherited?: boolean;
}

/**
 * Parameters for the get_parameter_info handler.
 */
export interface GetParameterInfoParams extends BaseHandlerParams {}

/**
 * Parameters for the find_implementations handler.
 */
export interface FindImplementationsParams extends BaseHandlerParams {}

/**
 * Parameters for the search_by_return_type handler.
 */
export interface SearchByReturnTypeParams {
  typeName: string;
}

/**
 * Parameters for the search_by_description handler.
 */
export interface SearchByDescriptionParams {
  query: string;
}

/**
 * Parameters for the get_type_hierarchy handler.
 */
export interface GetTypeHierarchyParams extends BaseHandlerParams {}

/**
 * Parameters for the find_usages handler.
 */
export interface FindUsagesParams extends BaseHandlerParams {}
