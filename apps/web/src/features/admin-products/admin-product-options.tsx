import { Button } from "@/components/ui";
import { AdminSection } from "@/features/admin-primitives";
import type { AdminProductEditorModel } from "./admin-product-model";

export function AdminProductOptions({
  groups
}: {
  groups: AdminProductEditorModel["optionGroups"];
}) {
  return (
    <AdminSection
      title="Documented options"
      description="Values are reproduced from the current catalogue registry and cannot be reordered or changed here."
    >
      <div className="admin-option-groups">
        {groups.map((group) => (
          <section className="admin-option-group" key={group.key}>
            <h3>{group.label}</h3>
            {group.values.length > 0 ? (
              <ul>
                {group.values.map((value) => (
                  <li key={`${group.key}-${value}`}>
                    <span>{value}</span>
                    <div className="admin-option-group__actions">
                      <Button size="small" variant="quiet" disabled>Reorder</Button>
                      <Button size="small" variant="quiet" disabled>Remove</Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Not documented in source</p>
            )}
          </section>
        ))}
      </div>
      <Button variant="secondary" disabled>Add option</Button>
    </AdminSection>
  );
}
