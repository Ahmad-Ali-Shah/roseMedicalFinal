import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import * as repository from "@/features/catalogue-live/catalogue-live.repository";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("scoped public catalogue projections", () => {
  it("exposes page-scoped public read APIs", () => {
    expect(repository).toHaveProperty("getFeaturedCatalogueProducts");
    expect(repository).toHaveProperty("getFamilyCatalogueProducts");
    expect(repository).toHaveProperty("getProductCatalogueContext");
    expect(repository).toHaveProperty("getSearchCatalogueProducts");
  });

  it("uses a cookie-free public Supabase read boundary", () => {
    const reader = source("src/lib/supabase/public-read.ts");
    expect(reader).toContain("persistSession: false");
    expect(reader).toContain("autoRefreshToken: false");
    expect(reader).not.toContain("cookies(");
    expect(reader).not.toContain("service_role");
  });

  it("uses a bounded 60-second projection cache", () => {
    const cache = source("src/features/catalogue-live/catalogue-live.cache.ts");
    expect(cache).toContain("60_000");
    expect(cache).toContain("MAX_ENTRIES");
    expect(cache).toContain("pending");
  });

  it("keeps whole-catalogue loading out of ordinary public page components", () => {
    const expectations = [
      ["src/features/homepage/homepage.tsx", "getFeaturedCatalogueProducts"],
      ["src/features/products/products-overview.tsx", "getFeaturedCatalogueProducts"],
      ["src/features/family-listing/family-listing-page.tsx", "getFamilyCatalogueProducts"],
      ["src/features/product-detail/product-detail-page.tsx", "getProductCatalogueContext"],
      ["src/features/search-preview/search-default-page.tsx", "getSearchCatalogueProducts"]
    ] as const;

    for (const [path, expected] of expectations) {
      const contents = source(path);
      expect(contents).toContain(expected);
      expect(contents).not.toContain("getPublicCatalogueProducts");
    }
  });
});
