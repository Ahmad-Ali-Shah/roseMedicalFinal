import type { CatalogueProductRecord } from "../types";

export const SCISSOR_PRODUCTS = [
  {
    id: "product_mayo_scissors",
    familySlug: "scissors",
    slug: "mayo-scissors",
    name: "Mayo Scissors",
    code: "04-0402",
    description:
      "Catalogue-listed Mayo Scissors presented with the stated length and direction.",
    sizes: ["17 cm"],
    variants: ["Regular"],
    directions: ["Straight"],
    primaryOption: "17 cm",
    catalogueReference: { family: "Scissors", page: "2" },
    mediaLabel: "Mayo Scissors placeholder"
  },
  {
    id: "product_iris_scissors",
    familySlug: "scissors",
    slug: "iris-scissors",
    name: "Iris Scissors",
    code: "04-0901",
    description:
      "Catalogue-listed Iris Scissors presented with the stated length, direction and point option.",
    sizes: ["10.5 cm"],
    variants: ["Regular", "Sharp"],
    directions: ["Straight"],
    primaryOption: "10.5 cm",
    catalogueReference: { family: "Scissors", page: "1" },
    mediaLabel: "Iris Scissors placeholder"
  },
  {
    id: "product_sims_scissors",
    familySlug: "scissors",
    slug: "sims-scissors",
    name: "Sims Scissors",
    code: "04-0701",
    description:
      "Catalogue-listed Sims Scissors presented with the stated length and direction.",
    sizes: ["20 cm"],
    variants: ["Regular"],
    directions: ["Straight"],
    primaryOption: "20 cm",
    catalogueReference: { family: "Scissors", page: "4" },
    mediaLabel: "Sims Scissors placeholder"
  },
  {
    id: "product_pottsmith_scissors",
    familySlug: "scissors",
    slug: "pottsmith-scissors",
    name: "Pottsmith Scissors",
    code: "04-3701",
    description:
      "Catalogue-listed Pottsmith Scissors presented with the stated angle.",
    sizes: [],
    variants: ["Regular"],
    directions: ["25° angled"],
    primaryOption: "25° angled",
    catalogueReference: { family: "Scissors", page: "10" },
    mediaLabel: "Pottsmith Scissors placeholder"
  }
] as const satisfies readonly CatalogueProductRecord[];
