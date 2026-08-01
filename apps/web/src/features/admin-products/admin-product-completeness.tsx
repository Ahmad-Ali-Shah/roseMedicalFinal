import {
  AdminSection,
  AdminStatusBadge
} from "@/features/admin-primitives";
import type { AdminProductCompletenessItem } from "./admin-product-model";

function toneFor(state: AdminProductCompletenessItem["state"]) {
  return state === "Present" ? "neutral" : "warning";
}

export function AdminProductCompleteness({
  items
}: {
  items: readonly AdminProductCompletenessItem[];
}) {
  return (
    <AdminSection
      title="Source presence"
      description="This checklist describes fields present in the current registry. It is not a publishing or approval decision."
    >
      <ol className="admin-source-checklist">
        {items.map((item) => (
          <li key={item.key}>
            <span>{item.label}</span>
            <AdminStatusBadge tone={toneFor(item.state)}>{item.state}</AdminStatusBadge>
          </li>
        ))}
      </ol>
    </AdminSection>
  );
}
