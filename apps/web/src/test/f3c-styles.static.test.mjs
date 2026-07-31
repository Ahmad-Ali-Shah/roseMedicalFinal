import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cssPath = path.join(root, "styles", "f3c-pages.css");
const globalsPath = path.join(root, "app", "globals.css");

test("F3C stylesheet is imported and contains all route systems", async () => {
  const [css, globals] = await Promise.all([
    readFile(cssPath, "utf8"),
    readFile(globalsPath, "utf8")
  ]);

  assert.match(globals, /f3c-pages\.css/);
  assert.match(css, /\.catalogue-document-grid/);
  assert.match(css, /\.empty-inquiry-page/);
  assert.match(css, /\.inquiry-preview-layout/);
  assert.match(css, /\.quotation-form-preview/);
  assert.match(css, /\.quotation-blocked-page/);
  assert.match(css, /@media \(max-width: 960px\)/);
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /prefers-reduced-motion/);
});

test("F3C styles use existing token variables and no absolute Figma reconstruction", async () => {
  const css = await readFile(cssPath, "utf8");
  assert.doesNotMatch(css, /position:\s*absolute/);
  assert.doesNotMatch(css, /linear-gradient|radial-gradient/);
  assert.match(css, /var\(--color-rosa-red\)/);
  assert.match(css, /var\(--font-editorial\)/);
});
