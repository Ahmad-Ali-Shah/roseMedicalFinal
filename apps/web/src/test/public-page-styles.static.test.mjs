import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("F3A stylesheet defines the approved public systems", async () => {
  const css = await read("styles/public-pages.css");
  for (const selector of [
    ".home-hero",
    ".family-card",
    ".product-preview-card",
    ".product-media-placeholder",
    ".procurement-panel",
    ".products-discovery-shell",
    ".catalogue-grid"
  ]) assert.match(css, new RegExp(selector.replaceAll(".", "\\.")));
});

test("F3A stylesheet includes tablet, mobile and reduced-motion rules", async () => {
  const css = await read("styles/public-pages.css");
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("global CSS imports F3A styles after foundations", async () => {
  const css = await read("app/globals.css");
  assert.ok(css.indexOf("../styles/public-pages.css") > css.indexOf("../styles/components.css"));
});
