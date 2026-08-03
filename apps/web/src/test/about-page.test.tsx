import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { AboutPage } from "@/features/about";

it("renders the approved About structure without unsupported claims", () => {
  const html = renderToStaticMarkup(<AboutPage />);

  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect((html.match(/data-editorial-kind="buyer-expectation"/g) ?? [])).toHaveLength(5);
  expect((html.match(/data-scissors-evolution-stage=/g) ?? [])).toHaveLength(5);
  expect((html.match(/data-supported-buyer=/g) ?? [])).toHaveLength(4);
  expect((html.match(/data-family-index-row=/g) ?? [])).toHaveLength(5);
  expect(html).toContain("How surgical scissors became more specialised.");
  expect(html).toContain("Foundational form");
  expect(html).toContain("Contemporary catalogue selection");
  expect(html).toContain('data-media-slot="about-scissors-evolution"');
  expect(html).toContain('href="/procurement-support"');
  expect(html).toContain('href="/products"');
  expect(html).toContain('href="/request-quotation"');
  expect(html).not.toMatch(/\b(18|19|20)\d{2}\b/);
  expect(html).not.toMatch(/founded|since|factory|manufacturer|certified|years of experience/i);
});
