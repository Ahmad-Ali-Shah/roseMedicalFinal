"use client";
import { useState, useEffect } from "react";
import {
  AdminAlert,
  AdminPageHeader,
  AdminSection,
  AdminStatusBadge
} from "@/features/admin-primitives";
import {
  ADMIN_INQUIRY_WORKFLOW,
  INQUIRY_WORKFLOW_COPY,
  getInquiryStatusTone
} from "./admin-inquiry-workflow";
import type { QuoteRequest } from "@/lib/supabase/types";

interface LiveInquiry extends QuoteRequest {
  notification?: string;
}

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
            <AdminStatusBadge tone={getInquiryStatusTone(status)}>{status}</AdminStatusBadge>
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

const PAGE_SIZE = 5;

export function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<LiveInquiry[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All inquiry states");
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchInquiries() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status !== "All inquiry states") params.set("status", status);
    
    const res = await fetch(`/api/inquiries?${params.toString()}`);
    const data = await res.json();
    setInquiries(data);
    setLoaded(true);
    setCurrentPage(1);
  }

  useEffect(() => {
    fetchInquiries();
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetchInquiries();
  }

  async function handleUpdate(id: string, status: string, date?: string) {
    const res = await fetch("/api/inquiries/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, date })
    });
    
    if (res.ok) {
      // Update local state instantly without refetching
      setInquiries(prev => prev.map(inq => {
        if (inq.id === id) {
          let notification = inq.notification;
          let appointment_date = inq.appointment_date;
          
          if (status === "Contacted" && date) {
            appointment_date = date;
            notification = `Meeting scheduled for ${date}`;
          } else if (status === "Closed") {
            notification = "Inquiry declined and closed";
          } else if (status === "Reviewed") {
            notification = "Inquiry reviewed";
          } else {
            notification = `Status updated to ${status}`;
          }
          
          return { ...inq, status, appointment_date, notification };
        }
        return inq;
      }));
    }
  }

  const totalPages = Math.ceil(inquiries.length / PAGE_SIZE);
  const indexOfLast = currentPage * PAGE_SIZE;
  const indexOfFirst = indexOfLast - PAGE_SIZE;
  const currentInquiries = inquiries.slice(indexOfFirst, indexOfLast);

  return (
    <div className="admin-operations-page admin-inquiries-page">
      <AdminPageHeader
        eyebrow="Quotation inquiries"
        title="Product requirements awaiting connection."
        description="Future submitted product snapshots remain attached to each inquiry even when catalogue records change later."
      />

      <form onSubmit={onSubmit} style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem", padding: "1rem 1.5rem", background: "#111", borderRadius: "0.5rem", border: "1px solid #333" }}>
        <input 
          type="text" 
          name="search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..." 
          style={{ padding: "0.75rem 1rem", borderRadius: "0.375rem", border: "1px solid #444", backgroundColor: "#1a1a1a", color: "white", flexGrow: 1, fontSize: "0.875rem", outline: "none" }}
        />
        <select 
          name="status" 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: "0.75rem 1rem", borderRadius: "0.375rem", border: "1px solid #444", backgroundColor: "#1a1a1a", color: "white", fontSize: "0.875rem", outline: "none" }}
        >
          <option value="All inquiry states">All Statuses</option>
          {ADMIN_INQUIRY_WORKFLOW.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button 
          type="submit" 
          style={{ padding: "0.75rem 1.5rem", borderRadius: "0.375rem", border: "none", backgroundColor: "#3b82f6", color: "white", cursor: "pointer", fontWeight: "600", fontSize: "0.875rem" }}
        >
          Filter
        </button>
      </form>

      {currentInquiries.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
          {currentInquiries.map((inq) => {
            const currentStatus = inq.status || "New";
            const isClosed = currentStatus === "Closed";
            const isContacted = currentStatus === "Contacted";
            
            return (
              <div key={inq.id} style={{ border: "1px solid #333", padding: "1.5rem", borderRadius: "0.5rem", background: "#111" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <h3 style={{ margin: 0, color: "white", fontSize: "1.125rem" }}>{inq.name}</h3>
                  <AdminStatusBadge tone={getInquiryStatusTone(currentStatus as any)}>
                    {currentStatus}
                  </AdminStatusBadge>
                </div>
                <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{inq.email} · {inq.phone}</p>
                <p style={{ color: "#ccc", marginTop: "0.5rem", whiteSpace: "pre-wrap", fontSize: "0.875rem" }}>{inq.message}</p>
                
                {inq.appointment_date && (
                  <p style={{ color: "#4ade80", fontSize: "0.875rem", marginTop: "0.5rem" }}>📅 Scheduled for: {new Date(inq.appointment_date).toLocaleDateString()}</p>
                )}
                
                {inq.notification && (
                  <p style={{ color: "#60a5fa", fontSize: "0.875rem", marginTop: "0.25rem", fontWeight: "bold" }}>🔔 {inq.notification}</p>
                )}
                
                <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  {!isContacted && !isClosed && (
                    <>
                      <input 
                        type="date" 
                        id={`date-${inq.id}`}
                        style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #444", backgroundColor: "#1a1a1a", color: "white", fontSize: "0.875rem" }}
                      />
                      <button 
                        onClick={() => {
                          const dateInput = document.getElementById(`date-${inq.id}`) as HTMLInputElement;
                          if (dateInput && dateInput.value) {
                            handleUpdate(inq.id, "Contacted", dateInput.value);
                          } else {
                            alert("Please select a date first");
                          }
                        }}
                        style={{ padding: "0.5rem 1rem", borderRadius: "0.25rem", border: "none", backgroundColor: "#22c55e", color: "white", cursor: "pointer", fontWeight: "500", fontSize: "0.875rem" }}
                      >
                        Approve
                      </button>
                    </>
                  )}
                  {!isClosed && (
                    <button 
                      onClick={() => handleUpdate(inq.id, "Closed")}
                      style={{ padding: "0.5rem 1rem", borderRadius: "0.25rem", border: "none", backgroundColor: "#ef4444", color: "white", cursor: "pointer", fontWeight: "500", fontSize: "0.875rem" }}
                    >
                      Decline
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : loaded ? (
        <AdminAlert tone="warning" title="No Inquiries Found">
          No inquiries match your search or filter criteria.
        </AdminAlert>
      ) : null}

      {inquiries.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", marginBottom: "2rem", padding: "1rem 1.5rem", background: "#111", borderRadius: "0.5rem", border: "1px solid #333" }}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: "0.5rem 1.25rem", borderRadius: "0.375rem", border: "1px solid #444", backgroundColor: "#1a1a1a", color: currentPage === 1 ? "#555" : "white", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontWeight: "500", fontSize: "0.875rem" }}
          >
            Previous
          </button>
          <span style={{ color: "#888", fontSize: "0.875rem" }}>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ padding: "0.5rem 1.25rem", borderRadius: "0.375rem", border: "1px solid #444", backgroundColor: "#1a1a1a", color: currentPage === totalPages ? "#555" : "white", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontWeight: "500", fontSize: "0.875rem" }}
          >
            Next
          </button>
        </div>
      )}

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
