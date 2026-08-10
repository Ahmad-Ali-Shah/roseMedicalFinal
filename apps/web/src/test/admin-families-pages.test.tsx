import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminFamiliesPage,
  AdminFamilyEditorPage,
  getAdminFamilyEditor
} from "@/features/admin-families";
import { renderServerComponent } from "@/test/render-server-component";

describe("F3E-B family pages", () => {
  it("renders the live family collection boundary without fabricated records", async () => {
    const html = await renderServerComponent(<AdminFamiliesPage />);
    const normalizedHtml = html.replaceAll("<!-- -->", "");
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Manage instrument families.");
    expect(normalizedHtml).toContain("families are available");
    expect(html).not.toContain("data-preview-only");
  });

  it("renders an editable family record", async () => {
    const model = (await getAdminFamilyEditor("knives"))!;
    const html = renderToStaticMarkup(<AdminFamilyEditorPage model={model} />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain(model.name);
    expect(html).toContain("Save family");
    expect(html).toContain('name="introduction_en"');
  });
});
