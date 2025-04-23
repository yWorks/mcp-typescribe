import { describe, expect, it } from "vitest";
import { VectorDB } from "../src/mcp-server/core/search-service.js";

describe("search-service", () => {
  it("should match", async () => {
    const db = new VectorDB<string>();
    const entries = [
      "graph.add_node",
      "draw an organization chart",
      "graph.create_Edge",
      "Make Vertex",
      "Generate Relationship",
      "Build Arc",
      "Grow Banana",
      "Eat Apple",
      "draw an organization chart",
      "HierarchicalLayout",
      "clear diagram",
      "build flowchart layout",
      "TreeLayout",
      "Drive Car",
      "Race a bike",
    ] as const;

    entries.forEach((entry) => {
      db.add(entry, entry);
    });

    const testEntries = [
      "How to create a node?",
      "make items in a chart",
      "How to create an edge in a graph?",
      "How to make a vertex?",
      "How to generate a relationship?",
      "How to build an arc?",
      "How to raise a yellow fruit?",
      "How to put a nice red round fruit in your mouth?",
      "Organizational Chart",
      "Ancestry Tree",
      "layered layout",
      "How to use an automobile?",
      "I want to go fast on two wheels",
    ] as const;

    for (let i = 0; i < Math.min(entries.length, testEntries.length); i++) {
      const res = await db.search(testEntries[i], 1, 2);
      expect(res.length).toBeGreaterThan(0);
      expect(res[0].distance).toBeLessThan(2);
      if (i < 5) {
        expect(res[0].value, `Matching "${testEntries[i]}"`).toBe(entries[i]);
      }
    }
  });
});
