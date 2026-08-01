import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(
  new URL("../styles/f3e-b-catalogue-management.css", import.meta.url),
  "utf8"
);
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("F3E-B styles cover all management domains and breakpoints", () => {
  assert.match(css, /\.admin-products-page/);
  assert.match(css, /\.admin-product-editor/);
  assert.match(css, /\.admin-family-grid/);
  assert.match(css, /\.admin-family-editor/);
  assert.match(css, /\.admin-catalogues-page/);
  assert.match(css, /\.admin-catalogue-detail/);
  assert.match(css, /\.admin-media-page/);
  assert.match(css, /\.admin-media-requirements/);
  assert.match(css, /\.admin-family-grid\s*\{[^}]*repeat\(5,/s);
  assert.match(css, /\.admin-media-requirements\s*\{[^}]*repeat\(3,/s);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(globals, /@import "\.\.\/styles\/f3e-b-catalogue-management\.css";/);
});
