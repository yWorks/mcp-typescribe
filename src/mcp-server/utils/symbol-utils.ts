/**
 * Utility functions for working with TypeDoc symbols.
 */

import { SymbolInfo } from "../types/index.js";
import { getKindName } from "../utils.js";

import {
  CommentDisplayPart,
  DeclarationReflection,
  DocumentReflection,
  ProjectReflection,
  Reflection,
  ReflectionKind,
  SignatureReflection,
} from "typedoc";
import { Verbosity } from "../types.js";
import { formatType } from "./type-utils.js";
import {
  DOCUMENTATION_RESOURCE_TEMPLATE_DEFINITION,
  DOCUMENTATION_SECTION_RESOURCE_TEMPLATE_DEFINITION,
} from "../schemas/index.js";
import { UriTemplate } from "@modelcontextprotocol/sdk/shared/uriTemplate.js";

/**
 * Creates a documentation API link.
 *
 * @param id - The documentation ID
 * @param offset - Optional offset parameter
 * @param section an optional anchor slug
 * @returns A formatted documentation API link
 */
export function createDocLink(
  id: number,
  offset?: number,
  section: string = "",
): string {
  const variables: Record<string, string> = {
    id: String(id),
  };
  if (offset !== undefined) {
    variables.pageOffset = String(offset);
  }
  if (section && section.length > 0) {
    variables.section = section;
    return DOCUMENTATION_SECTION_RESOURCE_TEMPLATE_DEFINITION.uriTemplate
      .expand(variables)
      .toString();
  } else {
    return DOCUMENTATION_RESOURCE_TEMPLATE_DEFINITION.uriTemplate
      .expand(variables)
      .toString();
  }
}

const apiUrTemplate = new UriTemplate("api://symbol/{id}");

export function createApiLink(id: number): string {
  return apiUrTemplate.expand({ id: String(id) });
}

export function createMdApiLink(text: string, id: number) {
  return `[${text}](${createApiLink(id)})`;
}

export function convertContent(
  parts: readonly CommentDisplayPart[] | undefined,
  summaryOnly = false,
): string {
  let stop = false;
  return (
    parts
      ?.map((part) => {
        if (stop) return "";
        if (part.kind === "code") {
          return "`" + part.text + "`";
        }
        if (part.kind === "inline-tag") {
          if (
            part.target instanceof DocumentReflection &&
            typeof part.target.id === "number"
          ) {
            return `[${part.text.trim()}](${createDocLink(part.target.id)})`;
          }
          if (part.target instanceof DeclarationReflection && part.target.id) {
            return createMdApiLink(part.text.trim(), part.target.id);
          }
        } else if (part.kind === "relative-link") {
          if (typeof part.target === "number") {
            return `${createDocLink(part.target, undefined, part.targetAnchor)}`;
          }
        } else if (part.kind === "text") {
          if (summaryOnly) {
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
        }
        return part.text;
      })
      ?.join("")
      ?.replace(/(\r)?\n/g, "\n")
      ?.trim() ?? ""
  );
}

export function convertContentPlainText(
  parts: readonly CommentDisplayPart[] | undefined,
  summaryOnly = false,
): string {
  let stop = false;
  return (
    parts
      ?.map((part) => {
        if (stop) return "";
        if (part.kind === "code") {
          return "`" + part.text + "`";
        }
        if (part.kind === "inline-tag") {
          return part.text;
        } else if (part.kind === "relative-link") {
          return part.text;
        } else if (part.kind === "text") {
          if (summaryOnly) {
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
        }
        return part.text;
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
  symbolsByName: (name: string) => DeclarationReflection[],
) {
  const symbols: DeclarationReflection[] = [];

  // Handle single name
  if (params.name) {
    const symbol = symbolsByName(params.name);
    symbol.forEach((s) => symbols.push(s));
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
      const symbol = symbolsByName(name);
      symbol.forEach((s) => symbols.push(s));
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
      return createMdApiLink(symbol.parent.name, symbol.parent.id);
    } else {
      return symbol.parent.name;
    }
  }
}
