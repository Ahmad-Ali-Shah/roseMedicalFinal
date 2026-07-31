import type { components } from "../generated/schema";

export const familyFixtures = [
  { id: "family_knives", slug: "knives", name: { en: "Knives", ar: null }, introduction: { en: "Precision cutting instruments organised for professional inquiry.", ar: null }, heroImage: null },
  { id: "family_scissors", slug: "scissors", name: { en: "Scissors", ar: null }, introduction: { en: "Surgical scissors presented by code, size and variant.", ar: null }, heroImage: null },
  { id: "family_punches", slug: "punches", name: { en: "Punches", ar: null }, introduction: { en: "Punch instruments with clear catalogue references.", ar: null }, heroImage: null },
  { id: "family_chisels", slug: "chisels", name: { en: "Chisels", ar: null }, introduction: { en: "Chisels structured for straightforward product review.", ar: null }, heroImage: null },
  { id: "family_cutters", slug: "cutters", name: { en: "Cutters", ar: null }, introduction: { en: "Cutting instruments prepared for quotation requests.", ar: null }, heroImage: null }
] satisfies components["schemas"]["FamilySummary"][];
