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

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

function expectLocalMedia(src: string): void {
  expect(src.startsWith("/media/")).toBe(true);
  expect(src).not.toContain("supabase.co");
}

describe("public performance policy", () => {
  it("gates Supabase session refresh behind an explicit protected-route policy", () => {
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

  it("uses the right-sized versioned local header logo", () => {
    expect(ROSA_HEADER_LOGO_MEDIA.src).toBe("/media/brand/rosa-header-logo-v1.webp");
  });

  it("ships Cloudflare static cache headers", () => {
    const headers = source("public/_headers");
    expect(headers).toContain("/_next/static/*");
    expect(headers).toContain("max-age=31536000,immutable");
    expect(headers).toContain("/media/*");
  });
});
