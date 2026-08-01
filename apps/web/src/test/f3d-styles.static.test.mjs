import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../styles/f3d-pages.css", import.meta.url), "utf8");

test("F3D styles include desktop, tablet, mobile and reduced-motion rules", () => {
  assert.match(css, /\.about-hero/);
  assert.match(css, /\.procurement-support-hero/);
  assert.match(css, /\.contact-page/);
  assert.match(css, /\.search-default-page/);
  assert.match(css, /\.legal-page/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(css, /position:\s*absolute[^}]*top:\s*\d{3,}px/s);
});
