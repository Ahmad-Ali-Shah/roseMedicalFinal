import { Button, ButtonLink } from "@/components/ui";
import { AdminAlert } from "@/features/admin-primitives/admin-feedback";
import { AdminPageHeader } from "@/features/admin-primitives/admin-page-header";
import { AdminSection } from "@/features/admin-primitives/admin-section";
import { ADMIN_SETTINGS_GROUPS, PROTECTED_SYSTEM_SETTINGS } from "./admin-settings-model";

import { createClient } from "@/lib/supabase/server";
import type { SiteSetting } from "@/lib/supabase/types";
import { saveSiteSettings } from "./actions";

export async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: settingsData } = await supabase.from("site_settings").select("*");
  const settings = (settingsData || []) as SiteSetting[];

  const getSetting = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value_en || fallback;

  return (
    <div className="admin-settings-page">
      <AdminPageHeader
        eyebrow="Settings"
        title="Workspace & System Settings"
        description="Configure live system settings backed by Supabase."
      />

      <AdminAlert tone="info" title="Live Database Configuration">
        System settings are stored and managed live in the site_settings table.
      </AdminAlert>

      <form action={saveSiteSettings} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div className="admin-settings-groups">
          {ADMIN_SETTINGS_GROUPS.map((group) => (
            <AdminSection
              className="admin-settings-group"
              key={group.key}
              eyebrow="Configuration category"
              title={group.label}
              description={group.description}
            >
              <dl className="admin-settings-list">
                {group.items.map((item) => {
                  const currentValue = getSetting(item.key, item.value);
                  return (
                    <div key={item.key} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <dt>{item.label}</dt>
                      <dd style={{ width: "100%" }}>
                        <input
                          type="text"
                          name={item.key}
                          defaultValue={currentValue}
                          style={{
                            width: "100%",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "0.375rem",
                            backgroundColor: "#111",
                            border: "1px solid #333",
                            color: "white",
                            fontSize: "0.875rem"
                          }}
                        />
                      </dd>
                    </div>
                  );
                })}
              </dl>
              {group.key === "preview" ? (
                <ButtonLink href="/" variant="secondary" size="small">View current public site</ButtonLink>
              ) : null}
            </AdminSection>
          ))}
        </div>

        <AdminSection eyebrow="Protected system" title="These settings remain outside ordinary administration.">
          <ul className="admin-protected-list">{PROTECTED_SYSTEM_SETTINGS.map((item) => <li key={item}>{item}</li>)}</ul>
        </AdminSection>

        <div className="admin-management-actions">
          <Button type="submit">Save settings</Button>
        </div>
      </form>
    </div>
  );
}
