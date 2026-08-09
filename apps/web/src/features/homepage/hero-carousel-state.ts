export const HERO_AUTOPLAY_MS = 4_750;

export interface HeroAutoplayState {
  reducedMotion: boolean;
  focused: boolean;
  dragging: boolean;
  hidden: boolean;
}

function assertCount(count: number): void {
  if (!Number.isInteger(count) || count < 1) {
    throw new Error("Hero carousel requires at least one slide.");
  }
}

export function nextHeroSlideIndex(index: number, count: number): number {
  assertCount(count);
  return (index + 1) % count;
}

export function previousHeroSlideIndex(index: number, count: number): number {
  assertCount(count);
  return (index - 1 + count) % count;
}

export function shouldHeroAutoplay(state: HeroAutoplayState): boolean {
  return !state.reducedMotion && !state.focused && !state.dragging && !state.hidden;
}
