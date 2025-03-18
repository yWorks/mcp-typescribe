/**
 * Utility functions for working with TypeDoc symbols.
 */

import { TypeDocSymbol, SymbolInfo } from '../types/index.js';

/**
 * Gets the name of a kind from its numeric value.
 * 
 * @param kind - The numeric kind value
 * @returns The kind name
 */
export function getKindName(kind: number): SymbolKind {
  switch (kind) {
    case 0: return 'Global';
    case 1: return 'Module';
    case 2: return 'Namespace';
    case 4: return 'Enum';
    case 8: return 'EnumMember';
    case 16: return 'Variable';
    case 32: return 'Function';
    case 64: return 'Class';
    case 128: return 'Interface';
    case 256: return 'Constructor';
    case 512: return 'Property';
    case 1024: return 'Method';
    case 2048: return 'CallSignature';
    case 4096: return 'IndexSignature';
    case 8192: return 'ConstructorSignature';
    case 16384: return 'Parameter';
    case 32768: return 'TypeLiteral';
    case 65536: return 'TypeParameter';
    case 131072: return 'Accessor';
    case 262144: return 'GetSignature';
    case 524288: return 'SetSignature';
    case 1048576: return 'TypeAlias';
    case 2097152: return 'Reference';
    default: return 'Unknown';
  }
}

export type SymbolKind = 'Global' | 'Module' | 'Namespace' | 'Enum' | 'EnumMember' | 'Variable' | 'Function' | 'Class' | 'Interface' | 'Constructor' | 'Property' | 'Method' | 'CallSignature' | 'IndexSignature' | 'ConstructorSignature' | 'Parameter' | 'TypeLiteral' | 'TypeParameter' | 'Accessor' | 'GetSignature' | 'SetSignature' | 'TypeAlias' | 'Reference' | 'Unknown';

/**
 * Gets the description of a symbol from its comment.
 * 
 * @param symbol - The symbol
 * @returns The description
 */
export function getDescription(symbol: TypeDocSymbol): string {
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
export function createSymbolInfo(symbol: TypeDocSymbol): SymbolInfo {
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
  symbolsById: Map<number, TypeDocSymbol>,
  symbolsByName: Map<string, TypeDocSymbol>
): TypeDocSymbol[] {
  const symbols: TypeDocSymbol[] = [];
  
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
  if (symbol.parentId !== undefined) {
    const parent = symbolsById.get(symbol.parentId);
    if (parent && parent.name) {
      return parent.name;
    }
  }
  return '';
}
