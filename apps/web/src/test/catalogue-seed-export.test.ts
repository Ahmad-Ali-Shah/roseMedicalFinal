import { describe, it } from "vitest";
import { writeFileSync } from "node:fs";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry/products";

describe("generate catalogue seed sql", () => {
  it("writes catalogue-seed.sql", () => {
    const esc = (s: string | undefined) => (s ?? "").replace(/'/g, "''");
    const lines: string[] = ["-- Generated products, variants, images seed"];

    for (const p of CATALOGUE_PRODUCTS) {
      const slug = `${p.familySlug}-${p.slug}`;
      const direction = p.directions?.[0] ? `'${esc(p.directions[0])}'` : "null";

      lines.push(
        `insert into products (category_id, item_code, name_en, name_ar, description_en, description_ar, stock_status, sell_mode, is_active, slug) values ((select id from categories where slug = '${esc(p.familySlug)}'), '${esc(p.code)}', '${esc(p.name)}', '${esc(p.name)}', '${esc(p.description)}', '${esc(p.description)}', 'available', 'quote', true, '${esc(slug)}') on conflict (slug) do update set item_code = excluded.item_code, name_en = excluded.name_en, description_en = excluded.description_en, is_active = true;`
      );

      const codes = p.catalogueCodes && p.catalogueCodes.length > 0
        ? p.catalogueCodes
        : [{ code: p.code, size: p.sizes?.[0] ?? "" }];

      for (const cc of codes) {
        lines.push(
          `insert into product_variants (product_id, sku, size, variant_type) values ((select id from products where slug = '${esc(slug)}'), '${esc(cc.code)}', '${esc(cc.size)}', ${direction}) on conflict (sku) do update set size = excluded.size, variant_type = excluded.variant_type;`
        );
      }

      if (p.mediaPath) {
        lines.push(
          `insert into product_images (product_id, image_path, sort_order) select id, '${esc(p.mediaPath)}', 0 from products where slug = '${esc(slug)}' and not exists (select 1 from product_images where product_id = (select id from products where slug = '${esc(slug)}') and sort_order = 0);`
        );
      }
    }

    writeFileSync("catalogue-seed.sql", lines.join("\n"));
  });
});
