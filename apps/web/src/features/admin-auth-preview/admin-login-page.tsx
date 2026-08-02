"use client";

import Link from "next/link";
import { useState } from "react";
import { login } from "@/app/admin/(auth)/login/action";
import { Button } from "@/components/ui";
import { AdminAlert } from "@/features/admin-primitives";
import { AdminOwnerAccessFrame } from "./admin-owner-access-frame";

export function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await login(formData);
    if (result && "error" in result && result.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <AdminOwnerAccessFrame
      eyebrow="Owner access"
      title="Sign in to the Rosa workspace."
      description="Access is restricted to the single verified owner account."
      footer={<p>Search-engine noindex metadata is not access control. Production access requires server-enforced owner authentication.</p>}
    >
      <form action={handleSubmit} className="admin-auth-fields">
        <div className="admin-field-preview">
          <label htmlFor="owner-email">Owner email</label>
          <input
            id="owner-email"
            name="email"
            type="email"
            required
            autoComplete="username"
          />
        </div>
        <div className="admin-field-preview">
          <label htmlFor="owner-password">Password</label>
          <input
            id="owner-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>
        {error ? (
          <AdminAlert tone="danger" title="Sign-in failed">
            {error}
          </AdminAlert>
        ) : null}
        <div className="admin-auth-card__actions">
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
          <Link href="/admin/recovery">Recover owner access</Link>
        </div>
      </form>
    </AdminOwnerAccessFrame>
  );
}
