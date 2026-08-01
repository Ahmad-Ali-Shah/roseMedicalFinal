import type { NumberedEditorialItem } from "@/features/public-editorial";

export const BUYER_EXPECTATIONS = [
  {
    sequence: "01",
    title: "Clear product codes",
    description: "Identify instruments without relying on vague descriptions."
  },
  {
    sequence: "02",
    title: "Organised families",
    description: "Browse Knives, Scissors, Punches, Chisels and Cutters."
  },
  {
    sequence: "03",
    title: "Catalogue access",
    description: "Use technical catalogues alongside the website catalogue."
  },
  {
    sequence: "04",
    title: "Structured requests",
    description: "Prepare products, quantities, variants and notes in one inquiry."
  },
  {
    sequence: "05",
    title: "Responsive communication",
    description: "Send complete requirements through a clear business process."
  }
] as const satisfies readonly NumberedEditorialItem[];

export const SUPPORTED_BUYERS = [
  { sequence: "01", title: "Hospitals and clinics" },
  { sequence: "02", title: "Procurement teams" },
  { sequence: "03", title: "Distributors and wholesalers" },
  { sequence: "04", title: "International buyers" }
] as const;
