/**
 * API-related type definitions for the TypeScript API MCP server.
 */

import { ReflectionKind } from "typedoc";

/**
 * Represents a simplified symbol for API responses.
 * LLM-friendly format without metadata like sources.
 */
export interface SymbolInfo {
  id?: number;
  name: string;
  kind?: ReflectionKind.KindString | string;
  description?: string;
  parentName?: string;
  inherited?: boolean;
  inheritedFrom?: string;
  children?: SymbolInfo[];
  relationship?: "extends" | "implements";
}

/**
 * Represents a parameter of a function or method.
 * LLM-friendly format without metadata like sources.
 */
export interface ParameterInfo {
  id?: number;
  name: string;
  type: string;
  description?: string;
  optional: boolean;
  defaultValue?: string;
}

/**
 * Represents a type hierarchy.
 * LLM-friendly format without metadata like sources.
 */
export interface TypeHierarchy extends SymbolInfo {
  extends?: TypeHierarchy[];
  implements?: TypeHierarchy[];
  implementedBy?: SymbolInfo[];
  extendedBy?: SymbolInfo[];
}

/**
 * Represents an API overview.
 * LLM-friendly format without metadata like sources.
 */
export interface ApiOverview {
  name: string;
  totalSymbols: number;
  countByKind: Record<string, number>;
  topLevelSymbols: SymbolInfo[];
}
