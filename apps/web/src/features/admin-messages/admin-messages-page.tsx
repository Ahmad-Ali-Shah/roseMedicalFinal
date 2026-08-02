"use client";
import { useState, useEffect } from "react";
import {
  AdminAlert,
  AdminPageHeader,
  AdminSection,
  AdminStatusBadge
} from "@/features/admin-primitives";
import {
  ADMIN_MESSAGE_WORKFLOW,
  MESSAGE_WORKFLOW_COPY,
  getMessageStatusTone
} from "./admin-message-workflow";
import { updateMessageStatus } from "./actions";
import type { ContactMessage } from "@/lib/supabase/types";

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
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
      setLoaded(true);
    }
    fetchMessages();
  }, []);

  return (
    <div className="admin-operations-page admin-messages-page">
      <AdminPageHeader
        eyebrow="General messages"
        title="Contact messages remain separate."
        description="General company, catalogue and contact questions are not quotation inquiries unless structured product pricing, quantities, variants or instrument requirements are involved."
      />

      {messages.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
          {messages.map((msg) => {
            const currentStatus = msg.status || "New";
            return (
              <div key={msg.id} style={{ border: "1px solid #333", padding: "1.5rem", borderRadius: "0.5rem", background: "#111" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <h3 style={{ margin: 0, color: "white" }}>{msg.name}</h3>
                  <AdminStatusBadge tone={getMessageStatusTone(currentStatus as any)}>
                    {currentStatus}
                  </AdminStatusBadge>
                </div>
                <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{msg.email} · {msg.phone}</p>
                {msg.company && <p style={{ color: "#aaa", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Company: {msg.company}</p>}
                {msg.subject && <p style={{ color: "#aaa", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Subject: {msg.subject}</p>}
                <p style={{ color: "#ccc", marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>{msg.message}</p>
                {msg.admin_note && (
                  <div style={{ marginTop: "0.75rem", padding: "0.75rem", backgroundColor: "#0d1117", borderLeft: "3px solid #3b82f6", borderRadius: "0.25rem" }}>
                    <p style={{ margin: 0, color: "#60a5fa", fontSize: "0.75rem", fontWeight: "bold", marginBottom: "0.25rem" }}>Admin Note / Reply:</p>
                    <p style={{ margin: 0, color: "#ccc", fontSize: "0.875rem", whiteSpace: "pre-wrap" }}>{msg.admin_note}</p>
                  </div>
                )}
                
                <form action={updateMessageStatus} style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <input type="hidden" name="id" value={msg.id} />
                  <input 
                    type="text" 
                    name="admin_note" 
                    placeholder="Add reply or note..." 
                    style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #444", backgroundColor: "#222", color: "white", flexGrow: 1, fontSize: "0.875rem" }}
                  />
                  <select 
                    name="status" 
                    defaultValue={currentStatus}
                    style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #444", backgroundColor: "#222", color: "white" }}
                  >
                    {ADMIN_MESSAGE_WORKFLOW.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button 
                    type="submit" 
                    style={{ padding: "0.5rem 1rem", borderRadius: "0.25rem", border: "none", backgroundColor: "#3b82f6", color: "white", cursor: "pointer" }}
                  >
                    Update Status
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      ) : loaded ? (
        <AdminAlert tone="warning" title="No Messages Found">
          No general messages are currently available.
        </AdminAlert>
      ) : null}

      <AdminMessageSeparationGuide />
      <AdminMessageWorkflowGuide />
    </div>
  );
}
