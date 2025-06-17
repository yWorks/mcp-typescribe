import {
  DeclarationReflection,
  ProjectReflection,
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
    await this.executeQuery(`
      CREATE NODE TABLE Types (
        id INT64,
        name STRING,
        kind INT64,
        PRIMARY KEY (id)
      )
    `);

    await this.executeQuery(`
      CREATE REL TABLE References (
        FROM Types TO Types,
        weight FLOAT
      )
    `);

    // Get all types (classes, interfaces, type aliases)
    const types = this.getAllTypes();

    // Insert nodes for all types
    for (const type of types) {
      await this.executeQuery(`
        CREATE (t:Types {id: ${type.id}, name: '${type.name.replace(/'/g, "''")}', kind: ${type.kind}})
      `);
    }

    // Insert edges for references between types
    for (const sourceType of types) {
      for (const targetType of types) {
        if (sourceType.id !== targetType.id) {
          // Check if source type references target type
          if (reflectionIsReferencing(sourceType, targetType.name)) {
            await this.executeQuery(`
              MATCH (source:Types {id: ${sourceType.id}}), (target:Types {id: ${targetType.id}})
              CREATE (source)-[r:References]->(target)
            `);
          }
        }
      }
    }

    await this.executeQuery(`INSTALL ALGO; LOAD EXTENSION ALGO;`);
  }

  /**
   * Computes page ranks for all types in the project.
   *
   * @returns A map of type IDs to their page rank scores
   */
  async computePageRanks(): Promise<Map<number, number>> {
    // Execute PageRank algorithm using Kuzu and process the result
    return (await this.executeQuery(
      `
      CALL project_graph('Graph', ['Types'], ['References']);

      CALL page_rank('Graph')
      RETURN node.id as id, rank ORDER BY rank DESC;
    `,
      async (result) => {
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
      },
    ))!;
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
   * Executes a query and optionally processes the result with a callback.
   * Ensures the result is closed after processing.
   *
   * @param query - The SQL query to execute
   * @param callback - Optional function to process the query result
   * @returns The result of the callback if provided, otherwise void
   */
  private async executeQuery<T = void>(
    query: string,
    callback?: (result: kuzu.QueryResult | kuzu.QueryResult[]) => Promise<T>,
  ): Promise<T | void> {
    const result = await this.connection.query(query);
    try {
      return await callback?.(result);
    } finally {
      this.closeQueryResult(result);
    }
  }

  /**
   * Closes a QueryResult or an Array of QueryResults.
   *
   * @param result - The query result or array of query results to close
   */
  private closeQueryResult(
    result: kuzu.QueryResult | kuzu.QueryResult[] | null | undefined,
  ): void {
    if (!result) return;

    if (Array.isArray(result)) {
      for (const r of result) {
        this.closeQueryResult(r);
      }
    } else {
      result.close();
    }
  }

  /**
   * Disposes of the database connection and resources.
   */
  async dispose(): Promise<void> {
    await this.connection.close();
    await this.db.close();
  }
}
