/**
 * Utility functions for formatting output in an LLM-friendly way.
 */

import { ParameterInfo, SymbolInfo, TypeHierarchy } from "../types/index.js";
import {
  convertContent,
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
import { Verbosity } from "../types.js";

export function stringify(json: unknown) {
  return yamlStringify(json, null, { lineWidth: 0 });
}

function decreaseVerbosity(verbosity: Verbosity): Verbosity {
  switch (verbosity) {
    case Verbosity.HIDDEN:
    case Verbosity.SUMMARY:
      return Verbosity.HIDDEN;
    default:
    case Verbosity.DETAIL:
      return Verbosity.SUMMARY;
  }
}

export function formatDetailSymbols(
  symbol: Reflection,
  verbosity: Verbosity,
  limit?: number,
  offset?: number,
): SymbolInfo {
  symbol = maybeResolve(symbol) ?? symbol;
  const result = formatSymbolForLLM(symbol, verbosity);
  const childVerbosity = decreaseVerbosity(verbosity);
  if (
    !result.children &&
    childVerbosity !== Verbosity.HIDDEN &&
    symbol.kind !== ReflectionKind.TypeAlias
  ) {
    if (symbol instanceof ContainerReflection && symbol.children) {
      result.children = [];
      for (const child of symbol.children) {
        const info = formatSymbolForLLM(child, childVerbosity);
        delete info.parent;
        delete info.children;
        result.children.push(info);
      }
      result.children = paginateArray(result.children, { offset, limit });
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
export function formatSymbolForLLM(
  symbol: Reflection,
  verbosity: Verbosity,
): SymbolInfo {
  symbol = maybeResolve(symbol) ?? symbol;

  if (symbol instanceof SignatureReflection) {
    return {
      name: symbol.name,
      kind: getKindName(symbol.kind),
      description: getDescription(symbol, verbosity),
    };
  }

  const info = createSymbolInfo(symbol as DeclarationReflection, verbosity);

  if (symbol instanceof SignatureReflection) {
    const decl = symbol;
    const typeParameters = decl.typeParameters
      ?.map((p) => formatTypeParameterForLLMToString(p, verbosity))
      .join(",");
    info.description += `\n${decl.name}${typeParameters ? "<" + typeParameters + ">" : ""}(${decl.parameters?.map((p) => formatParameterForLLMToString(p)).join(",") ?? ""}): ${formatType(decl.type, "none", verbosity)}`;
  }

  if (isDeclaration(symbol) && symbol.kind === ReflectionKind.TypeAlias) {
    if (symbol.type) {
      info.description += "\n" + formatType(symbol.type, "none", verbosity);
    } else if (Array.isArray(symbol.children) && symbol.children.length > 0) {
      const innerVerbosity = decreaseVerbosity(verbosity);
      info.description +=
        "\n\n{\n" +
        symbol.children
          .filter((c) => c.kind === ReflectionKind.Property)
          .map(
            (c) =>
              `  ${c.comment ? "/** " + convertContent(c.comment.summary, true) + " */\n  " : ""}"${c.name}": ${formatType(c.type, "none", innerVerbosity)}${c.flags.isOptional ? "?" : ""}`,
          )
          .join(",\n") +
        "\n}\n";
    }
  }

  if (symbol.id) info.id = symbol.id;

  if (verbosity === Verbosity.DETAIL) {
    const parentName = getParentName(symbol);
    if (parentName) {
      info.parent = parentName;
    }
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
  verbosity: Verbosity,
): ParameterInfo {
  return {
    name: param.name,
    type:
      param.type && verbosity == Verbosity.DETAIL
        ? formatType(param.type)
        : "any",
    description: getDescription(param, verbosity),
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
  verbosity: Verbosity,
): string {
  return `${param.name}${param.flags?.isOptional ? "?" : ""} extends ${formatType(param.type, "referenceTypeArgument", verbosity)}${param.default ? " = " + formatType(param.default, "none", verbosity) : ""}`;
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

export type SearchResult<T> = {
  offset: number;
  total: number;
  result: T[];
};

/**
 * Applies pagination (limit and offset) to an array
 * @param array The original array to paginate
 * @param offset Number of items to skip from the beginning (default: 0)
 * @param limit Maximum number of items to return (default: array.length)
 * @returns A new array containing the paginated results
 */
export function paginateArray<T>(
  array: T[],
  { offset, limit }: { offset?: number; limit?: number },
): T[] | SearchResult<T> {
  offset ??= 0;
  // Ensure offset is not negative
  const safeOffset = Math.max(0, offset);

  // If no limit is provided, return all items after the offset
  if (limit === undefined) {
    return array.slice(safeOffset);
  }

  // Ensure limit is not negative
  const safeLimit = Math.max(0, limit);

  // Apply both offset and limit using slice
  const result = array.slice(safeOffset, safeOffset + safeLimit);
  if (result.length < array.length || safeOffset !== 0) {
    return {
      offset: safeOffset,
      total: array.length,
      result,
    };
  }
  return result;
}
