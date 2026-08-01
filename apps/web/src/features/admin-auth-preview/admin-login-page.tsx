import Link from "next/link";
import { Button } from "@/components/ui";
import { AdminAlert, AdminFieldPreview } from "@/features/admin-primitives";
import { AdminOwnerAccessFrame } from "./admin-owner-access-frame";

export function AdminLoginPage() {
  return (
    <AdminOwnerAccessFrame
      eyebrow="Owner access"
      title="Sign in to the Rosa workspace."
      description="Access is restricted to the single verified owner account."
      footer={<p>Production access requires server-enforced owner authentication.</p>}
    >
      <fieldset className="admin-auth-fields">
        <legend className="visually-hidden">Owner sign-in field preview</legend>
        <AdminFieldPreview id="owner-email" label="Owner email" type="email" value="" />
        <AdminFieldPreview id="owner-password" label="Password" type="password" value="" />
      </fieldset>
      <div className="admin-auth-card__actions">
        <Button disabled>Sign in</Button>
        <Link href="/admin/recovery">Recover owner access</Link>
      </div>
      <AdminAlert tone="warning" title="Authentication not connected">
        This is a static composition preview. Credentials are not checked and no session is created.
      </AdminAlert>
    </AdminOwnerAccessFrame>
  );
}
