import { afterEach, describe, expect, it, vi } from "vitest";
import { createAdminClient } from "@/lib/supabase/admin";

describe("Supabase admin client configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("fails closed with an integration-owned error when service credentials are absent", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");

    expect(() => createAdminClient()).toThrowError(
      "Supabase admin client is not configured.",
    );
  });
});
