import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(
  new URL("../styles/f3e-d-governance.css", import.meta.url),
  "utf8"
);
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("F3E-D styles cover all governance domains and breakpoints", () => {
  for (const selector of [
    ".admin-content-page",
    ".admin-contact-details-page",
    ".admin-publishing-page",
    ".admin-revisions-page",
    ".admin-settings-page",
    ".admin-governance-preview"
  ]) {
    assert.match(css, new RegExp(selector.replace(".", "\\.")));
  }
  assert.match(css, /\.admin-publishing-workflow\s*\{[^}]*repeat\(5,/s);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /--color-red\b/);
  assert.match(globals, /@import "\.\.\/styles\/f3e-d-governance\.css";/);
});
