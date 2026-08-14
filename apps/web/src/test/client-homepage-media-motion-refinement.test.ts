import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME_HERO_SLIDES } from "@/features/homepage/home-hero-slides";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

const EXPECTED_DESKTOP_HERO_MEDIA = [
  "/media/editorial/home-hero/client-v4/hero-01-desktop.webp",
  "/media/editorial/home-hero/client-v4/hero-02-desktop.webp",
  "/media/editorial/home-hero/client-v4/hero-03-desktop.webp",
  "/media/editorial/home-hero/client-v4/hero-04-desktop.webp"
] as const;

const EXPECTED_MOBILE_HERO_MEDIA = [
  "/media/editorial/home-hero/client-v3/hero-01-mobile.avif",
  "/media/editorial/home-hero/client-v3/hero-02-mobile.avif",
  "/media/editorial/home-hero/client-v3/hero-03-mobile.avif",
  "/media/editorial/home-hero/client-v3/hero-04-mobile.avif"
] as const;

const EXPECTED_MOBILE_FOCALS = ["50% 46%", "50% 48%", "54% 48%", "50% 48%"] as const;

describe("homepage media and entrance-motion refinement", () => {
  it("uses direct client banner assets with dedicated phone crops", () => {
    const hero = source("src/features/homepage/sections/home-hero-carousel.tsx");

    expect(HOME_HERO_SLIDES.map((slide) => slide.image.desktopSrc)).toEqual(EXPECTED_DESKTOP_HERO_MEDIA);
    for (const desktopSrc of EXPECTED_DESKTOP_HERO_MEDIA) {
      expect(existsSync(resolve(process.cwd(), `public${desktopSrc}`))).toBe(true);
    }
    for (const mobileSrc of EXPECTED_MOBILE_HERO_MEDIA) {
      expect(hero).toContain(mobileSrc);
      expect(existsSync(resolve(process.cwd(), `public${mobileSrc}`))).toBe(true);
    }
    for (const focal of EXPECTED_MOBILE_FOCALS) {
      expect(hero).toContain(focal);
    }
  });

  it("renders semantic hero images and a direct Punches catalogue cover", () => {
    const hero = source("src/features/homepage/sections/home-hero-carousel.tsx");
    const gallery = source("src/features/homepage/sections/home-family-gallery.tsx");
    const polish = source("src/styles/home-client-redesign-polish.css");

    expect(hero).toContain("<picture");
    expect(hero).toContain("<img");
    expect(hero).toContain("slide.image.alt");
    expect(hero).not.toContain("--hero-desktop-image");
    expect(hero).not.toContain("--hero-mobile-image");
    expect(gallery).toContain('/media/families/homepage-covers/punches-family-cover.avif');
    expect(gallery).not.toContain('/media/families/homepage-covers/punches-family-cover-full.svg');
    expect(polish).not.toContain('background-image: url("/media/families/homepage-covers/punches-family-cover-full.svg")');
    expect(polish).not.toContain('.home-family-gallery__panel[data-family="punches"] .home-family-gallery__image');
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

  it("keeps catalogue cover hover obvious while respecting reduced motion", () => {
    const redesign = source("src/styles/home-client-redesign.css");
    const polish = source("src/styles/home-client-redesign-polish.css");
    const css = `${redesign}\n${polish}`;

    expect(css).toContain("scale(1.11)");
    expect(css).toMatch(/transition(?:-duration)?:[^;]*(?:5[2-9]0|6\d0)ms/);
    expect(css).toContain("prefers-reduced-motion: reduce");
  });
});
