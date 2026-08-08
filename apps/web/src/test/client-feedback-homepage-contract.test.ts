import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("client-feedback responsive homepage contract", () => {
  it("loads the dedicated density layer after owner refinement", () => {
    const globals = source("src/app/globals.css");
    expect(globals.indexOf('../styles/public-density.css')).toBeGreaterThan(
      globals.indexOf('../styles/f8-owner-refinement.css')
    );

    const density = source("src/styles/public-density.css");
    expect(density).toContain("--public-density-section-block");
    expect(density).toContain("--public-density-hero-title");
    expect(density).toContain("@media (max-height: 800px)");
    expect(density).not.toContain("transform: scale(0.");
  });
});
