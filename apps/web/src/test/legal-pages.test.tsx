import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  PRIVACY_DOCUMENT,
  TERMS_DOCUMENT,
  LegalPage
} from "@/features/legal-pages";

describe("F3D legal templates", () => {
  it("defines the approved section counts", () => {
    expect(PRIVACY_DOCUMENT.sections).toHaveLength(9);
    expect(TERMS_DOCUMENT.sections).toHaveLength(11);
  });

  it.each([
    [PRIVACY_DOCUMENT, 9],
    [TERMS_DOCUMENT, 11]
  ] as const)("renders a legal template with the expected section count", (document, count) => {
    const html = renderToStaticMarkup(<LegalPage document={document} />);

    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect((html.match(/data-legal-section=/g) ?? [])).toHaveLength(count);
    expect(html).toContain("awaiting client and legal approval");
    expect(html).toContain("qualified legal review");
    expect(html).not.toMatch(/Saudi law governs|retained for \d+ years|Google Analytics|Mailchimp/i);
  });
});
