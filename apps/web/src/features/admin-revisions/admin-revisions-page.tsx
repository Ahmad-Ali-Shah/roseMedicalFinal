import { Button } from "@/components/ui";
import {
  AdminFilterPreview,
  AdminPageHeader,
  AdminSearchPreview,
  AdminSection,
  AdminToolbar
} from "@/features/admin-primitives";
import {
  REVISION_POLICY_ITEMS,
  REVISION_SCHEMA_FIELDS
} from "./admin-revision-policy";

export function AdminRevisionsPage() {
  return (
    <div className="admin-revisions-page">
      <AdminPageHeader
        eyebrow="Revision History"
        title="Preserve every published change."
        description="Revision persistence and rollback are not connected. This page documents the approved append-only policy."
      />

      <AdminToolbar label="Revision history controls">
        <AdminSearchPreview label="Search revisions" placeholder="Search record type or identifier" />
        <AdminFilterPreview id="revision-type-filter" label="Record type" options={["All record types", "Products", "Families", "Catalogues", "Media", "Website Content", "Contact Details"]} />
        <AdminFilterPreview id="revision-action-filter" label="Action" options={["All actions", "Saved", "Published", "Restored"]} />
      </AdminToolbar>

      <section className="admin-governance-empty-state" aria-labelledby="revisions-empty-title">
        <p className="page-eyebrow">Live history</p>
        <h2 id="revisions-empty-title">No revision history is available.</h2>
        <p>No revision record currently exists in frontend source or a connected backend.</p>
      </section>

      <AdminSection
        eyebrow="Append-only policy"
        title="Rollback creates history instead of erasing it."
      >
        <ol className="admin-revision-policy-list">
          {REVISION_POLICY_ITEMS.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </AdminSection>

      <AdminSection
        eyebrow="Future record structure"
        title="Expected revision fields"
        description="These labels describe a future schema. No values or activity are represented."
      >
        <dl className="admin-revision-schema">
          {REVISION_SCHEMA_FIELDS.map((field) => (
            <div key={field}>
              <dt>{field}</dt>
              <dd>Not available</dd>
            </div>
          ))}
        </dl>
      </AdminSection>

      <div className="admin-management-actions">
        <Button variant="secondary" disabled>Compare</Button>
        <Button variant="secondary" disabled>Restore</Button>
        <Button disabled>Rollback</Button>
      </div>
    </div>
  );
}
