import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const authFiles = [
  "features/admin-auth-preview/admin-login-page.tsx",
  "features/admin-auth-preview/admin-recovery-page.tsx"
];
const supportingFiles = [
  "features/admin-dashboard/admin-dashboard-page.tsx",
  "features/admin-dashboard/admin-dashboard-model.ts",
  "features/admin-dashboard/admin-operational-data.tsx",
  "features/admin-primitives/admin-metrics.tsx",
  "components/layout/admin-shell.tsx",
  "features/admin-navigation/admin-navigation-model.ts"
];

const authContent = (
  await Promise.all(authFiles.map((file) => readFile(path.join(root, file), "utf8")))
).join("\n");
const content = (
  await Promise.all(
    [...authFiles, ...supportingFiles].map((file) =>
      readFile(path.join(root, file), "utf8")
    )
  )
).join("\n");

const prohibited = [
  /href=["']\/(?:admin\/register|register|signup)/i,
  /Create account|Sign up|Invite user/i,
  /auth\.signUp|inviteUserByEmail|auth\.admin/i,
  /\b(?:owner|admin|sales|contact)@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  /default password|password123|admin123/i,
  /localStorage|sessionStorage|document\.cookie/i,
  /Saved successfully|Deleted successfully|Published successfully/i,
  /\brevenue\b|\borders\b|\bcheckout\b|\bpayment\b/i,
  /\bF3E\b|\bF4\b|implementation phase/i
];

test("F3E-A uses live single-owner authentication without account creation or embedded credentials", () => {
  for (const pattern of prohibited) assert.doesNotMatch(content, pattern);

  assert.match(authContent, /signInWithPassword/);
  assert.match(authContent, /resetPasswordForEmail/);
  assert.match(authContent, /updateUser\(\{ password: newPassword \}\)/);
  assert.match(authContent, /\/auth\/callback/);
  assert.match(authContent, /autoComplete=["']username["']/);
  assert.match(authContent, /autoComplete=["']current-password["']/);
});
