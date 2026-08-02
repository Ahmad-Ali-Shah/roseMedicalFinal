import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const webRoot = process.cwd();
const source = (path: string) => readFileSync(join(webRoot, path), "utf8");

describe("selective backend integration boundary", () => {
  it("requires only the approved Supabase authentication infrastructure", () => {
    expect(existsSync(join(webRoot, "src/lib/supabase/client.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/lib/supabase/server.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/lib/supabase/middleware.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/lib/supabase/auth-guard.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/middleware.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/app/admin/(auth)/login/action.ts"))).toBe(true);
    expect(existsSync(join(webRoot, "src/app/admin/(workspace)/logout-action.ts"))).toBe(true);
  });

  it("protects the existing workspace with the transferred guard", () => {
    const layout = source("src/app/admin/(workspace)/layout.tsx");
    expect(layout).toContain('import { requireAdmin } from "@/lib/supabase/auth-guard"');
    expect(layout).toContain("await requireAdmin()");
  });

  it("does not transfer backend-only public product behavior", () => {
    const prohibitedPaths = [
      "src/app/(public)/checkout/page.tsx",
      "src/app/(public)/checkout/checkout-client.tsx",
      "src/app/(public)/order-success/page.tsx",
      "src/app/login/page.tsx",
      "src/app/api/checkout/route.ts",
      "src/lib/cart/cart-context.tsx"
    ];

    for (const path of prohibitedPaths) {
      expect(existsSync(join(webRoot, path)), path).toBe(false);
    }
  });

  it("does not transfer incompatible data-management implementations", () => {
    const deferredPaths = [
      "src/lib/supabase/queries.ts",
      "src/lib/supabase/types.ts",
      "src/app/admin/(workspace)/categories/action.ts",
      "src/app/admin/(workspace)/products/action.ts",
      "src/app/admin/(workspace)/messages/action.ts",
      "src/app/admin/(workspace)/site-content/action.ts",
      "src/app/api/contact/route.ts"
    ];

    for (const path of deferredPaths) {
      expect(existsSync(join(webRoot, path)), path).toBe(false);
    }
  });
});
