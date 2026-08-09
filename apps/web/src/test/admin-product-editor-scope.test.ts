import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string): string {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("lean Product Admin scope", () => {
  it("keeps product identity/workflow mutations out of the editor", () => {
    const editor = source("src/features/admin-products/admin-product-editor-page.tsx");
    const actions = source("src/features/admin-products/actions.ts");
    const mediaUpload = source("src/features/admin-products/product-image-upload-form.tsx");

    expect(editor).not.toContain("updateProductCategory");
    expect(editor).not.toContain("Save draft");
    expect(editor).not.toContain("Send to review");
    expect(editor).not.toContain("Publish");
    expect(editor).not.toContain("Archive");
    expect(editor).not.toContain("Delete product");
    expect(actions).not.toContain("export async function updateProductCategory");
    expect(editor).toContain("ProductImageUploadForm");
    expect(mediaUpload).toContain("Replace primary image");
  });

  it("allows only the configured Supabase product-media path for remote product images", () => {
    const config = source("next.config.ts");

    expect(config).toContain("supabaseOrigin.hostname");
    expect(config).toContain('pathname: "/storage/v1/object/public/product-media/**"');
    expect(config).not.toContain('hostname: "**"');
    expect(config).not.toContain("*.supabase.co\"\n            pathname");
  });
});
