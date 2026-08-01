import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import {
  AdminAlert,
  AdminFieldPreview,
  AdminSelectPreview,
  AdminStatusBadge,
  AdminTextareaPreview
} from "@/features/admin-primitives";
import { INQUIRY_PREVIEW_LINES } from "@/features/inquiry-preview";
import { ADMIN_INQUIRY_WORKFLOW } from "./admin-inquiry-workflow";

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

function InquiryDetailBody({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      <div className="admin-operations-detail-grid">
        <AdminFieldPreview id={`${idPrefix}-reference`} label="Reference" value={EXAMPLE_INQUIRY_PREVIEW.reference} />
        <AdminSelectPreview id={`${idPrefix}-status`} label="Status" options={ADMIN_INQUIRY_WORKFLOW} hint="Disabled demonstration control" />
        <AdminFieldPreview id={`${idPrefix}-time`} label="Submitted" value={EXAMPLE_INQUIRY_PREVIEW.submittedAt} />
        <AdminFieldPreview id={`${idPrefix}-buyer`} label="Buyer" value={EXAMPLE_INQUIRY_PREVIEW.buyer} />
        <AdminFieldPreview id={`${idPrefix}-organisation`} label="Organisation" value={EXAMPLE_INQUIRY_PREVIEW.organisation} />
        <AdminFieldPreview id={`${idPrefix}-country`} label="Country" value={EXAMPLE_INQUIRY_PREVIEW.country} />
        <AdminFieldPreview id={`${idPrefix}-email`} label="Email" type="email" value={EXAMPLE_INQUIRY_PREVIEW.email} />
        <AdminFieldPreview id={`${idPrefix}-phone`} label="Telephone" value={EXAMPLE_INQUIRY_PREVIEW.telephone} />
      </div>
      <SubmittedSnapshotPreview />
      <AdminTextareaPreview id={`${idPrefix}-note`} label="Customer note" value={EXAMPLE_INQUIRY_PREVIEW.note} />
      <AdminTextareaPreview id={`${idPrefix}-internal-note`} label="Private owner note" value={EXAMPLE_INQUIRY_PREVIEW.internalNote} hint="Read-only demonstration content" />
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
      <InquiryDetailBody idPrefix="example-inquiry-desktop" />
    </InquiryPreviewFrame>
  );
}

export function AdminInquiryMobileDetailPreview() {
  return (
    <InquiryPreviewFrame title="Mobile inquiry-detail preview" className="admin-operations-preview--mobile">
      <InquiryDetailBody idPrefix="example-inquiry-mobile" />
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
  return <InquiryStatePreview title="Status-transition preview"><AdminSelectPreview id="example-inquiry-transition" label="Proposed status" options={ADMIN_INQUIRY_WORKFLOW} /><Button disabled>Apply status</Button></InquiryStatePreview>;
}

export function AdminInquiryInternalNotePreview() {
  return <InquiryStatePreview title="Internal-note editing preview"><AdminTextareaPreview id="example-inquiry-note-edit" label="Private owner note" value={EXAMPLE_INQUIRY_PREVIEW.internalNote} /><Button disabled>Save note</Button></InquiryStatePreview>;
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
