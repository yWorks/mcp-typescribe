import fs from "fs/promises";
import path from "node:path";
import { ProjectReflection } from "typedoc";
import { PageRank } from "./page-rank.js";
import objectHash from "object-hash";

/**
 * Serializes page ranks and project hash to a buffer
 *
 * @param pageRanks - Map of type IDs to page rank scores
 * @param projectHash - Hash of the project to validate cache
 * @returns Buffer containing serialized page ranks and project hash
 */
function serializePageRanks(
  pageRanks: Map<number, number>,
  projectHash: Buffer<ArrayBufferLike>,
): Buffer {
  // Calculate buffer size:
  // 4 bytes for hash length + hash length + 4 bytes for entry count + (8 bytes per entry (4 for key, 4 for value))
  const entryCount = pageRanks.size;
  const bufferSize = 4 + projectHash.length + 4 + entryCount * 8;
  const buffer = Buffer.alloc(bufferSize);

  // Write hash length
  buffer.writeUInt32LE(projectHash.length, 0);

  // Write hash
  projectHash.copy(buffer, 4);

  // Write entry count
  buffer.writeUInt32LE(entryCount, 4 + projectHash.length);

  // Write entries
  let offset = 8 + projectHash.length;
  for (const [key, value] of pageRanks.entries()) {
    buffer.writeUInt32LE(key, offset);
    offset += 4;
    buffer.writeFloatLE(value, offset);
    offset += 4;
  }

  return buffer;
}

/**
 * Deserializes page ranks and project hash from a buffer
 *
 * @param buffer - Buffer containing serialized page ranks and project hash
 * @returns Object containing page ranks map and project hash
 */
function deserializePageRanks(buffer: Buffer): {
  pageRanks: Map<number, number>;
  projectHash: Buffer;
} {
  const pageRanks = new Map<number, number>();

  // Read hash length
  const hashLength = buffer.readUInt32LE(0);

  const projectHash = buffer.subarray(4, 4 + hashLength);

  // Read entry count
  const entryCount = buffer.readUInt32LE(4 + hashLength);

  // Read entries
  let offset = 8 + hashLength;
  for (let i = 0; i < entryCount; i++) {
    const key = buffer.readUInt32LE(offset);
    offset += 4;
    const value = buffer.readFloatLE(offset);
    offset += 4;
    pageRanks.set(key, value);
  }

  return { pageRanks, projectHash };
}

/**
 * Writes page ranks and project hash to cache file
 *
 * @param cacheFilePath - Path to the cache file
 * @param pageRanks - Map of type IDs to page rank scores
 * @param projectHash - Hash of the project to validate cache
 */
async function writeRankCache(
  cacheFilePath: string,
  pageRanks: Map<number, number>,
  projectHash: Buffer<ArrayBufferLike>,
): Promise<void> {
  const buffer = serializePageRanks(pageRanks, projectHash);

  try {
    await fs.mkdir(path.dirname(cacheFilePath), { recursive: true });
    await fs.writeFile(cacheFilePath, buffer);
  } catch (saveError) {
    console.error(
      `Failed to save page ranks cache: ${saveError instanceof Error ? saveError.message : saveError}`,
    );
  }
}

/**
 * Tries to read page ranks and project hash from cache file
 *
 * @param cacheFilePath - Path to the cache file
 * @returns Object containing page ranks map and project hash, or null if cache read fails
 */
async function tryReadRankCache(
  cacheFilePath: string,
): Promise<{ pageRanks: Map<number, number>; projectHash: Buffer } | null> {
  let buffer: Buffer<ArrayBufferLike>;
  try {
    buffer = await fs.readFile(cacheFilePath);
  } catch {
    return null;
  }
  return deserializePageRanks(buffer);
}

function createProjectHash(
  project: ProjectReflection,
): Buffer<ArrayBufferLike> {
  const hashKeys = new Set([
    // don't include "id", it is not deterministic
    "name",
    "children",
    "comment",
    "signatures",
    "type",
    "typeParameters",
    "indexSignatures",
    "defaultValue",
    "overwrites",
    "inheritedFrom",
    "implementationOf",
    "extendedTypes",
    "extendedBy",
    "implementedTypes",
    "implementedBy",
    "typeHierarchy",
  ]);
  return objectHash(project, {
    encoding: "buffer",
    algorithm: "sha1",
    excludeKeys: (key) => !hashKeys.has(key),
  });
}

async function computeRanks(
  project: ProjectReflection,
): Promise<Map<number, number>> {
  const pageRank = new PageRank(project);
  await pageRank.buildGraph();
  const ranks = await pageRank.computePageRanks();
  await pageRank.dispose();
  return ranks;
}

/**
 * Initializes page ranks, either from cache or by computing them
 *
 * @param project - The TypeDoc project to compute page ranks for
 * @param cacheFilePath - File path for caching rank data
 * @returns A map of type IDs to their page rank scores
 */
export async function initializeRanks(
  project: ProjectReflection,
  cacheFilePath: string,
): Promise<Map<number, number>> {
  const currentProjectHash = createProjectHash(project);

  // Try to load from cache first
  const cacheResult = await tryReadRankCache(cacheFilePath);

  // Use cache only if it exists and the project hash matches
  if (cacheResult && cacheResult.projectHash.equals(currentProjectHash)) {
    return cacheResult.pageRanks;
  } else {
    // Compute new page ranks if cache is invalid or doesn't exist
    const ranks = await computeRanks(project);

    // Save the new ranks with the current project hash
    await writeRankCache(cacheFilePath, ranks, currentProjectHash);
    return ranks;
  }
}
