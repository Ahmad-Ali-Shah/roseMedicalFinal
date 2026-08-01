import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

let pathname = "/admin";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname
}));

import { AdminShell } from "@/components/layout/admin-shell";
import {
  ADMIN_NAVIGATION_GROUPS,
  ADMIN_NAVIGATION_ITEMS,
  getAdminNavigationItem
} from "@/features/admin-navigation";

const expectedRoutes = [
  "/admin",
  "/admin/products",
  "/admin/families",
  "/admin/catalogues",
  "/admin/media",
  "/admin/inquiries",
  "/admin/messages",
  "/admin/content",
  "/admin/contact-details",
  "/admin/publishing",
  "/admin/revisions",
  "/admin/settings"
] as const;

describe("F3E-A admin navigation", () => {
  beforeEach(() => {
    pathname = "/admin";
  });

  it("defines each approved workspace route exactly once", () => {
    expect(ADMIN_NAVIGATION_ITEMS.map((item) => item.href)).toEqual(expectedRoutes);
    expect(new Set(ADMIN_NAVIGATION_ITEMS.map((item) => item.href)).size).toBe(12);
  });

  it("preserves the approved navigation groups", () => {
    expect(ADMIN_NAVIGATION_GROUPS.map((group) => group.label)).toEqual([
      "Overview",
      "Catalogue",
      "Operations",
      "Website",
      "Publishing",
      "System"
    ]);
  });

  it("resolves exact and nested workspace paths", () => {
    expect(getAdminNavigationItem("/admin")?.key).toBe("dashboard");
    expect(getAdminNavigationItem("/admin/products/example")?.key).toBe("products");
    expect(getAdminNavigationItem("/admin/unknown")).toBeUndefined();
  });

  it("renders every approved route and no dead disclosure control", () => {
    const html = renderToStaticMarkup(<AdminShell><p>Dashboard content</p></AdminShell>);
    for (const item of ADMIN_NAVIGATION_ITEMS) {
      expect(html).toContain(`href="${item.href}"`);
    }
    expect(html).toContain('href="/"');
    expect(html).not.toContain("<details");
    expect(html).not.toContain("<summary");
    expect(html).not.toMatch(/hamburger|menu toggle/i);
  });

  it("owns the sole workspace main and exposes truthful session status", () => {
    const html = renderToStaticMarkup(<AdminShell><h1>Dashboard</h1></AdminShell>);
    expect((html.match(/<main/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Owner session not connected");
    expect(html).toContain("Production access requires server-enforced owner authentication");
    expect(html).toContain("disabled");
  });

  it("marks only the current navigation link", () => {
    pathname = "/admin/products/example";
    const html = renderToStaticMarkup(<AdminShell><h1>Product</h1></AdminShell>);
    expect((html.match(/aria-current="page"/g) ?? [])).toHaveLength(1);
    expect(getAdminNavigationItem(pathname)?.key).toBe("products");
  });
});
