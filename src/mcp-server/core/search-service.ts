import HNSW from "hnswlib-node";
import { FeatureExtractionPipeline, pipeline } from "@xenova/transformers";

const HierarchicalNSW = HNSW.HierarchicalNSW;

type Entry<T> = { label: number; embedding: number[]; t: T };

let pipePromise: Promise<FeatureExtractionPipeline>;

function getPipeline(): Promise<FeatureExtractionPipeline> {
  return (pipePromise ??= pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2",
  ));
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
      if (distances[i] <= threshold) {
        results.push({
          value: this.entries[neighbors[i]].t,
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
  private count = 0;

  constructor() {
    this.db = new VectorDB<T>();
  }

  add(title: string | undefined, data: T): void {
    if (!title || title.length < 3) {
      return;
    }
    this.count++;

    this.addPromises.push(this.db.add(title, data));
  }

  async search(
    query: string,
    limit: number = 5,
    distance: number = 0.3,
  ): Promise<T[]> {
    await Promise.all(this.addPromises);
    if (this.count < 1) {
      return [];
    }
    this.addPromises.length = 0;
    const results = await this.db.search(query, limit, distance);
    return results.map((result) => result.value);
  }

  async dispose() {
    await Promise.all(this.addPromises);
    this.addPromises.length = 0;
    this.count = 0;
  }
}
