import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  ADMIN_SETTINGS_GROUPS,
  AdminSettingsPage,
  PROTECTED_SYSTEM_SETTINGS
} from "@/features/admin-settings";
import {
  AdminSettingsNotificationValidationPreview,
  AdminSettingsPasswordChangePreview,
  AdminSettingsProtectedWarningPreview,
  AdminSettingsSaveFailurePreview,
  AdminSettingsSaveLoadingPreview,
  AdminSettingsSaveSuccessPreview
} from "@/features/admin-settings/admin-settings-preview-states";

describe("F3E-D Settings", () => {
  it("defines unresolved groups and protected boundaries", () => {
    expect(ADMIN_SETTINGS_GROUPS.map((group) => group.key)).toEqual([
      "owner",
      "notifications",
      "preview",
      "arabic",
      "storage-deployment"
    ]);
    expect(PROTECTED_SYSTEM_SETTINGS).toHaveLength(11);
    expect(PROTECTED_SYSTEM_SETTINGS).toContain("ROSA identity");
  });

  it("renders no fictional configuration", () => {
    const html = renderToStaticMarkup(<AdminSettingsPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Owner authentication not connected");
    expect(html).toContain("Not configured");
    expect(html).toContain("Not connected");
    expect(html).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    expect(html).not.toMatch(/preview\.[a-z]|Cloudflare|Supabase|S3|bucket/i);
    expect(html).not.toContain("<form");
    expect(html).not.toContain("data-preview-only");
  });

  it("keeps six settings examples preview-only", () => {
    const html = renderToStaticMarkup(<>
      <AdminSettingsPasswordChangePreview />
      <AdminSettingsNotificationValidationPreview />
      <AdminSettingsSaveLoadingPreview />
      <AdminSettingsSaveFailurePreview />
      <AdminSettingsSaveSuccessPreview />
      <AdminSettingsProtectedWarningPreview />
    </>);
    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(6);
  });
});
