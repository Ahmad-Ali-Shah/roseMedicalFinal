import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME_HERO_SLIDES } from "@/features/homepage/home-hero-slides";
import { SOCIAL_LINKS } from "@/features/social-links";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("client-feedback responsive homepage contract", () => {
  it("loads the compact client redesign after the existing refinement layers", () => {
    const globals = source("src/app/globals.css");
    expect(globals.indexOf('../styles/public-density.css')).toBeGreaterThan(
      globals.indexOf('../styles/f8-owner-refinement.css')
    );
    expect(globals.indexOf('../styles/home-client-redesign.css')).toBeGreaterThan(
      globals.indexOf('../styles/public-imdad-typography.css')
    );
    expect(globals.indexOf('../styles/home-client-interaction-fixes.css')).toBeGreaterThan(
      globals.indexOf('../styles/home-client-redesign-polish.css')
    );

    const redesign = source("src/styles/home-client-redesign.css");
    expect(redesign).toContain("home-compact-section-title");
    expect(redesign).toContain("@media (max-height: 800px)");
    expect(redesign).not.toMatch(/\bzoom\s*:/);
    expect(redesign).not.toContain("transform: scale(0.");
  });

  it("defines exactly four bounded hero slides", () => {
    expect(HOME_HERO_SLIDES).toHaveLength(4);
    expect(new Set(HOME_HERO_SLIDES.map((slide) => slide.id)).size).toBe(4);
    expect(HOME_HERO_SLIDES.every((slide) => slide.ctas.length >= 1 && slide.ctas.length <= 2)).toBe(true);
    expect(HOME_HERO_SLIDES.every((slide) => slide.image.desktopSrc.startsWith("/media/"))).toBe(true);
    expect(HOME_HERO_SLIDES.every((slide) => slide.image.mobileSrc.startsWith("/media/"))).toBe(true);
  });

  it("uses the four current direct client hero banners", () => {
    HOME_HERO_SLIDES.forEach((slide, index) => {
      const number = String(index + 1).padStart(2, "0");
      const expected = `/media/editorial/home-hero/client-v4/hero-${number}-desktop.webp`;
      expect(slide.image.desktopSrc).toBe(expected);
      expect(existsSync(resolve(process.cwd(), `public${expected}`))).toBe(true);
    });

    const carouselSource = source("src/features/homepage/sections/home-hero-carousel.tsx");
    expect(carouselSource).toContain("<picture");
    expect(carouselSource).toContain("<img");
    expect(carouselSource).toContain("fetchPriority");
    expect(carouselSource).not.toContain("home-hero-client-01.svg");
  });

  it("keeps Arabic typography localized and tightens homepage line-height separately", () => {
    const typography = source("src/styles/public-imdad-typography.css");
    const redesign = source("src/styles/home-client-redesign.css");
    expect(typography).toContain("var(--font-arabic)");
    expect(redesign).toContain('html[dir="rtl"] .public-page--home');
    expect(redesign).toContain("line-height: 1.6");
  });

  it("centralizes the supplied social profiles without a YouTube entry", () => {
    expect(SOCIAL_LINKS.map((item) => item.platform)).toEqual(["instagram", "x", "facebook", "linkedin"]);
    expect(SOCIAL_LINKS).toHaveLength(4);
    expect(SOCIAL_LINKS.map((item) => item.href)).toEqual([
      "https://www.instagram.com/rosa_international/",
      "https://x.com/",
      "https://www.facebook.com/profile.php?id=61581294504389",
      "https://www.linkedin.com/in/rosa-int-l-trading-co-370a74398/"
    ]);
  });

  it("uses the dedicated five-family homepage gallery in the client sequence", () => {
    const discovery = source("src/features/homepage/sections/family-discovery.tsx");
    const gallery = source("src/features/homepage/sections/home-family-gallery.tsx");
    expect(discovery).toContain("HomeFamilyGallery");
    expect(discovery).not.toContain("SectionHeading");
    expect(gallery).toContain("HOME_FAMILY_ORDER");
    expect(gallery).toContain('["scissors", "cutters", "punches", "chisels", "knives"]');
    expect(gallery).toContain("data-home-family-gallery");
  });
});
