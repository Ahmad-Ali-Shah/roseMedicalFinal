import { AdminAlert, AdminStatusBadge } from "@/features/admin-primitives";

const statuses = [
  "Static admin preview",
  "Backend not connected",
  "Authentication not active",
  "Publishing actions unavailable"
] as const;

export function AdminWorkspaceStatus() {
  return (
    <AdminAlert tone="warning" title="Workspace status">
      <ul className="admin-workspace-status">
        {statuses.map((status) => (
          <li key={status}>
            <AdminStatusBadge tone="warning">{status}</AdminStatusBadge>
          </li>
        ))}
      </ul>
    </AdminAlert>
  );
}
