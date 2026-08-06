import {
  CATALOGUE_FAMILIES,
  type CatalogueFamilyRecord
} from "@/features/catalogue-registry";
import { familyHref, type FamilySlug, type PublicMediaModel } from "@/features/public-catalogue";
import { CATALOGUE_MEDIA_BY_SLUG } from "@/features/public-media";

export interface CatalogueDocument {
  familySlug: FamilySlug;
  sequence: CatalogueFamilyRecord["sequence"];
  name: string;
  description: string;
  coverLabel: string;
  media: PublicMediaModel;
  sourceStatus: "Technical family catalogue";
  familyHref: ReturnType<typeof familyHref>;
  pdfPath: string;
}

const PDF_PATH_BY_FAMILY = {
  knives: "/media/catalogues/pdf/rosa-knives-catalogue.pdf",
  scissors: "/media/catalogues/pdf/rosa-scissors-catalogue.pdf",
  punches: "/media/catalogues/pdf/rosa-punches-catalogue.pdf",
  chisels: "/media/catalogues/pdf/rosa-chisels-catalogue.pdf",
  cutters: "/media/catalogues/pdf/rosa-cutters-catalogue.pdf"
} as const satisfies Record<FamilySlug, string>;

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
    media: CATALOGUE_MEDIA_BY_SLUG[family.slug],
    sourceStatus: "Technical family catalogue",
    familyHref: familyHref(family.slug),
    pdfPath: PDF_PATH_BY_FAMILY[family.slug]
  }));

export function getCatalogueDocument(
  familySlug: string
): CatalogueDocument | undefined {
  return CATALOGUE_DOCUMENTS.find(
    (document) => document.familySlug === familySlug
  );
}
