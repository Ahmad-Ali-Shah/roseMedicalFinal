import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { Homepage } from "@/features/homepage/homepage";
import { renderServerComponent } from "@/test/render-server-component";

describe("F7 homepage cinematic polish", () => {
  it("preserves the approved six-section homepage hierarchy", async () => {
    const html = await renderServerComponent(<Homepage />);

    for (const section of [
      "home-hero",
      "family-discovery",
      "procurement-support",
      "featured-instruments",
      "catalogue-access",
      "quotation-cta"
    ]) {
      expect(html).toContain(`data-section=\"${section}\"`);
    }
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Explore Products");
    expect(html).toContain("Request a Quote");
  });

  it("uses one editorial hero choreography and a stable cinematic media slot", async () => {
    const html = await renderServerComponent(<Homepage />);

    expect(html).toContain('data-home-choreography="hero"');
    expect(html).toContain('data-motion="text-reveal"');
    expect(html).toContain('data-media-slot="homepage-hero"');
    expect(html).toContain('data-media-state="ready"');
    expect(html).toContain("home-hero-surgical-instruments.jpg");
    expect((html.match(/data-motion="magnetic"/g) ?? [])).toHaveLength(2);
    expect(html).toContain("<img");
  });

  it("keeps the homepage story ordered without structural motion decoration", async () => {
    const html = await renderServerComponent(<Homepage />);

    expect(html).not.toContain("data-home-index");
    expect(html).not.toContain("home-section-index");
    expect(html).not.toContain("home-hero__stage-caption");
    expect(html).not.toContain("Precision steel study");
    expect(html).toContain('data-home-choreography="hero"');
    expect(html).toContain('data-media-slot="homepage-hero"');
  });

  it("stages family, product, process and catalogue groups through shared motion", async () => {
    const html = await renderServerComponent(<Homepage />);

    expect((html.match(/data-motion="stagger"/g) ?? []).length).toBeGreaterThanOrEqual(4);
    expect((html.match(/data-motion="stagger-item"/g) ?? []).length).toBeGreaterThanOrEqual(12);
    expect((html.match(/data-motion="tilt"/g) ?? [])).toHaveLength(6);
    expect(html).toContain('data-motion="spotlight"');
    expect(html).toContain('data-motion="progressive-blur"');
  });

  it("keeps every current family and product link intact", async () => {
    const html = await renderServerComponent(<Homepage />);

    for (const path of [
      "/products/knives",
      "/products/scissors",
      "/products/punches",
      "/products/chisels",
      "/products/cutters",
      "/catalogues"
    ]) {
      expect(html).toContain(`href=\"${path}\"`);
    }
  });

  it("uses the approved owner media in the hero, brand panel, families and catalogues", async () => {
    const html = await renderServerComponent(<Homepage />);

    for (const asset of [
      "home-hero-surgical-instruments.jpg",
      "rosa-primary-logo.jpeg",
      "knives-family.jpg",
      "scissors-family.jpg",
      "cutters-family.webp",
      "chisels-family.webp",
      "punches-family.webp"
    ]) {
      expect(html).toContain(asset);
    }
    expect((html.match(/data-catalogue-family-media=/g) ?? [])).toHaveLength(5);
  });

  it("preserves the full cutter source canvas in the cleaned public derivative", () => {
    const image = readFileSync(
      join(process.cwd(), "public/media/families/cutters-family-clean.png")
    );

    expect(image.subarray(1, 4).toString("ascii")).toBe("PNG");
    expect(image.readUInt32BE(16)).toBe(2412);
    expect(image.readUInt32BE(20)).toBe(1096);
  });
});
