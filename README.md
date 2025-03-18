# TypeScript API MCP Server

An MCP (Model Context Protocol) server that answers questions about TypeScript APIs by loading TypeDoc JSON documentation and providing efficient query endpoints.

## Overview

This project provides a way for AI agents to efficiently explore and understand unknown TypeScript APIs. It loads TypeDoc-generated JSON documentation and exposes it through a set of query endpoints that allow agents to search for symbols, get detailed information about specific parts of the API, and understand relationships between different components.

## Features

- **TypeDoc Integration**: Loads and indexes TypeDoc JSON documentation for efficient querying
- **Comprehensive Query Capabilities**: Provides a wide range of tools for exploring TypeScript APIs
- **MCP Protocol**: Follows the Model Context Protocol for seamless integration with AI agents

## Query Capabilities

The server provides the following tools for querying the API:

- `search_symbols`: Find symbols by name with optional filtering by kind
- `get_symbol_details`: Get detailed information about a specific symbol
- `list_members`: List methods and properties of a class or interface
- `get_parameter_info`: Get information about function parameters
- `find_implementations`: Find implementations of interfaces or subclasses
- `search_by_return_type`: Find functions returning a specific type
- `search_by_description`: Search in JSDoc comments
- `get_type_hierarchy`: Show inheritance relationships
- `find_usages`: Find where a type/function is used

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Usage

1. Generate TypeDoc JSON for your TypeScript API:
   ```bash
   npx typedoc --json docs/api.json --entryPointStrategy expand path/to/your/typescript/files
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Start the MCP server:
   ```bash
   npm start -- docs/api.json
   ```

4. Test the server with the MCP Inspector:
   ```bash
   npm run inspect
   ```

5. Connect an AI agent to the server to query the API

## Project Structure

- `src/sample-api/`: A sample TypeScript API for testing
- `src/mcp-server/`: The MCP server implementation
  - `types/`: Type definitions
    - `typedoc-types.ts`: TypeDoc-related types
    - `api-types.ts`: API-related types
    - `handler-types.ts`: Handler-related types
    - `index.ts`: Type exports
  - `utils/`: Utility functions
    - `symbol-utils.ts`: Symbol-related utilities
    - `type-utils.ts`: Type-related utilities
    - `search-utils.ts`: Search-related utilities
    - `format-utils.ts`: Formatting utilities for LLM-friendly output
    - `index.ts`: Utility exports
  - `schemas/`: JSON schemas for the MCP tools
    - `tool-schemas.ts`: Tool schemas
    - `index.ts`: Schema exports
  - `handlers/`: Individual handlers for each tool
    - `search-symbols.ts`: Search symbols handler
    - `get-symbol-details.ts`: Get symbol details handler
    - `list-members.ts`: List members handler
    - `get-parameter-info.ts`: Get parameter info handler
    - `find-implementations.ts`: Find implementations handler
    - `search-by-return-type.ts`: Search by return type handler
    - `search-by-description.ts`: Search by description handler
    - `get-type-hierarchy.ts`: Get type hierarchy handler
    - `find-usages.ts`: Find usages handler
    - `index.ts`: Handler exports
  - `core/`: Core functionality
    - `typescript-api-handlers.ts`: Main handler class
    - `index.ts`: Core exports
  - `server.ts`: The MCP server implementation
  - `index.ts`: Entry point
- `tests/`: Tests for the API parsing functionality
- `docs/`: Generated TypeDoc JSON documentation

## Enhanced Features

The server now supports:

- Querying by ID or name for all handlers
- Querying by arrays of IDs or names to get multiple results at once
- LLM-friendly output format without metadata like sources

## Development

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

## License

MIT


Copyright 2025 yWorks GmbH - https://www.yworks.com
