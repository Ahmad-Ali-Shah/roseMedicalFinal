import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("F7 motion restraint and performance", () => {
  it("declares smooth-scroll ownership for Next route transitions", () => {
    const layout = source("src/app/layout.tsx");

    expect(layout).toContain('data-scroll-behavior="smooth"');
    expect(layout).toContain('href="#main-content"');
  });

  it("keeps header scroll work event-driven and fully cleaned up", () => {
    const controller = source("src/features/motion/scroll-header-controller.tsx");

    expect((controller.match(/window\.requestAnimationFrame/g) ?? []).length).toBe(1);
    expect(controller).not.toContain("requestAnimationFrame(update)");
    expect(controller).toContain('window.addEventListener("scroll", update, { passive: true })');
    expect(controller).toContain('window.removeEventListener("scroll", update)');
    expect(controller).toContain("window.cancelAnimationFrame(frame)");
    expect(controller).not.toContain("setInterval(");
  });

  it("keeps pointer tracking local to the interactive surface", () => {
    const pointerSources = [
      source("src/features/motion/magnetic.tsx"),
      source("src/features/motion/tilt-surface.tsx"),
      source("src/features/motion/spotlight-surface.tsx")
    ].join("\n");

    expect(pointerSources).toContain("onPointerMove");
    expect(pointerSources).toContain("event.currentTarget");
    expect(pointerSources).toContain('event.pointerType !== "mouse"');
    expect(pointerSources).not.toMatch(/window\.addEventListener\(["']pointer/i);
    expect(pointerSources).not.toMatch(/document\.addEventListener\(["']pointer/i);
    expect(pointerSources).not.toContain("requestAnimationFrame(");
  });

  it("reserves media geometry and exposes placeholder state before assets arrive", () => {
    const frame = source("src/features/motion/media-frame.tsx");
    const styles = source("src/styles/f7-premium-polish.css");

    expect(frame).toContain("media-frame--${aspect}");
    expect(frame).toContain('data-media-state={src ? "ready" : "placeholder"}');
    expect(frame).toContain("data-media-slot={mediaSlot}");
    expect(styles).toContain(".media-frame--portrait");
    expect(styles).toContain(".media-frame--landscape");
    expect(styles).toContain("aspect-ratio:");
  });

  it("neutralizes decorative motion for reduced and coarse-pointer modes", () => {
    const styles = [
      source("src/styles/f7-premium-polish.css"),
      source("src/styles/f7-product-polish.css"),
      source("src/styles/f7-story-polish.css"),
      source("src/styles/f7-conversion-polish.css")
    ].join("\n");

    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(styles).toContain("@media (hover: none), (pointer: coarse)");
    expect(styles).toContain('[data-motion="magnetic"]');
    expect(styles).toContain('[data-motion="tilt"]');
    expect(styles).toContain('[data-motion="spotlight"]::before');
    expect(styles).not.toMatch(/animation\s*:[^;]*infinite/i);
  });
});
