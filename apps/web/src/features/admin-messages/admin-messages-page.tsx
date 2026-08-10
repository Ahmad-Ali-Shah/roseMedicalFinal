"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { AdminAlert, AdminPageHeader, AdminStatusBadge, AdminToolbar } from "@/features/admin-primitives";
import type { ContactMessage } from "@/lib/supabase/types";
import { ADMIN_MESSAGE_WORKFLOW, getMessageStatusTone, normalizeMessageStatus, type AdminMessageStatus } from "./admin-message-workflow";

export function AdminMessagesPage() {
  const [records, setRecords] = useState<ContactMessage[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (status) params.set("status", status);
    void fetch(`/api/messages?${params}`)
      .then(async (response) => ({ response, data: await response.json() as unknown }))
      .then(({ response, data }) => {
        if (!active) return;
        setError(response.ok ? "" : "Messages could not be loaded.");
        setRecords(Array.isArray(data) ? data as ContactMessage[] : []);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError("Messages could not be loaded.");
        setLoading(false);
      });
    return () => { active = false; };
  }, [search, status]);

  async function save(record: ContactMessage, formData: FormData) {
    const nextStatus = String(formData.get("status") || "New") as AdminMessageStatus;
    const note = String(formData.get("note") || "");
    const response = await fetch("/api/messages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: record.id, status: nextStatus, note }) });
    if (!response.ok) return setError("The message update was not saved.");
    setRecords((current) => current.map((item) => item.id === record.id ? { ...item, status: nextStatus, admin_note: note.trim() || null } : item));
  }

  async function remove(record: ContactMessage) {
    if (!window.confirm(`Delete the message from ${record.name}? This cannot be undone.`)) return;
    const response = await fetch(`/api/messages?id=${encodeURIComponent(record.id)}`, { method: "DELETE" });
    if (!response.ok) return setError("The message could not be deleted.");
    setRecords((current) => current.filter((item) => item.id !== record.id));
  }

  return (
    <div className="admin-operations-page admin-messages-page">
      <AdminPageHeader eyebrow="General messages" title="Manage contact messages." description="Review website messages, update status, and keep private owner notes." />
      <AdminToolbar label="Message filters">
        <div className="admin-control-preview"><label htmlFor="message-search">Search</label><input id="message-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, email, or subject" /></div>
        <div className="admin-control-preview"><label htmlFor="message-status">Status</label><select id="message-status" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">All statuses</option>{ADMIN_MESSAGE_WORKFLOW.map((item) => <option key={item}>{item}</option>)}</select></div>
      </AdminToolbar>
      {error ? <AdminAlert tone="danger" title="Action failed">{error}</AdminAlert> : null}
      {loading ? <p className="admin-loading-state">Loading messages...</p> : null}
      {!loading && !records.length ? <AdminAlert tone="info" title="No messages">No messages match the current filters.</AdminAlert> : null}
      <div className="admin-queue-list">
        {records.map((record) => {
          const currentStatus = normalizeMessageStatus(record.status);
          return (
            <article className="admin-queue-record" key={record.id}>
              <header><div><h2>{record.name}</h2><p>{record.email}{record.phone ? ` · ${record.phone}` : ""}</p></div><AdminStatusBadge tone={getMessageStatusTone(currentStatus)}>{currentStatus}</AdminStatusBadge></header>
              <p className="admin-queue-record__date">Received {new Date(record.created_at).toLocaleString()}</p>
              {record.subject ? <strong className="admin-queue-record__subject">{record.subject}</strong> : null}
              <div className="admin-queue-record__message">{record.message}</div>
              <form action={(formData) => save(record, formData)} className="admin-queue-editor">
                <div className="admin-field-preview"><label htmlFor={`message-note-${record.id}`}>Private note</label><textarea id={`message-note-${record.id}`} name="note" rows={3} defaultValue={record.admin_note || ""} /></div>
                <div className="admin-field-preview"><label htmlFor={`message-status-${record.id}`}>Status</label><select id={`message-status-${record.id}`} name="status" defaultValue={currentStatus}>{ADMIN_MESSAGE_WORKFLOW.map((item) => <option key={item}>{item}</option>)}</select></div>
                <div className="admin-queue-actions"><Button type="submit" size="small">Save</Button><Button type="button" size="small" variant="quiet" onClick={() => void remove(record)}>Delete</Button></div>
              </form>
            </article>
          );
        })}
      </div>
    </div>
  );
}
