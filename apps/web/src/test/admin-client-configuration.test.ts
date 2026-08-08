import { afterEach, describe, expect, it, vi } from "vitest";
import { createAdminClient } from "@/lib/supabase/admin";

describe("Supabase admin client configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("fails closed when the Supabase URL is absent", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-service-role");

    expect(() => createAdminClient()).toThrowError(
      "NEXT_PUBLIC_SUPABASE_URL is not configured."
    );
  });

  it("fails closed when privileged service credentials are absent", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");

    expect(() => createAdminClient()).toThrowError(
      "SUPABASE_SERVICE_ROLE_KEY is required for privileged server operations."
    );
  });
});
