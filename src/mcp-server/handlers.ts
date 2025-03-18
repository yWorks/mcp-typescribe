import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import {
  TypeDocSymbol,
  TypeDocJson,
  SymbolInfo,
  ParameterInfo,
  TypeHierarchy,
  ApiOverview
} from './types.js';
import {
  getKindName,
  getDescription,
  createSymbolInfo,
  typeMatches
} from './utils.js';

/**
 * Handlers for the TypeScript API MCP server.
 */

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
  searchSymbols(query: string, kind?: string, limit?: number): SymbolInfo[] {
    const results: SymbolInfo[] = [];
    const queryLower = query.toLowerCase();
    
    for (const symbol of this.symbolsById.values()) {
      if (!symbol.name) continue;
      
      // Check if name matches query
      if (symbol.name.toLowerCase().includes(queryLower)) {
        // Filter by kind if specified
        if (kind && kind !== 'any' && getKindName(symbol.kind).toLowerCase() !== kind.toLowerCase()) {
          continue;
        }
        
        results.push(createSymbolInfo(symbol));
      }
      
      // Apply limit if specified
      if (limit && results.length >= limit) {
        break;
      }
    }
    
    return results;
  }

  /**
   * Gets the parent name of a symbol.
   * 
   * @param symbol - The symbol
   * @returns The parent name
   */
  private getParentName(symbol: TypeDocSymbol): string {
    if (symbol.parentId !== undefined) {
      const parent = this.symbolsById.get(symbol.parentId);
      if (parent && parent.name) {
        return parent.name;
      }
    }
    return '';
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
          members.push({
            id: child.id,
            name: child.name,
            kind: kindName,
            description: getDescription(child),
            inherited: false,
          });
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
          parameters.push({
            id: param.id,
            name: param.name,
            type: param.type!,
            description: getDescription(param),
            optional: param.flags?.isOptional || false,
            defaultValue: param.defaultValue,
          });
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
            implementations.push({
              id: classSymbol.id,
              name: classSymbol.name,
              kind: 'Class',
              description: getDescription(classSymbol),
              relationship: 'extends',
            });
          }
        }
      }
      
      // Check implemented types (for interface implementations)
      if (isInterface && Array.isArray(classSymbol.implementedTypes)) {
        for (const implementedType of classSymbol.implementedTypes) {
          if (implementedType.type === 'reference' && implementedType.name === symbolName) {
            implementations.push({
              id: classSymbol.id,
              name: classSymbol.name,
              kind: 'Class',
              description: getDescription(classSymbol),
              relationship: 'implements',
            });
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
    const results: SymbolInfo[] = [];
    
    // Check functions
    for (const func of this.symbolsByKind.get(64) || []) {
      if (this.hasReturnType(func, typeName)) {
        results.push({
          id: func.id,
          name: func.name,
          kind: 'Function',
          description: getDescription(func),
        });
      }
    }
    
    // Check methods
    for (const method of this.symbolsByKind.get(2048) || []) {
      if (this.hasReturnType(method, typeName)) {
        results.push({
          id: method.id,
          name: method.name,
          kind: 'Method',
          description: getDescription(method),
          parentName: this.getParentName(method),
        });
      }
    }
    
    return results;
  }

  /**
   * Checks if a function or method has a specific return type.
   * 
   * @param symbol - The function or method symbol
   * @param typeName - The return type name
   * @returns True if the symbol has the return type
   */
  private hasReturnType(symbol: TypeDocSymbol, typeName: string): boolean {
    if (!Array.isArray(symbol.signatures)) return false;
    
    for (const signature of symbol.signatures) {
      if (signature.type && typeMatches(signature.type, typeName)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Searches for symbols with descriptions containing a query.
   * 
   * @param query - The search query
   * @returns Array of matching symbols
   */
  searchInDescriptions(query: string): SymbolInfo[] {
    const results: SymbolInfo[] = [];
    const queryLower = query.toLowerCase();
    
    for (const symbol of this.symbolsById.values()) {
      const description = getDescription(symbol);
      
      if (description.toLowerCase().includes(queryLower)) {
        results.push({
          id: symbol.id,
          name: symbol.name,
          kind: getKindName(symbol.kind),
          description,
        });
      }
    }
    
    return results;
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
      id: symbol.id,
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
              id: -1,
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
              id: -1,
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
    
    return result;
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
            usages.push({
              id: otherSymbol.id,
              name: otherSymbol.name,
              kind: getKindName(otherSymbol.kind),
              description: getDescription(otherSymbol),
              relationship: 'extends',
            });
          }
        }
      }
      
      // Check implemented types
      if (Array.isArray(otherSymbol.implementedTypes)) {
        for (const implementedType of otherSymbol.implementedTypes) {
          if (implementedType.type === 'reference' && implementedType.name === symbolName) {
            usages.push({
              id: otherSymbol.id,
              name: otherSymbol.name,
              kind: getKindName(otherSymbol.kind),
              description: getDescription(otherSymbol),
              relationship: 'implements',
            });
          }
        }
      }
      
      // Check type references in properties, parameters, return types, etc.
      this.findTypeReferences(otherSymbol, symbolName, usages);
    }
    
    return usages;
  }

  /**
   * Finds type references in a symbol.
   * 
   * @param symbol - The symbol to check
   * @param typeName - The type name to find
   * @param usages - Array to add usages to
   */
  private findTypeReferences(symbol: TypeDocSymbol, typeName: string, usages: SymbolInfo[]): void {
    // Check the symbol's type
    if (symbol.type && this.isTypeReference(symbol.type, typeName)) {
      usages.push({
        id: symbol.id,
        name: symbol.name,
        kind: getKindName(symbol.kind),
        description: getDescription(symbol),
        parentName: this.getParentName(symbol),
      });
    }
    
    // Check function/method signatures
    if (Array.isArray(symbol.signatures)) {
      for (const signature of symbol.signatures) {
        // Check return type
        if (signature.type && this.isTypeReference(signature.type, typeName)) {
          usages.push({
            id: symbol.id,
            name: symbol.name,
            kind: getKindName(symbol.kind),
            description: getDescription(symbol),
            parentName: this.getParentName(symbol),
          });
        }
        
        // Check parameter types
        if (Array.isArray(signature.parameters)) {
          for (const param of signature.parameters) {
            if (param.type && this.isTypeReference(param.type, typeName)) {
              usages.push({
                id: symbol.id,
                name: symbol.name,
                kind: getKindName(symbol.kind),
                description: getDescription(symbol),
                parentName: this.getParentName(symbol),
              });
              break; // Only add the symbol once
            }
          }
        }
      }
    }
  }

  /**
   * Checks if a type is a reference to a specific type.
   * 
   * @param type - The type to check
   * @param typeName - The type name to find
   * @returns True if the type is a reference to the type name
   */
  private isTypeReference(type: any, typeName: string): boolean {
    if (type.type === 'reference' && type.name === typeName) {
      return true;
    }
    
    if (type.type === 'array' && type.elementType) {
      return this.isTypeReference(type.elementType, typeName);
    }
    
    if (type.type === 'union' && Array.isArray(type.types)) {
      return type.types.some((t: any) => this.isTypeReference(t, typeName));
    }
    
    if (type.type === 'intersection' && Array.isArray(type.types)) {
      return type.types.some((t: any) => this.isTypeReference(t, typeName));
    }
    
    return false;
  }

  /**
   * Handles the search_symbols tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleSearchSymbols(args: any): any {
    const { query, kind, limit } = args;
    
    if (typeof query !== 'string') {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Query must be a string'
      );
    }
    
    const results = this.searchSymbols(query, kind, limit);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  }

  /**
   * Handles the get_symbol_details tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleGetSymbolDetails(args: any): any {
    const { name, id } = args;
    let symbol;
    
    if (name) {
      symbol = this.symbolsByName.get(name);
    } else if (id !== undefined) {
      symbol = this.symbolsById.get(id);
    }
    
    if (!symbol) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Symbol not found: ${name || id}`
      );
    }
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(symbol, null, 2),
        },
      ],
    };
  }

  /**
   * Handles the list_members tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleListMembers(args: any): any {
    const { name, includeInherited = false } = args;
    
    const symbol = this.symbolsByName.get(name);
    if (!symbol) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Symbol not found: ${name}`
      );
    }
    
    // Check if symbol is a class or interface
    const kindName = getKindName(symbol.kind);
    if (kindName !== 'Class' && kindName !== 'Interface') {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Symbol is not a class or interface: ${name} (${kindName})`
      );
    }
    
    // Get members
    const members = this.getMembers(symbol, includeInherited);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(members, null, 2),
        },
      ],
    };
  }

  /**
   * Handles the get_parameter_info tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleGetParameterInfo(args: any): any {
    const { functionName } = args;
    
    const symbol = this.symbolsByName.get(functionName);
    if (!symbol) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Function not found: ${functionName}`
      );
    }
    
    // Check if symbol is a function or method
    const kindName = getKindName(symbol.kind);
    if (kindName !== 'Function' && kindName !== 'Method') {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Symbol is not a function or method: ${functionName} (${kindName})`
      );
    }
    
    // Get parameters
    const parameters = this.getParameters(symbol);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(parameters, null, 2),
        },
      ],
    };
  }

  /**
   * Handles the find_implementations tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleFindImplementations(args: any): any {
    const { name } = args;
    
    const symbol = this.symbolsByName.get(name);
    if (!symbol) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Symbol not found: ${name}`
      );
    }
    
    // Check if symbol is a class or interface
    const kindName = getKindName(symbol.kind);
    if (kindName !== 'Class' && kindName !== 'Interface') {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Symbol is not a class or interface: ${name} (${kindName})`
      );
    }
    
    // Find implementations
    const implementations = this.findImplementations(symbol);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(implementations, null, 2),
        },
      ],
    };
  }

  /**
   * Handles the search_by_return_type tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleSearchByReturnType(args: any): any {
    const { typeName } = args;
    
    // Find functions and methods with matching return type
    const results = this.findByReturnType(typeName);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  }

  /**
   * Handles the search_by_description tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleSearchByDescription(args: any): any {
    const { query } = args;
    
    // Search in descriptions
    const results = this.searchInDescriptions(query);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  }

  /**
   * Handles the get_type_hierarchy tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleGetTypeHierarchy(args: any): any {
    const { name } = args;
    
    const symbol = this.symbolsByName.get(name);
    if (!symbol) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Symbol not found: ${name}`
      );
    }
    
    // Get type hierarchy
    const hierarchy = this.getTypeHierarchy(symbol);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(hierarchy, null, 2),
        },
      ],
    };
  }

  /**
   * Handles the find_usages tool.
   * 
   * @param args - The tool arguments
   * @returns The tool response
   */
  handleFindUsages(args: any): any {
    const { name } = args;
    
    const symbol = this.symbolsByName.get(name);
    if (!symbol) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Symbol not found: ${name}`
      );
    }
    
    // Find usages
    const usages = this.findUsages(symbol);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(usages, null, 2),
        },
      ],
    };
  }
}
