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
  "contact-preview/contact-information-panel.tsx",
  "contact-preview/contact-page.tsx",
  "contact-preview/riyadh-map.tsx",
  "search-preview/search-default-page.tsx",
  "legal-pages/legal-document-model.ts"
];

const content = (
  await Promise.all(files.map((file) => readFile(path.join(root, file), "utf8")))
).join("\n");

const prohibitedPublicClaims = [
  /contact@placeholder/i,
  /\+966 XX/i,
  /CONTACT-PLACEHOLDER/i,
  /Saudi law governs/i,
  /retained for \d+ years/i,
  /Google Analytics/i,
  /Mailchimp/i,
  /certified manufacturer/i,
  /our factory/i,
  /years of experience/i
];

test("F3D public copy uses safe centralized examples without fake business or legal claims", () => {
  for (const pattern of prohibitedPublicClaims) assert.doesNotMatch(content, pattern);
  assert.match(content, /hello@example\.com/i);
  assert.match(content, /tel:\+966115550142/i);
  assert.match(content, /wa\.me\/966505550142/i);
  assert.match(content, /Riyadh, Saudi Arabia/i);
  assert.match(content, /rather than created by browsing this website/i);
});
