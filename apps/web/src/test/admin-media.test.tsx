import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CATALOGUE_FAMILIES, CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";
import {
  AdminMediaImageInUsePreview,
  AdminMediaPage,
  AdminMediaPossibleDuplicatePreview,
  AdminMediaProtectedAssetPreview,
  AdminMediaUnsupportedFormatPreview,
  AdminMediaUploadSelectionPreview,
  getAdminMediaRequirements
} from "@/features/admin-media";

describe("F3E-B media requirements", () => {
  it("derives thirty transient requirements from current source", () => {
    const requirements = getAdminMediaRequirements();
    expect(requirements).toHaveLength(
      CATALOGUE_PRODUCTS.length + CATALOGUE_DOCUMENTS.length + CATALOGUE_FAMILIES.length
    );
    expect(requirements.filter((item) => item.kind === "product")).toHaveLength(20);
    expect(requirements.filter((item) => item.kind === "catalogue-cover")).toHaveLength(5);
    expect(requirements.filter((item) => item.kind === "family-imagery")).toHaveLength(5);
  });

  it("keeps family imagery explicitly derived and excludes ROSA identity", () => {
    const requirements = getAdminMediaRequirements();
    for (const item of requirements.filter((candidate) => candidate.kind === "family-imagery")) {
      expect(item.sourceLabel).toBe("No managed asset registered");
      expect(item.label).toContain("family imagery requirement");
    }
    expect(requirements.some((item) => /ROSA/i.test(item.label))).toBe(false);
  });

  it("renders an honest empty library rather than asset cards", () => {
    const html = renderToStaticMarkup(<AdminMediaPage />);
    expect((html.match(/data-admin-media-requirement=/g) ?? [])).toHaveLength(30);
    expect(html).toContain("No managed media assets are registered.");
    expect(html).toContain("Protected ROSA identity");
    expect(html).not.toContain("data-preview-only");
    expect(html).not.toMatch(/\.jpg|\.png|\.svg|\.tif|\bKB\b|\bMB\b|\d+ × \d+/i);
  });

  it("keeps media operational states isolated", () => {
    const html = renderToStaticMarkup(
      <>
        <AdminMediaUploadSelectionPreview />
        <AdminMediaUnsupportedFormatPreview />
        <AdminMediaPossibleDuplicatePreview />
        <AdminMediaProtectedAssetPreview />
        <AdminMediaImageInUsePreview />
      </>
    );
    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(5);
    expect(html).toContain("No upload, validation or replacement occurred");
  });
});
