import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import {
  AdminAlert,
  AdminFieldPreview,
  AdminSelectPreview,
  AdminStatusBadge,
  AdminTextareaPreview
} from "@/features/admin-primitives";
import { ADMIN_MESSAGE_WORKFLOW } from "./admin-message-workflow";

interface ExampleMessagePreview {
  subject: "Example general message";
  sender: "Example sender";
  organisation: "Example organisation";
  email: "sender@example.invalid";
  country: "Not supplied";
  submittedAt: "Example submission time";
  body: "Example message body for layout review.";
  internalNote: "Example private owner note.";
}

const EXAMPLE_MESSAGE_PREVIEW: ExampleMessagePreview = {
  subject: "Example general message",
  sender: "Example sender",
  organisation: "Example organisation",
  email: "sender@example.invalid",
  country: "Not supplied",
  submittedAt: "Example submission time",
  body: "Example message body for layout review.",
  internalNote: "Example private owner note."
};

function MessagePreviewFrame({
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
      className={`admin-operations-preview admin-message-preview ${className}`.trim()}
      data-preview-only="true"
    >
      <p className="page-eyebrow">Message demonstration state</p>
      <h2>{title}</h2>
      <AdminAlert tone="warning" title="Demonstration preview only">
        No message was classified, updated, replied to or converted.
      </AdminAlert>
      {children}
    </section>
  );
}

export function AdminMessagePopulatedListPreview() {
  return (
    <MessagePreviewFrame title="Populated message-list preview">
      <div className="admin-operations-example-row">
        <div>
          <strong>{EXAMPLE_MESSAGE_PREVIEW.submittedAt}</strong>
          <span>{EXAMPLE_MESSAGE_PREVIEW.sender}</span>
        </div>
        <div>
          <strong>{EXAMPLE_MESSAGE_PREVIEW.subject}</strong>
          <span>{EXAMPLE_MESSAGE_PREVIEW.organisation}</span>
        </div>
        <AdminStatusBadge tone="warning">New</AdminStatusBadge>
        <Button disabled size="small" variant="quiet">Open preview</Button>
      </div>
    </MessagePreviewFrame>
  );
}

function MessageDetailBody({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      <div className="admin-operations-detail-grid">
        <AdminFieldPreview id={`${idPrefix}-subject`} label="Subject" value={EXAMPLE_MESSAGE_PREVIEW.subject} />
        <AdminSelectPreview id={`${idPrefix}-status`} label="Status" options={ADMIN_MESSAGE_WORKFLOW} hint="Disabled demonstration control" />
        <AdminFieldPreview id={`${idPrefix}-time`} label="Submitted" value={EXAMPLE_MESSAGE_PREVIEW.submittedAt} />
        <AdminFieldPreview id={`${idPrefix}-sender`} label="Sender" value={EXAMPLE_MESSAGE_PREVIEW.sender} />
        <AdminFieldPreview id={`${idPrefix}-organisation`} label="Organisation" value={EXAMPLE_MESSAGE_PREVIEW.organisation} />
        <AdminFieldPreview id={`${idPrefix}-email`} label="Email" type="email" value={EXAMPLE_MESSAGE_PREVIEW.email} />
        <AdminFieldPreview id={`${idPrefix}-country`} label="Country" value={EXAMPLE_MESSAGE_PREVIEW.country} />
      </div>
      <AdminTextareaPreview id={`${idPrefix}-body`} label="Message body" value={EXAMPLE_MESSAGE_PREVIEW.body} />
      <AdminAlert tone="warning" title="Manual review guidance">
        A future owner may route product pricing, quantity, variant or instrument-code requests into a structured quotation workflow. No detection or conversion occurred here.
      </AdminAlert>
      <AdminTextareaPreview id={`${idPrefix}-note`} label="Private owner note" value={EXAMPLE_MESSAGE_PREVIEW.internalNote} hint="Read-only demonstration content" />
      <div className="admin-management-actions">
        <Button disabled variant="secondary">Open email</Button>
        <Button disabled>Create inquiry route</Button>
        <Button disabled variant="secondary">Save note</Button>
        <Button disabled>Mark read</Button>
        <Button disabled>Mark replied</Button>
        <Button disabled variant="danger">Close message</Button>
      </div>
    </>
  );
}

export function AdminMessageDetailPreview() {
  return (
    <MessagePreviewFrame title="General-message detail preview">
      <MessageDetailBody idPrefix="example-message-desktop" />
    </MessagePreviewFrame>
  );
}

export function AdminMessageMobileDetailPreview() {
  return (
    <MessagePreviewFrame title="Mobile message-detail preview" className="admin-operations-preview--mobile">
      <MessageDetailBody idPrefix="example-message-mobile" />
    </MessagePreviewFrame>
  );
}

function MessageStatePreview({ title, children }: { title: string; children: ReactNode }) {
  return (
    <MessagePreviewFrame title={title}>
      {children}
      <p>No communication, classification, status update or conversion occurred in this static preview.</p>
    </MessagePreviewFrame>
  );
}

export function AdminMessageListLoadingPreview() {
  return <MessageStatePreview title="Message-list loading preview"><p aria-busy="true">Example loading indicators would appear during a protected collection request.</p></MessageStatePreview>;
}

export function AdminMessageListFailurePreview() {
  return <MessageStatePreview title="Message-list failure preview"><AdminAlert tone="danger" title="Example load failure">No request was attempted.</AdminAlert></MessageStatePreview>;
}

export function AdminMessageNoResultsPreview() {
  return <MessageStatePreview title="Message no-results preview"><p>No example rows match the demonstration filters.</p></MessageStatePreview>;
}

export function AdminMessagePricingGuidancePreview() {
  return <MessageStatePreview title="Pricing-and-quantity guidance preview"><AdminAlert tone="warning" title="Manual review guidance">Product pricing, quantity, variant or code requests belong in a structured quotation flow. No automated detection occurred.</AdminAlert></MessageStatePreview>;
}

export function AdminMessageMarkReadPreview() {
  return <MessageStatePreview title="Mark-read confirmation preview"><p>Proposed target status: Read.</p><Button disabled>Confirm read</Button></MessageStatePreview>;
}

export function AdminMessageMarkRepliedPreview() {
  return <MessageStatePreview title="Mark-replied confirmation preview"><p>Proposed target status: Replied.</p><Button disabled>Confirm replied</Button></MessageStatePreview>;
}

export function AdminMessageClosePreview() {
  return <MessageStatePreview title="Close-message confirmation preview"><p>Proposed target status: Closed.</p><Button disabled variant="danger">Confirm close</Button></MessageStatePreview>;
}

export function AdminMessageInternalNotePreview() {
  return <MessageStatePreview title="Internal-note preview"><AdminTextareaPreview id="example-message-note-edit" label="Private owner note" value={EXAMPLE_MESSAGE_PREVIEW.internalNote} /><Button disabled>Save note</Button></MessageStatePreview>;
}

export function AdminMessageConvertToInquiryPreview() {
  return <MessageStatePreview title="Convert-to-inquiry guidance preview"><p>The required message-to-inquiry contract does not exist.</p><Button disabled>Create inquiry route</Button></MessageStatePreview>;
}
