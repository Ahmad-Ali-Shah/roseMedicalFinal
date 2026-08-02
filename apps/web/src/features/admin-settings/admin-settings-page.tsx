import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminPageHeader,
  AdminSection,
  AdminStatusBadge
} from "@/features/admin-primitives";
import {
  ADMIN_SETTINGS_GROUPS,
  PROTECTED_SYSTEM_SETTINGS
} from "./admin-settings-model";

export function AdminSettingsPage() {
  return (
    <div className="admin-settings-page">
      <AdminPageHeader
        eyebrow="Settings"
        title="Configure only connected systems."
        description="This page documents unresolved configuration categories and protected system boundaries. No setting is persisted."
        actions={<Button disabled>Save settings</Button>}
      />

      <AdminAlert tone="warning" title="Configuration is not connected">
        Authentication, notifications, preview builds, storage, deployment and revision persistence require future protected integrations.
      </AdminAlert>

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
              {group.items.map((item) => (
                <div key={item.key}>
                  <dt>{item.label}</dt>
                  <dd>
                    <span>{item.value}</span>
                    <AdminStatusBadge tone={item.status === "Structurally supported" ? "neutral" : "warning"}>
                      {item.status}
                    </AdminStatusBadge>
                  </dd>
                </div>
              ))}
            </dl>
            {group.key === "owner" ? (
              <div className="admin-management-actions">
                <Button size="small" variant="secondary" disabled>Change password</Button>
                <Button size="small" variant="secondary" disabled>Recovery settings</Button>
                <Button size="small" variant="secondary" disabled>Sign out</Button>
              </div>
            ) : null}
            {group.key === "preview" ? (
              <ButtonLink href="/" variant="secondary" size="small">View current public site</ButtonLink>
            ) : null}
          </AdminSection>
        ))}
      </div>

      <AdminSection
        eyebrow="Protected system"
        title="These settings remain outside ordinary administration."
      >
        <ul className="admin-protected-list">
          {PROTECTED_SYSTEM_SETTINGS.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </AdminSection>

      <div className="admin-management-actions">
        <Button disabled>Save settings</Button>
      </div>
    </div>
  );
}
