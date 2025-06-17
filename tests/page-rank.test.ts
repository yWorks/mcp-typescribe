import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { PageRank } from "../src/index.js";
import {
  ConsoleLogger,
  Deserializer,
  FileRegistry,
  ProjectReflection,
} from "typedoc";
// @ts-expect-error kuzu's typings are a mess
import { QueryResult } from "kuzu";
import { createSampleProject } from "./create-sample.project.js";

describe("PageRank", { concurrent: false }, () => {
  let pageRank: PageRank;
  let project: ProjectReflection;

  beforeAll(async () => {
    // Create a real project using the deserializer
    // Use the Deserializer to create a real ProjectReflection
    const deserializer = new Deserializer(new ConsoleLogger());
    project = deserializer.reviveProject(
      "test-project",
      createSampleProject(),
      {
        projectRoot: "/",
        registry: new FileRegistry(),
      },
    );

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

    const countNodesResult = (await connection.query(
      "MATCH (n) RETURN COUNT(n) AS count",
    )) as QueryResult;
    const countNodesRows = await countNodesResult.getAll();
    expect(countNodesRows[0]["count"] as number).toBe(3);

    const countRelationsResult = (await connection.query(
      "MATCH ()-[r:References]->() RETURN COUNT(r) AS count",
    )) as QueryResult;
    const countRelationsRows = await countRelationsResult.getAll();
    expect(countRelationsRows[0]["count"] as number).toBe(3);

    countNodesResult.close();
    countRelationsResult.close();
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

  it("should dispose resources correctly", async () => {
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
