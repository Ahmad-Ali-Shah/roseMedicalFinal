import {
  AdminAlert,
  AdminFilterPreview,
  AdminPageHeader,
  AdminPaginationPreview,
  AdminSearchPreview,
  AdminSection,
  AdminStatusBadge,
  AdminToolbar
} from "@/features/admin-primitives";
import { AdminOperationsEmptyState } from "@/features/admin-operations-routing/admin-operations-empty-state";
import {
  ADMIN_INQUIRY_WORKFLOW,
  INQUIRY_WORKFLOW_COPY,
  getInquiryStatusTone
} from "./admin-inquiry-workflow";

function AdminInquiryWorkflowGuide() {
  return (
    <AdminSection
      className="admin-operations-workflow"
      eyebrow="Intended workflow"
      title="A lightweight four-status queue."
      description="These labels describe future workflow vocabulary. They are not attached to current records."
    >
      <ol className="admin-operations-workflow__list">
        {ADMIN_INQUIRY_WORKFLOW.map((status) => (
          <li key={status}>
            <AdminStatusBadge tone={getInquiryStatusTone(status)}>
              {status}
            </AdminStatusBadge>
            <p>{INQUIRY_WORKFLOW_COPY[status]}</p>
          </li>
        ))}
      </ol>
      <p className="admin-operations-boundary-copy">
        No sales stages, assignments, reminders, lead scoring, forecasting or automated follow-up are included.
      </p>
    </AdminSection>
  );
}

function AdminInquirySnapshotPolicy() {
  const fields = [
    "Product name",
    "Product code",
    "Chosen size, variant, direction or documented option",
    "Quantity",
    "Customer line note",
    "General submission note"
  ] as const;

  return (
    <AdminSection
      className="admin-inquiry-snapshot-policy"
      eyebrow="Preserved snapshot policy"
      title="Submitted requirements remain unchanged."
      description="Future catalogue edits must not rewrite the values that a customer submitted."
    >
      <ul className="admin-operations-policy-list">
        {fields.map((field) => <li key={field}>{field}</li>)}
      </ul>
      <AdminAlert tone="warning" title="Immutable submission context">
        A future detail screen may link to the current public product, but the submitted snapshot remains the inquiry record used for review.
      </AdminAlert>
    </AdminSection>
  );
}

export function AdminInquiriesPage() {
  return (
    <div className="admin-operations-page admin-inquiries-page">
      <AdminPageHeader
        eyebrow="Quotation inquiries"
        title="Product requirements awaiting connection."
        description="Future submitted product snapshots remain attached to each inquiry even when catalogue records change later."
      />

      <AdminAlert tone="warning" title="No live inquiry source is connected">
        The frontend has not queried or loaded customer submissions. No record count, status count or last-sync time is available, and protected admin inquiry endpoints remain future work.
      </AdminAlert>

      <AdminToolbar label="Inquiry collection preview controls">
        <AdminSearchPreview
          id="admin-inquiry-search"
          label="Search inquiries"
          placeholder="Reference, customer or company"
        />
        <AdminFilterPreview
          id="admin-inquiry-status"
          label="Status"
          options={["All inquiry states", ...ADMIN_INQUIRY_WORKFLOW]}
        />
        <AdminFilterPreview
          id="admin-inquiry-country"
          label="Country"
          options={["All countries"]}
        />
      </AdminToolbar>
      <p className="admin-operations-control-note">
        Search, filtering and pagination require authenticated live records.
      </p>

      <AdminOperationsEmptyState
        title="No live quotation inquiries are available."
        description="The current frontend has no persisted customer submissions to display."
        supportingText="A future protected backend integration will provide the owner queue. No manual record-creation shortcut is simulated here."
      />

      <AdminPaginationPreview label="Inquiry collection pagination" />
      <AdminInquiryWorkflowGuide />
      <AdminInquirySnapshotPolicy />

      <AdminSection
        className="admin-operations-scope"
        eyebrow="Owner scope"
        title="Keep the first live queue intentionally lightweight."
      >
        <ul className="admin-operations-policy-list">
          <li>Bounded latest-submission pages</li>
          <li>Basic search and workflow filtering</li>
          <li>Country filtering only when supplied by the future contract</li>
          <li>Read-only submitted details and a private owner note</li>
        </ul>
        <p>
          This is not a CRM: no opportunities, sales assignments, lead scores, reminders, conversion analytics or automated follow-up.
        </p>
      </AdminSection>
    </div>
  );
}
