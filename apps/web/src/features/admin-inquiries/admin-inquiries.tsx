import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import {
  AdminAlert,
  AdminFieldPreview,
  AdminFilterPreview,
  AdminPageHeader,
  AdminPaginationPreview,
  AdminSearchPreview,
  AdminSection,
  AdminSelectPreview,
  AdminStatusBadge,
  AdminTextareaPreview,
  AdminToolbar,
  type AdminStatusTone
} from "@/features/admin-primitives";
import { AdminOperationsEmptyState } from "@/features/admin-operations-routing/admin-operations-empty-state";
import { INQUIRY_PREVIEW_LINES } from "@/features/inquiry-preview";

export const ADMIN_INQUIRY_WORKFLOW = [
  "New",
  "Reviewed",
  "Contacted",
  "Closed"
] as const;

export type AdminInquiryStatus = (typeof ADMIN_INQUIRY_WORKFLOW)[number];

export function getInquiryStatusTone(
  status: AdminInquiryStatus
): AdminStatusTone {
  switch (status) {
    case "New":
      return "warning";
    case "Reviewed":
      return "review";
    case "Contacted":
      return "ready";
    case "Closed":
      return "archived";
  }
}

const INQUIRY_WORKFLOW_COPY: Record<AdminInquiryStatus, string> = {
  New: "A submission has entered the protected owner queue and needs review.",
  Reviewed: "Requirements and preserved product snapshots have been checked.",
  Contacted: "The owner has initiated an external conversation.",
  Closed: "The inquiry no longer requires active follow-up."
};

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

interface ExampleInquiryPreview {
  reference: "EXAMPLE-INQUIRY";
  buyer: "Example buyer";
  organisation: "Example organisation";
  email: "buyer@example.invalid";
  telephone: "Not supplied";
  country: "Example country";
  submittedAt: "Example submission time";
  note: "Example customer note for layout review.";
  internalNote: "Example private owner note.";
}

const EXAMPLE_INQUIRY_PREVIEW: ExampleInquiryPreview = {
  reference: "EXAMPLE-INQUIRY",
  buyer: "Example buyer",
  organisation: "Example organisation",
  email: "buyer@example.invalid",
  telephone: "Not supplied",
  country: "Example country",
  submittedAt: "Example submission time",
  note: "Example customer note for layout review.",
  internalNote: "Example private owner note."
};

function InquiryPreviewFrame({
  title,
  children,
  className = ""
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`admin-operations-preview admin-inquiry-preview ${className}`.trim()}
      data-preview-only="true"
    >
      <p className="page-eyebrow">Inquiry demonstration state</p>
      <h2>{title}</h2>
      <AdminAlert tone="warning" title="Demonstration preview only">
        No customer record was loaded or changed.
      </AdminAlert>
      {children}
    </section>
  );
}

export function AdminInquiryPopulatedListPreview() {
  return (
    <InquiryPreviewFrame title="Populated inquiry-list preview">
      <div className="admin-operations-example-row">
        <div>
          <strong>{EXAMPLE_INQUIRY_PREVIEW.reference}</strong>
          <span>{EXAMPLE_INQUIRY_PREVIEW.submittedAt}</span>
        </div>
        <div>
          <strong>{EXAMPLE_INQUIRY_PREVIEW.buyer}</strong>
          <span>{EXAMPLE_INQUIRY_PREVIEW.organisation}</span>
        </div>
        <span>{EXAMPLE_INQUIRY_PREVIEW.country}</span>
        <AdminStatusBadge tone="warning">New</AdminStatusBadge>
        <Button disabled size="small" variant="quiet">Open preview</Button>
      </div>
    </InquiryPreviewFrame>
  );
}

function SubmittedSnapshotPreview() {
  return (
    <div className="admin-inquiry-snapshot-list">
      {INQUIRY_PREVIEW_LINES.map((line) => (
        <article key={line.id} className="admin-inquiry-snapshot-card">
          <p className="page-eyebrow">Submitted snapshot</p>
          <h3>{line.product.name}</h3>
          <dl>
            <div><dt>Code</dt><dd>{line.product.code}</dd></div>
            <div><dt>Quantity</dt><dd>{line.quantity} example units</dd></div>
            <div><dt>Selected option</dt><dd>{line.size ?? line.variant ?? "Not supplied"}</dd></div>
            <div><dt>Line note</dt><dd>Example line note for layout review.</dd></div>
          </dl>
          <p>This source-backed product snapshot is shown for demonstration only.</p>
        </article>
      ))}
    </div>
  );
}

function InquiryDetailBody() {
  return (
    <>
      <div className="admin-operations-detail-grid">
        <AdminFieldPreview id="example-inquiry-reference" label="Reference" value={EXAMPLE_INQUIRY_PREVIEW.reference} />
        <AdminSelectPreview id="example-inquiry-status" label="Status" options={ADMIN_INQUIRY_WORKFLOW} hint="Disabled demonstration control" />
        <AdminFieldPreview id="example-inquiry-time" label="Submitted" value={EXAMPLE_INQUIRY_PREVIEW.submittedAt} />
        <AdminFieldPreview id="example-inquiry-buyer" label="Buyer" value={EXAMPLE_INQUIRY_PREVIEW.buyer} />
        <AdminFieldPreview id="example-inquiry-organisation" label="Organisation" value={EXAMPLE_INQUIRY_PREVIEW.organisation} />
        <AdminFieldPreview id="example-inquiry-country" label="Country" value={EXAMPLE_INQUIRY_PREVIEW.country} />
        <AdminFieldPreview id="example-inquiry-email" label="Email" type="email" value={EXAMPLE_INQUIRY_PREVIEW.email} />
        <AdminFieldPreview id="example-inquiry-phone" label="Telephone" value={EXAMPLE_INQUIRY_PREVIEW.telephone} />
      </div>
      <SubmittedSnapshotPreview />
      <AdminTextareaPreview id="example-inquiry-note" label="Customer note" value={EXAMPLE_INQUIRY_PREVIEW.note} />
      <AdminTextareaPreview id="example-inquiry-internal-note" label="Private owner note" value={EXAMPLE_INQUIRY_PREVIEW.internalNote} hint="Read-only demonstration content" />
      <div className="admin-management-actions">
        <Button disabled variant="secondary">Open email</Button>
        <Button disabled variant="secondary">Save note</Button>
        <Button disabled>Mark reviewed</Button>
        <Button disabled>Mark contacted</Button>
        <Button disabled variant="danger">Close inquiry</Button>
      </div>
      <AdminAlert tone="warning" title="Snapshot preservation preview">
        No snapshot was loaded. The layout demonstrates how submitted product values remain separate from future catalogue edits.
      </AdminAlert>
    </>
  );
}

export function AdminInquiryDetailPreview() {
  return (
    <InquiryPreviewFrame title="Inquiry-detail preview">
      <InquiryDetailBody />
    </InquiryPreviewFrame>
  );
}

export function AdminInquiryMobileDetailPreview() {
  return (
    <InquiryPreviewFrame title="Mobile inquiry-detail preview" className="admin-operations-preview--mobile">
      <InquiryDetailBody />
    </InquiryPreviewFrame>
  );
}

function InquiryStatePreview({ title, children }: { title: string; children: ReactNode }) {
  return (
    <InquiryPreviewFrame title={title}>
      {children}
      <p>No validation or operation occurred in this static preview.</p>
    </InquiryPreviewFrame>
  );
}

export function AdminInquiryListLoadingPreview() {
  return <InquiryStatePreview title="Inquiry-list loading preview"><p aria-busy="true">Example loading indicators would appear while a protected collection request is pending.</p></InquiryStatePreview>;
}

export function AdminInquiryListFailurePreview() {
  return <InquiryStatePreview title="Inquiry-list load-failure preview"><AdminAlert tone="danger" title="Example load failure">No request was attempted.</AdminAlert></InquiryStatePreview>;
}

export function AdminInquiryNoResultsPreview() {
  return <InquiryStatePreview title="Inquiry no-results preview"><p>No example rows match the demonstration filters.</p></InquiryStatePreview>;
}

export function AdminInquiryStatusTransitionPreview() {
  return <InquiryStatePreview title="Status-transition preview"><AdminSelectPreview id="example-transition" label="Proposed status" options={ADMIN_INQUIRY_WORKFLOW} /><Button disabled>Apply status</Button></InquiryStatePreview>;
}

export function AdminInquiryInternalNotePreview() {
  return <InquiryStatePreview title="Internal-note editing preview"><AdminTextareaPreview id="example-note-edit" label="Private owner note" value={EXAMPLE_INQUIRY_PREVIEW.internalNote} /><Button disabled>Save note</Button></InquiryStatePreview>;
}

export function AdminInquiryMarkReviewedPreview() {
  return <InquiryStatePreview title="Mark-reviewed confirmation preview"><p>Proposed target status: Reviewed.</p><Button disabled>Confirm reviewed</Button></InquiryStatePreview>;
}

export function AdminInquiryMarkContactedPreview() {
  return <InquiryStatePreview title="Mark-contacted confirmation preview"><p>Proposed target status: Contacted.</p><Button disabled>Confirm contacted</Button></InquiryStatePreview>;
}

export function AdminInquiryClosePreview() {
  return <InquiryStatePreview title="Close-inquiry confirmation preview"><p>Proposed target status: Closed.</p><Button disabled variant="danger">Confirm close</Button></InquiryStatePreview>;
}

export function AdminInquiryOpenEmailPreview() {
  return <InquiryStatePreview title="Open-email action preview"><p>No email provider or actionable customer address is connected.</p><Button disabled variant="secondary">Open email</Button></InquiryStatePreview>;
}

export function AdminInquirySnapshotWarningPreview() {
  return <InquiryStatePreview title="Snapshot-preservation warning preview"><AdminAlert tone="warning" title="Preserve submitted values">Current catalogue data must not overwrite a submitted snapshot.</AdminAlert></InquiryStatePreview>;
}
