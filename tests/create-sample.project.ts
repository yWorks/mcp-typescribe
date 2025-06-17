// Create a sample TypeDoc project for testing
import { JSONOutput, ReflectionKind } from "typedoc";

export function createSampleProject(): JSONOutput.ProjectReflection {
  // Create a minimal JSON structure for a TypeDoc project
  return {
    name: "TestProject",
    kind: ReflectionKind.Project,
    schemaVersion: "2.0",
    flags: {},
    variant: "project", // Add variant property
    children: [
      {
        // @ts-expect-error weird id type
        id: 1,
        name: "Class1",
        kind: ReflectionKind.Class,
        flags: {},
        variant: "declaration", // Add variant property
        sources: [{ fileName: "test.ts", line: 1, character: 0 }],
        children: [
          {
            // @ts-expect-error weird id type
            id: 2,
            name: "interfaceProperty",
            kind: ReflectionKind.Property,
            flags: {},
            variant: "declaration",
            sources: [{ fileName: "test.ts", line: 2, character: 2 }],
            type: {
              type: "reference",
              name: "Interface1",
              target: 4,
            },
          },
          {
            // @ts-expect-error weird id type
            id: 3,
            name: "typeProperty",
            kind: ReflectionKind.Property,
            flags: {},
            variant: "declaration",
            sources: [{ fileName: "test.ts", line: 3, character: 2 }],
            type: {
              type: "reference",
              name: "Type1",
              target: 6,
            },
          },
        ],
      },
      {
        // @ts-expect-error weird id type
        id: 4,
        name: "Interface1",
        kind: ReflectionKind.Interface,
        flags: {},
        variant: "declaration", // Add variant property
        sources: [{ fileName: "test.ts", line: 10, character: 0 }],
        children: [
          {
            // @ts-expect-error weird id type
            id: 5,
            name: "typeProperty",
            kind: ReflectionKind.Property,
            flags: {},
            variant: "declaration",
            sources: [{ fileName: "test.ts", line: 11, character: 2 }],
            type: {
              type: "reference",
              name: "Type1",
              target: 6,
            },
          },
        ],
      },
      {
        // @ts-expect-error weird id type
        id: 6,
        name: "Type1",
        kind: ReflectionKind.TypeAlias,
        flags: {},
        variant: "declaration", // Add variant property
        sources: [{ fileName: "test.ts", line: 20, character: 0 }],
        type: {
          type: "intrinsic",
          name: "string",
        },
      },
    ],
    groups: [],
    sources: [{ fileName: "test.ts", line: 0, character: 0 }],
    // Add files property
    files: {
      // @ts-expect-error weird id type
      entries: { 1: "test.ts" },
      reflections: { 1: 0 },
    },
  };
}
