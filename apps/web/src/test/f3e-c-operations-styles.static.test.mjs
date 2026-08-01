import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(
  new URL("../styles/f3e-c-operations.css", import.meta.url),
  "utf8"
);
const globals = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8"
);

test("F3E-C styles cover normal operations and isolated previews", () => {
  assert.match(css, /\.admin-operations-page/);
  assert.match(css, /\.admin-operations-empty-state/);
  assert.match(css, /\.admin-operations-workflow__list/);
  assert.match(css, /\.admin-message-separation-guide__grid/);
  assert.match(css, /\.admin-operations-preview/);
  assert.match(css, /\.admin-operations-detail-grid/);
  assert.match(css, /\.admin-inquiry-snapshot-list/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(globals, /@import "\.\.\/styles\/f3e-c-operations\.css";/);
});

test("F3E-C workflow and preview grids collapse safely", () => {
  assert.match(css, /\.admin-operations-workflow__list\s*\{[^}]*repeat\(4,/s);
  assert.match(css, /\.admin-inquiry-snapshot-list\s*\{[^}]*repeat\(3,/s);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*\.admin-operations-workflow__list[^{]*\{[^}]*minmax\(0, 1fr\)/s);
  assert.doesNotMatch(css, /position:\s*fixed[^}]*height:\s*100vh/s);
});
