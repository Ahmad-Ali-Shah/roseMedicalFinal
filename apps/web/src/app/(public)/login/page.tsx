"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else alert("Check your email for a confirmation link!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push("/checkout");
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "1rem", background: "#0a0a0a" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "#111", padding: "2rem", borderRadius: "0.5rem", border: "1px solid #333" }}>
        <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>{isSignUp ? "Create an account" : "Sign in to Rosa Medical"}</h1>
        <form onSubmit={handleAuth}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email" style={{ display: "block", color: "#888", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#1a1a1a", color: "white", outline: "none" }} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password" style={{ display: "block", color: "#888", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#1a1a1a", color: "white", outline: "none" }} />
          </div>
          {error && <p style={{ color: "#f87171", marginBottom: "1rem", fontSize: "0.875rem" }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.25rem", border: "none", background: "#3b82f6", color: "white", fontWeight: "bold", cursor: "pointer", opacity: loading ? 0.5 : 1 }}>
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <button onClick={() => setIsSignUp(!isSignUp)} style={{ background: "none", border: "none", color: "#888", fontSize: "0.875rem", textDecoration: "underline", cursor: "pointer" }}>
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
