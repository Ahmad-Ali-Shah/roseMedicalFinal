import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  QuotationBlockedPage,
  QuotationFormPreview,
  QuotationSuccessPreview,
  QuotationValidationPreview
} from "@/features/quotation-preview";

describe("F3C quotation previews", () => {
  it("renders a read-only form preview with a disabled submit action", () => {
    const html = renderToStaticMarkup(<QuotationFormPreview />);

    expect(html).toContain("data-preview-only");
    expect(html).toContain("readonly");
    expect(html).toContain("disabled");
    expect(html).toContain("18-0644");
    expect(html).not.toContain("onSubmit");
  });

  it("connects validation errors to invalid fields", () => {
    const html = renderToStaticMarkup(<QuotationValidationPreview />);

    expect((html.match(/aria-invalid="true"/g) ?? [])).toHaveLength(2);
    expect(html).toContain('aria-describedby="quotation-preview-invalid-email-error"');
    expect(html).toContain('id="quotation-preview-invalid-email-error"');
  });

  it("does not invent a reference or email claim in the default success preview", () => {
    const html = renderToStaticMarkup(<QuotationSuccessPreview />);

    expect(html).not.toContain("RM-2026");
    expect(html).not.toContain("was sent to");
    expect(html).toContain("No request, reference or email delivery");
  });

  it("renders a blocked public page without a form or submit button", () => {
    const html = renderToStaticMarkup(<QuotationBlockedPage />);

    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).not.toContain("<form");
    expect(html).not.toContain("Submit quotation request");
    expect(html).toContain('href="/products"');
    expect(html).toContain('href="/catalogues"');
    expect(html).toContain('href="/inquiry"');
  });
});
