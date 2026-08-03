import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../features/", import.meta.url));
const files = [
  "about/about-page.tsx",
  "about/about.data.ts",
  "procurement-support/procurement-support-page.tsx",
  "procurement-support/procurement-support.data.ts",
  "contact-preview/contact-information-model.ts",
  "contact-preview/contact-page.tsx",
  "search-preview/search-default-page.tsx",
  "legal-pages/legal-document-model.ts"
];

const content = (
  await Promise.all(files.map((file) => readFile(path.join(root, file), "utf8")))
).join("\n");

const prohibitedPublicClaims = [
  /contact@placeholder/i,
  /\+966 XX/i,
  /mailto:/i,
  /tel:/i,
  /wa\.me/i,
  /CONTACT-PLACEHOLDER/i,
  /Saudi law governs/i,
  /retained for \d+ years/i,
  /Google Analytics/i,
  /Mailchimp/i,
  /certified manufacturer/i,
  /our factory/i,
  /years of experience/i
];

test("F3D public copy avoids fake business and legal claims", () => {
  for (const pattern of prohibitedPublicClaims) assert.doesNotMatch(content, pattern);
  assert.match(content, /awaiting client confirmation/i);
  assert.match(content, /qualified legal review/i);
});
