import { describe, expect, it } from "vitest";
import { isConfiguredOwner } from "@/lib/supabase/owner-identity";

describe("owner identity", () => {
  it("uses the configured owner id as the authoritative match", () => {
    expect(
      isConfiguredOwner(
        { id: "actual-owner", email: "other@example.com" },
        { ownerUserId: "actual-owner", ownerEmail: "owner@example.com" }
      )
    ).toBe(true);

    expect(
      isConfiguredOwner(
        { id: "different-user", email: "owner@example.com" },
        { ownerUserId: "actual-owner", ownerEmail: "owner@example.com" }
      )
    ).toBe(false);
  });

  it("falls back to normalized email only when no owner id is configured", () => {
    expect(
      isConfiguredOwner(
        { id: "any-user", email: " OWNER@example.com " },
        { ownerEmail: "owner@example.com" }
      )
    ).toBe(true);

    expect(
      isConfiguredOwner(
        { id: "any-user", email: "someone@example.com" },
        { ownerEmail: "owner@example.com" }
      )
    ).toBe(false);
  });
});
