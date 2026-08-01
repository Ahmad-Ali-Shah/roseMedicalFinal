import Link from "next/link";
import { Button } from "@/components/ui";
import { AdminAlert, AdminFieldPreview } from "@/features/admin-primitives";
import { AdminOwnerAccessFrame } from "./admin-owner-access-frame";

export function AdminRecoveryPage() {
  return (
    <AdminOwnerAccessFrame
      eyebrow="Owner recovery"
      title="Recover owner access."
      description="Recovery is restricted to the verified owner email configured by the backend."
      footer={<p>Search-engine noindex metadata is not access control. Production recovery requires server-enforced owner authentication.</p>}
    >
      <fieldset className="admin-auth-fields">
        <legend className="visually-hidden">Owner recovery field preview</legend>
        <AdminFieldPreview id="recovery-email" label="Owner email" type="email" value="" />
      </fieldset>
      <div className="admin-auth-card__actions">
        <Button disabled>Send recovery link</Button>
        <Link href="/admin/login">Return to sign in</Link>
      </div>
      <AdminAlert tone="warning" title="Recovery not connected">
        No recovery email is sent from this static preview.
      </AdminAlert>
    </AdminOwnerAccessFrame>
  );
}
