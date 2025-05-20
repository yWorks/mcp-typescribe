import HNSW from "hnswlib-node";
import { FeatureExtractionPipeline, pipeline } from "@xenova/transformers";
import { cwd } from "node:process";
import path from "path";
import { promises as fs } from "fs";

const HierarchicalNSW = HNSW.HierarchicalNSW;

type Entry<T> = { label: number; embedding: number[]; t?: T };

let pipePromise: Promise<FeatureExtractionPipeline>;

function getPipeline(): Promise<FeatureExtractionPipeline> {
  return (pipePromise ??= pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2",
  ));
}

async function exists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export class VectorDB<T> {
  db: HNSW.HierarchicalNSW;
  private size: number;
  private entries: Entry<T>[];
  private cache: Map<string, Entry<T>>;
  embed: (text: string) => Promise<number[]>;

  constructor() {
    this.db = new HierarchicalNSW("l2", 384);
    this.entries = [];
    this.db.initIndex((this.size = 100));
    this.cache = new Map();

    this.embed = async function embed(text: string): Promise<number[]> {
      const pipe = await getPipeline();
      const res = await pipe(text, { pooling: "mean", normalize: true });
      return Array.from(res["data"]);
    };
  }

  get entryCount(): number {
    return this.cache.size;
  }

  async writeCache(filePath: string): Promise<void> {
    const dirPath = path.dirname(filePath);
    if (!(await exists(dirPath))) {
      await fs.mkdir(dirPath, { recursive: true });
    }

    // Collect entries with defined t property
    const entries = [];
    for (const [input, entry] of this.cache.entries()) {
      if (entry.t !== undefined) {
        entries.push({ input, label: entry.label, embedding: entry.embedding });
      }
    }

    // Calculate total buffer size
    let totalSize = 4; // 4 bytes for number of entries (UInt32)

    for (const entry of entries) {
      // 4 bytes for input string length (UInt32)
      // n bytes for input string (UTF-8 encoded)
      // 4 bytes for label (UInt32)
      // 4 bytes for embedding length (UInt32)
      // n*4 bytes for embedding (Float32Array)
      const inputBytes = Buffer.byteLength(entry.input, "utf8");
      totalSize += 4 + inputBytes + 4 + 4 + entry.embedding.length * 4;
    }

    // Create buffer
    const buffer = Buffer.alloc(totalSize);
    let offset = 0;

    // Write number of entries
    buffer.writeUInt32LE(entries.length, offset);
    offset += 4;

    // Write each entry
    for (const entry of entries) {
      // Write input string
      const inputBytes = Buffer.byteLength(entry.input, "utf8");
      buffer.writeUInt32LE(inputBytes, offset);
      offset += 4;
      buffer.write(entry.input, offset, inputBytes, "utf8");
      offset += inputBytes;

      // Write label
      buffer.writeUInt32LE(entry.label, offset);
      offset += 4;

      // Write embedding
      buffer.writeUInt32LE(entry.embedding.length, offset);
      offset += 4;

      for (let i = 0; i < entry.embedding.length; i++) {
        buffer.writeFloatLE(entry.embedding[i], offset);
        offset += 4;
      }
    }

    // Write buffer to file
    await fs.writeFile(filePath, buffer);
  }

  async readCache(filePath: string): Promise<number> {
    if (!(await exists(filePath))) {
      return 0;
    }

    // Read the binary file
    const buffer = await fs.readFile(filePath);

    // Clear existing data
    this.entries = [];
    this.cache = new Map();

    let offset = 0;

    // Read number of entries
    const entryCount = buffer.readUInt32LE(offset);
    offset += 4;

    // Resize the index if needed
    if (entryCount > this.size) {
      this.size = Math.max(this.size * 2, entryCount);
      this.db.resizeIndex(this.size);
    }

    // Read each entry
    for (let i = 0; i < entryCount; i++) {
      // Read input string
      const inputLength = buffer.readUInt32LE(offset);
      offset += 4;
      const input = buffer.toString("utf8", offset, offset + inputLength);
      offset += inputLength;

      // Read label
      const label = buffer.readUInt32LE(offset);
      offset += 4;

      // Read embedding
      const embeddingLength = buffer.readUInt32LE(offset);
      offset += 4;

      const embedding: number[] = [];
      for (let j = 0; j < embeddingLength; j++) {
        embedding.push(buffer.readFloatLE(offset));
        offset += 4;
      }

      // Create entry without t property (will be filled later)
      const entry: Entry<T> = {
        label,
        embedding,
      };

      // Add to entries array and cache map
      this.entries[label] = entry;
      this.cache.set(input, entry);

      // Add to HNSW index
      this.db.addPoint(embedding, label);
    }

    return this.entries.length;
  }

  resize(size: number) {
    this.size = size;
    this.db.resizeIndex(size);
  }

  async embedding(input: string, t: T): Promise<Entry<T>> {
    const result = this.cache.get(input);
    if (result) {
      return result;
    }
    const embedding = await this.embed(input);
    const entry = {
      label: this.entries.length,
      embedding,
      t,
    } satisfies Entry<T>;
    this.entries.push(entry);
    this.cache.set(input, entry);
    return entry;
  }

  async add(input: string, obj: T) {
    const result = this.cache.get(input);
    if (result) {
      result.t = obj;
      return;
    }
    const { embedding, label } = await this.embedding(input, obj);

    if (this.entries.length >= this.size) {
      this.size *= 2;
      this.db.resizeIndex(this.size);
    }
    this.db.addPoint(embedding, label);
  }

  async search(
    input: string,
    num = 3,
    threshold = 1,
  ): Promise<{ value: T; distance: number }[]> {
    const embedding = await this.embed(input);

    if (this.entries.length < num) {
      num = this.entries.length;
    }
    const { distances, neighbors } = this.db.searchKnn(
      embedding,
      Math.max(num, 10),
    );
    const results: { value: T; distance: number }[] = [];

    for (let i = 0; i < distances.length; i++) {
      const entry = this.entries[neighbors[i]];
      if (distances[i] <= threshold && entry.t) {
        results.push({
          value: entry.t,
          distance: distances[i],
        });
      }
    }
    results.sort((a, b) => a.distance - b.distance);
    if (results.length > num) {
      results.length = num;
    }
    return results;
  }
}

export class SearchService<T> {
  private readonly db: VectorDB<T>;
  private addPromises: Promise<void>[] = [];
  private readCachePromise: Promise<void> | null = null;
  private count = 0;
  private readonly cacheFilePath: string;
  private dirty = false;

  constructor(cacheFilePath?: string) {
    this.db = new VectorDB<T>();
    this.cacheFilePath =
      cacheFilePath ?? path.join(cwd(), ".search-service.cache");

    this.readCachePromise = this.startReadingCache();
  }

  add(title: string | undefined, data: T): void {
    if (!title || title.length < 3) {
      return;
    }

    this.addPromises.push(
      this.cacheRead().then(async () => {
        await this.db.add(title, data);
        this.count = this.db.entryCount;
        void this.scheduleUpdateCache();
      }),
    );
  }

  async search(
    query: string,
    limit: number = 5,
    distance: number = 0.3,
  ): Promise<T[]> {
    await this.indexingDone();
    if (this.count < 1) {
      return [];
    }

    const results = await this.db.search(query, limit, distance);
    return results.map((result) => result.value);
  }

  async dispose() {
    await this.indexingDone();
    await this.cacheDbContent();
    this.count = 0;
  }

  private async scheduleUpdateCache() {
    this.dirty = true;
    await new Promise((resolve) => setTimeout(resolve, 500));
    await this.indexingDone();
    await this.cacheDbContent();
  }

  private async startReadingCache(): Promise<void> {
    try {
      await this.db.readCache(this.cacheFilePath);
      this.count = this.db.entryCount;
    } catch (error) {
      console.error(`Failed to read cache: ${error}`);
    }
  }

  private async cacheDbContent(): Promise<void> {
    if (this.dirty && this.count > 0) {
      this.dirty = false;
      try {
        await this.db.writeCache(this.cacheFilePath);
      } catch (error) {
        console.error(`Failed to write cache: ${error}`);
      }
    }
  }

  private async indexingDone(): Promise<void> {
    await this.cacheRead();
    if (this.addPromises.length > 0) {
      await Promise.all(this.addPromises);
      this.addPromises.length = 0;
    }
  }

  private async cacheRead(): Promise<void> {
    if (this.readCachePromise) {
      await this.readCachePromise;
      this.readCachePromise = null;
    }
  }
}
