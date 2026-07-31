import type { ReactElement } from "react";

export interface QuotationFieldPreviewProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  error?: string;
  multiline?: boolean;
}

export function QuotationFieldPreview({
  id,
  label,
  placeholder,
  value = "",
  error,
  multiline = false
}: QuotationFieldPreviewProps): ReactElement {
  const descriptionId = error ? `${id}-error` : undefined;
  const controlProps = {
    id,
    name: id,
    value,
    placeholder,
    readOnly: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": descriptionId
  } as const;

  return (
    <div className={`quotation-preview-field${error ? " quotation-preview-field--error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea {...controlProps} rows={6} />
      ) : (
        <input {...controlProps} type="text" />
      )}
      {error ? (
        <p className="quotation-preview-field__error" id={descriptionId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
