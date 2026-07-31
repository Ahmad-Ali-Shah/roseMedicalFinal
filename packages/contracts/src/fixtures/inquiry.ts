import type { components } from "../generated/schema";

export const inquiryRequestFixture = {
  customerName: "Sample Buyer",
  companyName: "Sample Procurement Company",
  email: "buyer@example.com",
  telephone: "+966 50 000 0000",
  country: "Saudi Arabia",
  generalNotes: "Please confirm available packing options.",
  items: [
    { productId: "product_scalpel_handle_3", quantity: 2, optionIds: ["size_145", "variant_standard"], lineNote: "Standard finish" }
  ]
} satisfies components["schemas"]["InquiryRequest"];

export const inquiryResponseFixture = {
  reference: "RM-2026-0001",
  status: "new",
  submittedAt: "2026-07-31T00:00:00.000Z",
  items: [
    { productId: "product_scalpel_handle_3", productCode: "18-0644", productName: "Scalpel Handle No. 3", familyName: "Knives", quantity: 2, selectedOptions: ["14.5 cm", "Standard"], lineNote: "Standard finish" }
  ]
} satisfies components["schemas"]["InquiryResponse"];
