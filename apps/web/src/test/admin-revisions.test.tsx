import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminRevisionsPage,
  REVISION_POLICY_ITEMS,
  REVISION_SCHEMA_FIELDS
} from "@/features/admin-revisions";
import {
  AdminRevisionFieldComparisonPreview,
  AdminRevisionPopulatedListPreview,
  AdminRevisionRestoreConfirmationPreview,
  AdminRevisionRestoreFailurePreview,
  AdminRevisionRestoreSuccessPreview
} from "@/features/admin-revisions/admin-revision-preview-states";

describe("F3E-D Revision History", () => {
  it("documents append-only policy and future field names", () => {
    expect(REVISION_POLICY_ITEMS).toHaveLength(6);
    expect(REVISION_SCHEMA_FIELDS).toContain("Changed fields");
    expect(REVISION_SCHEMA_FIELDS).toContain("Restored revision identifier");
  });

  it("renders no normal revision record", () => {
    const html = renderToStaticMarkup(<AdminRevisionsPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("No revision history is available.");
    expect(html).not.toContain("data-admin-revision-record");
    expect(html).not.toMatch(/Revision \d+|Published today|Restore revision \d+/i);
    expect(html).not.toContain("data-preview-only");
  });

  it("keeps five revision examples preview-only", () => {
    const html = renderToStaticMarkup(<>
      <AdminRevisionPopulatedListPreview />
      <AdminRevisionFieldComparisonPreview />
      <AdminRevisionRestoreConfirmationPreview />
      <AdminRevisionRestoreFailurePreview />
      <AdminRevisionRestoreSuccessPreview />
    </>);
    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(5);
  });
});
