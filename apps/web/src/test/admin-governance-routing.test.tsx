import { describe, expect, it } from "vitest";
import {
  AdminGovernanceRouteView,
  isAdminGovernanceRoot,
  resolveAdminGovernanceRoute
} from "@/features/admin-governance-routing";
import { renderServerComponent } from "@/test/render-server-component";

describe("F3E-D governance routing", () => {
  it("resolves the retained contact route", () => {
    expect(resolveAdminGovernanceRoute(["contact-details"]).kind).toBe("contact-details");
  });

  it.each([
    { segments: [] },
    { segments: ["content", "example"] },
    { segments: ["contact-details", "example"] },
    { segments: ["publishing", "example"] },
    { segments: ["revisions", "example"] },
    { segments: ["settings", "example"] },
    { segments: ["unknown"] }
  ] as const)("rejects unsupported shape $segments", ({ segments }) => {
    expect(resolveAdminGovernanceRoute(segments).kind).toBe("not-found");
  });

  it("renders normal route views without preview-only states", async () => {
    const html = await renderServerComponent(
      <AdminGovernanceRouteView result={{ kind: "contact-details" }} />
    );
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).not.toContain("data-preview-only");
  });

  it("owns only the retained governance root", () => {
    expect(isAdminGovernanceRoot("contact-details")).toBe(true);
    expect(isAdminGovernanceRoot("content")).toBe(false);
    expect(isAdminGovernanceRoot("products")).toBe(false);
  });
});
