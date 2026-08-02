"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      alert("Password updated successfully! Please log in.");
      router.push("/login");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "1rem", background: "#0a0a0a" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "#111", padding: "2rem", borderRadius: "0.5rem", border: "1px solid #333" }}>
        <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Set New Password</h1>
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="newPassword" style={{ display: "block", color: "#888", fontSize: "0.875rem", marginBottom: "0.25rem" }}>New Password</label>
            <input id="newPassword" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#1a1a1a", color: "white", outline: "none" }} />
          </div>
          <button type="submit" disabled={status === "loading"} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "none", background: "#22c55e", color: "white", fontWeight: "bold", cursor: "pointer", opacity: status === "loading" ? 0.5 : 1 }}>
            {status === "loading" ? "Updating..." : "Update Password"}
          </button>
          {status === "error" && <p style={{ color: "#f87171", marginTop: "1rem", fontSize: "0.875rem" }}>Error: {errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}
