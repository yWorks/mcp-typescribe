import { beforeAll, describe, expect, it } from "vitest";
import { Verbosity } from "../src/mcp-server/types.js";
import { extractSection, loadApiDocs } from "../src/index.js";
import { paginateArray, SearchResult } from "../src/index.js";
import { TypeScriptApiHandlers } from "../src/index.js";
import { RESOURCE_TEMPLATE_DEFINITIONS } from "../src/index.js";

function expectSearchResult<T>(
  result: T[] | SearchResult<T> | undefined,
): asserts result is SearchResult<T> {
  if (!result || Array.isArray(result)) {
    expect.fail("SearchResult should not be an array");
  }
}

function expectArray<T>(
  result: T[] | SearchResult<T> | undefined,
): asserts result is T[] {
  if (!result || !Array.isArray(result)) {
    expect.fail("SearchResult should be an array");
  }
}

describe("mcp-api", () => {
  it("should parse an uri", () => {
    const uriTemplate = RESOURCE_TEMPLATE_DEFINITIONS[2].uriTemplate;
    const variables = uriTemplate.match("api://doc/1?pageOffset=2");

    expect(variables).toBeDefined();
    expect(variables).not.toBeNull();
    expect(variables!.id).toBe("1");
    expect(variables!.pageOffset).toBe("2");

    const expanded = uriTemplate.expand({ id: "1", pageOffset: "2" });
    expect(expanded).toBe("api://doc/1?pageOffset=2");
    const expandedShort = uriTemplate.expand({ id: "1" });
    expect(expandedShort).toBe("api://doc/1");
  });
  it("should parse a section uri", () => {
    const uriTemplate = RESOURCE_TEMPLATE_DEFINITIONS[3].uriTemplate;
    const variables = uriTemplate.match("api://doc/1/slug?pageOffset=2");

    expect(variables).toBeDefined();
    expect(variables).not.toBeNull();
    expect(variables!.id).toBe("1");
    expect(variables!.section).toBe("slug");
    expect(variables!.pageOffset).toBe("2");

    const expanded = uriTemplate.expand({ id: "1", pageOffset: "2" });
    expect(expanded).toBe("api://doc/1/?pageOffset=2");
    const expandedShort = uriTemplate.expand({ id: "1", section: "slug" });
    expect(expandedShort).toBe("api://doc/1/slug");
    const expandedShortPlusHash = uriTemplate.expand({
      id: "1",
      section: "anchor",
    });
    expect(expandedShortPlusHash).toBe("api://doc/1/anchor");
    const expandedPlusHash = uriTemplate.expand({
      id: "1",
      pageOffset: "2",
      section: "anchor",
    });
    expect(expandedPlusHash).toBe("api://doc/1/anchor?pageOffset=2");
  });
});

const apiJson = await loadApiDocs("docs/api.json");

describe("TypeScriptApiHandlers", () => {
  let handlers: TypeScriptApiHandlers;

  beforeAll(() => {
    handlers = apiJson;
  });

  describe("getApiOverview", () => {
    it("should return an overview of the API", () => {
      const overview = handlers.getApiOverview();

      expect(overview.name).toBe("mcp-typescribe");
      expect(overview.documentation).toBeDefined();
      expect(overview.documentation).not.toContain(
        "# MCP-Typescribe - an MCP Server providing LLMs API information",
      );
      expect(overview.topLevelSymbols).toHaveLength(4);
      expect(overview.topLevelSymbols[0].id).toBe(1);
      expect(overview.topLevelSymbols[0].name).toBe("index");
      expect(overview.topLevelSymbols[0].kind).toBe("Module");
      expect(overview.topLevelSymbols[0].description).toContain(
        "Task Management API",
      );
    });
  });

  describe("MarkdownSpliter", () => {
    it("should split markdown", () => {
      const markdown = `
# Header 1

Some text 1

## Header 2

Some text 2

### Header 3

Some text 3

### Header 4

Some text 4

## Header 5

Some text 5

### Header 6

Some text 6

### Header 7

Some text 7
      `;

      const content = extractSection(markdown, "header-3");
      expect(content.filteredContent).toContain("Header 3");
      expect(content.filteredContent).toContain("Some text 3");
      expect(content.filteredContent).not.toContain("Header 5");
      expect(content.filteredContent).not.toContain("Some text 5");
      expect(content.breadcrumbs).toHaveLength(3);
      expect(content.breadcrumbs[0][1]).toBe("header-1");
      expect(content.breadcrumbs[0][0]).toBe("Header 1");
      expect(content.breadcrumbs[1][1]).toBe("header-2");
      expect(content.breadcrumbs[1][0]).toBe("Header 2");
    });
  });

  describe("getDocumentation", () => {
    it("should return the documentation page", async () => {
      const result = await handlers.handleGetDocumentation(
        19,
        0,
        "introduction",
      );
      expect(result).toBeDefined();
      expect(result).toContain("## Introduction");
      expect(result).toContain("Complete File [here](api://doc/19)");
      expect(result).toContain("Breadcrumbs: >> [Welcome to Our Project]");
      expect(result).not.toContain("# Welcome to Our Project");
      expect(result).not.toContain("Getting Started");
      expect(result).not.toContain("Thank you");
    });
    it("should return a documentation page section", async () => {
      const result = await handlers.handleGetDocumentation(19);
      expect(result).toBeDefined();
      expect(result).toContain("# External Markdown");
    });
    it("should return the README page", async () => {
      const result = await handlers.handleGetDocumentation(0);
      expect(result).toBeDefined();
      expect(result).toContain("README");
    });
    it("should include api-doc links in descriptions", async () => {
      const result = await handlers.handleGetSymbolDetails({ name: "Kerle" });
      expect(result).toHaveLength(2);
      expect(result).toBeDefined();
      expect(result[0].kind).toBe("Interface");
      expect(result[0].description).toContain(
        "To find out more about the API, please see [The getting started guide](api://doc/1/getting-started",
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
      expect(classResults.length).toBe(2);
      expect(classResults[0].name).toBe("UffgabeFaehler");
      expect(classResults[0].children).not.toBeDefined();
      expect(classResults[1].name).toBe("UffgabeWechFaehler");
      expect(classResults[1].children).not.toBeDefined();

      // Get the class symbol from the handlers
      const members = handlers.handleListMembers({ name: "TaschgMaenaedscha" });

      expect(members.length).toBe(6);
      const member = members.filter((m) => m.name === "bauWatt");
      expect(member).toHaveLength(1);
      expect(member[0].id).toBe(61);
      expect(member[0].description).toBe(
        "Creates a new task.\n" +
          "Signature: bauWatt(title:string,description:string,priority:Priority,options:TaskOptions):TaschgInEcht<T>\n",
      );
    });
  });

  describe("findImplementations", () => {
    it("should find implementations of an interface", () => {
      // First find the interface
      const interfaceResults = handlers.searchSymbols("Kerle", "Interface");
      expect(interfaceResults.length).toBeGreaterThan(0);

      // Get the interface symbol from the handlers
      const interfaceSymbol = handlers.getSymbolByName("Kerle");
      expect(interfaceSymbol).toHaveLength(2);

      // Find implementations
      const implementations = handlers.findImplementations(interfaceSymbol[0]);

      // In our sample data, there are no implementations of User
      expect(implementations.length).toBe(0);

      // Get the interface symbol from the handlers
      const interfaceSymbol2 = handlers.getSymbolByName("Uffgabe");
      expect(interfaceSymbol2).toHaveLength(1);

      // Find implementations
      const implementations2 = handlers.findImplementations(
        interfaceSymbol2[0],
      );

      // In our sample data, there are no implementations of User
      expect(implementations2.length).toBe(1);
      expect(implementations2[0].name).toBe("TaschgInEcht");
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
      const functionSymbol = handlers.getSymbolByName("sortByPriority");
      expect(functionSymbol).toBeDefined();
      expect(functionSymbol.length).toBeGreaterThan(0);

      // Get parameters
      const parameters = handlers.getParameters(
        functionSymbol[0],
        Verbosity.DETAIL,
      );

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

  describe("paging", () => {
    it("should support the limit argument", () => {
      const limit = 3;
      const offset = 0;

      const allResults = paginateArray(
        handlers.searchSymbols("task", "any"),
        {},
      );
      expectArray(allResults);
      expect(allResults.length).toBe(8);

      const firstPage = paginateArray(
        handlers.searchSymbols("task", "any", 4),
        { limit, offset: 0 },
      );

      const secondPage = paginateArray(
        handlers.searchSymbols("task", "any", 6),
        { limit, offset: limit },
      );

      expectSearchResult(firstPage);
      expectSearchResult(secondPage);

      expect(firstPage.result.length).toBe(limit);
      expect(secondPage.result.length).toBe(limit);
      expect(firstPage.result[0].id).toBe(allResults[0].id);
      expect(secondPage.result[0].id).toBe(allResults[limit].id);

      const thirdPage = paginateArray(
        handlers.searchSymbols("task", "any", limit + limit + limit + offset),
        { limit, offset: limit + limit },
      );
      expectSearchResult(thirdPage);
      expect(thirdPage.result.length).toBe(2);
    });
  });

  describe("getTypeHierarchy", () => {
    it("should get the type hierarchy of a class", () => {
      // First find the class
      const classResults = handlers.searchSymbols("TaschgInEcht", "Class");
      expect(classResults.length).toBeGreaterThan(0);

      // Get the class symbol from the handlers
      const classSymbol = handlers.getSymbolByName("TaschgInEcht");
      expect(classSymbol).toHaveLength(1);

      // Get type hierarchy
      const hierarchy = handlers.getTypeHierarchy(classSymbol[0]);

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
      const result = handlers.handleSearchSymbols({
        query: "prettyPrintTaskStatus",
      });

      expectArray(result);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].name).toBe("prettyPrintTaskStatus");
      expect(result[0].description).toContain(
        "Converts a [TaskStatus](api://symbol/",
      );
    });
  });

  // Test the handler methods
  describe("handleSearchSymbols", () => {
    it("should handle find_by_return_type tool", () => {
      const result = handlers.findByReturnType("Uffgabe");

      expect(result.length).toBeGreaterThan(0);
      expect(result[0].name).toBe("bauWatt");
      expect(result[0].description).toContain("Creates a new task");
    });
  });

  // Test the handler methods
  describe("handleListMembers", () => {
    it("should handle list_symbols tool", () => {
      const result = handlers.handleListMembers({ name: "TaskStatus" });

      expect(result.length).toBe(5);
      expect(result[0].kind).toBe("EnumMember");
      expect(result[0].name).toBe("FERTIG");
    });
    it("should handle list_symbols tool for modules", () => {
      const result = handlers.handleListMembers({ name: "types" });

      expect(result.length).toBe(8);
      expect(result[0].name).toBe("Kerle");
      expect(result[0].kind).toBe("Namespace");
      expect(result[1].description).not.toContain("\n");
    });
  });
  describe("handleFindUsages", () => {
    it("should handle find_usages tool", () => {
      const result = handlers.handleFindUsages({ name: "TaskStatus" });

      expectArray(result);
      expect(result.length).toBe(1);
      const innerResult = result[0];
      expectArray(innerResult);
      expect(innerResult.some((r) => r.name === "constructor")).toBe(true);
      expect(
        innerResult.some((r) =>
          r.description
            ?.toLowerCase()
            .includes("creates a new taskimpl instance."),
        ),
      ).toBe(true);
    });
    it("should handle find_usages tool with subclasses", () => {
      const result = handlers.handleFindUsages({ name: "UffgabeFaehler" });

      expect(result.length).toBe(1);
      expectArray(result[0]);
      expect(
        result[0].some((r) =>
          r.description?.includes(" => UffgabeWechFaehler"),
        ),
      ).toBe(true);
    });
  });

  describe("handleGetSymbolDetails", () => {
    it("should perform declaration merging for interfaces", () => {
      const result = handlers.getSymbolByName("TaskStatus");
      expect(result.length).toBe(2);

      const members = handlers.handleListMembers({ name: "TaskStatus" });
      expect(members).toHaveLength(5);

      const resultById = handlers.handleGetSymbolDetails({ id: result[0].id });
      expect(resultById).toHaveLength(2);
      expect(resultById[0].kind).toBe("Enum");
      expect(resultById[1].kind).toBe("Namespace");

      expect(resultById[0].description).toContain(
        `\n[NOTE!]\n> See also [TaskStatus **namespace**](api://symbol/${resultById[1].id}) members!`,
      );

      const membersById = handlers.handleListMembers({ id: result[0].id });
      expect(membersById).toHaveLength(4);
    });
    it("should handle get_symbol_details tool for enums", () => {
      const result = handlers.handleGetSymbolDetails({ name: "TaskStatus" });

      expectArray(result);

      expect(result.length).toBe(2);
      expect(result[0].kind).toBe("Enum");
      expect(result[0].description).toContain(
        "Represents the status of a [task]",
      );
      expect(result[0]).toHaveProperty("children");
      const children = result[0].children;
      expect(children).toHaveLength(4);
      expectArray(children);
      expect(children[0]).not.toHaveProperty("children");
      expect(children!.some((c) => c.name === "FERTIG")).toBe(true);
    });
    it("should show the link in an inline tag", () => {
      const result = handlers.handleGetSymbolDetails({
        names: ["Uffgabe", "Kerle"],
      });
      expect(result).toHaveLength(3);
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
    it("should show code examples", () => {
      const result = handlers.handleGetSymbolDetails({
        names: ["bauWatt"],
      });
      expect(result).toHaveLength(1);
      expect(result[0].description).toContain("Creates a new task.");
      expect(result[0].description).toContain(
        `const taskManager = new TaskManager();`,
      );
    });
    it("should show the link in the parent", () => {
      const result = handlers.handleGetSymbolDetails({
        names: ["Kerle", "types"],
      });
      expect(result).toHaveLength(3);
      expect(result[0].description).toContain(
        "Represents a user in the system.",
      );
      expect(result[2].name).toBe("types");
      expect(result[0].parent).toBeDefined();
      expect(result[0].parent).toContain(`](api://symbol/${result[2].id})`);
    });
    it("should handle get_symbol_details tool for modules", () => {
      const result = handlers.handleGetSymbolDetails({ name: "index" });

      expect(result.length).toBe(1);
      expect(result[0].kind).toBe("Module");
      expect(result[0].description).toContain("Task Management API");
      expect(result[0]).toHaveProperty("children");
      const children = result[0].children;
      expectArray(children);
      expect(children.length).toBeGreaterThan(10);
      expect(children[0]).not.toHaveProperty("children");
      expect(
        children!.some((c) => c.name === "calculateEstimatedCompletion"),
      ).toBe(true);
    });
    it("should handle get_symbol_details tool for inner modules", () => {
      const result = handlers.handleGetSymbolDetails({
        name: "taschg-maenaedscha",
      });

      expect(result.length).toBe(1);
      expect(result[0].kind).toBe("Module");
      expect(result[0]).toHaveProperty("children");
      const children = result[0].children;
      expectArray(children);
      expect(children.length).toBeGreaterThan(3);
      expect(children[0]).not.toHaveProperty("children");
      expect(children!.some((c) => c.name === "TaschgMaenaedscha")).toBe(true);
    });
    it("should handle get_symbol_details for typealias", () => {
      const result = handlers.handleGetSymbolDetails({ name: "TaskOptions" });
      expect(result.length).toBe(1);
      expect(result[0].kind).toBe("TypeAlias");
      expect(result[0].description).toContain('"defaultPriority": Priority?,');
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
        "summarizeTasksByStatus<T extends Uffgabe<unknown>>(tasks:T[]):Record<TaskStatus, number>",
      );
    });
    it("should handle get_symbol_details tool with lists", () => {
      const result = handlers.handleGetSymbolDetails({
        names: ["TaskStatus", "Kerle"],
      });

      expect(result.length).toBe(4);
      expect(result[0].kind).toBe("Enum");
      expect(result[1].kind).toBe("Namespace");
      expect(result[0].description).toContain(
        "Represents the status of a [task]",
      );
      expect(result[2].kind).toBe("Interface");
      expect(result[3].kind).toBe("Namespace");
      expect(result[2].description).toContain(
        "Represents a user in the system.",
      );
    });
  });
});
