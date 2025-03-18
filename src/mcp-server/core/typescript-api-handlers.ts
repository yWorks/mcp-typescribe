/**
 * Core TypeScript API handlers class.
 */

import {ErrorCode, McpError} from '@modelcontextprotocol/sdk/types.js';
import {
  ApiOverview,
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
  TypeDocJson,
  TypeDocSymbol,
  TypeHierarchy,
} from '../types/index.js';
import {
  createHandlerResponse,
  findSymbolsByReturnType,
  findTypeReferences,
  formatParameterForLLM,
  formatSymbolForLLM,
  formatTypeHierarchyForLLM,
  getDescription,
  getSymbolsByParams,
  searchSymbolsByDescription,
  searchSymbolsByName,
  validateSymbolParams,
} from '../utils/index.js';
import {getKindName} from "../utils.js";
import {ReflectionKind} from "typedoc";

/**
 * Class that provides handlers for TypeScript API queries.
 */
export class TypeScriptApiHandlers {
  private symbolsById: Map<number, TypeDocSymbol> = new Map();
  private symbolsByName: Map<string, TypeDocSymbol> = new Map();
  private symbolsByKind: Map<number, TypeDocSymbol[]> = new Map();
  private apiDocs: TypeDocJson;

  /**
   * Creates a new TypeScriptApiHandlers instance.
   * 
   * @param apiDocs - The TypeDoc JSON documentation
   */
  constructor(apiDocs: TypeDocJson) {
    this.apiDocs = apiDocs;
    this.buildIndexes(apiDocs);
  }

  /**
   * Builds indexes for efficient symbol lookup.
   * 
   * @param docs - The TypeDoc JSON documentation
   */
  private buildIndexes(docs: TypeDocJson): void {
    // Process all children recursively
    const processChildren = (node: TypeDocSymbol) => {
      if (!node) return;
      
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
      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          processChildren(child);
        }
      }
    };
    
    processChildren(docs);
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
    
    return this.apiDocs.children.map((child: TypeDocSymbol) => ({
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
  searchSymbols(query: string, kind?: keyof ReflectionKind | "any", limit?: number): SymbolInfo[] {
    const symbols = Array.from(this.symbolsById.values());
    const matchingSymbols = searchSymbolsByName(query, symbols, kind, limit);
    
    return matchingSymbols.map(symbol => formatSymbolForLLM(symbol, this.symbolsById));
  }

  /**
   * Gets the members of a class or interface.
   * 
   * @param symbol - The class or interface symbol
   * @param includeInherited - Whether to include inherited members
   * @returns Array of members
   */
  getMembers(symbol: TypeDocSymbol, includeInherited: boolean): SymbolInfo[] {
    const members: SymbolInfo[] = [];
    
    // Add direct members
    if (Array.isArray(symbol.children)) {
      for (const child of symbol.children) {
        const kindName = getKindName(child.kind);
        if (kindName === 'Property' || kindName === 'Method') {
          const memberInfo = formatSymbolForLLM(child, this.symbolsById);
          memberInfo.inherited = false;
          members.push(memberInfo);
        }
      }
    }
    
    // Add inherited members if requested
    if (includeInherited && Array.isArray(symbol.extendedTypes)) {
      for (const extendedType of symbol.extendedTypes) {
        if (extendedType.type === 'reference' && extendedType.name) {
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
  getParameters(symbol: TypeDocSymbol): ParameterInfo[] {
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
  findImplementations(symbol: TypeDocSymbol): SymbolInfo[] {
    const implementations: SymbolInfo[] = [];
    const symbolName = symbol.name;
    const isInterface = getKindName(symbol.kind) === 'Interface';
    
    // Check all classes
    for (const classSymbol of this.symbolsByKind.get(128) || []) {
      // Check extended types (for subclasses)
      if (Array.isArray(classSymbol.extendedTypes)) {
        for (const extendedType of classSymbol.extendedTypes) {
          if (extendedType.type === 'reference' && extendedType.name === symbolName) {
            const implInfo = formatSymbolForLLM(classSymbol, this.symbolsById);
            implInfo.relationship = 'extends';
            implementations.push(implInfo);
          }
        }
      }
      
      // Check implemented types (for interface implementations)
      if (isInterface && Array.isArray(classSymbol.implementedTypes)) {
        for (const implementedType of classSymbol.implementedTypes) {
          if (implementedType.type === 'reference' && implementedType.name === symbolName) {
            const implInfo = formatSymbolForLLM(classSymbol, this.symbolsById);
            implInfo.relationship = 'implements';
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
    
    return matchingSymbols.map(symbol => {
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
    
    return matchingSymbols.map(symbol => formatSymbolForLLM(symbol, this.symbolsById));
  }

  /**
   * Gets the type hierarchy of a symbol.
   * 
   * @param symbol - The symbol
   * @returns The type hierarchy
   */
  getTypeHierarchy(symbol: TypeDocSymbol): TypeHierarchy {
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
        if (extendedType.type === 'reference' && extendedType.name) {
          const parentSymbol = this.symbolsByName.get(extendedType.name);
          if (parentSymbol) {
            result.extends.push(this.getTypeHierarchy(parentSymbol));
          } else {
            result.extends.push({
              name: extendedType.name,
              kind: 'Unknown',
              description: '',
            });
          }
        }
      }
    }
    
    // Add implemented interfaces
    if (Array.isArray(symbol.implementedTypes)) {
      result.implements = [];
      
      for (const implementedType of symbol.implementedTypes) {
        if (implementedType.type === 'reference' && implementedType.name) {
          const interfaceSymbol = this.symbolsByName.get(implementedType.name);
          if (interfaceSymbol) {
            result.implements.push(this.getTypeHierarchy(interfaceSymbol));
          } else {
            result.implements.push({
              name: implementedType.name,
              kind: 'Unknown',
              description: '',
            });
          }
        }
      }
    }
    
    // Add implementations (for interfaces)
    if (kindName === 'Interface') {
      const implementations = this.findImplementations(symbol);
      if (implementations.length > 0) {
        result.implementedBy = implementations;
      }
    }
    
    // Add subclasses (for classes)
    if (kindName === 'Class') {
      const subclasses = this.findImplementations(symbol).filter(impl => impl.relationship === 'extends');
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
  findUsages(symbol: TypeDocSymbol): SymbolInfo[] {
    const usages: SymbolInfo[] = [];
    const symbolName = symbol.name;
    
    // Check all symbols for references to this symbol
    for (const otherSymbol of this.symbolsById.values()) {
      // Skip the symbol itself
      if (otherSymbol.id === symbol.id) continue;
      
      // Check extended types
      if (Array.isArray(otherSymbol.extendedTypes)) {
        for (const extendedType of otherSymbol.extendedTypes) {
          if (extendedType.type === 'reference' && extendedType.name === symbolName) {
            const usageInfo = formatSymbolForLLM(otherSymbol, this.symbolsById);
            usageInfo.relationship = 'extends';
            usages.push(usageInfo);
          }
        }
      }
      
      // Check implemented types
      if (Array.isArray(otherSymbol.implementedTypes)) {
        for (const implementedType of otherSymbol.implementedTypes) {
          if (implementedType.type === 'reference' && implementedType.name === symbolName) {
            const usageInfo = formatSymbolForLLM(otherSymbol, this.symbolsById);
            usageInfo.relationship = 'implements';
            usages.push(usageInfo);
          }
        }
      }
      
      // Check type references in properties, parameters, return types, etc.
      findTypeReferences(otherSymbol, symbolName, usages, this.symbolsById);
    }
    
    return usages;
  }

  /**
   * Handles the search_symbols tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleSearchSymbols(args: SearchSymbolsParams): any {
    const { query, kind, limit } = args;
    
    if (typeof query !== 'string') {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Query must be a string'
      );
    }
    
    const results = this.searchSymbols(query, kind, limit);
    
    return createHandlerResponse(results);
  }

  /**
   * Handles the get_symbol_details tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleGetSymbolDetails(args: GetSymbolDetailsParams): any {
    const symbols = this.lookupSymbols(args);

    const results = symbols.map(symbol => formatSymbolForLLM(symbol, this.symbolsById));
    
    return createHandlerResponse(results);
  }

  private lookupSymbols(args: GetSymbolDetailsParams) {
    if (!validateSymbolParams(args)) {
      throw new McpError(
          ErrorCode.InvalidParams,
          'At least one of name, id, names, or ids must be provided'
      );
    }

    const symbols = getSymbolsByParams(args, this.symbolsById, this.symbolsByName);

    if (symbols.length === 0) {
      throw new McpError(
          ErrorCode.InvalidRequest,
          `Symbol not found: ${args.name || args.id || args.names || args.ids}`
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
  handleListMembers(args: ListMembersParams): any {
    const { includeInherited = false } = args;
    
    const symbols = this.lookupSymbols(args);
    
    const results: SymbolInfo[] = [];
    
    for (const symbol of symbols) {
      // Check if symbol is a class or interface
      const kindName = getKindName(symbol.kind);
      if (kindName !== 'Class' && kindName !== 'Interface') {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Symbol is not a class or interface: ${symbol.name} (${kindName})`
        );
      }
      
      // Get members
      const members = this.getMembers(symbol, includeInherited);
      results.push(...members);
    }
    
    return createHandlerResponse(results);
  }

  /**
   * Handles the get_parameter_info tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleGetParameterInfo(args: GetParameterInfoParams): any {
    const symbols = this.lookupSymbols(args);

    const results: ParameterInfo[] = [];
    
    for (const symbol of symbols) {
      // Check if symbol is a function or method
      const kindName = getKindName(symbol.kind);
      if (kindName !== 'Function' && kindName !== 'Method') {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Symbol is not a function or method: ${symbol.name} (${kindName})`
        );
      }
      
      // Get parameters
      const parameters = this.getParameters(symbol);
      results.push(...parameters);
    }
    
    return createHandlerResponse(results);
  }

  /**
   * Handles the find_implementations tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleFindImplementations(args: FindImplementationsParams): any {
    const symbols = this.lookupSymbols(args);

    const results: SymbolInfo[] = [];
    
    for (const symbol of symbols) {
      // Check if symbol is a class or interface
      const kindName = getKindName(symbol.kind);
      if (kindName !== 'Class' && kindName !== 'Interface') {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Symbol is not a class or interface: ${symbol.name} (${kindName})`
        );
      }
      
      // Find implementations
      const implementations = this.findImplementations(symbol);
      results.push(...implementations);
    }
    
    return createHandlerResponse(results);
  }

  /**
   * Handles the search_by_return_type tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleSearchByReturnType(args: SearchByReturnTypeParams): any {
    const { typeName } = args;
    
    // Find functions and methods with matching return type
    const results = this.findByReturnType(typeName);
    
    return createHandlerResponse(results);
  }

  /**
   * Handles the search_by_description tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleSearchByDescription(args: SearchByDescriptionParams): any {
    const { query } = args;
    
    // Search in descriptions
    const results = this.searchInDescriptions(query);
    
    return createHandlerResponse(results);
  }

  /**
   * Handles the get_type_hierarchy tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleGetTypeHierarchy(args: GetTypeHierarchyParams): any {
    const symbols = this.lookupSymbols(args);

    const results: TypeHierarchy[] = [];
    
    for (const symbol of symbols) {
      // Get type hierarchy
      const hierarchy = this.getTypeHierarchy(symbol);
      results.push(hierarchy);
    }
    
    return createHandlerResponse(results);
  }

  /**
   * Handles the find_usages tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleFindUsages(args: FindUsagesParams): any {
    const symbols = this.lookupSymbols(args);
    
    const results: SymbolInfo[] = [];
    
    for (const symbol of symbols) {
      // Find usages
      const usages = this.findUsages(symbol);
      results.push(...usages);
    }
    
    return createHandlerResponse(results);
  }
}
