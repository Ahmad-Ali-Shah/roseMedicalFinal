import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const normalFiles = [
  "features/public-content-registry/public-content-values.ts",
  "features/public-content-registry/public-content-registry.ts",
  "features/admin-governance-source/admin-readiness-model.ts",
  "features/admin-governance-source/contact-impact-model.ts",
  "features/admin-content/admin-content-model.ts",
  "features/admin-content/admin-content-page.tsx",
  "features/admin-contact-details/admin-contact-details-model.ts",
  "features/admin-contact-details/admin-contact-details-page.tsx",
  "features/admin-publishing/admin-publishing-model.ts",
  "features/admin-publishing/admin-publishing-page.tsx",
  "features/admin-revisions/admin-revision-policy.ts",
  "features/admin-revisions/admin-revisions-page.tsx",
  "features/admin-settings/admin-settings-model.ts",
  "features/admin-settings/admin-settings-page.tsx",
  "features/admin-governance-routing/admin-governance-route-model.ts",
  "features/admin-governance-routing/admin-governance-route-view.tsx",
  "app/admin/(workspace)/[...segments]/page.tsx"
];

const normalContent = (
  await Promise.all(normalFiles.map((file) => readFile(path.join(root, file), "utf8")))
).join("\n");

const prohibited = [
  /placeholder\.com/i,
  /owner@|notifications@|sales@|preview\.rosa/i,
  /Published today|Published yesterday|Recently published/i,
  /Revision \d+|Published \d{1,2}:\d{2}/i,
  /\b\d+(?:\.\d+)?\s*(?:KB|MB)\b/i,
  /type=["']file["']/i,
  /onSubmit=|fetch\(|localStorage|sessionStorage|document\.cookie/i,
  /data-preview-only/i,
  /preview-states|preview-fixtures/i,
  /from ["']@\/features\/admin-primitives["']/
];

test("F3E-D normal source contains no fabricated state or preview-only behavior", () => {
  for (const pattern of prohibited) assert.doesNotMatch(normalContent, pattern);
  assert.match(normalContent, /Publishing Engine Connected/);
  assert.match(normalContent, /triggerPublish/);
  assert.match(normalContent, /No revision history is available/);
  assert.match(normalContent, /Not configured/);
  assert.match(normalContent, /Not connected/);
});

test("F3E-D routing removes deferred fallback and blank success paths", async () => {
  const catchAllSource = await readFile(
    path.join(root, "app/admin/(workspace)/[...segments]/page.tsx"),
    "utf8"
  );
  const routeViewSource = await readFile(
    path.join(root, "features/admin-governance-routing/admin-governance-route-view.tsx"),
    "utf8"
  );
  assert.doesNotMatch(catchAllSource, /AdminDeferredRoutePage/);
  assert.doesNotMatch(catchAllSource, /getAdminNavigationItem/);
  assert.match(catchAllSource, /resolveAdminManagementRoute/);
  assert.match(catchAllSource, /resolveAdminOperationsRoute/);
  assert.match(catchAllSource, /resolveAdminGovernanceRoute/);
  assert.match(catchAllSource, /notFound\(\)/);
  assert.doesNotMatch(routeViewSource, /return\s+null/);
  assert.doesNotMatch(routeViewSource, /from ["'][^"']+\/index["']/);
  assert.match(routeViewSource, /admin-content-page/);
  assert.match(routeViewSource, /admin-contact-details-page/);
  assert.match(routeViewSource, /admin-publishing-page/);
  assert.match(routeViewSource, /admin-revisions-page/);
  assert.match(routeViewSource, /admin-settings-page/);
});

const previewFiles = [
  ["features/admin-content/admin-content-preview-states.tsx", 9],
  ["features/admin-contact-details/admin-contact-preview-states.tsx", 7],
  ["features/admin-publishing/admin-publishing-preview-states.tsx", 8],
  ["features/admin-revisions/admin-revision-preview-states.tsx", 5],
  ["features/admin-settings/admin-settings-preview-states.tsx", 6]
];

test("F3E-D demonstration modules remain explicitly preview-only", async () => {
  for (const [file, expectedExports] of previewFiles) {
    const content = await readFile(path.join(root, String(file)), "utf8");
    assert.match(content, /data-preview-only="true"/);
    assert.match(content, /No content, contact, publishing, revision or setting operation occurred/);
    assert.equal((content.match(/export function /g) ?? []).length, expectedExports);
  }
});
