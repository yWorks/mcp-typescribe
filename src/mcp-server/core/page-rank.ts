import {
  ProjectReflection,
  DeclarationReflection,
  ReflectionKind,
} from "typedoc";
import { reflectionIsReferencing } from "../utils/index.js";
// @ts-expect-error kuzu's typings are a mess
import * as kuzu from "kuzu";

/**
 * PageRank class for computing page ranks of types in a TypeDoc project.
 * Uses the kuzu library to build a graph and compute page ranks.
 *
 * The graph is constructed as follows:
 * - Nodes are types (classes, interfaces, type aliases)
 * - Two nodes are connected by an edge if one of the members of one type references the other type
 */
export class PageRank {
  private readonly db: kuzu.Database;
  private readonly connection: kuzu.Connection;
  private readonly project: ProjectReflection;
  private readonly typeKinds = [
    ReflectionKind.Class,
    ReflectionKind.Interface,
    ReflectionKind.TypeAlias,
  ];

  /**
   * Creates a new PageRank instance.
   *
   * @param project - The TypeDoc project to compute page ranks for
   */
  constructor(project: ProjectReflection) {
    // Initialize an in-memory kuzu database
    this.db = new kuzu.Database(":memory:");
    this.connection = new kuzu.Connection(this.db);
    this.project = project;
  }

  /**
   * Builds the graph from the TypeDoc project.
   * Creates nodes for all types and edges for references between types.
   */
  async buildGraph(): Promise<void> {
    // Create node and edge tables
    await this.connection.query(`
      CREATE NODE TABLE Types (
        id INT64,
        name STRING,
        kind INT64,
        PRIMARY KEY (id)
      )
    `);

    await this.connection.query(`
      CREATE REL TABLE References (
        FROM Types TO Types,
        weight FLOAT
      )
    `);

    // Get all types (classes, interfaces, type aliases)
    const types = this.getAllTypes();

    // Insert nodes for all types
    for (const type of types) {
      await this.connection.query(`
        CREATE (t:Types {id: ${type.id}, name: '${type.name.replace(/'/g, "''")}', kind: ${type.kind}})
      `);
    }

    // Insert edges for references between types
    for (const sourceType of types) {
      for (const targetType of types) {
        if (sourceType.id !== targetType.id) {
          // Check if source type references target type
          if (reflectionIsReferencing(sourceType, targetType.name)) {
            await this.connection.query(`
              MATCH (source:Types {id: ${sourceType.id}}), (target:Types {id: ${targetType.id}})
              CREATE (source)-[r:References]->(target)
            `);
          }
        }
      }
    }

    await this.connection.query(`INSTALL ALGO; LOAD EXTENSION ALGO;`);
  }

  /**
   * Computes page ranks for all types in the project.
   *
   * @returns A map of type IDs to their page rank scores
   */
  async computePageRanks(): Promise<Map<number, number>> {
    // Execute PageRank algorithm using Kuzu
    const result = await this.connection.query(`
      CALL project_graph('Graph', ['Types'], ['References']);

      CALL page_rank('Graph')
      RETURN node.id as id, rank ORDER BY rank DESC;
    `);

    if (!Array.isArray(result) || result.length !== 2) {
      throw new Error("unexpected query result");
    }

    // Convert result to a map of type IDs to page rank scores
    const rows = await result[1].getAll();
    const pageRanks = new Map<number, number>();
    for (const row of rows) {
      const id = row["id"] as number;
      const rank = row["rank"] as number;
      pageRanks.set(id, rank);
    }

    return pageRanks;
  }

  /**
   * Gets all types (classes, interfaces, type aliases) from the project.
   *
   * @returns An array of all types
   */
  private getAllTypes(): DeclarationReflection[] {
    return this.typeKinds
      .map((kind) => this.project.getReflectionsByKind(kind))
      .reduce((acc, types) => acc.concat(types), []) as DeclarationReflection[];
  }

  /**
   * Disposes of the database connection and resources.
   */
  async dispose(): Promise<void> {
    await this.connection.close();
    // There is a bug when closing the db ATM. See https://github.com/kuzudb/kuzu/issues/5545.
    // await this.db.close();
  }
}
