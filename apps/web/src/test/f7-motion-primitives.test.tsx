import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  MotionProvider,
  Reveal,
  Stagger,
  StaggerItem
} from "@/features/motion";

describe("F7 motion primitives", () => {
  it("keeps revealed content visible in server markup", () => {
    const html = renderToStaticMarkup(
      <MotionProvider>
        <Reveal direction="up">
          <h2>Premium instruments</h2>
        </Reveal>
      </MotionProvider>
    );

    expect(html).toContain("Premium instruments");
    expect(html).toContain('data-motion="reveal"');
    expect(html).toContain('data-motion-direction="up"');
    expect(html).not.toContain("filter:blur(");
    expect(html).toContain("transform:translateY(28px)");
    expect(html).toContain("opacity:1");
  });

  it("assigns deterministic stagger order without changing child semantics", () => {
    const html = renderToStaticMarkup(
      <Stagger as="ul" aria-label="Instrument families">
        <StaggerItem as="li">Knives</StaggerItem>
        <StaggerItem as="li">Scissors</StaggerItem>
      </Stagger>
    );

    expect(html).toContain("<ul");
    expect(html).toContain("<li");
    expect(html).toContain("Knives");
    expect(html).toContain("Scissors");
    expect(html).toContain("--motion-order:0");
    expect(html).toContain("--motion-order:1");
    expect(html).not.toContain("filter:blur(");
    expect(html).toContain("transform:translateY(14px)");
    expect(html).toContain("opacity:1");
  });

  it("observes stagger items independently so long grids cannot remain hidden", () => {
    const source = readFileSync(join(process.cwd(), "src/features/motion/stagger.tsx"), "utf8");

    const itemSource = source.slice(
      source.indexOf("export function StaggerItem"),
      source.indexOf("interface StaggerProps")
    );
    const containerSource = source.slice(source.indexOf("export function Stagger({"));

    expect(itemSource).toMatch(/whileInView:\s*"visible"/);
    expect(itemSource).toMatch(/viewport:/);
    expect(containerSource).not.toMatch(/whileInView:\s*"visible"/);
  });
});
