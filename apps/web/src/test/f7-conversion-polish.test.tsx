import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("F7 inquiry and quotation conversion polish", () => {
  it("keeps inquiry storage updates immediate while animating line layout", () => {
    const inquiry = source("src/features/inquiry/inquiry-page.tsx");

    expect(inquiry).toContain("AnimatePresence");
    expect(inquiry).toContain("motion.article");
    expect(inquiry).toContain("layout");
    expect(inquiry).toContain("setItems(updateInquiryItem(item.id, { quantity: item.quantity - 1 }))");
    expect(inquiry).toContain("setItems(updateInquiryItem(item.id, { quantity: item.quantity + 1 }))");
    expect(inquiry).toContain("setItems(updateInquiryItem(item.id, { notes: event.target.value }))");
    expect(inquiry).toContain("setItems(removeInquiryItem(item.id))");
    expect(inquiry).toContain("clearInquiry(); setItems([]);");
    expect(inquiry).toContain('href="/request-quotation"');
  });

  it("animates accurate quantity and total outputs without delaying state", () => {
    const inquiry = source("src/features/inquiry/inquiry-page.tsx");

    expect(inquiry).toContain("motion.output");
    expect(inquiry).toContain("item.quantity");
    expect(inquiry).toContain("totalQuantity");
    expect(inquiry).toContain('aria-live="polite"');
    expect(inquiry).toContain('data-conversion-state="ready"');
  });

  it("preserves the quotation POST boundary and clears inquiry only after success", () => {
    const quotation = source("src/features/inquiry/quotation-page.tsx");
    const failedResponse = quotation.indexOf("if (!response.ok)");
    const clear = quotation.indexOf("clearInquiry();");

    expect(quotation).toContain('fetch("/api/checkout"');
    expect(quotation).toContain('method: "POST"');
    expect(quotation).toContain("items");
    expect(failedResponse).toBeGreaterThan(-1);
    expect(clear).toBeGreaterThan(failedResponse);
    expect(quotation).toContain("setState(\"success\")");
    expect(quotation).toContain("setState(\"error\")");
    expect(quotation).toContain('href="/inquiry"');
  });

  it("reveals fieldsets and morphs submission and success states without changing form semantics", () => {
    const quotation = source("src/features/inquiry/quotation-page.tsx");

    expect(quotation).toContain("AnimatePresence");
    expect(quotation).toContain("motion.fieldset");
    expect(quotation).toContain('data-motion="quotation-fieldset"');
    expect(quotation).toContain("Submitting…");
    expect(quotation).toContain("Submit quotation request");
    expect(quotation).toContain('data-conversion-state={state}');
    expect(quotation).toContain('data-conversion-success="true"');
    expect(quotation).toContain('aria-label="Quotation request"');
    expect(quotation).toContain('type="checkbox" required');
  });

  it("does not introduce ecommerce language into the quotation-led flow", () => {
    const conversion = [
      source("src/features/inquiry/inquiry-page.tsx"),
      source("src/features/inquiry/quotation-page.tsx")
    ].join("\n");

    expect(conversion).not.toMatch(/add to cart|checkout now|pay now|order total|shipping fee|discount/i);
    expect(conversion).toContain("Quotation inquiry");
    expect(conversion).toContain("Request quotation");
  });
});
