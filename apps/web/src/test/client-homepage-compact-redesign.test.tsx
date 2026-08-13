import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { Homepage } from "@/features/homepage/homepage";
import { SOCIAL_LINKS } from "@/features/social-links";
import { renderServerComponent } from "@/test/render-server-component";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("client homepage compact redesign", () => {
  it("renders the approved compact client story in order", async () => {
    const html = await renderServerComponent(<Homepage />);
    const sections = [
      "home-hero",
      "family-discovery",
      "comprehensive-plans",
      "securing-confidence",
      "home-contact-band",
      "client-success-assurance",
      "quotation-cta",
      "home-social-strip"
    ];

    let previous = -1;
    for (const section of sections) {
      const position = html.indexOf(`data-section="${section}"`);
      expect(position).toBeGreaterThan(previous);
      previous = position;
    }

    expect(html).toContain("Our range of products");
    expect(html).toContain("Comprehensive Plans");
    expect(html).toContain("Securing Confidence");
    expect(html).toContain("Services Assure our Clients Success");
    expect(html).toContain("SACS");
  });

  it("uses intentional placeholders for the six client imagery slots", async () => {
    const html = await renderServerComponent(<Homepage />);
    expect((html.match(/data-home-media-placeholder/g) ?? [])).toHaveLength(6);
    for (const label of ["Plastic Surgery", "Orthopedics", "Maxillofacial", "Orthodontics", "Spine"]) {
      expect(html).toContain(label);
    }
  });

  it("keeps the homepage free of the retired featured-product data request", () => {
    const homepage = source("src/features/homepage/homepage.tsx");
    expect(homepage).not.toContain("getFeaturedCatalogueProducts");
    expect(homepage).not.toContain("FeaturedInstruments");
    expect(homepage).not.toContain("CatalogueAccess");
    expect(homepage).not.toContain("ProcurementSupport");
  });

  it("loads a final compact density layer without CSS zoom", () => {
    const globals = source("src/app/globals.css");
    const redesign = source("src/styles/home-client-redesign.css");
    expect(globals.trim().endsWith('@import "../styles/home-client-redesign.css";')).toBe(true);
    expect(redesign).toContain("body:has(.public-page--home) .site-header__bar");
    expect(redesign).toContain("max-height: 800px");
    expect(redesign).not.toMatch(/\bzoom\s*:/);
    expect(redesign).not.toContain("transform: scale(0.");
  });

  it("uses only the four real social profiles and never adds YouTube", async () => {
    const html = await renderServerComponent(<Homepage />);
    expect(SOCIAL_LINKS).toHaveLength(4);
    expect(SOCIAL_LINKS.map((item) => item.platform)).toEqual(["instagram", "x", "facebook", "linkedin"]);
    expect(html).not.toMatch(/youtube/i);
  });
});
