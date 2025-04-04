/**
 * Utility functions for working with TypeDoc symbols.
 */

import { SymbolInfo } from "../types/index.js";
import { getKindName } from "../utils.js";

import {
  CommentDisplayPart,
  DeclarationReflection,
  ProjectReflection,
  Reflection,
  ReflectionKind,
  SignatureReflection,
} from "typedoc";
import { Verbosity } from "../types.js";
import { formatType } from "./type-utils.js";

function convertContent(
  summary: CommentDisplayPart[] | undefined,
  summaryOnly = false,
): string {
  let stop = false;
  return (
    summary
      ?.map((part) => {
        if (stop) return "";
        if (part.kind === "code") {
          return "`" + part.text + "`";
        }
        if (
          part.kind === "inline-tag" &&
          part.target instanceof DeclarationReflection &&
          part.target.id
        ) {
          return `[${part.text}](api://symbol/${part.target.id})`;
        } else {
          if (part.kind === "text" && summaryOnly) {
            if (part.text.includes(".\n")) {
              const trimmedText = part.text.substring(
                0,
                part.text.indexOf(".\n"),
              );
              stop = true;
              return trimmedText.trim() + "...";
            }
            if (part.text.trim().endsWith(".")) {
              stop = true;
              return part.text;
            }
          }
          return part.text;
        }
      })
      ?.join("")
      ?.replace(/(\r)?\n/g, "\n")
      ?.trim() ?? ""
  );
}

/**
 * Gets the description of a symbol from its comment.
 *
 * @param symbol - The symbol
 * @param verbosity - how verbose the output should be
 * @returns The description
 */
export function getDescription(
  symbol: Reflection,
  verbosity: Verbosity,
): string | undefined {
  let description = "";
  if (symbol.comment?.summary) {
    description = convertContent(
      symbol.comment.summary,
      verbosity === Verbosity.SUMMARY,
    );
  }

  if (verbosity == Verbosity.DETAIL && symbol.comment?.blockTags) {
    symbol.comment.blockTags
      .filter((tag) => tag.tag == "@example")
      .forEach((blockTag) => {
        description += "\nExample\n";
        description += convertContent(blockTag.content);
      });
  }

  if (symbol instanceof SignatureReflection) {
    description += "\nSignature: " + getSignature(symbol, verbosity);
  }

  if (
    symbol instanceof DeclarationReflection &&
    (symbol.signatures?.length ?? 0) > 0
  ) {
    symbol.signatures!.forEach((sig) => {
      description += getDescription(sig, verbosity) + "\n";
    });
  }

  return description.length > 0 ? description : undefined;
}

function formatParameters(symbol: SignatureReflection, verbosity: Verbosity) {
  return (symbol?.parameters ?? [])
    .map((p) => {
      if (p.type) {
        return `${p.name}:${formatType(p.type, "none", verbosity)}`;
      } else {
        return p.name;
      }
    })
    .join(",");
}

export function getSignature(symbol: Reflection, verbosity: Verbosity) {
  if (symbol instanceof SignatureReflection && symbol.isSignature()) {
    switch (symbol.kind) {
      case ReflectionKind.SetSignature:
        return `set ${symbol.name}(${symbol.parameters![0].name}: ${formatType(symbol.parameters![0].type!, "none", verbosity)})`;
      case ReflectionKind.GetSignature:
        return `get ${symbol.name}():${symbol.type!.toString()}`;
      case ReflectionKind.IndexSignature:
        return `get ${symbol.parameters![0].name}: ${formatType(symbol.parameters![0].type!, "none", verbosity)}`;
      case ReflectionKind.CallSignature: {
        const typeParameters = symbol.typeParameters
          ?.map((t) => {
            if (t.type) {
              return (
                t.name + " extends " + formatType(t.type, "none", verbosity)
              );
            } else {
              return t.name;
            }
          })
          .join(",");
        return `${symbol.name}${typeParameters ? `<${typeParameters}>` : ""}(${formatParameters(symbol, verbosity)}):${formatType(symbol.type!, "none", verbosity)}`;
      }
      case ReflectionKind.ConstructorSignature:
        return `constructor(${formatParameters(symbol, verbosity)}) => ${symbol.type!.toString()}`;
    }
  }
  return "";
}

/**
 * Creates a simplified symbol info object from a TypeDoc symbol.
 * Formats the output to be LLM-friendly by removing metadata like sources.
 *
 * @param symbol - The TypeDoc symbol
 * @param verbosity - the verbosity to use for the description
 * @returns The simplified symbol info
 */
export function createSymbolInfo(
  symbol: DeclarationReflection,
  verbosity: Verbosity,
): SymbolInfo {
  return {
    id: symbol.id,
    name: symbol.name,
    kind: getKindName(symbol.kind),
    description: getDescription(symbol, verbosity),
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
export function getParentName(symbol: Reflection): string | undefined {
  if (symbol.parent instanceof DeclarationReflection) {
    if (symbol.parent.id) {
      return `[${symbol.parent.name}](api://symbol/${symbol.parent.id})`;
    } else {
      return symbol.parent.name;
    }
  }
}
