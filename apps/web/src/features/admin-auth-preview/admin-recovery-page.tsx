"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminOwnerAccessFrame } from "./admin-owner-access-frame";

type RecoveryStatus = "idle" | "loading" | "success" | "error";

export function AdminRecoveryPage() {
  const [supabase] = useState(createClient);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<RecoveryStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRecoverySession, setIsRecoverySession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) setIsRecoverySession(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (active && event === "PASSWORD_RECOVERY") setIsRecoverySession(true);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const callback = new URL("/auth/callback", window.location.origin);
      callback.searchParams.set("type", "recovery");
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: callback.toString()
      });

      if (error) {
        setStatus("error");
        setErrorMessage("Unable to request a recovery link. Confirm the email and try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Unable to reach the authentication service. Please try again.");
    }
  }

  async function handleUpdatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setStatus("error");
        setErrorMessage("Unable to update the password. Request a fresh recovery link and try again.");
        return;
      }

      await supabase.auth.signOut();
      router.replace("/admin/login");
      router.refresh();
    } catch {
      setStatus("error");
      setErrorMessage("Unable to reach the authentication service. Please try again.");
    }
  }

  const title = isRecoverySession ? "Choose a new owner password." : "Recover owner access.";
  const description = isRecoverySession
    ? "Set a new password for the authenticated recovery session."
    : "Request a secure, one-time recovery link for the configured owner account.";

  return (
    <AdminOwnerAccessFrame
      eyebrow="Secure access recovery"
      title={title}
      description={description}
      footer={<Link href="/admin/login">Return to sign in</Link>}
    >
      {isRecoverySession ? (
        <form className="admin-auth-form" onSubmit={handleUpdatePassword} aria-busy={status === "loading"}>
          <fieldset className="admin-auth-fields" disabled={status === "loading"}>
            <label className="admin-auth-field" htmlFor="admin-new-password">
              <span>New password</span>
              <input
                id="admin-new-password"
                name="newPassword"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="At least 8 characters"
              />
            </label>
          </fieldset>
          <div className="admin-auth-feedback" aria-live="polite">
            {errorMessage ? <p className="alert alert--danger" role="alert">{errorMessage}</p> : null}
          </div>
          <div className="admin-auth-card__actions">
            <button type="submit" className="button button--primary button--standard" disabled={status === "loading"}>
              {status === "loading" ? "Updating…" : "Update password"}
            </button>
          </div>
        </form>
      ) : status === "success" ? (
        <div className="admin-auth-feedback" aria-live="polite">
          <p className="alert alert--success" role="status">
            If this address matches the configured owner account, a recovery link is on its way. Check the inbox and spam folder.
          </p>
        </div>
      ) : (
        <form className="admin-auth-form" onSubmit={handleReset} aria-busy={status === "loading"}>
          <fieldset className="admin-auth-fields" disabled={status === "loading"}>
            <label className="admin-auth-field" htmlFor="admin-recovery-email">
              <span>Owner email</span>
              <input
                id="admin-recovery-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </label>
          </fieldset>
          <div className="admin-auth-feedback" aria-live="polite">
            {errorMessage ? <p className="alert alert--danger" role="alert">{errorMessage}</p> : null}
          </div>
          <div className="admin-auth-card__actions">
            <button type="submit" className="button button--primary button--standard" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send recovery link"}
            </button>
          </div>
        </form>
      )}
    </AdminOwnerAccessFrame>
  );
}
