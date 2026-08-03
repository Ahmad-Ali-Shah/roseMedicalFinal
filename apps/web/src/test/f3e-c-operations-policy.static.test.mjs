import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const normalFiles = [
  "features/admin-inquiries/admin-inquiry-workflow.ts",
  "features/admin-inquiries/admin-inquiries-page.tsx",
  "features/admin-messages/admin-message-workflow.ts",
  "features/admin-messages/admin-messages-page.tsx",
  "features/admin-operations-routing/admin-operations-empty-state.tsx",
  "features/admin-operations-routing/admin-operations-route-model.ts",
  "features/admin-operations-routing/admin-operations-route-view.tsx",
  "app/admin/(workspace)/[...segments]/page.tsx"
];

const content = (
  await Promise.all(normalFiles.map((file) => readFile(path.join(root, file), "utf8")))
).join("\n");

const routeViewSource = await readFile(
  path.join(root, "features/admin-operations-routing/admin-operations-route-view.tsx"),
  "utf8"
);

const prohibited = [
  /ADMIN_INQUIRIES|ADMIN_MESSAGES|LIVE_INQUIRIES|LIVE_MESSAGES/,
  /admin-(?:inquiry|message)-preview/i,
  /EXAMPLE-INQUIRY|Example buyer|Example sender|example\.invalid/i,
  /Nora Rahman|Khalid Ibrahim|Sara Malik|Daniel Weber|Amal Hassan|Omar Saleh|Fatima Noor|Luis García/i,
  /Al Noor Medical|MediSource Trading|Riyadh Health Supplies|EuroMed Distribution|MedImport/i,
  /RM-\d+/i,
  /mailto:|tel:|whatsapp/i,
  /href=["'][^"']*(?:inquiries|messages)\//i,
  /<form|type=["']file["']/i,
  /onSubmit=|onClick=|fetch\(|localStorage|sessionStorage|document\.cookie/i,
  /0 inquiries|0 messages|0 new|4 inquiries|20 latest submissions/i,
  /No new inquiries today|All caught up|Inbox empty|Last synced/i,
  /data-preview-only/i
];

test("F3E-C normal operations source contains no fictional records or live behavior", () => {
  for (const pattern of prohibited) {
    assert.doesNotMatch(content, pattern);
  }
  assert.match(content, /No live inquiry source is connected/);
  assert.match(content, /No live message source is connected/);
  assert.match(content, /No live quotation inquiries are available/);
  assert.match(content, /No live general messages are available/);
});

test("F3E-C route view fails closed rather than returning a blank success", () => {
  assert.match(routeViewSource, /case\s+["']not-found["']:\s*notFound\(\)/);
  assert.doesNotMatch(routeViewSource, /return\s+null/);
});

test("F3E-C normal route graph does not import preview fixtures", () => {
  assert.doesNotMatch(content, /admin-inquiry-previews|admin-message-previews/);
  assert.doesNotMatch(content, /INQUIRY_PREVIEW_LINES/);
});
