import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import {
  AdminAlert,
  AdminFieldPreview
} from "@/features/admin-primitives";

function PreviewFrame({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section data-preview-only="true" className="admin-governance-preview">
      <p className="page-eyebrow">Demonstration preview only</p>
      <h2>{title}</h2>
      <p>No content, contact, publishing, revision or setting operation occurred in this static preview.</p>
      {children}
    </section>
  );
}

export function AdminSettingsPasswordChangePreview() {
  return <PreviewFrame title="Password-change preview"><AdminFieldPreview id="example-current-password" label="Current password" type="password" value="" /><Button disabled>Change password</Button></PreviewFrame>;
}

export function AdminSettingsNotificationValidationPreview() {
  return <PreviewFrame title="Notification-validation preview"><AdminFieldPreview id="example-notification-recipient" label="Notification recipient" value="example.invalid" error="Example address is not a configured recipient." /></PreviewFrame>;
}

export function AdminSettingsSaveLoadingPreview() {
  return <PreviewFrame title="Settings save-loading preview"><Button disabled>Saving example settings</Button></PreviewFrame>;
}

export function AdminSettingsSaveFailurePreview() {
  return <PreviewFrame title="Settings save-failure preview"><AdminAlert tone="danger" title="Example save failure">No setting was stored.</AdminAlert></PreviewFrame>;
}

export function AdminSettingsSaveSuccessPreview() {
  return <PreviewFrame title="Settings save-success preview"><AdminAlert tone="success" title="Example success state">A future backend-confirmed result would appear here.</AdminAlert></PreviewFrame>;
}

export function AdminSettingsProtectedWarningPreview() {
  return <PreviewFrame title="Protected-setting warning preview"><AdminAlert tone="warning" title="Protected system setting">ROSA identity and design tokens cannot be changed through ordinary settings.</AdminAlert></PreviewFrame>;
}
