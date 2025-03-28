/**
 * Utility functions for formatting output in an LLM-friendly way.
 */

import {
  ParameterInfo,
  SymbolInfo,
  TypeDocSymbol,
  TypeHierarchy,
} from "../types/index.js";
import { getDescription, getParentName } from "./symbol-utils.js";
import { formatType } from "./type-utils.js";
import { getKindName } from "../utils.js";

import { JSONOutput, ReflectionKind } from "typedoc";
import { isDeclaration } from "./search-utils.js";

type DeclarationReflection = JSONOutput.DeclarationReflection;
type Reflection = JSONOutput.Reflection;

/**
 * Formats a symbol for LLM-friendly output.
 * Removes metadata like sources and includes only relevant information.
 *
 * @param symbol - The symbol to format
 * @param symbolsById - Map of symbols by ID
 * @returns The formatted symbol info
 */
export function formatSymbolForLLM(
  symbol: TypeDocSymbol,
  symbolsById: Map<number, TypeDocSymbol>,
): SymbolInfo {
  if (
    symbol.variant === "declaration" &&
    (symbol.kind == ReflectionKind.Constructor ||
      symbol.kind === ReflectionKind.Method ||
      symbol.kind === ReflectionKind.Function)
  ) {
    const sigs = symbol.signatures;
    if ((sigs?.length ?? 0) > 0) {
      return formatSymbolForLLM(sigs![0], symbolsById);
    }
  }

  const info: SymbolInfo = {
    name: symbol.name,
    kind: getKindName(symbol.kind),
    description: getDescription(symbol),
  };

  if (symbol.variant === "signature") {
    const decl = symbol;
    info.description += `\n${decl.name}<${decl.typeParameters?.map((t) => formatTypeParameterForLLMToString(t)).join(",") ?? ""}>(${decl.parameters?.map((p) => formatParameterForLLMToString(p)).join(",") ?? ""}): ${formatType(decl.type)}`;
  }

  if (isDeclaration(symbol) && symbol.kind === ReflectionKind.TypeAlias) {
    info.description += "\n" + formatType(symbol.type);
  }

  if (symbol.id) info.id = symbol.id;

  const parentName = getParentName(symbol, symbolsById);
  if (parentName) {
    info.parentName = parentName;
  }

  return info;
}

/**
 * Formats a parameter for LLM-friendly output.
 * Removes metadata like sources and includes only relevant information.
 *
 * @param param - The parameter to format
 * @returns The formatted parameter info
 */
export function formatParameterForLLM(
  param: JSONOutput.ParameterReflection,
): ParameterInfo {
  return {
    name: param.name,
    type: param.type ? formatType(param.type) : "any",
    description: getDescription(param),
    optional: param.flags?.isOptional || false,
    defaultValue: param.defaultValue,
  };
}

/**
 * Formats a parameter for LLM-friendly output.
 * Removes metadata like sources and includes only relevant information.
 *
 * @param param - The parameter to format
 * @returns The formatted parameter info
 */
export function formatParameterForLLMToString(
  param: JSONOutput.ParameterReflection,
): string {
  return `${param.name}${param.flags?.isOptional ? "?" : ""}${param.defaultValue ? "=" + param.defaultValue : ""}: ${formatType(param.type)}`;
}

/**
 * Formats a parameter for LLM-friendly output.
 * Removes metadata like sources and includes only relevant information.
 *
 * @param param - The parameter to format
 * @returns The formatted parameter info
 */
export function formatTypeParameterForLLMToString(
  param: JSONOutput.TypeParameterReflection,
): string {
  return `${param.name}${param.flags?.isOptional ? "?" : ""} extends ${formatType(param.type)}${param.default ? " = " + formatType(param.default) : ""}`;
}

/**
 * Formats a parameter for LLM-friendly output.
 * Removes metadata like sources and includes only relevant information.
 *
 * @param param - The parameter to format
 * @returns The formatted parameter info
 */
export function formatTypeParameterForLLM(
  param: JSONOutput.TypeParameterReflection,
): ParameterInfo {
  return {
    name: param.name,
    type: param.type ? formatType(param.type) : "any",
    description: getDescription(param),
    optional: param.flags?.isOptional || false,
    defaultValue: formatType(param.default),
  };
}

/**
 * Formats a type hierarchy for LLM-friendly output.
 * Removes metadata like sources and includes only relevant information.
 *
 * @param hierarchy - The type hierarchy to format
 * @returns The formatted type hierarchy
 */
export function formatTypeHierarchyForLLM(
  hierarchy: TypeHierarchy,
): TypeHierarchy {
  const formatted: TypeHierarchy = {
    name: hierarchy.name,
    kind: hierarchy.kind,
    description: hierarchy.description,
  };

  formatted.extends = hierarchy.extends?.map(formatTypeHierarchyForLLM);

  formatted.implements = hierarchy.implements?.map(formatTypeHierarchyForLLM);

  formatted.implementedBy = hierarchy.implementedBy?.map((info) => ({
    name: info.name,
    kind: info.kind,
    description: info.description,
    relationship: info.relationship,
  }));

  formatted.extendedBy = hierarchy.extendedBy?.map((info) => ({
    name: info.name,
    kind: info.kind,
    description: info.description,
    relationship: info.relationship,
  }));

  return formatted;
}

/**
 * Creates a handler response with formatted content.
 *
 * @param content - The content to format
 * @param isError - Whether the response is an error
 * @returns The formatted handler response
 */
export function createHandlerResponse<T>(
  content: T,
  isError = false,
): {
  content: { type: string; text: string }[];
  isError?: boolean;
} {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(content, null, 2),
      },
    ],
    ...(isError ? { isError: true } : {}),
  };
}
