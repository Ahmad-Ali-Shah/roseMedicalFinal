import type { Route } from "next";
import {
  CATALOGUE_FAMILIES,
  CATALOGUE_PRODUCTS
} from "@/features/catalogue-registry";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";
import type { AdminStatusTone } from "@/features/admin-primitives";

export interface AdminDashboardMetric {
  key: "families" | "products" | "catalogues";
  label: string;
  value: number;
  href: Route<string>;
}

export interface AdminOperationalMetric {
  key: "inquiries" | "messages";
  label: string;
}

export interface AdminReadinessItem {
  key: "contact" | "pdfs" | "media" | "legal" | "arabic";
  label: string;
  status:
    | "Awaiting confirmation"
    | "Awaiting publication"
    | "Awaiting replacement"
    | "Awaiting legal approval"
    | "Deferred";
  tone: Extract<AdminStatusTone, "neutral" | "warning">;
}

export interface AdminDashboardModel {
  catalogueMetrics: readonly AdminDashboardMetric[];
  operationalMetrics: readonly AdminOperationalMetric[];
  readinessItems: readonly AdminReadinessItem[];
  quickRoutes: readonly { label: string; href: Route<string> }[];
}

export function getAdminDashboardModel(): AdminDashboardModel {
  return {
    catalogueMetrics: [
      {
        key: "families",
        label: "Product families",
        value: CATALOGUE_FAMILIES.length,
        href: "/admin/families"
      },
      {
        key: "products",
        label: "Registered products",
        value: CATALOGUE_PRODUCTS.length,
        href: "/admin/products"
      },
      {
        key: "catalogues",
        label: "Catalogue documents",
        value: CATALOGUE_DOCUMENTS.length,
        href: "/admin/catalogues"
      }
    ],
    operationalMetrics: [
      { key: "inquiries", label: "Quotation inquiries" },
      { key: "messages", label: "General messages" }
    ],
    readinessItems: [
      {
        key: "contact",
        label: "Contact information",
        status: "Awaiting confirmation",
        tone: "warning"
      },
      {
        key: "pdfs",
        label: "Catalogue PDF paths",
        status: "Awaiting publication",
        tone: "warning"
      },
      {
        key: "media",
        label: "Product media",
        status: "Awaiting replacement",
        tone: "warning"
      },
      {
        key: "legal",
        label: "Privacy and Terms",
        status: "Awaiting legal approval",
        tone: "warning"
      },
      {
        key: "arabic",
        label: "Arabic content",
        status: "Deferred",
        tone: "neutral"
      }
    ],
    quickRoutes: [
      { label: "Products", href: "/admin/products" },
      { label: "Inquiries", href: "/admin/inquiries" },
      { label: "Website Content", href: "/admin/content" },
      { label: "Publishing Centre", href: "/admin/publishing" }
    ]
  };
}
