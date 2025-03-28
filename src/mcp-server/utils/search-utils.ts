/**
 * Utility functions for searching and matching.
 */

import { TypeDocSymbol } from "../types/index.js";
import { getDescription } from "./symbol-utils.js";
import { isReferencing } from "./type-utils.js";
import { getKindName } from "../utils.js";
import { JSONOutput, ReflectionKind } from "typedoc";

/**
 * Searches for symbols by name.
 *
 * @param query - The search query
 * @param symbols - The symbols to search
 * @param kind - Optional kind filter
 * @param limit - Optional result limit
 * @returns Array of matching symbols
 */
export function searchSymbolsByName(
  query: string,
  symbols: TypeDocSymbol[],
  kind?: ReflectionKind.KindString | "any",
  limit?: number,
): TypeDocSymbol[] {
  const results: TypeDocSymbol[] = [];
  const queryLower = query.toLowerCase();

  for (const symbol of symbols) {
    if (!symbol.name) continue;

    // Check if name matches query
    if (symbol.name.toLowerCase().includes(queryLower)) {
      // Filter by kind if specified
      if (
        kind &&
        kind !== "any" &&
        getKindName(symbol.kind).toLowerCase() !== kind.toLowerCase()
      ) {
        continue;
      }

      results.push(symbol);
    }

    // Apply limit if specified
    if (limit && results.length >= limit) {
      break;
    }
  }

  return results;
}

/**
 * Searches for symbols with descriptions containing a query.
 *
 * @param query - The search query
 * @param symbols - The symbols to search
 * @returns Array of matching symbols
 */
export function searchSymbolsByDescription(
  query: string,
  symbols: TypeDocSymbol[],
): TypeDocSymbol[] {
  const results: TypeDocSymbol[] = [];
  const queryLower = query.toLowerCase();

  for (const symbol of symbols) {
    const description = getDescription(symbol);

    if (description.toLowerCase().includes(queryLower)) {
      results.push(symbol);
    }
  }

  return results;
}

/**
 * Finds functions and methods with a specific return type.
 *
 * @param typeName - The return type name
 * @param symbols - The symbols to search
 * @returns Array of matching symbols
 */
export function findSymbolsByReturnType(
  typeName: string,
  symbols: TypeDocSymbol[],
): TypeDocSymbol[] {
  const results: TypeDocSymbol[] = [];

  for (const symbol of symbols) {
    if (hasReturnType(symbol, typeName)) {
      results.push(symbol);
    }
  }

  return results;
}

/**
 * Checks if a function or method has a specific return type.
 *
 * @param symbol - The function or method symbol
 * @param typeName - The return type name
 * @returns True if the symbol has the return type
 */
export function hasReturnType(
  symbol: TypeDocSymbol,
  typeName: string,
): boolean {
  return (
    symbol.variant == "signature" &&
    symbol.kind == ReflectionKind.Method &&
    isReferencing(symbol.type, typeName)
  );
}

export function isDeclaration(
  symbol: TypeDocSymbol,
): symbol is JSONOutput.DeclarationReflection {
  return symbol.variant === "declaration";
}

export function isReference(
  symbol: TypeDocSymbol,
): symbol is JSONOutput.ReferenceReflection {
  return symbol.variant === "reference";
}
