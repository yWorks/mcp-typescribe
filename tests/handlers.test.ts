import { beforeAll, describe, expect, it } from "vitest";
import { TypeScriptApiHandlers } from "../src/mcp-server/core/typescript-api-handlers.js";
import { sampleTypeDocJson } from "./sampleTypeDocJson.js";

describe("TypeScriptApiHandlers", () => {
  let handlers: TypeScriptApiHandlers;

  beforeAll(() => {
    handlers = new TypeScriptApiHandlers(sampleTypeDocJson);
  });

  describe("getApiOverview", () => {
    it("should return an overview of the API", () => {
      const overview = handlers.getApiOverview();

      expect(overview.name).toBe("typescript-api-mcp");
      expect(overview.totalSymbols).toBeGreaterThan(5);
      expect(overview.countByKind).toHaveProperty("Enum");
      expect(overview.countByKind).toHaveProperty("Interface");
      expect(overview.countByKind).toHaveProperty("Class");
      expect(overview.countByKind).toHaveProperty("Function");
      expect(overview.topLevelSymbols).toHaveLength(4);
      expect(overview.topLevelSymbols[0].id).toBe(1);
      expect(overview.topLevelSymbols[0].name).toBe("index");
      expect(overview.topLevelSymbols[0].kind).toBe("Module");
      expect(overview.topLevelSymbols[0].description).toContain(
        "Task Management API",
      );
    });
  });

  describe("searchSymbols", () => {
    it("should find symbols by name", () => {
      const results = handlers.searchSymbols("Task");

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.name === "TaskStatus")).toBe(true);
    });

    it("should filter symbols by kind", () => {
      const results = handlers.searchSymbols("Uffgabe", "Class");

      expect(results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.kind === "Class")).toBe(true);
      expect(results.some((r) => r.name === "UffgabeFaehler")).toBe(true);
    });

    it("should limit the number of results", () => {
      const results = handlers.searchSymbols("", undefined, 2);

      expect(results.length).toBeLessThanOrEqual(2);
    });
  });

  describe("getMembers", () => {
    it("should get members of a class", () => {
      // First find the class
      const classResults = handlers.searchSymbols("Uffgabe", "Class");
      expect(classResults.length).toBeGreaterThan(0);

      // Get the class symbol from the handlers
      const classSymbol = (handlers as any).symbolsByName.get("TaschgInEcht");
      expect(classSymbol).toBeDefined();

      // Get members
      const members = handlers.getMembers(classSymbol, false);

      expect(members.length).toBeGreaterThan(0);
      expect(members.some((m) => m.name === "korrigiera")).toBe(true);
    });
  });

  describe("findImplementations", () => {
    it("should find implementations of an interface", () => {
      // First find the interface
      const interfaceResults = handlers.searchSymbols("Kerle", "Interface");
      expect(interfaceResults.length).toBeGreaterThan(0);

      // Get the interface symbol from the handlers
      const interfaceSymbol = (handlers as any).symbolsByName.get("Kerle");
      expect(interfaceSymbol).toBeDefined();

      // Find implementations
      const implementations = handlers.findImplementations(interfaceSymbol);

      // In our sample data, there are no implementations of User
      expect(implementations.length).toBe(0);
    });
  });

  describe("getParameters", () => {
    it("should get parameters of a function", () => {
      // First find the function
      const functionResults = handlers.searchSymbols(
        "sortByPriority",
        "Function",
      );
      expect(functionResults.length).toBeGreaterThan(0);

      // Get the function symbol from the handlers
      const functionSymbol = (handlers as any).symbolsByName.get(
        "sortByPriority",
      );
      expect(functionSymbol).toBeDefined();

      // Get parameters
      const parameters = handlers.getParameters(functionSymbol);

      expect(parameters.length).toBeGreaterThan(0);
      expect(parameters.some((p) => p.name === "tasks")).toBe(true);
    });
  });

  describe("searchInDescriptions", () => {
    it("should find symbols with descriptions containing a query", () => {
      const results = handlers.searchInDescriptions("task");

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.name === "TaskStatus")).toBe(true);
      // The method name is 'updateStatus' but its description contains 'task status'
      expect(
        results.some((r) => r.description?.toLowerCase().includes("task")),
      ).toBe(true);
    });
  });

  describe("getTypeHierarchy", () => {
    it("should get the type hierarchy of a class", () => {
      // First find the class
      const classResults = handlers.searchSymbols("TaschgInEcht", "Class");
      expect(classResults.length).toBeGreaterThan(0);

      // Get the class symbol from the handlers
      const classSymbol = (handlers as any).symbolsByName.get("TaschgInEcht");
      expect(classSymbol).toBeDefined();

      // Get type hierarchy
      const hierarchy = handlers.getTypeHierarchy(classSymbol);

      expect(hierarchy.name).toBe("TaschgInEcht");
      expect(hierarchy.kind).toBe("Class");
    });
    it("should get the type hierarchy of an interface downwards", () => {
      // First find the class
      const classResults = handlers.handleGetTypeHierarchy({ name: "Uffgabe" });

      expect(classResults.length).toBe(1);
      expect(classResults[0].implementedBy).toBeDefined();
      expect(classResults[0].implementedBy!.length).toBeGreaterThan(0);
      expect(classResults[0].implementedBy![0].name).toBe("TaschgInEcht");
    });
    it("should get the type hierarchy of an interface upwards", () => {
      // First find the class
      const classResults = handlers.handleGetTypeHierarchy({
        name: "UffgabeWechFaehler",
      });

      expect(classResults.length).toBe(1);
      expect(classResults[0].extends).toBeDefined();
      expect(classResults[0].extends!.length).toBeGreaterThan(0);
      expect(classResults[0].extends![0].name).toBe("UffgabeFaehler");
    });
  });

  // Test the handler methods
  describe("handleSearchSymbols", () => {
    it("should handle search_symbols tool", () => {
      const result = handlers.handleSearchSymbols({ query: "TaskStatus" });

      expect(result.length).toBeGreaterThan(0);
      expect(result[0].name).toBe("TaskStatus");
      expect(result[0].description).toContain(
        "Represents the status of a [task]",
      );
    });
  });

  // Test the handler methods
  describe("handleListMembers", () => {
    it("should handle list_symbols tool", () => {
      const result = handlers.handleListMembers({ name: "TaskStatus" });

      expect(result.length).toBe(4);
      expect(result[0].kind).toBe("EnumMember");
      expect(result[0].name).toBe("FERTIG");
    });
  });
  describe("handleFindUsages", () => {
    it("should handle find_usages tool", () => {
      const result = handlers.handleFindUsages({ name: "TaskStatus" });

      console.log(result);

      expect(result.length).toBe(7);
      expect(result.some((r) => r.name === "constructor")).toBe(true);
      expect(
        result.some((r) =>
          r.description
            ?.toLowerCase()
            .includes("creates a new taskimpl instance."),
        ),
      ).toBe(true);
    });
    it("should handle find_usages tool with subclasses", () => {
      const result = handlers.handleFindUsages({ name: "UffgabeFaehler" });

      expect(result.length).toBe(3);
      expect(
        result.some((r) => r.description?.includes(" => UffgabeWechFaehler")),
      ).toBe(true);
    });
  });

  describe("handleGetSymbolDetails", () => {
    it("should handle get_symbol_details tool for enums", () => {
      const result = handlers.handleGetSymbolDetails({ name: "TaskStatus" });

      expect(result.length).toBe(1);
      expect(result[0].kind).toBe("Enum");
      expect(result[0].description).toContain(
        "Represents the status of a [task]",
      );
      expect(result[0]).toHaveProperty("children");
      expect(result[0].children).toHaveLength(4);
      expect(result[0].children![0]).not.toHaveProperty("children");
      expect(result[0].children!.some((c) => c.name === "FERTIG")).toBe(true);
    });
    it("should show the link in an inline tag", () => {
      const result = handlers.handleGetSymbolDetails({
        names: ["Uffgabe", "Kerle"],
      });
      expect(result).toHaveLength(2);
      expect(result[0].description).toContain(
        "Represents a task that can be assigned to a [user](",
      );
      expect(result[1].description).toContain(
        "Represents a user in the system.",
      );
      expect(result[1].id).toBeDefined();
      expect(result[0].description).toContain(
        `](api://symbol/${result[1].id})`,
      );
    });
    it("should handle get_symbol_details tool for modules", () => {
      const result = handlers.handleGetSymbolDetails({ name: "index" });

      expect(result.length).toBe(1);
      expect(result[0].kind).toBe("Module");
      expect(result[0].description).toContain("Task Management API");
      expect(result[0]).toHaveProperty("children");
      expect(result[0].children!.length).toBeGreaterThan(10);
      expect(result[0].children![0]).not.toHaveProperty("children");
      expect(
        result[0].children!.some(
          (c) => c.name === "calculateEstimatedCompletion",
        ),
      ).toBe(true);
    });
    it("should handle get_symbol_details for typealias", () => {
      const result = handlers.handleGetSymbolDetails({ name: "TaskOptions" });

      expect(result.length).toBe(1);
      expect(result[0].kind).toBe("TypeAlias");
      expect(result[0].description).toContain(
        "{ autoAssign?: boolean; defaultPriority?: Priority; tags?: string[] }",
      );
    });
    it("should show function signatures with the get details tool", () => {
      const result = handlers.handleGetSymbolDetails({
        name: "summarizeTasksByStatus",
      });

      expect(result.length).toBe(1);
      expect(result[0].kind).toBe("Function");
      expect(result[0].description).toContain(
        "Generates a summary of tasks grouped by status.",
      );

      expect(result[0].description).toContain(
        "summarizeTasksByStatus<T extends Uffgabe<any>>(tasks:T[]):Record<TaskStatus, number>",
      );
    });
    it("should handle get_symbol_details tool with lists", () => {
      const result = handlers.handleGetSymbolDetails({
        names: ["TaskStatus", "Kerle"],
      });

      expect(result.length).toBe(2);
      expect(result[0].kind).toBe("Enum");
      expect(result[0].description).toContain(
        "Represents the status of a [task]",
      );
      expect(result[1].kind).toBe("Interface");
      expect(result[1].description).toContain(
        "Represents a user in the system.",
      );
    });
  });
});
