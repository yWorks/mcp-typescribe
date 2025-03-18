import { TypeDocSymbol, TypeDocType, SymbolInfo } from './types.js';

/**
 * Utility functions for the TypeScript API MCP server.
 */

/**
 * Maps TypeDoc kind numbers to human-readable names.
 */
export const KIND_MAP: Record<number, string> = {
  1: 'Project',
  2: 'Module',
  4: 'Namespace',
  8: 'Enum',
  16: 'EnumMember',
  32: 'Variable',
  64: 'Function',
  128: 'Class',
  256: 'Interface',
  512: 'Constructor',
  1024: 'Property',
  2048: 'Method',
  4096: 'CallSignature',
  8192: 'IndexSignature',
  16384: 'ConstructorSignature',
  32768: 'Parameter',
  65536: 'TypeLiteral',
  131072: 'TypeParameter',
  262144: 'Accessor',
  524288: 'GetSignature',
  1048576: 'SetSignature',
  2097152: 'TypeAlias',
  4194304: 'Reference',
};

/**
 * Gets the name of a TypeDoc kind.
 * 
 * @param kind - The kind number
 * @returns The kind name
 */
export function getKindName(kind: number): string {
  return KIND_MAP[kind] || `Unknown(${kind})`;
}

/**
 * Extracts plain text from a JSDoc comment.
 * 
 * @param comment - The comment array
 * @returns The extracted text
 */
export function extractTextFromComment(comment: any[]): string {
  if (!Array.isArray(comment)) return '';
  
  return comment
    .map(part => {
      if (part.kind === 'text') {
        return part.text;
      }
      return '';
    })
    .join('')
    .trim();
}

/**
 * Gets the description of a symbol from its JSDoc comment.
 * 
 * @param symbol - The symbol
 * @returns The description
 */
export function getDescription(symbol: TypeDocSymbol): string {
  if (symbol.comment && symbol.comment.summary) {
    return extractTextFromComment(symbol.comment.summary);
  }
  return '';
}

/**
 * Creates a simplified symbol info object from a TypeDoc symbol.
 * 
 * @param symbol - The TypeDoc symbol
 * @returns The simplified symbol info
 */
export function createSymbolInfo(symbol: TypeDocSymbol): SymbolInfo {
  return {
    id: symbol.id,
    name: symbol.name,
    kind: getKindName(symbol.kind),
    description: getDescription(symbol),
  };
}

/**
 * Checks if a type matches a type name.
 * 
 * @param type - The type to check
 * @param typeName - The type name to match
 * @returns True if the type matches
 */
export function typeMatches(type: TypeDocType, typeName: string): boolean {
  if (!type) return false;
  
  if (type.type === 'reference' && type.name === typeName) {
    return true;
  }
  
  if (type.type === 'array' && type.elementType) {
    return typeMatches(type.elementType, typeName);
  }
  
  if (type.type === 'union' && Array.isArray(type.types)) {
    return type.types.some((t: TypeDocType) => typeMatches(t, typeName));
  }
  
  return false;
}
