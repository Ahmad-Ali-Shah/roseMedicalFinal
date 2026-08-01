import type { ReactElement } from "react";

export interface ContactFieldPreviewProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  error?: string;
  multiline?: boolean;
  focused?: boolean;
}

export function ContactFieldPreview({
  id,
  label,
  placeholder,
  value = "",
  error,
  multiline = false,
  focused = false
}: ContactFieldPreviewProps): ReactElement {
  const errorId = error ? `${id}-error` : undefined;
  const className = [
    "contact-preview-field",
    error ? "contact-preview-field--error" : "",
    focused ? "contact-preview-field--focused" : ""
  ].filter(Boolean).join(" ");

  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          value={value}
          placeholder={placeholder}
          readOnly
          rows={6}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
        />
      ) : (
        <input
          id={id}
          name={id}
          value={value}
          placeholder={placeholder}
          readOnly
          type="text"
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
        />
      )}
      {error ? <p id={errorId}>{error}</p> : null}
    </div>
  );
}
