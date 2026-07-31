import type { InputHTMLAttributes } from "react";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function Field({ label, hint, error, id, className = "", ...props }: FieldProps) {
  const fieldId = id ?? props.name;
  if (!fieldId) throw new Error("Field requires an id or name.");
  const descriptionId = `${fieldId}-description`;
  return (
    <div className={`field ${className}`.trim()}>
      <label className="field__label" htmlFor={fieldId}>{label}</label>
      <input
        className="field__control"
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={hint || error ? descriptionId : undefined}
        {...props}
      />
      {(error || hint) && <p className={error ? "field__error" : "field__hint"} id={descriptionId}>{error ?? hint}</p>}
    </div>
  );
}
