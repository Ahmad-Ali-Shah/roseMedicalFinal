import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminCatalogueDetailPage,
  AdminCatalogueProcessingPreview,
  AdminCatalogueReplacementFailurePreview,
  AdminCatalogueReplacementPendingPreview,
  AdminCatalogueSafeReplacementPreview,
  AdminCataloguesPage,
  AdminCatalogueUploadSelectionPreview,
  getAdminCatalogueEditor
} from "@/features/admin-catalogues";
import { renderServerComponent } from "@/test/render-server-component";

describe("F3E-B catalogue pages", () => {
  it("renders the live catalogue collection boundary without fake file metadata", async () => {
    const html = await renderServerComponent(<AdminCataloguesPage />);
    const normalizedHtml = html.replaceAll("<!-- -->", "");
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Browse technical catalogues.");
    expect(normalizedHtml).toContain("family catalogues are available");
    expect(html).not.toMatch(/href="[^"]+\.pdf"/i);
    expect(html).not.toMatch(/\b\d+(?:\.\d+)?\s*(?:KB|MB)\b/i);
    expect(html).not.toContain("data-preview-only");
  });

  it("renders a read-only catalogue detail", () => {
    const model = getAdminCatalogueEditor("knives")!;
    const html = renderToStaticMarkup(<AdminCatalogueDetailPage model={model} />);
    expect(html).toContain(model.document.name);
    expect(html).toContain("Document metadata");
    expect(html).not.toContain("Upload / Replace catalogue PDF");
    expect(html).not.toContain("<form");
  });

  it("keeps upload and replacement states isolated", () => {
    const html = renderToStaticMarkup(<><AdminCatalogueUploadSelectionPreview /><AdminCatalogueProcessingPreview /><AdminCatalogueReplacementPendingPreview /><AdminCatalogueReplacementFailurePreview /><AdminCatalogueSafeReplacementPreview /></>);
    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(5);
    expect(html).toContain("No upload or replacement occurred");
  });
});
