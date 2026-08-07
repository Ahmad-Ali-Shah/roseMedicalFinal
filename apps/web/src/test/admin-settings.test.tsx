import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { renderServerComponent } from "@/test/render-server-component";
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

  it("renders the live settings page", async () => {
    const html = await renderServerComponent(<AdminSettingsPage />);
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Workspace");
    expect(html).toContain("System Settings");
    expect(html).not.toContain("data-preview-only");
    expect(html).toContain("<form");
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
