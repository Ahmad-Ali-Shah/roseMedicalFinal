import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AboutPage } from "@/features/about";
import { CATALOGUE_DOCUMENTS, CataloguesPage } from "@/features/catalogues";
import { FamilyListingPage } from "@/features/family-listing/family-listing-page";
import { Homepage } from "@/features/homepage/homepage";
import { FAMILY_SLUGS } from "@/features/public-catalogue";
import {
  CATALOGUE_MEDIA_BY_SLUG,
  FAMILY_MEDIA_BY_SLUG
} from "@/features/public-media";
import { renderServerComponent } from "@/test/render-server-component";

describe("owner media refinement", () => {
  it("renders an unframed full-bleed homepage hero", async () => {
    const html = await renderServerComponent(<Homepage />);

    expect(html).toContain("home-hero-carousel__media");
    expect(html).toContain("home-hero-carousel__overlay");
    expect(html).toContain("client-v5/hero-01-desktop.webp");
    expect(html).not.toContain("home-hero__visual-surface");
    expect(html).not.toContain("home-hero__visual-tilt");
  });

  it("uses the compact family gallery and real clinical media without a fake document layer", async () => {
    const html = await renderServerComponent(<Homepage />);

    expect(html).toContain("data-home-family-gallery");
    expect((html.match(/data-family-panel/g) ?? [])).toHaveLength(5);
    expect(html).toContain("punches-family-cover.webp");
    expect(html).not.toContain("punches-family-cover.avif");
    expect((html.match(/class=\"home-clinical-media/g) ?? [])).toHaveLength(6);
    expect(html).toContain("home-specialties/plastic-surgery.webp");
    expect(html).toContain("home-specialties/securing-confidence.webp");
    expect(html).not.toContain("catalogue-card__document");
  });

  it("keeps portrait catalogue media separate from family-card crops", () => {
    expect(CATALOGUE_MEDIA_BY_SLUG.knives.src).toBe(
      "/media/catalogue-preview/knives/knives-number-3.webp"
    );
    expect(CATALOGUE_MEDIA_BY_SLUG.scissors.src).toBe(
      "/media/catalogue-preview/scissors/scissors-operating-regular-curved-sharp-sharp.webp"
    );
    expect(CATALOGUE_MEDIA_BY_SLUG.cutters.src).toBe(
      "/media/catalogues/cutters-k-wire.jpg"
    );
    expect(CATALOGUE_DOCUMENTS.map((document) => document.media)).toEqual([
      CATALOGUE_MEDIA_BY_SLUG.knives,
      CATALOGUE_MEDIA_BY_SLUG.scissors,
      CATALOGUE_MEDIA_BY_SLUG.punches,
      CATALOGUE_MEDIA_BY_SLUG.chisels,
      CATALOGUE_MEDIA_BY_SLUG.cutters
    ]);

    const html = renderToStaticMarkup(<CataloguesPage />);
    expect(html).toContain("knives-number-3.webp");
    expect(html).toContain("scissors-operating-regular-curved-sharp-sharp.webp");
    expect(html).toContain("cutters-k-wire.jpg");
  });

  it("renders real family media in every family-page hero", async () => {
    for (const slug of FAMILY_SLUGS) {
      const html = await renderServerComponent(<FamilyListingPage familySlug={slug} />);

      expect(html).toContain(`data-media-slot="family-${slug}-hero"`);
      expect(html).toContain("data-media-state=\"ready\"");
      expect(html).toContain(encodeURIComponent(FAMILY_MEDIA_BY_SLUG[slug].src));
      expect(html).not.toContain(`${slug} family placeholder`);
    }
  });

  it("renders the About logo in an unframed square presentation", () => {
    const html = renderToStaticMarkup(<AboutPage />);

    expect(html).toMatch(
      /data-media-aspect="square"[^>]*data-media-slot="about-hero"/
    );
    expect(html).toContain("story-media-frame--brand-unframed");
  });
});
