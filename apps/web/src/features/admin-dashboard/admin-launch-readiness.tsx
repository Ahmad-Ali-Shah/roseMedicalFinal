import {
  AdminSection,
  AdminStatusBadge
} from "@/features/admin-primitives";
import type { AdminReadinessItem } from "./admin-dashboard-model";

export function AdminLaunchReadiness({ items }: { items: readonly AdminReadinessItem[] }) {
  return (
    <AdminSection
      title="Launch readiness"
      description="Known content and operational dependencies that remain unresolved."
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
