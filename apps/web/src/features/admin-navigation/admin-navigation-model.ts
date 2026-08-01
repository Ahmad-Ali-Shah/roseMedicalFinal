import type { Route } from "next";

export type AdminNavigationKey =
  | "dashboard"
  | "products"
  | "families"
  | "catalogues"
  | "media"
  | "inquiries"
  | "messages"
  | "content"
  | "contact-details"
  | "publishing"
  | "revisions"
  | "settings";

export interface AdminNavigationItem {
  key: AdminNavigationKey;
  label: string;
  shortLabel: string;
  href: Route<string>;
}

export interface AdminNavigationGroup {
  key: "overview" | "catalogue" | "operations" | "website" | "publishing" | "system";
  label: string;
  items: readonly AdminNavigationItem[];
}

export const ADMIN_NAVIGATION_GROUPS = [
  {
    key: "overview",
    label: "Overview",
    items: [
      { key: "dashboard", label: "Dashboard", shortLabel: "Dashboard", href: "/admin" }
    ]
  },
  {
    key: "catalogue",
    label: "Catalogue",
    items: [
      { key: "products", label: "Products", shortLabel: "Products", href: "/admin/products" },
      { key: "families", label: "Families", shortLabel: "Families", href: "/admin/families" },
      { key: "catalogues", label: "Catalogues", shortLabel: "Catalogues", href: "/admin/catalogues" },
      { key: "media", label: "Media", shortLabel: "Media", href: "/admin/media" }
    ]
  },
  {
    key: "operations",
    label: "Operations",
    items: [
      { key: "inquiries", label: "Quotation Inquiries", shortLabel: "Inquiries", href: "/admin/inquiries" },
      { key: "messages", label: "General Messages", shortLabel: "Messages", href: "/admin/messages" }
    ]
  },
  {
    key: "website",
    label: "Website",
    items: [
      { key: "content", label: "Website Content", shortLabel: "Content", href: "/admin/content" },
      { key: "contact-details", label: "Contact Details", shortLabel: "Contact", href: "/admin/contact-details" }
    ]
  },
  {
    key: "publishing",
    label: "Publishing",
    items: [
      { key: "publishing", label: "Publishing Centre", shortLabel: "Publishing", href: "/admin/publishing" },
      { key: "revisions", label: "Revision History", shortLabel: "Revisions", href: "/admin/revisions" }
    ]
  },
  {
    key: "system",
    label: "System",
    items: [
      { key: "settings", label: "Settings", shortLabel: "Settings", href: "/admin/settings" }
    ]
  }
] as const satisfies readonly AdminNavigationGroup[];

export const ADMIN_NAVIGATION_ITEMS = ADMIN_NAVIGATION_GROUPS.flatMap(
  (group) => group.items
);

export function getAdminNavigationItem(pathname: string): AdminNavigationItem | undefined {
  return ADMIN_NAVIGATION_ITEMS.find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
}
