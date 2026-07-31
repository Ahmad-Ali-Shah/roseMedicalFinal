import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import openapiTS, { astToString } from "openapi-typescript";

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, "..");
const schemaPath = path.join(packageRoot, "openapi", "rosa-medical.v1.yaml");
const outputDir = path.join(packageRoot, "src", "generated");
const outputPath = path.join(outputDir, "schema.ts");

await mkdir(outputDir, { recursive: true });
const ast = await openapiTS(pathToFileURL(schemaPath));
const source = `/* This file is generated. Do not edit directly. */\n${astToString(ast)}`;
await writeFile(outputPath, source, "utf8");
console.log(`Generated ${path.relative(process.cwd(), outputPath)}`);
