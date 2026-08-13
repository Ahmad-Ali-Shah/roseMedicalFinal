import { describe, expect, it } from "vitest";
import { Homepage } from "@/features/homepage/homepage";
import { renderServerComponent } from "@/test/render-server-component";

describe("F7 homepage cinematic polish", () => {
  it("renders the approved compact eight-section homepage hierarchy", async () => {
    const html = await renderServerComponent(<Homepage />);

    for (const section of [
      "home-hero",
      "family-discovery",
      "comprehensive-plans",
      "securing-confidence",
      "home-contact-band",
      "client-success-assurance",
      "quotation-cta",
      "home-social-strip"
    ]) {
      expect(html).toContain(`data-section="${section}"`);
    }
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Explore Products");
    expect(html).toContain("Request a Quote");
  });

  it("preserves the four-slide hero choreography and active client media slot", async () => {
    const html = await renderServerComponent(<Homepage />);
    expect(html).toContain('data-home-choreography="carousel"');
    expect((html.match(/class="home-hero-carousel__dot"/g) ?? [])).toHaveLength(4);
    expect(html).toContain('data-media-slot="homepage-hero-active"');
    expect(html).toContain("home-hero-client-01.svg");
    expect(html).toContain("<img");
  });

  it("keeps the homepage story ordered without obsolete structural decoration", async () => {
    const html = await renderServerComponent(<Homepage />);
    expect(html).not.toContain("data-home-index");
    expect(html).not.toContain("home-section-index");
    expect(html).not.toContain("home-hero__stage-caption");
    expect(html).toContain("Comprehensive Plans");
    expect(html).toContain("Securing Confidence");
  });

  it("keeps family discovery and quotation motion behavior intact", async () => {
    const html = await renderServerComponent(<Homepage />);
    expect((html.match(/data-family-panel/g) ?? [])).toHaveLength(5);
    expect(html).toContain('data-motion="spotlight"');
  });

  it("keeps every current family route and quotation route intact", async () => {
    const html = await renderServerComponent(<Homepage />);
    for (const path of [
      "/products/knives",
      "/products/scissors",
      "/products/punches",
      "/products/chisels",
      "/products/cutters",
      "/request-quotation"
    ]) {
      expect(html).toContain(`href="${path}"`);
    }
  });

  it("uses the approved client hero and full family cover assets", async () => {
    const html = await renderServerComponent(<Homepage />);
    for (const asset of [
      "home-hero-client-01.svg",
      "scissors-family-cover-full.svg",
      "cutters-family-cover-full.svg",
      "punches-family-cover-full.svg",
      "chisels-family-cover-full.svg",
      "knives-family-cover-full.svg"
    ]) {
      expect(html).toContain(asset);
    }
  });
});
