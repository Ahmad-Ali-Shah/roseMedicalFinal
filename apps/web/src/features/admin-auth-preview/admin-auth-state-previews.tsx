import { Button } from "@/components/ui";
import { AdminAlert } from "@/features/admin-primitives";

function AuthPreview({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="admin-preview-state" data-preview-only="true">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function AdminLoginLoadingPreview() {
  return (
    <AuthPreview title="Sign-in loading preview">
      <p>Loading treatment appears only after a real authentication request exists.</p>
      <Button disabled>Checking access preview</Button>
    </AuthPreview>
  );
}

export function AdminInvalidCredentialsPreview() {
  return (
    <AuthPreview title="Invalid-credentials preview">
      <AdminAlert tone="danger" title="Credentials could not be accepted">
        No credential check occurred in this static state.
      </AdminAlert>
    </AuthPreview>
  );
}

export function AdminUnauthorizedSessionPreview() {
  return (
    <AuthPreview title="Unauthorized-session preview">
      <AdminAlert tone="warning" title="Owner authentication required">
        No session or route protection is represented.
      </AdminAlert>
    </AuthPreview>
  );
}

export function AdminRecoverySentPreview() {
  return (
    <AuthPreview title="Recovery-sent preview">
      <p>Delivery details appear only after a verified backend response.</p>
    </AuthPreview>
  );
}

export function AdminRecoveryFailurePreview() {
  return (
    <AuthPreview title="Recovery-failure preview">
      <AdminAlert tone="danger" title="Recovery could not be started">
        No recovery request was attempted.
      </AdminAlert>
    </AuthPreview>
  );
}

export function AdminInvalidRecoveryTokenPreview() {
  return (
    <AuthPreview title="Invalid-token preview">
      <p>No token was checked.</p>
    </AuthPreview>
  );
}

export function AdminExpiredRecoveryLinkPreview() {
  return (
    <AuthPreview title="Expired-link preview">
      <p>No recovery link was validated.</p>
    </AuthPreview>
  );
}
