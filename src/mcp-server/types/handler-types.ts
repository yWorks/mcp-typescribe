/**
 * Handler-related type definitions for the TypeScript API MCP server.
 */

import { SymbolInfo, ParameterInfo, TypeHierarchy, ApiOverview } from './api-types.js';

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
  kind?: string;
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

/**
 * Base interface for handler responses.
 */
export interface HandlerResponse<T> {
  content: {
    type: string;
    text: string;
  }[];
  isError?: boolean;
}

/**
 * Response for the search_symbols handler.
 */
export type SearchSymbolsResponse = HandlerResponse<SymbolInfo[]>;

/**
 * Response for the get_symbol_details handler.
 */
export type GetSymbolDetailsResponse = HandlerResponse<SymbolInfo>;

/**
 * Response for the list_members handler.
 */
export type ListMembersResponse = HandlerResponse<SymbolInfo[]>;

/**
 * Response for the get_parameter_info handler.
 */
export type GetParameterInfoResponse = HandlerResponse<ParameterInfo[]>;

/**
 * Response for the find_implementations handler.
 */
export type FindImplementationsResponse = HandlerResponse<SymbolInfo[]>;

/**
 * Response for the search_by_return_type handler.
 */
export type SearchByReturnTypeResponse = HandlerResponse<SymbolInfo[]>;

/**
 * Response for the search_by_description handler.
 */
export type SearchByDescriptionResponse = HandlerResponse<SymbolInfo[]>;

/**
 * Response for the get_type_hierarchy handler.
 */
export type GetTypeHierarchyResponse = HandlerResponse<TypeHierarchy>;

/**
 * Response for the find_usages handler.
 */
export type FindUsagesResponse = HandlerResponse<SymbolInfo[]>;
