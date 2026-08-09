import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("owner refinement loads after the premium and RTL foundations", async () => {
  const globals = await read("app/globals.css");
  const premiumImport = '@import "../styles/f7-premium-polish.css";';
  const rtlImport = '@import "../styles/rtl.css";';
  const refinementImport = '@import "../styles/f8-owner-refinement.css";';
  const densityImport = '@import "../styles/public-density.css";';
  const feedbackImport = '@import "../styles/public-feedback-fixes.css";';
  assert.match(globals, /f7-premium-polish\.css/);
  assert.equal(globals.indexOf(rtlImport) > globals.indexOf(premiumImport), true);
  assert.equal(globals.indexOf(refinementImport) > globals.indexOf(rtlImport), true);
  assert.equal(globals.indexOf(densityImport) > globals.indexOf(refinementImport), true);
  assert.equal(globals.indexOf(feedbackImport) > globals.indexOf(densityImport), true);
  assert.equal(globals.trim().endsWith(feedbackImport), true);
});

test("motion tokens expose the approved timing and distance system", async () => {
  const tokens = await read("styles/tokens.css");
  for (const token of [
    "--motion-micro",
    "--motion-component",
    "--motion-section",
    "--motion-hero",
    "--motion-ease",
    "--motion-distance"
  ]) {
    assert.match(tokens, new RegExp(token.replaceAll("-", "\\-")));
  }
});

test("F7 stylesheet covers media, pointer surfaces and global reduced motion", async () => {
  const css = await read("styles/f7-premium-polish.css");
  for (const selector of [
    ".media-frame",
    "[data-motion=\"magnetic\"]",
    "[data-motion=\"tilt\"]",
    "[data-motion=\"spotlight\"]",
    ".text-reveal__clip"
  ]) {
    assert.match(css, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /transition-duration:\s*0\.01ms/);
  assert.match(css, /animation-duration:\s*0\.01ms/);
});

test("coarse pointers do not retain magnetic or tilt transforms", async () => {
  const css = await read("styles/f7-premium-polish.css");
  assert.match(css, /@media\s*\(hover:\s*none\),\s*\(pointer:\s*coarse\)/);
  assert.match(css, /\[data-motion="magnetic"\]/);
  assert.match(css, /\[data-motion="tilt"\]/);
});
