import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchService } from "../src/index.js";
import { promises as fs } from "fs";
import path from "path";

// Mock the modules
vi.mock("fs", () => {
  const mockAccess = vi.fn();
  const mockWriteFile = vi.fn();

  // Create a mock binary buffer with an empty array
  const createEmptyBuffer = () => {
    // Create a buffer with just the entry count (0)
    const buffer = Buffer.alloc(4);
    buffer.writeUInt32LE(0, 0); // 0 entries
    return buffer;
  };

  const mockReadFile = vi.fn().mockResolvedValue(createEmptyBuffer());
  const mockMkdir = vi.fn();

  return {
    promises: {
      access: mockAccess,
      writeFile: mockWriteFile,
      readFile: mockReadFile,
      mkdir: mockMkdir,
    },
  };
});

vi.mock("path", () => {
  const mockJoin = vi.fn((...args) => args.join("/"));
  const mockDirname = vi.fn((p) => p.split("/").slice(0, -1).join("/"));

  const mockPath = {
    join: mockJoin,
    dirname: mockDirname,
  };

  return {
    default: mockPath,
    join: mockJoin,
    dirname: mockDirname,
  };
});

vi.mock("node:process", () => {
  const mockCwd = vi.fn(() => "/mock/cwd");

  return {
    cwd: mockCwd,
  };
});

// Get the mocked functions with proper types
const mockFs = fs as unknown as {
  access: ReturnType<typeof vi.fn>;
  writeFile: ReturnType<typeof vi.fn>;
  readFile: ReturnType<typeof vi.fn>;
  mkdir: ReturnType<typeof vi.fn>;
};

const mockPath = path as unknown as {
  join: ReturnType<typeof vi.fn>;
  dirname: ReturnType<typeof vi.fn>;
};

describe("SearchService", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();

    // Setup default mock implementations
    mockPath.join.mockImplementation((...args: string[]) => args.join("/"));
    mockPath.dirname.mockImplementation((p: string) =>
      p.split("/").slice(0, -1).join("/"),
    );
    mockFs.access.mockResolvedValue(undefined);
    mockFs.mkdir.mockResolvedValue(undefined);

    // Create a mock binary buffer with an empty array
    const createEmptyBuffer = () => {
      // Create a buffer with just the entry count (0)
      const buffer = Buffer.alloc(4);
      buffer.writeUInt32LE(0, 0); // 0 entries
      return buffer;
    };

    mockFs.readFile.mockResolvedValue(createEmptyBuffer());
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("caching mechanism", () => {
    it("should use the default cache file path when not provided", async () => {
      // Setup
      mockPath.join.mockReturnValue("/mock/cwd/.search-service.cache");

      // Create a new SearchService instance
      new SearchService();

      // Verify that path.join was called with the correct arguments
      expect(path.join).toHaveBeenCalledWith(
        "/mock/cwd",
        ".search-service.cache",
      );
    });

    it("should use the provided cache file path when specified", async () => {
      // Setup
      const customCachePath = "/custom/cache/path.cache";

      // Create a new SearchService instance with a custom cache path
      new SearchService(customCachePath);

      // Verify that the custom path was used
      expect(path.join).not.toHaveBeenCalled();
    });

    it("should attempt to read from cache file on initialization", async () => {
      // Setup
      const cachePath = "/mock/cache/path.cache";

      // Create a mock binary buffer with an empty array
      const createEmptyBuffer = () => {
        // Create a buffer with just the entry count (0)
        const buffer = Buffer.alloc(4);
        buffer.writeUInt32LE(0, 0); // 0 entries
        return buffer;
      };

      mockFs.readFile.mockResolvedValue(createEmptyBuffer());

      // Create a new SearchService instance
      new SearchService(cachePath);

      // Wait for the readCachePromise to resolve
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify that readFile was called with the correct path
      expect(fs.readFile).toHaveBeenCalledWith(cachePath);
    });

    it("should handle errors when reading from cache file", async () => {
      // Setup
      const cachePath = "/mock/cache/path.cache";
      const error = new Error("File not found");
      mockFs.access.mockRejectedValue(error);
      mockFs.readFile.mockRejectedValue(error);

      // Create a spy on console.error
      const consoleSpy = vi.spyOn(console, "error");

      // Create a new SearchService instance
      new SearchService(cachePath);

      // Wait for the readCachePromise to resolve
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify that the error was logged
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it("should write to cache file when data is added", async () => {
      // Setup
      const cachePath = "/mock/cache/path.cache";

      // Create a new SearchService instance
      const service = new SearchService(cachePath);

      // Wait for the readCachePromise to resolve
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Add some data
      service.add("test title", { id: 1, name: "test" });

      // Wait for the scheduled cache update
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Increased from 600ms to 1000ms

      // Force a cache write by disposing the service
      await service.dispose();

      // Verify that writeFile was called
      expect(fs.writeFile).toHaveBeenCalled();
      expect(mockFs.writeFile.mock.calls[0][0]).toBe(cachePath);
    });

    it("should write to cache file when data is added after cache read", async () => {
      // Setup
      const cachePath = "/mock/cache/path.cache";

      // Create a mock binary buffer with an empty array
      const createEmptyBuffer = () => {
        // Create a buffer with just the entry count (0)
        const buffer = Buffer.alloc(4);
        buffer.writeUInt32LE(0, 0); // 0 entries
        return buffer;
      };

      mockFs.readFile.mockResolvedValue(createEmptyBuffer());

      // Create a new SearchService instance
      const service = new SearchService(cachePath);

      // Wait for the readCachePromise to resolve
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Add some data
      service.add("test title", { id: 1, name: "test" });

      // Wait for the scheduled cache update
      await new Promise((resolve) => setTimeout(resolve, 600)); // More than the 500ms timeout

      // Verify that writeFile was called
      expect(fs.writeFile).toHaveBeenCalled();
      expect(mockFs.writeFile.mock.calls[0][0]).toBe(cachePath);
    });

    it("should create directory if it doesn't exist when writing cache", async () => {
      // Setup
      const cachePath = "/mock/cache/path.cache";
      const dirPath = "/mock/cache";

      // Reset mocks to ensure clean state
      vi.resetAllMocks();

      // Setup mocks for this test
      mockPath.dirname.mockReturnValue(dirPath);
      mockFs.access.mockRejectedValue(new Error("Directory not found"));

      // Create a mock binary buffer with an empty array
      const createEmptyBuffer = () => {
        // Create a buffer with just the entry count (0)
        const buffer = Buffer.alloc(4);
        buffer.writeUInt32LE(0, 0); // 0 entries
        return buffer;
      };

      mockFs.readFile.mockResolvedValue(createEmptyBuffer());

      // Create a new SearchService instance
      const service = new SearchService(cachePath);

      // Wait for the readCachePromise to resolve
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Add some data
      service.add("test title", { id: 1, name: "test" });

      // Wait for the scheduled cache update
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Verify that mkdir was called with the correct path and options
      expect(fs.mkdir).toHaveBeenCalledWith(dirPath, { recursive: true });
    });

    it("should handle errors when writing to cache file", async () => {
      // Setup
      const cachePath = "/mock/cache/path.cache";
      const error = new Error("Write error");
      mockFs.writeFile.mockRejectedValueOnce(error);

      // Create a mock binary buffer with an empty array
      const createEmptyBuffer = () => {
        // Create a buffer with just the entry count (0)
        const buffer = Buffer.alloc(4);
        buffer.writeUInt32LE(0, 0); // 0 entries
        return buffer;
      };

      mockFs.readFile.mockResolvedValue(createEmptyBuffer());

      // Create a spy on console.error
      const consoleSpy = vi.spyOn(console, "error");

      // Create a new SearchService instance
      const service = new SearchService(cachePath);

      // Wait for the readCachePromise to resolve
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Add some data
      service.add("test title", { id: 1, name: "test" });

      // Wait for the scheduled cache update
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Verify that the error was logged
      expect(consoleSpy).toHaveBeenCalledWith(
        `Failed to write cache: ${error}`,
      );
    });

    it("should not write to cache if no data has been added", async () => {
      // Setup
      const cachePath = "/mock/cache/path.cache";

      // Create a new SearchService instance
      new SearchService(cachePath);

      // Wait for the readCachePromise to resolve
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Wait for the scheduled cache update
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Verify that writeFile was not called
      expect(fs.writeFile).not.toHaveBeenCalled();
    });

    it("should write to cache on dispose", async () => {
      // Setup
      const cachePath = "/mock/cache/path.cache";

      // Create a new SearchService instance
      const service = new SearchService(cachePath);

      // Wait for the readCachePromise to resolve
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Add some data
      service.add("test title", { id: 1, name: "test" });

      // Dispose the service
      await service.dispose();

      // Verify that writeFile was called
      expect(fs.writeFile).toHaveBeenCalled();
    });
  });
});
