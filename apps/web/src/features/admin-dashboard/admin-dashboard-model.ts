import type { Route } from "next";
import { CATALOGUE_FAMILIES, CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";

export interface AdminDashboardMetric {
  key: "families" | "products" | "catalogues";
  label: string;
  value: number;
  href: Route<string>;
}

export interface AdminOperationalMetric {
  key: "inquiries" | "messages";
  label: string;
  value?: number;
}

export interface AdminDashboardModel {
  catalogueMetrics: readonly AdminDashboardMetric[];
  operationalMetrics: readonly AdminOperationalMetric[];
  quickRoutes: readonly { label: string; href: Route<string> }[];
}

const route = (href: string) => href as Route<string>;

export function getAdminDashboardModel(): AdminDashboardModel {
  return {
    catalogueMetrics: [
      { key: "families", label: "Product families", value: CATALOGUE_FAMILIES.length, href: route("/admin/families") },
      { key: "products", label: "Registered products", value: CATALOGUE_PRODUCTS.length, href: route("/admin/products") },
      { key: "catalogues", label: "Catalogue documents", value: CATALOGUE_DOCUMENTS.length, href: route("/admin/catalogues") }
    ],
    operationalMetrics: [
      { key: "inquiries", label: "Quotation inquiries" },
      { key: "messages", label: "General messages" }
    ],
    quickRoutes: [
      { label: "Products", href: route("/admin/products") },
      { label: "Families", href: route("/admin/families") },
      { label: "Catalogues", href: route("/admin/catalogues") },
      { label: "Inquiries", href: route("/admin/inquiries") },
      { label: "Messages", href: route("/admin/messages") },
      { label: "Contact details", href: route("/admin/contact-details") }
    ]
  };
}
