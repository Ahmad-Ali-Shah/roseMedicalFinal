import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PublicShell } from "@/components/layout/public-shell";
import { AboutPage } from "@/features/about/about-page";
import { ContactPage } from "@/features/contact-preview/contact-page";
import { Homepage } from "@/features/homepage/homepage";
import { ProcurementSupportPage } from "@/features/procurement-support/procurement-support-page";
import {
  PUBLIC_CONTENT_BLOCKS,
  PUBLIC_CONTENT_VALUES,
  getPublicContentBlock
} from "@/features/public-content-registry";
import { renderServerComponent } from "@/test/render-server-component";

describe("F3E-D public content registry", () => {
  it("contains exactly the six approved blocks", () => {
    expect(PUBLIC_CONTENT_BLOCKS.map((block) => block.blockKey)).toEqual([
      "home.hero",
      "home.support",
      "about.introduction",
      "procurement.introduction",
      "contact.introduction",
      "footer.description"
    ]);
  });

  it("preserves shared content values on the public renderers that still consume them", async () => {
    const homepage = await renderServerComponent(<Homepage />);
    expect(homepage).toContain(PUBLIC_CONTENT_VALUES.homeHero.title);
    expect(renderToStaticMarkup(<AboutPage />)).toContain(PUBLIC_CONTENT_VALUES.aboutIntroduction.title);
    expect(renderToStaticMarkup(<ProcurementSupportPage />)).toContain(PUBLIC_CONTENT_VALUES.procurementIntroduction.title);
    expect(await renderServerComponent(<ContactPage />)).toContain(PUBLIC_CONTENT_VALUES.contactIntroduction.title);
    expect(renderToStaticMarkup(<PublicShell><p>Body</p></PublicShell>)).toContain(PUBLIC_CONTENT_VALUES.footerDescription.copy);
  });

  it("keeps the retired homepage-support block governed even though the client redesign no longer renders it", () => {
    expect(getPublicContentBlock("home.support")).toBeDefined();
    expect(PUBLIC_CONTENT_VALUES.homeSupport.title.length).toBeGreaterThan(0);
  });

  it("keeps fields independent and Arabic unresolved", () => {
    for (const block of PUBLIC_CONTENT_BLOCKS) {
      expect(block.fields.length).toBeGreaterThan(0);
      expect(block.fields.every((field) => field.arabicValue === null)).toBe(true);
      expect(new Set(block.fields.map((field) => field.fieldKey)).size).toBe(block.fields.length);
      expect(getPublicContentBlock(block.blockKey)).toBe(block);
    }
  });
});
