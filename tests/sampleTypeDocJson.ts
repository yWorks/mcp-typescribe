// Sample TypeDoc JSON for testing
import { JSONOutput } from "typedoc";

export const sampleTypeDocJson = {
  schemaVersion: "2.0",
  id: 0,
  name: "mcp-typescribe",
  variant: "project",
  kind: 1,
  flags: {},
  children: [
    {
      id: 1,
      name: "index",
      variant: "declaration",
      kind: 2,
      flags: {},
      comment: {
        summary: [
          {
            kind: "text",
            text: "Task Management API\n\nA simple API for managing ",
          },
          {
            kind: "inline-tag",
            tag: "@link",
            text: "tasks",
            target: 141,
          },
          {
            kind: "text",
            text: ", ",
          },
          {
            kind: "inline-tag",
            tag: "@link",
            text: "users",
            target: 125,
          },
          {
            kind: "text",
            text: ", and task assignments.\n\nPlease see [the documentation](",
          },
          {
            kind: "relative-link",
            text: "./docs/intro.md#getting-started",
            target: 1,
            targetAnchor: "getting-started",
          },
          {
            kind: "text",
            text: ") on how to get started",
          },
        ],
      },
      children: [
        {
          id: 222,
          name: "calculateEstimatedCompletion",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 196,
              character: 16,
            },
          ],
          target: 202,
        },
        {
          id: 217,
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
          target: 165,
        },
        {
          id: 220,
          name: "formatTask",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 132,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 143,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 154,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 164,
              character: 16,
            },
          ],
          target: 184,
        },
        {
          id: 221,
          name: "isAdmin",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 185,
              character: 16,
            },
          ],
          target: 197,
        },
        {
          id: 208,
          name: "Kerle",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 111,
              character: 17,
            },
            {
              fileName: "src/sample-api/types.ts",
              line: 128,
              character: 17,
            },
          ],
          target: 125,
        },
        {
          id: 219,
          name: "kopiera",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 112,
              character: 16,
            },
          ],
          target: 180,
        },
        {
          id: 207,
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
            {
              fileName: "src/sample-api/types.ts",
              line: 73,
              character: 17,
            },
          ],
          target: 116,
        },
        {
          id: 216,
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
          target: 161,
        },
        {
          id: 215,
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
          target: 157,
        },
        {
          id: 218,
          name: "summarizeTasksByStatus",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 89,
              character: 16,
            },
          ],
          target: 176,
        },
        {
          id: 213,
          name: "TaschgInEcht",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 39,
              character: 13,
            },
          ],
          target: 42,
        },
        {
          id: 214,
          name: "TaschgMaenaedscha",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 145,
              character: 13,
            },
          ],
          target: 79,
        },
        {
          id: 210,
          name: "TaskOptions",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 178,
              character: 12,
            },
          ],
          target: 151,
        },
        {
          id: 206,
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
            {
              fileName: "src/sample-api/types.ts",
              line: 44,
              character: 17,
            },
          ],
          target: 107,
        },
        {
          id: 209,
          name: "Uffgabe",
          variant: "reference",
          kind: 4194304,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 156,
              character: 17,
            },
          ],
          target: 141,
        },
        {
          id: 211,
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
          target: 7,
        },
        {
          id: 212,
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
          target: 24,
        },
      ],
      documents: [
        {
          id: 2,
          name: "External Markdown",
          variant: "document",
          kind: 8388608,
          flags: {},
          content: [
            {
              kind: "text",
              text: "# Welcome to Our Project\n\n## Introduction\n\nThis is a sample introduction text created for testing purposes. This document provides an overview of our project, its features, and how to get started.\n\nHere are some [links](",
            },
            {
              kind: "relative-link",
              text: "./links.md",
              target: 3,
            },
            {
              kind: "text",
              text: ")\n\nCheck out ",
            },
            {
              kind: "inline-tag",
              tag: "@link",
              text: " Kerle",
              target: 125,
            },
            {
              kind: "text",
              text: "\n\n### About the Project\n\nOur project aims to simplify complex workflows and improve productivity through intuitive interfaces and powerful automation tools.\n\n## Key Features\n\n- **Easy to Use**: Simple and intuitive interface\n- **Customizable**: Adapt to your specific needs\n- **Scalable**: Grows with your requirements\n- **Well Documented**: Comprehensive guides and tutorials\n\n## Getting Started\n\nTo get started with our project, please refer to the [installation guide](",
            },
            {
              kind: "relative-link",
              text: "./installation.md",
              target: 4,
            },
            {
              kind: "text",
              text: ") and [documentation](",
            },
            {
              kind: "relative-link",
              text: "./documentation.md",
              target: 5,
            },
            {
              kind: "text",
              text: ").\n\nThank you for your interest in our project!\n\n---\n\n*This is a testing document. The content is for demonstration purposes only.*",
            },
          ],
          frontmatter: {
            group: "Documents",
            category: "Guides",
          },
          children: [
            {
              id: 3,
              name: "Installation",
              variant: "document",
              kind: 8388608,
              flags: {},
              content: [
                {
                  kind: "text",
                  text: "# Installation Guide\n\n## Welcome to the EXTREME Installation Experience™ (v2.2.7)\n\nThank you for choosing our software! This guide will walk you through the **intensely straightforward** process of installing our application. Put on your configuration helmet and prepare for an XML adventure like it's 2002!\n\n## System Requirements\n\n- A computer (preferably one that turns on)\n- At least 256MB RAM (yes, MEGA bytes!)\n- 50MB of free hard disk space (we know, it's massive)\n- Internet Explorer 6.0 or Netscape Navigator 4.7\n- Windows 98SE, ME, or the ultra-modern XP\n- A CD-ROM drive for our exciting 3-disk installation set!\n\n## Installation Steps\n\n1. Insert Disk 1 into your CD-ROM drive\n2. Wait for the autorun dialog (this could take up to 4 minutes)\n3. Click \"INSTALL NOW!!!\" in the flashy animated GIF button\n4. When prompted, create your ",
                },
                {
                  kind: "code",
                  text: "`config.xml`",
                },
                {
                  kind: "text",
                  text: " file as follows:\n\n",
                },
                {
                  kind: "code",
                  text: '```xml\n<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<!DOCTYPE configuration SYSTEM "http://www.ourproduct.com/dtd/config-2002.dtd">\n<CONFIGURATION>\n  <APP_SETTINGS>\n    <SERVER host="localhost" port="8080" timeout="30000" />\n    <LOGGING level="ERROR" path="C:\\Program Files\\OurApp\\Logs\\" />\n    <UI theme="BlueWave" showSplash="true" animationSpeed="slow" />\n  </APP_SETTINGS>\n  <USER_PREFERENCES>\n    <OPTION name="AutoSave" value="true" />\n    <OPTION name="CheckForUpdates" value="daily" />\n    <OPTION name="PlayStartupSound" value="true" />\n  </USER_PREFERENCES>\n  <ADVANCED>\n    <MEMORY initialHeapSize="64m" maxHeapSize="128m" />\n    <PLUGINS enabled="true" scanOnStartup="true" />\n  </ADVANCED>\n</CONFIGURATION>\n```',
                },
                {
                  kind: "text",
                  text: '\n\n5. Insert Disk 2 when prompted\n6. Configure your database settings and wait for the progress bar to complete (approximately 17 minutes)\n7. When the "DLL Registration Success!" message appears, insert Disk 3\n8. Print out your 16-digit registration code and keep it in a safe place!\n\n## Troubleshooting\n\nIf you see the error message ',
                },
                {
                  kind: "code",
                  text: "`ERROR: INSUFFICIENT SYSTEM RESOURCES`",
                },
                {
                  kind: "text",
                  text: ", try closing your other application.\n\nIf installation fails with ",
                },
                {
                  kind: "code",
                  text: "`XML PARSING ERROR 0x8700542`",
                },
                {
                  kind: "text",
                  text: ", ensure you have copied EXACTLY 3 spaces (not tabs) before each XML element.\n\n## Support\n\nNeed help? Contact our support team via:\n- Email: help@ourcompany.com\n- Fax: 555-XML-HELP\n- BBS: dial-in available between 11pm-6am EST\n\nThank you for embarking on this installation journey! Remember to register your product within 30 days or face persistent popup reminders every 45 minutes!",
                },
              ],
              frontmatter: {
                group: "Documents",
                category: "Guides",
              },
            },
            {
              id: 4,
              name: "Helpful Docs",
              variant: "document",
              kind: 8388608,
              flags: {},
              content: [
                {
                  kind: "text",
                  text: "# Official Documentation\n\n## Version 1.0.3.7.2.9-alpha-preview-SNAPSHOT\n\nWelcome to the *comprehensive* documentation for our product.\n\n## Getting Started\n\nTo get started, simply... um... start?\n\n## Features\n\nOur product has several amazing features:\n- It exists\n- It does things (sometimes)\n- It rarely crashes more than twice per hour\n- Compatible with most computers that have electricity\n\n## Troubleshooting\n\nHaving problems? Here's our complete troubleshooting guide:\n\n1. Try turning it off and on again\n2. ¯\\\\\\_(ツ)_/¯\n\n## FAQ\n\n**Q: How do I use this product?**  \nA: Very carefully.\n\n**Q: Is there a tutorial?**  \nA: We believe in learning through exploration and random clicking.\n\n**Q: Where can I find more detailed documentation?**  \nA: This is it. This is all of it. We spent upwards of 14 minutes creating this document.\n\n**Q: What does error code 0x7B3912FF mean?**  \nA: It means you've discovered a feature we didn't know existed. Congratulations!\n\n## Advanced Configuration\n\n\nGo [back](",
                },
                {
                  kind: "relative-link",
                  text: "intro.md",
                  target: 1,
                },
                {
                  kind: "text",
                  text: ")",
                },
              ],
              frontmatter: {
                group: "Documents",
                category: "Guides",
              },
            },
            {
              id: 5,
              name: "Testing Links",
              variant: "document",
              kind: 8388608,
              flags: {},
              content: [
                {
                  kind: "text",
                  text: "Here is some text to link to ",
                },
                {
                  kind: "inline-tag",
                  tag: "@link",
                  text: "the user",
                  target: 125,
                },
                {
                  kind: "text",
                  text: "!",
                },
              ],
              frontmatter: {
                group: "Documents",
                category: "Guides",
              },
            },
          ],
        },
      ],
      childrenIncludingDocuments: [
        2, 222, 217, 220, 221, 208, 219, 207, 216, 215, 218, 213, 214, 210, 206,
        209, 211, 212,
      ],
      groups: [
        {
          title: "Documents",
          children: [2],
        },
        {
          title: "References",
          children: [
            222, 217, 220, 221, 208, 219, 207, 216, 215, 218, 213, 214, 210,
            206, 209, 211, 212,
          ],
        },
      ],
      categories: [
        {
          title: "Guides",
          children: [2],
        },
        {
          title: "Other",
          children: [
            222, 217, 220, 221, 208, 219, 207, 216, 215, 218, 213, 214, 210,
            206, 209, 211, 212,
          ],
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
      id: 6,
      name: "taschg-maenaedscha",
      variant: "declaration",
      kind: 2,
      flags: {},
      children: [
        {
          id: 42,
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
              id: 43,
              name: "constructor",
              variant: "declaration",
              kind: 512,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 68,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 44,
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
                      line: 68,
                      character: 2,
                    },
                  ],
                  typeParameters: [
                    {
                      id: 45,
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
                      id: 46,
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
                              packageName: "typescript",
                              packagePath: "lib/lib.es5.d.ts",
                              qualifiedName: "Omit",
                            },
                            typeArguments: [
                              {
                                type: "reference",
                                target: 141,
                                typeArguments: [
                                  {
                                    type: "reference",
                                    target: 45,
                                    name: "T",
                                    package: "mcp-typescribe",
                                    qualifiedName: "TaschgInEcht.T",
                                    refersToTypeParameter: true,
                                  },
                                ],
                                name: "Uffgabe",
                                package: "mcp-typescribe",
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
                              id: 47,
                              name: "__type",
                              variant: "declaration",
                              kind: 65536,
                              flags: {},
                              children: [
                                {
                                  id: 48,
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
                                      line: 68,
                                      character: 51,
                                    },
                                  ],
                                  type: {
                                    type: "reference",
                                    target: 107,
                                    name: "TaskStatus",
                                    package: "mcp-typescribe",
                                  },
                                },
                              ],
                              groups: [
                                {
                                  title: "Properties",
                                  children: [48],
                                },
                              ],
                              sources: [
                                {
                                  fileName:
                                    "src/sample-api/taschg-maenaedscha.ts",
                                  line: 68,
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
                    target: 42,
                    typeArguments: [
                      {
                        type: "reference",
                        target: 45,
                        name: "T",
                        package: "mcp-typescribe",
                        qualifiedName: "TaschgInEcht.T",
                        refersToTypeParameter: true,
                      },
                    ],
                    name: "TaschgInEcht",
                    package: "mcp-typescribe",
                  },
                },
              ],
            },
            {
              id: 54,
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
                  line: 51,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 125,
                name: "Kerle",
                package: "mcp-typescribe",
              },
              implementationOf: {
                type: "reference",
                target: 147,
                name: "Uffgabe.assignee",
              },
            },
            {
              id: 57,
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
                  line: 57,
                  character: 11,
                },
              ],
              type: {
                type: "reference",
                target: {
                  packageName: "typescript",
                  packagePath: "lib/lib.es5.d.ts",
                  qualifiedName: "Date",
                },
                name: "Date",
                package: "typescript",
              },
            },
            {
              id: 56,
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
                  line: 55,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 45,
                name: "T",
                package: "mcp-typescribe",
                qualifiedName: "TaschgInEcht.T",
                refersToTypeParameter: true,
              },
              implementationOf: {
                type: "reference",
                target: 149,
                name: "Uffgabe.data",
              },
            },
            {
              id: 50,
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
                  line: 43,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              implementationOf: {
                type: "reference",
                target: 143,
                name: "Uffgabe.do_Tittel",
              },
            },
            {
              id: 55,
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
                  line: 53,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: {
                  packageName: "typescript",
                  packagePath: "lib/lib.es5.d.ts",
                  qualifiedName: "Date",
                },
                name: "Date",
                package: "typescript",
              },
              implementationOf: {
                type: "reference",
                target: 148,
                name: "Uffgabe.dueDate",
              },
            },
            {
              id: 49,
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
                  line: 41,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              implementationOf: {
                type: "reference",
                target: 142,
                name: "Uffgabe.id",
              },
            },
            {
              id: 53,
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
                  line: 49,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 116,
                name: "Priority",
                package: "mcp-typescribe",
              },
              implementationOf: {
                type: "reference",
                target: 146,
                name: "Uffgabe.priority",
              },
            },
            {
              id: 52,
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
                  line: 47,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 107,
                name: "TaskStatus",
                package: "mcp-typescribe",
              },
              implementationOf: {
                type: "reference",
                target: 145,
                name: "Uffgabe.status",
              },
            },
            {
              id: 51,
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
                  line: 45,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
              implementationOf: {
                type: "reference",
                target: 144,
                name: "Uffgabe.umWosGoots",
              },
            },
            {
              id: 58,
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
                  line: 59,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: {
                  packageName: "typescript",
                  packagePath: "lib/lib.es5.d.ts",
                  qualifiedName: "Date",
                },
                name: "Date",
                package: "typescript",
              },
            },
            {
              id: 66,
              name: "delegiera",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 103,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 67,
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
                      line: 103,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 68,
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
                        target: 125,
                        name: "Kerle",
                        package: "mcp-typescribe",
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
              id: 63,
              name: "korrigiera",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 88,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 64,
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
                      line: 88,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 65,
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
                        target: 107,
                        name: "TaskStatus",
                        package: "mcp-typescribe",
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
              id: 74,
              name: "ojeZuSpaet",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 123,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 75,
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
                      line: 123,
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
              id: 76,
              name: "toString",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 134,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 77,
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
                      line: 134,
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
              id: 69,
              name: "wasWarDavor",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 114,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 70,
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
                      line: 114,
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
                          id: 71,
                          name: "__type",
                          variant: "declaration",
                          kind: 65536,
                          flags: {},
                          children: [
                            {
                              id: 72,
                              name: "status",
                              variant: "declaration",
                              kind: 1024,
                              flags: {},
                              sources: [
                                {
                                  fileName:
                                    "src/sample-api/taschg-maenaedscha.ts",
                                  line: 114,
                                  character: 33,
                                },
                              ],
                              type: {
                                type: "reference",
                                target: 107,
                                name: "TaskStatus",
                                package: "mcp-typescribe",
                              },
                            },
                            {
                              id: 73,
                              name: "timestamp",
                              variant: "declaration",
                              kind: 1024,
                              flags: {},
                              sources: [
                                {
                                  fileName:
                                    "src/sample-api/taschg-maenaedscha.ts",
                                  line: 114,
                                  character: 53,
                                },
                              ],
                              type: {
                                type: "reference",
                                target: {
                                  packageName: "typescript",
                                  packagePath: "lib/lib.es5.d.ts",
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
                              children: [72, 73],
                            },
                          ],
                          sources: [
                            {
                              fileName: "src/sample-api/taschg-maenaedscha.ts",
                              line: 114,
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
              children: [43],
            },
            {
              title: "Properties",
              children: [54, 57, 56, 50, 55, 49, 53, 52, 51, 58],
            },
            {
              title: "Methods",
              children: [66, 63, 74, 76, 69],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 39,
              character: 13,
            },
          ],
          typeParameters: [
            {
              id: 78,
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
              target: 141,
              typeArguments: [
                {
                  type: "reference",
                  target: 45,
                  name: "T",
                  package: "mcp-typescribe",
                  qualifiedName: "TaschgInEcht.T",
                  refersToTypeParameter: true,
                },
              ],
              name: "Uffgabe",
              package: "mcp-typescribe",
            },
          ],
        },
        {
          id: 79,
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
              id: 80,
              name: "constructor",
              variant: "declaration",
              kind: 512,
              flags: {},
              signatures: [
                {
                  id: 81,
                  name: "TaschgMaenaedscha",
                  variant: "signature",
                  kind: 16384,
                  flags: {},
                  typeParameters: [
                    {
                      id: 82,
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
                    target: 79,
                    typeArguments: [
                      {
                        type: "reference",
                        target: 82,
                        name: "T",
                        package: "mcp-typescribe",
                        qualifiedName: "TaschgMaenaedscha.T",
                        refersToTypeParameter: true,
                      },
                    ],
                    name: "TaschgMaenaedscha",
                    package: "mcp-typescribe",
                  },
                },
              ],
            },
            {
              id: 85,
              name: "bauWatt",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 168,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 86,
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
                            text: "```typescript\nconst taskManager = new TaskManager();\nconst task = taskManager.createTask(\n  'Implement feature',\n  'Implement the new login feature',\n  Priority.HIGH\n);\n```",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/taschg-maenaedscha.ts",
                      line: 168,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 87,
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
                      id: 88,
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
                      id: 89,
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
                        target: 116,
                        name: "Priority",
                        package: "mcp-typescribe",
                      },
                    },
                    {
                      id: 90,
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
                        target: 151,
                        name: "TaskOptions",
                        package: "mcp-typescribe",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    target: 42,
                    typeArguments: [
                      {
                        type: "reference",
                        target: 82,
                        name: "T",
                        package: "mcp-typescribe",
                        qualifiedName: "TaschgMaenaedscha.T",
                        refersToTypeParameter: true,
                      },
                    ],
                    name: "TaschgInEcht",
                    package: "mcp-typescribe",
                  },
                },
              ],
            },
            {
              id: 99,
              name: "holsFuerEnKerle",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 228,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 100,
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
                      line: 228,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 101,
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
                      target: 42,
                      typeArguments: [
                        {
                          type: "reference",
                          target: 82,
                          name: "T",
                          package: "mcp-typescribe",
                          qualifiedName: "TaschgMaenaedscha.T",
                          refersToTypeParameter: true,
                        },
                      ],
                      name: "TaschgInEcht",
                      package: "mcp-typescribe",
                    },
                  },
                },
              ],
            },
            {
              id: 96,
              name: "holsMir",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 218,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 97,
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
                      line: 218,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 98,
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
                        target: 107,
                        name: "TaskStatus",
                        package: "mcp-typescribe",
                      },
                    },
                  ],
                  type: {
                    type: "array",
                    elementType: {
                      type: "reference",
                      target: 42,
                      typeArguments: [
                        {
                          type: "reference",
                          target: 82,
                          name: "T",
                          package: "mcp-typescribe",
                          qualifiedName: "TaschgMaenaedscha.T",
                          refersToTypeParameter: true,
                        },
                      ],
                      name: "TaschgInEcht",
                      package: "mcp-typescribe",
                    },
                  },
                },
              ],
            },
            {
              id: 94,
              name: "iWillAelles",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 208,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 95,
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
                      line: 208,
                      character: 2,
                    },
                  ],
                  type: {
                    type: "array",
                    elementType: {
                      type: "reference",
                      target: 42,
                      typeArguments: [
                        {
                          type: "reference",
                          target: 82,
                          name: "T",
                          package: "mcp-typescribe",
                          qualifiedName: "TaschgMaenaedscha.T",
                          refersToTypeParameter: true,
                        },
                      ],
                      name: "TaschgInEcht",
                      package: "mcp-typescribe",
                    },
                  },
                },
              ],
            },
            {
              id: 91,
              name: "suchs",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 195,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 92,
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
                      line: 195,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 93,
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
                    target: 42,
                    typeArguments: [
                      {
                        type: "reference",
                        target: 82,
                        name: "T",
                        package: "mcp-typescribe",
                        qualifiedName: "TaschgMaenaedscha.T",
                        refersToTypeParameter: true,
                      },
                    ],
                    name: "TaschgInEcht",
                    package: "mcp-typescribe",
                  },
                },
              ],
            },
            {
              id: 102,
              name: "wechDamit",
              variant: "declaration",
              kind: 2048,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/taschg-maenaedscha.ts",
                  line: 238,
                  character: 2,
                },
              ],
              signatures: [
                {
                  id: 103,
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
                      line: 238,
                      character: 2,
                    },
                  ],
                  parameters: [
                    {
                      id: 104,
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
              children: [80],
            },
            {
              title: "Methods",
              children: [85, 99, 96, 94, 91, 102],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/taschg-maenaedscha.ts",
              line: 145,
              character: 13,
            },
          ],
          typeParameters: [
            {
              id: 105,
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
          id: 7,
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
              id: 18,
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
                  id: 19,
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
                      id: 20,
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
                    target: 7,
                    name: "UffgabeFaehler",
                    package: "mcp-typescribe",
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
              id: 22,
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
              id: 21,
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
              id: 23,
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
              id: 12,
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
                  id: 13,
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
                      id: 14,
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
                          id: 15,
                          name: "err",
                          variant: "param",
                          kind: 32768,
                          flags: {
                            isExternal: true,
                          },
                          type: {
                            type: "reference",
                            target: {
                              packageName: "typescript",
                              packagePath: "lib/lib.es5.d.ts",
                              qualifiedName: "Error",
                            },
                            name: "Error",
                            package: "typescript",
                          },
                        },
                        {
                          id: 16,
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
                                packageName: "@types/node",
                                packagePath: "globals.d.ts",
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
              id: 17,
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
              id: 8,
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
                  id: 9,
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
                      id: 10,
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
                      id: 11,
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
                          packageName: "typescript",
                          packagePath: "lib/lib.es5.d.ts",
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
              children: [18],
            },
            {
              title: "Properties",
              children: [22, 21, 23, 12, 17],
            },
            {
              title: "Methods",
              children: [8],
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
                packageName: "typescript",
                packagePath: "lib/lib.es5.d.ts",
                qualifiedName: "Error",
              },
              name: "Error",
              package: "typescript",
            },
          ],
          extendedBy: [
            {
              type: "reference",
              target: 24,
              name: "UffgabeWechFaehler",
            },
          ],
        },
        {
          id: 24,
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
              id: 35,
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
                  id: 36,
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
                      id: 37,
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
                    target: 24,
                    name: "UffgabeWechFaehler",
                    package: "mcp-typescribe",
                  },
                  overwrites: {
                    type: "reference",
                    target: 19,
                    name: "UffgabeFaehler.constructor",
                  },
                },
              ],
              overwrites: {
                type: "reference",
                target: 18,
                name: "UffgabeFaehler.constructor",
              },
            },
            {
              id: 40,
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
                target: 22,
                name: "UffgabeFaehler.message",
              },
            },
            {
              id: 39,
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
                target: 21,
                name: "UffgabeFaehler.name",
              },
            },
            {
              id: 41,
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
                target: 23,
                name: "UffgabeFaehler.stack",
              },
            },
            {
              id: 38,
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
              id: 29,
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
                  id: 30,
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
                      id: 31,
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
                          id: 32,
                          name: "err",
                          variant: "param",
                          kind: 32768,
                          flags: {
                            isExternal: true,
                          },
                          type: {
                            type: "reference",
                            target: {
                              packageName: "typescript",
                              packagePath: "lib/lib.es5.d.ts",
                              qualifiedName: "Error",
                            },
                            name: "Error",
                            package: "typescript",
                          },
                        },
                        {
                          id: 33,
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
                                packageName: "@types/node",
                                packagePath: "globals.d.ts",
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
                target: 12,
                name: "UffgabeFaehler.prepareStackTrace",
              },
            },
            {
              id: 34,
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
                target: 17,
                name: "UffgabeFaehler.stackTraceLimit",
              },
            },
            {
              id: 25,
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
                  id: 26,
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
                      id: 27,
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
                      id: 28,
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
                          packageName: "typescript",
                          packagePath: "lib/lib.es5.d.ts",
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
                    target: 9,
                    name: "UffgabeFaehler.captureStackTrace",
                  },
                },
              ],
              inheritedFrom: {
                type: "reference",
                target: 8,
                name: "UffgabeFaehler.captureStackTrace",
              },
            },
          ],
          groups: [
            {
              title: "Constructors",
              children: [35],
            },
            {
              title: "Properties",
              children: [40, 39, 41, 38, 29, 34],
            },
            {
              title: "Methods",
              children: [25],
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
              target: 7,
              name: "UffgabeFaehler",
              package: "mcp-typescribe",
            },
          ],
        },
      ],
      groups: [
        {
          title: "Classes",
          children: [42, 79, 7, 24],
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
      id: 106,
      name: "types",
      variant: "declaration",
      kind: 2,
      flags: {},
      children: [
        {
          id: 130,
          name: "Kerle",
          variant: "declaration",
          kind: 4,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Namespace Kerle provides functionalities to create  ",
              },
              {
                kind: "inline-tag",
                tag: "@link",
                text: "Kerle",
                target: 125,
              },
              {
                kind: "text",
                text: " objects.",
              },
            ],
          },
          children: [
            {
              id: 135,
              name: "create",
              variant: "declaration",
              kind: 64,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 136,
                  character: 18,
                },
              ],
              signatures: [
                {
                  id: 136,
                  name: "create",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Creates a new instance.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@example",
                        content: [
                          {
                            kind: "code",
                            text: "```\nKerle.create('123', 'John Doe', 'john@example.com', 'developer');\n```",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/types.ts",
                      line: 136,
                      character: 18,
                    },
                  ],
                  parameters: [
                    {
                      id: 137,
                      name: "id",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                    {
                      id: 138,
                      name: "name",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                    {
                      id: 139,
                      name: "email",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                    {
                      id: 140,
                      name: "role",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      type: {
                        type: "intrinsic",
                        name: "string",
                      },
                    },
                  ],
                  type: {
                    type: "reference",
                    target: 125,
                    name: "Kerle",
                    package: "mcp-typescribe",
                  },
                },
              ],
            },
          ],
          documents: [
            {
              id: 131,
              name: "External Markdown",
              variant: "document",
              kind: 8388608,
              flags: {},
              content: [
                {
                  kind: "text",
                  text: "# Welcome to Our Project\n\n## Introduction\n\nThis is a sample introduction text created for testing purposes. This document provides an overview of our project, its features, and how to get started.\n\nHere are some [links](",
                },
                {
                  kind: "relative-link",
                  text: "./links.md",
                  target: 3,
                },
                {
                  kind: "text",
                  text: ")\n\nCheck out ",
                },
                {
                  kind: "inline-tag",
                  tag: "@link",
                  text: " Kerle",
                  target: 130,
                },
                {
                  kind: "text",
                  text: "\n\n### About the Project\n\nOur project aims to simplify complex workflows and improve productivity through intuitive interfaces and powerful automation tools.\n\n## Key Features\n\n- **Easy to Use**: Simple and intuitive interface\n- **Customizable**: Adapt to your specific needs\n- **Scalable**: Grows with your requirements\n- **Well Documented**: Comprehensive guides and tutorials\n\n## Getting Started\n\nTo get started with our project, please refer to the [installation guide](",
                },
                {
                  kind: "relative-link",
                  text: "./installation.md",
                  target: 4,
                },
                {
                  kind: "text",
                  text: ") and [documentation](",
                },
                {
                  kind: "relative-link",
                  text: "./documentation.md",
                  target: 5,
                },
                {
                  kind: "text",
                  text: ").\n\nThank you for your interest in our project!\n\n---\n\n*This is a testing document. The content is for demonstration purposes only.*",
                },
              ],
              frontmatter: {
                group: "Documents",
                category: "Guides",
              },
              children: [
                {
                  id: 132,
                  name: "Installation",
                  variant: "document",
                  kind: 8388608,
                  flags: {},
                  content: [
                    {
                      kind: "text",
                      text: "# Installation Guide\n\n## Welcome to the EXTREME Installation Experience™ (v2.2.7)\n\nThank you for choosing our software! This guide will walk you through the **intensely straightforward** process of installing our application. Put on your configuration helmet and prepare for an XML adventure like it's 2002!\n\n## System Requirements\n\n- A computer (preferably one that turns on)\n- At least 256MB RAM (yes, MEGA bytes!)\n- 50MB of free hard disk space (we know, it's massive)\n- Internet Explorer 6.0 or Netscape Navigator 4.7\n- Windows 98SE, ME, or the ultra-modern XP\n- A CD-ROM drive for our exciting 3-disk installation set!\n\n## Installation Steps\n\n1. Insert Disk 1 into your CD-ROM drive\n2. Wait for the autorun dialog (this could take up to 4 minutes)\n3. Click \"INSTALL NOW!!!\" in the flashy animated GIF button\n4. When prompted, create your ",
                    },
                    {
                      kind: "code",
                      text: "`config.xml`",
                    },
                    {
                      kind: "text",
                      text: " file as follows:\n\n",
                    },
                    {
                      kind: "code",
                      text: '```xml\n<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<!DOCTYPE configuration SYSTEM "http://www.ourproduct.com/dtd/config-2002.dtd">\n<CONFIGURATION>\n  <APP_SETTINGS>\n    <SERVER host="localhost" port="8080" timeout="30000" />\n    <LOGGING level="ERROR" path="C:\\Program Files\\OurApp\\Logs\\" />\n    <UI theme="BlueWave" showSplash="true" animationSpeed="slow" />\n  </APP_SETTINGS>\n  <USER_PREFERENCES>\n    <OPTION name="AutoSave" value="true" />\n    <OPTION name="CheckForUpdates" value="daily" />\n    <OPTION name="PlayStartupSound" value="true" />\n  </USER_PREFERENCES>\n  <ADVANCED>\n    <MEMORY initialHeapSize="64m" maxHeapSize="128m" />\n    <PLUGINS enabled="true" scanOnStartup="true" />\n  </ADVANCED>\n</CONFIGURATION>\n```',
                    },
                    {
                      kind: "text",
                      text: '\n\n5. Insert Disk 2 when prompted\n6. Configure your database settings and wait for the progress bar to complete (approximately 17 minutes)\n7. When the "DLL Registration Success!" message appears, insert Disk 3\n8. Print out your 16-digit registration code and keep it in a safe place!\n\n## Troubleshooting\n\nIf you see the error message ',
                    },
                    {
                      kind: "code",
                      text: "`ERROR: INSUFFICIENT SYSTEM RESOURCES`",
                    },
                    {
                      kind: "text",
                      text: ", try closing your other application.\n\nIf installation fails with ",
                    },
                    {
                      kind: "code",
                      text: "`XML PARSING ERROR 0x8700542`",
                    },
                    {
                      kind: "text",
                      text: ", ensure you have copied EXACTLY 3 spaces (not tabs) before each XML element.\n\n## Support\n\nNeed help? Contact our support team via:\n- Email: help@ourcompany.com\n- Fax: 555-XML-HELP\n- BBS: dial-in available between 11pm-6am EST\n\nThank you for embarking on this installation journey! Remember to register your product within 30 days or face persistent popup reminders every 45 minutes!",
                    },
                  ],
                  frontmatter: {
                    group: "Documents",
                    category: "Guides",
                  },
                },
                {
                  id: 133,
                  name: "Helpful Docs",
                  variant: "document",
                  kind: 8388608,
                  flags: {},
                  content: [
                    {
                      kind: "text",
                      text: "# Official Documentation\n\n## Version 1.0.3.7.2.9-alpha-preview-SNAPSHOT\n\nWelcome to the *comprehensive* documentation for our product.\n\n## Getting Started\n\nTo get started, simply... um... start?\n\n## Features\n\nOur product has several amazing features:\n- It exists\n- It does things (sometimes)\n- It rarely crashes more than twice per hour\n- Compatible with most computers that have electricity\n\n## Troubleshooting\n\nHaving problems? Here's our complete troubleshooting guide:\n\n1. Try turning it off and on again\n2. ¯\\\\\\_(ツ)_/¯\n\n## FAQ\n\n**Q: How do I use this product?**  \nA: Very carefully.\n\n**Q: Is there a tutorial?**  \nA: We believe in learning through exploration and random clicking.\n\n**Q: Where can I find more detailed documentation?**  \nA: This is it. This is all of it. We spent upwards of 14 minutes creating this document.\n\n**Q: What does error code 0x7B3912FF mean?**  \nA: It means you've discovered a feature we didn't know existed. Congratulations!\n\n## Advanced Configuration\n\n\nGo [back](",
                    },
                    {
                      kind: "relative-link",
                      text: "intro.md",
                      target: 1,
                    },
                    {
                      kind: "text",
                      text: ")",
                    },
                  ],
                  frontmatter: {
                    group: "Documents",
                    category: "Guides",
                  },
                },
                {
                  id: 134,
                  name: "Testing Links",
                  variant: "document",
                  kind: 8388608,
                  flags: {},
                  content: [
                    {
                      kind: "text",
                      text: "Here is some text to link to ",
                    },
                    {
                      kind: "inline-tag",
                      tag: "@link",
                      text: "the user",
                      target: 130,
                    },
                    {
                      kind: "text",
                      text: "!",
                    },
                  ],
                  frontmatter: {
                    group: "Documents",
                    category: "Guides",
                  },
                },
              ],
            },
          ],
          childrenIncludingDocuments: [131, 135],
          groups: [
            {
              title: "Documents",
              children: [131],
            },
            {
              title: "Functions",
              children: [135],
            },
          ],
          categories: [
            {
              title: "Guides",
              children: [131],
            },
            {
              title: "Other",
              children: [135],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 111,
              character: 17,
            },
            {
              fileName: "src/sample-api/types.ts",
              line: 128,
              character: 17,
            },
          ],
        },
        {
          id: 121,
          name: "Priority",
          variant: "declaration",
          kind: 4,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Contains helper functions for ",
              },
              {
                kind: "inline-tag",
                tag: "@link",
                text: "Priority",
                target: 116,
              },
            ],
          },
          children: [
            {
              id: 122,
              name: "prettyPrintPriority",
              variant: "declaration",
              kind: 64,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 80,
                  character: 18,
                },
              ],
              signatures: [
                {
                  id: 123,
                  name: "prettyPrintPriority",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Converts a ",
                      },
                      {
                        kind: "inline-tag",
                        tag: "@link",
                        text: "Priority",
                        target: 116,
                      },
                      {
                        kind: "text",
                        text: " value to a human-readable string with docs.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "A string describing the purpose and value of the enum.",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/types.ts",
                      line: 80,
                      character: 18,
                    },
                  ],
                  parameters: [
                    {
                      id: 124,
                      name: "priority",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "The ",
                          },
                          {
                            kind: "inline-tag",
                            tag: "@link",
                            text: "Priority",
                            target: 116,
                          },
                          {
                            kind: "text",
                            text: " to pretty-print.",
                          },
                        ],
                      },
                      type: {
                        type: "reference",
                        target: 116,
                        name: "Priority",
                        package: "mcp-typescribe",
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
          ],
          groups: [
            {
              title: "Functions",
              children: [122],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 24,
              character: 12,
            },
            {
              fileName: "src/sample-api/types.ts",
              line: 73,
              character: 17,
            },
          ],
        },
        {
          id: 112,
          name: "TaskStatus",
          variant: "declaration",
          kind: 4,
          flags: {},
          children: [
            {
              id: 113,
              name: "prettyPrintTaskStatus",
              variant: "declaration",
              kind: 64,
              flags: {},
              sources: [
                {
                  fileName: "src/sample-api/types.ts",
                  line: 51,
                  character: 18,
                },
              ],
              signatures: [
                {
                  id: 114,
                  name: "prettyPrintTaskStatus",
                  variant: "signature",
                  kind: 4096,
                  flags: {},
                  comment: {
                    summary: [
                      {
                        kind: "text",
                        text: "Converts a ",
                      },
                      {
                        kind: "inline-tag",
                        tag: "@link",
                        text: "TaskStatus",
                        target: 107,
                      },
                      {
                        kind: "text",
                        text: " value to a human-readable string with docs.",
                      },
                    ],
                    blockTags: [
                      {
                        tag: "@returns",
                        content: [
                          {
                            kind: "text",
                            text: "A string describing the purpose and value of the enum.",
                          },
                        ],
                      },
                    ],
                  },
                  sources: [
                    {
                      fileName: "src/sample-api/types.ts",
                      line: 51,
                      character: 18,
                    },
                  ],
                  parameters: [
                    {
                      id: 115,
                      name: "status",
                      variant: "param",
                      kind: 32768,
                      flags: {},
                      comment: {
                        summary: [
                          {
                            kind: "text",
                            text: "The ",
                          },
                          {
                            kind: "inline-tag",
                            tag: "@link",
                            text: "TaskStatus",
                            target: 107,
                          },
                          {
                            kind: "text",
                            text: " to pretty-print.",
                          },
                        ],
                      },
                      type: {
                        type: "reference",
                        target: 107,
                        name: "TaskStatus",
                        package: "mcp-typescribe",
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
          ],
          groups: [
            {
              title: "Functions",
              children: [113],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 7,
              character: 12,
            },
            {
              fileName: "src/sample-api/types.ts",
              line: 44,
              character: 17,
            },
          ],
        },
        {
          id: 116,
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
                target: 141,
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
              id: 118,
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
              id: 119,
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
              id: 120,
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
              id: 117,
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
              children: [118, 119, 120, 117],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 24,
              character: 12,
            },
            {
              fileName: "src/sample-api/types.ts",
              line: 73,
              character: 17,
            },
          ],
        },
        {
          id: 107,
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
                target: 141,
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
                    target: 141,
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
              id: 110,
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
              id: 109,
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
              id: 111,
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
              id: 108,
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
              children: [110, 109, 111, 108],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 7,
              character: 12,
            },
            {
              fileName: "src/sample-api/types.ts",
              line: 44,
              character: 17,
            },
          ],
        },
        {
          id: 125,
          name: "Kerle",
          variant: "declaration",
          kind: 256,
          flags: {},
          comment: {
            summary: [
              {
                kind: "text",
                text: "Represents a user in the system.\n\nTo find out more about the API, please see [The getting started guide](",
              },
              {
                kind: "relative-link",
                text: "./docs/intro.md#getting-started",
                target: 1,
                targetAnchor: "getting-started",
              },
              {
                kind: "text",
                text: ").",
              },
            ],
            blockTags: [
              {
                tag: "@example",
                content: [
                  {
                    kind: "code",
                    text: "```typescript\nconst user: Kerle = {\n  id: '123',\n  soi_name: 'John Doe',\n  internet_brief: 'john@example.com',\n  role: 'developer'\n};\n```",
                  },
                ],
              },
            ],
          },
          children: [
            {
              id: 126,
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
                  line: 113,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 128,
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
                  line: 117,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 129,
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
                  line: 119,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 127,
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
                  line: 115,
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
              children: [126, 128, 129, 127],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 111,
              character: 17,
            },
            {
              fileName: "src/sample-api/types.ts",
              line: 128,
              character: 17,
            },
          ],
        },
        {
          id: 141,
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
                target: 125,
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
              id: 147,
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
                  line: 168,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 125,
                name: "Kerle",
                package: "mcp-typescribe",
              },
            },
            {
              id: 149,
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
                  line: 172,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 150,
                name: "T",
                package: "mcp-typescribe",
                qualifiedName: "Uffgabe.T",
                refersToTypeParameter: true,
              },
            },
            {
              id: 143,
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
                  line: 160,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 148,
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
                  line: 170,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: {
                  packageName: "typescript",
                  packagePath: "lib/lib.es5.d.ts",
                  qualifiedName: "Date",
                },
                name: "Date",
                package: "typescript",
              },
            },
            {
              id: 142,
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
                  line: 158,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "string",
              },
            },
            {
              id: 146,
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
                  line: 166,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 116,
                name: "Priority",
                package: "mcp-typescribe",
              },
            },
            {
              id: 145,
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
                  line: 164,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 107,
                name: "TaskStatus",
                package: "mcp-typescribe",
              },
            },
            {
              id: 144,
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
                  line: 162,
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
              children: [147, 149, 143, 148, 142, 146, 145, 144],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 156,
              character: 17,
            },
          ],
          typeParameters: [
            {
              id: 150,
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
                name: "unknown",
              },
            },
          ],
          implementedBy: [
            {
              type: "reference",
              target: 42,
              name: "TaschgInEcht",
            },
          ],
        },
        {
          id: 151,
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
          children: [
            {
              id: 153,
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
                  line: 180,
                  character: 2,
                },
              ],
              type: {
                type: "intrinsic",
                name: "boolean",
              },
            },
            {
              id: 154,
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
                  line: 182,
                  character: 2,
                },
              ],
              type: {
                type: "reference",
                target: 116,
                name: "Priority",
                package: "mcp-typescribe",
              },
            },
            {
              id: 155,
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
                  line: 184,
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
              children: [153, 154, 155],
            },
          ],
          sources: [
            {
              fileName: "src/sample-api/types.ts",
              line: 178,
              character: 12,
            },
          ],
        },
      ],
      groups: [
        {
          title: "Namespaces",
          children: [130, 121, 112],
        },
        {
          title: "Enumerations",
          children: [116, 107],
        },
        {
          title: "Interfaces",
          children: [125, 141],
        },
        {
          title: "Type Aliases",
          children: [151],
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
      id: 156,
      name: "utils",
      variant: "declaration",
      kind: 2,
      flags: {},
      children: [
        {
          id: 202,
          name: "calculateEstimatedCompletion",
          variant: "declaration",
          kind: 64,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 196,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 203,
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
                  line: 196,
                  character: 16,
                },
              ],
              parameters: [
                {
                  id: 204,
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
                    target: 141,
                    name: "Uffgabe",
                    package: "mcp-typescribe",
                  },
                },
                {
                  id: 205,
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
                      packageName: "typescript",
                      packagePath: "lib/lib.es2015.collection.d.ts",
                      qualifiedName: "Map",
                    },
                    typeArguments: [
                      {
                        type: "reference",
                        target: 116,
                        name: "Priority",
                        package: "mcp-typescribe",
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
                      packageName: "typescript",
                      packagePath: "lib/lib.es5.d.ts",
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
          id: 165,
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
              id: 166,
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
                  id: 167,
                  name: "T",
                  variant: "typeParam",
                  kind: 131072,
                  flags: {},
                  type: {
                    type: "reference",
                    target: 141,
                    typeArguments: [
                      {
                        type: "intrinsic",
                        name: "unknown",
                      },
                    ],
                    name: "Uffgabe",
                    package: "mcp-typescribe",
                  },
                },
              ],
              parameters: [
                {
                  id: 168,
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
                      target: 167,
                      name: "T",
                      package: "mcp-typescribe",
                      refersToTypeParameter: true,
                    },
                  },
                },
                {
                  id: 169,
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
                      id: 170,
                      name: "__type",
                      variant: "declaration",
                      kind: 65536,
                      flags: {},
                      children: [
                        {
                          id: 173,
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
                          id: 175,
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
                              packageName: "typescript",
                              packagePath: "lib/lib.es5.d.ts",
                              qualifiedName: "Date",
                            },
                            name: "Date",
                            package: "typescript",
                          },
                        },
                        {
                          id: 174,
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
                              packageName: "typescript",
                              packagePath: "lib/lib.es5.d.ts",
                              qualifiedName: "Date",
                            },
                            name: "Date",
                            package: "typescript",
                          },
                        },
                        {
                          id: 172,
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
                            target: 116,
                            name: "Priority",
                            package: "mcp-typescribe",
                          },
                        },
                        {
                          id: 171,
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
                            target: 107,
                            name: "TaskStatus",
                            package: "mcp-typescribe",
                          },
                        },
                      ],
                      groups: [
                        {
                          title: "Properties",
                          children: [173, 175, 174, 172, 171],
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
                  target: 167,
                  name: "T",
                  package: "mcp-typescribe",
                  refersToTypeParameter: true,
                },
              },
            },
          ],
        },
        {
          id: 184,
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
              line: 132,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 143,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 154,
              character: 16,
            },
            {
              fileName: "src/sample-api/utils.ts",
              line: 164,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 185,
              name: "formatTask",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Function overload for creating a formatted task string.\nReturns a simple string with just the title for PENDING tasks.",
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
                  line: 132,
                  character: 16,
                },
              ],
              parameters: [
                {
                  id: 186,
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
                        target: 141,
                        typeArguments: [
                          {
                            type: "intrinsic",
                            name: "unknown",
                          },
                        ],
                        name: "Uffgabe",
                        package: "mcp-typescribe",
                      },
                      {
                        type: "reflection",
                        declaration: {
                          id: 187,
                          name: "__type",
                          variant: "declaration",
                          kind: 65536,
                          flags: {},
                          children: [
                            {
                              id: 188,
                              name: "status",
                              variant: "declaration",
                              kind: 1024,
                              flags: {},
                              sources: [
                                {
                                  fileName: "src/sample-api/utils.ts",
                                  line: 133,
                                  character: 20,
                                },
                              ],
                              type: {
                                type: "reference",
                                target: 108,
                                name: "PENDING",
                                package: "mcp-typescribe",
                                qualifiedName: "TaskStatus.PENDING",
                              },
                            },
                          ],
                          groups: [
                            {
                              title: "Properties",
                              children: [188],
                            },
                          ],
                          sources: [
                            {
                              fileName: "src/sample-api/utils.ts",
                              line: 133,
                              character: 18,
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
              id: 189,
              name: "formatTask",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Function overload for creating a formatted task string.\nReturns a string with title and assignee for IN_PROGRESS tasks.",
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
                  line: 143,
                  character: 16,
                },
              ],
              parameters: [
                {
                  id: 190,
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
                        target: 141,
                        typeArguments: [
                          {
                            type: "intrinsic",
                            name: "unknown",
                          },
                        ],
                        name: "Uffgabe",
                        package: "mcp-typescribe",
                      },
                      {
                        type: "reflection",
                        declaration: {
                          id: 191,
                          name: "__type",
                          variant: "declaration",
                          kind: 65536,
                          flags: {},
                          children: [
                            {
                              id: 192,
                              name: "status",
                              variant: "declaration",
                              kind: 1024,
                              flags: {},
                              sources: [
                                {
                                  fileName: "src/sample-api/utils.ts",
                                  line: 144,
                                  character: 20,
                                },
                              ],
                              type: {
                                type: "reference",
                                target: 109,
                                name: "LAEUFT",
                                package: "mcp-typescribe",
                                qualifiedName: "TaskStatus.LAEUFT",
                              },
                            },
                          ],
                          groups: [
                            {
                              title: "Properties",
                              children: [192],
                            },
                          ],
                          sources: [
                            {
                              fileName: "src/sample-api/utils.ts",
                              line: 144,
                              character: 18,
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
              id: 193,
              name: "formatTask",
              variant: "signature",
              kind: 4096,
              flags: {},
              comment: {
                summary: [
                  {
                    kind: "text",
                    text: "Function overload for creating a formatted task string.\nReturns a detailed string for COMPLETED or FAILED tasks.",
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
                  line: 154,
                  character: 16,
                },
              ],
              parameters: [
                {
                  id: 194,
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
                        target: 141,
                        typeArguments: [
                          {
                            type: "intrinsic",
                            name: "unknown",
                          },
                        ],
                        name: "Uffgabe",
                        package: "mcp-typescribe",
                      },
                      {
                        type: "reflection",
                        declaration: {
                          id: 195,
                          name: "__type",
                          variant: "declaration",
                          kind: 65536,
                          flags: {},
                          children: [
                            {
                              id: 196,
                              name: "status",
                              variant: "declaration",
                              kind: 1024,
                              flags: {},
                              sources: [
                                {
                                  fileName: "src/sample-api/utils.ts",
                                  line: 155,
                                  character: 20,
                                },
                              ],
                              type: {
                                type: "union",
                                types: [
                                  {
                                    type: "reference",
                                    target: 110,
                                    name: "FERTIG",
                                    package: "mcp-typescribe",
                                    qualifiedName: "TaskStatus.FERTIG",
                                  },
                                  {
                                    type: "reference",
                                    target: 111,
                                    name: "MIST",
                                    package: "mcp-typescribe",
                                    qualifiedName: "TaskStatus.MIST",
                                  },
                                ],
                              },
                            },
                          ],
                          groups: [
                            {
                              title: "Properties",
                              children: [196],
                            },
                          ],
                          sources: [
                            {
                              fileName: "src/sample-api/utils.ts",
                              line: 155,
                              character: 18,
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
          id: 197,
          name: "isAdmin",
          variant: "declaration",
          kind: 64,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 185,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 198,
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
                  line: 185,
                  character: 16,
                },
              ],
              parameters: [
                {
                  id: 199,
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
                    target: 125,
                    name: "Kerle",
                    package: "mcp-typescribe",
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
                      target: 125,
                      name: "Kerle",
                      package: "mcp-typescribe",
                    },
                    {
                      type: "reflection",
                      declaration: {
                        id: 200,
                        name: "__type",
                        variant: "declaration",
                        kind: 65536,
                        flags: {},
                        children: [
                          {
                            id: 201,
                            name: "role",
                            variant: "declaration",
                            kind: 1024,
                            flags: {},
                            sources: [
                              {
                                fileName: "src/sample-api/utils.ts",
                                line: 185,
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
                            children: [201],
                          },
                        ],
                        sources: [
                          {
                            fileName: "src/sample-api/utils.ts",
                            line: 185,
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
          id: 180,
          name: "kopiera",
          variant: "declaration",
          kind: 64,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 112,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 181,
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
                    target: 141,
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
                  line: 112,
                  character: 16,
                },
              ],
              typeParameters: [
                {
                  id: 182,
                  name: "T",
                  variant: "typeParam",
                  kind: 131072,
                  flags: {},
                },
              ],
              parameters: [
                {
                  id: 183,
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
                        target: 141,
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
                    target: 141,
                    typeArguments: [
                      {
                        type: "reference",
                        target: 182,
                        name: "T",
                        package: "mcp-typescribe",
                        refersToTypeParameter: true,
                      },
                    ],
                    name: "Uffgabe",
                    package: "mcp-typescribe",
                  },
                },
              ],
              type: {
                type: "reference",
                target: 42,
                typeArguments: [
                  {
                    type: "reference",
                    target: 182,
                    name: "T",
                    package: "mcp-typescribe",
                    refersToTypeParameter: true,
                  },
                ],
                name: "TaschgInEcht",
                package: "mcp-typescribe",
              },
            },
          ],
        },
        {
          id: 161,
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
              id: 162,
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
                  id: 163,
                  name: "T",
                  variant: "typeParam",
                  kind: 131072,
                  flags: {},
                  type: {
                    type: "reference",
                    target: 141,
                    typeArguments: [
                      {
                        type: "intrinsic",
                        name: "unknown",
                      },
                    ],
                    name: "Uffgabe",
                    package: "mcp-typescribe",
                  },
                },
              ],
              parameters: [
                {
                  id: 164,
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
                      target: 163,
                      name: "T",
                      package: "mcp-typescribe",
                      refersToTypeParameter: true,
                    },
                  },
                },
              ],
              type: {
                type: "array",
                elementType: {
                  type: "reference",
                  target: 163,
                  name: "T",
                  package: "mcp-typescribe",
                  refersToTypeParameter: true,
                },
              },
            },
          ],
        },
        {
          id: 157,
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
              id: 158,
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
                    target: 141,
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
                  id: 159,
                  name: "T",
                  variant: "typeParam",
                  kind: 131072,
                  flags: {},
                  type: {
                    type: "reference",
                    target: 141,
                    typeArguments: [
                      {
                        type: "intrinsic",
                        name: "unknown",
                      },
                    ],
                    name: "Uffgabe",
                    package: "mcp-typescribe",
                  },
                },
              ],
              parameters: [
                {
                  id: 160,
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
                      target: 159,
                      name: "T",
                      package: "mcp-typescribe",
                      refersToTypeParameter: true,
                    },
                  },
                },
              ],
              type: {
                type: "array",
                elementType: {
                  type: "reference",
                  target: 159,
                  name: "T",
                  package: "mcp-typescribe",
                  refersToTypeParameter: true,
                },
              },
            },
          ],
        },
        {
          id: 176,
          name: "summarizeTasksByStatus",
          variant: "declaration",
          kind: 64,
          flags: {},
          sources: [
            {
              fileName: "src/sample-api/utils.ts",
              line: 89,
              character: 16,
            },
          ],
          signatures: [
            {
              id: 177,
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
                  line: 89,
                  character: 16,
                },
              ],
              typeParameters: [
                {
                  id: 178,
                  name: "T",
                  variant: "typeParam",
                  kind: 131072,
                  flags: {},
                  type: {
                    type: "reference",
                    target: 141,
                    typeArguments: [
                      {
                        type: "intrinsic",
                        name: "unknown",
                      },
                    ],
                    name: "Uffgabe",
                    package: "mcp-typescribe",
                  },
                },
              ],
              parameters: [
                {
                  id: 179,
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
                      target: 178,
                      name: "T",
                      package: "mcp-typescribe",
                      refersToTypeParameter: true,
                    },
                  },
                },
              ],
              type: {
                type: "reference",
                target: {
                  packageName: "typescript",
                  packagePath: "lib/lib.es5.d.ts",
                  qualifiedName: "Record",
                },
                typeArguments: [
                  {
                    type: "reference",
                    target: 107,
                    name: "TaskStatus",
                    package: "mcp-typescribe",
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
          children: [202, 165, 184, 197, 180, 161, 157, 176],
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
      children: [1, 6, 106, 156],
    },
  ],
  packageName: "mcp-typescribe",
  readme: [
    {
      kind: "text",
      text: "[![npm version](https://img.shields.io/npm/v/mcp-typescribe.svg)](https://www.npmjs.com/package/your-package-name)\n\n# MCP-Typescribe - an MCP Server providing LLMs API information\n\n## The Problem\n\nLarge Language Models (LLMs) have made incredible strides in code generation and developer productivity. However, they face a key limitation: they can only reliably use APIs and libraries they’ve seen during training. This creates a bottleneck for adopting new tools, SDKs, or internal APIs — LLMs simply don’t know how to use them effectively.\n\nWhile tools can be given source code access (when interacting with APIs for which the sources are available) or access to documentation files (e.g. typescript type definition files), this doesn't scale well for large APIs. LLMs need a more efficient way to learn more about an API. Putting all the documentation into context for every request is inefficient, unfeasible, and leads to poor results.\n\n## As a result:\n\nLarger new or internal APIs remain \"invisible\" to LLMs.\n\nDevelopers must manually guide LLMs or provide example usage.\n\nInnovation is slowed by the lag between an API’s release and its widespread understanding by AI tools.\n\n## The Idea\n\nThis project is an open-source implementation of the Model Context Protocol (MCP)—a protocol designed to provide LLMs with contextual, real-time access to information. In this case it's the API documentation, and particularly for now in this project TypeScript definitions.\n\n## Our goal is to:\n\nParse TypeScript (and other) definitions into a machine-readable format.\n\nServe this context dynamically to LLMs through tools like Claude, Cline, Cursor, or Windsurf and other custom interfaces.\n\nEnable agentic behavior by letting LLMs query, plan, and adapt to unfamiliar APIs without retraining.\n\n## What This Enables\n\nPlug-and-play API support for LLM-based coding assistants.\n\nFaster onboarding for new or proprietary SDKs.\n\nA step toward more autonomous, context-aware coding agents.\n\n## Project Overview\n\n![Image](",
    },
    {
      kind: "relative-link",
      text: "docs/screenshot.png",
      target: 9,
    },
    {
      kind: "text",
      text: ")\n\nThis project provides a way for AI agents to efficiently explore and understand unknown TypeScript APIs. It loads TypeDoc-generated JSON documentation and exposes it through a set of query endpoints that allow agents to search for symbols, get detailed information about specific parts of the API, and understand relationships between different components.\n\n## Current Features\n\n- **TypeDoc Integration**: Loads and indexes TypeDoc JSON documentation for efficient querying\n- **Comprehensive Query Capabilities**: Provides a wide range of tools for exploring TypeScript APIs\n- **MCP Protocol**: Follows the Model Context Protocol for seamless integration with AI agents\n\n## Query Capabilities\n\nThe server provides the following tools for querying the API:\n\n- ",
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
      text: ": Find where a type/function is used\n\n## Getting Started\n\n### Prerequisites\n\n- Node.js\n- npm\n\n### Installation\n\n1. Clone the repository\n2. Install dependencies:\n   ",
    },
    {
      kind: "code",
      text: "```bash\n   npm install\n   ```",
    },
    {
      kind: "text",
      text: "\n\n### Usage\n\n1. Generate TypeDoc JSON for your TypeScript API:\n\n   ",
    },
    {
      kind: "code",
      text: "```bash\n   npx typedoc --json docs/api.json --entryPointStrategy expand path/to/your/typescript/files\n   ```",
    },
    {
      kind: "text",
      text: "\n\n   If you (only) have an existing",
    },
    {
      kind: "code",
      text: "`.d.ts`",
    },
    {
      kind: "text",
      text: " file, you can create an api json file like so:\n\n   Create a separate ",
    },
    {
      kind: "code",
      text: "`tsconfig.docs.json`",
    },
    {
      kind: "text",
      text: ":\n\n   ",
    },
    {
      kind: "code",
      text: '```json\n   {\n     "extends": "./tsconfig.json",\n     "files": ["existing.d.ts"],\n     "typedocOptions": {\n       "entryPoints": ["existing.d.ts"],\n       "json": "docs/api.json",\n       "pretty": false\n     }\n   }\n   ```',
    },
    {
      kind: "text",
      text: "\n\n   Then do\n\n   ",
    },
    {
      kind: "code",
      text: "```bash\n   npx typedoc --tsconfig tsconfig.docs.json\n   ```",
    },
    {
      kind: "text",
      text: "\n\n2. Build the project:\n\n   ",
    },
    {
      kind: "code",
      text: "```bash\n   npm run build\n   ```",
    },
    {
      kind: "text",
      text: "\n\n3. Explore the MCP server:\n\n   ",
    },
    {
      kind: "code",
      text: "```bash\n   npx @modelcontextprotocol/inspector node ./dist/mcp-server/index.js run-server docs/api.json\n   ```",
    },
    {
      kind: "text",
      text: "\n\n4. Connect an AI agent to the server to query the API\n\n   E.g. with cline in VSCode, specify the following MCP server in ",
    },
    {
      kind: "code",
      text: "`cline_mcp_settings.json`",
    },
    {
      kind: "text",
      text: ":\n\n   ",
    },
    {
      kind: "code",
      text: '```json\n   {\n     "mcpServers": {\n       "typescribe": {\n         "command": "npx",\n         "args": [\n           "-y",\n           "mcp-typescribe@latest",\n           "run-server",\n           "<PATH_TO_API_DOT_JSON>"\n         ],\n         "env": {}\n       }\n     }\n   }\n   ```',
    },
    {
      kind: "text",
      text: '\n\n5. Enable the server and likely auto-approve the various tools. Tell the agent to use the "typescribe" tool to learn about your API.\n\n## Project Structure\n\n- ',
    },
    {
      kind: "code",
      text: "`src/sample-api/`",
    },
    {
      kind: "text",
      text: ": A sample TypeScript API for testing - it uses a weird German-like dialect for the API names to test that the LLM does not hallucinate the API\n- ",
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
      text: "`utils/`",
    },
    {
      kind: "text",
      text: ": Utility functions\n  - ",
    },
    {
      kind: "code",
      text: "`schemas/`",
    },
    {
      kind: "text",
      text: ": JSON schemas for the MCP tools\n  - ",
    },
    {
      kind: "code",
      text: "`core/`",
    },
    {
      kind: "text",
      text: ": Core functionality\n  - ",
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
      text: ": Tests for the API functionality\n\n## Development\n\n### Running Tests\n\n",
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
      text: "\n\n## License\n\nMIT\n\nCopyright 2025 yWorks GmbH - https://www.yworks.com",
    },
  ],
  symbolIdMap: {
    "1": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/index.ts",
      qualifiedName: "",
    },
    "6": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "",
    },
    "7": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "UffgabeFaehler",
    },
    "8": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__global.ErrorConstructor.captureStackTrace",
    },
    "9": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__global.ErrorConstructor.captureStackTrace",
    },
    "10": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "targetObject",
    },
    "11": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "constructorOpt",
    },
    "12": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__global.ErrorConstructor.prepareStackTrace",
    },
    "13": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__type",
    },
    "14": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__type",
    },
    "15": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "err",
    },
    "16": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "stackTraces",
    },
    "17": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__global.ErrorConstructor.stackTraceLimit",
    },
    "18": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "UffgabeFaehler.__constructor",
    },
    "19": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "UffgabeFaehler",
    },
    "20": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "message",
    },
    "21": {
      packageName: "typescript",
      packagePath: "lib/lib.es5.d.ts",
      qualifiedName: "Error.name",
    },
    "22": {
      packageName: "typescript",
      packagePath: "lib/lib.es5.d.ts",
      qualifiedName: "Error.message",
    },
    "23": {
      packageName: "typescript",
      packagePath: "lib/lib.es5.d.ts",
      qualifiedName: "Error.stack",
    },
    "24": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "UffgabeWechFaehler",
    },
    "25": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__global.ErrorConstructor.captureStackTrace",
    },
    "26": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__global.ErrorConstructor.captureStackTrace",
    },
    "27": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "targetObject",
    },
    "28": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "constructorOpt",
    },
    "29": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__global.ErrorConstructor.prepareStackTrace",
    },
    "30": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__type",
    },
    "31": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__type",
    },
    "32": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "err",
    },
    "33": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "stackTraces",
    },
    "34": {
      packageName: "@types/node",
      packagePath: "globals.d.ts",
      qualifiedName: "__global.ErrorConstructor.stackTraceLimit",
    },
    "35": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "UffgabeWechFaehler.__constructor",
    },
    "36": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "UffgabeWechFaehler",
    },
    "37": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "taskId",
    },
    "38": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "UffgabeWechFaehler.taskId",
    },
    "39": {
      packageName: "typescript",
      packagePath: "lib/lib.es5.d.ts",
      qualifiedName: "Error.name",
    },
    "40": {
      packageName: "typescript",
      packagePath: "lib/lib.es5.d.ts",
      qualifiedName: "Error.message",
    },
    "41": {
      packageName: "typescript",
      packagePath: "lib/lib.es5.d.ts",
      qualifiedName: "Error.stack",
    },
    "42": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht",
    },
    "43": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.__constructor",
    },
    "44": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht",
    },
    "45": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.T",
    },
    "46": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "task",
    },
    "47": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "__type",
    },
    "48": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "__type.status",
    },
    "49": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.id",
    },
    "50": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.do_Tittel",
    },
    "51": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.umWosGoots",
    },
    "52": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.status",
    },
    "53": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.priority",
    },
    "54": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.assignee",
    },
    "55": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.dueDate",
    },
    "56": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.data",
    },
    "57": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.createdAt",
    },
    "58": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.updatedAt",
    },
    "63": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.korrigiera",
    },
    "64": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.korrigiera",
    },
    "65": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "status",
    },
    "66": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.delegiera",
    },
    "67": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.delegiera",
    },
    "68": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "user",
    },
    "69": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.wasWarDavor",
    },
    "70": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.wasWarDavor",
    },
    "71": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "__type",
    },
    "72": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "__type.status",
    },
    "73": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "__type.timestamp",
    },
    "74": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.ojeZuSpaet",
    },
    "75": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.ojeZuSpaet",
    },
    "76": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.toString",
    },
    "77": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.toString",
    },
    "78": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht.T",
    },
    "79": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha",
    },
    "82": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.T",
    },
    "85": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.bauWatt",
    },
    "86": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.bauWatt",
    },
    "87": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "title",
    },
    "88": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "description",
    },
    "89": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "priority",
    },
    "90": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "options",
    },
    "91": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.suchs",
    },
    "92": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.suchs",
    },
    "93": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "id",
    },
    "94": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.iWillAelles",
    },
    "95": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.iWillAelles",
    },
    "96": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.holsMir",
    },
    "97": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.holsMir",
    },
    "98": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "status",
    },
    "99": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.holsFuerEnKerle",
    },
    "100": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.holsFuerEnKerle",
    },
    "101": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "userId",
    },
    "102": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.wechDamit",
    },
    "103": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.wechDamit",
    },
    "104": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "id",
    },
    "105": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha.T",
    },
    "106": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "",
    },
    "107": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "TaskStatus",
    },
    "108": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "TaskStatus.PENDING",
    },
    "109": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "TaskStatus.LAEUFT",
    },
    "110": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "TaskStatus.FERTIG",
    },
    "111": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "TaskStatus.MIST",
    },
    "112": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "TaskStatus",
    },
    "113": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "TaskStatus.prettyPrintTaskStatus",
    },
    "114": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "TaskStatus.prettyPrintTaskStatus",
    },
    "115": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "status",
    },
    "116": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Priority",
    },
    "117": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Priority.WENIG",
    },
    "118": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Priority.GEHT_SO",
    },
    "119": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Priority.SCHNELL",
    },
    "120": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Priority.UI_UI_UI",
    },
    "121": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Priority",
    },
    "122": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Priority.prettyPrintPriority",
    },
    "123": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Priority.prettyPrintPriority",
    },
    "124": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "priority",
    },
    "125": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Kerle",
    },
    "126": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Kerle.id",
    },
    "127": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Kerle.soi_name",
    },
    "128": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Kerle.internet_brief",
    },
    "129": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Kerle.role",
    },
    "130": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Kerle",
    },
    "135": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Kerle.create",
    },
    "136": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Kerle.create",
    },
    "137": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "id",
    },
    "138": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "name",
    },
    "139": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "email",
    },
    "140": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "role",
    },
    "141": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Uffgabe",
    },
    "142": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Uffgabe.id",
    },
    "143": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Uffgabe.do_Tittel",
    },
    "144": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Uffgabe.umWosGoots",
    },
    "145": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Uffgabe.status",
    },
    "146": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Uffgabe.priority",
    },
    "147": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Uffgabe.assignee",
    },
    "148": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Uffgabe.dueDate",
    },
    "149": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Uffgabe.data",
    },
    "150": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Uffgabe.T",
    },
    "151": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "TaskOptions",
    },
    "153": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "__type.autoAssign",
    },
    "154": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "__type.defaultPriority",
    },
    "155": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "__type.tags",
    },
    "156": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "",
    },
    "157": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "sortByPriority",
    },
    "158": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "sortByPriority",
    },
    "159": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "T",
    },
    "160": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "tasks",
    },
    "161": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "sortByDueDate",
    },
    "162": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "sortByDueDate",
    },
    "163": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "T",
    },
    "164": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "tasks",
    },
    "165": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "filterTasks",
    },
    "166": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "filterTasks",
    },
    "167": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "T",
    },
    "168": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "tasks",
    },
    "169": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "criteria",
    },
    "170": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type",
    },
    "171": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type.status",
    },
    "172": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type.priority",
    },
    "173": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type.assigneeId",
    },
    "174": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type.dueBefore",
    },
    "175": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type.dueAfter",
    },
    "176": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "summarizeTasksByStatus",
    },
    "177": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "summarizeTasksByStatus",
    },
    "178": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "T",
    },
    "179": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "tasks",
    },
    "180": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "kopiera",
    },
    "181": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "kopiera",
    },
    "182": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "T",
    },
    "183": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "task",
    },
    "184": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "formatTask",
    },
    "185": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "formatTask",
    },
    "186": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "task",
    },
    "187": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type",
    },
    "188": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type.status",
    },
    "189": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "formatTask",
    },
    "190": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "task",
    },
    "191": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type",
    },
    "192": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type.status",
    },
    "193": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "formatTask",
    },
    "194": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "task",
    },
    "195": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type",
    },
    "196": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type.status",
    },
    "197": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "isAdmin",
    },
    "198": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "isAdmin",
    },
    "199": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "user",
    },
    "200": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type",
    },
    "201": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "__type.role",
    },
    "202": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "calculateEstimatedCompletion",
    },
    "203": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "calculateEstimatedCompletion",
    },
    "204": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "task",
    },
    "205": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "estimatedHoursPerPriority",
    },
    "206": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "TaskStatus",
    },
    "207": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Priority",
    },
    "208": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Kerle",
    },
    "209": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "Uffgabe",
    },
    "210": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/types.ts",
      qualifiedName: "TaskOptions",
    },
    "211": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "UffgabeFaehler",
    },
    "212": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "UffgabeWechFaehler",
    },
    "213": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgInEcht",
    },
    "214": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/taschg-maenaedscha.ts",
      qualifiedName: "TaschgMaenaedscha",
    },
    "215": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "sortByPriority",
    },
    "216": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "sortByDueDate",
    },
    "217": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "filterTasks",
    },
    "218": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "summarizeTasksByStatus",
    },
    "219": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "kopiera",
    },
    "220": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "formatTask",
    },
    "221": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "isAdmin",
    },
    "222": {
      packageName: "mcp-typescribe",
      packagePath: "src/sample-api/utils.ts",
      qualifiedName: "calculateEstimatedCompletion",
    },
  },
  files: {
    entries: {
      "1": "src/sample-api/docs/intro.md",
      "2": "src/sample-api/index.ts",
      "3": "src/sample-api/docs/links.md",
      "4": "src/sample-api/docs/installation.md",
      "5": "src/sample-api/docs/documentation.md",
      "6": "src/sample-api/taschg-maenaedscha.ts",
      "7": "src/sample-api/types.ts",
      "8": "src/sample-api/utils.ts",
      "9": "docs/screenshot.png",
    },
    reflections: {
      "1": 131,
      "2": 1,
      "3": 134,
      "4": 132,
      "5": 133,
      "6": 6,
      "7": 106,
      "8": 156,
    },
  },
} as unknown as JSONOutput.ProjectReflection;
