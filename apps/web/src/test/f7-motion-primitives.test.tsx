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
    expect(html).toContain("filter:blur(3px)");
    expect(html).toContain("transform:translateY(16px)");
    expect(html).not.toMatch(/opacity:\s*0/);
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
    expect(html).toContain("filter:blur(2px)");
    expect(html).toContain("transform:translateY(8px)");
    expect(html).not.toMatch(/opacity:\s*0/);
  });
});
