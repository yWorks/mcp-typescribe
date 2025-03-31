/**
 * Core TypeScript API handlers class.
 */

import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import {
  ApiOverview,
  FindImplementationsParams,
  FindUsagesParams,
  GetParameterInfoParams,
  GetSymbolDetailsParams,
  GetTypeHierarchyParams,
  ListMembersParams,
  ParameterInfo,
  schemas,
  SearchByDescriptionParams,
  SearchByReturnTypeParams,
  SearchSymbolsParams,
  SymbolInfo,
  TypeHierarchy,
} from "../types/index.js";
import {
  createSymbolInfo,
  findSymbolsByReturnType,
  formatDetailSymbols,
  formatParameterForLLM,
  formatSymbolForLLM,
  formatTypeHierarchyForLLM,
  getDescription,
  getSymbolsByParams,
  reflectionIsReferencing,
  searchSymbolsByDescription,
  searchSymbolsByName,
} from "../utils/index.js";
import { getKindName } from "../utils.js";
import {
  ConsoleLogger,
  ContainerReflection,
  DeclarationReflection,
  Deserializer,
  FileRegistry,
  JSONOutput,
  ProjectReflection,
  ReferenceReflection,
  ReferenceType,
  Reflection,
  ReflectionKind,
} from "typedoc";

/**
 * Class that provides handlers for TypeScript API queries.
 */
export class TypeScriptApiHandlers {
  private symbolsById: Map<number, Reflection> = new Map();
  private symbolsByName: Map<string, Reflection> = new Map();
  private symbolsByKind: Map<number, Reflection[]> = new Map();
  private readonly project: ProjectReflection;

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
    this.project = project;
    this.buildIndexes(project);
  }

  /**
   * Builds indexes for efficient symbol lookup.
   *
   * @param projectReflection - The TypeDoc JSON documentation
   */
  private buildIndexes(projectReflection: ProjectReflection): void {
    // Process all children recursively
    const processChildren = (node: Reflection) => {
      if (!node) return;
      if (node instanceof ReferenceReflection) {
        return;
      }

      // Index the current node if it has an id
      if (node.id !== undefined) {
        this.symbolsById.set(node.id, node);

        // Index by name if available
        if (node.name) {
          this.symbolsByName.set(node.name, node);
        }

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

  /**
   * Gets an overview of the API.
   *
   * @returns The API overview
   */
  getApiOverview(): ApiOverview {
    // Count symbols by kind
    const countByKind: Record<string, number> = {};
    for (const [kind, symbols] of this.symbolsByKind.entries()) {
      countByKind[getKindName(kind)] = symbols.length;
    }

    return {
      name: this.project.name,
      totalSymbols: this.symbolsById.size,
      countByKind,
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
      createSymbolInfo(child),
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
    const matchingSymbols = searchSymbolsByName(
      query,
      this.project,
      kind,
      limit,
    );

    return matchingSymbols.map((symbol) => formatSymbolForLLM(symbol));
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
  ): SymbolInfo[] {
    const members: SymbolInfo[] = [];

    // Add direct members
    if (Array.isArray(symbol.children)) {
      for (const child of symbol.children) {
        if (
          child.kind === ReflectionKind.Property ||
          child.kind === ReflectionKind.EnumMember ||
          child.kind === ReflectionKind.Method
        ) {
          const memberInfo = formatSymbolForLLM(child);
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
          const parentMembers = this.getMembers(extendedType.reflection, true);
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
  getParameters(symbol: DeclarationReflection): ParameterInfo[] {
    const parameters: ParameterInfo[] = [];

    // Get signatures
    const signatures = symbol.signatures || [];

    for (const signature of signatures) {
      if (Array.isArray(signature.parameters)) {
        for (const param of signature.parameters) {
          parameters.push(formatParameterForLLM(param));
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
    const symbolName = symbol.name;
    const isInterface = getKindName(symbol.kind) === "Interface";

    // Check all classes
    for (const classSymbol of this.project.getReflectionsByKind(
      ReflectionKind.Class,
    )) {
      // Check extended types (for subclasses)
      if (classSymbol instanceof DeclarationReflection) {
        if (Array.isArray(classSymbol.extendedTypes)) {
          for (const extendedType of classSymbol.extendedTypes) {
            if (
              extendedType.type === "reference" &&
              extendedType.name === symbolName
            ) {
              const implInfo = formatSymbolForLLM(classSymbol);
              implInfo.relationship = "extends";
              implementations.push(implInfo);
            }
          }
        }

        // Check implemented types (for interface implementations)
        if (isInterface && Array.isArray(classSymbol.implementedTypes)) {
          for (const implementedType of classSymbol.implementedTypes) {
            if (
              implementedType.type === "reference" &&
              implementedType.name === symbolName
            ) {
              const implInfo = formatSymbolForLLM(classSymbol);
              implInfo.relationship = "implements";
              implementations.push(implInfo);
            }
          }
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
      return formatSymbolForLLM(symbol);
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

    return matchingSymbols.map((symbol) => formatSymbolForLLM(symbol));
  }

  /**
   * Gets the type hierarchy of a symbol.
   *
   * @param symbol - The symbol
   * @returns The type hierarchy
   */
  getTypeHierarchy(symbol: DeclarationReflection): TypeHierarchy {
    const kindName = getKindName(symbol.kind);
    const result: TypeHierarchy = {
      name: symbol.name,
      kind: kindName,
      description: getDescription(symbol),
    };

    // Add parent types
    if (Array.isArray(symbol.extendedTypes)) {
      result.extends = [];

      for (const extendedType of symbol.extendedTypes) {
        if (extendedType instanceof ReferenceType) {
          const parentSymbol = extendedType.reflection;
          if (parentSymbol instanceof DeclarationReflection) {
            result.extends.push(this.getTypeHierarchy(parentSymbol));
          } else {
            result.extends.push({
              name: extendedType.name,
              kind: "Unknown",
              description: "",
            });
          }
        }
      }
    }

    // Add implemented interfaces
    if (Array.isArray(symbol.implementedTypes)) {
      result.implements = [];

      for (const implementedType of symbol.implementedTypes) {
        if (implementedType instanceof ReferenceType) {
          const parentSymbol = implementedType.reflection;
          if (parentSymbol instanceof DeclarationReflection) {
            result.implements.push(this.getTypeHierarchy(parentSymbol));
          } else {
            result.implements.push({
              name: implementedType.name,
              kind: "Unknown",
              description: "",
            });
          }
        }
      }
    }

    // Add implementations (for interfaces)
    if (kindName === "Interface") {
      const implementations = this.findImplementations(symbol);
      if (implementations.length > 0) {
        result.implementedBy = implementations;
      }
    }

    // Add subclasses (for classes)
    if (kindName === "Class") {
      const subclasses = this.findImplementations(symbol).filter(
        (impl) => impl.relationship === "extends",
      );
      if (subclasses.length > 0) {
        result.extendedBy = subclasses;
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
  findUsages(symbol: DeclarationReflection): SymbolInfo[] {
    const usages: SymbolInfo[] = [];
    // Check all symbols for references to this symbol
    for (const otherSymbol of this.symbolsById.values()) {
      // Skip the symbol itself
      if (otherSymbol.id === symbol.id) continue;

      if (reflectionIsReferencing(otherSymbol, symbol.name)) {
        usages.push(formatSymbolForLLM(otherSymbol));
      }
    }
    return usages;
  }

  /**
   * Handles the search_symbols tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleSearchSymbols(args: SearchSymbolsParams) {
    const { query, kind, limit } = args;

    return this.searchSymbols(query, kind, limit);
  }

  /**
   * Handles the get_symbol_details tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleGetSymbolDetails(args: GetSymbolDetailsParams) {
    const symbols = this.lookupSymbols(args);

    return symbols.map((symbol) => formatDetailSymbols(symbol));
  }

  private lookupSymbols(args: GetSymbolDetailsParams) {
    const params = schemas.baseHandlerSchema.parse(args);

    const symbols = getSymbolsByParams(
      params,
      this.project,
      this.symbolsByName,
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
        symbol.kind !== ReflectionKind.Module
      ) {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Symbol is not a class, interface, enum, or module: ${symbol.name} (${getKindName(symbol.kind)})`,
        );
      }

      // Get members
      const members = this.getMembers(symbol, includeInherited);
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
    const symbols = this.lookupSymbols(args);

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
      const parameters = this.getParameters(symbol);
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
    const { query, limit } = args;

    // Search in descriptions
    return this.searchInDescriptions(query, limit);
  }

  /**
   * Handles the get_type_hierarchy tool.
   *
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleGetTypeHierarchy(args: GetTypeHierarchyParams) {
    const symbols = this.lookupSymbols(args);

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
  handleFindUsages(args: FindUsagesParams) {
    const symbols = this.lookupSymbols(args);

    const results: SymbolInfo[] = [];

    for (const symbol of symbols) {
      // Find usages
      const usages = this.findUsages(symbol);
      results.push(...usages);
    }

    return results;
  }
}
