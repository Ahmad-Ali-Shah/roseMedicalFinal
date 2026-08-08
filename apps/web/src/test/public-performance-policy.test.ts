import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CATALOGUE_MEDIA_BY_SLUG,
  FAMILY_MEDIA_BY_SLUG,
  HOME_CATALOGUE_MEDIA_BY_SLUG,
  HOME_HERO_MEDIA,
  PROCUREMENT_SUPPORT_MEDIA,
  ROSA_HEADER_LOGO_MEDIA,
  SUPPORTED_BUYER_MEDIA
} from "@/features/public-media";
import { requiresSupabaseSession } from "@/lib/supabase/session-route-policy";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

function expectLocalMedia(src: string): void {
  expect(src.startsWith("/media/")).toBe(true);
  expect(src).not.toContain("supabase.co");
}

describe("public performance policy", () => {
  it.each([
    "/",
    "/products",
    "/products/knives",
    "/products/knives/number-3",
    "/search",
    "/catalogues",
    "/about",
    "/contact",
    "/request-quotation"
  ])("does not refresh a Supabase session for public route %s", (pathname) => {
    expect(requiresSupabaseSession(pathname)).toBe(false);
  });

  it.each(["/admin", "/admin/products", "/admin/products/knives/number-3"])(
    "keeps Supabase session refresh for protected route %s",
    (pathname) => {
      expect(requiresSupabaseSession(pathname)).toBe(true);
    }
  );

  it("gates Supabase session refresh behind the protected-route policy", () => {
    const middleware = source("src/middleware.ts");
    expect(middleware).toContain("requiresSupabaseSession");
    expect(middleware).toContain("if (!requiresSupabaseSession(request.nextUrl.pathname))");
  });

  it("does not depend on unavailable runtime image transformation", () => {
    const config = source("next.config.ts");
    expect(config).toMatch(/images:\s*\{[\s\S]*unoptimized:\s*true/);
  });

  it("defaults localized public links to no automatic prefetch", () => {
    expect(source("src/features/localization/locale-link.tsx")).toContain("prefetch = false");
    expect(source("src/features/localization/localized-button-link.tsx")).toContain("prefetch = false");
    expect(source("src/components/layout/public-navigation-link.tsx")).toContain("prefetch={false}");
  });

  it("keeps all non-product media local", () => {
    expectLocalMedia(ROSA_HEADER_LOGO_MEDIA.src);
    expectLocalMedia(HOME_HERO_MEDIA.src);
    expectLocalMedia(PROCUREMENT_SUPPORT_MEDIA.src);

    for (const media of Object.values(FAMILY_MEDIA_BY_SLUG)) expectLocalMedia(media.src);
    for (const media of Object.values(HOME_CATALOGUE_MEDIA_BY_SLUG)) expectLocalMedia(media.src);
    for (const media of Object.values(CATALOGUE_MEDIA_BY_SLUG)) expectLocalMedia(media.src);
    for (const media of Object.values(SUPPORTED_BUYER_MEDIA)) expectLocalMedia(media.src);
  });

  it("uses right-sized versioned local presentation assets for the heavy sources", () => {
    expect(ROSA_HEADER_LOGO_MEDIA.src).toBe("/media/brand/rosa-header-logo-v1.webp");
    expect(PROCUREMENT_SUPPORT_MEDIA.src).toBe("/media/optimized/v1/procurement-support.webp");
    expect(FAMILY_MEDIA_BY_SLUG.cutters.src).toBe("/media/optimized/v1/cutters-family.webp");
    expect(SUPPORTED_BUYER_MEDIA.hospitals.src).toBe("/media/optimized/v1/about-hospitals.webp");
    expect(SUPPORTED_BUYER_MEDIA.procurement.src).toBe("/media/optimized/v1/about-procurement.webp");
    expect(SUPPORTED_BUYER_MEDIA.distributors.src).toBe("/media/optimized/v1/about-distributors.webp");
  });

  it("ships Cloudflare static cache headers", () => {
    const headers = source("public/_headers");
    expect(headers).toContain("/_next/static/*");
    expect(headers).toContain("max-age=31536000,immutable");
    expect(headers).toContain("/media/*");
    expect(headers).toContain("/media/optimized/v1/*");
  });

  it("makes versioned Supabase product uploads long-cacheable and invalidates catalogue cache", () => {
    const actions = source("src/features/admin-products/actions.ts");
    expect(actions).toContain('cacheControl: "31536000"');
    expect(actions).toContain("clearCatalogueProjectionCache();");
  });
});
