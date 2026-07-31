import type { ReactElement } from "react";

export function MobileInquiryBar(): ReactElement {
  return (
    <aside className="mobile-inquiry-bar" aria-label="Inquiry action preview">
      <span>Inquiry controls activate next phase</span>
      <button className="button button--primary button--standard" disabled>
        Add to inquiry
      </button>
    </aside>
  );
}
