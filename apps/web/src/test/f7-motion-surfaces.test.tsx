import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Magnetic,
  MediaFrame,
  ProgressiveBlur,
  SpotlightSurface,
  TextReveal,
  TiltSurface
} from "@/features/motion";

describe("F7 premium motion surfaces", () => {
  it("keeps editorial text in one semantic heading", () => {
    const html = renderToStaticMarkup(
      <TextReveal as="h2" text="Built around professional buying needs." />
    );

    expect((html.match(/<h2/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Built around professional buying needs.");
    expect(html).toContain('data-motion="text-reveal"');
  });

  it("keeps pointer surfaces visible and semantically transparent", () => {
    const html = renderToStaticMarkup(
      <Magnetic>
        <button type="button">Request a quote</button>
      </Magnetic>
    );
    const tilt = renderToStaticMarkup(
      <TiltSurface as="article">Instrument family</TiltSurface>
    );
    const spotlight = renderToStaticMarkup(
      <SpotlightSurface>Dark editorial panel</SpotlightSurface>
    );

    expect(html).toContain("Request a quote");
    expect(tilt).toContain("<article");
    expect(tilt).toContain("Instrument family");
    expect(spotlight).toContain("Dark editorial panel");
    expect(`${html}${tilt}${spotlight}`).not.toMatch(/opacity:\s*0/);
  });

  it("renders a stable placeholder frame before cinematic assets arrive", () => {
    const html = renderToStaticMarkup(
      <MediaFrame alt="Cinematic surgical instrument composition" aspect="landscape">
        <span>Reserved cinematic media</span>
      </MediaFrame>
    );

    expect(html).toContain('data-media-state="placeholder"');
    expect(html).toContain('data-media-aspect="landscape"');
    expect(html).toContain("Reserved cinematic media");
    expect(html).not.toContain("<img");
  });

  it("renders supplied imagery with focal point and external overlay", () => {
    const html = renderToStaticMarkup(
      <MediaFrame
        src="/media/rosa-hero.webp"
        alt="Surgical instruments under directional studio light"
        aspect="cinematic"
        focalPoint="72% 44%"
        overlay="dark"
      />
    );

    expect(html).toContain('data-media-state="ready"');
    expect(html).toContain('src="/media/rosa-hero.webp"');
    expect(html).toContain('alt="Surgical instruments under directional studio light"');
    expect(html).toContain("object-position:72% 44%");
    expect(html).toContain('data-media-overlay="dark"');
  });

  it("keeps progressive blur decorative", () => {
    const html = renderToStaticMarkup(<ProgressiveBlur edge="bottom" />);
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('data-blur-edge="bottom"');
  });
});
