import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const buttonUrl = new URL("../components/ui/button.tsx", import.meta.url);

test("ButtonLink preserves internal typed-route inference without URL ambiguity", async () => {
  const source = await readFile(buttonUrl, "utf8");

  assert.match(source, /ButtonLinkProps<T extends string>/);
  assert.match(source, /href:\s*Route<T>;/);
  assert.doesNotMatch(source, /Route<T>\s*\|\s*URL/);
  assert.match(source, /ButtonLink<T extends string>/);
});
