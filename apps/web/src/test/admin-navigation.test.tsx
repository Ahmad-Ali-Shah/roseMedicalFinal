import { describe, expect, it } from "vitest";
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

describe("F3E-A admin navigation model", () => {
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
});
