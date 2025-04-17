import { describe, expect, it } from "vitest";

import { pipeline, cos_sim } from "@xenova/transformers";
import { VectorDB } from "../src/mcp-server/core/search-service.js";

describe("vectordb", () => {
  it("should work", async () => {
    const db = new VectorDB<string>();
    const entries = [
      "Make Vertex",
      "graph.add_node",
      "clear diagram",
      "build flowchart layout",
      "draw an organization chart",
      "Generate Relationship",
      "HierarchicalLayout",
      "TreeLayout",
      "Build Arc",
      "Grow Banana",
      "Eat Apple",
      "Drive Car",
      "Race a bike",
    ];

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
      "How to use an automobile?",
      "Organizational Chart",
      "Ancestry Tree",
      "layered layout",
      "I want to go fast on two wheels",
    ];

    for (const entry of testEntries) {
      const res = await db.search(entry, 1, 2);
      expect(res.length).toBeGreaterThan(0);
      console.log(`Entry ${entry} matches ${res[0].value}`);
    }
  });
  it("should embed", async () => {
    const pipe = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
    );

    async function embed(batch: string[]) {
      const result: number[][] = [];
      // Given a batch of strings, we will use the `pipe` function to get
      // the vector embedding of each string.
      for (const text of batch) {
        // 'mean' pooling and normalizing allows the embeddings to share the
        // same length.
        const res = await pipe(text, { pooling: "mean", normalize: true });
        result.push(Array.from(res["data"]));
      }
      return result;
    }

    const entries = [
      "Make Vertex",
      "graph.add_node",
      "clear diagram",
      "build flowchart layout",
      "draw an organization chart",
      "Generate Relationship",
      "HierarchicalLayout",
      "TreeLayout",
      "Build Arc",
      "Grow Banana",
      "Eat Apple",
      "Drive Car",
      "Race a bike",
    ];
    const res = await embed(entries);

    for (let i = 0; i < res.length; i++) {
      for (let j = i + 1; j < res.length; j++) {
        const similarity = cos_sim(res[i], res[j]);
        console.log(
          `Similarity between "${entries[i]}" and "${entries[j]}" is:`,
          similarity,
        );
      }
    }

    const testEntries = [
      "How to create a node?",
      "make items in a chart",
      "How to create an edge in a graph?",
      "How to make a vertex?",
      "How to generate a relationship?",
      "How to build an arc?",
      "How to raise a yellow fruit?",
      "How to put a nice red round fruit in your mouth?",
      "How to use an automobile?",
      "Organizational Chart",
      "Ancestry Tree",
      "layered layout",
      "I want to go fast on two wheels",
    ];

    const testRes = await embed(testEntries);

    const bestMatches = [];

    for (let i = 0; i < testRes.length; i++) {
      let bestMatchIndex = -1;
      let bestMatchScore = -1;

      for (let j = 0; j < res.length; j++) {
        const similarity = cos_sim(testRes[i], res[j]);
        if (similarity > bestMatchScore) {
          bestMatchIndex = j;
          bestMatchScore = similarity;
        }
      }

      bestMatches.push({
        testEntry: testEntries[i],
        bestMatch: entries[bestMatchIndex],
        similarity: bestMatchScore,
      });
    }

    console.log("Best matches for test entries:");
    bestMatches.forEach((match) => {
      console.log(
        `"${match.testEntry}" is best matched with "${match.bestMatch}" with similarity ${match.similarity}`,
      );
    });
  });
});

/*
describe("kuzu", () => {
  it("should work", async () => {
    // Create an empty on-disk database and connect to it
    const db = new kuzu.Database(":memory:");
    const conn = new kuzu.Connection(db);

    await conn.query("INSTALL vector; LOAD vector;");

    // Create the tables
    await conn.query(
      "CREATE NODE TABLE User(name STRING, age INT64, user_embedding FLOAT[384], PRIMARY KEY (name))",
    );
    await conn.query(
      "CREATE REL TABLE Follows(FROM User TO User, since INT64)",
    );

    await conn.query(
      "MERGE (a:User {name: 'Alice'})-[:Follows {since: 2021}]->(b:User {name: 'Bob'})",
    );

    await conn.query(`
    CALL CREATE_VECTOR_INDEX(
    'User',
    'user_vec_index',
    'user_embedding'
);  `);

    const queryResult = await conn.query(
      "MATCH (a:User)-[f:Follows]->(b:User) RETURN a.name, f.since, b.name;",
    );

    // Get all rows from the query result
    const rows = await queryResult.getAll();

    // Print the rows
    for (const row of rows) {
      console.log(row);
    }
  });
});
*/
