/**
 * Utility functions for working with TypeScript types.
 */

import { TypeDocType } from '../types/index.js';

/**
 * Checks if a type matches a type name.
 * 
 * @param type - The type to check
 * @param typeName - The type name to match
 * @returns True if the type matches the type name
 */
export function typeMatches(type: TypeDocType, typeName: string): boolean {
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

/**
 * Checks if a type is a reference to a specific type.
 * 
 * @param type - The type to check
 * @param typeName - The type name to find
 * @returns True if the type is a reference to the type name
 */
export function isTypeReference(type: TypeDocType, typeName: string): boolean {
  if (type.type === 'reference' && type.name === typeName) {
    return true;
  }
  
  if (type.type === 'array' && type.elementType) {
    return isTypeReference(type.elementType, typeName);
  }
  
  if (type.type === 'union' && Array.isArray(type.types)) {
    return type.types.some((t: TypeDocType) => isTypeReference(t, typeName));
  }
  
  if (type.type === 'intersection' && Array.isArray(type.types)) {
    return type.types.some((t: TypeDocType) => isTypeReference(t, typeName));
  }
  
  return false;
}

/**
 * Formats a type to a string representation.
 * 
 * @param type - The type to format
 * @returns The formatted type string
 */
export function formatType(type: TypeDocType): string {
  if (!type) return 'any';
  
  switch (type.type) {
    case 'intrinsic':
      return type.name || 'any';
    
    case 'reference':
      if (type.typeArguments && type.typeArguments.length > 0) {
        const args = type.typeArguments.map(formatType).join(', ');
        return `${type.name}<${args}>`;
      }
      return type.name || 'any';
    
    case 'array':
      if (type.elementType) {
        return `${formatType(type.elementType)}[]`;
      }
      return 'any[]';
    
    case 'union':
      if (type.types) {
        return type.types.map(formatType).join(' | ');
      }
      return 'any';
    
    case 'intersection':
      if (type.types) {
        return type.types.map(formatType).join(' & ');
      }
      return 'any';
    
    case 'tuple':
      if (type.types) {
        return `[${type.types.map(formatType).join(', ')}]`;
      }
      return '[]';
    
    case 'literal':
      return JSON.stringify(type.value);
    
    default:
      return 'any';
  }
}
