# MCP-Typescribe - an MCP Server providing LLMs API information

## The Problem
Large Language Models (LLMs) have made incredible strides in code generation and developer productivity. However, they face a key limitation: they can only reliably use APIs and libraries they’ve seen during training. This creates a bottleneck for adopting new tools, SDKs, or internal APIs — LLMs simply don’t know how to use them effectively.

## As a result:

New or internal APIs remain "invisible" to LLMs.

Developers must manually guide LLMs or provide example usage.

Innovation is slowed by the lag between an API’s release and its widespread understanding by AI tools.

## The Idea
This project is an open-source implementation of the Model Context Protocol (MCP)—a protocol designed to provide LLMs with contextual, real-time access to API documentation, in this case particularly TypeScript definitions.

## Our goal is to:

Parse TypeScript (and other) definitions into a machine-readable format.

Serve this context dynamically to LLMs through tools like Claude, Cline, Cursor, or Windsurf and other custom interfaces.

Enable agentic behavior by letting LLMs query, plan, and adapt to unfamiliar APIs without retraining.

## What This Enables

Plug-and-play API support for LLM-based coding assistants.

Faster onboarding for new or proprietary SDKs.

A step toward more autonomous, context-aware coding agents.

## Project Overview

This project provides a way for AI agents to efficiently explore and understand unknown TypeScript APIs. It loads TypeDoc-generated JSON documentation and exposes it through a set of query endpoints that allow agents to search for symbols, get detailed information about specific parts of the API, and understand relationships between different components.

## Current Features

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

3. Explore the MCP server:
   ```bash
   npx @modelcontextprotocol/inspector node ./dist/mcp-server/index.js docs/api.json
   ```

4. Connect an AI agent to the server to query the API

   E.g. with cline in VSCode, specify the following MCP server in `cline_mcp_settings.json`:

   ```json
    {
      "mcpServers": {
        "typescribe": {
          "command": "node",
          "disabled": false,
          "args":["path/to/typescript-mcp/dist/mcp-server/index.js"],
          "autoApprove": []
        }
      }
    }
    ```
5. Enable the server and likely auto-approve for the various tools. Tell the agent to use the "typescribe" tool to learn about your API.

## Project Structure

- `src/sample-api/`: A sample TypeScript API for testing - it uses a weird German-like dialect for the API names to test that the LLM does not hallucinate the API 
- `src/mcp-server/`: The MCP server implementation
  - `types/`: Type definitions
    - `typedoc-types.ts`: TypeDoc-related types
    - `api-types.ts`: API-related types
    - `handler-types.ts`: Handler-related types
    - `index.ts`: Type exports
  - `utils/`: Utility functions
  - `schemas/`: JSON schemas for the MCP tools
    - `tool-schemas.ts`: Tool schemas
    - `index.ts`: Schema exports
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
