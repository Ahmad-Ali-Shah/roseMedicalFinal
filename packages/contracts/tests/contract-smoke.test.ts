import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";

const here = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.resolve(here, "../openapi/rosa-medical.v1.yaml");
const document = parse(readFileSync(schemaPath, "utf8"));

describe("Rosa Medical OpenAPI 0.1", () => {
  it("uses OpenAPI 3.1 and versioned v1 paths", () => {
    expect(document.openapi).toBe("3.1.0");
    expect(Object.keys(document.paths).every((value) => value.startsWith("/v1/"))).toBe(true);
  });

  it("contains the first vertical-slice operations", () => {
    expect(document.paths["/v1/health"].get.operationId).toBe("getHealth");
    expect(document.paths["/v1/public/families"].get.operationId).toBe("listPublicFamilies");
    expect(document.paths["/v1/public/products"].get.operationId).toBe("listPublicProducts");
    expect(document.paths["/v1/public/products/{slug}"].get.operationId).toBe("getPublicProduct");
    expect(document.paths["/v1/public/inquiries"].post.operationId).toBe("createPublicInquiry");
  });

  it("keeps operation identifiers unique", () => {
    const ids: string[] = [];
    for (const pathItem of Object.values(document.paths) as Record<string, unknown>[]) {
      for (const operation of Object.values(pathItem) as Record<string, unknown>[]) {
        if (typeof operation?.operationId === "string") ids.push(operation.operationId as string);
      }
    }
    expect(new Set(ids).size).toBe(ids.length);
  });
});
