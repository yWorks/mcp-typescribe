/**
 * Utility functions for formatting output in an LLM-friendly way.
 */

import { ParameterInfo, SymbolInfo, TypeHierarchy } from "../types/index.js";
import {
  createSymbolInfo,
  getDescription,
  getParentName,
} from "./symbol-utils.js";
import { formatType } from "./type-utils.js";
import { getKindName } from "../utils.js";

import {
  ContainerReflection,
  DeclarationReflection,
  ParameterReflection,
  ReferenceReflection,
  Reflection,
  ReflectionKind,
  SignatureReflection,
  TypeParameterReflection,
} from "typedoc";
import { isDeclaration } from "./search-utils.js";

import { stringify as yamlStringify } from "yaml";

export function stringify(json: unknown) {
  return yamlStringify(json, null, { lineWidth: 0 });
}

export function formatDetailSymbols(symbol: Reflection): SymbolInfo {
  symbol = maybeResolve(symbol) ?? symbol;
  const result = formatSymbolForLLM(symbol);
  if (!result.children) {
    result.children = [];
    if (symbol instanceof ContainerReflection && symbol.children) {
      for (const child of symbol.children) {
        const info = formatSymbolForLLM(child);
        delete info.parent;
        delete info.children;
        result.children.push(info);
      }
    }
  }
  return result;
}

function maybeResolve(symbol: Reflection): DeclarationReflection | undefined {
  if (symbol instanceof ReferenceReflection) {
    const targetReflectionDeep = symbol.getTargetReflectionDeep();
    return targetReflectionDeep instanceof DeclarationReflection
      ? targetReflectionDeep
      : undefined;
  } else {
    return symbol instanceof DeclarationReflection ? symbol : undefined;
  }
}

/**
 * Formats a symbol for LLM-friendly output.
 * Removes metadata like sources and includes only relevant information.
 *
 * @param symbol - The symbol to format
 * @returns The formatted symbol info
 */
export function formatSymbolForLLM(symbol: Reflection): SymbolInfo {
  symbol = maybeResolve(symbol) ?? symbol;

  if (symbol instanceof SignatureReflection) {
    return {
      name: symbol.name,
      kind: getKindName(symbol.kind),
      description: getDescription(symbol),
    };
  }

  const info = createSymbolInfo(symbol as DeclarationReflection);

  if (symbol instanceof SignatureReflection) {
    const decl = symbol;
    const typeParameters = decl.typeParameters
      ?.map((p) => formatTypeParameterForLLMToString(p))
      .join(",");
    info.description += `\n${decl.name}${typeParameters ? "<" + typeParameters + ">" : ""}(${decl.parameters?.map((p) => formatParameterForLLMToString(p)).join(",") ?? ""}): ${formatType(decl.type)}`;
  }

  if (isDeclaration(symbol) && symbol.kind === ReflectionKind.TypeAlias) {
    info.description += "\n" + formatType(symbol.type);
  }

  if (symbol.id) info.id = symbol.id;

  const parentName = getParentName(symbol);
  if (parentName) {
    info.parent = parentName;
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
  param: ParameterReflection,
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
  param: ParameterReflection,
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
  param: TypeParameterReflection,
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
  param: TypeParameterReflection,
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
    id: hierarchy.id,
    name: hierarchy.name,
    kind: hierarchy.kind,
    description: hierarchy.description,
  };

  formatted.extends = hierarchy.extends?.map(formatTypeHierarchyForLLM);

  formatted.implements = hierarchy.implements?.map(formatTypeHierarchyForLLM);

  formatted.implementedBy = hierarchy.implementedBy?.map((info) => ({
    id: info.id,
    name: info.name,
    kind: info.kind,
    description: info.description,
    relationship: info.relationship,
  }));

  formatted.extendedBy = hierarchy.extendedBy?.map((info) => ({
    id: info.id,
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
 * @returns The formatted handler response
 */
export function createHandlerResponse<T>(content: T): {
  content: { type: string; text: string }[];
} {
  return {
    content: [
      {
        type: "text",
        text: stringify(content),
      },
    ],
  };
}
