import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME_HERO_SLIDES } from "@/features/homepage/home-hero-slides";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

const EXPECTED_HERO_MEDIA = [
  "/media/editorial/home-hero/client-v2/home-hero-client-01.svg",
  "/media/editorial/home-hero/client-v2/home-hero-client-02.svg",
  "/media/editorial/home-hero/client-v2/home-hero-client-03.svg",
  "/media/editorial/home-hero/client-v2/home-hero-client-04.svg"
] as const;

const EXPECTED_FOCALS = [
  ["58% 50%", "56% 46%"],
  ["63% 49%", "62% 46%"],
  ["62% 50%", "66% 48%"],
  ["46% 50%", "48% 48%"]
] as const;

describe("homepage media and entrance-motion refinement", () => {
  it("keeps the four supplied client banners and gives every slide deliberate desktop/mobile focal points", () => {
    expect(HOME_HERO_SLIDES.map((slide) => slide.image.desktopSrc)).toEqual(EXPECTED_HERO_MEDIA);
    expect(HOME_HERO_SLIDES.map((slide) => slide.image.mobileSrc)).toEqual(EXPECTED_HERO_MEDIA);
    expect(HOME_HERO_SLIDES.map((slide) => [slide.image.desktopFocalPoint, slide.image.mobileFocalPoint])).toEqual(EXPECTED_FOCALS);
  });

  it("renders hero and catalogue-cover wrappers as direct background media instead of through Next Image", () => {
    const hero = source("src/features/homepage/sections/home-hero-carousel.tsx");
    const gallery = source("src/features/homepage/sections/home-family-gallery.tsx");

    expect(hero).not.toContain('from "next/image"');
    expect(hero).toContain("--hero-desktop-image");
    expect(hero).toContain("--hero-mobile-image");
    expect(gallery).not.toContain('from "next/image"');
    expect(gallery).toContain("backgroundImage");
    expect(gallery).toContain('/media/families/homepage-covers/punches-family-cover-full.svg');
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
