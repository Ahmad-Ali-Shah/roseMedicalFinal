"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/account");
        return;
      }

      const res = await fetch("/api/inquiries");
      const data = await res.json();
      
      // Filter to only show this user is inquiries
      const myInquiries = data.filter((inq: any) => inq.user_id === user.id);
      setInquiries(myInquiries);
      setLoading(false);
    }
    loadData();
  }, [router, supabase]);

  if (loading) return <div style={{ color: "white", textAlign: "center", padding: "4rem" }}>Loading your history...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem", background: "#0a0a0a", minHeight: "80vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>My Inquiries & History</h1>
        <button onClick={() => { supabase.auth.signOut(); router.push("/"); }} style={{ padding: "0.5rem 1rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#111", color: "#888", cursor: "pointer" }}>
          Sign Out
        </button>
      </div>

      {inquiries.length === 0 ? (
        <div style={{ background: "#111", padding: "2rem", borderRadius: "0.5rem", border: "1px solid #333", textAlign: "center" }}>
          <p style={{ color: "#888", marginBottom: "1rem" }}>You have not submitted any inquiries yet.</p>
          <Link href="/products" style={{ color: "#3b82f6", textDecoration: "underline" }}>Browse Products</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {inquiries.map((inq: any) => (
            <div key={inq.id} style={{ background: "#111", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #333" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#888", fontSize: "0.875rem" }}>{new Date(inq.created_at).toLocaleDateString()}</span>
                <span style={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.75rem", fontWeight: "bold", background: inq.status === "Contacted" ? "#22c55e33" : "#facc1533", color: inq.status === "Contacted" ? "#22c55e" : "#facc15" }}>
                  {inq.status || "New"}
                </span>
              </div>
              <p style={{ color: "#ccc", fontSize: "0.875rem", whiteSpace: "pre-wrap" }}>{inq.message}</p>
              {inq.appointment_date && (
                <p style={{ color: "#22c55e", fontSize: "0.875rem", marginTop: "0.5rem" }}>📅 Appointment Scheduled: {new Date(inq.appointment_date).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
