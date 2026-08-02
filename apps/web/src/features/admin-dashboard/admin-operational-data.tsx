import {
  AdminSection,
  AdminUnresolvedMetric
} from "@/features/admin-primitives";
import type { AdminOperationalMetric } from "./admin-dashboard-model";

export function AdminOperationalData({ metrics }: { metrics: readonly AdminOperationalMetric[] }) {
  return (
    <AdminSection
      title="Operational data"
      description="Live counts from the Supabase database."
      className="admin-dashboard__operational"
    >
      <div className="admin-dashboard__operations">
        {metrics.map((metric) => (
          metric.value !== undefined ? (
            <div key={metric.key} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <span style={{ fontSize: "2rem", fontWeight: "bold", color: "white" }}>{metric.value}</span>
              <span style={{ color: "#888" }}>{metric.label}</span>
            </div>
          ) : (
            <AdminUnresolvedMetric key={metric.key} label={metric.label} />
          )
        ))}
      </div>
    </AdminSection>
  );
}
