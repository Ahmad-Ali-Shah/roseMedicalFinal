import type { ReactElement, ChangeEvent, HTMLAttributes } from "react";

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
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  dir?: "ltr" | "rtl" | "auto";
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
  autoComplete,
  minLength,
  maxLength,
  inputMode,
  dir,
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
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          dir={dir}
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
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          inputMode={inputMode}
          dir={dir}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
        />
      )}
      {error ? <p id={errorId}>{error}</p> : null}
    </div>
  );
}
