import type { CatalogueProductRecord } from "../types";

export const PUNCH_PRODUCTS = [
  {
    id: "product_yeoman",
    familySlug: "punches",
    slug: "yeoman",
    name: "Yeoman",
    code: "21-1001",
    description:
      "Catalogue-listed Yeoman instrument presented with the stated shaft length and jaw pattern.",
    sizes: ["28.0 cm"],
    variants: ["Standard jaw"],
    directions: [],
    primaryOption: "28.0 cm",
    catalogueReference: { family: "Punches", page: "1" },
    mediaLabel: "Yeoman placeholder"
  },
  {
    id: "product_yeoman_perforated",
    familySlug: "punches",
    slug: "yeoman-perforated",
    name: "Yeoman, Perforated",
    code: "21-1101",
    description:
      "Catalogue-listed Yeoman instrument presented with the stated shaft length and perforated jaw pattern.",
    sizes: ["28.0 cm"],
    variants: ["Perforated jaw"],
    directions: [],
    primaryOption: "28.0 cm",
    catalogueReference: { family: "Punches", page: "1" },
    mediaLabel: "Yeoman perforated placeholder"
  },
  {
    id: "product_yeoman_rectangular",
    familySlug: "punches",
    slug: "yeoman-rectangular",
    name: "Yeoman, Rectangular",
    code: "21-1201",
    description:
      "Catalogue-listed Yeoman instrument presented with the stated shaft length and rectangular jaw pattern.",
    sizes: ["28.0 cm"],
    variants: ["Rectangular jaw"],
    directions: [],
    primaryOption: "28.0 cm",
    catalogueReference: { family: "Punches", page: "1" },
    mediaLabel: "Yeoman rectangular placeholder"
  },
  {
    id: "product_biopsy_punch",
    familySlug: "punches",
    slug: "biopsy-punch",
    name: "Biopsy Punch",
    code: "23-1204",
    description:
      "Catalogue-listed Biopsy Punch presented with the stated diameter.",
    sizes: ["4 mm"],
    variants: [],
    directions: [],
    primaryOption: "4 mm",
    catalogueReference: { family: "Punches" },
    mediaLabel: "Biopsy Punch placeholder"
  }
] as const satisfies readonly CatalogueProductRecord[];
