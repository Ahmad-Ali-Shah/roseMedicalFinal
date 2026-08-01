import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FamilyIndex, NumberedEditorialList } from "@/features/public-editorial";

const items = [
  { sequence: "01", title: "First", description: "First description." },
  { sequence: "02", title: "Second", description: "Second description." }
] as const;

describe("F3D public editorial primitives", () => {
  it("renders numbered items as a semantic list with an explicit kind", () => {
    const html = renderToStaticMarkup(
      <NumberedEditorialList items={items} ariaLabel="Example steps" kind="example" />
    );

    expect(html).toContain("<ol");
    expect((html.match(/data-editorial-kind="example"/g) ?? [])).toHaveLength(2);
    expect(html).toContain("First description.");
  });

  it("renders all five registered families with route-safe links", () => {
    const html = renderToStaticMarkup(<FamilyIndex />);

    expect((html.match(/data-family-index-row=/g) ?? [])).toHaveLength(5);
    expect(html).toContain('href="/products/knives"');
    expect(html).toContain('href="/products/cutters"');
  });
});
