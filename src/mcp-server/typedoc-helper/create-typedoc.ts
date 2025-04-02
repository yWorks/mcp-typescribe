import * as path from "path";
import * as fs from "fs";
import { Application } from "typedoc";

/**
 * Generates API documentation in JSON format using TypeDoc.
 *
 * @param tsconfigPath - The path to the TypeScript configuration file of the project to search.
 * @param entryPointPath - The path to the entry point file to generate typings from.
 * @param apiJSONPath - The path where the generated API JSON file will be saved.
 * @return  A promise that resolves when the API documentation has been successfully generated.
 * @throws {Error} Throws an error if the TypeDoc project conversion fails.
 */
async function runTypeDoc(
  tsconfigPath: string,
  entryPointPath: string,
  apiJSONPath: string,
) {
  const application = await Application.bootstrap({
    pretty: false,
    entryPointStrategy: "resolve",
    tsconfig: tsconfigPath,
    excludeExternals: false,
    excludeInternal: true,
    excludePrivate: true,
    entryPoints: [entryPointPath],
  });
  const project = await application.convert();
  if (project) {
    await application.generateJson(project, apiJSONPath);
  } else {
    throw new Error("No project converted");
  }
}

export async function createTypedoc(
  projectPath: string,
  libraryName: string,
  tsconfigPath?: string,
  apiJSONPath = "api.json",
) {
  // write a temporary d.ts file that will reexport the library in question
  const randomTempFileName = Math.random().toString(36).substring(2) + ".d.ts";

  const tempFilePath = path.resolve(projectPath, randomTempFileName);
  const reExportContent = `export * from "${libraryName}";`;

  fs.writeFileSync(tempFilePath, reExportContent, "utf8");

  // Write a dummy tsconfig file that extends the base tsconfig and includes the d.ts file
  const randomTempTsConfigFileName =
    "tsconfig." + Math.random().toString(36).substring(2) + ".json";

  const tempTsConfigFilePath = path.resolve(
    projectPath,
    randomTempTsConfigFileName,
  );

  const tsConfigPath =
    tsconfigPath ?? path.resolve(projectPath, "tsconfig.json");

  const tsConfigContent = JSON.stringify(
    {
      extends: tsConfigPath,
      files: [randomTempFileName],
    },
    null,
    2,
  );

  fs.writeFileSync(tempTsConfigFilePath, tsConfigContent, "utf8");

  try {
    await runTypeDoc(tempTsConfigFilePath, randomTempFileName, apiJSONPath);
  } finally {
    // Ensure the temporary file is deleted after usage
    fs.unlinkSync(tempFilePath);
    fs.unlinkSync(tempTsConfigFilePath);
  }
}
