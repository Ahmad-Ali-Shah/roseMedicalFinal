import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import {
  clearCatalogueProjectionCache,
  getCachedCatalogueProjection
} from "@/features/catalogue-live/catalogue-live.cache";
import * as repository from "@/features/catalogue-live/catalogue-live.repository";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("scoped public catalogue projections", () => {
  beforeEach(() => clearCatalogueProjectionCache());

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

  it("reuses a warm projection inside its TTL", async () => {
    let loads = 0;
    let now = 1_000;
    const loader = async () => {
      loads += 1;
      return `load-${loads}`;
    };

    expect(
      await getCachedCatalogueProjection("warm", loader, { now: () => now })
    ).toBe("load-1");
    now = 59_000;
    expect(
      await getCachedCatalogueProjection("warm", loader, { now: () => now })
    ).toBe("load-1");
    expect(loads).toBe(1);
  });

  it("reloads a projection after 60 seconds", async () => {
    let loads = 0;
    let now = 1_000;
    const loader = async () => {
      loads += 1;
      return loads;
    };

    expect(
      await getCachedCatalogueProjection("ttl", loader, { now: () => now })
    ).toBe(1);
    now = 61_001;
    expect(
      await getCachedCatalogueProjection("ttl", loader, { now: () => now })
    ).toBe(2);
  });

  it("shares one pending load across concurrent requests", async () => {
    let loads = 0;
    let release!: (value: string) => void;
    const pending = new Promise<string>((resolvePending) => {
      release = resolvePending;
    });
    const loader = async () => {
      loads += 1;
      return pending;
    };

    const first = getCachedCatalogueProjection("pending", loader);
    const second = getCachedCatalogueProjection("pending", loader);
    expect(loads).toBe(1);
    release("ready");
    await expect(first).resolves.toBe("ready");
    await expect(second).resolves.toBe("ready");
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
