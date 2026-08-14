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
const EXPECTED_MOBILE_HERO_MEDIA = [
  "/media/editorial/home-hero/client-v5/hero-01-mobile.webp",
  "/media/editorial/home-hero/client-v5/hero-02-mobile.webp",
  "/media/editorial/home-hero/client-v5/hero-03-mobile.webp",
  "/media/editorial/home-hero/client-v5/hero-04-mobile.webp"
] as const;
const EXPECTED_MOBILE_FOCALS = ["50% 46%", "50% 48%", "54% 48%", "50% 48%"] as const;
const EXPECTED_SPECIALTY_MEDIA = [
  "/media/editorial/home-specialties/plastic-surgery.webp",
  "/media/editorial/home-specialties/orthopedics.webp",
  "/media/editorial/home-specialties/maxillofacial.webp",
  "/media/editorial/home-specialties/orthodontics.webp",
  "/media/editorial/home-specialties/spine.webp",
  "/media/editorial/home-specialties/securing-confidence.webp"
] as const;
const PUNCHES_COVER = "/media/families/homepage-covers/punches-family-cover.webp" as const;

function expectCompleteWebP(mediaSrc: string, minimumBytes = 5_000): void {
  const path = resolve(process.cwd(), `public${mediaSrc}`);
  expect(existsSync(path)).toBe(true);
  const file = readFileSync(path);
  expect(file.length).toBeGreaterThan(minimumBytes);
  expect(file.subarray(0, 4).toString("ascii")).toBe("RIFF");
  expect(file.subarray(8, 12).toString("ascii")).toBe("WEBP");
  expect(file.readUInt32LE(4) + 8).toBe(file.length);
}

describe("homepage media and entrance-motion refinement", () => {
  it("uses complete v5 client WebP banners with dedicated phone crops", () => {
    const hero = source("src/features/homepage/sections/home-hero-carousel.tsx");

    expect(HOME_HERO_SLIDES.map((slide) => slide.image.desktopSrc)).toEqual(EXPECTED_DESKTOP_HERO_MEDIA);
    expect(HOME_HERO_SLIDES.map((slide) => slide.image.mobileSrc)).toEqual(EXPECTED_MOBILE_HERO_MEDIA);
    for (const mediaSrc of [...EXPECTED_DESKTOP_HERO_MEDIA, ...EXPECTED_MOBILE_HERO_MEDIA]) {
      expectCompleteWebP(mediaSrc);
    }
    expect(hero).toContain('<source media="(max-width: 40rem)"');
    expect(hero).toContain('type="image/webp"');
    for (const focal of EXPECTED_MOBILE_FOCALS) expect(hero).toContain(focal);
  });

  it("renders semantic hero images and serves Punches from one direct WebP", () => {
    const hero = source("src/features/homepage/sections/home-hero-carousel.tsx");
    const gallery = source("src/features/homepage/sections/home-family-gallery.tsx");
    const polish = source("src/styles/home-client-redesign-polish.css");

    expect(hero).toContain("<picture");
    expect(hero).toContain("<img");
    expect(hero).toContain("slide.image.alt");
    expect(hero).not.toContain("--hero-desktop-image");
    expect(hero).not.toContain("--hero-mobile-image");
    expect(gallery).toContain(PUNCHES_COVER);
    expect(gallery).not.toContain("punches-family-cover.avif");
    expect(gallery).not.toContain("punches-family-cover-full.svg");
    expectCompleteWebP(PUNCHES_COVER, 3_000);
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
