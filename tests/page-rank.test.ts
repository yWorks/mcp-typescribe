import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { PageRank } from "../src/index.js";
import {
  ConsoleLogger,
  Deserializer,
  FileRegistry,
  JSONOutput,
  ProjectReflection,
  ReflectionKind,
} from "typedoc";
// @ts-expect-error kuzu's typings are a mess
import { QueryResult } from "kuzu";

// Create a sample TypeDoc project for testing
function createSampleProject(): ProjectReflection {
  // Create a minimal JSON structure for a TypeDoc project
  const projectJson: JSONOutput.ProjectReflection = {
    name: "TestProject",
    kind: ReflectionKind.Project,
    schemaVersion: "2.0",
    flags: {},
    variant: "project", // Add variant property
    children: [
      {
        // @ts-expect-error weird id type
        id: 1,
        name: "Class1",
        kind: ReflectionKind.Class,
        flags: {},
        variant: "declaration", // Add variant property
        sources: [{ fileName: "test.ts", line: 1, character: 0 }],
        children: [
          {
            // @ts-expect-error weird id type
            id: 2,
            name: "interfaceProperty",
            kind: ReflectionKind.Property,
            flags: {},
            variant: "declaration",
            sources: [{ fileName: "test.ts", line: 2, character: 2 }],
            type: {
              type: "reference",
              name: "Interface1",
              target: 4,
            },
          },
          {
            // @ts-expect-error weird id type
            id: 3,
            name: "typeProperty",
            kind: ReflectionKind.Property,
            flags: {},
            variant: "declaration",
            sources: [{ fileName: "test.ts", line: 3, character: 2 }],
            type: {
              type: "reference",
              name: "Type1",
              target: 6,
            },
          },
        ],
      },
      {
        // @ts-expect-error weird id type
        id: 4,
        name: "Interface1",
        kind: ReflectionKind.Interface,
        flags: {},
        variant: "declaration", // Add variant property
        sources: [{ fileName: "test.ts", line: 10, character: 0 }],
        children: [
          {
            // @ts-expect-error weird id type
            id: 5,
            name: "typeProperty",
            kind: ReflectionKind.Property,
            flags: {},
            variant: "declaration",
            sources: [{ fileName: "test.ts", line: 11, character: 2 }],
            type: {
              type: "reference",
              name: "Type1",
              target: 6,
            },
          },
        ],
      },
      {
        // @ts-expect-error weird id type
        id: 6,
        name: "Type1",
        kind: ReflectionKind.TypeAlias,
        flags: {},
        variant: "declaration", // Add variant property
        sources: [{ fileName: "test.ts", line: 20, character: 0 }],
        type: {
          type: "intrinsic",
          name: "string",
        },
      },
    ],
    groups: [],
    sources: [{ fileName: "test.ts", line: 0, character: 0 }],
    // Add files property
    files: {
      // @ts-expect-error weird id type
      entries: { 1: "test.ts" },
      reflections: { 1: 0 },
    },
  };

  // Use the Deserializer to create a real ProjectReflection
  const deserializer = new Deserializer(new ConsoleLogger());
  return deserializer.reviveProject("test-project", projectJson, {
    projectRoot: "/",
    registry: new FileRegistry(),
  });
}

describe("PageRank", { concurrent: false }, () => {
  let pageRank: PageRank;
  let project: ProjectReflection;

  beforeAll(async () => {
    // Create a real project using the deserializer
    project = createSampleProject();

    // Create a new PageRank instance with the real project
    pageRank = new PageRank(project);
    await pageRank.buildGraph();
  });

  afterAll(async () => {
    await pageRank.dispose();
  });

  it("should build the graph correctly", async () => {
    // @ts-expect-error private property
    const connection = pageRank.connection;

    const countNodesResult = await connection.query(
      "MATCH (n) RETURN COUNT(n) AS count",
    );
    const countNodesRows = await (countNodesResult as QueryResult).getAll();
    expect(countNodesRows[0]["count"] as number).toBe(3);

    const countRelationsResult = await connection.query(
      "MATCH ()-[r:References]->() RETURN COUNT(r) AS count",
    );
    const countRelationsRows = await (
      countRelationsResult as QueryResult
    ).getAll();
    expect(countRelationsRows[0]["count"] as number).toBe(3);
  });

  it("should compute page ranks correctly", async () => {
    const pageRanks = await pageRank.computePageRanks();

    // Verify that pageRanks is a Map with the expected entries
    expect(pageRanks.size).toBe(3);

    // Check that all scores are numbers greater than 0
    const class1Rank = pageRanks.get(1)!;
    const interface1Rank = pageRanks.get(4)!;
    const type1Rank = pageRanks.get(6)!;

    expect(class1Rank).toBeGreaterThan(0);
    expect(interface1Rank).toBeGreaterThan(0);
    expect(type1Rank).toBeGreaterThan(0);

    expect(class1Rank).toBeLessThan(interface1Rank);
    expect(interface1Rank).toBeLessThan(type1Rank);
  });

  // skip test because of db.close issue (https://github.com/kuzudb/kuzu/issues/5545)
  it.skip("should dispose resources correctly", async () => {
    // Create a new instance to test disposal
    const testPageRank = new PageRank(project);

    // Get references to the connection and database
    // @ts-expect-error private property
    const connection = testPageRank.connection;
    // @ts-expect-error private property
    const db = testPageRank.db;

    // Spy on the close methods using Vitest's vi.spyOn
    const connectionCloseSpy = vi.spyOn(connection, "close");
    const dbCloseSpy = vi.spyOn(db, "close");

    // Dispose the resources
    await testPageRank.dispose();

    // Verify that the connection and database were closed
    expect(connectionCloseSpy).toHaveBeenCalled();
    expect(dbCloseSpy).toHaveBeenCalled();
  });
});
