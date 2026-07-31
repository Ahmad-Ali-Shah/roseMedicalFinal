import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.resolve(testDirectory, "..");

const publicFiles = [
  "features/catalogues/catalogues-page.tsx",
  "features/catalogues/catalogue-card.tsx",
  "features/catalogues/catalogue-guidance.tsx",
  "features/inquiry-preview/empty-inquiry-page.tsx",
  "features/quotation-preview/quotation-blocked-page.tsx"
];

const prohibitedOffers = [
  /buy now/i,
  /checkout/i,
  /payment method/i,
  /shipping fee/i,
  /in stock/i,
  /out of stock/i,
  /order total/i,
  /add to cart/i
];

test("F3C public routes avoid ecommerce offers and internal phase language", async () => {
  const content = (
    await Promise.all(
      publicFiles.map((relativePath) =>
        readFile(path.join(sourceRoot, relativePath), "utf8")
      )
    )
  ).join("\n");

  for (const pattern of prohibitedOffers) {
    assert.doesNotMatch(content, pattern);
  }

  assert.doesNotMatch(content, /F3C|F4|implementation phase|behavior is activated/i);
});

test("F3C previews preserve truthful procurement quantities", async () => {
  const summary = await readFile(
    path.join(sourceRoot, "features/inquiry-preview/inquiry-summary-preview.tsx"),
    "utf8"
  );

  assert.match(summary, /Total quantity/);
  assert.match(summary, /No monetary prices are shown/);
});
