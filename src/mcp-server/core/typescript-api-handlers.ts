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
  findSymbolsByReturnType,
  formatParameterForLLM,
  formatSymbolForLLM,
  formatTypeHierarchyForLLM,
  getDescription,
  getSymbolsByParams,
  reflectionIsReferencing,
  searchSymbolsByDescription,
  searchSymbolsByName,
  storeReference,
} from "../utils/index.js";
import { getKindName } from "../utils.js";
import { JSONOutput, ReflectionKind } from "typedoc";

type ProjectReflection = JSONOutput.ProjectReflection;
type DeclarationReflection = JSONOutput.DeclarationReflection;
type ContainerReflection = JSONOutput.ContainerReflection;

/**
 * Class that provides handlers for TypeScript API queries.
 */
export class TypeScriptApiHandlers {
  private symbolsById: Map<number, DeclarationReflection> = new Map();
  private symbolsByName: Map<string, DeclarationReflection> = new Map();
  private symbolsByKind: Map<number, DeclarationReflection[]> = new Map();
  private apiDocs: ProjectReflection;

  /**
   * Creates a new TypeScriptApiHandlers instance.
   *
   * @param apiDocs - The TypeDoc JSON documentation
   */
  constructor(apiDocs: ProjectReflection) {
    this.apiDocs = apiDocs;
    this.buildIndexes(apiDocs);
  }

  /**
   * Builds indexes for efficient symbol lookup.
   *
   * @param docs - The TypeDoc JSON documentation
   */
  private buildIndexes(docs: ProjectReflection): void {
    const referenceNodes: JSONOutput.ReferenceReflection[] = [];
    // Process all children recursively
    const processChildren = (node: DeclarationReflection) => {
      if (!node) return;
      if (node.kind === ReflectionKind.Reference) {
        referenceNodes.push(node as JSONOutput.ReferenceReflection);
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
      if (Array.isArray((node as ContainerReflection).children)) {
        for (const child of (node as ContainerReflection).children!) {
          processChildren(child);
        }
      }
    };

    processChildren(docs as unknown as DeclarationReflection);

    referenceNodes.forEach((node) => {
      const target = this.getSymbol(node);
      if (target) {
        storeReference(node, target);
      }
    });
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
      name: this.apiDocs.name,
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
    if (!this.apiDocs.children) return [];

    return this.apiDocs.children.map((child: DeclarationReflection) => ({
      id: child.id,
      name: child.name,
      kind: getKindName(child.kind),
      description: getDescription(child),
    }));
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
    const symbols = Array.from(this.symbolsById.values());
    const matchingSymbols = searchSymbolsByName(query, symbols, kind, limit);

    return matchingSymbols.map((symbol) =>
      formatSymbolForLLM(symbol, this.symbolsById),
    );
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
          const memberInfo = formatSymbolForLLM(child, this.symbolsById);
          memberInfo.inherited = false;
          members.push(memberInfo);
        }
      }
    }

    // Add inherited members if requested
    if (includeInherited && Array.isArray(symbol.extendedTypes)) {
      for (const extendedType of symbol.extendedTypes) {
        if (extendedType.type === "reference" && extendedType.name) {
          const parentSymbol = this.symbolsByName.get(extendedType.name);
          if (parentSymbol) {
            const parentMembers = this.getMembers(parentSymbol, true);
            for (const member of parentMembers) {
              member.inherited = true;
              member.inheritedFrom = extendedType.name;
              members.push(member);
            }
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
    for (const classSymbol of this.symbolsByKind.get(128) || []) {
      // Check extended types (for subclasses)
      if (Array.isArray(classSymbol.extendedTypes)) {
        for (const extendedType of classSymbol.extendedTypes) {
          if (
            extendedType.type === "reference" &&
            extendedType.name === symbolName
          ) {
            const implInfo = formatSymbolForLLM(classSymbol, this.symbolsById);
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
            const implInfo = formatSymbolForLLM(classSymbol, this.symbolsById);
            implInfo.relationship = "implements";
            implementations.push(implInfo);
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
    const symbols = Array.from(this.symbolsById.values());
    const matchingSymbols = findSymbolsByReturnType(typeName, symbols);

    return matchingSymbols.map((symbol) => {
      return formatSymbolForLLM(symbol, this.symbolsById);
    });
  }

  /**
   * Searches for symbols with descriptions containing a query.
   *
   * @param query - The search query
   * @returns Array of matching symbols
   */
  searchInDescriptions(query: string): SymbolInfo[] {
    const symbols = Array.from(this.symbolsById.values());
    const matchingSymbols = searchSymbolsByDescription(query, symbols);

    return matchingSymbols.map((symbol) =>
      formatSymbolForLLM(symbol, this.symbolsById),
    );
  }

  getSymbol(
    ref: JSONOutput.ReferenceType | JSONOutput.ReferenceReflection,
  ): DeclarationReflection | undefined {
    return this.symbolsById.get(ref.target as number);
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
        if (extendedType.type === "reference" && extendedType.name) {
          const parentSymbol = this.symbolsByName.get(extendedType.name);
          if (parentSymbol) {
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
        if (implementedType.type === "reference" && implementedType.name) {
          const interfaceSymbol = this.symbolsByName.get(implementedType.name);
          if (interfaceSymbol) {
            result.implements.push(this.getTypeHierarchy(interfaceSymbol));
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
        usages.push(formatSymbolForLLM(otherSymbol, this.symbolsById));
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

    return symbols.map((symbol) =>
      formatSymbolForLLM(symbol, this.symbolsById),
    );
  }

  private lookupSymbols(args: GetSymbolDetailsParams) {
    const params = schemas.baseHandlerSchema.parse(args);

    const symbols = getSymbolsByParams(
      params,
      this.symbolsById,
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
    const { query } = args;

    // Search in descriptions
    return this.searchInDescriptions(query);
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
