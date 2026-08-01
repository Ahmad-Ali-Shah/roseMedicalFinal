import { AdminSection, AdminStat } from "@/features/admin-primitives";
import type { AdminDashboardMetric } from "./admin-dashboard-model";

export function AdminCatalogueOverview({ metrics }: { metrics: readonly AdminDashboardMetric[] }) {
  return (
    <AdminSection
      title="Catalogue overview"
      description="Counts come from the current frontend catalogue registries."
      className="admin-dashboard__catalogue"
    >
      <div className="admin-dashboard__metrics">
        {metrics.map((metric) => (
          <AdminStat
            key={metric.key}
            label={metric.label}
            value={metric.value}
            href={metric.href}
          />
        ))}
      </div>
    </AdminSection>
  );
}
