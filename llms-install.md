# Installation Guide for LLMs

This guide helps you assist users in setting up the mcp-typescribe MCP server.

## 1. Initial User Interaction

First, ask the user what typescript API they want to provide via mcp-typescribe.

```
"To set up the MCP Typescribe API server, I'll need to know what ecmascript module/npm module I should be providing. Please provide:
- An absolute path to a JSON file pre-generated using [typedoc](typedoc.org) (e.g., /Users/username/projects/lib/api.json)

If you do not have such a file, I can create it for you with the help of the `npx typedoc` tool."
```

If the user does not have a corresponding file, you can offer to create one for them. Either from typescript files,
or from an existing set of typescript definition files:

````
"I can help you create the required api.json file. If you have a set of typescript files, you can create it like this:
   ```bash
   npx -y typedoc --json docs/api.json --entryPointStrategy expand path/to/your/typescript/entry
   ```
where docs/api.json is the file to create that I need to pass to the server.

If you have a library with typescript definitions, you can create that api.json file like so:

   ```bash
   npx -y mcp-typescribe create-api-json <project-root> <library-name> -o <path-to-created-api-json)
   ```
"
````

You can then suggest to perform the necessary steps for the user.

## 2. Configuration Setup

After receiving the path to the api.json file, guide the user through configuration:

> **Important**: When editing the MCP configuration file, preserve any existing entries. Only add or update the "mcp-typescribe" configuration while keeping other properties intact.

If the file already exists, merge this configuration with existing entries:

```json
{
  "mcpServers": {
    "existing-server": {
      // ... existing configuration ...
    },
    "mcp-typescribe": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-typescribe@latest",
        "run-server",
        "<PATH_TO_API_DOT_JSON>"
      ],
      "env": {}
    },
    "another-server": {
      // ... existing configuration ...
    }
  },
  "other": {}
}
```

> **Note**: We use `@latest` tag to ensure you always get the most recent version with latest features and improvements.

## 3. Use the Server To Learn More About Complex APIs

The user can now ask questions to the MCP server for the API provided above.
Take note of the APIs that were loaded into the server to user the MCP functionalities when you need to learn about the new API.

```
"You can now ask questions about the API you installed the server for and I will use the MCP server to learn more about the API.
This helps me navigating complex APIs where the typescript definition files and other files would be too large to process.
I can use the server to resolve compiler errors and to learn about the APIs if you ask me to write code against those APIs.
```
