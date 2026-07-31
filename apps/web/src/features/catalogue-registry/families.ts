import type { CatalogueFamilyRecord } from "./types";

export const CATALOGUE_FAMILIES = [
  {
    slug: "knives",
    sequence: "01",
    name: "Knives",
    introduction:
      "Precision cutting instruments presented with clear product codes, stated sizes and available variants for quotation preparation.",
    catalogueLabel: "Knives catalogue"
  },
  {
    slug: "scissors",
    sequence: "02",
    name: "Scissors",
    introduction:
      "Surgical scissors organised by product code, length, direction and listed variant.",
    catalogueLabel: "Scissors catalogue"
  },
  {
    slug: "punches",
    sequence: "03",
    name: "Punches",
    introduction:
      "Punch instruments organised by jaw pattern, shaft length and catalogue reference.",
    catalogueLabel: "Punches catalogue"
  },
  {
    slug: "chisels",
    sequence: "04",
    name: "Chisels",
    introduction:
      "Chisels and osteotomes organised by pattern, width, length and listed direction.",
    catalogueLabel: "Chisels catalogue"
  },
  {
    slug: "cutters",
    sequence: "05",
    name: "Cutters",
    introduction:
      "Cutting instruments organised by named pattern, length and listed direction or profile.",
    catalogueLabel: "Cutters catalogue"
  }
] as const satisfies readonly CatalogueFamilyRecord[];
