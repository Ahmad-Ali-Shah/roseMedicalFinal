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
});
