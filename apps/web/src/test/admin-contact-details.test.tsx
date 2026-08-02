import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminContactDetailsPage,
  getAdminContactDetailsModel
} from "@/features/admin-contact-details";
import {
  AdminContactAffectedLocationsPreview,
  AdminContactEditedDraftPreview,
  AdminContactPublicationConfirmationPreview,
  AdminContactReviewConfirmationPreview,
  AdminContactSaveFailurePreview,
  AdminContactSaveLoadingPreview,
  AdminContactUnresolvedValidationPreview
} from "@/features/admin-contact-details/admin-contact-preview-states";
import { CONTACT_INFORMATION } from "@/features/contact-preview/contact-information-model";

describe("F3E-D Contact Details", () => {
  it("uses the existing contact model without replacement values", () => {
    const model = getAdminContactDetailsModel();
    expect(model.rows).toBe(CONTACT_INFORMATION);
    expect(model.unresolvedCount).toBe(CONTACT_INFORMATION.filter((row) => !row.confirmed).length);
  });

  it("renders no invented actionable contact data", () => {
    const html = renderToStaticMarkup(<AdminContactDetailsPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Replace unresolved contact values safely.");
    expect(html).toContain("Awaiting client confirmation");
    expect(html).not.toMatch(/\+966|Riyadh|Saudi Arabia|placeholder\.com|mailto:|tel:|wa\.me/i);
    expect(html).not.toContain("data-preview-only");
    expect(html).not.toContain("<form");
  });

  it("keeps seven contact examples preview-only", () => {
    const html = renderToStaticMarkup(<>
      <AdminContactEditedDraftPreview />
      <AdminContactUnresolvedValidationPreview />
      <AdminContactAffectedLocationsPreview />
      <AdminContactSaveLoadingPreview />
      <AdminContactSaveFailurePreview />
      <AdminContactReviewConfirmationPreview />
      <AdminContactPublicationConfirmationPreview />
    </>);
    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(7);
  });
});
