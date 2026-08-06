import type { CatalogueProductRecord } from "@/features/catalogue-registry/types";

type OwnerProductMedia = Pick<
  CatalogueProductRecord,
  "mediaPath" | "mediaSourceUrl" | "mediaReviewNote"
>;

function catalogueMedia(
  mediaPath: string,
  family: string,
  page: number,
  reviewNote: string
): OwnerProductMedia {
  return {
    mediaPath,
    mediaSourceUrl: `/media/catalogues/pdf/rosa-${family}-catalogue.pdf#page=${page}`,
    mediaReviewNote: `exact · owner-supplied catalogue · transparent · approved · ${reviewNote}`
  };
}

export const OWNER_CATALOGUE_PRODUCT_MEDIA = {
  product_scalpel_handle_3: catalogueMedia(
    "/media/catalogue-preview/knives/owner-scalpel-handle-no-3.png",
    "knives",
    3,
    "Code 18-0644 is listed beside the extracted handle configuration."
  ),
  product_bard_parker_handle: {
    mediaPath: "/media/catalogue-preview/knives/owner-bard-parker-handle.png",
    mediaSourceUrl: "/media/catalogues/pdf/rosa-knives-catalogue.pdf#page=3",
    mediaReviewNote:
      "acceptable-similar · owner-supplied catalogue · transparent · approved · Catalogue handle selected as the closest safe visual for this legacy record."
  },
  product_amputation_knife: {
    mediaPath: "/media/catalogue-preview/knives/owner-amputation-knife.png",
    mediaSourceUrl:
      "https://medicalinst.net/product/amputation-knife-19cm-blade/",
    mediaReviewNote:
      "strong-match · manufacturer product page · transparent · approved · Background-only extraction from the referenced product photograph."
  },
  product_resection_knife: {
    mediaPath: "/media/catalogue-preview/knives/owner-resection-knife.png",
    mediaSourceUrl: "https://www.surgical-design.com/products/resection-knife",
    mediaReviewNote:
      "strong-match · manufacturer product page · transparent · approved · Background-only extraction from the referenced product photograph."
  },
  product_biopsy_punch: catalogueMedia(
    "/media/catalogue-preview/punches/owner-biopsy-punch.png",
    "punches",
    24,
    "Complete Biopsy Instruments configuration retained with its catalogue tip details."
  ),
  product_codman: catalogueMedia(
    "/media/catalogue-preview/chisels/owner-codman.png",
    "chisels",
    6,
    "Codman straight and curved profiles are retained as printed."
  ),
  product_lambotte: catalogueMedia(
    "/media/catalogue-preview/chisels/owner-lambotte.png",
    "chisels",
    6,
    "Complete straight Lambotte instrument is retained."
  ),
  product_mini_lambotte: catalogueMedia(
    "/media/catalogue-preview/chisels/owner-mini-lambotte.png",
    "chisels",
    7,
    "Mini Lambotte straight profile is retained."
  ),
  product_farabeuf: catalogueMedia(
    "/media/catalogue-preview/chisels/owner-farabeuf.png",
    "chisels",
    11,
    "Farabeuf straight and curved catalogue presentation is retained."
  ),
  product_sc_01t: catalogueMedia(
    "/media/catalogue-preview/cutters/owner-sc-01t.png",
    "cutters",
    11,
    "First printed cutter configuration corresponds to SC-01T."
  )
} as const satisfies Record<string, OwnerProductMedia>;
