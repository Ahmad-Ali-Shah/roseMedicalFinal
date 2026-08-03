import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("public quotation slice", () => {
  it("routes the inquiry page to a live editable inquiry composition", () => {
    const routing = source("src/features/public-routing/resolve-public-page.tsx");
    const inquiryPage = source("src/features/inquiry/inquiry-page.tsx");

    expect(routing).toContain("<InquiryPage />");
    expect(inquiryPage).toContain("readInquiry()");
    expect(inquiryPage).toContain("updateInquiryItem");
    expect(inquiryPage).toContain("removeInquiryItem");
    expect(inquiryPage).toContain('href="/request-quotation"');
    expect(inquiryPage).not.toContain("data-preview-only");
  });

  it("routes quotation requests to a live form and clears only after success", () => {
    const routing = source("src/features/public-routing/resolve-public-page.tsx");
    const quotationPage = source("src/features/inquiry/quotation-page.tsx");

    expect(routing).toContain("<QuotationPage />");
    expect(quotationPage).toContain('fetch("/api/checkout"');
    expect(quotationPage).toContain("response.ok");
    expect(quotationPage).toContain("clearInquiry()");
    expect(quotationPage).toContain("Submit quotation request");
    expect(quotationPage).not.toContain("data-preview-only");
  });

  it("keeps the public insertion boundary controlled and anonymous", () => {
    const route = source("src/app/api/checkout/route.ts");
    expect(route).toContain("normalizeQuotationPayload");
    expect(route).toContain("createAdminClient");
    expect(route).toContain("status: 201");
    expect(route).toContain("status: 409");
    expect(route).toContain("user_id: null");
    expect(route).not.toContain("Auth required");
  });

  it("does not commit the temporary owner password", () => {
    const auth = source("src/lib/supabase/api-auth.ts");
    expect(auth).toContain("ahmadaliofficial1155@gmail.com");
    expect(auth).not.toContain("Admin123");
  });
});
