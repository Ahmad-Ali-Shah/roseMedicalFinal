import { ButtonLink } from "@/components/ui";
import type { AdminNavigationKey } from "@/features/admin-navigation";
import {
  AdminAlert,
  AdminPageHeader
} from "@/features/admin-primitives";

export type DeferredAdminRouteKey = Exclude<AdminNavigationKey, "dashboard">;

const COPY: Record<DeferredAdminRouteKey, { title: string; description: string }> = {
  products: {
    title: "Products",
    description: "Products management composition is scheduled for the next admin catalogue milestone."
  },
  families: {
    title: "Families",
    description: "Family management composition is scheduled for the next admin catalogue milestone."
  },
  catalogues: {
    title: "Catalogues",
    description: "Catalogue management composition is scheduled for the next admin catalogue milestone."
  },
  media: {
    title: "Media",
    description: "Media management composition is scheduled for the next admin catalogue milestone."
  },
  inquiries: {
    title: "Quotation Inquiries",
    description: "Inquiry operations composition is scheduled for the admin operations milestone."
  },
  messages: {
    title: "General Messages",
    description: "Message operations composition is scheduled for the admin operations milestone."
  },
  content: {
    title: "Website Content",
    description: "Website content composition is scheduled for the admin content and publishing milestone."
  },
  "contact-details": {
    title: "Contact Details",
    description: "Contact details composition is scheduled for the admin content and publishing milestone."
  },
  publishing: {
    title: "Publishing Centre",
    description: "Publishing composition is scheduled for the admin content and publishing milestone."
  },
  revisions: {
    title: "Revision History",
    description: "Revision history composition is scheduled for the admin content and publishing milestone."
  },
  settings: {
    title: "Settings",
    description: "Settings composition is scheduled for the admin content and publishing milestone."
  }
};

export function AdminDeferredRoutePage({ routeKey }: { routeKey: DeferredAdminRouteKey }) {
  const copy = COPY[routeKey];
  return (
    <div className="admin-deferred-route">
      <AdminPageHeader
        eyebrow="Admin workspace"
        title={copy.title}
        description={copy.description}
      />
      <AdminAlert tone="neutral" title="Static route preview">
        Live records, editor fields, and management actions are not available on this route yet.
      </AdminAlert>
      <ButtonLink href="/admin" variant="secondary">Return to dashboard</ButtonLink>
    </div>
  );
}
