"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminOwnerAccessFrame } from "./admin-owner-access-frame";

export function AdminLoginPage() {
  const [supabase] = useState(createClient);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: authenticationError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (authenticationError) {
        setError("Unable to sign in. Check the owner email and password, then try again.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to reach the authentication service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminOwnerAccessFrame
      eyebrow="Owner access"
      title="Sign in to the Rosa workspace."
      description="Use the configured owner account to manage catalogue and business content. Public account registration is not available."
      footer={<Link href="/admin/recovery">Recover owner access</Link>}
    >
      <form className="admin-auth-form" onSubmit={handleLogin} aria-busy={loading}>
        <fieldset className="admin-auth-fields" disabled={loading}>
          <label className="admin-auth-field" htmlFor="admin-email">
            <span>Owner email</span>
            <input
              id="admin-email"
              name="email"
              type="email"
              required
              autoComplete="username"
              inputMode="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label className="admin-auth-field" htmlFor="admin-password">
            <span>Password</span>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </label>
        </fieldset>

        <div className="admin-auth-feedback" aria-live="polite">
          {error ? <p className="alert alert--danger" role="alert">{error}</p> : null}
        </div>

        <div className="admin-auth-card__actions">
          <button type="submit" className="button button--primary button--standard" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
    </AdminOwnerAccessFrame>
  );
}
