import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("F3B stylesheet defines family and detail systems", async () => {
  const css = await read("styles/f3b-pages.css");
  for (const selector of [
    ".family-hero",
    ".family-results-layout",
    ".family-filter-preview",
    ".product-detail-layout",
    ".product-gallery",
    ".product-specification-table",
    ".mobile-inquiry-bar"
  ]) {
    assert.match(css, new RegExp(selector.replaceAll(".", "\\.")));
  }
});

test("F3B includes tablet, mobile, sticky-safe and reduced-motion rules", async () => {
  const css = await read("styles/f3b-pages.css");
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});
