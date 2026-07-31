import type { CatalogueProductRecord } from "../types";

export const KNIFE_PRODUCTS = [
  {
    id: "product_scalpel_handle_3",
    familySlug: "knives",
    slug: "scalpel-handle-no-3",
    name: "Scalpel Handle No. 3",
    code: "18-0644",
    description:
      "Catalogue-listed Scalpel Handle No. 3 presented with the stated dimensions and option for quotation review.",
    sizes: ["14.5 cm"],
    variants: ["Standard"],
    directions: [],
    primaryOption: "14.5 cm",
    catalogueReference: { family: "Knives", page: "6" },
    mediaLabel: "Scalpel Handle No. 3 placeholder"
  },
  {
    id: "product_bard_parker_handle",
    familySlug: "knives",
    slug: "bard-parker-handle",
    name: "Bard Parker Handle",
    code: "18-0650",
    description:
      "Catalogue-listed Bard Parker Handle presented with the stated dimensions and option for quotation review.",
    sizes: ["14.5 cm"],
    variants: ["Standard"],
    directions: [],
    primaryOption: "14.5 cm",
    catalogueReference: { family: "Knives" },
    mediaLabel: "Bard Parker Handle placeholder"
  },
  {
    id: "product_amputation_knife",
    familySlug: "knives",
    slug: "amputation-knife",
    name: "Amputation Knife",
    code: "18-1202",
    description:
      "Catalogue-listed Amputation Knife presented with the stated dimensions and option for quotation review.",
    sizes: ["14.5 cm"],
    variants: ["Standard"],
    directions: [],
    primaryOption: "14.5 cm",
    catalogueReference: { family: "Knives" },
    mediaLabel: "Amputation Knife placeholder"
  },
  {
    id: "product_resection_knife",
    familySlug: "knives",
    slug: "resection-knife",
    name: "Resection Knife",
    code: "18-1404",
    description:
      "Catalogue-listed Resection Knife presented with the stated dimensions and option for quotation review.",
    sizes: ["14.5 cm"],
    variants: ["Standard"],
    directions: [],
    primaryOption: "14.5 cm",
    catalogueReference: { family: "Knives" },
    mediaLabel: "Resection Knife placeholder"
  }
] as const satisfies readonly CatalogueProductRecord[];
