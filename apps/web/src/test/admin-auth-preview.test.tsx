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
  it.each([
    [<AdminLoginPage key="login" />, "Sign in to the Rosa workspace."],
    [<AdminRecoveryPage key="recovery" />, "Recover owner access."]
  ])("renders one heading without a native form", (page, heading) => {
    const html = renderToStaticMarkup(page);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain(heading);
    expect(html).not.toContain("<form");
    expect(html).toContain("readonly");
    expect(html).toContain("disabled");
    expect(html).toContain("noindex metadata is not access control");
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
