import { ReflectionKind } from "typedoc";

/**
 * Utility functions for the TypeScript API MCP server.
 */

/**
 * Gets the name of a TypeDoc kind.
 *
 * @param kind - The kind number
 * @returns The kind name
 */
export function getKindName(
  kind: ReflectionKind,
): ReflectionKind.KindString | string {
  return ReflectionKind[kind] ?? `Unknown(${kind})`;
}
