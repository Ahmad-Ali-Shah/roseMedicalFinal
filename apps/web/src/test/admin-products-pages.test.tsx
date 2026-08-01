import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import {
  AdminProductArchiveConfirmationPreview,
  AdminProductDuplicateCodePreview,
  AdminProductEditorPage,
  AdminProductListLoadingPreview,
  AdminProductMissingImagePreview,
  AdminProductNoMatchesPreview,
  AdminProductPublishConfirmationPreview,
  AdminProductSensitiveClaimPreview,
  AdminProductsListPage,
  AdminProductsLoadFailurePreview,
  AdminProductTitleWarningPreview,
  getAdminProductEditor
} from "@/features/admin-products";

describe("F3E-B product pages", () => {
  it("renders one source-backed product heading and all source identities", () => {
    const html = renderToStaticMarkup(<AdminProductsListPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Manage the instrument catalogue.");
    expect(html).toContain(`${CATALOGUE_PRODUCTS.length} source products`);
    for (const product of CATALOGUE_PRODUCTS) {
      expect(html).toContain(product.name);
      expect(html).toContain(product.code);
      expect(html).toContain(`/admin/products/${product.familySlug}/${product.slug}`);
      expect(html).toContain(`/products/${product.familySlug}/${product.slug}`);
    }
  });

  it("keeps collection controls static and avoids demonstration data", () => {
    const html = renderToStaticMarkup(<AdminProductsListPage />);
    expect(html).not.toContain("<form");
    expect(html).toContain("readonly");
    expect((html.match(/disabled/g) ?? []).length).toBeGreaterThanOrEqual(4);
    expect(html).not.toContain("data-preview-only");
    expect(html).not.toMatch(/126 products|Duplicate Code Record|Needs review|Blocking error|Today|Yesterday|Featured:/i);
    expect(html).not.toMatch(/EN complete|AR complete|AR in progress/i);
  });

  it("renders a source-backed product editor without mutation behavior", () => {
    const model = getAdminProductEditor("knives", "scalpel-handle-no-3");
    expect(model).toBeDefined();
    const html = renderToStaticMarkup(<AdminProductEditorPage model={model!} />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain(model!.product.name);
    expect(html).toContain(model!.product.code);
    expect(html).toContain("Not supplied");
    expect(html).toContain("No managed media file is registered");
    expect(html).toContain("current source-backed public composition");
    expect(html).not.toContain("<form");
    expect(html).not.toContain("data-preview-only");
    expect(html).not.toMatch(/Last saved|Draft differs|Needs review|Publishable|Approved|Complete record/i);
  });

  it("disables every future product mutation", () => {
    const model = getAdminProductEditor("knives", "scalpel-handle-no-3")!;
    const html = renderToStaticMarkup(<AdminProductEditorPage model={model} />);
    for (const label of [
      "Save draft",
      "Submit for review",
      "Publish",
      "Archive",
      "Delete",
      "Add option",
      "Upload media",
      "Replace media"
    ]) {
      expect(html).toContain(label);
    }
    expect((html.match(/disabled/g) ?? []).length).toBeGreaterThanOrEqual(8);
  });

  it("marks every product operational state as preview-only and truthful", () => {
    const html = renderToStaticMarkup(
      <>
        <AdminProductListLoadingPreview />
        <AdminProductNoMatchesPreview />
        <AdminProductsLoadFailurePreview />
        <AdminProductDuplicateCodePreview />
        <AdminProductMissingImagePreview />
        <AdminProductTitleWarningPreview />
        <AdminProductSensitiveClaimPreview />
        <AdminProductArchiveConfirmationPreview />
        <AdminProductPublishConfirmationPreview />
      </>
    );
    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(9);
    expect(html).toContain("No validation or operation occurred");
    expect(html).not.toMatch(/Saved successfully|Published successfully|Deleted successfully/i);
  });
});
