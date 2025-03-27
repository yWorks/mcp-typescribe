import {ReflectionKind} from "typedoc";
import {CommentContent, SymbolInfo, TypeDocSymbol, TypeDocType} from "./types/index.js";

/**
 * Utility functions for the TypeScript API MCP server.
 */

/**
 * Gets the name of a TypeDoc kind.
 * 
 * @param kind - The kind number
 * @returns The kind name
 */
export function getKindName(kind: ReflectionKind): ReflectionKind.KindString | string {
  return ReflectionKind[kind] ?? `Unknown(${kind})`;
}

/**
 * Extracts plain text from a JSDoc comment.
 * 
 * @param comment - The comment array
 * @returns The extracted text
 */
export function extractTextFromComment(comment: CommentContent[]): string {
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

  if (type.type === 'intersection' && Array.isArray(type.types)) {
    return type.types.some((t: TypeDocType) => typeMatches(t, typeName));
  }
  
  return false;
}
