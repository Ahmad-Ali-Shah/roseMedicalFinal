import { AdminSection } from "@/features/admin-primitives/admin-section";
import { AdminStatusBadge } from "@/features/admin-primitives/admin-status";
import type { AdminReadinessItem } from "@/features/admin-governance-source/admin-readiness-model";

export function AdminLaunchReadiness({ items }: { items: readonly AdminReadinessItem[] }) {
  return (
    <AdminSection
      title="Launch readiness"
      description="Current implementation status and the content or operational dependencies that still need owner action."
      className="admin-dashboard__readiness"
    >
      <ol className="admin-readiness-list">
        {items.map((item) => (
          <li key={item.key}>
            <span>{item.label}</span>
            <AdminStatusBadge tone={item.tone}>{item.status}</AdminStatusBadge>
          </li>
        ))}
      </ol>
    </AdminSection>
  );
}
