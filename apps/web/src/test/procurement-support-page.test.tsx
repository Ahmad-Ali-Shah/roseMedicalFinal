import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { ProcurementSupportPage } from "@/features/procurement-support";

it("renders six steps, four requirement types and six checklist items", () => {
  const html = renderToStaticMarkup(<ProcurementSupportPage />);

  expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  expect((html.match(/data-editorial-kind="procurement-step"/g) ?? [])).toHaveLength(6);
  expect((html.match(/data-editorial-kind="requirement-type"/g) ?? [])).toHaveLength(4);
  expect((html.match(/data-information-item=/g) ?? [])).toHaveLength(6);
  expect(html).toContain("/media/optimized/v1/procurement-support.webp");
  expect(html).toContain('data-procurement-route-panel="true"');
  expect(html).toContain('href="/products"');
  expect(html).toContain('href="/inquiry"');
  expect(html).toContain('href="/contact"');
  expect(html).toContain('href="/request-quotation"');
  expect(html).not.toMatch(/guaranteed|in stock|ships within/i);
});
