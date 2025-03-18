import {beforeAll, describe, expect, it} from 'vitest';
import {TypeScriptApiHandlers} from '../src/mcp-server/handlers.js';
import {sampleTypeDocJson} from "./sampleTypeDocJson.js";

describe('TypeScriptApiHandlers', () => {
  let handlers: TypeScriptApiHandlers;

  beforeAll(() => {
    handlers = new TypeScriptApiHandlers(sampleTypeDocJson);
  });

  describe('getApiOverview', () => {
    it('should return an overview of the API', () => {
      const overview = handlers.getApiOverview();
      
      expect(overview.name).toBe('sample-api');
      expect(overview.totalSymbols).toBeGreaterThan(0);
      expect(overview.countByKind).toHaveProperty('Enum');
      expect(overview.countByKind).toHaveProperty('Interface');
      expect(overview.countByKind).toHaveProperty('Class');
      expect(overview.countByKind).toHaveProperty('Function');
      expect(overview.topLevelSymbols).toHaveLength(4);
      expect(JSON.stringify(overview.topLevelSymbols[0])).toBe(`{"id":1,"name":"TaskStatus","kind":"Enum","description":"Represents the status of a task."}`);
    });
  });

  describe('searchSymbols', () => {
    it('should find symbols by name', () => {
      const results = handlers.searchSymbols('Task');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(r => r.name === 'TaskStatus')).toBe(true);
      expect(results.some(r => r.name === 'TaskImpl')).toBe(true);
    });

    it('should filter symbols by kind', () => {
      const results = handlers.searchSymbols('Task', 'class');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results.every(r => r.kind === 'Class')).toBe(true);
      expect(results.some(r => r.name === 'TaskImpl')).toBe(true);
    });

    it('should limit the number of results', () => {
      const results = handlers.searchSymbols('', undefined, 2);
      
      expect(results.length).toBeLessThanOrEqual(2);
    });
  });

  describe('getMembers', () => {
    it('should get members of a class', () => {
      // First find the class
      const classResults = handlers.searchSymbols('TaskImpl', 'class');
      expect(classResults.length).toBeGreaterThan(0);
      
      // Get the class symbol from the handlers
      const classSymbol = (handlers as any).symbolsByName.get('TaskImpl');
      expect(classSymbol).toBeDefined();
      
      // Get members
      const members = handlers.getMembers(classSymbol, false);
      
      expect(members.length).toBeGreaterThan(0);
      expect(members.some(m => m.name === 'updateStatus')).toBe(true);
    });
  });

  describe('findImplementations', () => {
    it('should find implementations of an interface', () => {
      // First find the interface
      const interfaceResults = handlers.searchSymbols('User', 'interface');
      expect(interfaceResults.length).toBeGreaterThan(0);
      
      // Get the interface symbol from the handlers
      const interfaceSymbol = (handlers as any).symbolsByName.get('User');
      expect(interfaceSymbol).toBeDefined();
      
      // Find implementations
      const implementations = handlers.findImplementations(interfaceSymbol);
      
      // In our sample data, there are no implementations of User
      expect(implementations.length).toBe(0);
    });
  });

  describe('getParameters', () => {
    it('should get parameters of a function', () => {
      // First find the function
      const functionResults = handlers.searchSymbols('sortByPriority', 'function');
      expect(functionResults.length).toBeGreaterThan(0);
      
      // Get the function symbol from the handlers
      const functionSymbol = (handlers as any).symbolsByName.get('sortByPriority');
      expect(functionSymbol).toBeDefined();
      
      // Get parameters
      const parameters = handlers.getParameters(functionSymbol);
      
      expect(parameters.length).toBeGreaterThan(0);
      expect(parameters.some(p => p.name === 'tasks')).toBe(true);
    });
  });

  describe('searchInDescriptions', () => {
    it('should find symbols with descriptions containing a query', () => {
      const results = handlers.searchInDescriptions('task');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(r => r.name === 'TaskStatus')).toBe(true);
      // The method name is 'updateStatus' but its description contains 'task status'
      expect(results.some(r => r.description.toLowerCase().includes('task'))).toBe(true);
    });
  });
  
  describe('getTypeHierarchy', () => {
    it('should get the type hierarchy of a class', () => {
      // First find the class
      const classResults = handlers.searchSymbols('TaskImpl', 'class');
      expect(classResults.length).toBeGreaterThan(0);
      
      // Get the class symbol from the handlers
      const classSymbol = (handlers as any).symbolsByName.get('TaskImpl');
      expect(classSymbol).toBeDefined();
      
      // Get type hierarchy
      const hierarchy = handlers.getTypeHierarchy(classSymbol);
      
      expect(hierarchy.name).toBe('TaskImpl');
      expect(hierarchy.kind).toBe('Class');
    });
  });

  // Test the handler methods
  describe('handleSearchSymbols', () => {
    it('should handle search_symbols tool', () => {
      const result = handlers.handleSearchSymbols({ query: 'Task' });
      
      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('TaskStatus');
    });
  });

  describe('handleGetSymbolDetails', () => {
    it('should handle get_symbol_details tool', () => {
      const result = handlers.handleGetSymbolDetails({ name: 'TaskStatus' });
      
      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('TaskStatus');
    });
  });
});
