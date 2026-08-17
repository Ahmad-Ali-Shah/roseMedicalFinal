import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AboutPage } from "@/features/about";

describe("About generated editorial media", () => {
  it("replaces the four narrative placeholders while keeping document evidence neutral", () => {
    const html = renderToStaticMarkup(<AboutPage locale="en" />);

    expect((html.match(/data-media-state="ready"/g) ?? [])).toHaveLength(4);
    expect((html.match(/data-media-state="placeholder"/g) ?? [])).toHaveLength(5);

    for (const slot of [
      "about-client-hero",
      "about-client-workflow",
      "about-client-growth",
      "about-client-experience"
    ]) {
      const start = html.indexOf(`data-media-slot="${slot}"`);
      expect(start).toBeGreaterThanOrEqual(0);
      expect(html.slice(start, start + 1500)).toContain("<img");
    }

    for (const asset of [
      "about-client-hero.webp",
      "about-client-workflow.webp",
      "about-client-growth.webp",
      "about-client-experience.webp"
    ]) {
      expect(html).toContain(asset);
    }
  });
});
