export type AdminNavigationKey =
  | "dashboard"
  | "products"
  | "families"
  | "catalogues"
  | "inquiries"
  | "messages"
  | "contact-details";

export type AdminNavigationHref =
  | "/admin"
  | "/admin/products"
  | "/admin/families"
  | "/admin/catalogues"
  | "/admin/inquiries"
  | "/admin/messages"
  | "/admin/contact-details";

export interface AdminNavigationItem {
  key: AdminNavigationKey;
  label: string;
  shortLabel: string;
  href: AdminNavigationHref;
}

export interface AdminNavigationGroup {
  key: "overview" | "catalogue" | "operations" | "website";
  label: string;
  items: readonly AdminNavigationItem[];
}

export const ADMIN_NAVIGATION_GROUPS: readonly AdminNavigationGroup[] = [
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
      { key: "catalogues", label: "Catalogues", shortLabel: "Catalogues", href: "/admin/catalogues" }
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
      { key: "contact-details", label: "Contact Details", shortLabel: "Contact", href: "/admin/contact-details" }
    ]
  }
];

export const ADMIN_NAVIGATION_ITEMS: readonly AdminNavigationItem[] =
  ADMIN_NAVIGATION_GROUPS.flatMap((group) => group.items);

export function getAdminNavigationItem(pathname: string): AdminNavigationItem | undefined {
  return ADMIN_NAVIGATION_ITEMS.find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
}
