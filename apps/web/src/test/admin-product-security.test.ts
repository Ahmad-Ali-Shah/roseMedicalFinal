import { describe, expect, it } from "vitest";
import {
  isAdminProfile,
  resolveAdminSupabaseCredentials
} from "@/lib/supabase/admin-security";

describe("admin product security policy", () => {
  it("requires the privileged service role instead of accepting a public key", () => {
    expect(() =>
      resolveAdminSupabaseCredentials({
        NEXT_PUBLIC_SUPABASE_URL: "https://rosa.supabase.co",
        SUPABASE_SERVICE_ROLE_KEY: ""
      })
    ).toThrow(/service_role_key/i);

    expect(
      resolveAdminSupabaseCredentials({
        NEXT_PUBLIC_SUPABASE_URL: "https://rosa.supabase.co",
        SUPABASE_SERVICE_ROLE_KEY: "service-role-secret"
      })
    ).toEqual({
      url: "https://rosa.supabase.co",
      serviceRoleKey: "service-role-secret"
    });
  });

  it("matches the existing single-admin profile role exactly", () => {
    expect(isAdminProfile({ role: "admin" })).toBe(true);
    expect(isAdminProfile({ role: "owner" })).toBe(false);
    expect(isAdminProfile({ role: "user" })).toBe(false);
    expect(isAdminProfile(null)).toBe(false);
  });
});
