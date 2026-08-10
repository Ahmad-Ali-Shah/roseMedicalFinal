import { describe, expect, it } from "vitest";
import { shouldRenderPublicNotFound } from "@/features/public-routing/public-route-policy";

describe("public route policy", () => {
  it.each([
    "/",
    "/products",
    "/products/knives",
    "/products/knives/scalpel-handle-no-3",
    "/products/knives/0303",
    "/ar/products/knives/0303",
    "/products/scissors/scalpel-handle-no-3",
    "/ar/products/scissors/mayo-scissors",
    "/catalogues",
    "/login",
    "/account",
    "/forgot-password",
    "/reset-password"
  ])("allows a known public route: %s", (pathname) => {
    expect(shouldRenderPublicNotFound(pathname)).toBe(false);
  });

  it.each([
    "/products/knives/scalpel-handle-no-3/extra",
    "/products/not-a-family/0303",
    "/totally-missing"
  ])("fails closed for an unknown public route: %s", (pathname) => {
    expect(shouldRenderPublicNotFound(pathname)).toBe(true);
  });

  it.each([
    "/admin",
    "/admin/products",
    "/api/contact",
    "/auth/callback",
    "/__rosa-not-found",
    "/robots.txt",
    "/sitemap.xml",
    "/media/catalogues/pdf/rosa-knives-catalogue.pdf"
  ])("leaves non-public-page routing to its dedicated handler: %s", (pathname) => {
    expect(shouldRenderPublicNotFound(pathname)).toBe(false);
  });
});
