import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";
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

describe("F3E-B catalogue pages", () => {
  it("renders five catalogue records without fake file metadata", () => {
    const html = renderToStaticMarkup(<AdminCataloguesPage />);
    for (const document of CATALOGUE_DOCUMENTS) {
      expect(html).toContain(document.name);
      expect(html).toContain(document.description);
      expect(html).toContain(`/admin/catalogues/${document.familySlug}`);
    }
    expect(html).not.toMatch(/\b[A-Za-z0-9_-]+\.pdf\b|\bKB\b|\bMB\b|Processing|Replacement pending|Upload failed|Today|Yesterday/i);
    expect(html).not.toContain("data-preview-only");
  });

  it("renders a truthful catalogue detail", () => {
    const model = getAdminCatalogueEditor("knives")!;
    const html = renderToStaticMarkup(<AdminCatalogueDetailPage model={model} />);
    expect(html).toContain(model.document.name);
    expect(html).toContain(model.availability);
    expect(html).toContain("No upload or replacement operation is active");
    expect(html).not.toContain("<form");
    expect((html.match(/disabled/g) ?? []).length).toBeGreaterThanOrEqual(5);
  });

  it("keeps upload and replacement states isolated", () => {
    const html = renderToStaticMarkup(<><AdminCatalogueUploadSelectionPreview /><AdminCatalogueProcessingPreview /><AdminCatalogueReplacementPendingPreview /><AdminCatalogueReplacementFailurePreview /><AdminCatalogueSafeReplacementPreview /></>);
    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(5);
    expect(html).toContain("No upload or replacement occurred");
  });
});
