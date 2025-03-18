#!/usr/bin/env node
import { TypeScriptApiServer } from './server.js';

/**
 * TypeScript API MCP server.
 * This file re-exports all modules from the various directories.
 */

export * from './types/index.js';
export * from './utils/index.js';
export * from './schemas/index.js';
export * from './core/index.js';
export * from './server.js';

/**
 * Main entry point for the TypeScript API MCP server.
 */
async function main(): Promise<void> {
  try {
    const server = new TypeScriptApiServer();
    
    // Get the docs path from command line arguments or use default
    const docsPath = process.argv[2] || 'docs/api.json';
    
    await server.initialize(docsPath);
    await server.run();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Run the server
main().catch(console.error);
