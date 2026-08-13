import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME_HERO_SLIDES } from "@/features/homepage/home-hero-slides";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

const EXPECTED_HERO_MEDIA = [
  ["/media/editorial/home-hero/client-v3/hero-01-desktop.webp", "/media/editorial/home-hero/client-v3/hero-01-mobile.webp"],
  ["/media/editorial/home-hero/client-v3/hero-02-desktop.webp", "/media/editorial/home-hero/client-v3/hero-02-mobile.webp"],
  ["/media/editorial/home-hero/client-v3/hero-03-desktop.webp", "/media/editorial/home-hero/client-v3/hero-03-mobile.webp"],
  ["/media/editorial/home-hero/client-v3/hero-04-desktop.webp", "/media/editorial/home-hero/client-v3/hero-04-mobile.webp"]
] as const;

describe("homepage media and entrance-motion refinement", () => {
  it("uses the four supplied banners as direct WebP desktop/mobile sources", () => {
    expect(HOME_HERO_SLIDES.map((slide) => [slide.image.desktopSrc, slide.image.mobileSrc])).toEqual(EXPECTED_HERO_MEDIA);

    for (const [desktopSrc, mobileSrc] of EXPECTED_HERO_MEDIA) {
      expect(existsSync(resolve(process.cwd(), `public${desktopSrc}`))).toBe(true);
      expect(existsSync(resolve(process.cwd(), `public${mobileSrc}`))).toBe(true);
    }
  });

  it("uses the reattached Punches cover rather than the embedded-image SVG wrapper", () => {
    const gallery = source("src/features/homepage/sections/home-family-gallery.tsx");
    expect(gallery).toContain('/media/families/homepage-covers/punches-family-cover-client.webp');
    expect(existsSync(resolve(process.cwd(), "public/media/families/homepage-covers/punches-family-cover-client.webp"))).toBe(true);
  });

  it("restores subtle rise/slide entrance choreography across the redesigned homepage", () => {
    const hero = source("src/features/homepage/sections/home-hero-carousel.tsx");
    const discovery = source("src/features/homepage/sections/family-discovery.tsx");
    const clientSections = source("src/features/homepage/sections/client-home-sections.tsx");

    expect(hero).toContain('data-entry-motion="slide-settle"');
    expect(hero).toContain('data-entry-motion="rise"');
    expect(hero).toContain("y: 22");
    expect(discovery).toContain("Reveal");
    expect(clientSections).toContain("Reveal");
    expect(clientSections).toContain("Stagger");
    expect(clientSections).toContain("StaggerItem");
  });
});
