import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const normalFiles = [
  "features/admin-products/admin-product-model.ts",
  "features/admin-products/admin-products-list-page.tsx",
  "features/admin-products/admin-product-editor-page.tsx",
  "features/admin-families/admin-family-model.ts",
  "features/admin-families/admin-families-page.tsx",
  "features/admin-families/admin-family-editor-page.tsx",
  "features/admin-catalogues/admin-catalogue-model.ts",
  "features/admin-catalogues/admin-catalogues-page.tsx",
  "features/admin-catalogues/admin-catalogue-detail-page.tsx",
  "features/admin-media/admin-media-model.ts",
  "features/admin-media/admin-media-page.tsx",
  "features/admin-management-routing/admin-management-route-model.ts",
  "features/admin-management-routing/admin-management-route-view.tsx"
];
const content = (
  await Promise.all(normalFiles.map((file) => readFile(path.join(root, file), "utf8")))
).join("\n");
const routeViewSource = await readFile(
  path.join(root, "features/admin-management-routing/admin-management-route-view.tsx"),
  "utf8"
);

const prohibited = [
  /126 products/i,
  /Duplicate Code Record/i,
  /Needs review|Blocking error|Secure session/i,
  /\bToday\b|\bYesterday\b|2 days ago/i,
  /EN complete|AR complete|AR in progress/i,
  /knives-catalogue\.pdf|scissors-catalogue\.pdf/i,
  /\b\d+(?:\.\d+)?\s*(?:KB|MB)\b/i,
  /\b\d+\s*[×x]\s*\d+\b/i,
  /type=["']file["']/i,
  /onSubmit=|fetch\(|localStorage|sessionStorage/i,
  /ADMIN_MEDIA_ASSETS|ADMIN_MEDIA_REQUIREMENTS/i,
  /data-preview-only/i
];

test("F3E-B normal source contains no fabricated state or behavior", () => {
  for (const pattern of prohibited) assert.doesNotMatch(content, pattern);
  assert.match(content, /Source record/);
  assert.match(content, /No managed media assets are registered/);
  assert.match(content, /Awaiting publication/);
});

test("F3E-B route view never returns a blank successful response", () => {
  assert.match(routeViewSource, /notFound\(\)/);
  assert.doesNotMatch(routeViewSource, /return\s+null/);
});
