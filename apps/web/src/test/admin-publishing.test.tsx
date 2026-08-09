import { renderServerComponent } from "@/test/render-server-component";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ADMIN_READINESS_ITEMS } from "@/features/admin-governance-source";
import {
  AdminPublishingPage,
  getAdminPublishingModel
} from "@/features/admin-publishing";
import {
  AdminPublishingConfirmationPreview,
  AdminPublishingFailurePreview,
  AdminPublishingPopulatedQueuePreview,
  AdminPublishingReauthenticationPreview,
  AdminPublishingRecentListPreview,
  AdminPublishingReviewDetailPreview,
  AdminPublishingSuccessPreview,
  AdminPublishingValidationFailuresPreview
} from "@/features/admin-publishing/admin-publishing-preview-states";

describe("F3E-D Publishing Centre", () => {
  it("uses the accepted workflow and shared blockers", () => {
    const model = getAdminPublishingModel();
    expect(model.workflow.map((step) => step.label)).toEqual([
      "Draft",
      "Review",
      "Public preview",
      "Explicit publish",
      "Revision history"
    ]);
    expect(model.blockers).toEqual(
      ADMIN_READINESS_ITEMS.filter((item) => item.status !== "Implemented")
    );
  });

  it("renders the connected publishing centre with workflow", async () => {
    const html = await renderServerComponent(<AdminPublishingPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Review every public change.");
    expect(html).toContain("Open live site preview");
    expect(html).toContain("Publish changes live");
    expect(html).not.toContain("data-preview-only");
  });

  it("keeps eight publishing examples preview-only", () => {
    const html = renderToStaticMarkup(<>
      <AdminPublishingPopulatedQueuePreview />
      <AdminPublishingValidationFailuresPreview />
      <AdminPublishingReviewDetailPreview />
      <AdminPublishingReauthenticationPreview />
      <AdminPublishingConfirmationPreview />
      <AdminPublishingFailurePreview />
      <AdminPublishingSuccessPreview />
      <AdminPublishingRecentListPreview />
    </>);
    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(8);
  });
});
