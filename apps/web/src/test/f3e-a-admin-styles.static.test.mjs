import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(
  new URL("../styles/f3e-admin-foundation.css", import.meta.url),
  "utf8"
);

const globals = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8"
);

test("F3E-A styles cover auth, shell, dashboard, tables and responsive rules", () => {
  assert.match(css, /\.admin-auth-shell/);
  assert.match(css, /\.admin-shell/);
  assert.match(css, /\.admin-navigation/);
  assert.match(css, /\.admin-dashboard/);
  assert.match(css, /\.admin-data-table/);
  assert.match(css, /\.admin-record-list/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(css, /position:\s*fixed[^}]*height:\s*100vh/s);
  assert.match(globals, /@import "\.\.\/styles\/f3e-admin-foundation\.css";/);
});
