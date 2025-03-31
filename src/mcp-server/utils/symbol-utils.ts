/**
 * Utility functions for working with TypeDoc symbols.
 */

import { SymbolInfo } from "../types/index.js";
import { getKindName } from "../utils.js";

import {
  DeclarationReflection,
  ProjectReflection,
  Reflection,
  ReflectionKind,
  SignatureReflection,
} from "typedoc";

/**
 * Gets the description of a symbol from its comment.
 *
 * @param symbol - The symbol
 * @returns The description
 */
export function getDescription(symbol: Reflection): string | undefined {
  let description = "";
  if (symbol.comment?.summary) {
    description = symbol.comment.summary
      .map((part) => part.text)
      .join("")
      .trim();
  }

  if (symbol instanceof SignatureReflection) {
    description += "\n" + getSignature(symbol);
  }

  if (
    symbol instanceof DeclarationReflection &&
    (symbol.signatures?.length ?? 0) > 0
  ) {
    symbol.signatures!.forEach((sig) => {
      description += getDescription(sig) + "\n";
    });
  }

  return description.length > 0 ? description : undefined;
}

export function getSignature(symbol: Reflection) {
  if (symbol instanceof SignatureReflection && symbol.isSignature()) {
    switch (symbol.kind) {
      case ReflectionKind.SetSignature:
        return `set ${symbol.name}(${symbol.parameters![0].name}: ${symbol.parameters![0].type!.toString()})`;
      case ReflectionKind.GetSignature:
        return `get ${symbol.name}():${symbol.type!.toString()}`;
      case ReflectionKind.IndexSignature:
        return `get ${symbol.parameters![0].name}: ${symbol.parameters![1].type!.toString()}`;
      case ReflectionKind.CallSignature:
        const typeParameters = symbol.typeParameters
          ?.map((t) => t.name + " extends " + t.type?.toString())
          .join(",");
        return `${symbol.name}${typeParameters ? `<${typeParameters}>` : ""}(${(symbol.parameters ?? []).map((p) => `${p.name}:${p.type?.toString()}`).join(",")}):${symbol.type!.toString()}`;
      case ReflectionKind.ConstructorSignature:
        return `constructor(${symbol.parameters?.map((p) => p.name).join(",")}) => ${symbol.type!.toString()}`;
    }
  }
  return "";
}

/**
 * Creates a simplified symbol info object from a TypeDoc symbol.
 * Formats the output to be LLM-friendly by removing metadata like sources.
 *
 * @param symbol - The TypeDoc symbol
 * @returns The simplified symbol info
 */
export function createSymbolInfo(symbol: DeclarationReflection): SymbolInfo {
  return {
    id: symbol.id,
    name: symbol.name,
    kind: getKindName(symbol.kind),
    description: getDescription(symbol),
  };
}

/**
 * Gets symbols by name, id, names array, or ids array.
 *
 * @param params - The parameters containing name, id, names, or ids
 * @param project - the project to search
 * @param symbolsByName - Map of symbols by name
 * @returns Array of matching symbols
 */
export function getSymbolsByParams(
  params: { name?: string; id?: number; names?: string[]; ids?: number[] },
  project: ProjectReflection,
  symbolsByName: Map<string, Reflection>,
) {
  const symbols: DeclarationReflection[] = [];

  // Handle single name
  if (params.name) {
    const symbol = symbolsByName.get(params.name);
    if (symbol instanceof DeclarationReflection) {
      symbols.push(symbol);
    }
  }

  // Handle single ID
  if (params.id !== undefined) {
    const symbol = project.getReflectionById(params.id);
    if (symbol instanceof DeclarationReflection) {
      symbols.push(symbol);
    }
  }

  // Handle array of names
  if (params.names) {
    for (const name of params.names) {
      const symbol = symbolsByName.get(name);
      if (symbol instanceof DeclarationReflection) {
        symbols.push(symbol);
      }
    }
  }

  // Handle array of IDs
  if (params.ids) {
    for (const id of params.ids) {
      const symbol = project.getReflectionById(id);
      if (symbol instanceof DeclarationReflection) {
        symbols.push(symbol);
      }
    }
  }

  return symbols;
}
/**
 * Gets the parent name of a symbol.
 *
 * @param symbol - The symbol
 * @returns The parent name
 */
export function getParentName(symbol: Reflection): string {
  if (symbol.parent instanceof DeclarationReflection) {
    return symbol.parent.name;
  }
  return "";
}
