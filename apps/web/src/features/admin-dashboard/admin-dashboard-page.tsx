import { ButtonLink } from "@/components/ui";
import {
  AdminPageHeader,
  AdminSection
} from "@/features/admin-primitives";
import { AdminCatalogueOverview } from "./admin-catalogue-overview";
import { getAdminDashboardModel } from "./admin-dashboard-model";
import { AdminLaunchReadiness } from "./admin-launch-readiness";
import { AdminOperationalData } from "./admin-operational-data";
import { AdminWorkspaceStatus } from "./admin-workspace-status";

export function AdminDashboardPage() {
  const model = getAdminDashboardModel();
  return (
    <div className="admin-dashboard" data-admin-dashboard>
      <AdminPageHeader
        eyebrow="Admin overview"
        title="Rosa workspace overview."
        description="This static workspace previews the future single-owner content management system."
      />

      <AdminWorkspaceStatus />
      <AdminCatalogueOverview metrics={model.catalogueMetrics} />
      <AdminOperationalData metrics={model.operationalMetrics} />
      <AdminLaunchReadiness items={model.readinessItems} />

      <AdminSection
        title="Quick routes"
        description="Navigation only. Management actions are not active."
        className="admin-dashboard__quick"
      >
        <div className="admin-dashboard__quick-routes">
          {model.quickRoutes.map((route) => (
            <ButtonLink key={route.href} href={route.href} variant="secondary">
              {route.label}
            </ButtonLink>
          ))}
        </div>
      </AdminSection>
    </div>
  );
}
