import type { CatalogueProductRecord } from "../types";

export const CHISEL_PRODUCTS = [
  {
    id: "product_codman",
    familySlug: "chisels",
    slug: "codman",
    name: "Codman",
    code: "36-7101",
    description:
      "Catalogue-listed Codman pattern presented with the stated length and direction.",
    sizes: ["28 cm"],
    variants: [],
    directions: ["Straight"],
    primaryOption: "28 cm",
    catalogueReference: { family: "Chisels", page: "5" },
    mediaLabel: "Codman placeholder"
  },
  {
    id: "product_lambotte",
    familySlug: "chisels",
    slug: "lambotte",
    name: "Lambotte",
    code: "36-7201",
    description:
      "Catalogue-listed Lambotte pattern presented with the stated length, width and direction.",
    sizes: ["25.0 cm", "4 mm"],
    variants: [],
    directions: ["Straight"],
    primaryOption: "4 mm",
    catalogueReference: { family: "Chisels", page: "5" },
    mediaLabel: "Lambotte placeholder"
  },
  {
    id: "product_mini_lambotte",
    familySlug: "chisels",
    slug: "mini-lambotte",
    name: "Mini Lambotte",
    code: "36-7214",
    description:
      "Catalogue-listed Mini Lambotte pattern presented with the stated length, width and direction.",
    sizes: ["12.5 cm", "2 mm"],
    variants: [],
    directions: ["Straight"],
    primaryOption: "2 mm",
    catalogueReference: { family: "Chisels", page: "6" },
    mediaLabel: "Mini Lambotte placeholder"
  },
  {
    id: "product_farabeuf",
    familySlug: "chisels",
    slug: "farabeuf",
    name: "Farabeuf",
    code: "37-0701",
    description:
      "Catalogue-listed Farabeuf pattern presented with the stated length and direction.",
    sizes: ["15.0 cm"],
    variants: [],
    directions: ["Straight"],
    primaryOption: "15.0 cm",
    catalogueReference: { family: "Chisels", page: "10" },
    mediaLabel: "Farabeuf placeholder"
  }
] as const satisfies readonly CatalogueProductRecord[];
