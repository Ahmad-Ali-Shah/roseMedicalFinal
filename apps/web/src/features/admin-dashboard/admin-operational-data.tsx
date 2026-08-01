import {
  AdminSection,
  AdminUnresolvedMetric
} from "@/features/admin-primitives";
import type { AdminOperationalMetric } from "./admin-dashboard-model";

export function AdminOperationalData({ metrics }: { metrics: readonly AdminOperationalMetric[] }) {
  return (
    <AdminSection
      title="Operational data"
      description="Inquiry and message records require a live backend connection."
      className="admin-dashboard__operational"
    >
      <div className="admin-dashboard__operations">
        {metrics.map((metric) => (
          <AdminUnresolvedMetric key={metric.key} label={metric.label} />
        ))}
      </div>
    </AdminSection>
  );
}
