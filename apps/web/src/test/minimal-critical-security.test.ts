import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const webRoot = fileURLToPath(new URL("../../", import.meta.url));
const source = (path: string) => readFileSync(join(webRoot, path), "utf8");

describe("minimal critical security patch", () => {
  it("scopes customer inquiry history on the server", () => {
    const account = source("src/app/(public)/account/page.tsx");
    const inquiries = source("src/app/api/inquiries/route.ts");

    expect(account).toContain('fetch("/api/inquiries?scope=mine")');
    expect(account).not.toMatch(/\.filter\s*\([^)]*user_id/);
    expect(inquiries).toContain('scope === "mine"');
    expect(inquiries).toContain('.eq("user_id", user.id)');
  });

  it("requires owner authorization for admin inquiry and message operations", () => {
    expect(existsSync(join(webRoot, "src/lib/supabase/api-auth.ts"))).toBe(true);

    for (const path of [
      "src/app/api/inquiries/route.ts",
      "src/app/api/inquiries/update/route.ts",
      "src/app/api/messages/route.ts"
    ]) {
      expect(source(path), path).toContain("requireApiOwner");
    }
  });

  it("checks the internal alert secret before using the service-role client", () => {
    const alertRoute = source("src/app/api/alert-unread/route.ts");
    const secretCheck = alertRoute.indexOf("ALERT_UNREAD_SECRET");
    const adminClient = alertRoute.indexOf("createAdminClient()");

    expect(secretCheck).toBeGreaterThan(-1);
    expect(adminClient).toBeGreaterThan(secretCheck);
    expect(alertRoute).toContain("authorization");
  });

  it("does not fetch visitor-supplied URLs from the contact request", () => {
    const contactRoute = source("src/app/api/contact/route.ts");

    expect(contactRoute).not.toContain("fetch(url");
    expect(contactRoute).not.toContain("crawled_urls");
    expect(contactRoute).toContain("cosineSim");
    expect(contactRoute).toContain("checkSpam");
  });
});
