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

export const ADMIN_MESSAGE_WORKFLOW = [
  "New",
  "Read",
  "Replied",
  "Closed"
] as const;

export type AdminMessageStatus = (typeof ADMIN_MESSAGE_WORKFLOW)[number];

export function getMessageStatusTone(
  status: AdminMessageStatus
): AdminStatusTone {
  switch (status) {
    case "New":
      return "warning";
    case "Read":
      return "review";
    case "Replied":
      return "ready";
    case "Closed":
      return "archived";
  }
}

const MESSAGE_WORKFLOW_COPY: Record<AdminMessageStatus, string> = {
  New: "A message has entered the protected owner queue.",
  Read: "The owner has reviewed the message.",
  Replied: "The owner has responded through a future external communication workflow.",
  Closed: "The message no longer requires active follow-up."
};

function AdminMessageWorkflowGuide() {
  return (
    <AdminSection
      className="admin-operations-workflow"
      eyebrow="Intended workflow"
      title="A separate four-status message queue."
      description="These labels document future vocabulary. They do not describe current messages or communication activity."
    >
      <ol className="admin-operations-workflow__list">
        {ADMIN_MESSAGE_WORKFLOW.map((status) => (
          <li key={status}>
            <AdminStatusBadge tone={getMessageStatusTone(status)}>{status}</AdminStatusBadge>
            <p>{MESSAGE_WORKFLOW_COPY[status]}</p>
          </li>
        ))}
      </ol>
      <p className="admin-operations-boundary-copy">
        The interface does not claim that an email was opened, sent, delivered or replied to.
      </p>
    </AdminSection>
  );
}

export function AdminMessageSeparationGuide() {
  return (
    <AdminSection
      className="admin-message-separation-guide"
      eyebrow="Routing guidance"
      title="Keep general communication separate from structured product requirements."
      description="This is manual owner guidance only. No automatic classification or conversion is implemented."
    >
      <div className="admin-message-separation-guide__grid">
        <article>
          <h3>Remain in General Messages</h3>
          <ul>
            <li>Company-information questions</li>
            <li>Catalogue-availability questions without products or quantities</li>
            <li>Contact-information questions</li>
            <li>Distributor or procurement introductions without structured requirements</li>
            <li>Other general business communication</li>
          </ul>
        </article>
        <article>
          <h3>Use the Quotation Inquiry flow</h3>
          <ul>
            <li>Product pricing requests</li>
            <li>Product quantity requests</li>
            <li>Selected instrument codes</li>
            <li>Requested sizes, variants or directions</li>
            <li>Multiple product requirements needing preserved snapshots</li>
          </ul>
        </article>
      </div>
    </AdminSection>
  );
}

export function AdminMessagesPage() {
  return (
    <div className="admin-operations-page admin-messages-page">
      <AdminPageHeader
        eyebrow="General messages"
        title="Contact messages remain separate."
        description="General company, catalogue and contact questions are not quotation inquiries unless structured product pricing, quantities, variants or instrument requirements are involved."
      />

      <AdminAlert tone="warning" title="No live message source is connected">
        The frontend has not loaded contact-form submissions. No unread, read, replied or closed count is available, and no email or reply provider is connected.
      </AdminAlert>

      <AdminToolbar label="Message collection preview controls">
        <AdminSearchPreview
          id="admin-message-search"
          label="Search messages"
          placeholder="Sender, company or subject"
        />
        <AdminFilterPreview
          id="admin-message-status"
          label="Status"
          options={["All message states", ...ADMIN_MESSAGE_WORKFLOW]}
        />
      </AdminToolbar>
      <p className="admin-operations-control-note">
        Search, filtering and pagination require authenticated live records. Country filtering is excluded until a future message contract supplies country.
      </p>

      <AdminOperationsEmptyState
        title="No live general messages are available."
        description="The current frontend has no persisted contact messages to display."
        supportingText="A future protected backend integration will provide the owner inbox. No sender, subject or status is simulated on this route."
      />

      <AdminPaginationPreview label="Message collection pagination" />
      <AdminMessageSeparationGuide />
      <AdminMessageWorkflowGuide />
    </div>
  );
}

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

function MessageDetailBody() {
  return (
    <>
      <div className="admin-operations-detail-grid">
        <AdminFieldPreview id="example-message-subject" label="Subject" value={EXAMPLE_MESSAGE_PREVIEW.subject} />
        <AdminSelectPreview id="example-message-status" label="Status" options={ADMIN_MESSAGE_WORKFLOW} hint="Disabled demonstration control" />
        <AdminFieldPreview id="example-message-time" label="Submitted" value={EXAMPLE_MESSAGE_PREVIEW.submittedAt} />
        <AdminFieldPreview id="example-message-sender" label="Sender" value={EXAMPLE_MESSAGE_PREVIEW.sender} />
        <AdminFieldPreview id="example-message-organisation" label="Organisation" value={EXAMPLE_MESSAGE_PREVIEW.organisation} />
        <AdminFieldPreview id="example-message-email" label="Email" type="email" value={EXAMPLE_MESSAGE_PREVIEW.email} />
        <AdminFieldPreview id="example-message-country" label="Country" value={EXAMPLE_MESSAGE_PREVIEW.country} />
      </div>
      <AdminTextareaPreview id="example-message-body" label="Message body" value={EXAMPLE_MESSAGE_PREVIEW.body} />
      <AdminAlert tone="warning" title="Manual review guidance">
        A future owner may route product pricing, quantity, variant or instrument-code requests into a structured quotation workflow. No detection or conversion occurred here.
      </AdminAlert>
      <AdminTextareaPreview id="example-message-note" label="Private owner note" value={EXAMPLE_MESSAGE_PREVIEW.internalNote} hint="Read-only demonstration content" />
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
      <MessageDetailBody />
    </MessagePreviewFrame>
  );
}

export function AdminMessageMobileDetailPreview() {
  return (
    <MessagePreviewFrame title="Mobile message-detail preview" className="admin-operations-preview--mobile">
      <MessageDetailBody />
    </MessagePreviewFrame>
  );
}

function MessageStatePreview({ title, children }: { title: string; children: ReactNode }) {
  return (
    <MessagePreviewFrame title={title}>
      {children}
      <p>No upload, communication, classification, status update or conversion occurred in this static preview.</p>
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
