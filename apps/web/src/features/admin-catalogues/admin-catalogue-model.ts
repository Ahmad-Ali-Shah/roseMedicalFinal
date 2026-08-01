import type { Route } from "next";
import {
  CATALOGUE_FAMILIES,
  type CatalogueFamilyRecord
} from "@/features/catalogue-registry";
import {
  CATALOGUE_DOCUMENTS,
  getCatalogueDocument,
  type CatalogueDocument
} from "@/features/catalogues";
import { familyHref } from "@/features/public-catalogue";
import { adminCatalogueHref } from "@/features/admin-management-routing/admin-management-hrefs";

export type AdminCatalogueAvailability =
  | "Public PDF path registered"
  | "Awaiting publication";

export interface AdminCatalogueRow {
  familySlug: CatalogueDocument["familySlug"];
  sequence: CatalogueDocument["sequence"];
  familyName: string;
  name: string;
  description: string;
  coverLabel: string;
  sourceStatus: CatalogueDocument["sourceStatus"];
  availability: AdminCatalogueAvailability;
  publicCataloguesHref: Route<string>;
  publicFamilyHref: Route<string>;
  adminHref: Route<string>;
}

export interface AdminCatalogueEditorModel {
  family: CatalogueFamilyRecord;
  document: CatalogueDocument;
  availability: AdminCatalogueAvailability;
  publicCataloguesHref: Route<string>;
  publicFamilyHref: Route<string>;
}

const familyBySlug = new Map(
  CATALOGUE_FAMILIES.map((family) => [family.slug, family] as const)
);

function availabilityFor(
  document: CatalogueDocument
): AdminCatalogueAvailability {
  return document.pdfPath
    ? "Public PDF path registered"
    : "Awaiting publication";
}

export function getAdminCatalogueRows(): readonly AdminCatalogueRow[] {
  return CATALOGUE_DOCUMENTS.map((document) => {
    const family = familyBySlug.get(document.familySlug);
    if (!family) {
      throw new Error(`Unknown catalogue family: ${document.familySlug}`);
    }

    return {
      familySlug: document.familySlug,
      sequence: document.sequence,
      familyName: family.name,
      name: document.name,
      description: document.description,
      coverLabel: document.coverLabel,
      sourceStatus: document.sourceStatus,
      availability: availabilityFor(document),
      publicCataloguesHref: "/catalogues" as Route<string>,
      publicFamilyHref: familyHref(document.familySlug),
      adminHref: adminCatalogueHref(document.familySlug)
    };
  });
}

export function getAdminCatalogueEditor(
  familySlug: string
): AdminCatalogueEditorModel | undefined {
  const document = getCatalogueDocument(familySlug);
  const family = document ? familyBySlug.get(document.familySlug) : undefined;
  if (!document || !family) return undefined;

  return {
    family,
    document,
    availability: availabilityFor(document),
    publicCataloguesHref: "/catalogues" as Route<string>,
    publicFamilyHref: familyHref(document.familySlug)
  };
}
