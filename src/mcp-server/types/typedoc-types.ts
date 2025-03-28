/**
 * TypeDoc-related type definitions for the TypeScript API MCP server.
 */

import { JSONOutput, ReflectionType, SomeReflection } from "typedoc";

type ProjectReflection = JSONOutput.ProjectReflection;
type DeclarationReflection = JSONOutput.DeclarationReflection;
type ContainerReflection = JSONOutput.ContainerReflection;
type ReflectionGroup = JSONOutput.ReflectionGroup;
type Reflection = JSONOutput.Reflection;

/**
 * Represents a TypeDoc symbol with its metadata.
 */
export type TypeDocSymbol = JSONOutput.SomeReflection;

/**
 * Represents a TypeDoc type reference.
 */
export type TypeDoc = JSONOutput.ReferenceType;

/**
 * Represents the TypeDoc JSON documentation.
 */
export type TypeDocJson = JSONOutput.ProjectReflection;

/**
 * Represents a comment content item
 */
export interface CommentContent {
  kind: string;
  text: string;
}

/**
 * Represents a comment block tag
 */
export interface CommentBlockTag {
  tag: string;
  content: CommentContent[];
}

/**
 * Represents a TypeDoc comment structure
 */
export interface TypeDocComment {
  summary?: CommentContent[];
  blockTags?: CommentBlockTag[];
}

/**
 * Represents a TypeDoc symbol with its metadata.
 */
interface TypeDocSymbolOld {
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
  comment?: TypeDocComment;
  children?: TypeDocSymbol[];
  variant?: string;
  sources?: unknown;
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
export type TypeDocType =
  | JSONOutput.ArrayType
  | JSONOutput.ConditionalType
  | JSONOutput.IndexedAccessType
  | JSONOutput.InferredType
  | JSONOutput.IntersectionType
  | JSONOutput.IntrinsicType
  | JSONOutput.OptionalType
  | JSONOutput.PredicateType
  | JSONOutput.QueryType
  | JSONOutput.ReferenceType
  | JSONOutput.ReflectionType
  | JSONOutput.RestType
  | JSONOutput.LiteralType
  | JSONOutput.TupleType
  | JSONOutput.NamedTupleMemberType
  | JSONOutput.TemplateLiteralType
  | JSONOutput.MappedType
  | JSONOutput.TypeOperatorType
  | JSONOutput.UnionType
  | JSONOutput.UnknownType;
