/**
 * Core TypeScript API handlers class.
 */

import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import {
  ApiOverview,
  base_handler_schema,
  FindImplementationsParams,
  FindUsagesParams,
  GetParameterInfoParams,
  GetSymbolDetailsParams,
  GetTypeHierarchyParams,
  ListMembersParams,
  ParameterInfo,
  SearchByDescriptionParams,
  SearchByReturnTypeParams,
  SearchSymbolsParams,
  SymbolInfo,
  TypeHierarchy,
} from "../types/index.js";
import {
  convertContent,
  createDocLink,
  createMdApiLink,
  createSymbolInfo,
  extractDocument,
  findSymbolsByReturnType,
  formatDetailSymbols,
  formatParameterForLLM,
  formatSymbolForLLM,
  formatTypeHierarchyForLLM,
  getDescription,
  getSymbolsByParams,
  paginateArray,
  reflectionIsReferencing,
  SearchResult,
  searchSymbolsByDescription,
  searchSymbolsByName,
} from "../utils/index.js";
import { getKindName } from "../utils.js";
import {
  ConsoleLogger,
  ContainerReflection,
  DeclarationReflection,
  Deserializer,
  DocumentReflection,
  FileRegistry,
  JSONOutput,
  ProjectReflection,
  ReferenceReflection,
  ReferenceType,
  Reflection,
  ReflectionKind,
} from "typedoc";
import { Verbosity } from "../types.js";
import fs from "fs/promises";

/**
 * Loads the TypeDoc JSON documentation and initializes handlers.
 *
 * @param filePath - Path to the TypeDoc JSON file
 */
export const loadApiDocs = async (
  filePath: string,
): Promise<TypeScriptApiHandlers> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const apiDocs = JSON.parse(data) as JSONOutput.ProjectReflection;

    // Initialize handlers
    const handlers = new TypeScriptApiHandlers(apiDocs);

    console.error(`Loaded API documentation with symbols`);
    return handlers;
  } catch (error) {
    console.error("Failed to load API documentation:", error);
    throw error;
  }
};

/**
 * Class that provides handlers for TypeScript API queries.
 */
export class TypeScriptApiHandlers {
  private symbolsByKind: Map<number, Reflection[]> = new Map();
  private readonly project: ProjectReflection;
  private readonly overloadMapping: Map<
    DeclarationReflection,
    DeclarationReflection
  >;

  /**
   * Creates a new TypeScriptApiHandlers instance.
   *
   * @param apiDocs - The TypeDoc JSON documentation
   */
  constructor(apiDocs: JSONOutput.ProjectReflection) {
    const deserializer = new Deserializer(new ConsoleLogger());
    apiDocs.schemaVersion ??= "2.0";
    const project = deserializer.reviveProject("typescript-api-mcp", apiDocs, {
      projectRoot: "/",
      registry: new FileRegistry(),
    });
    this.overloadMapping = new Map();
    this.project = project;
    this.buildIndexes(project);
  }

  /**
   * Get a symbol by name
   */
  getSymbolByName(name: string): DeclarationReflection[] {
    const kinds = [
      ReflectionKind.Class,
      ReflectionKind.Interface,
      ReflectionKind.TypeAlias,
      ReflectionKind.Enum,
      ReflectionKind.Namespace,
      ReflectionKind.Function,
      ReflectionKind.Method,
      ReflectionKind.EnumMember,
      ReflectionKind.Property,
      ReflectionKind.Module,
      ReflectionKind.Variable,
      ReflectionKind.Constructor,
      ReflectionKind.Document,
      ReflectionKind.TypeParameter,
      ReflectionKind.Variable,
    ];

    return kinds
      .map((kind) =>
        this.project
          .getReflectionsByKind(kind)
          .filter((result) => result.name === name)
          .map((value) =>
            value instanceof ReferenceReflection
              ? (value.getTargetReflectionDeep() as DeclarationReflection)
              : (value as DeclarationReflection),
          ),
      )
      .reduce((a, b) => a.concat(b));
  }

  /**
   * Builds indexes for efficient symbol lookup.
   *
   * @param projectReflection - The TypeDoc JSON documentation
   */
  private buildIndexes(projectReflection: ProjectReflection): void {
    this.determineNamespaceOverloads(projectReflection);

    // Process all children recursively
    const processChildren = (node: Reflection) => {
      if (!node) return;
      if (node instanceof ReferenceReflection) {
        return;
      }

      // Index the current node if it has an id
      if (node.id !== undefined) {
        // Index by kind
        if (node.kind !== undefined) {
          if (!this.symbolsByKind.has(node.kind)) {
            this.symbolsByKind.set(node.kind, []);
          }
          this.symbolsByKind.get(node.kind)?.push(node);
        }
      }

      // Process children recursively
      if (node instanceof ContainerReflection && node.children) {
        for (const child of node.children) {
          processChildren(child);
        }
      }
    };

    processChildren(projectReflection);
  }

  private determineNamespaceOverloads(projectReflection: ProjectReflection) {
    function getApiName(declarationReflection: DeclarationReflection) {
      switch (declarationReflection.kind) {
        case ReflectionKind.Project:
        case ReflectionKind.Module:
        case ReflectionKind.IndexSignature:
        case ReflectionKind.TypeLiteral:
        case ReflectionKind.Parameter:
        case ReflectionKind.TypeParameter:
        case ReflectionKind.GetSignature:
        case ReflectionKind.SetSignature:
        case ReflectionKind.TypeAlias:
        case ReflectionKind.Reference:
        case ReflectionKind.Document:
          return undefined;
        case ReflectionKind.Namespace:
        case ReflectionKind.Enum:
        case ReflectionKind.Function:
        case ReflectionKind.Interface:
        case ReflectionKind.Class:
          return declarationReflection.getFullName(".");
        case ReflectionKind.Constructor:
          return declarationReflection.parent!.getFullName(".");
        case ReflectionKind.EnumMember:
        case ReflectionKind.Property:
        case ReflectionKind.Method:
        case ReflectionKind.Accessor:
          return (
            declarationReflection.parent!.getFullName(".") +
            "." +
            declarationReflection.name
          );
      }
    }

    const nameSpaces = projectReflection.getReflectionsByKind(
      ReflectionKind.Namespace,
    );
    const nameSpacesByName = new Map<string, DeclarationReflection>();
    for (const nameSpace of nameSpaces) {
      const apiName = getApiName(nameSpace as DeclarationReflection);
      if (apiName) {
        nameSpacesByName.set(apiName, nameSpace as DeclarationReflection);
      }
    }
    const possibleOverloads = projectReflection.getReflectionsByKind(
      ReflectionKind.Class |
        ReflectionKind.Interface |
        ReflectionKind.Enum |
        ReflectionKind.Function |
        ReflectionKind.Constructor |
        ReflectionKind.Property |
        ReflectionKind.Method |
        ReflectionKind.Accessor |
        ReflectionKind.EnumMember,
    ) as DeclarationReflection[];

    possibleOverloads.forEach((overload) => {
      const apiName = getApiName(overload);
      if (apiName) {
        if (nameSpacesByName.has(apiName)) {
          const nameSpace = nameSpacesByName.get(apiName)!;
          this.overloadMapping.set(overload, nameSpace);
        }
      }
    });
  }

  /**
   * Gets an overview of the API.
   *
   * @returns The API overview
   */
  getApiOverview(): ApiOverview {
    let documentation: string | undefined = undefined;
    if (
      Array.isArray(this.project.documents) &&
      this.project.documents.length > 0
    ) {
      documentation = this.project.documents
        .filter((doc) => !(doc.parent instanceof DocumentReflection))
        .map((doc) => `[${doc.name}](${createDocLink(doc.id)})`)
        .join("\n\n");
    }
    if (this.project.readme) {
      documentation += convertContent(this.project.readme);
    }

    return {
      name: this.project.name,
      documentation,
      topLevelSymbols: this.getTopLevelSymbols(),
    };
  }

  /**
   * Gets the top-level symbols in the API.
   *
   * @returns Array of top-level symbols
   */
  private getTopLevelSymbols(): SymbolInfo[] {
    return (this.project.children ?? []).map((child: DeclarationReflection) =>
      createSymbolInfo(child, Verbosity.SUMMARY),
    );
  }

  /**
   * Searches for symbols by name.
   *
   * @param query - The search query
   * @param kind - Optional kind filter
   * @param limit - Optional result limit
   * @returns Array of matching symbols
   */
  searchSymbols(
    query: string,
    kind?: ReflectionKind.KindString | "any",
    limit?: number,
  ): SymbolInfo[] {
    // see if query is a Number
    let matchingSymbols: DeclarationReflection[];
    if (!isNaN(Number(query))) {
      matchingSymbols = getSymbolsByParams(
        { id: Number(query) },
        this.project,
        this.getSymbolByName.bind(this),
      );
    } else {
      matchingSymbols = searchSymbolsByName(query, this.project, kind, limit);
    }

    if (matchingSymbols.length === 1) {
      return [formatSymbolForLLM(matchingSymbols[0], Verbosity.DETAIL)];
    } else {
      return matchingSymbols.map((symbol) =>
        formatSymbolForLLM(symbol, Verbosity.SUMMARY),
      );
    }
  }

  /**
   * Gets the members of a class or interface.
   *
   * @param symbol - The class or interface symbol
   * @param includeInherited - Whether to include inherited members
   * @returns Array of members
   */
  getMembers(
    symbol: DeclarationReflection,
    includeInherited: boolean,
    verbosity: Verbosity,
  ): SymbolInfo[] {
    const members: SymbolInfo[] = [];

    if (
      symbol.kind === ReflectionKind.Module ||
      symbol.kind === ReflectionKind.Namespace
    ) {
      const children = symbol.children || [];
      for (const child of children) {
        const memberInfo = formatSymbolForLLM(child, verbosity);
        memberInfo.inherited = false;
        members.push(memberInfo);
      }
      return members;
    }

    // Add direct members
    if (Array.isArray(symbol.children)) {
      for (const child of symbol.children) {
        if (
          child.kind === ReflectionKind.Property ||
          child.kind === ReflectionKind.EnumMember ||
          child.kind === ReflectionKind.Method
        ) {
          const memberInfo = formatSymbolForLLM(child, verbosity);
          memberInfo.inherited = false;
          members.push(memberInfo);
        }
      }
    }

    // Add inherited members if requested
    if (includeInherited && Array.isArray(symbol.extendedTypes)) {
      for (const extendedType of symbol.extendedTypes) {
        if (
          extendedType instanceof ReferenceType &&
          extendedType.reflection instanceof DeclarationReflection
        ) {
          const parentMembers = this.getMembers(
            extendedType.reflection,
            true,
            verbosity,
          );
          for (const member of parentMembers) {
            member.inherited = true;
            member.inheritedFrom = extendedType.name;
            members.push(member);
          }
        }
      }
    }

    return members;
  }

  /**
   * Gets the parameters of a function or method.
   *
   * @param symbol - The function or method symbol
   * @returns Array of parameters
   */
  getParameters(
    symbol: DeclarationReflection,
    verbosity: Verbosity.DETAIL,
  ): ParameterInfo[] {
    const parameters: ParameterInfo[] = [];

    // Get signatures
    const signatures = symbol.signatures || [];

    for (const signature of signatures) {
      if (Array.isArray(signature.parameters)) {
        for (const param of signature.parameters) {
          parameters.push(formatParameterForLLM(param, verbosity));
        }
      }
    }

    return parameters;
  }

  /**
   * Finds implementations of an interface or subclasses of a class.
   *
   * @param symbol - The interface or class symbol
   * @returns Array of implementations
   */
  findImplementations(symbol: DeclarationReflection): SymbolInfo[] {
    const implementations: SymbolInfo[] = [];
    if (Array.isArray(symbol.extendedBy)) {
      for (const extendedType of symbol.extendedBy) {
        if (extendedType.reflection instanceof DeclarationReflection) {
          const implInfo = formatSymbolForLLM(
            extendedType.reflection,
            Verbosity.SUMMARY,
          );
          implInfo.relationship = "extends";
          implementations.push(implInfo);
        }
      }
    }

    if (Array.isArray(symbol.implementedBy)) {
      for (const implementedType of symbol.implementedBy) {
        if (implementedType.reflection instanceof DeclarationReflection) {
          const implInfo = formatSymbolForLLM(
            implementedType.reflection,
            Verbosity.SUMMARY,
          );
          implInfo.relationship = "implements";
          implementations.push(implInfo);
        }
      }
    }
    return implementations;
  }

  /**
   * Finds functions and methods with a specific return type.
   *
   * @param typeName - The return type name
   * @returns Array of functions and methods
   */
  findByReturnType(typeName: string): SymbolInfo[] {
    const matchingSymbols = findSymbolsByReturnType(typeName, this.project);

    return matchingSymbols.map((symbol) => {
      return formatSymbolForLLM(symbol, Verbosity.SUMMARY);
    });
  }

  /**
   * Searches for symbols with descriptions containing a query.
   *
   * @param query - The search query
   * @param limit - the maximum amount of results
   * @returns Array of matching symbols
   */
  searchInDescriptions(query: string, limit?: number): SymbolInfo[] {
    const matchingSymbols = searchSymbolsByDescription(
      query,
      this.project,
      limit,
    );

    return matchingSymbols.map((symbol) =>
      formatSymbolForLLM(symbol, Verbosity.SUMMARY),
    );
  }

  /**
   * Gets the type hierarchy of a symbol.
   *
   * @param symbol - The symbol
   * @param direction - traversal direction for the hierarchy
   * @returns The type hierarchy
   */
  getTypeHierarchy(
    symbol: DeclarationReflection,
    direction: "up" | "down" | "both" = "both",
  ): TypeHierarchy {
    const kindName = getKindName(symbol.kind);
    const result: TypeHierarchy = {
      id: symbol.id,
      name: symbol.name,
      kind: kindName,
      description: getDescription(symbol, Verbosity.SUMMARY),
    };

    // Add parent types
    if (direction !== "down" && Array.isArray(symbol.extendedTypes)) {
      result.extends = [];

      for (const extendedType of symbol.extendedTypes) {
        if (extendedType instanceof ReferenceType) {
          const parentSymbol = extendedType.reflection;
          if (parentSymbol instanceof DeclarationReflection) {
            result.extends.push(this.getTypeHierarchy(parentSymbol, "up"));
          } else {
            result.extends.push({
              id: extendedType.reflection?.id,
              name: extendedType.name,
              kind: "Unknown",
            });
          }
        }
      }
    }

    if (direction !== "up" && Array.isArray(symbol.extendedBy)) {
      result.extendedBy = [];
      for (const extendedBy of symbol.extendedBy) {
        const parentSymbol = extendedBy.reflection;
        if (parentSymbol instanceof DeclarationReflection) {
          result.extendedBy.push(this.getTypeHierarchy(parentSymbol, "down"));
        } else {
          result.extendedBy.push({
            id: parentSymbol?.id,
            name: extendedBy.name,
            kind: "Unknown",
          });
        }
      }
    }

    // Add implemented interfaces
    if (direction !== "down" && Array.isArray(symbol.implementedTypes)) {
      result.implements = [];

      for (const implementedType of symbol.implementedTypes) {
        if (implementedType instanceof ReferenceType) {
          const parentSymbol = implementedType.reflection;
          if (parentSymbol instanceof DeclarationReflection) {
            result.implements.push(this.getTypeHierarchy(parentSymbol, "up"));
          } else {
            result.implements.push({
              id: parentSymbol?.id,
              name: implementedType.name,
              kind: "Unknown",
            });
          }
        }
      }
    }

    if (direction !== "up" && Array.isArray(symbol.implementedBy)) {
      result.implementedBy = [];
      for (const implementedBy of symbol.implementedBy) {
        const parentSymbol = implementedBy.reflection;
        if (parentSymbol instanceof DeclarationReflection) {
          result.implementedBy.push(
            this.getTypeHierarchy(parentSymbol, "down"),
          );
        } else {
          result.implementedBy.push({
            id: parentSymbol?.id,
            name: implementedBy.name,
            kind: "Unknown",
          });
        }
      }
    }

    return formatTypeHierarchyForLLM(result);
  }

  /**
   * Finds usages of a symbol in the API.
   *
   * @param symbol - The symbol
   * @returns Array of usages
   */
  findUsages(
    symbol: DeclarationReflection,
    limit?: number,
    offset?: number,
  ): SymbolInfo[] | SearchResult<SymbolInfo> {
    const usages: SymbolInfo[] = [];
    // Check all symbols for references to this symbol
    for (const otherSymbol of this.project.getReflectionsByKind(
      ReflectionKind.All,
    )) {
      // Skip the symbol itself
      if (otherSymbol.id === symbol.id) continue;

      if (reflectionIsReferencing(otherSymbol, symbol.name)) {
        usages.push(formatSymbolForLLM(otherSymbol, Verbosity.SUMMARY));
      }
    }
    return paginateArray(usages, { limit, offset });
  }

  /**
   * Handles the search_symbols tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleSearchSymbols(args: SearchSymbolsParams) {
    const { query, kind, offset, limit } = args;
    const maxSearch = (limit ?? 10) + (offset ?? 0);

    return paginateArray(this.searchSymbols(query, kind, maxSearch), args);
  }

  /**
   * Handles the get_symbol_details tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleGetSymbolDetails(args: GetSymbolDetailsParams) {
    const symbols = this.lookupSymbols(args);

    // when there is another symbol with the same name (declaration merging) return that other symbol, too.
    if (!args.name && !args.names) {
      for (const symbol of symbols) {
        const overloadedNamespace = this.overloadMapping.get(symbol);
        if (overloadedNamespace) {
          symbols.push(overloadedNamespace);
        }
      }
    }

    return symbols.map((symbol) => {
      const symbolInfo = formatDetailSymbols(
        symbol,
        Verbosity.DETAIL,
        args.limit,
        args.offset,
      );
      if (!args.name && !args.names) {
        const overloadedNamespace = this.overloadMapping.get(symbol);
        if (overloadedNamespace) {
          symbolInfo.description += `\n\n[NOTE!]\n> See also ${createMdApiLink(overloadedNamespace.name + " **namespace**", overloadedNamespace.id)} members!`;
        }
      }
      return symbolInfo;
    });
  }

  private lookupSymbols(args: GetSymbolDetailsParams) {
    const params = base_handler_schema.parse(args);

    const symbols = getSymbolsByParams(
      params,
      this.project,
      this.getSymbolByName.bind(this),
    );

    if (symbols.length === 0) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Symbol not found: ${args.name || args.id || args.names || args.ids}`,
      );
    }
    return symbols;
  }

  /**
   * Handles the list_members tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleListMembers(args: ListMembersParams) {
    const { includeInherited = false } = args;

    const symbols = this.lookupSymbols(args);

    const results: SymbolInfo[] = [];

    for (const symbol of symbols) {
      // Check if symbol is a class or interface
      if (
        symbol.kind !== ReflectionKind.Class &&
        symbol.kind !== ReflectionKind.Interface &&
        symbol.kind !== ReflectionKind.Enum &&
        symbol.kind !== ReflectionKind.Module &&
        symbol.kind !== ReflectionKind.Namespace &&
        symbol.kind !== ReflectionKind.TypeAlias
      ) {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Symbol is not a class, interface, enum, namespace, type, or module: ${symbol.name} (${getKindName(symbol.kind)})`,
        );
      }

      // Get members
      const members = this.getMembers(
        symbol,
        includeInherited,
        Verbosity.SUMMARY,
      );
      results.push(...members);
    }

    return results;
  }

  /**
   * Handles the get_parameter_info tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleGetParameterInfo(args: GetParameterInfoParams) {
    const symbols = this.lookupSymbols({ ...args, limit: 100, offset: 0 });

    const results: ParameterInfo[] = [];

    for (const symbol of symbols) {
      // Check if symbol is a function or method
      const kindName = getKindName(symbol.kind);
      if (kindName !== "Function" && kindName !== "Method") {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Symbol is not a function or method: ${symbol.name} (${kindName})`,
        );
      }

      // Get parameters
      const parameters = this.getParameters(symbol, Verbosity.DETAIL);
      results.push(...parameters);
    }

    return results;
  }

  /**
   * Handles the find_implementations tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleFindImplementations(args: FindImplementationsParams) {
    const symbols = this.lookupSymbols(args);

    const results: SymbolInfo[] = [];

    for (const symbol of symbols) {
      // Check if symbol is a class or interface
      const kindName = getKindName(symbol.kind);
      if (kindName !== "Class" && kindName !== "Interface") {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Symbol is not a class or interface: ${symbol.name} (${kindName})`,
        );
      }

      // Find implementations
      const implementations = this.findImplementations(symbol);
      results.push(...implementations);
    }

    return results;
  }

  /**
   * Handles the search_by_return_type tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleSearchByReturnType(args: SearchByReturnTypeParams) {
    const { typeName } = args;

    // Find functions and methods with matching return type
    return this.findByReturnType(typeName);
  }

  /**
   * Handles the search_by_description tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleSearchByDescription(args: SearchByDescriptionParams) {
    const { query, limit, offset } = args;

    // Search in descriptions
    return paginateArray(
      this.searchInDescriptions(query, offset + limit),
      args,
    );
  }

  /**
   * Handles the get_type_hierarchy tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleGetTypeHierarchy(args: GetTypeHierarchyParams) {
    const symbols = this.lookupSymbols({ ...args, limit: 100, offset: 0 });

    const results: TypeHierarchy[] = [];

    for (const symbol of symbols) {
      // Get type hierarchy
      const hierarchy = this.getTypeHierarchy(symbol);
      results.push(hierarchy);
    }

    return results;
  }

  /**
   * Handles the find_usages tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleFindUsages(
    args: FindUsagesParams,
  ): (SymbolInfo[] | SearchResult<SymbolInfo>)[] {
    const symbols = this.lookupSymbols(args);

    const results: (SymbolInfo[] | SearchResult<SymbolInfo>)[] = [];

    for (const symbol of symbols.filter(
      (value) =>
        value.kind !== ReflectionKind.Namespace &&
        value.kind !== ReflectionKind.Module &&
        value.kind !== ReflectionKind.Document,
    )) {
      // Find usages
      const usages = this.findUsages(symbol, args.limit, args.offset);

      results.push(usages);
    }

    return results;
  }

  /**
   * Handles getting documentation for a specific item.
   *
   * @param id - The ID of the documentation item to retrieve
   * @param offset - Optional offset for pagination
   * @returns Documentation content as a string
   */
  async handleGetDocumentation(
    id: number,
    offset: number = 0,
    section?: string,
  ): Promise<string> {
    const result = this.project.getReflectionById(id);
    if (result instanceof ProjectReflection && result.readme) {
      return await extractDocument(
        offset,
        id,
        undefined,
        undefined,
        "README",
        result.readme,
        undefined,
        section,
      );
    }
    if (result instanceof DocumentReflection) {
      return await extractDocument(
        offset,
        id,
        result.frontmatter,
        result.children,
        result.name,
        result.content,
        result.parent,
        section,
      );
    }

    return "No page found";
  }
}
