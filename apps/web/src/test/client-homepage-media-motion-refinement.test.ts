import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME_HERO_SLIDES } from "@/features/homepage/home-hero-slides";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

const EXPECTED_DESKTOP_HERO_MEDIA = [
  "/media/editorial/home-hero/client-v2/home-hero-client-01.svg",
  "/media/editorial/home-hero/client-v2/home-hero-client-02.svg",
  "/media/editorial/home-hero/client-v2/home-hero-client-03.svg",
  "/media/editorial/home-hero/client-v2/home-hero-client-04.svg"
] as const;

const EXPECTED_MOBILE_HERO_MEDIA = [
  "/media/editorial/home-hero/client-v3/hero-01-mobile.avif",
  "/media/editorial/home-hero/client-v3/hero-02-mobile.avif",
  "/media/editorial/home-hero/client-v3/hero-03-mobile.avif",
  "/media/editorial/home-hero/client-v3/hero-04-mobile.avif"
] as const;

const EXPECTED_MOBILE_FOCALS = ["50% 46%", "50% 48%", "54% 48%", "50% 48%"] as const;

describe("homepage media and entrance-motion refinement", () => {
  it("keeps the four client banners on desktop and uses dedicated phone crops with deliberate framing", () => {
    const hero = source("src/features/homepage/sections/home-hero-carousel.tsx");

    expect(HOME_HERO_SLIDES.map((slide) => slide.image.desktopSrc)).toEqual(EXPECTED_DESKTOP_HERO_MEDIA);
    for (const mobileSrc of EXPECTED_MOBILE_HERO_MEDIA) {
      expect(hero).toContain(mobileSrc);
      expect(existsSync(resolve(process.cwd(), `public${mobileSrc}`))).toBe(true);
    }
    for (const focal of EXPECTED_MOBILE_FOCALS) {
      expect(hero).toContain(focal);
    }
  });

  it("bypasses the hero SVG/Next-Image failure path and gives Punches an independent render fallback", () => {
    const hero = source("src/features/homepage/sections/home-hero-carousel.tsx");
    const gallery = source("src/features/homepage/sections/home-family-gallery.tsx");
    const polish = source("src/styles/home-client-redesign-polish.css");

    expect(hero).not.toContain('from "next/image"');
    expect(hero).toContain("--hero-desktop-image");
    expect(hero).toContain("--hero-mobile-image");
    expect(gallery).toContain('/media/families/homepage-covers/punches-family-cover-full.svg');
    expect(polish).toContain('.home-family-gallery__panel[data-family="punches"]');
    expect(polish).toContain('background-image: url("/media/families/homepage-covers/punches-family-cover-full.svg")');
    expect(polish).toContain("opacity: 0");
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
