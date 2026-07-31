/*
 * Bootstrap type surface for Layer 0.
 * `pnpm contracts:generate` replaces this file from the OpenAPI document.
 */
export interface paths {
  "/v1/health": { get: { responses: { 200: { content: { "application/json": components["schemas"]["HealthResponse"] } } } } };
  "/v1/public/families": { get: { responses: { 200: { content: { "application/json": components["schemas"]["FamilyListResponse"] } } } } };
  "/v1/public/products": { get: { responses: { 200: { content: { "application/json": components["schemas"]["ProductListResponse"] } } } } };
  "/v1/public/products/{slug}": { get: { responses: { 200: { content: { "application/json": components["schemas"]["ProductDetail"] } } } } };
  "/v1/public/inquiries": {
    post: {
      requestBody: { content: { "application/json": components["schemas"]["InquiryRequest"] } };
      responses: { 201: { content: { "application/json": components["schemas"]["InquiryResponse"] } } };
    };
  };
}

export interface components {
  schemas: {
    LocalizedText: { en: string; ar: string | null };
    MediaRef: { id: string; url: string; alt: components["schemas"]["LocalizedText"]; width: number; height: number };
    HealthResponse: { status: "ok"; service: "rosa-medical-api"; version: string; timestamp: string };
    FamilySummary: { id: string; slug: string; name: components["schemas"]["LocalizedText"]; introduction: components["schemas"]["LocalizedText"]; heroImage: components["schemas"]["MediaRef"] | null };
    FamilyListResponse: { items: components["schemas"]["FamilySummary"][] };
    ProductOption: { id: string; type: "size" | "variant" | "direction" | "shape"; label: components["schemas"]["LocalizedText"]; value: string };
    ProductSummary: { id: string; slug: string; code: string; familySlug: string; name: components["schemas"]["LocalizedText"]; shortDescription: components["schemas"]["LocalizedText"]; mainImage: components["schemas"]["MediaRef"] | null; optionSummary: string[] };
    ProductDetail: components["schemas"]["ProductSummary"] & { gallery: components["schemas"]["MediaRef"][]; options: components["schemas"]["ProductOption"][]; catalogueReference: { familySlug: string; page: string | null } | null };
    ProductListResponse: { items: components["schemas"]["ProductSummary"][]; nextCursor: string | null };
    InquiryItemInput: { productId: string; quantity: number; optionIds: string[]; lineNote?: string };
    InquiryRequest: { customerName: string; companyName?: string; email: string; telephone: string; country: string; generalNotes?: string; items: components["schemas"]["InquiryItemInput"][] };
    InquiryItemSnapshot: { productId: string; productCode: string; productName: string; familyName: string; quantity: number; selectedOptions: string[]; lineNote: string | null };
    InquiryResponse: { reference: string; status: "new"; submittedAt: string; items: components["schemas"]["InquiryItemSnapshot"][] };
    ErrorEnvelope: { error: { code: string; message: string; fieldErrors?: Record<string, string[]>; requestId: string } };
  };
}
