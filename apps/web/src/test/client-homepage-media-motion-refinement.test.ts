import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME_HERO_SLIDES } from "@/features/homepage/home-hero-slides";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

const EXPECTED_DESKTOP_HERO_MEDIA = [
  "/media/editorial/home-hero/client-v5/hero-01-desktop.webp",
  "/media/editorial/home-hero/client-v5/hero-02-desktop.webp",
  "/media/editorial/home-hero/client-v5/hero-03-desktop.webp",
  "/media/editorial/home-hero/client-v5/hero-04-desktop.webp"
] as const;
const EXPECTED_DESKTOP_HERO_AVIF = EXPECTED_DESKTOP_HERO_MEDIA.map((src) => src.replace(/\.webp$/, ".avif"));
const EXPECTED_MOBILE_HERO_MEDIA = [
  "/media/editorial/home-hero/client-v5/hero-01-mobile.webp",
  "/media/editorial/home-hero/client-v5/hero-02-mobile.webp",
  "/media/editorial/home-hero/client-v5/hero-03-mobile.webp",
  "/media/editorial/home-hero/client-v5/hero-04-mobile.webp"
] as const;
const EXPECTED_MOBILE_HERO_AVIF = EXPECTED_MOBILE_HERO_MEDIA.map((src) => src.replace(/\.webp$/, ".avif"));

const EXPECTED_MOBILE_FOCALS = ["50% 46%", "50% 48%", "54% 48%", "50% 48%"] as const;
const EXPECTED_SPECIALTY_MEDIA = [
  "/media/editorial/home-specialties/plastic-surgery.webp",
  "/media/editorial/home-specialties/orthopedics.webp",
  "/media/editorial/home-specialties/maxillofacial.webp",
  "/media/editorial/home-specialties/orthodontics.webp",
  "/media/editorial/home-specialties/spine.webp",
  "/media/editorial/home-specialties/securing-confidence.webp"
] as const;

describe("homepage media and entrance-motion refinement", () => {
  it("uses complete v5 client banners with WebP fallbacks and AVIF sources", () => {
    const hero = source("src/features/homepage/sections/home-hero-carousel.tsx");

    expect(HOME_HERO_SLIDES.map((slide) => slide.image.desktopSrc)).toEqual(EXPECTED_DESKTOP_HERO_MEDIA);
    expect(HOME_HERO_SLIDES.map((slide) => slide.image.mobileSrc)).toEqual(EXPECTED_MOBILE_HERO_MEDIA);
    for (const mediaSrc of [...EXPECTED_DESKTOP_HERO_MEDIA, ...EXPECTED_DESKTOP_HERO_AVIF, ...EXPECTED_MOBILE_HERO_MEDIA, ...EXPECTED_MOBILE_HERO_AVIF]) {
      const path = resolve(process.cwd(), `public${mediaSrc}`);
      expect(existsSync(path)).toBe(true);
      expect(readFileSync(path).length).toBeGreaterThan(5_000);
    }
    expect(hero).toContain('type="image/avif"');
    expect(hero).toContain("desktopAvifSrc");
    expect(hero).toContain("mobileAvifSrc");
    for (const focal of EXPECTED_MOBILE_FOCALS) expect(hero).toContain(focal);
  });

  it("renders semantic hero images and a direct Punches catalogue cover with format fallback", () => {
    const hero = source("src/features/homepage/sections/home-hero-carousel.tsx");
    const gallery = source("src/features/homepage/sections/home-family-gallery.tsx");
    const polish = source("src/styles/home-client-redesign-polish.css");

    expect(hero).toContain("<picture");
    expect(hero).toContain("<img");
    expect(hero).toContain("slide.image.alt");
    expect(hero).not.toContain("--hero-desktop-image");
    expect(hero).not.toContain("--hero-mobile-image");
    expect(gallery).toContain('/media/families/homepage-covers/punches-family-cover.avif');
    expect(gallery).toContain('/media/families/homepage-covers/punches-family-cover.webp');
    expect(gallery).toContain("<picture");
    expect(gallery).not.toContain('/media/families/homepage-covers/punches-family-cover-full.svg');
    expect(polish).not.toContain('background-image: url("/media/families/homepage-covers/punches-family-cover-full.svg")');
  });

  it("replaces every approved medical placeholder with local clinical photography", () => {
    const clientSections = source("src/features/homepage/sections/client-home-sections.tsx");
    for (const mediaSrc of EXPECTED_SPECIALTY_MEDIA) {
      expect(existsSync(resolve(process.cwd(), `public${mediaSrc}`))).toBe(true);
      expect(clientSections).toContain(mediaSrc);
    }
    expect(clientSections).toContain('from "next/image"');
    expect(clientSections).not.toContain("HomeMediaPlaceholder");
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

  it("keeps catalogue cover hover clearly visible while respecting reduced motion", () => {
    const interactions = source("src/styles/home-client-interaction-fixes.css");
    expect(interactions).toContain("scale(1.14)");
    expect(interactions).toContain("680ms");
    expect(interactions).toContain("box-shadow");
    expect(interactions).toContain("prefers-reduced-motion: reduce");
  });
});
