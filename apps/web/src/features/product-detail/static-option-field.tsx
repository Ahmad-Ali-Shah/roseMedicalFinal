import type { ReactElement } from "react";

export function StaticOptionField({
  label,
  value
}: {
  label: string;
  value: string;
}): ReactElement {
  const outputId = `static-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
  return (
    <div className="static-option-field">
      <span className="static-option-field__label" id={`${outputId}-label`}>{label}</span>
      <output
        className="static-option-field__value"
        id={outputId}
        aria-labelledby={`${outputId}-label`}
      >
        {value}
      </output>
      <span className="static-option-field__marker" aria-hidden="true">⌄</span>
    </div>
  );
}
