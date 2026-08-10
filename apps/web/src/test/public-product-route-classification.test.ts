import { describe, expect, it } from "vitest";
import { resolvePublicPageKind } from "@/features/public-routing/resolve-public-page";

describe("public product route classification", () => {
  it("recognizes representative live catalogue routes from all five families", () => {
    expect(resolvePublicPageKind("products/knives/scalpel-handle-no-3")).toBe("product");
    expect(resolvePublicPageKind("products/knives/0303")).toBe("product");
    expect(resolvePublicPageKind("products/scissors/mayo-scissors")).toBe("product");
    expect(resolvePublicPageKind("products/punches/biopsy-punch")).toBe("product");
    expect(resolvePublicPageKind("products/chisels/codman")).toBe("product");
    expect(resolvePublicPageKind("products/cutters/liston")).toBe("product");
  });

  it("recognizes fixed family routes and rejects unknown product routes", () => {
    expect(resolvePublicPageKind("products/cutters")).toBe("family");
    expect(resolvePublicPageKind("products/not-a-family")).toBe("not-found");
    expect(resolvePublicPageKind("products/cutters/not-a-real-product")).toBe("product");
  });
});
