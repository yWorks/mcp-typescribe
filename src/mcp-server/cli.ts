#!/usr/bin/env node
import { Command } from "commander";
import { TypescribeServer } from "./server.js";
import { createTypedoc } from "./typedoc-helper/create-typedoc.js";
import path from "path";
import { loadApiDocs } from "./core/index.js";

/**
 * Main entry point for the TypeScript API MCP server.
 */
const program = new Command().name("typescribe");

program
  .command("run-server")
  .argument("<typedocjson>", "Path to the TypeDoc JSON file")
  .description("Run the TypeScript API MCP server")
  .action(async function () {
    try {
      const server = new TypescribeServer();
      const docsPath = path.resolve(process.cwd(), this.args[0]);
      await server.initialize(docsPath);
      await server.run();
    } catch (error) {
      program.error("Failed to start server: " + error);
    }
  });

program
  .command("build-cache-db")
  .argument("<typedocjson>", "Path to the TypeDoc JSON file")
  .description("Build the database cache for the typedoc JSON file")
  .action(async function () {
    try {
      const docsPath = path.resolve(process.cwd(), this.args[0]);
      const handlers = await loadApiDocs(docsPath);
      await handlers.dispose();
    } catch (error) {
      program.error("Failed to start server: " + error);
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
    try {
      await createTypedoc(root, libraryName, tsConfigPath, output);
      console.log("Done");
      process.exit(0);
    } catch (error) {
      program.error("Failed to create api.json file " + error);
    }
  });

program.parse();
