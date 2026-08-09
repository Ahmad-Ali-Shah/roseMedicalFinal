import { describe, expect, it } from "vitest";
import {
  HERO_AUTOPLAY_MS,
  nextHeroSlideIndex,
  previousHeroSlideIndex,
  shouldHeroAutoplay
} from "@/features/homepage/hero-carousel-state";

describe("homepage hero carousel state", () => {
  it("uses the approved autoplay interval", () => expect(HERO_AUTOPLAY_MS).toBe(4_750));
  it("wraps forward and backward", () => {
    expect(nextHeroSlideIndex(3, 4)).toBe(0);
    expect(previousHeroSlideIndex(0, 4)).toBe(3);
  });
  it.each([
    { reducedMotion: true }, { focused: true }, { dragging: true }, { hidden: true }
  ])("pauses for blocked autoplay state %#", (override) => {
    expect(shouldHeroAutoplay({
      reducedMotion: false, focused: false, dragging: false, hidden: false, ...override
    })).toBe(false);
  });
  it("autoplays only while fully active", () => {
    expect(shouldHeroAutoplay({ reducedMotion: false, focused: false, dragging: false, hidden: false })).toBe(true);
  });
});
