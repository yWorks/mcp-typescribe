// Sample TypeDoc JSON for testing
import { JSONOutput, ReflectionId } from "typedoc";

export const sampleTypeDocJson = {
  id: 0 as ReflectionId,
  name: "typescript-api-mcp",
  variant: "project",
  kind: 1,
  flags: {},
  children: [
    {
      id: 1 as ReflectionId,
      name: "index",
      variant: "declaration",
      kind: 2,
      flags: {},
      comment: {
        summary: [
          {
            kind: "text",
            text: "Task Management API\r\n\r\nA simple API for managing tasks, users, and task assignments.",
          },
        ],
      },
      children: [
        {
          id: 199 as ReflectionId,
          name: "calculateEstimatedCompletion",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 176,
              character: 16,
            },
          ],
          target: 179,
        },
        {
          id: 194 as ReflectionId,
          name: "filterTasks",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 41,
              character: 16,
            },
          ],
          target: 142,
        },
        {
          id: 197 as ReflectionId,
          name: "formatTask",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 118,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 127,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 136,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 144,
              character: 16,
            },
          ],
          target: 161,
        },
        {
          id: 198 as ReflectionId,
          name: "isAdmin",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 165,
              character: 16,
            },
          ],
          target: 174,
        },
        {
          id: 185 as ReflectionId,
          name: "Kerle",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 56,
              character: 17,
            },
          ],
          target: 113,
        },
        {
          id: 196 as ReflectionId,
          name: "kopiera",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 98,
              character: 16,
            },
          ],
          target: 157,
        },
        {
          id: 184 as ReflectionId,
          name: "Priority",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 24,
              character: 12,
            },
          ],
          target: 108,
        },
        {
          id: 193 as ReflectionId,
          name: "sortByDueDate",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 26,
              character: 16,
            },
          ],
          target: 138,
        },
        {
          id: 192 as ReflectionId,
          name: "sortByPriority",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 16,
              character: 16,
            },
          ],
          target: 134,
        },
        {
          id: 195 as ReflectionId,
          name: "summarizeTasksByStatus",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 77,
              character: 16,
            },
          ],
          target: 153,
        },
        {
          id: 190 as ReflectionId,
          name: "TaschgInEcht",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 38,
              character: 13,
            },
          ],
          target: 38,
        },
        {
          id: 191 as ReflectionId,
          name: "TaschgMaenaedscha",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 143,
              character: 13,
            },
          ],
          target: 75,
        },
        {
          id: 187 as ReflectionId,
          name: "TaskOptions",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 94,
              character: 12,
            },
          ],
          target: 128,
        },
        {
          id: 183 as ReflectionId,
          name: "TaskStatus",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 7,
              character: 12,
            },
          ],
          target: 103,
        },
        {
          id: 186 as ReflectionId,
          name: "Uffgabe",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 72,
              character: 17,
            },
          ],
          target: 118,
        },
        {
          id: 188 as ReflectionId,
          name: "UffgabeFaehler",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 6,
              character: 13,
            },
          ],
          target: 3,
        },
        {
          id: 189 as ReflectionId,
          name: "UffgabeWechFaehler",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 21,
              character: 13,
            },
          ],
          target: 20,
        },
      ],
      groups: [
        {
          title: "References",
          children: [
            199, 194, 197, 198, 185, 196, 184, 193, 192, 195, 190, 191, 187,
            183, 186, 188, 189,
          ] as ReflectionId[],
        },
      ],
      sources: [
        {
          fileName: "src/sample-api/index.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 2 as ReflectionId,
      name: "taschg-maenaedscha",
      variant: "declaration",
      kind: 2,
      flags: {},
      children: [
        {
          id: 38 as ReflectionId,
          name: "TaschgInEcht",
          variant: "declaration",
          kind: 128,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Represents a concrete implementation of a task with additional functionality.",
              },
            ],
          },
          children: [
            {
              id: 39 as ReflectionId,
              name: "constructor",
              variant: "declaration",
              kind: 512,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 67,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 40 as ReflectionId,
                  name: "TaschgInEcht",
                  variant: "signature",
                  kind: 16384,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Creates a new TaskImpl instance.",
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 67,
                      character: 2,
                    },
                  ],
                  typeParameters: [
                    {
                      id: 41 as ReflectionId,
                      name: "T",
                      variant: "typeParam",
                      kind: 131072,
                      flags: {},
                      default: {
                        type: "intrinsic",
                        name: "any",
                      },
                    },
                  ],
                  parameters: [
                    {
                      id: 42 as ReflectionId,
                      name: "task",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "Task properties",
                          },
                        ],
                      },
                      type: {
                        type: "intersection",
                        types: [
                          {
                            type: "reference",
                            target: {
                              qualifiedName: "Omit",
                            },
                            typeArguments: [
                              {
                                type: "reference",
                                target: 118,
                                typeArguments: [
                                  {
                                    type: "reference",
                                    target: 41,
                                    name: "T",
                                    package: "typescript-api-mcp",
                                    qualifiedName: "TaschgInEcht.T",
                                    refersToTypeParameter: true,
                                  },
                                ],
                                name: "Uffgabe",
                                package: "typescript-api-mcp",
                              },
                              {
                                type: "literal",
                                value: "status",
                              },
                            ],
                            name: "Omit",
                            package: "typescript",
                          },
                          {
                            type: "reflection",
                            declaration: {
                              id: 43 as ReflectionId,
                              name: "__type",
                              variant: "declaration",
                              kind: 65536,
                              flags: {},
                              children: [
                                {
                                  id: 44 as ReflectionId,
                                  name: "status",
                                  variant: "declaration",
                                  kind: 1024,
                                  flags: {
                                    isOptional: true,
                                  },
                                  sources: [
                                    {
                                      fileName:
                                        "src/sample-api/taschg-maenaedscha.ts",
                                      line: 67,
                                      character: 51,
                                    },
                                  ],
                                  type: {
                                    type: "reference",
                                    target: 103,
                                    name: "TaskStatus",
                                    package: "typescript-api-mcp",
                                  },
                                },
                              ],
                              groups: [
                                {
                                  title: "Properties",
                                  children: [44],
                                },
                              ],
                              sources: [
                                {
                                  fileName:
                                    "src/sample-api/taschg-maenaedscha.ts",
                                  line: 67,
                                  character: 49,
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    target: 38,
                    typeArguments: [
                      {
                        type: "reference",
                        target: 41,
                        name: "T",
                        package: "typescript-api-mcp",
                        qualifiedName: "TaschgInEcht.T",
                        refersToTypeParameter: true,
                      },
                    ],
                    name: "TaschgInEcht",
                    package: "typescript-api-mcp",
                  },
                },
              ],
            },
            {
              id: 50 as ReflectionId,
              name: "assignee",
              variant: "declaration",
              kind: 1024,
              flags: {
                isOptional: true,
              },
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "User assigned to this task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 50,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 113,
                name: "Kerle",
                package: "typescript-api-mcp",
              },
              implementationOf: {
                type: "reference",
                target: 124,
                name: "Uffgabe.assignee",
              },
            },
            {
              id: 53 as ReflectionId,
              name: "createdAt",
              variant: "declaration",
              kind: 1024,
              flags: {
                isReadonly: true,
              },
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Creation date of the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 56,
                  character: 11,
                },
              ],
              type: {
                type: "reference",
                target: {
                  qualifiedName: "Date",
                },
                name: "Date",
                package: "typescript",
              },
            },
            {
              id: 52 as ReflectionId,
              name: "data",
              variant: "declaration",
              kind: 1024,
              flags: {
                isOptional: true,
              },
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Custom data associated with this task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 54,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 41,
                name: "T",
                package: "typescript-api-mcp",
                qualifiedName: "TaschgInEcht.T",
                refersToTypeParameter: true,
              },
              implementationOf: {
                type: "reference",
                target: 126,
                name: "Uffgabe.data",
              },
            },
            {
              id: 46 as ReflectionId,
              name: "do_Tittel",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Title of the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 42,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              implementationOf: {
                type: "reference",
                target: 120,
                name: "Uffgabe.do_Tittel",
              },
            },
            {
              id: 51 as ReflectionId,
              name: "dueDate",
              variant: "declaration",
              kind: 1024,
              flags: {
                isOptional: true,
              },
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Due date for the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 52,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: {
                  qualifiedName: "Date",
                },
                name: "Date",
                package: "typescript",
              },
              implementationOf: {
                type: "reference",
                target: 125,
                name: "Uffgabe.dueDate",
              },
            },
            {
              id: 45 as ReflectionId,
              name: "id",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Unique identifier for the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 40,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              implementationOf: {
                type: "reference",
                target: 119,
                name: "Uffgabe.id",
              },
            },
            {
              id: 49 as ReflectionId,
              name: "priority",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Priority level of the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 48,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 108,
                name: "Priority",
                package: "typescript-api-mcp",
              },
              implementationOf: {
                type: "reference",
                target: 123,
                name: "Uffgabe.priority",
              },
            },
            {
              id: 48 as ReflectionId,
              name: "status",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Current status of the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 46,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 103,
                name: "TaskStatus",
                package: "typescript-api-mcp",
              },
              implementationOf: {
                type: "reference",
                target: 122,
                name: "Uffgabe.status",
              },
            },
            {
              id: 47 as ReflectionId,
              name: "umWosGoots",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Detailed description of the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 44,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              implementationOf: {
                type: "reference",
                target: 121,
                name: "Uffgabe.umWosGoots",
              },
            },
            {
              id: 54 as ReflectionId,
              name: "updatedAt",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Last updated date of the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 58,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: {
                  qualifiedName: "Date",
                },
                name: "Date",
                package: "typescript",
              },
            },
            {
              id: 62 as ReflectionId,
              name: "delegiera",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 102,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 63 as ReflectionId,
                  name: "delegiera",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Assigns the task to a user.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "The updated task",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 102,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 64 as ReflectionId,
                      name: "user",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "User to assign the task to",
                          },
                        ],
                      },
                      type: {
                        type: "reference",
                        target: 113,
                        name: "Kerle",
                        package: "typescript-api-mcp",
                      },
                    },
                  ],
                  type: {
                    type: "intrinsic",
                    name: "this",
                  },
                },
              ],
            },
            {
              id: 59 as ReflectionId,
              name: "korrigiera",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 87,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 60 as ReflectionId,
                  name: "korrigiera",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Updates the task status and records the change in history.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "The updated task",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 87,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 61 as ReflectionId,
                      name: "status",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "New status to set",
                          },
                        ],
                      },
                      type: {
                        type: "reference",
                        target: 103,
                        name: "TaskStatus",
                        package: "typescript-api-mcp",
                      },
                    },
                  ],
                  type: {
                    type: "intrinsic",
                    name: "this",
                  },
                },
              ],
            },
            {
              id: 70 as ReflectionId,
              name: "ojeZuSpaet",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 122,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 71 as ReflectionId,
                  name: "ojeZuSpaet",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Checks if the task is overdue.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "True if the task is overdue, false otherwise",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 122,
                      character: 2,
                    },
                  ],
                  type: {
                    type: "intrinsic",
                    name: "boolean",
                  },
                },
              ],
            },
            {
              id: 72 as ReflectionId,
              name: "toString",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 133,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 73 as ReflectionId,
                  name: "toString",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Creates a string representation of the task.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "String representation",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 133,
                      character: 2,
                    },
                  ],
                  type: {
                    type: "intrinsic",
                    name: "string",
                  },
                },
              ],
            },
            {
              id: 65 as ReflectionId,
              name: "wasWarDavor",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 113,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 66 as ReflectionId,
                  name: "wasWarDavor",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Gets the status history of the task.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "Array of status changes with timestamps",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 113,
                      character: 2,
                    },
                  ],
                  type: {
                    type: "typeOperator",
                    operator: "readonly",
                    target: {
                      type: "array",
                      elementType: {
                        type: "reflection",
                        declaration: {
                          id: 67 as ReflectionId,
                          name: "__type",
                          variant: "declaration",
                          kind: 65536,
                          flags: {},
                          children: [
                            {
                              id: 68 as ReflectionId,
                              name: "status",
                              variant: "declaration",
                              kind: 1024,
                              flags: {},
                              sources: [
                                {
                                  fileName:
                                    "src/sample-api/taschg-maenaedscha.ts",
                                  line: 113,
                                  character: 33,
                                },
                              ],
                              type: {
                                type: "reference",
                                target: 103,
                                name: "TaskStatus",
                                package: "typescript-api-mcp",
                              },
                            },
                            {
                              id: 69 as ReflectionId,
                              name: "timestamp",
                              variant: "declaration",
                              kind: 1024,
                              flags: {},
                              sources: [
                                {
                                  fileName:
                                    "src/sample-api/taschg-maenaedscha.ts",
                                  line: 113,
                                  character: 53,
                                },
                              ],
                              type: {
                                type: "reference",
                                target: {
                                  qualifiedName: "Date",
                                },
                                name: "Date",
                                package: "typescript",
                              },
                            },
                          ],
                          groups: [
                            {
                              title: "Properties",
                              children: [68, 69],
                            },
                          ],
                          sources: [
                            {
                              fileName: "src/sample-api/taschg-maenaedscha.ts",
                              line: 113,
                              character: 31,
                            },
                          ],
                        },
                      },
                    },
                  },
                },
              ],
            },
          ],
          groups: [
            {
              title: "Constructors",
              children: [39],
            },
            {
              title: "Properties",
              children: [50, 53, 52, 46, 51, 45, 49, 48, 47, 54],
            },
            {
              title: "Methods",
              children: [62, 59, 70, 72, 65],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 38,
              character: 13,
            },
          ],
          typeParameters: [
            {
              id: 74 as ReflectionId,
              name: "T",
              variant: "typeParam",
              kind: 131072,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "The type of data associated with this task",
                  },
                ],
              },
              default: {
                type: "intrinsic",
                name: "any",
              },
            },
          ],
          implementedTypes: [
            {
              type: "reference",
              target: 118,
              typeArguments: [
                {
                  type: "reference",
                  target: 41,
                  name: "T",
                  package: "typescript-api-mcp",
                  qualifiedName: "TaschgInEcht.T",
                  refersToTypeParameter: true,
                },
              ],
              name: "Uffgabe",
              package: "typescript-api-mcp",
            },
          ],
        },
        {
          id: 75 as ReflectionId,
          name: "TaschgMaenaedscha",
          variant: "declaration",
          kind: 128,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Manages a collection of tasks.",
              },
            ],
          },
          children: [
            {
              id: 76 as ReflectionId,
              name: "constructor",
              variant: "declaration",
              kind: 512,
              flags: {},
              signatures: [
                {
                  id: 77 as ReflectionId,
                  name: "TaschgMaenaedscha",
                  variant: "signature",
                  kind: 16384,
                  flags: {},
                  typeParameters: [
                    {
                      id: 78 as ReflectionId,
                      name: "T",
                      variant: "typeParam",
                      kind: 131072,
                      flags: {},
                      default: {
                        type: "intrinsic",
                        name: "any",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    target: 75,
                    typeArguments: [
                      {
                        type: "reference",
                        target: 78,
                        name: "T",
                        package: "typescript-api-mcp",
                        qualifiedName: "TaschgMaenaedscha.T",
                        refersToTypeParameter: true,
                      },
                    ],
                    name: "TaschgMaenaedscha",
                    package: "typescript-api-mcp",
                  },
                },
              ],
            },
            {
              id: 81 as ReflectionId,
              name: "bauWatt",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 166,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 82 as ReflectionId,
                  name: "bauWatt",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Creates a new task.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "The created task",
                          },
                        ],
                      },
                      {
                        tag: "@example",
                        content: [
                          {
                            kind: "code",
                            text: "```typescript\r\nconst taskManager = new TaskManager();\r\nconst task = taskManager.createTask(\r\n  'Implement feature',\r\n  'Implement the new login feature',\r\n  Priority.HIGH\r\n);\r\n```",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 166,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 83 as ReflectionId,
                      name: "title",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "Task title",
                          },
                        ],
                      },
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                    {
                      id: 84 as ReflectionId,
                      name: "description",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "Task description",
                          },
                        ],
                      },
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                    {
                      id: 85 as ReflectionId,
                      name: "priority",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "Task priority",
                          },
                        ],
                      },
                      type: {
                        type: "reference",
                        target: 108,
                        name: "Priority",
                        package: "typescript-api-mcp",
                      },
                    },
                    {
                      id: 86 as ReflectionId,
                      name: "options",
                      variant: "param",
                      kind: 32768,
                      flags: {
                        isOptional: true,
                      },
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "Additional options",
                          },
                        ],
                      },
                      type: {
                        type: "reference",
                        target: 128,
                        name: "TaskOptions",
                        package: "typescript-api-mcp",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    target: 38,
                    typeArguments: [
                      {
                        type: "reference",
                        target: 78,
                        name: "T",
                        package: "typescript-api-mcp",
                        qualifiedName: "TaschgMaenaedscha.T",
                        refersToTypeParameter: true,
                      },
                    ],
                    name: "TaschgInEcht",
                    package: "typescript-api-mcp",
                  },
                },
              ],
            },
            {
              id: 95 as ReflectionId,
              name: "holsFuerEnKerle",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 225,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 96 as ReflectionId,
                  name: "holsFuerEnKerle",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Gets tasks assigned to a specific user.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "Array of matching tasks",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 225,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 97 as ReflectionId,
                      name: "userId",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "User ID",
                          },
                        ],
                      },
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                  ],
                  type: {
                    type: "array",
                    elementType: {
                      type: "reference",
                      target: 38,
                      typeArguments: [
                        {
                          type: "reference",
                          target: 78,
                          name: "T",
                          package: "typescript-api-mcp",
                          qualifiedName: "TaschgMaenaedscha.T",
                          refersToTypeParameter: true,
                        },
                      ],
                      name: "TaschgInEcht",
                      package: "typescript-api-mcp",
                    },
                  },
                },
              ],
            },
            {
              id: 92 as ReflectionId,
              name: "holsMir",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 215,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 93 as ReflectionId,
                  name: "holsMir",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Gets tasks filtered by status.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "Array of matching tasks",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 215,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 94 as ReflectionId,
                      name: "status",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "Status to filter by",
                          },
                        ],
                      },
                      type: {
                        type: "reference",
                        target: 103,
                        name: "TaskStatus",
                        package: "typescript-api-mcp",
                      },
                    },
                  ],
                  type: {
                    type: "array",
                    elementType: {
                      type: "reference",
                      target: 38,
                      typeArguments: [
                        {
                          type: "reference",
                          target: 78,
                          name: "T",
                          package: "typescript-api-mcp",
                          qualifiedName: "TaschgMaenaedscha.T",
                          refersToTypeParameter: true,
                        },
                      ],
                      name: "TaschgInEcht",
                      package: "typescript-api-mcp",
                    },
                  },
                },
              ],
            },
            {
              id: 90 as ReflectionId,
              name: "iWillAelles",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 205,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 91 as ReflectionId,
                  name: "iWillAelles",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Gets all tasks.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "Array of all tasks",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 205,
                      character: 2,
                    },
                  ],
                  type: {
                    type: "array",
                    elementType: {
                      type: "reference",
                      target: 38,
                      typeArguments: [
                        {
                          type: "reference",
                          target: 78,
                          name: "T",
                          package: "typescript-api-mcp",
                          qualifiedName: "TaschgMaenaedscha.T",
                          refersToTypeParameter: true,
                        },
                      ],
                      name: "TaschgInEcht",
                      package: "typescript-api-mcp",
                    },
                  },
                },
              ],
            },
            {
              id: 87 as ReflectionId,
              name: "suchs",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 192,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 88 as ReflectionId,
                  name: "suchs",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Gets a task by ID.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "The task",
                          },
                        ],
                      },
                      {
                        tag: "@throws",
                        content: [
                          {
                            kind: "text",
                            text: "If the task is not found",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 192,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 89 as ReflectionId,
                      name: "id",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "Task ID",
                          },
                        ],
                      },
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    target: 38,
                    typeArguments: [
                      {
                        type: "reference",
                        target: 78,
                        name: "T",
                        package: "typescript-api-mcp",
                        qualifiedName: "TaschgMaenaedscha.T",
                        refersToTypeParameter: true,
                      },
                    ],
                    name: "TaschgInEcht",
                    package: "typescript-api-mcp",
                  },
                },
              ],
            },
            {
              id: 98 as ReflectionId,
              name: "wechDamit",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 235,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 99 as ReflectionId,
                  name: "wechDamit",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Deletes a task.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "True if the task was deleted, false if it wasn't found",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 235,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 100 as ReflectionId,
                      name: "id",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "Task ID",
                          },
                        ],
                      },
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                  ],
                  type: {
                    type: "intrinsic",
                    name: "boolean",
                  },
                },
              ],
            },
          ],
          groups: [
            {
              title: "Constructors",
              children: [76],
            },
            {
              title: "Methods",
              children: [81, 95, 92, 90, 87, 98],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 143,
              character: 13,
            },
          ],
          typeParameters: [
            {
              id: 101 as ReflectionId,
              name: "T",
              variant: "typeParam",
              kind: 131072,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "The type of data associated with tasks",
                  },
                ],
              },
              default: {
                type: "intrinsic",
                name: "any",
              },
            },
          ],
        },
        {
          id: 3 as ReflectionId,
          name: "UffgabeFaehler",
          variant: "declaration",
          kind: 128,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Base class for task-related errors.",
              },
            ],
          },
          children: [
            {
              id: 14 as ReflectionId,
              name: "constructor",
              variant: "declaration",
              kind: 512,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 12,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 15 as ReflectionId,
                  name: "UffgabeFaehler",
                  variant: "signature",
                  kind: 16384,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Creates a new UffgabeFaehler.",
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 12,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 16 as ReflectionId,
                      name: "message",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "Error message",
                          },
                        ],
                      },
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    target: 3,
                    name: "UffgabeFaehler",
                    package: "typescript-api-mcp",
                  },
                  overwrites: {
                    type: "reference",
                    target: -1,
                    name: "Error.constructor",
                  },
                },
              ],
              overwrites: {
                type: "reference",
                target: -1,
                name: "Error.constructor",
              },
            },
            {
              id: 18 as ReflectionId,
              name: "message",
              variant: "declaration",
              kind: 1024,
              flags: {
                isExternal: true,
                isInherited: true,
              },
              sources: [
                {
                  fileName: "node_modules/typescript/lib/lib.es5.d.ts",
                  line: 1077,
                  character: 4,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              inheritedFrom: {
                type: "reference",
                target: -1,
                name: "Error.message",
              },
            },
            {
              id: 17 as ReflectionId,
              name: "name",
              variant: "declaration",
              kind: 1024,
              flags: {
                isExternal: true,
                isInherited: true,
              },
              sources: [
                {
                  fileName: "node_modules/typescript/lib/lib.es5.d.ts",
                  line: 1076,
                  character: 4,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              inheritedFrom: {
                type: "reference",
                target: -1,
                name: "Error.name",
              },
            },
            {
              id: 19 as ReflectionId,
              name: "stack",
              variant: "declaration",
              kind: 1024,
              flags: {
                isExternal: true,
                isOptional: true,
                isInherited: true,
              },
              sources: [
                {
                  fileName: "node_modules/typescript/lib/lib.es5.d.ts",
                  line: 1078,
                  character: 4,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              inheritedFrom: {
                type: "reference",
                target: -1,
                name: "Error.stack",
              },
            },
            {
              id: 8 as ReflectionId,
              name: "prepareStackTrace",
              variant: "declaration",
              kind: 1024,
              flags: {
                isStatic: true,
                isExternal: true,
                isOptional: true,
                isInherited: true,
              },
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Optional override for formatting stack traces",
                  },
                ],
                blockTags: [
                  {
                    tag: "@see",
                    content: [
                      {
                        kind: "text",
                        text: "https://v8.dev/docs/stack-trace-api#customizing-stack-traces",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "node_modules/@types/node/globals.d.ts",
                  line: 143,
                  character: 8,
                },
              ],
              type: {
                type: "reflection",
                declaration: {
                  id: 9 as ReflectionId,
                  name: "__type",
                  variant: "declaration",
                  kind: 65536,
                  flags: {
                    isExternal: true,
                  },
                  sources: [
                    {
                      fileName: "node_modules/@types/node/globals.d.ts",
                      line: 143,
                      character: 29,
                    },
                  ],
                  signatures: [
                    {
                      id: 10 as ReflectionId,
                      name: "__type",
                      variant: "signature",
                      kind: 4096,
                      flags: {
                        isExternal: true,
                      },
                      sources: [
                        {
                          fileName: "node_modules/@types/node/globals.d.ts",
                          line: 143,
                          character: 29,
                        },
                      ],
                      parameters: [
                        {
                          id: 11 as ReflectionId,
                          name: "err",
                          variant: "param",
                          kind: 32768,
                          flags: {
                            isExternal: true,
                          },
                          type: {
                            type: "reference",
                            target: {
                              qualifiedName: "Error",
                            },
                            name: "Error",
                            package: "typescript",
                          },
                        },
                        {
                          id: 12 as ReflectionId,
                          name: "stackTraces",
                          variant: "param",
                          kind: 32768,
                          flags: {
                            isExternal: true,
                          },
                          type: {
                            type: "array",
                            elementType: {
                              type: "reference",
                              target: {
                                qualifiedName: "__global.NodeJS.CallSite",
                              },
                              name: "CallSite",
                              package: "@types/node",
                              qualifiedName: "__global.NodeJS.CallSite",
                            },
                          },
                        },
                      ],
                      type: {
                        type: "intrinsic",
                        name: "any",
                      },
                    },
                  ],
                },
              },
              inheritedFrom: {
                type: "reference",
                target: -1,
                name: "Error.prepareStackTrace",
              },
            },
            {
              id: 13 as ReflectionId,
              name: "stackTraceLimit",
              variant: "declaration",
              kind: 1024,
              flags: {
                isStatic: true,
                isExternal: true,
                isInherited: true,
              },
              sources: [
                {
                  fileName: "node_modules/@types/node/globals.d.ts",
                  line: 145,
                  character: 8,
                },
              ],
              type: {
                type: "intrinsic",
                name: "number",
              },
              inheritedFrom: {
                type: "reference",
                target: -1,
                name: "Error.stackTraceLimit",
              },
            },
            {
              id: 4 as ReflectionId,
              name: "captureStackTrace",
              variant: "declaration",
              kind: 2048,
              flags: {
                isStatic: true,
                isExternal: true,
                isInherited: true,
              },
              sources: [
                {
                  fileName: "node_modules/@types/node/globals.d.ts",
                  line: 136,
                  character: 8,
                },
              ],
              signatures: [
                {
                  id: 5 as ReflectionId,
                  name: "captureStackTrace",
                  variant: "signature",
                  kind: 4096,
                  flags: {
                    isExternal: true,
                    isInherited: true,
                  },
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Create .stack property on a target object",
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "node_modules/@types/node/globals.d.ts",
                      line: 136,
                      character: 8,
                    },
                  ],
                  parameters: [
                    {
                      id: 6 as ReflectionId,
                      name: "targetObject",
                      variant: "param",
                      kind: 32768,
                      flags: {
                        isExternal: true,
                      },
                      type: {
                        type: "intrinsic",
                        name: "object",
                      },
                    },
                    {
                      id: 7 as ReflectionId,
                      name: "constructorOpt",
                      variant: "param",
                      kind: 32768,
                      flags: {
                        isExternal: true,
                        isOptional: true,
                      },
                      type: {
                        type: "reference",
                        target: {
                          qualifiedName: "Function",
                        },
                        name: "Function",
                        package: "typescript",
                      },
                    },
                  ],
                  type: {
                    type: "intrinsic",
                    name: "void",
                  },
                  inheritedFrom: {
                    type: "reference",
                    target: -1,
                    name: "Error.captureStackTrace",
                  },
                },
              ],
              inheritedFrom: {
                type: "reference",
                target: -1,
                name: "Error.captureStackTrace",
              },
            },
          ],
          groups: [
            {
              title: "Constructors",
              children: [14],
            },
            {
              title: "Properties",
              children: [18, 17, 19, 8, 13],
            },
            {
              title: "Methods",
              children: [4],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 6,
              character: 13,
            },
          ],
          extendedTypes: [
            {
              type: "reference",
              target: {
                qualifiedName: "Error",
              },
              name: "Error",
              package: "typescript",
            },
          ],
          extendedBy: [
            {
              type: "reference",
              target: 20,
              name: "UffgabeWechFaehler",
            },
          ],
        },
        {
          id: 20 as ReflectionId,
          name: "UffgabeWechFaehler",
          variant: "declaration",
          kind: 128,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Error thrown when a task is not found.",
              },
            ],
          },
          children: [
            {
              id: 31 as ReflectionId,
              name: "constructor",
              variant: "declaration",
              kind: 512,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 27,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 32 as ReflectionId,
                  name: "UffgabeWechFaehler",
                  variant: "signature",
                  kind: 16384,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Creates a new TaskNotFoundError.",
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 27,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 33 as ReflectionId,
                      name: "taskId",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "ID of the task that was not found",
                          },
                        ],
                      },
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    target: 20,
                    name: "UffgabeWechFaehler",
                    package: "typescript-api-mcp",
                  },
                  overwrites: {
                    type: "reference",
                    target: 15,
                    name: "UffgabeFaehler.constructor",
                  },
                },
              ],
              overwrites: {
                type: "reference",
                target: 14,
                name: "UffgabeFaehler.constructor",
              },
            },
            {
              id: 36 as ReflectionId,
              name: "message",
              variant: "declaration",
              kind: 1024,
              flags: {
                isExternal: true,
                isInherited: true,
              },
              sources: [
                {
                  fileName: "node_modules/typescript/lib/lib.es5.d.ts",
                  line: 1077,
                  character: 4,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              inheritedFrom: {
                type: "reference",
                target: 18,
                name: "UffgabeFaehler.message",
              },
            },
            {
              id: 35 as ReflectionId,
              name: "name",
              variant: "declaration",
              kind: 1024,
              flags: {
                isExternal: true,
                isInherited: true,
              },
              sources: [
                {
                  fileName: "node_modules/typescript/lib/lib.es5.d.ts",
                  line: 1076,
                  character: 4,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              inheritedFrom: {
                type: "reference",
                target: 17,
                name: "UffgabeFaehler.name",
              },
            },
            {
              id: 37 as ReflectionId,
              name: "stack",
              variant: "declaration",
              kind: 1024,
              flags: {
                isExternal: true,
                isOptional: true,
                isInherited: true,
              },
              sources: [
                {
                  fileName: "node_modules/typescript/lib/lib.es5.d.ts",
                  line: 1078,
                  character: 4,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              inheritedFrom: {
                type: "reference",
                target: 19,
                name: "UffgabeFaehler.stack",
              },
            },
            {
              id: 34 as ReflectionId,
              name: "taskId",
              variant: "declaration",
              kind: 1024,
              flags: {
                isPublic: true,
              },
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "ID of the task that was not found",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 27,
                  character: 21,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 25 as ReflectionId,
              name: "prepareStackTrace",
              variant: "declaration",
              kind: 1024,
              flags: {
                isStatic: true,
                isExternal: true,
                isOptional: true,
                isInherited: true,
              },
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Optional override for formatting stack traces",
                  },
                ],
                blockTags: [
                  {
                    tag: "@see",
                    content: [
                      {
                        kind: "text",
                        text: "https://v8.dev/docs/stack-trace-api#customizing-stack-traces",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "node_modules/@types/node/globals.d.ts",
                  line: 143,
                  character: 8,
                },
              ],
              type: {
                type: "reflection",
                declaration: {
                  id: 26 as ReflectionId,
                  name: "__type",
                  variant: "declaration",
                  kind: 65536,
                  flags: {
                    isExternal: true,
                  },
                  sources: [
                    {
                      fileName: "node_modules/@types/node/globals.d.ts",
                      line: 143,
                      character: 29,
                    },
                  ],
                  signatures: [
                    {
                      id: 27 as ReflectionId,
                      name: "__type",
                      variant: "signature",
                      kind: 4096,
                      flags: {
                        isExternal: true,
                      },
                      sources: [
                        {
                          fileName: "node_modules/@types/node/globals.d.ts",
                          line: 143,
                          character: 29,
                        },
                      ],
                      parameters: [
                        {
                          id: 28 as ReflectionId,
                          name: "err",
                          variant: "param",
                          kind: 32768,
                          flags: {
                            isExternal: true,
                          },
                          type: {
                            type: "reference",
                            target: {
                              qualifiedName: "Error",
                            },
                            name: "Error",
                            package: "typescript",
                          },
                        },
                        {
                          id: 29 as ReflectionId,
                          name: "stackTraces",
                          variant: "param",
                          kind: 32768,
                          flags: {
                            isExternal: true,
                          },
                          type: {
                            type: "array",
                            elementType: {
                              type: "reference",
                              target: {
                                qualifiedName: "__global.NodeJS.CallSite",
                              },
                              name: "CallSite",
                              package: "@types/node",
                              qualifiedName: "__global.NodeJS.CallSite",
                            },
                          },
                        },
                      ],
                      type: {
                        type: "intrinsic",
                        name: "any",
                      },
                    },
                  ],
                },
              },
              inheritedFrom: {
                type: "reference",
                target: 8,
                name: "UffgabeFaehler.prepareStackTrace",
              },
            },
            {
              id: 30 as ReflectionId,
              name: "stackTraceLimit",
              variant: "declaration",
              kind: 1024,
              flags: {
                isStatic: true,
                isExternal: true,
                isInherited: true,
              },
              sources: [
                {
                  fileName: "node_modules/@types/node/globals.d.ts",
                  line: 145,
                  character: 8,
                },
              ],
              type: {
                type: "intrinsic",
                name: "number",
              },
              inheritedFrom: {
                type: "reference",
                target: 13,
                name: "UffgabeFaehler.stackTraceLimit",
              },
            },
            {
              id: 21 as ReflectionId,
              name: "captureStackTrace",
              variant: "declaration",
              kind: 2048,
              flags: {
                isStatic: true,
                isExternal: true,
                isInherited: true,
              },
              sources: [
                {
                  fileName: "node_modules/@types/node/globals.d.ts",
                  line: 136,
                  character: 8,
                },
              ],
              signatures: [
                {
                  id: 22 as ReflectionId,
                  name: "captureStackTrace",
                  variant: "signature",
                  kind: 4096,
                  flags: {
                    isExternal: true,
                    isInherited: true,
                  },
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Create .stack property on a target object",
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "node_modules/@types/node/globals.d.ts",
                      line: 136,
                      character: 8,
                    },
                  ],
                  parameters: [
                    {
                      id: 23 as ReflectionId,
                      name: "targetObject",
                      variant: "param",
                      kind: 32768,
                      flags: {
                        isExternal: true,
                      },
                      type: {
                        type: "intrinsic",
                        name: "object",
                      },
                    },
                    {
                      id: 24 as ReflectionId,
                      name: "constructorOpt",
                      variant: "param",
                      kind: 32768,
                      flags: {
                        isExternal: true,
                        isOptional: true,
                      },
                      type: {
                        type: "reference",
                        target: {
                          qualifiedName: "Function",
                        },
                        name: "Function",
                        package: "typescript",
                      },
                    },
                  ],
                  type: {
                    type: "intrinsic",
                    name: "void",
                  },
                  inheritedFrom: {
                    type: "reference",
                    target: 5,
                    name: "UffgabeFaehler.captureStackTrace",
                  },
                },
              ],
              inheritedFrom: {
                type: "reference",
                target: 4,
                name: "UffgabeFaehler.captureStackTrace",
              },
            },
          ],
          groups: [
            {
              title: "Constructors",
              children: [31],
            },
            {
              title: "Properties",
              children: [36, 35, 37, 34, 25, 30],
            },
            {
              title: "Methods",
              children: [21],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 21,
              character: 13,
            },
          ],
          extendedTypes: [
            {
              type: "reference",
              target: 3,
              name: "UffgabeFaehler",
              package: "typescript-api-mcp",
            },
          ],
        },
      ],
      groups: [
        {
          title: "Classes",
          children: [38, 75, 3, 20],
        },
      ],
      sources: [
        {
          fileName: "src/sample-api/taschg-maenaedscha.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 102 as ReflectionId,
      name: "types",
      variant: "declaration",
      kind: 2,
      flags: {},
      children: [
        {
          id: 108 as ReflectionId,
          name: "Priority",
          variant: "declaration",
          kind: 8,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Represents a priority level for ",
              },
              {
                kind: "inline-tag",
                tag: "@link",
                text: "tasks",
                target: 118,
                tsLinkText: "tasks",
              },
              {
                kind: "text",
                text: ".",
              },
            ],
            blockTags: [
              {
                tag: "@remarks",
                content: [
                  {
                    kind: "text",
                    text: "Higher numbers indicate higher priority.",
                  },
                ],
              },
            ],
          },
          children: [
            {
              id: 110 as ReflectionId,
              name: "GEHT_SO",
              variant: "declaration",
              kind: 16,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Medium Priority",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 32,
                  character: 2,
                },
              ],
              type: {
                type: "literal",
                value: 2,
              },
            },
            {
              id: 111 as ReflectionId,
              name: "SCHNELL",
              variant: "declaration",
              kind: 16,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "High Priority",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 36,
                  character: 2,
                },
              ],
              type: {
                type: "literal",
                value: 3,
              },
            },
            {
              id: 112 as ReflectionId,
              name: "UI_UI_UI",
              variant: "declaration",
              kind: 16,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Critical",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 40,
                  character: 2,
                },
              ],
              type: {
                type: "literal",
                value: 4,
              },
            },
            {
              id: 109 as ReflectionId,
              name: "WENIG",
              variant: "declaration",
              kind: 16,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Low Priority",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 28,
                  character: 2,
                },
              ],
              type: {
                type: "literal",
                value: 1,
              },
            },
          ],
          groups: [
            {
              title: "Enumeration Members",
              children: [110, 111, 112, 109],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 24,
              character: 12,
            },
          ],
        },
        {
          id: 103 as ReflectionId,
          name: "TaskStatus",
          variant: "declaration",
          kind: 8,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Represents the status of a ",
              },
              {
                kind: "inline-tag",
                tag: "@link",
                text: "task",
                target: 118,
                tsLinkText: "task",
              },
              {
                kind: "text",
                text: ".",
              },
            ],
            blockTags: [
              {
                tag: "@remarks",
                content: [
                  {
                    kind: "text",
                    text: "This enum is used throughout the API to indicate the current state of a ",
                  },
                  {
                    kind: "inline-tag",
                    tag: "@link",
                    text: "task",
                    target: 118,
                    tsLinkText: "task",
                  },
                  {
                    kind: "text",
                    text: ".",
                  },
                ],
              },
            ],
          },
          children: [
            {
              id: 106 as ReflectionId,
              name: "FERTIG",
              variant: "declaration",
              kind: 16,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Task has been completed successfully",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 13,
                  character: 2,
                },
              ],
              type: {
                type: "literal",
                value: "Done",
              },
            },
            {
              id: 105 as ReflectionId,
              name: "LAEUFT",
              variant: "declaration",
              kind: 16,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Task is currently in progress",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 11,
                  character: 2,
                },
              ],
              type: {
                type: "literal",
                value: "In Progress",
              },
            },
            {
              id: 107 as ReflectionId,
              name: "MIST",
              variant: "declaration",
              kind: 16,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Task has failed or been cancelled",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 15,
                  character: 2,
                },
              ],
              type: {
                type: "literal",
                value: "Failed",
              },
            },
            {
              id: 104 as ReflectionId,
              name: "PENDING",
              variant: "declaration",
              kind: 16,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Task has not been started yet",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 9,
                  character: 2,
                },
              ],
              type: {
                type: "literal",
                value: "PENDING",
              },
            },
          ],
          groups: [
            {
              title: "Enumeration Members",
              children: [106, 105, 107, 104],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 7,
              character: 12,
            },
          ],
        },
        {
          id: 113 as ReflectionId,
          name: "Kerle",
          variant: "declaration",
          kind: 256,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Represents a user in the system.",
              },
            ],
            blockTags: [
              {
                tag: "@example",
                content: [
                  {
                    kind: "code",
                    text: "```typescript\r\nconst user: Kerle = {\r\n  id: '123',\r\n  soi_name: 'John Doe',\r\n  internet_brief: 'john@example.com',\r\n  role: 'developer'\r\n};\r\n```",
                  },
                ],
              },
            ],
          },
          children: [
            {
              id: 114 as ReflectionId,
              name: "id",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Unique identifier for the user",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 58,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 116 as ReflectionId,
              name: "internet_brief",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Email address of the user",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 62,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 117 as ReflectionId,
              name: "role",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Role of the user in the system",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 64,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 115 as ReflectionId,
              name: "soi_name",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Full name of the user",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 60,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              children: [114, 116, 117, 115],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 56,
              character: 17,
            },
          ],
        },
        {
          id: 118 as ReflectionId,
          name: "Uffgabe",
          variant: "declaration",
          kind: 256,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Represents a task that can be assigned to a ",
              },
              {
                kind: "inline-tag",
                tag: "@link",
                text: "user",
                target: 113,
                tsLinkText: "user",
              },
              {
                kind: "text",
                text: ".",
              },
            ],
          },
          children: [
            {
              id: 124 as ReflectionId,
              name: "assignee",
              variant: "declaration",
              kind: 1024,
              flags: {
                isOptional: true,
              },
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "User assigned to this task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 84,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 113,
                name: "Kerle",
                package: "typescript-api-mcp",
              },
            },
            {
              id: 126 as ReflectionId,
              name: "data",
              variant: "declaration",
              kind: 1024,
              flags: {
                isOptional: true,
              },
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Custom data associated with this task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 88,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 127,
                name: "T",
                package: "typescript-api-mcp",
                qualifiedName: "Uffgabe.T",
                refersToTypeParameter: true,
              },
            },
            {
              id: 120 as ReflectionId,
              name: "do_Tittel",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Title of the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 76,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 125 as ReflectionId,
              name: "dueDate",
              variant: "declaration",
              kind: 1024,
              flags: {
                isOptional: true,
              },
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Due date for the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 86,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: {
                  qualifiedName: "Date",
                },
                name: "Date",
                package: "typescript",
              },
            },
            {
              id: 119 as ReflectionId,
              name: "id",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Unique identifier for the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 74,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 123 as ReflectionId,
              name: "priority",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Priority level of the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 82,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 108,
                name: "Priority",
                package: "typescript-api-mcp",
              },
            },
            {
              id: 122 as ReflectionId,
              name: "status",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Current status of the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 80,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 103,
                name: "TaskStatus",
                package: "typescript-api-mcp",
              },
            },
            {
              id: 121 as ReflectionId,
              name: "umWosGoots",
              variant: "declaration",
              kind: 1024,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Detailed description of the task",
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 78,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
          groups: [
            {
              title: "Properties",
              children: [124, 126, 120, 125, 119, 123, 122, 121],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 72,
              character: 17,
            },
          ],
          typeParameters: [
            {
              id: 127 as ReflectionId,
              name: "T",
              variant: "typeParam",
              kind: 131072,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "The type of data associated with this task",
                  },
                ],
              },
              default: {
                type: "intrinsic",
                name: "any",
              },
            },
          ],
          implementedBy: [
            {
              type: "reference",
              target: 38,
              name: "TaschgInEcht",
            },
          ],
        },
        {
          id: 128 as ReflectionId,
          name: "TaskOptions",
          variant: "declaration",
          kind: 2097152,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Configuration options for task creation.",
              },
            ],
          },
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 94,
              character: 12,
            },
          ],
          type: {
            type: "reflection",
            declaration: {
              id: 129 as ReflectionId,
              name: "__type",
              variant: "declaration",
              kind: 65536,
              flags: {},
              children: [
                {
                  id: 130 as ReflectionId,
                  name: "autoAssign",
                  variant: "declaration",
                  kind: 1024,
                  flags: {
                    isOptional: true,
                  },
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Whether to automatically assign the task",
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/types.ts",
                      line: 96,
                      character: 2,
                    },
                  ],
                  type: {
                    type: "intrinsic",
                    name: "boolean",
                  },
                },
                {
                  id: 131 as ReflectionId,
                  name: "defaultPriority",
                  variant: "declaration",
                  kind: 1024,
                  flags: {
                    isOptional: true,
                  },
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Default priority if not specified",
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/types.ts",
                      line: 98,
                      character: 2,
                    },
                  ],
                  type: {
                    type: "reference",
                    target: 108,
                    name: "Priority",
                    package: "typescript-api-mcp",
                  },
                },
                {
                  id: 132 as ReflectionId,
                  name: "tags",
                  variant: "declaration",
                  kind: 1024,
                  flags: {
                    isOptional: true,
                  },
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Tags to associate with the task",
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/types.ts",
                      line: 100,
                      character: 2,
                    },
                  ],
                  type: {
                    type: "array",
                    elementType: {
                      type: "intrinsic",
                      name: "string",
                    },
                  },
                },
              ],
              groups: [
                {
                  title: "Properties",
                  children: [130, 131, 132],
                },
              ],
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 94,
                  character: 26,
                },
              ],
            },
          },
        },
      ],
      groups: [
        {
          title: "Enumerations",
          children: [108, 103],
        },
        {
          title: "Interfaces",
          children: [113, 118],
        },
        {
          title: "Type Aliases",
          children: [128],
        },
      ],
      sources: [
        {
          fileName: "src/sample-api/types.ts",
          line: 1,
          character: 0,
        },
      ],
    },
    {
      id: 133 as ReflectionId,
      name: "utils",
      variant: "declaration",
      kind: 2,
      flags: {},
      children: [
        {
          id: 179 as ReflectionId,
          name: "calculateEstimatedCompletion",
          variant: "declaration",
          kind: 64,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 176,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 180 as ReflectionId,
              name: "calculateEstimatedCompletion",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Calculates the estimated completion time for a task.",
                  },
                ],
                blockTags: [
                  {
                    tag: "@returns",
                    content: [
                      {
                        kind: "text",
                        text: "Estimated completion date or null if the task is already completed",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/utils.ts",
                  line: 176,
                  character: 16,
                },
              ],
              parameters: [
                {
                  id: 181 as ReflectionId,
                  name: "task",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "The task to estimate",
                      },
                    ],
                  },
                  type: {
                    type: "reference",
                    target: 118,
                    name: "Uffgabe",
                    package: "typescript-api-mcp",
                  },
                },
                {
                  id: 182 as ReflectionId,
                  name: "estimatedHoursPerPriority",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Map of priority levels to estimated hours",
                      },
                    ],
                  },
                  type: {
                    type: "reference",
                    target: {
                      qualifiedName: "Map",
                    },
                    typeArguments: [
                      {
                        type: "reference",
                        target: 108,
                        name: "Priority",
                        package: "typescript-api-mcp",
                      },
                      {
                        type: "intrinsic",
                        name: "number",
                      },
                    ],
                    name: "Map",
                    package: "typescript",
                  },
                  defaultValue: "...",
                },
              ],
              type: {
                type: "union",
                types: [
                  {
                    type: "literal",
                    value: null,
                  },
                  {
                    type: "reference",
                    target: {
                      qualifiedName: "Date",
                    },
                    name: "Date",
                    package: "typescript",
                  },
                ],
              },
            },
          ],
        },
        {
          id: 142 as ReflectionId,
          name: "filterTasks",
          variant: "declaration",
          kind: 64,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 41,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 143 as ReflectionId,
              name: "filterTasks",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Filters tasks by various criteria.",
                  },
                ],
                blockTags: [
                  {
                    tag: "@returns",
                    content: [
                      {
                        kind: "text",
                        text: "Filtered array of tasks",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/utils.ts",
                  line: 41,
                  character: 16,
                },
              ],
              typeParameters: [
                {
                  id: 144 as ReflectionId,
                  name: "T",
                  variant: "typeParam",
                  kind: 131072,
                  flags: {},
                  type: {
                    type: "reference",
                    target: 118,
                    typeArguments: [
                      {
                        type: "intrinsic",
                        name: "any",
                      },
                    ],
                    name: "Uffgabe",
                    package: "typescript-api-mcp",
                  },
                },
              ],
              parameters: [
                {
                  id: 145 as ReflectionId,
                  name: "tasks",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Array of tasks to filter",
                      },
                    ],
                  },
                  type: {
                    type: "array",
                    elementType: {
                      type: "reference",
                      target: 144,
                      name: "T",
                      package: "typescript-api-mcp",
                      refersToTypeParameter: true,
                    },
                  },
                },
                {
                  id: 146 as ReflectionId,
                  name: "criteria",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Filter criteria",
                      },
                    ],
                  },
                  type: {
                    type: "reflection",
                    declaration: {
                      id: 147 as ReflectionId,
                      name: "__type",
                      variant: "declaration",
                      kind: 65536,
                      flags: {},
                      children: [
                        {
                          id: 150 as ReflectionId,
                          name: "assigneeId",
                          variant: "declaration",
                          kind: 1024,
                          flags: {
                            isOptional: true,
                          },
                          sources: [
                            {
                              fileName: "src/sample-api/utils.ts",
                              line: 46,
                              character: 4,
                            },
                          ],
                          type: {
                            type: "intrinsic",
                            name: "string",
                          },
                        },
                        {
                          id: 152 as ReflectionId,
                          name: "dueAfter",
                          variant: "declaration",
                          kind: 1024,
                          flags: {
                            isOptional: true,
                          },
                          sources: [
                            {
                              fileName: "src/sample-api/utils.ts",
                              line: 48,
                              character: 4,
                            },
                          ],
                          type: {
                            type: "reference",
                            target: {
                              qualifiedName: "Date",
                            },
                            name: "Date",
                            package: "typescript",
                          },
                        },
                        {
                          id: 151 as ReflectionId,
                          name: "dueBefore",
                          variant: "declaration",
                          kind: 1024,
                          flags: {
                            isOptional: true,
                          },
                          sources: [
                            {
                              fileName: "src/sample-api/utils.ts",
                              line: 47,
                              character: 4,
                            },
                          ],
                          type: {
                            type: "reference",
                            target: {
                              qualifiedName: "Date",
                            },
                            name: "Date",
                            package: "typescript",
                          },
                        },
                        {
                          id: 149 as ReflectionId,
                          name: "priority",
                          variant: "declaration",
                          kind: 1024,
                          flags: {
                            isOptional: true,
                          },
                          sources: [
                            {
                              fileName: "src/sample-api/utils.ts",
                              line: 45,
                              character: 4,
                            },
                          ],
                          type: {
                            type: "reference",
                            target: 108,
                            name: "Priority",
                            package: "typescript-api-mcp",
                          },
                        },
                        {
                          id: 148 as ReflectionId,
                          name: "status",
                          variant: "declaration",
                          kind: 1024,
                          flags: {
                            isOptional: true,
                          },
                          sources: [
                            {
                              fileName: "src/sample-api/utils.ts",
                              line: 44,
                              character: 4,
                            },
                          ],
                          type: {
                            type: "reference",
                            target: 103,
                            name: "TaskStatus",
                            package: "typescript-api-mcp",
                          },
                        },
                      ],
                      groups: [
                        {
                          title: "Properties",
                          children: [150, 152, 151, 149, 148],
                        },
                      ],
                      sources: [
                        {
                          fileName: "src/sample-api/utils.ts",
                          line: 43,
                          character: 12,
                        },
                      ],
                    },
                  },
                },
              ],
              type: {
                type: "array",
                elementType: {
                  type: "reference",
                  target: 144,
                  name: "T",
                  package: "typescript-api-mcp",
                  refersToTypeParameter: true,
                },
              },
            },
          ],
        },
        {
          id: 161 as ReflectionId,
          name: "formatTask",
          variant: "declaration",
          kind: 64,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Implementation of the formatTask function.",
              },
            ],
            blockTags: [
              {
                tag: "@param",
                name: "task",
                content: [
                  {
                    kind: "text",
                    text: "Task to format",
                  },
                ],
              },
              {
                tag: "@returns",
                content: [
                  {
                    kind: "text",
                    text: "Formatted string",
                  },
                ],
              },
            ],
          },
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 118,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 127,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 136,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 144,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 162 as ReflectionId,
              name: "formatTask",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Function overload for creating a formatted task string.\r\nReturns a simple string with just the title for PENDING tasks.",
                  },
                ],
                blockTags: [
                  {
                    tag: "@returns",
                    content: [
                      {
                        kind: "text",
                        text: "Formatted string",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/utils.ts",
                  line: 118,
                  character: 16,
                },
              ],
              parameters: [
                {
                  id: 163 as ReflectionId,
                  name: "task",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Task to format",
                      },
                    ],
                  },
                  type: {
                    type: "intersection",
                    types: [
                      {
                        type: "reference",
                        target: 118,
                        typeArguments: [
                          {
                            type: "intrinsic",
                            name: "any",
                          },
                        ],
                        name: "Uffgabe",
                        package: "typescript-api-mcp",
                      },
                      {
                        type: "reflection",
                        declaration: {
                          id: 164 as ReflectionId,
                          name: "__type",
                          variant: "declaration",
                          kind: 65536,
                          flags: {},
                          children: [
                            {
                              id: 165 as ReflectionId,
                              name: "status",
                              variant: "declaration",
                              kind: 1024,
                              flags: {},
                              sources: [
                                {
                                  fileName: "src/sample-api/utils.ts",
                                  line: 118,
                                  character: 45,
                                },
                              ],
                              type: {
                                type: "reference",
                                target: 104,
                                name: "PENDING",
                                package: "typescript-api-mcp",
                                qualifiedName: "TaskStatus.PENDING",
                              },
                            },
                          ],
                          groups: [
                            {
                              title: "Properties",
                              children: [165],
                            },
                          ],
                          sources: [
                            {
                              fileName: "src/sample-api/utils.ts",
                              line: 118,
                              character: 43,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 166 as ReflectionId,
              name: "formatTask",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Function overload for creating a formatted task string.\r\nReturns a string with title and assignee for IN_PROGRESS tasks.",
                  },
                ],
                blockTags: [
                  {
                    tag: "@returns",
                    content: [
                      {
                        kind: "text",
                        text: "Formatted string",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/utils.ts",
                  line: 127,
                  character: 16,
                },
              ],
              parameters: [
                {
                  id: 167 as ReflectionId,
                  name: "task",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Task to format",
                      },
                    ],
                  },
                  type: {
                    type: "intersection",
                    types: [
                      {
                        type: "reference",
                        target: 118,
                        typeArguments: [
                          {
                            type: "intrinsic",
                            name: "any",
                          },
                        ],
                        name: "Uffgabe",
                        package: "typescript-api-mcp",
                      },
                      {
                        type: "reflection",
                        declaration: {
                          id: 168 as ReflectionId,
                          name: "__type",
                          variant: "declaration",
                          kind: 65536,
                          flags: {},
                          children: [
                            {
                              id: 169 as ReflectionId,
                              name: "status",
                              variant: "declaration",
                              kind: 1024,
                              flags: {},
                              sources: [
                                {
                                  fileName: "src/sample-api/utils.ts",
                                  line: 127,
                                  character: 45,
                                },
                              ],
                              type: {
                                type: "reference",
                                target: 105,
                                name: "LAEUFT",
                                package: "typescript-api-mcp",
                                qualifiedName: "TaskStatus.LAEUFT",
                              },
                            },
                          ],
                          groups: [
                            {
                              title: "Properties",
                              children: [169],
                            },
                          ],
                          sources: [
                            {
                              fileName: "src/sample-api/utils.ts",
                              line: 127,
                              character: 43,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 170 as ReflectionId,
              name: "formatTask",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Function overload for creating a formatted task string.\r\nReturns a detailed string for COMPLETED or FAILED tasks.",
                  },
                ],
                blockTags: [
                  {
                    tag: "@returns",
                    content: [
                      {
                        kind: "text",
                        text: "Formatted string",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/utils.ts",
                  line: 136,
                  character: 16,
                },
              ],
              parameters: [
                {
                  id: 171 as ReflectionId,
                  name: "task",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Task to format",
                      },
                    ],
                  },
                  type: {
                    type: "intersection",
                    types: [
                      {
                        type: "reference",
                        target: 118,
                        typeArguments: [
                          {
                            type: "intrinsic",
                            name: "any",
                          },
                        ],
                        name: "Uffgabe",
                        package: "typescript-api-mcp",
                      },
                      {
                        type: "reflection",
                        declaration: {
                          id: 172 as ReflectionId,
                          name: "__type",
                          variant: "declaration",
                          kind: 65536,
                          flags: {},
                          children: [
                            {
                              id: 173 as ReflectionId,
                              name: "status",
                              variant: "declaration",
                              kind: 1024,
                              flags: {},
                              sources: [
                                {
                                  fileName: "src/sample-api/utils.ts",
                                  line: 136,
                                  character: 45,
                                },
                              ],
                              type: {
                                type: "union",
                                types: [
                                  {
                                    type: "reference",
                                    target: 106,
                                    name: "FERTIG",
                                    package: "typescript-api-mcp",
                                    qualifiedName: "TaskStatus.FERTIG",
                                  },
                                  {
                                    type: "reference",
                                    target: 107,
                                    name: "MIST",
                                    package: "typescript-api-mcp",
                                    qualifiedName: "TaskStatus.MIST",
                                  },
                                ],
                              },
                            },
                          ],
                          groups: [
                            {
                              title: "Properties",
                              children: [173],
                            },
                          ],
                          sources: [
                            {
                              fileName: "src/sample-api/utils.ts",
                              line: 136,
                              character: 43,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
          ],
        },
        {
          id: 174 as ReflectionId,
          name: "isAdmin",
          variant: "declaration",
          kind: 64,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 165,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 175 as ReflectionId,
              name: "isAdmin",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Type guard to check if a user has admin role.",
                  },
                ],
                blockTags: [
                  {
                    tag: "@returns",
                    content: [
                      {
                        kind: "text",
                        text: "True if the user is an admin",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/utils.ts",
                  line: 165,
                  character: 16,
                },
              ],
              parameters: [
                {
                  id: 176 as ReflectionId,
                  name: "user",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "User to check",
                      },
                    ],
                  },
                  type: {
                    type: "reference",
                    target: 113,
                    name: "Kerle",
                    package: "typescript-api-mcp",
                  },
                },
              ],
              type: {
                type: "predicate",
                name: "user",
                asserts: false,
                targetType: {
                  type: "intersection",
                  types: [
                    {
                      type: "reference",
                      target: 113,
                      name: "Kerle",
                      package: "typescript-api-mcp",
                    },
                    {
                      type: "reflection",
                      declaration: {
                        id: 177 as ReflectionId,
                        name: "__type",
                        variant: "declaration",
                        kind: 65536,
                        flags: {},
                        children: [
                          {
                            id: 178 as ReflectionId,
                            name: "role",
                            variant: "declaration",
                            kind: 1024,
                            flags: {},
                            sources: [
                              {
                                fileName: "src/sample-api/utils.ts",
                                line: 165,
                                character: 56,
                              },
                            ],
                            type: {
                              type: "literal",
                              value: "admin",
                            },
                          },
                        ],
                        groups: [
                          {
                            title: "Properties",
                            children: [178],
                          },
                        ],
                        sources: [
                          {
                            fileName: "src/sample-api/utils.ts",
                            line: 165,
                            character: 54,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          id: 157 as ReflectionId,
          name: "kopiera",
          variant: "declaration",
          kind: 64,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 98,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 158 as ReflectionId,
              name: "kopiera",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Creates a deep copy of a ",
                  },
                  {
                    kind: "inline-tag",
                    tag: "@link",
                    text: "task",
                    target: 118,
                    tsLinkText: "task",
                  },
                  {
                    kind: "text",
                    text: ".",
                  },
                ],
                blockTags: [
                  {
                    tag: "@returns",
                    content: [
                      {
                        kind: "text",
                        text: "New task instance with the same properties",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/utils.ts",
                  line: 98,
                  character: 16,
                },
              ],
              typeParameters: [
                {
                  id: 159 as ReflectionId,
                  name: "T",
                  variant: "typeParam",
                  kind: 131072,
                  flags: {},
                },
              ],
              parameters: [
                {
                  id: 160 as ReflectionId,
                  name: "task",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "inline-tag",
                        tag: "@link",
                        text: "task",
                        target: 118,
                        tsLinkText: "task",
                      },
                      {
                        kind: "text",
                        text: " to copy",
                      },
                    ],
                  },
                  type: {
                    type: "reference",
                    target: 118,
                    typeArguments: [
                      {
                        type: "reference",
                        target: 159,
                        name: "T",
                        package: "typescript-api-mcp",
                        refersToTypeParameter: true,
                      },
                    ],
                    name: "Uffgabe",
                    package: "typescript-api-mcp",
                  },
                },
              ],
              type: {
                type: "reference",
                target: 38,
                typeArguments: [
                  {
                    type: "reference",
                    target: 159,
                    name: "T",
                    package: "typescript-api-mcp",
                    refersToTypeParameter: true,
                  },
                ],
                name: "TaschgInEcht",
                package: "typescript-api-mcp",
              },
            },
          ],
        },
        {
          id: 138 as ReflectionId,
          name: "sortByDueDate",
          variant: "declaration",
          kind: 64,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 26,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 139 as ReflectionId,
              name: "sortByDueDate",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Sorts tasks by due date (earliest first).",
                  },
                ],
                blockTags: [
                  {
                    tag: "@returns",
                    content: [
                      {
                        kind: "text",
                        text: "Sorted array of tasks",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/utils.ts",
                  line: 26,
                  character: 16,
                },
              ],
              typeParameters: [
                {
                  id: 140 as ReflectionId,
                  name: "T",
                  variant: "typeParam",
                  kind: 131072,
                  flags: {},
                  type: {
                    type: "reference",
                    target: 118,
                    typeArguments: [
                      {
                        type: "intrinsic",
                        name: "any",
                      },
                    ],
                    name: "Uffgabe",
                    package: "typescript-api-mcp",
                  },
                },
              ],
              parameters: [
                {
                  id: 141 as ReflectionId,
                  name: "tasks",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Array of tasks to sort",
                      },
                    ],
                  },
                  type: {
                    type: "array",
                    elementType: {
                      type: "reference",
                      target: 140,
                      name: "T",
                      package: "typescript-api-mcp",
                      refersToTypeParameter: true,
                    },
                  },
                },
              ],
              type: {
                type: "array",
                elementType: {
                  type: "reference",
                  target: 140,
                  name: "T",
                  package: "typescript-api-mcp",
                  refersToTypeParameter: true,
                },
              },
            },
          ],
        },
        {
          id: 134 as ReflectionId,
          name: "sortByPriority",
          variant: "declaration",
          kind: 64,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 16,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 135 as ReflectionId,
              name: "sortByPriority",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Sorts ",
                  },
                  {
                    kind: "inline-tag",
                    tag: "@link",
                    text: "tasks",
                    target: 118,
                    tsLinkText: "tasks",
                  },
                  {
                    kind: "text",
                    text: " by priority (highest first).",
                  },
                ],
                blockTags: [
                  {
                    tag: "@returns",
                    content: [
                      {
                        kind: "text",
                        text: "Sorted array of tasks",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/utils.ts",
                  line: 16,
                  character: 16,
                },
              ],
              typeParameters: [
                {
                  id: 136 as ReflectionId,
                  name: "T",
                  variant: "typeParam",
                  kind: 131072,
                  flags: {},
                  type: {
                    type: "reference",
                    target: 118,
                    typeArguments: [
                      {
                        type: "intrinsic",
                        name: "any",
                      },
                    ],
                    name: "Uffgabe",
                    package: "typescript-api-mcp",
                  },
                },
              ],
              parameters: [
                {
                  id: 137 as ReflectionId,
                  name: "tasks",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Array of tasks to sort",
                      },
                    ],
                  },
                  type: {
                    type: "array",
                    elementType: {
                      type: "reference",
                      target: 136,
                      name: "T",
                      package: "typescript-api-mcp",
                      refersToTypeParameter: true,
                    },
                  },
                },
              ],
              type: {
                type: "array",
                elementType: {
                  type: "reference",
                  target: 136,
                  name: "T",
                  package: "typescript-api-mcp",
                  refersToTypeParameter: true,
                },
              },
            },
          ],
        },
        {
          id: 153 as ReflectionId,
          name: "summarizeTasksByStatus",
          variant: "declaration",
          kind: 64,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 77,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 154 as ReflectionId,
              name: "summarizeTasksByStatus",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Generates a summary of tasks grouped by status.",
                  },
                ],
                blockTags: [
                  {
                    tag: "@returns",
                    content: [
                      {
                        kind: "text",
                        text: "Object with counts by status",
                      },
                    ],
                  },
                ],
              },
              sources: [
                {
                  fileName: "src/sample-api/utils.ts",
                  line: 77,
                  character: 16,
                },
              ],
              typeParameters: [
                {
                  id: 155 as ReflectionId,
                  name: "T",
                  variant: "typeParam",
                  kind: 131072,
                  flags: {},
                  type: {
                    type: "reference",
                    target: 118,
                    typeArguments: [
                      {
                        type: "intrinsic",
                        name: "any",
                      },
                    ],
                    name: "Uffgabe",
                    package: "typescript-api-mcp",
                  },
                },
              ],
              parameters: [
                {
                  id: 156 as ReflectionId,
                  name: "tasks",
                  variant: "param",
                  kind: 32768,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Array of tasks to summarize",
                      },
                    ],
                  },
                  type: {
                    type: "array",
                    elementType: {
                      type: "reference",
                      target: 155,
                      name: "T",
                      package: "typescript-api-mcp",
                      refersToTypeParameter: true,
                    },
                  },
                },
              ],
              type: {
                type: "reference",
                target: {
                  qualifiedName: "Record",
                },
                typeArguments: [
                  {
                    type: "reference",
                    target: 103,
                    name: "TaskStatus",
                    package: "typescript-api-mcp",
                  },
                  {
                    type: "intrinsic",
                    name: "number",
                  },
                ],
                name: "Record",
                package: "typescript",
              },
            },
          ],
        },
      ],
      groups: [
        {
          title: "Functions",
          children: [179, 142, 161, 174, 157, 138, 134, 153],
        },
      ],
      sources: [
        {
          fileName: "src/sample-api/utils.ts",
          line: 1,
          character: 0,
        },
      ],
    },
  ],
  groups: [
    {
      title: "Modules",
      children: [1, 2, 102, 133],
    },
  ],
  packageName: "typescript-api-mcp",
  readme: [
    {
      kind: "text",
      text: "# TypeScript API MCP Server\n\nAn MCP (Model Context Protocol) server that answers questions about TypeScript APIs by loading TypeDoc JSON documentation and providing efficient query endpoints.\n\n## Overview\n\nThis project provides a way for AI agents to efficiently explore and understand unknown TypeScript APIs. It loads TypeDoc-generated JSON documentation and exposes it through a set of query endpoints that allow agents to search for symbols, get detailed information about specific parts of the API, and understand relationships between different components.\n\n## Features\n\n- **TypeDoc Integration**: Loads and indexes TypeDoc JSON documentation for efficient querying\n- **Comprehensive Query Capabilities**: Provides a wide range of tools for exploring TypeScript APIs\n- **MCP Protocol**: Follows the Model Context Protocol for seamless integration with AI agents\n\n## Query Capabilities\n\nThe server provides the following tools for querying the API:\n\n- ",
    },
    {
      kind: "code",
      text: "`search_symbols`",
    },
    {
      kind: "text",
      text: ": Find symbols by name with optional filtering by kind\n- ",
    },
    {
      kind: "code",
      text: "`get_symbol_details`",
    },
    {
      kind: "text",
      text: ": Get detailed information about a specific symbol\n- ",
    },
    {
      kind: "code",
      text: "`list_members`",
    },
    {
      kind: "text",
      text: ": List methods and properties of a class or interface\n- ",
    },
    {
      kind: "code",
      text: "`get_parameter_info`",
    },
    {
      kind: "text",
      text: ": Get information about function parameters\n- ",
    },
    {
      kind: "code",
      text: "`find_implementations`",
    },
    {
      kind: "text",
      text: ": Find implementations of interfaces or subclasses\n- ",
    },
    {
      kind: "code",
      text: "`search_by_return_type`",
    },
    {
      kind: "text",
      text: ": Find functions returning a specific type\n- ",
    },
    {
      kind: "code",
      text: "`search_by_description`",
    },
    {
      kind: "text",
      text: ": Search in JSDoc comments\n- ",
    },
    {
      kind: "code",
      text: "`get_type_hierarchy`",
    },
    {
      kind: "text",
      text: ": Show inheritance relationships\n- ",
    },
    {
      kind: "code",
      text: "`find_usages`",
    },
    {
      kind: "text",
      text: ": Find where a type/function is used\n\n## Getting Started\n\n### Prerequisites\n\n- Node.js (v14 or later)\n- npm or yarn\n\n### Installation\n\n1. Clone the repository\n2. Install dependencies:\n   ",
    },
    {
      kind: "code",
      text: "```bash\n   npm install\n   ```",
    },
    {
      kind: "text",
      text: "\n\n### Usage\n\n1. Generate TypeDoc JSON for your TypeScript API:\n   ",
    },
    {
      kind: "code",
      text: "```bash\n   npx typedoc --json docs/api.json --entryPointStrategy expand path/to/your/typescript/files\n   ```",
    },
    {
      kind: "text",
      text: "\n\n2. Build the project:\n   ",
    },
    {
      kind: "code",
      text: "```bash\n   npm run build\n   ```",
    },
    {
      kind: "text",
      text: "\n\n3. Start the MCP server:\n   ",
    },
    {
      kind: "code",
      text: "```bash\n   npm start -- docs/api.json\n   ```",
    },
    {
      kind: "text",
      text: "\n\n4. Test the server with the MCP Inspector:\n   ",
    },
    {
      kind: "code",
      text: "```bash\n   npm run inspect\n   ```",
    },
    {
      kind: "text",
      text: "\n\n5. Connect an AI agent to the server to query the API\n\n## Project Structure\n\n- ",
    },
    {
      kind: "code",
      text: "`src/sample-api/`",
    },
    {
      kind: "text",
      text: ": A sample TypeScript API for testing\n- ",
    },
    {
      kind: "code",
      text: "`src/mcp-server/`",
    },
    {
      kind: "text",
      text: ": The MCP server implementation\n  - ",
    },
    {
      kind: "code",
      text: "`types/`",
    },
    {
      kind: "text",
      text: ": Type definitions\n    - ",
    },
    {
      kind: "code",
      text: "`typedoc-types.ts`",
    },
    {
      kind: "text",
      text: ": TypeDoc-related types\n    - ",
    },
    {
      kind: "code",
      text: "`api-types.ts`",
    },
    {
      kind: "text",
      text: ": API-related types\n    - ",
    },
    {
      kind: "code",
      text: "`handler-types.ts`",
    },
    {
      kind: "text",
      text: ": Handler-related types\n    - ",
    },
    {
      kind: "code",
      text: "`index.ts`",
    },
    {
      kind: "text",
      text: ": Type exports\n  - ",
    },
    {
      kind: "code",
      text: "`utils/`",
    },
    {
      kind: "text",
      text: ": Utility functions\n    - ",
    },
    {
      kind: "code",
      text: "`symbol-utils.ts`",
    },
    {
      kind: "text",
      text: ": Symbol-related utilities\n    - ",
    },
    {
      kind: "code",
      text: "`type-utils.ts`",
    },
    {
      kind: "text",
      text: ": Type-related utilities\n    - ",
    },
    {
      kind: "code",
      text: "`search-utils.ts`",
    },
    {
      kind: "text",
      text: ": Search-related utilities\n    - ",
    },
    {
      kind: "code",
      text: "`format-utils.ts`",
    },
    {
      kind: "text",
      text: ": Formatting utilities for LLM-friendly output\n    - ",
    },
    {
      kind: "code",
      text: "`index.ts`",
    },
    {
      kind: "text",
      text: ": Utility exports\n  - ",
    },
    {
      kind: "code",
      text: "`schemas/`",
    },
    {
      kind: "text",
      text: ": JSON schemas for the MCP tools\n    - ",
    },
    {
      kind: "code",
      text: "`tool-schemas.ts`",
    },
    {
      kind: "text",
      text: ": Tool schemas\n    - ",
    },
    {
      kind: "code",
      text: "`index.ts`",
    },
    {
      kind: "text",
      text: ": Schema exports\n  - ",
    },
    {
      kind: "code",
      text: "`handlers/`",
    },
    {
      kind: "text",
      text: ": Individual handlers for each tool\n    - ",
    },
    {
      kind: "code",
      text: "`search-symbols.ts`",
    },
    {
      kind: "text",
      text: ": Search symbols handler\n    - ",
    },
    {
      kind: "code",
      text: "`get-symbol-details.ts`",
    },
    {
      kind: "text",
      text: ": Get symbol details handler\n    - ",
    },
    {
      kind: "code",
      text: "`list-members.ts`",
    },
    {
      kind: "text",
      text: ": List members handler\n    - ",
    },
    {
      kind: "code",
      text: "`get-parameter-info.ts`",
    },
    {
      kind: "text",
      text: ": Get parameter info handler\n    - ",
    },
    {
      kind: "code",
      text: "`find-implementations.ts`",
    },
    {
      kind: "text",
      text: ": Find implementations handler\n    - ",
    },
    {
      kind: "code",
      text: "`search-by-return-type.ts`",
    },
    {
      kind: "text",
      text: ": Search by return type handler\n    - ",
    },
    {
      kind: "code",
      text: "`search-by-description.ts`",
    },
    {
      kind: "text",
      text: ": Search by description handler\n    - ",
    },
    {
      kind: "code",
      text: "`get-type-hierarchy.ts`",
    },
    {
      kind: "text",
      text: ": Get type hierarchy handler\n    - ",
    },
    {
      kind: "code",
      text: "`find-usages.ts`",
    },
    {
      kind: "text",
      text: ": Find usages handler\n    - ",
    },
    {
      kind: "code",
      text: "`index.ts`",
    },
    {
      kind: "text",
      text: ": Handler exports\n  - ",
    },
    {
      kind: "code",
      text: "`core/`",
    },
    {
      kind: "text",
      text: ": Core functionality\n    - ",
    },
    {
      kind: "code",
      text: "`typescript-api-handlers.ts`",
    },
    {
      kind: "text",
      text: ": Main handler class\n    - ",
    },
    {
      kind: "code",
      text: "`index.ts`",
    },
    {
      kind: "text",
      text: ": Core exports\n  - ",
    },
    {
      kind: "code",
      text: "`server.ts`",
    },
    {
      kind: "text",
      text: ": The MCP server implementation\n  - ",
    },
    {
      kind: "code",
      text: "`index.ts`",
    },
    {
      kind: "text",
      text: ": Entry point\n- ",
    },
    {
      kind: "code",
      text: "`tests/`",
    },
    {
      kind: "text",
      text: ": Tests for the API parsing functionality\n- ",
    },
    {
      kind: "code",
      text: "`docs/`",
    },
    {
      kind: "text",
      text: ": Generated TypeDoc JSON documentation\n\n## Enhanced Features\n\nThe server now supports:\n\n- Querying by ID or name for all handlers\n- Querying by arrays of IDs or names to get multiple results at once\n- LLM-friendly output format without metadata like sources\n\n## Development\n\n### Running Tests\n\n",
    },
    {
      kind: "code",
      text: "```bash\nnpm test\n```",
    },
    {
      kind: "text",
      text: "\n\n### Building\n\n",
    },
    {
      kind: "code",
      text: "```bash\nnpm run build\n```",
    },
    {
      kind: "text",
      text: "\n\n## License\n\nISC",
    },
  ],
  symbolIdMap: {
    "1": {
      qualifiedName: "",
    },
    "2": {
      qualifiedName: "",
    },
    "3": {
      qualifiedName: "UffgabeFaehler",
    },
    "4": {
      qualifiedName: "__global.ErrorConstructor.captureStackTrace",
    },
    "5": {
      qualifiedName: "__global.ErrorConstructor.captureStackTrace",
    },
    "6": {
      qualifiedName: "targetObject",
    },
    "7": {
      qualifiedName: "constructorOpt",
    },
    "8": {
      qualifiedName: "__global.ErrorConstructor.prepareStackTrace",
    },
    "9": {
      qualifiedName: "__type",
    },
    "10": {
      qualifiedName: "__type",
    },
    "11": {
      qualifiedName: "err",
    },
    "12": {
      qualifiedName: "stackTraces",
    },
    "13": {
      qualifiedName: "__global.ErrorConstructor.stackTraceLimit",
    },
    "14": {
      qualifiedName: "UffgabeFaehler.__constructor",
    },
    "15": {
      qualifiedName: "UffgabeFaehler",
    },
    "16": {
      qualifiedName: "message",
    },
    "17": {
      qualifiedName: "Error.name",
    },
    "18": {
      qualifiedName: "Error.message",
    },
    "19": {
      qualifiedName: "Error.stack",
    },
    "20": {
      qualifiedName: "UffgabeWechFaehler",
    },
    "21": {
      qualifiedName: "__global.ErrorConstructor.captureStackTrace",
    },
    "22": {
      qualifiedName: "__global.ErrorConstructor.captureStackTrace",
    },
    "23": {
      qualifiedName: "targetObject",
    },
    "24": {
      qualifiedName: "constructorOpt",
    },
    "25": {
      qualifiedName: "__global.ErrorConstructor.prepareStackTrace",
    },
    "26": {
      qualifiedName: "__type",
    },
    "27": {
      qualifiedName: "__type",
    },
    "28": {
      qualifiedName: "err",
    },
    "29": {
      qualifiedName: "stackTraces",
    },
    "30": {
      qualifiedName: "__global.ErrorConstructor.stackTraceLimit",
    },
    "31": {
      qualifiedName: "UffgabeWechFaehler.__constructor",
    },
    "32": {
      qualifiedName: "UffgabeWechFaehler",
    },
    "33": {
      qualifiedName: "taskId",
    },
    "34": {
      qualifiedName: "UffgabeWechFaehler.taskId",
    },
    "35": {
      qualifiedName: "Error.name",
    },
    "36": {
      qualifiedName: "Error.message",
    },
    "37": {
      qualifiedName: "Error.stack",
    },
    "38": {
      qualifiedName: "TaschgInEcht",
    },
    "39": {
      qualifiedName: "TaschgInEcht.__constructor",
    },
    "40": {
      qualifiedName: "TaschgInEcht",
    },
    "41": {
      qualifiedName: "TaschgInEcht.T",
    },
    "42": {
      qualifiedName: "task",
    },
    "43": {
      qualifiedName: "__type",
    },
    "44": {
      qualifiedName: "__type.status",
    },
    "45": {
      qualifiedName: "TaschgInEcht.id",
    },
    "46": {
      qualifiedName: "TaschgInEcht.do_Tittel",
    },
    "47": {
      qualifiedName: "TaschgInEcht.umWosGoots",
    },
    "48": {
      qualifiedName: "TaschgInEcht.status",
    },
    "49": {
      qualifiedName: "TaschgInEcht.priority",
    },
    "50": {
      qualifiedName: "TaschgInEcht.assignee",
    },
    "51": {
      qualifiedName: "TaschgInEcht.dueDate",
    },
    "52": {
      qualifiedName: "TaschgInEcht.data",
    },
    "53": {
      qualifiedName: "TaschgInEcht.createdAt",
    },
    "54": {
      qualifiedName: "TaschgInEcht.updatedAt",
    },
    "59": {
      qualifiedName: "TaschgInEcht.korrigiera",
    },
    "60": {
      qualifiedName: "TaschgInEcht.korrigiera",
    },
    "61": {
      qualifiedName: "status",
    },
    "62": {
      qualifiedName: "TaschgInEcht.delegiera",
    },
    "63": {
      qualifiedName: "TaschgInEcht.delegiera",
    },
    "64": {
      qualifiedName: "user",
    },
    "65": {
      qualifiedName: "TaschgInEcht.wasWarDavor",
    },
    "66": {
      qualifiedName: "TaschgInEcht.wasWarDavor",
    },
    "67": {
      qualifiedName: "__type",
    },
    "68": {
      qualifiedName: "__type.status",
    },
    "69": {
      qualifiedName: "__type.timestamp",
    },
    "70": {
      qualifiedName: "TaschgInEcht.ojeZuSpaet",
    },
    "71": {
      qualifiedName: "TaschgInEcht.ojeZuSpaet",
    },
    "72": {
      qualifiedName: "TaschgInEcht.toString",
    },
    "73": {
      qualifiedName: "TaschgInEcht.toString",
    },
    "74": {
      qualifiedName: "TaschgInEcht.T",
    },
    "75": {
      qualifiedName: "TaschgMaenaedscha",
    },
    "78": {
      qualifiedName: "TaschgMaenaedscha.T",
    },
    "81": {
      qualifiedName: "TaschgMaenaedscha.bauWatt",
    },
    "82": {
      qualifiedName: "TaschgMaenaedscha.bauWatt",
    },
    "83": {
      qualifiedName: "title",
    },
    "84": {
      qualifiedName: "description",
    },
    "85": {
      qualifiedName: "priority",
    },
    "86": {
      qualifiedName: "options",
    },
    "87": {
      qualifiedName: "TaschgMaenaedscha.suchs",
    },
    "88": {
      qualifiedName: "TaschgMaenaedscha.suchs",
    },
    "89": {
      qualifiedName: "id",
    },
    "90": {
      qualifiedName: "TaschgMaenaedscha.iWillAelles",
    },
    "91": {
      qualifiedName: "TaschgMaenaedscha.iWillAelles",
    },
    "92": {
      qualifiedName: "TaschgMaenaedscha.holsMir",
    },
    "93": {
      qualifiedName: "TaschgMaenaedscha.holsMir",
    },
    "94": {
      qualifiedName: "status",
    },
    "95": {
      qualifiedName: "TaschgMaenaedscha.holsFuerEnKerle",
    },
    "96": {
      qualifiedName: "TaschgMaenaedscha.holsFuerEnKerle",
    },
    "97": {
      qualifiedName: "userId",
    },
    "98": {
      qualifiedName: "TaschgMaenaedscha.wechDamit",
    },
    "99": {
      qualifiedName: "TaschgMaenaedscha.wechDamit",
    },
    "100": {
      qualifiedName: "id",
    },
    "101": {
      qualifiedName: "TaschgMaenaedscha.T",
    },
    "102": {
      qualifiedName: "",
    },
    "103": {
      qualifiedName: "TaskStatus",
    },
    "104": {
      qualifiedName: "TaskStatus.PENDING",
    },
    "105": {
      qualifiedName: "TaskStatus.LAEUFT",
    },
    "106": {
      qualifiedName: "TaskStatus.FERTIG",
    },
    "107": {
      qualifiedName: "TaskStatus.MIST",
    },
    "108": {
      qualifiedName: "Priority",
    },
    "109": {
      qualifiedName: "Priority.WENIG",
    },
    "110": {
      qualifiedName: "Priority.GEHT_SO",
    },
    "111": {
      qualifiedName: "Priority.SCHNELL",
    },
    "112": {
      qualifiedName: "Priority.UI_UI_UI",
    },
    "113": {
      qualifiedName: "Kerle",
    },
    "114": {
      qualifiedName: "Kerle.id",
    },
    "115": {
      qualifiedName: "Kerle.soi_name",
    },
    "116": {
      qualifiedName: "Kerle.internet_brief",
    },
    "117": {
      qualifiedName: "Kerle.role",
    },
    "118": {
      qualifiedName: "Uffgabe",
    },
    "119": {
      qualifiedName: "Uffgabe.id",
    },
    "120": {
      qualifiedName: "Uffgabe.do_Tittel",
    },
    "121": {
      qualifiedName: "Uffgabe.umWosGoots",
    },
    "122": {
      qualifiedName: "Uffgabe.status",
    },
    "123": {
      qualifiedName: "Uffgabe.priority",
    },
    "124": {
      qualifiedName: "Uffgabe.assignee",
    },
    "125": {
      qualifiedName: "Uffgabe.dueDate",
    },
    "126": {
      qualifiedName: "Uffgabe.data",
    },
    "127": {
      qualifiedName: "Uffgabe.T",
    },
    "128": {
      qualifiedName: "TaskOptions",
    },
    "129": {
      qualifiedName: "__type",
    },
    "130": {
      qualifiedName: "__type.autoAssign",
    },
    "131": {
      qualifiedName: "__type.defaultPriority",
    },
    "132": {
      qualifiedName: "__type.tags",
    },
    "133": {
      qualifiedName: "",
    },
    "134": {
      qualifiedName: "sortByPriority",
    },
    "135": {
      qualifiedName: "sortByPriority",
    },
    "136": {
      qualifiedName: "T",
    },
    "137": {
      qualifiedName: "tasks",
    },
    "138": {
      qualifiedName: "sortByDueDate",
    },
    "139": {
      qualifiedName: "sortByDueDate",
    },
    "140": {
      qualifiedName: "T",
    },
    "141": {
      qualifiedName: "tasks",
    },
    "142": {
      qualifiedName: "filterTasks",
    },
    "143": {
      qualifiedName: "filterTasks",
    },
    "144": {
      qualifiedName: "T",
    },
    "145": {
      qualifiedName: "tasks",
    },
    "146": {
      qualifiedName: "criteria",
    },
    "147": {
      qualifiedName: "__type",
    },
    "148": {
      qualifiedName: "__type.status",
    },
    "149": {
      qualifiedName: "__type.priority",
    },
    "150": {
      qualifiedName: "__type.assigneeId",
    },
    "151": {
      qualifiedName: "__type.dueBefore",
    },
    "152": {
      qualifiedName: "__type.dueAfter",
    },
    "153": {
      qualifiedName: "summarizeTasksByStatus",
    },
    "154": {
      qualifiedName: "summarizeTasksByStatus",
    },
    "155": {
      qualifiedName: "T",
    },
    "156": {
      qualifiedName: "tasks",
    },
    "157": {
      qualifiedName: "kopiera",
    },
    "158": {
      qualifiedName: "kopiera",
    },
    "159": {
      qualifiedName: "T",
    },
    "160": {
      qualifiedName: "task",
    },
    "161": {
      qualifiedName: "formatTask",
    },
    "162": {
      qualifiedName: "formatTask",
    },
    "163": {
      qualifiedName: "task",
    },
    "164": {
      qualifiedName: "__type",
    },
    "165": {
      qualifiedName: "__type.status",
    },
    "166": {
      qualifiedName: "formatTask",
    },
    "167": {
      qualifiedName: "task",
    },
    "168": {
      qualifiedName: "__type",
    },
    "169": {
      qualifiedName: "__type.status",
    },
    "170": {
      qualifiedName: "formatTask",
    },
    "171": {
      qualifiedName: "task",
    },
    "172": {
      qualifiedName: "__type",
    },
    "173": {
      qualifiedName: "__type.status",
    },
    "174": {
      qualifiedName: "isAdmin",
    },
    "175": {
      qualifiedName: "isAdmin",
    },
    "176": {
      qualifiedName: "user",
    },
    "177": {
      qualifiedName: "__type",
    },
    "178": {
      qualifiedName: "__type.role",
    },
    "179": {
      qualifiedName: "calculateEstimatedCompletion",
    },
    "180": {
      qualifiedName: "calculateEstimatedCompletion",
    },
    "181": {
      qualifiedName: "task",
    },
    "182": {
      qualifiedName: "estimatedHoursPerPriority",
    },
    "183": {
      qualifiedName: "TaskStatus",
    },
    "184": {
      qualifiedName: "Priority",
    },
    "185": {
      qualifiedName: "Kerle",
    },
    "186": {
      qualifiedName: "Uffgabe",
    },
    "187": {
      qualifiedName: "TaskOptions",
    },
    "188": {
      qualifiedName: "UffgabeFaehler",
    },
    "189": {
      qualifiedName: "UffgabeWechFaehler",
    },
    "190": {
      qualifiedName: "TaschgInEcht",
    },
    "191": {
      qualifiedName: "TaschgMaenaedscha",
    },
    "192": {
      qualifiedName: "sortByPriority",
    },
    "193": {
      qualifiedName: "sortByDueDate",
    },
    "194": {
      qualifiedName: "filterTasks",
    },
    "195": {
      qualifiedName: "summarizeTasksByStatus",
    },
    "196": {
      qualifiedName: "kopiera",
    },
    "197": {
      qualifiedName: "formatTask",
    },
    "198": {
      qualifiedName: "isAdmin",
    },
    "199": {
      qualifiedName: "calculateEstimatedCompletion",
    },
  },
  files: {
    entries: {
      "1": "src/sample-api/index.ts",
      "2": "src/sample-api/taschg-maenaedscha.ts",
      "3": "src/sample-api/types.ts",
      "4": "src/sample-api/utils.ts",
    },
    reflections: {
      "1": 1,
      "2": 2,
      "3": 102,
      "4": 133,
    },
  },
} as unknown as JSONOutput.ProjectReflection;
