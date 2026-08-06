import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { StaticOptionField } from "@/features/product-detail/static-option-field";
import { StaticQuantityField } from "@/features/product-detail/static-quantity-field";
import { AddedFeedbackPreview } from "@/features/product-detail/added-feedback-preview";

describe("F3B product controls", () => {
  it("uses native output and enabled quantity controls", () => {
    const html = renderToStaticMarkup(
      <>
        <StaticOptionField label="Size" value="14.5 cm" />
        <StaticQuantityField value={1} onChange={() => undefined} />
      </>
    );
    expect(html).toContain("<output");
    expect(html).toContain("Decrease quantity");
    expect(html).toContain("Increase quantity");
    expect(html).not.toContain("interaction phase");
    expect(html).not.toContain('role="group" aria-readonly');
    expect(html).not.toContain("<form");
  });

  it("keeps added feedback as a reusable preview state", () => {
    const html = renderToStaticMarkup(<AddedFeedbackPreview />);
    expect(html).toContain("Added-feedback preview");
    expect(html).toContain("when inquiry behavior is implemented");
  });
});
