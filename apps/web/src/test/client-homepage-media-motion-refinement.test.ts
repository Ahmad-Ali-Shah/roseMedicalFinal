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
const EXPECTED_DESKTOP_HERO_AVIF = [
  "/media/editorial/home-hero/client-v5/hero-01-desktop.avif",
  "/media/editorial/home-hero/client-v5/hero-02-desktop.avif",
  "/media/editorial/home-hero/client-v5/hero-03-desktop.avif",
  "/media/editorial/home-hero/client-v5/hero-04-desktop.avif"
] as const;
const EXPECTED_MOBILE_HERO_MEDIA = [
  "/media/editorial/home-hero/client-v5/hero-01-mobile.webp",
  "/media/editorial/home-hero/client-v5/hero-02-mobile.webp",
  "/media/editorial/home-hero/client-v5/hero-03-mobile.webp",
  "/media/editorial/home-hero/client-v5/hero-04-mobile.webp"
] as const;
const EXPECTED_DESKTOP_MASTER_DIMENSIONS = [
  { width: 1920, height: 654 },
  { width: 1920, height: 654 },
  { width: 1920, height: 654 },
  { width: 1774, height: 886 }
] as const;
const EXPECTED_DESKTOP_FALLBACK_DIMENSIONS = [
  { width: 1200, height: 409 },
  { width: 1200, height: 409 },
  { width: 1200, height: 409 },
  { width: 1200, height: 600 }
] as const;
const EXPECTED_MOBILE_HERO_DIMENSIONS = [
  { width: 474, height: 592 },
  { width: 474, height: 592 },
  { width: 474, height: 592 },
  { width: 576, height: 720 }
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
const RETINA_SPECIALTY_MEDIA = [
  "/media/editorial/home-specialties/plastic-surgery.webp",
  "/media/editorial/home-specialties/orthopedics.webp",
  "/media/editorial/home-specialties/maxillofacial.webp"
] as const;
const PUNCHES_COVER = "/media/families/homepage-covers/punches-family-cover.webp" as const;

function mediaFile(mediaSrc: string): Buffer {
  return readFileSync(resolve(process.cwd(), `public${mediaSrc}`));
}

function expectCompleteWebP(mediaSrc: string, minimumBytes = 5_000): void {
  const path = resolve(process.cwd(), `public${mediaSrc}`);
  expect(existsSync(path)).toBe(true);
  const file = readFileSync(path);
  expect(file.length).toBeGreaterThan(minimumBytes);
  expect(file.subarray(0, 4).toString("ascii")).toBe("RIFF");
  expect(file.subarray(8, 12).toString("ascii")).toBe("WEBP");
  expect(file.readUInt32LE(4) + 8).toBe(file.length);
}

function readLossyWebPDimensions(mediaSrc: string): { width: number; height: number } {
  const file = mediaFile(mediaSrc);
  const keyframeSignature = Buffer.from([0x9d, 0x01, 0x2a]);
  const keyframeOffset = file.indexOf(keyframeSignature, 20);
  expect(keyframeOffset).toBeGreaterThanOrEqual(0);
  return {
    width: file.readUInt16LE(keyframeOffset + 3) & 0x3fff,
    height: file.readUInt16LE(keyframeOffset + 5) & 0x3fff
  };
}

function readAvifDimensions(mediaSrc: string): { width: number; height: number } {
  const file = mediaFile(mediaSrc);
  expect(file.length).toBeGreaterThan(4_000);
  expect(file.subarray(4, 12).toString("ascii")).toBe("ftypavif");
  const ispeOffset = file.indexOf(Buffer.from("ispe"));
  expect(ispeOffset).toBeGreaterThanOrEqual(0);
  return {
    width: file.readUInt32BE(ispeOffset + 8),
    height: file.readUInt32BE(ispeOffset + 12)
  };
}

describe("homepage media and entrance-motion refinement", () => {
  it("uses high-resolution hero masters with complete fallbacks and dedicated phone crops", () => {
    const hero = source("src/features/homepage/sections/home-hero-carousel.tsx");

    expect(HOME_HERO_SLIDES.map((slide) => slide.image.desktopSrc)).toEqual(EXPECTED_DESKTOP_HERO_MEDIA);
    expect(HOME_HERO_SLIDES.map((slide) => slide.image.desktopAvifSrc)).toEqual(EXPECTED_DESKTOP_HERO_AVIF);
    expect(HOME_HERO_SLIDES.map((slide) => slide.image.mobileSrc)).toEqual(EXPECTED_MOBILE_HERO_MEDIA);
    for (const mediaSrc of [...EXPECTED_DESKTOP_HERO_MEDIA, ...EXPECTED_MOBILE_HERO_MEDIA]) {
      expectCompleteWebP(mediaSrc);
    }
    expect(EXPECTED_DESKTOP_HERO_AVIF.map(readAvifDimensions)).toEqual(EXPECTED_DESKTOP_MASTER_DIMENSIONS);
    expect(EXPECTED_DESKTOP_HERO_MEDIA.map(readLossyWebPDimensions)).toEqual(EXPECTED_DESKTOP_FALLBACK_DIMENSIONS);
    expect(EXPECTED_MOBILE_HERO_MEDIA.map(readLossyWebPDimensions)).toEqual(EXPECTED_MOBILE_HERO_DIMENSIONS);
    expect(hero).toContain('<source media="(max-width: 40rem)"');
    expect(hero).toContain('type="image/avif"');
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

  it("uses local clinical photography and keeps the three primary specialty images high-resolution", () => {
    const clientSections = source("src/features/homepage/sections/client-home-sections.tsx");
    for (const mediaSrc of EXPECTED_SPECIALTY_MEDIA) {
      expect(existsSync(resolve(process.cwd(), `public${mediaSrc}`))).toBe(true);
      expect(clientSections).toContain(mediaSrc);
    }
    for (const mediaSrc of RETINA_SPECIALTY_MEDIA) {
      expectCompleteWebP(mediaSrc, 15_000);
      expect(readLossyWebPDimensions(mediaSrc)).toEqual({ width: 1200, height: 750 });
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
