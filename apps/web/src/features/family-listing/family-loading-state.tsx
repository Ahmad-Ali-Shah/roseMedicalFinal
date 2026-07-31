import type { ReactElement } from "react";

export function FamilyLoadingState(): ReactElement {
  return (
    <div className="family-loading-state" aria-label="Catalogue loading-state preview">
      {[0, 1, 2, 3].map((item) => (
        <div className="family-loading-state__card" key={item} aria-hidden="true">
          <span className="family-loading-state__media" />
          <span className="family-loading-state__line" />
        </div>
      ))}
    </div>
  );
}
