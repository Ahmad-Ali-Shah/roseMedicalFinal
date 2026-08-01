import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve("apps/web/src");
const normalFiles = [
  "features/admin-auth-preview/admin-login-page.tsx",
  "features/admin-auth-preview/admin-recovery-page.tsx",
  "features/admin-dashboard/admin-dashboard-page.tsx",
  "features/admin-dashboard/admin-dashboard-model.ts",
  "features/admin-dashboard/admin-workspace-status.tsx",
  "features/admin-dashboard/admin-operational-data.tsx",
  "features/admin-primitives/admin-metrics.tsx",
  "components/layout/admin-shell.tsx",
  "features/admin-navigation/admin-navigation-model.ts",
  "features/admin-routing/admin-deferred-route-page.tsx"
];

const content = (
  await Promise.all(normalFiles.map((file) => readFile(path.join(root, file), "utf8")))
).join("\n");

const prohibited = [
  /href=["']\/(?:admin\/register|register|signup)/i,
  /Create account|Sign up|Invite user/i,
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
  /default password|password123|admin123/i,
  /localStorage|sessionStorage|document\.cookie/i,
  /fetch\(|apiClient|createClient/i,
  /Recovery email sent|A recovery email has been sent/i,
  /Saved successfully|Deleted successfully|Published successfully/i,
  /revenue|orders|sales|checkout|payment|inventory/i,
  /\bF3E\b|\bF4\b|implementation phase/i
];

test("F3E-A normal admin source avoids fake auth, data and mutation claims", () => {
  for (const pattern of prohibited) assert.doesNotMatch(content, pattern);
  assert.match(content, /Authentication not connected/i);
  assert.match(content, /Backend not connected/i);
  assert.match(content, /Awaiting live data/i);
});
