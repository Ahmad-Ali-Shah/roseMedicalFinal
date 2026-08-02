import {
  CATALOGUE_FAMILIES,
  type CatalogueFamilyRecord
} from "@/features/catalogue-registry";
import { familyHref, type FamilySlug } from "@/features/public-catalogue";

export interface CatalogueDocument {
  familySlug: FamilySlug;
  sequence: CatalogueFamilyRecord["sequence"];
  name: string;
  description: string;
  coverLabel: string;
  sourceStatus: "Technical family catalogue";
  familyHref: ReturnType<typeof familyHref>;
  pdfPath?: string;
}

const DESCRIPTION_BY_FAMILY: Record<FamilySlug, string> = {
  knives: "Precision cutting instruments and handles.",
  scissors: "Scissors organised by listed pattern, size and configuration.",
  punches: "Punch instruments organised by pattern and dimensions.",
  chisels: "Chisels and osteotomes organised by form and size.",
  cutters: "Cutting instruments organised by pattern, size and direction."
};

export const CATALOGUE_DOCUMENTS: readonly CatalogueDocument[] =
  CATALOGUE_FAMILIES.map((family) => ({
    familySlug: family.slug,
    sequence: family.sequence,
    name: family.name,
    description: DESCRIPTION_BY_FAMILY[family.slug],
    coverLabel: `${family.name} technical catalogue`,
    sourceStatus: "Technical family catalogue",
    familyHref: familyHref(family.slug)
  }));

export function getCatalogueDocument(
  familySlug: string
): CatalogueDocument | undefined {
  return CATALOGUE_DOCUMENTS.find(
    (document) => document.familySlug === familySlug
  );
}
