import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminGovernanceRouteView,
  isAdminGovernanceRoot,
  resolveAdminGovernanceRoute
} from "@/features/admin-governance-routing";

describe("F3E-D governance routing", () => {
  it.each([
    ["content"],
    ["contact-details"],
    ["publishing"],
    ["revisions"],
    ["settings"]
  ])("resolves exact route %j", (segments) => {
    expect(resolveAdminGovernanceRoute(segments).kind).toBe(segments[0]);
  });

  it.each([
    [],
    ["content", "example"],
    ["contact-details", "example"],
    ["publishing", "example"],
    ["revisions", "example"],
    ["settings", "example"],
    ["unknown"]
  ])("rejects unsupported shape %j", (segments) => {
    expect(resolveAdminGovernanceRoute(segments).kind).toBe("not-found");
  });

  it("renders normal route views without preview-only states", () => {
    const html = renderToStaticMarkup(
      <AdminGovernanceRouteView result={{ kind: "content" }} />
    );
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).not.toContain("data-preview-only");
  });

  it("owns only the five governance roots", () => {
    expect(isAdminGovernanceRoot("content")).toBe(true);
    expect(isAdminGovernanceRoot("products")).toBe(false);
  });
});
