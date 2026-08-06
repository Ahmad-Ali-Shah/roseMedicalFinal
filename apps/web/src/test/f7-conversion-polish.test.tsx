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
    expect(inquiry).toContain("handleRemove(item.id)");
    expect(inquiry).toContain("pendingFocusTarget");
    expect(inquiry).toContain("data-inquiry-empty-focus");
    expect(inquiry).toContain("useReducedMotion");
    expect(inquiry).toContain("function handleClear()");
    expect(inquiry).toContain("clearInquiry();");
    expect(inquiry).toContain("setItems([]);");
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

  it("reveals the form once and morphs submission and success states without changing form semantics", () => {
    const quotation = source("src/features/inquiry/quotation-page.tsx");

    expect(quotation).toContain("AnimatePresence");
    expect(quotation).toContain('data-motion="quotation-form-fields"');
    expect((quotation.match(/data-quotation-fieldset/g) ?? [])).toHaveLength(3);
    expect(quotation).not.toContain("motion.fieldset");
    expect(quotation).not.toContain("whileInView");
    expect(quotation).toContain("useReducedMotion");
    expect(quotation).toContain("Submitting…");
    expect(quotation).toContain("Submit quotation request");
    expect(quotation).toContain('data-conversion-state={state}');
    expect(quotation).toContain('data-conversion-success="true"');
    expect(quotation).toContain('role="status"');
    expect(quotation).toContain('aria-live="polite"');
    expect(quotation).toContain("successRef.current?.focus()");
    expect(quotation).toContain("tabIndex={-1}");
    expect(quotation).toContain('aria-label={ar ? "طلب عرض سعر" : "Quotation request"}');
    expect(quotation).toMatch(/type="checkbox"[^>]*required/);
    expect((quotation.match(/<label className="quotation-field/g) ?? [])).toHaveLength(6);
    expect(quotation).toContain("quotation-field--full");
    expect(quotation).toContain('autoComplete="name"');
    expect(quotation).toContain('autoComplete="organization"');
    expect(quotation).toContain('autoComplete="email"');
    expect(quotation).toContain('autoComplete="tel"');
    expect(quotation).toContain('autoComplete="country-name"');
    expect(quotation).toContain('data-quotation-summary="true"');
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
