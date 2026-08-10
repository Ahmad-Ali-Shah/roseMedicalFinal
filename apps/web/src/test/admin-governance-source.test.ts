import { describe, expect, it } from "vitest";
import {
  ADMIN_READINESS_ITEMS,
  CONTACT_IMPACT_ROWS,
  getUnresolvedContactCount
} from "@/features/admin-governance-source";
import { CONTACT_INFORMATION } from "@/features/contact-preview/contact-information-model";

describe("F3E-D governance source models", () => {
  it("keeps one shared five-item readiness model", () => {
    expect(ADMIN_READINESS_ITEMS).toHaveLength(5);
  });

  it("derives unresolved contact values", () => {
    expect(getUnresolvedContactCount()).toBe(
      CONTACT_INFORMATION.filter((row) => !row.confirmed).length
    );
  });

  it("distinguishes current and unimplemented consumers", () => {
    expect(CONTACT_IMPACT_ROWS.some((row) => row.status === "Current frontend consumer")).toBe(true);
    expect(CONTACT_IMPACT_ROWS.some((row) => row.status === "Not implemented")).toBe(true);
  });
});
