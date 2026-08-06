import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { AboutPage } from "@/features/about";

it("renders the approved About structure without unsupported claims", () => {
  const html = renderToStaticMarkup(<AboutPage />);
  const visibleText = html.replace(/<[^>]+>/g, " ");

  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect(html).not.toContain('data-editorial-kind="buyer-expectation"');
  expect(html).not.toContain("data-scissors-evolution-stage");
  expect((html.match(/data-supported-buyer=/g) ?? [])).toHaveLength(4);
  expect((html.match(/data-family-index-row=/g) ?? [])).toHaveLength(5);
  expect(html).toContain("We are Rosa Medical.");
  expect(html).toContain("A focused partner for clearer instrument sourcing.");
  expect(html).toContain('data-company-profile="true"');
  expect(html).toContain("rosa-primary-logo.jpeg");
  expect((html.match(/data-supported-buyer-media=/g) ?? [])).toHaveLength(4);
  expect(html).toContain("about-hospitals.jpg");
  expect(html).toContain("about-procurement.jpg");
  expect(html).toContain("about-distributors.jpg");
  expect(html).toContain("about-international-buyers.webp");
  expect(html).toContain("procurement-support.jpg");
  expect(html).toContain('href="/procurement-support"');
  expect(html).toContain('href="/products"');
  expect(html).toContain('href="/request-quotation"');
  expect(visibleText).not.toMatch(/\b(18|19|20)\d{2}\b/);
  expect(visibleText).not.toMatch(/founded|since|factory|manufacturer|certified|years of experience/i);
});
