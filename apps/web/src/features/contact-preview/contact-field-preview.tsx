import type { ReactElement, ChangeEvent } from "react";

export interface ContactFieldPreviewProps {
  id: string;
  name?: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  error?: string;
  multiline?: boolean;
  focused?: boolean;
  required?: boolean;
  type?: string;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function ContactFieldPreview({
  id,
  name,
  label,
  placeholder,
  defaultValue = "",
  error,
  multiline = false,
  focused = false,
  required = false,
  type = "text",
  readOnly = false,
  onChange
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
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          readOnly={readOnly}
          rows={6}
          required={required}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
        />
      ) : (
        <input
          id={id}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          readOnly={readOnly}
          type={type}
          required={required}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
        />
      )}
      {error ? <p id={errorId}>{error}</p> : null}
    </div>
  );
}
