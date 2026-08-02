import { CATALOGUE_FAMILIES, CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";
import { ADMIN_READINESS_ITEMS, type AdminReadinessItem } from "@/features/admin-governance-source/admin-readiness-model";

export type AdminDashboardHref =
  | "/admin/families"
  | "/admin/products"
  | "/admin/catalogues"
  | "/admin/inquiries"
  | "/admin/content"
  | "/admin/publishing";

export interface AdminDashboardMetric {
  key: "families" | "products" | "catalogues";
  label: string;
  value: number;
  href: AdminDashboardHref;
}

export interface AdminOperationalMetric {
  key: "inquiries" | "messages";
  label: string;
}

export interface AdminDashboardModel {
  catalogueMetrics: readonly AdminDashboardMetric[];
  operationalMetrics: readonly AdminOperationalMetric[];
  readinessItems: readonly AdminReadinessItem[];
  quickRoutes: readonly { label: string; href: AdminDashboardHref }[];
}

export function getAdminDashboardModel(): AdminDashboardModel {
  return {
    catalogueMetrics: [
      { key: "families", label: "Product families", value: CATALOGUE_FAMILIES.length, href: "/admin/families" },
      { key: "products", label: "Registered products", value: CATALOGUE_PRODUCTS.length, href: "/admin/products" },
      { key: "catalogues", label: "Catalogue documents", value: CATALOGUE_DOCUMENTS.length, href: "/admin/catalogues" }
    ],
    operationalMetrics: [
      { key: "inquiries", label: "Quotation inquiries" },
      { key: "messages", label: "General messages" }
    ],
    readinessItems: ADMIN_READINESS_ITEMS,
    quickRoutes: [
      { label: "Products", href: "/admin/products" },
      { label: "Inquiries", href: "/admin/inquiries" },
      { label: "Website Content", href: "/admin/content" },
      { label: "Publishing Centre", href: "/admin/publishing" }
    ]
  };
}
