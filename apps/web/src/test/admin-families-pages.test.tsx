import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CATALOGUE_FAMILIES } from "@/features/catalogue-registry";
import {
  AdminFamiliesPage,
  AdminFamilyEditorPage,
  getAdminFamilyEditor
} from "@/features/admin-families";

describe("F3E-B family pages", () => {
  it("renders five source-backed family cards", () => {
    const html = renderToStaticMarkup(<AdminFamiliesPage />);
    expect((html.match(/data-admin-family-card=/g) ?? [])).toHaveLength(CATALOGUE_FAMILIES.length);
    for (const family of CATALOGUE_FAMILIES) {
      expect(html).toContain(family.name);
      expect(html).toContain(family.introduction);
      expect(html).toContain(`/admin/families/${family.slug}`);
      expect(html).toContain(`/products/${family.slug}`);
    }
    expect(html).not.toContain("data-preview-only");
  });

  it("renders a read-only family editor", () => {
    const model = getAdminFamilyEditor("knives")!;
    const html = renderToStaticMarkup(<AdminFamilyEditorPage model={model} />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain(model.family.name);
    expect(html).toContain("Not supplied");
    expect(html).toContain("No family content, imagery, featured assignment or catalogue file can be changed here.");
    expect(html).toContain("Awaiting publication");
    expect(html).not.toContain("<form");
    expect(html).not.toMatch(/Featured products|Last updated|Published status/i);
  });
});
