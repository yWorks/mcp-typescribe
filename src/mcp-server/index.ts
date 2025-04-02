#!/usr/bin/env node
import { Command } from "commander";
import { TypescribeServer } from "./server.js";
import { createTypedoc } from "./typedoc-helper/create-typedoc.js";
import path from "path";

/**
 * TypeScript API MCP server.
 * This file re-exports all modules from the various directories.
 */

export * from "./types/index.js";
export * from "./utils/index.js";
export * from "./schemas/index.js";
export * from "./core/index.js";
export * from "./server.js";

/**
 * Main entry point for the TypeScript API MCP server.
 */
async function main(): Promise<void> {
  const program = new Command();

  program
    .name("typescribe")
    .command("run-server")
    .argument("<typedocjson>", "Path to the TypeDoc JSON file")
    .description("Run the TypeScript API MCP server")
    .action(async () => {
      try {
        const server = new TypescribeServer();
        await server.initialize(program.args[0]);
        await server.run();
      } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
      }
    });

  program
    .command("create-api-json")
    .argument("<project-root>", "The root of the project")
    .argument("<library-name>", "The name of the library")
    .option("-o, --output <output>", "The output json file", "api.json")
    .option(
      "-c, --tsconfig <path>",
      "The path to the tsconfig file to use",
      undefined,
    )
    .description("Create the api.json file for a library in a given project")
    .action(async function () {
      const libraryName = this.args[1];
      const root = path.resolve(this.args[0]);
      const output = path.resolve(this.opts().output);
      const tsConfigPath = this.opts().tsconfig
        ? path.resolve(this.opts().tsconfig)
        : undefined;
      console.log(
        `Creating api.json for '${libraryName}' in ${root} with output ${output}.`,
      );
      await createTypedoc(root, libraryName, tsConfigPath, output);
      console.log("Done");
    });

  program.parse();
}

// Run the server
main().catch(console.error);
