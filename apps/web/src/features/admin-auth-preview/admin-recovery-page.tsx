"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminRecoveryPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isRecoverySession, setIsRecoverySession] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Check if the user clicked a recovery link from their email
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsRecoverySession(true);
      }
    };
    checkSession();
  }, [supabase]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const redirectTo = window.location.origin + "/auth/callback";
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("success");
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      alert("Password updated successfully! Please log in.");
      router.push("/admin/login");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "1rem", background: "#0a0a0a" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "#111", padding: "2rem", borderRadius: "0.5rem", border: "1px solid #333" }}>
        <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Recover owner access.</h1>
        
        {isRecoverySession ? (
          <form onSubmit={handleUpdatePassword}>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="newPassword" style={{ display: "block", color: "#888", fontSize: "0.875rem", marginBottom: "0.25rem" }}>New Password</label>
              <input id="newPassword" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#1a1a1a", color: "white", outline: "none" }} />
            </div>
            <button type="submit" disabled={status === "loading"} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "none", background: "#3b82f6", color: "white", fontWeight: "bold", cursor: "pointer", opacity: status === "loading" ? 0.5 : 1 }}>
              {status === "loading" ? "Updating..." : "Update Password"}
            </button>
            {status === "error" && <p style={{ color: "#f87171", marginTop: "1rem", fontSize: "0.875rem" }}>Error: {errorMsg}</p>}
          </form>
        ) : (
          <>
            {status === "success" ? (
              <div style={{ padding: "1rem", background: "#0d1117", borderRadius: "0.25rem", border: "1px solid #2a4a2a", color: "#4ade80" }}>
                Recovery link sent! Check your email inbox (and spam folder) for the reset link.
              </div>
            ) : (
              <form onSubmit={handleReset}>
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="email" style={{ display: "block", color: "#888", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Owner email</label>
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#1a1a1a", color: "white", outline: "none" }} />
                </div>
                <button type="submit" disabled={status === "loading"} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "none", background: "#3b82f6", color: "white", fontWeight: "bold", cursor: "pointer", opacity: status === "loading" ? 0.5 : 1 }}>
                  {status === "loading" ? "Sending..." : "Send recovery link"}
                </button>
                {status === "error" && <p style={{ color: "#f87171", marginTop: "1rem", fontSize: "0.875rem" }}>Error: {errorMsg}</p>}
              </form>
            )}
          </>
        )}

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link href="/admin/login" style={{ color: "#888", fontSize: "0.875rem", textDecoration: "underline" }}>Return to sign in</Link>
        </div>
      </div>
    </div>
  );
}
