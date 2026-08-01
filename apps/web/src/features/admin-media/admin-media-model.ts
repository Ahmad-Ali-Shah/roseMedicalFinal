import type { Route } from "next";
import {
  CATALOGUE_FAMILIES,
  CATALOGUE_PRODUCTS
} from "@/features/catalogue-registry";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";
import {
  adminCatalogueHref,
  adminFamilyHref,
  adminProductHref
} from "@/features/admin-management-routing/admin-management-hrefs";

export type AdminMediaRequirement =
  | {
      kind: "product";
      key: string;
      label: string;
      sourceLabel: string;
      adminHref: Route<string>;
    }
  | {
      kind: "catalogue-cover";
      key: string;
      label: string;
      sourceLabel: string;
      adminHref: Route<string>;
    }
  | {
      kind: "family-imagery";
      key: string;
      label: string;
      sourceLabel: "No managed asset registered";
      adminHref: Route<string>;
    };

export function getAdminMediaRequirements(): readonly AdminMediaRequirement[] {
  return [
    ...CATALOGUE_PRODUCTS.map((product) => ({
      kind: "product" as const,
      key: `product-${product.id}`,
      label: `${product.name} product media requirement`,
      sourceLabel: product.mediaLabel,
      adminHref: adminProductHref(product)
    })),
    ...CATALOGUE_DOCUMENTS.map((document) => ({
      kind: "catalogue-cover" as const,
      key: `catalogue-${document.familySlug}`,
      label: `${document.name} cover requirement`,
      sourceLabel: document.coverLabel,
      adminHref: adminCatalogueHref(document.familySlug)
    })),
    ...CATALOGUE_FAMILIES.map((family) => ({
      kind: "family-imagery" as const,
      key: `family-${family.slug}`,
      label: `${family.name} family imagery requirement`,
      sourceLabel: "No managed asset registered" as const,
      adminHref: adminFamilyHref(family.slug)
    }))
  ];
}
