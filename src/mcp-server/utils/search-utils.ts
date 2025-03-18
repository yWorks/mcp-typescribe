/**
 * Utility functions for searching and matching.
 */

import { TypeDocSymbol, SymbolInfo } from '../types/index.js';
import { getKindName, getDescription } from './symbol-utils.js';
import { isTypeReference } from './type-utils.js';

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
  kind?: string,
  limit?: number
): TypeDocSymbol[] {
  const results: TypeDocSymbol[] = [];
  const queryLower = query.toLowerCase();
  
  for (const symbol of symbols) {
    if (!symbol.name) continue;
    
    // Check if name matches query
    if (symbol.name.toLowerCase().includes(queryLower)) {
      // Filter by kind if specified
      if (kind && kind !== 'any' && getKindName(symbol.kind).toLowerCase() !== kind.toLowerCase()) {
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
  symbols: TypeDocSymbol[]
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
  symbols: TypeDocSymbol[]
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
export function hasReturnType(symbol: TypeDocSymbol, typeName: string): boolean {
  if (!Array.isArray(symbol.signatures)) return false;
  
  for (const signature of symbol.signatures) {
    if (signature.type && isTypeReference(signature.type, typeName)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Finds type references in a symbol.
 * 
 * @param symbol - The symbol to check
 * @param typeName - The type name to find
 * @param usages - Array to add usages to
 * @param symbolsById - Map of symbols by ID
 */
export function findTypeReferences(
  symbol: TypeDocSymbol,
  typeName: string,
  usages: SymbolInfo[],
  symbolsById: Map<number, TypeDocSymbol>
): void {
  // Check the symbol's type
  if (symbol.type && isTypeReference(symbol.type, typeName)) {
    const parentName = symbol.parentId !== undefined ? 
      (symbolsById.get(symbol.parentId)?.name || '') : '';
    
    usages.push({
      name: symbol.name,
      kind: getKindName(symbol.kind),
      description: getDescription(symbol),
      parentName,
    });
  }
  
  // Check function/method signatures
  if (Array.isArray(symbol.signatures)) {
    for (const signature of symbol.signatures) {
      // Check return type
      if (signature.type && isTypeReference(signature.type, typeName)) {
        const parentName = symbol.parentId !== undefined ? 
          (symbolsById.get(symbol.parentId)?.name || '') : '';
        
        usages.push({
          name: symbol.name,
          kind: getKindName(symbol.kind),
          description: getDescription(symbol),
          parentName,
        });
      }
      
      // Check parameter types
      if (Array.isArray(signature.parameters)) {
        for (const param of signature.parameters) {
          if (param.type && isTypeReference(param.type, typeName)) {
            const parentName = symbol.parentId !== undefined ? 
              (symbolsById.get(symbol.parentId)?.name || '') : '';
            
            usages.push({
              name: symbol.name,
              kind: getKindName(symbol.kind),
              description: getDescription(symbol),
              parentName,
            });
            break; // Only add the symbol once
          }
        }
      }
    }
  }
}
