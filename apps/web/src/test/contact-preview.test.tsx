import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  CONTACT_INFORMATION,
  ContactFailurePreview,
  ContactFocusPreview,
  ContactLoadingPreview,
  ContactPage,
  ContactSuccessPreview,
  ContactValidationPreview
} from "@/features/contact-preview";

describe("F3D contact normal state", () => {
  it("centralizes complete example contact values", () => {
    expect(CONTACT_INFORMATION.map((row) => row.value)).toEqual([
      "Rosa Medical",
      "King Fahd Road, Al Olaya, Riyadh 12214, Saudi Arabia",
      "+966 11 555 0142",
      "+966 50 555 0142",
      "hello@example.com",
      "Sunday–Thursday, 09:00–17:00 (AST)"
    ]);
  });

  it("renders one heading, actionable details, the connected form, and Riyadh map", () => {
    const html = renderToStaticMarkup(<ContactPage />);

    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("General contact form");
    expect(html).toContain('name="email"');
    expect(html).toContain('name="phone"');
    expect(html).toContain('name="message"');
    expect(html).toContain("Send Message");
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('data-contact-status="idle"');
    expect(html).not.toContain('readOnly=""');
    expect(html).toContain('href="mailto:hello@example.com"');
    expect(html).toContain('href="tel:+966115550142"');
    expect(html).toContain('href="https://wa.me/966505550142"');
    expect(html).toContain('title="Map showing Riyadh, Saudi Arabia"');
    expect(html).toContain('loading="lazy"');
    expect(html).not.toContain("Awaiting client confirmation");
    expect(html).not.toContain("MESSAGE SENT");
    expect(html).toContain('href="/inquiry"');
    expect(html).toContain("Follow Rosa");
    expect((html.match(/target="_blank" rel="noopener noreferrer"/g) ?? [])).toHaveLength(4);
    expect(html).not.toContain("@rosamedicalexample");
  });
});

describe("F3D contact isolated previews", () => {
  it("renders a visible isolated focus example", () => {
    const html = renderToStaticMarkup(<ContactFocusPreview />);
    expect(html).toContain("contact-preview-field--focused");
    expect(html).toContain("data-preview-only");
  });

  it("connects validation errors to invalid fields", () => {
    const html = renderToStaticMarkup(<ContactValidationPreview />);
    expect((html.match(/aria-invalid="true"/g) ?? [])).toHaveLength(2);
    expect(html).toContain('aria-describedby="contact-invalid-email-error"');
    expect(html).toContain('id="contact-invalid-email-error"');
  });

  it("keeps loading and failure previews noninteractive", () => {
    const html = renderToStaticMarkup(<><ContactLoadingPreview /><ContactFailurePreview /></>);
    expect(html).toContain("Sending preview");
    expect(html).toContain("disabled");
    expect(html).not.toContain("onSubmit");
  });

  it("does not invent a sent message or reference in the default success preview", () => {
    const html = renderToStaticMarkup(<ContactSuccessPreview />);
    expect(html).not.toContain("CONTACT-PLACEHOLDER");
    expect(html).not.toContain("Your general message has been sent");
    expect(html).toContain("Confirmation details appear after a successful submission");
  });
});
