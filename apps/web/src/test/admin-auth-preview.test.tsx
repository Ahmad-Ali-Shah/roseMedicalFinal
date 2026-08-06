import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  AdminExpiredRecoveryLinkPreview,
  AdminInvalidCredentialsPreview,
  AdminLoginLoadingPreview,
  AdminLoginPage,
  AdminRecoveryPage,
  AdminRecoverySentPreview
} from "@/features/admin-auth-preview";

describe("F3E-A owner-access normal routes", () => {
  it("connects live login and recovery forms", () => {
    const login = renderToStaticMarkup(<AdminLoginPage />);
    const recovery = renderToStaticMarkup(<AdminRecoveryPage />);

    expect((login.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(login).toContain("Sign in to the Rosa workspace.");
    expect(login).toContain("<form");
    expect(login).toContain('class="admin-auth-card"');
    expect(login).toContain('class="admin-auth-form"');
    expect(login).toContain('name="email"');
    expect(login).toContain('name="password"');
    expect(login).toContain('aria-live="polite"');
    expect(login).not.toContain("readonly");
    expect(login).not.toContain("Authentication not connected");

    expect((recovery.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(recovery).toContain("Recover owner access.");
    expect(recovery).toContain("<form");
    expect(recovery).toContain('class="admin-auth-card"');
    expect(recovery).toContain('class="admin-auth-form"');
    expect(recovery).toContain('type="email"');
    expect(recovery).toContain('autoComplete="email"');
    expect(recovery).toContain("Send recovery link");
    expect(recovery).toContain('aria-live="polite"');
    expect(recovery).not.toContain("readonly");
    expect(recovery).not.toContain("Recovery not connected");
  });

  it("contains no account creation or fake owner identity", () => {
    const html = renderToStaticMarkup(<><AdminLoginPage /><AdminRecoveryPage /></>);
    expect(html).not.toMatch(/Create account|Sign up|Invite user/i);
    expect(html).not.toMatch(/mailto:|owner@|admin@|\*{2,}@/i);
    expect(html).not.toContain("Recovery email sent");
  });

  it("links only between approved owner-access routes", () => {
    const login = renderToStaticMarkup(<AdminLoginPage />);
    const recovery = renderToStaticMarkup(<AdminRecoveryPage />);
    expect(login).toContain('href="/admin/recovery"');
    expect(recovery).toContain('href="/admin/login"');
  });

  it("marks isolated authentication previews without delivery or session claims", () => {
    const html = renderToStaticMarkup(
      <>
        <AdminLoginLoadingPreview />
        <AdminInvalidCredentialsPreview />
        <AdminRecoverySentPreview />
        <AdminExpiredRecoveryLinkPreview />
      </>
    );
    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(4);
    expect(html).not.toContain("A recovery email has been sent");
    expect(html).not.toContain("Session active");
  });
});
