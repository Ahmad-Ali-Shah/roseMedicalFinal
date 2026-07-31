import { describe, expect, it } from "vitest";
import { resolvePublicPageKind } from "@/features/public-routing/resolve-public-page";

describe("public route dispatch", () => {
  it.each([
    ["", "homepage"],
    ["products", "products"],
    ["catalogues", "placeholder"],
    ["products/knives", "placeholder"]
  ] as const)("maps %s to %s", (key, expected) => {
    expect(resolvePublicPageKind(key)).toBe(expected);
  });
});
