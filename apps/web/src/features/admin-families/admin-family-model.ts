import type { Route } from "next";
import {
  CATALOGUE_FAMILIES,
  CATALOGUE_PRODUCTS,
  getFamilyListingModel,
  type CatalogueFamilyRecord,
  type CatalogueProductRecord
} from "@/features/catalogue-registry";
import { getCatalogueDocument } from "@/features/catalogues";
import { familyHref } from "@/features/public-catalogue";
import {
  adminCatalogueHref,
  adminFamilyHref
} from "@/features/admin-management-routing/admin-management-hrefs";

export interface AdminFamilyRow {
  slug: CatalogueFamilyRecord["slug"];
  sequence: CatalogueFamilyRecord["sequence"];
  name: string;
  introduction: string;
  catalogueLabel: string;
  productCount: number;
  publicHref: Route<string>;
  adminHref: Route<string>;
}

export interface AdminFamilyEditorModel {
  family: CatalogueFamilyRecord;
  products: readonly CatalogueProductRecord[];
  productCount: number;
  publicHref: Route<string>;
  adminCatalogueHref: Route<string>;
  pdfAvailability: "Public PDF path registered" | "Awaiting publication";
}

export function getAdminFamilyRows(): readonly AdminFamilyRow[] {
  return CATALOGUE_FAMILIES.map((family) => ({
    slug: family.slug,
    sequence: family.sequence,
    name: family.name,
    introduction: family.introduction,
    catalogueLabel: family.catalogueLabel,
    productCount: CATALOGUE_PRODUCTS.filter(
      (product) => product.familySlug === family.slug
    ).length,
    publicHref: familyHref(family.slug),
    adminHref: adminFamilyHref(family.slug)
  }));
}

export function getAdminFamilyEditor(
  familySlug: string
): AdminFamilyEditorModel | undefined {
  const result = getFamilyListingModel(familySlug);
  const document = getCatalogueDocument(familySlug);
  if (result.kind !== "family" || !document) return undefined;

  return {
    family: result.family,
    products: result.products,
    productCount: result.products.length,
    publicHref: familyHref(result.family.slug),
    adminCatalogueHref: adminCatalogueHref(result.family.slug),
    pdfAvailability: document.pdfPath
      ? "Public PDF path registered"
      : "Awaiting publication"
  };
}
