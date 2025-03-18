import { describe, it, expect, beforeAll } from 'vitest';
import { TypeScriptApiHandlers } from '../src/mcp-server/handlers.js';
import { TypeDocJson } from '../src/mcp-server/types.js';

// Sample TypeDoc JSON for testing
const sampleTypeDocJson: TypeDocJson = {
  id: 0,
  name: 'sample-api',
  kind: 1,
  kindString: 'Project',
  children: [
    {
      id: 1,
      name: 'TaskStatus',
      kind: 8, // Enum
      kindString: 'Enum',
      comment: {
        summary: [
          {
            kind: 'text',
            text: 'Represents the status of a task.'
          }
        ]
      },
      children: [
        {
          id: 2,
          name: 'PENDING',
          kind: 16, // EnumMember
          kindString: 'EnumMember',
          comment: {
            summary: [
              {
                kind: 'text',
                text: 'Task has not been started yet'
              }
            ]
          }
        },
        {
          id: 3,
          name: 'IN_PROGRESS',
          kind: 16, // EnumMember
          kindString: 'EnumMember',
          comment: {
            summary: [
              {
                kind: 'text',
                text: 'Task is currently in progress'
              }
            ]
          }
        }
      ]
    },
    {
      id: 4,
      name: 'User',
      kind: 256, // Interface
      kindString: 'Interface',
      comment: {
        summary: [
          {
            kind: 'text',
            text: 'Represents a user in the system.'
          }
        ]
      },
      children: [
        {
          id: 5,
          name: 'id',
          kind: 1024, // Property
          kindString: 'Property',
          comment: {
            summary: [
              {
                kind: 'text',
                text: 'Unique identifier for the user'
              }
            ]
          },
          type: {
            type: 'intrinsic',
            name: 'string'
          }
        },
        {
          id: 6,
          name: 'name',
          kind: 1024, // Property
          kindString: 'Property',
          comment: {
            summary: [
              {
                kind: 'text',
                text: 'Full name of the user'
              }
            ]
          },
          type: {
            type: 'intrinsic',
            name: 'string'
          }
        }
      ]
    },
    {
      id: 7,
      name: 'TaskImpl',
      kind: 128, // Class
      kindString: 'Class',
      comment: {
        summary: [
          {
            kind: 'text',
            text: 'Represents a concrete implementation of a task with additional functionality.'
          }
        ]
      },
      children: [
        {
          id: 8,
          name: 'constructor',
          kind: 512, // Constructor
          kindString: 'Constructor',
          signatures: [
            {
              id: 9,
              name: 'constructor',
              kind: 16384, // ConstructorSignature
              kindString: 'Constructor signature',
              comment: {
                summary: [
                  {
                    kind: 'text',
                    text: 'Creates a new TaskImpl instance.'
                  }
                ]
              },
              parameters: [
                {
                  id: 10,
                  name: 'task',
                  kind: 32768, // Parameter
                  kindString: 'Parameter',
                  type: {
                    type: 'reference',
                    name: 'Task'
                  }
                }
              ]
            }
          ]
        },
        {
          id: 11,
          name: 'updateStatus',
          kind: 2048, // Method
          kindString: 'Method',
          signatures: [
            {
              id: 12,
              name: 'updateStatus',
              kind: 4096, // CallSignature
              kindString: 'Call signature',
              comment: {
                summary: [
                  {
                    kind: 'text',
                    text: 'Updates the task status and records the change in history.'
                  }
                ]
              },
              parameters: [
                {
                  id: 13,
                  name: 'status',
                  kind: 32768, // Parameter
                  kindString: 'Parameter',
                  type: {
                    type: 'reference',
                    name: 'TaskStatus'
                  }
                }
              ],
              type: {
                type: 'reference',
                name: 'this'
              }
            }
          ]
        }
      ],
      implementedTypes: [
        {
          type: 'reference',
          name: 'Task'
        }
      ]
    },
    {
      id: 14,
      name: 'sortByPriority',
      kind: 64, // Function
      kindString: 'Function',
      comment: {
        summary: [
          {
            kind: 'text',
            text: 'Sorts tasks by priority (highest first).'
          }
        ]
      },
      signatures: [
        {
          id: 15,
          name: 'sortByPriority',
          kind: 4096, // CallSignature
          kindString: 'Call signature',
          parameters: [
            {
              id: 17,
              name: 'tasks',
              kind: 32768, // Parameter
              kindString: 'Parameter',
              type: {
                type: 'array',
                elementType: {
                  type: 'reference',
                  name: 'T'
                }
              }
            }
          ],
          type: {
            type: 'array',
            elementType: {
              type: 'reference',
              name: 'T'
            }
          }
        }
      ]
    }
  ]
};

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
