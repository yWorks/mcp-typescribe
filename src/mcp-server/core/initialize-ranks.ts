import fs from "fs/promises";
import path from "node:path";
import { ProjectReflection } from "typedoc";
import { PageRank } from "./page-rank.js";

/**
 * Serializes page ranks to a buffer
 *
 * @param pageRanks - Map of type IDs to page rank scores
 * @returns Buffer containing serialized page ranks
 */
function serializePageRanks(pageRanks: Map<number, number>): Buffer {
  // Calculate buffer size: 4 bytes for entry count + (8 bytes per entry (4 for key, 4 for value))
  const entryCount = pageRanks.size;
  const bufferSize = 4 + entryCount * 8;
  const buffer = Buffer.alloc(bufferSize);

  // Write entry count
  buffer.writeUInt32LE(entryCount, 0);

  // Write entries
  let offset = 4;
  for (const [key, value] of pageRanks.entries()) {
    buffer.writeUInt32LE(key, offset);
    offset += 4;
    buffer.writeFloatLE(value, offset);
    offset += 4;
  }

  return buffer;
}

/**
 * Deserializes page ranks from a buffer
 *
 * @param buffer - Buffer containing serialized page ranks
 * @returns Map of type IDs to page rank scores
 */
function deserializePageRanks(buffer: Buffer): Map<number, number> {
  const pageRanks = new Map<number, number>();

  // Read entry count
  const entryCount = buffer.readUInt32LE(0);

  // Read entries
  let offset = 4;
  for (let i = 0; i < entryCount; i++) {
    const key = buffer.readUInt32LE(offset);
    offset += 4;
    const value = buffer.readFloatLE(offset);
    offset += 4;
    pageRanks.set(key, value);
  }

  return pageRanks;
}

/**
 * Writes page ranks to cache file
 *
 * @param cacheFilePath - Path to the cache file
 * @param pageRanks - Map of type IDs to page rank scores
 */
async function writeRankCache(
  cacheFilePath: string,
  pageRanks: Map<number, number>,
): Promise<void> {
  const buffer = serializePageRanks(pageRanks);

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
 * Tries to read page ranks from cache file
 *
 * @param cacheFilePath - Path to the cache file
 * @returns Map of type IDs to page rank scores, or null if cache read fails
 */
async function tryReadRankCache(
  cacheFilePath: string,
): Promise<Map<number, number> | null> {
  let buffer: Buffer<ArrayBufferLike>;
  try {
    buffer = await fs.readFile(cacheFilePath);
  } catch {
    return null;
  }
  return deserializePageRanks(buffer);
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
  // Try to load from cache first
  const pageRanks = await tryReadRankCache(cacheFilePath);
  if (pageRanks) {
    return pageRanks;
  } else {
    const pageRank = new PageRank(project);
    await pageRank.buildGraph();
    const ranks = await pageRank.computePageRanks();
    await pageRank.dispose();

    await writeRankCache(cacheFilePath, ranks);
    return ranks;
  }
}
