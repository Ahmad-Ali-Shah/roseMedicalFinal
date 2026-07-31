import type { ReactElement } from "react";

export function AddedFeedbackPreview(): ReactElement {
  return (
    <aside className="added-feedback-preview" aria-label="Added-feedback preview">
      <strong>Added to your inquiry.</strong>
      <span>This state activates when inquiry behavior is implemented.</span>
    </aside>
  );
}
