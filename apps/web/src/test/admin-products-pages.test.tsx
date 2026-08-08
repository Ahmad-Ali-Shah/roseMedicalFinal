import { readFileSync } from "node:fs";
import { resolve } from "node:path";
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
  AdminProductsLoadFailurePreview,
  AdminProductTitleWarningPreview,
  getAdminProductEditor
} from "@/features/admin-products";

function source(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

function scalpelHandleModel() {
  const product = CATALOGUE_PRODUCTS.find(
    (candidate) =>
      candidate.familySlug === "knives" &&
      candidate.slug === "scalpel-handle-no-3"
  );
  expect(product).toBeDefined();
  const model = getAdminProductEditor(product!);
  expect(model).toBeDefined();
  return model!;
}

describe("F3E-B product pages", () => {
  it("renders the collection from the canonical live catalogue boundary", () => {
    const listPage = source("src/features/admin-products/admin-products-list-page.tsx");
    expect(listPage).toContain("getLiveCatalogueProducts");
    expect(listPage).toContain("getAdminProductRows(products)");
    expect(listPage).toContain("src={row.mediaPath}");
    expect(listPage).not.toContain('from("products")');
    expect(listPage).not.toContain("stock_status");
    expect(listPage).not.toContain("sell_mode");
    expect(listPage).not.toContain("?category=");
  });

  it("keeps product creation disabled until the canonical create workflow exists", () => {
    const listPage = source("src/features/admin-products/admin-products-list-page.tsx");
    expect(listPage).toContain("<Button disabled>Add product</Button>");
    expect(listPage).toContain("Live canonical catalogue");
  });

  it("renders a canonical product editor with one supported media operation", () => {
    const model = scalpelHandleModel();
    const html = renderToStaticMarkup(<AdminProductEditorPage model={model} />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain(model.product.name);
    expect(html).toContain(model.product.code);
    expect(html).toContain("Protected catalogue identity");
    expect(html).toContain("Primary product image");
    expect(html).toContain("Replace primary image");
    expect(html).toContain("<form");
    expect(html).not.toContain("data-preview-only");
  });

  it("does not expose the removed draft/review/publish workflow", () => {
    const model = scalpelHandleModel();
    const html = renderToStaticMarkup(<AdminProductEditorPage model={model} />);
    for (const label of [
      "Save draft",
      "Submit for review",
      "Publish",
      "Archive",
      "Delete product"
    ]) {
      expect(html).not.toContain(label);
    }
    expect(html).toContain("Replace primary image");
    expect(html).toMatch(/<button[^>]*disabled[^>]*><span class="button__label">Add option<\/span><\/button>/);
  });

  it("marks legacy demonstration states as preview-only and truthful", () => {
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
