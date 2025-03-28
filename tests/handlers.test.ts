import {beforeAll, describe, expect, it} from 'vitest';
import {TypeScriptApiHandlers} from '../src/mcp-server/core/typescript-api-handlers.js';
import {sampleTypeDocJson} from "./sampleTypeDocJson.js";

describe('TypeScriptApiHandlers', () => {
    let handlers: TypeScriptApiHandlers;

    beforeAll(() => {
        handlers = new TypeScriptApiHandlers(sampleTypeDocJson);
    });

    describe('getApiOverview', () => {
        it('should return an overview of the API', () => {
            const overview = handlers.getApiOverview();

            expect(overview.name).toBe('typescript-api-mcp');
            expect(overview.totalSymbols).toBeGreaterThan(0);
            expect(overview.countByKind).toHaveProperty('Enum');
            expect(overview.countByKind).toHaveProperty('Interface');
            expect(overview.countByKind).toHaveProperty('Class');
            expect(overview.countByKind).toHaveProperty('Function');
            expect(overview.topLevelSymbols).toHaveLength(4);
            expect(overview.topLevelSymbols[0].id).toBe(1);
            expect(overview.topLevelSymbols[0].name).toBe("index");
            expect(overview.topLevelSymbols[0].kind).toBe("Module");
            expect(overview.topLevelSymbols[0].description).toContain("Task Management API");
        });
    });

    describe('searchSymbols', () => {
        it('should find symbols by name', () => {
            const results = handlers.searchSymbols('Task');

            expect(results.length).toBeGreaterThan(0);
            expect(results.some(r => r.name === 'TaskStatus')).toBe(true);
        });

        it('should filter symbols by kind', () => {
            const results = handlers.searchSymbols('Uffgabe', "Class");

            expect(results.length).toBeGreaterThan(0);
            expect(results.every(r => r.kind === 'Class')).toBe(true);
            expect(results.some(r => r.name === 'UffgabeFaehler')).toBe(true);
        });

        it('should limit the number of results', () => {
            const results = handlers.searchSymbols('', undefined, 2);

            expect(results.length).toBeLessThanOrEqual(2);
        });
    });

    describe('getMembers', () => {
        it('should get members of a class', () => {
            // First find the class
            const classResults = handlers.searchSymbols('Uffgabe', 'Class');
            expect(classResults.length).toBeGreaterThan(0);

            // Get the class symbol from the handlers
            const classSymbol = (handlers as any).symbolsByName.get('TaschgInEcht');
            expect(classSymbol).toBeDefined();

            // Get members
            const members = handlers.getMembers(classSymbol, false);

            expect(members.length).toBeGreaterThan(0);
            expect(members.some(m => m.name === 'korrigiera')).toBe(true);
        });
    });

    describe('findImplementations', () => {
        it('should find implementations of an interface', () => {
            // First find the interface
            const interfaceResults = handlers.searchSymbols('Kerle', 'Interface');
            expect(interfaceResults.length).toBeGreaterThan(0);

            // Get the interface symbol from the handlers
            const interfaceSymbol = (handlers as any).symbolsByName.get('Kerle');
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
            const functionResults = handlers.searchSymbols('sortByPriority', 'Function');
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
            const classResults = handlers.searchSymbols('TaschgInEcht', 'Class');
            expect(classResults.length).toBeGreaterThan(0);

            // Get the class symbol from the handlers
            const classSymbol = (handlers as any).symbolsByName.get('TaschgInEcht');
            expect(classSymbol).toBeDefined();

            // Get type hierarchy
            const hierarchy = handlers.getTypeHierarchy(classSymbol);

            expect(hierarchy.name).toBe('TaschgInEcht');
            expect(hierarchy.kind).toBe('Class');
        });
    });

    // Test the handler methods
    describe('handleSearchSymbols', () => {
        it('should handle search_symbols tool', () => {
            const result = handlers.handleSearchSymbols({query: 'TaskStatus'});

            expect(result.length).toBeGreaterThan(0);
            expect(result[0].name).toBe('TaskStatus');
            expect(result[0].description).toContain('Represents the status of a task.');
        });
    });

    // Test the handler methods
    describe('handleListMembers', () => {
        it('should handle list_symbols tool', () => {
            const result = handlers.handleListMembers({name: 'TaskStatus'});

            expect(result.length).toBe(4);
            expect(result[0].kind).toBe("EnumMember");
            expect(result[0].name).toBe("FERTIG");
        });
    });

    describe('handleGetSymbolDetails', () => {
        it('should handle get_symbol_details tool', () => {
            const result = handlers.handleGetSymbolDetails({name: 'TaskStatus'});

            expect(result.length).toBe(1);
            expect(result[0].kind).toBe('Enum');
            expect(result[0].description).toContain('Represents the status of a task.');
        });
        it('should handle get_symbol_details for typealias', () => {
            const result = handlers.handleGetSymbolDetails({name: 'TaskOptions'});

            expect(result.length).toBe(1);
            expect(result[0].kind).toBe('TypeAlias');
            expect(result[0].description).toContain('{autoAssign: boolean, defaultPriority: Priority, tags: string[]}');
        });
        it('should show function signatures with the get details tool', () => {
            const result = handlers.handleGetSymbolDetails({name: 'summarizeTasksByStatus'});

            expect(result.length).toBe(1);
            expect(result[0].kind).toBe('CallSignature');
            expect(result[0].description).toContain('Generates a summary of tasks grouped by status.');

            expect(result[0].description).toContain('summarizeTasksByStatus<T extends Uffgabe<any>>(tasks: T[]): Record<TaskStatus, number>');
        });
        it('should handle get_symbol_details tool with lists', () => {
            const result = handlers.handleGetSymbolDetails({names: ['TaskStatus', 'Kerle']});

            expect(result.length).toBe(2);
            expect(result[0].kind).toBe('Enum');
            expect(result[0].description).toContain('Represents the status of a task.');
            expect(result[1].kind).toBe('Interface');
            expect(result[1].description).toContain('Represents a user in the system.');
        });
    });
});
