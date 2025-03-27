/**
 * Utility functions for working with TypeDoc symbols.
 */

import {TypeDocSymbol, SymbolInfo, TypeDocType} from '../types/index.js';
import {getKindName} from "../utils.js";

import type {JSONOutput } from "typedoc";

type ProjectReflection = JSONOutput.ProjectReflection;
type DeclarationReflection = JSONOutput.DeclarationReflection;
type ContainerReflection = JSONOutput.ContainerReflection;
type ReflectionGroup = JSONOutput.ReflectionGroup;
type Reflection = JSONOutput.Reflection;

/**
 * Gets the description of a symbol from its comment.
 * 
 * @param symbol - The symbol
 * @returns The description
 */
export function getDescription(symbol: Reflection): string {
  if (!symbol.comment) return '';
  
  if (symbol.comment.summary) {
    return symbol.comment.summary
      .map(part => part.text)
      .join('')
      .trim();
  }
  
  return '';
}

/**
 * Creates a simplified symbol info object from a TypeDoc symbol.
 * Formats the output to be LLM-friendly by removing metadata like sources.
 * 
 * @param symbol - The TypeDoc symbol
 * @returns The simplified symbol info
 */
export function createSymbolInfo(symbol: DeclarationReflection): SymbolInfo {
  return {
    name: symbol.name,
    kind: getKindName(symbol.kind),
    description: getDescription(symbol),
  };
}

/**
 * Gets symbols by name, id, names array, or ids array.
 * 
 * @param params - The parameters containing name, id, names, or ids
 * @param symbolsById - Map of symbols by ID
 * @param symbolsByName - Map of symbols by name
 * @returns Array of matching symbols
 */
export function getSymbolsByParams(
  params: { name?: string; id?: number; names?: string[]; ids?: number[] },
  symbolsById: Map<number, DeclarationReflection>,
  symbolsByName: Map<string, DeclarationReflection>
) {
  const symbols: DeclarationReflection[] = [];
  
  // Handle single name
  if (params.name) {
    const symbol = symbolsByName.get(params.name);
    if (symbol) {
      symbols.push(symbol);
    }
  }
  
  // Handle single ID
  if (params.id !== undefined) {
    const symbol = symbolsById.get(params.id);
    if (symbol) {
      symbols.push(symbol);
    }
  }
  
  // Handle array of names
  if (params.names) {
    for (const name of params.names) {
      const symbol = symbolsByName.get(name);
      if (symbol) {
        symbols.push(symbol);
      }
    }
  }
  
  // Handle array of IDs
  if (params.ids) {
    for (const id of params.ids) {
      const symbol = symbolsById.get(id);
      if (symbol) {
        symbols.push(symbol);
      }
    }
  }
  
  return symbols;
}

/**
 * Validates that at least one symbol identifier is provided.
 * 
 * @param params - The parameters containing name, id, names, or ids
 * @returns True if at least one identifier is provided
 */
export function validateSymbolParams(
  params: { name?: string; id?: number; names?: string[]; ids?: number[] }
): boolean {
  return !!(
    params.name || 
    params.id !== undefined || 
    (params.names && params.names.length > 0) || 
    (params.ids && params.ids.length > 0)
  );
}

/**
 * Gets the parent name of a symbol.
 * 
 * @param symbol - The symbol
 * @param symbolsById - Map of symbols by ID
 * @returns The parent name
 */
export function getParentName(
  symbol: TypeDocSymbol,
  symbolsById: Map<number, TypeDocSymbol>
): string {
  if ((symbol as any).parentId !== undefined) {
    const parent = symbolsById.get((symbol as any).parentId);
    if (parent && parent.name) {
      return parent.name;
    }
  }
  return '';
}
