/**
 * Utility functions for searching and matching.
 */

import { getDescription } from "./symbol-utils.js";
import { isReferencing } from "./type-utils.js";
import { getKindName } from "../utils.js";
import {
  DeclarationReflection,
  ProjectReflection,
  ReferenceReflection,
  Reflection,
  ReflectionKind,
  SignatureReflection,
} from "typedoc";
import { Verbosity } from "../types.js";
import { SearchService } from "../core/index.js";

/**
 * Searches for symbols by name.
 *
 * @param query - The search query
 * @param project - The project to search
 * @returns Array of matching symbols
 */
export async function searchSymbolsByName(
  query: string,
  project: ProjectReflection,
  kind: ReflectionKind.KindString | "any" | undefined,
  limit: number | undefined,
  descriptionSearchService: SearchService<DeclarationReflection>,
): Promise<DeclarationReflection[]> {
  limit ??= 100;
  let results: DeclarationReflection[] = [];
  const queryLower = query.toLowerCase();

  traverseAll(project, (symbol) => {
    if (!symbol.name || symbol instanceof ReferenceReflection) return true;

    // Check if name matches query
    if (symbol.name.toLowerCase().includes(queryLower)) {
      // Filter by kind if specified
      if (
        kind &&
        kind !== "any" &&
        getKindName(symbol.kind).toLowerCase() !== kind.toLowerCase()
      ) {
        return true;
      }

      results.push(symbol);
    }

    // Apply limit if specified
    return !(limit && results.length >= limit);
  });

  if (results.length == 0) {
    const extraResults = await descriptionSearchService.search(
      query,
      limit - results.length,
      0.4,
    );
    results = results.concat(extraResults);
  }

  return results;
}

function traverseAll(
  project: ProjectReflection,
  callback: (symbol: DeclarationReflection) => boolean,
) {
  let continueTraversal = true;
  const collector = (symbol: Reflection) => {
    if (continueTraversal) {
      symbol.traverse(collector);
    }
    if (continueTraversal && symbol instanceof DeclarationReflection) {
      continueTraversal = callback(symbol);
    }
    return continueTraversal;
  };
  project.traverse(collector);
}

/**
 * Searches for symbols with descriptions containing a query.
 *
 * @param query - The search query
 * @param symbols - The symbols to search
 * @param limit - the maximum number of results
 * @returns Array of matching symbols
 */
export function searchSymbolsByDescription(
  query: string,
  symbols: ProjectReflection,
  limit?: number,
): DeclarationReflection[] {
  const results: DeclarationReflection[] = [];
  const queryLower = query.toLowerCase();

  traverseAll(symbols, (symbol) => {
    const description = getDescription(symbol, Verbosity.SUMMARY);
    if (description?.toLowerCase().includes(queryLower)) {
      results.push(symbol);
    }

    // Apply limit if specified
    return !(limit && results.length >= limit);
  });

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
  symbols: ProjectReflection,
): DeclarationReflection[] {
  const results: DeclarationReflection[] = [];

  const symbols2 = symbols
    .getReflectionsByKind(ReflectionKind.Method)
    .concat(symbols.getReflectionsByKind(ReflectionKind.Function))
    .concat(symbols.getReflectionsByKind(ReflectionKind.Property));

  for (const symbol of symbols2) {
    if (
      symbol instanceof DeclarationReflection &&
      hasReturnType(symbol, typeName)
    ) {
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
export function hasReturnType(symbol: Reflection, typeName: string): boolean {
  if (symbol instanceof DeclarationReflection && symbol.signatures) {
    return symbol.signatures.some((sig) => isReferencing(sig.type, typeName));
  }
  return (
    symbol instanceof SignatureReflection &&
    symbol.variant == "signature" &&
    isReferencing(symbol.type, typeName)
  );
}

export function isDeclaration(
  symbol: Reflection,
): symbol is DeclarationReflection {
  return symbol.variant === "declaration";
}
