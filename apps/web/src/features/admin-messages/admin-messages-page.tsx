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
  ADMIN_MESSAGE_WORKFLOW,
  MESSAGE_WORKFLOW_COPY,
  getMessageStatusTone
} from "./admin-message-workflow";

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
