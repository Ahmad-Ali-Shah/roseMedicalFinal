import { describe, expect, it } from "vitest";
import { resolvePublicPageKind } from "@/features/public-routing/resolve-public-page";

describe("public route dispatch", () => {
  it.each([
    ["", "homepage"],
    ["products", "products"],
    ["catalogues", "placeholder"],
    ["products/knives", "family"],
    ["products/scissors", "family"],
    ["products/knives/scalpel-handle-no-3", "product"],
    ["products/scissors/scalpel-handle-no-3", "not-found"],
    ["products/unknown", "not-found"],
    ["products/knives/scalpel-handle-no-3/extra", "not-found"]
  ] as const)("maps %s to %s", (key, expected) => {
    expect(resolvePublicPageKind(key)).toBe(expected);
  });
});
