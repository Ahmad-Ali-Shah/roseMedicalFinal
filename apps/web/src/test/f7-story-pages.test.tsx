import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AboutPage } from "@/features/about";
import { CataloguesPage } from "@/features/catalogues";
import { ContactPage } from "@/features/contact-preview";
import {
  LegalPage,
  PRIVACY_DOCUMENT,
  TERMS_DOCUMENT
} from "@/features/legal-pages";
import { ProcurementSupportPage } from "@/features/procurement-support";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("F7 public story and utility polish", () => {
  it("frames the owner-approved About profile without inventing company history", () => {
    const html = renderToStaticMarkup(<AboutPage />);
    const styles = source("src/styles/f7-story-polish.css");
    const refinementStyles = source("src/styles/f8-owner-refinement.css");

    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).not.toContain("Useful structure at every step.");
    expect(html).not.toContain("How surgical scissors became more specialised.");
    expect(html).toContain("We are Rosa Medical.");
    expect(html).toContain("Built around professional buying needs.");
    expect(html).toContain('href="/procurement-support"');
    expect(html).toContain('href="/request-quotation"');
    expect(html).toContain('data-media-slot="about-hero"');
    expect(html).toContain('data-media-slot="about-procurement"');
    expect(html).toContain('data-media-state="ready"');
    expect(html).toContain('data-motion="text-reveal"');
    expect(html).toContain('data-motion="stagger"');
    expect((html.match(/data-supported-buyer=/g) ?? []).length).toBe(4);
    expect(styles).toContain("scale(1.01)");
    expect(styles).not.toMatch(/story-media-frame:hover[^}]*rotate\(/s);
    expect(refinementStyles).toMatch(/\.company-profile__principles\s*>\s*li\s*\{/);
    expect(refinementStyles).not.toMatch(/\.company-profile__principles\s*>\s*div\s*\{/);
    expect(html).not.toMatch(/founded|since \d{4}|factory|manufacturer|certified|years of experience/i);
  });

  it("sequences procurement guidance while preserving every approved route", () => {
    const html = renderToStaticMarkup(<ProcurementSupportPage />);

    expect((html.match(/data-editorial-kind="procurement-step"/g) ?? []).length).toBe(6);
    expect((html.match(/data-editorial-kind="requirement-type"/g) ?? []).length).toBe(4);
    expect((html.match(/data-information-item=/g) ?? []).length).toBe(6);
    expect(html).toContain('data-media-slot="procurement-support-hero"');
    expect(html).toContain('data-motion="text-reveal"');
    expect((html.match(/data-motion="stagger"/g) ?? []).length).toBeGreaterThanOrEqual(1);
    for (const href of ["/products", "/inquiry", "/contact", "/request-quotation"]) {
      expect(html).toContain(`href="${href}"`);
    }
    expect(html).not.toMatch(/guaranteed|in stock|ships within|delivery date/i);
  });

  it("lifts catalogue documents with the owner-supplied PDF downloads", () => {
    const html = renderToStaticMarkup(<CataloguesPage />);
    const styles = source("src/styles/f8-owner-refinement.css");

    expect((html.match(/data-catalogue-document=/g) ?? []).length).toBe(5);
    expect((html.match(/data-motion="stagger-item"/g) ?? []).length).toBeGreaterThanOrEqual(5);
    expect(html).toContain('data-motion="stagger"');
    expect(html).toContain('data-motion="tilt"');
    expect((html.match(/download="rosa-/g) ?? []).length).toBe(5);
    expect(html).not.toContain("PDF not available online");
    expect(html).toContain('href="/search"');
    expect(html).toContain('href="/request-quotation"');
    expect(html).not.toContain('href=""');
    expect(html).not.toContain("[Month Year]");
    expect(html).not.toContain("catalogue-document-card--featured");
    expect(styles).toMatch(/\.catalogue-document-card[^}]*transition:[^}]*background-color/s);
    expect(styles).toMatch(/\.catalogue-document-card:hover[^{]*\{[^}]*background-color:\s*var\(--color-ink\)/s);
    expect(styles).not.toMatch(/\.catalogue-document-card:hover[^{]*\{[^}]*background:\s*var\(--color-ink\)/s);
    expect(styles).toMatch(/\.public-family-index\s*>\s*li:hover[^{]*[^{]*\{[^}]*color:\s*var\(--color-rosa-red\)/s);
  });

  it("polishes contact presentation with centralized example details and a Riyadh map", () => {
    const html = renderToStaticMarkup(<ContactPage />);
    const form = source("src/features/contact-preview/contact-form-preview.tsx");

    expect(html).toContain("General contact form");
    expect(html).toContain('title="Map showing Riyadh, Saudi Arabia"');
    expect((html.match(/data-motion="reveal"/g) ?? []).length).toBeGreaterThanOrEqual(4);
    expect(html).toContain("info@rosamedical.org");
    expect(html).toContain("Send Message");
    expect(form).toContain('fetch("/api/contact"');
    expect(form).toContain('method: "POST"');
    expect(form).toContain('form.reset()');
    expect(form).toContain("AnimatePresence");
    expect(form).toContain("useReducedMotion");
    expect(form).not.toContain("style={{ color:");
    expect(html).toMatch(/mailto:|tel:|wa\.me/);
  });

  it.each([
    [PRIVACY_DOCUMENT, 9],
    [TERMS_DOCUMENT, 11]
  ] as const)("keeps legal motion minimal and all review warnings visible", (document, count) => {
    const html = renderToStaticMarkup(<LegalPage document={document} />);

    expect((html.match(/data-legal-section=/g) ?? []).length).toBe(count);
    expect((html.match(/data-motion="reveal"/g) ?? [])).toHaveLength(2);
    expect(html).not.toContain('data-motion="tilt"');
    expect(html).not.toContain('data-motion="stagger"');
    expect(html).not.toContain('data-motion="text-reveal"');
    expect(html).toContain(`Last updated: ${document.updated}`);
    expect(html).toContain("Questions about this policy?");
    expect(html).not.toMatch(/template|awaiting|not launch-ready/i);
    expect(html).not.toMatch(/Saudi law governs|retained for \d+ years|Google Analytics|Mailchimp/i);
  });
});
