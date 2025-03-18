/**
 * Type definitions for the TypeScript API MCP server.
 */

/**
 * Represents a TypeDoc symbol with its metadata.
 */
export interface TypeDocSymbol {
  id: number;
  name: string;
  kind: number;
  kindString?: string;
  flags?: {
    isOptional?: boolean;
    isPrivate?: boolean;
    isProtected?: boolean;
    isPublic?: boolean;
    isStatic?: boolean;
    isExported?: boolean;
  };
  comment?: {
    summary?: Array<{
      kind: string;
      text: string;
    }>;
    blockTags?: Array<{
      tag: string;
      content: Array<{
        kind: string;
        text: string;
      }>;
    }>;
  };
  children?: TypeDocSymbol[];
  signatures?: TypeDocSignature[];
  type?: TypeDocType;
  extendedTypes?: TypeDocType[];
  implementedTypes?: TypeDocType[];
  defaultValue?: string;
  parentId?: number;
}

/**
 * Represents a TypeDoc function or method signature.
 */
export interface TypeDocSignature {
  id: number;
  name: string;
  kind: number;
  kindString?: string;
  comment?: {
    summary?: Array<{
      kind: string;
      text: string;
    }>;
    blockTags?: Array<{
      tag: string;
      content: Array<{
        kind: string;
        text: string;
      }>;
    }>;
  };
  parameters?: TypeDocSymbol[];
  type?: TypeDocType;
}

/**
 * Represents a TypeDoc type reference.
 */
export interface TypeDocType {
  type: string;
  name?: string;
  elementType?: TypeDocType;
  types?: TypeDocType[];
  declaration?: TypeDocSymbol;
  typeArguments?: TypeDocType[];
}

/**
 * Represents the TypeDoc JSON documentation.
 */
export interface TypeDocJson {
  id: number;
  name: string;
  kind: number;
  kindString: string;
  children?: TypeDocSymbol[];
}

/**
 * Represents a simplified symbol for API responses.
 */
export interface SymbolInfo {
  id: number;
  name: string;
  kind: string;
  description: string;
  parentName?: string;
  inherited?: boolean;
  inheritedFrom?: string;
  relationship?: 'extends' | 'implements';
}

/**
 * Represents a parameter of a function or method.
 */
export interface ParameterInfo {
  id: number;
  name: string;
  type: TypeDocType;
  description: string;
  optional: boolean;
  defaultValue?: string;
}

/**
 * Represents a type hierarchy.
 */
export interface TypeHierarchy extends SymbolInfo {
  extends?: TypeHierarchy[];
  implements?: TypeHierarchy[];
  implementedBy?: SymbolInfo[];
  extendedBy?: SymbolInfo[];
}

/**
 * Represents an API overview.
 */
export interface ApiOverview {
  name: string;
  totalSymbols: number;
  countByKind: Record<string, number>;
  topLevelSymbols: SymbolInfo[];
}
