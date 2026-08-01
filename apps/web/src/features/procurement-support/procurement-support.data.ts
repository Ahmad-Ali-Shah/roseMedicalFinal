import type { NumberedEditorialItem } from "@/features/public-editorial";

export const PROCUREMENT_STEPS = [
  {
    sequence: "01",
    title: "Browse by family",
    description: "Start with Knives, Scissors, Punches, Chisels or Cutters."
  },
  {
    sequence: "02",
    title: "Review codes and options",
    description: "Check product codes, sizes, shapes and listed variants."
  },
  {
    sequence: "03",
    title: "Add products to inquiry",
    description: "A product inquiry is intended to collect the instruments and quantities required."
  },
  {
    sequence: "04",
    title: "Add useful notes",
    description: "Include line notes or general packing, finish and destination details."
  },
  {
    sequence: "05",
    title: "Submit contact details",
    description: "A complete request includes the business information needed for follow-up."
  },
  {
    sequence: "06",
    title: "Receive confirmation",
    description: "A completed submission can provide a record for Rosa follow-up."
  }
] as const satisfies readonly NumberedEditorialItem[];

export const REQUIREMENT_TYPES = [
  {
    sequence: "01",
    title: "Product-specific inquiry",
    description: "One identified instrument with exact code and options."
  },
  {
    sequence: "02",
    title: "Multiple-product list",
    description: "Several products, quantities and line-level notes."
  },
  {
    sequence: "03",
    title: "Catalogue-led inquiry",
    description: "A request prepared while reviewing technical catalogues."
  },
  {
    sequence: "04",
    title: "Unlisted product request",
    description: "A general requirement described when the exact product is not listed."
  }
] as const satisfies readonly NumberedEditorialItem[];

export const INFORMATION_CHECKLIST = [
  "Product codes",
  "Sizes",
  "Variants",
  "Quantities",
  "Destination country",
  "Packing, finish and additional notes"
] as const;
