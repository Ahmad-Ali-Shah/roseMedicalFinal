import type { CatalogueProductRecord } from "../types";

export const CUTTER_PRODUCTS = [
  {
    id: "product_liston",
    familySlug: "cutters",
    slug: "liston",
    name: "Liston",
    code: "36-5101",
    description:
      "Catalogue-listed Liston pattern presented with the stated length and direction.",
    sizes: ["14.0 cm"],
    variants: [],
    directions: ["Straight"],
    primaryOption: "14.0 cm",
    catalogueReference: { family: "Cutters", page: "1" },
    mediaLabel: "Liston placeholder"
  },
  {
    id: "product_cleveland",
    familySlug: "cutters",
    slug: "cleveland",
    name: "Cleveland",
    code: "36-5401",
    description:
      "Catalogue-listed Cleveland pattern presented with the stated length.",
    sizes: ["15.0 cm"],
    variants: [],
    directions: [],
    primaryOption: "15.0 cm",
    catalogueReference: { family: "Cutters", page: "1" },
    mediaLabel: "Cleveland placeholder"
  },
  {
    id: "product_bohler",
    familySlug: "cutters",
    slug: "bohler",
    name: "Bohler",
    code: "36-5501",
    description:
      "Catalogue-listed Bohler pattern presented with the stated length and direction.",
    sizes: ["15.0 cm"],
    variants: [],
    directions: ["Straight"],
    primaryOption: "15.0 cm",
    catalogueReference: { family: "Cutters", page: "1" },
    mediaLabel: "Bohler placeholder"
  },
  {
    id: "product_sc_01t",
    familySlug: "cutters",
    slug: "sc-01t",
    name: "SC-01T",
    code: "SC-01T",
    description:
      "Catalogue-listed SC-01T pattern presented with the stated length, point and direction.",
    sizes: ["12.5 cm"],
    variants: ["Fine point"],
    directions: ["Straight"],
    primaryOption: "12.5 cm",
    catalogueReference: { family: "Cutters", page: "10" },
    mediaLabel: "SC-01T placeholder"
  }
] as const satisfies readonly CatalogueProductRecord[];
