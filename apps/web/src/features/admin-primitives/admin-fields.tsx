import { useId, type ReactNode } from "react";

export interface AdminFormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  asFieldset?: boolean;
}

export function AdminFormSection({
  title,
  description,
  children,
  asFieldset = false
}: AdminFormSectionProps) {
  const headingId = useId();
  if (asFieldset) {
    return (
      <fieldset className="admin-form-section">
        <legend>{title}</legend>
        {description ? <p>{description}</p> : null}
        {children}
      </fieldset>
    );
  }
  return (
    <section className="admin-form-section" aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      {description ? <p>{description}</p> : null}
      {children}
    </section>
  );
}

export interface AdminFieldPreviewProps {
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "url";
  hint?: string;
  error?: string;
  direction?: "ltr" | "rtl";
}

function descriptionIds(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

export function AdminFieldPreview({
  id,
  label,
  value = "",
  placeholder,
  type = "text",
  hint,
  error,
  direction = "ltr"
}: AdminFieldPreviewProps) {
  return (
    <div className="admin-field-preview" dir={direction}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly
        aria-readonly="true"
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionIds(id, hint, error)}
      />
      {hint ? <p className="field__hint" id={`${id}-hint`}>{hint}</p> : null}
      {error ? <p className="field__error" id={`${id}-error`} role="alert">{error}</p> : null}
    </div>
  );
}

export interface AdminTextareaPreviewProps extends Omit<AdminFieldPreviewProps, "type"> {
  rows?: number;
}

export function AdminTextareaPreview({
  id,
  label,
  value = "",
  placeholder,
  hint,
  error,
  direction = "ltr",
  rows = 6
}: AdminTextareaPreviewProps) {
  return (
    <div className="admin-field-preview" dir={direction}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        rows={rows}
        readOnly
        aria-readonly="true"
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionIds(id, hint, error)}
      />
      {hint ? <p className="field__hint" id={`${id}-hint`}>{hint}</p> : null}
      {error ? <p className="field__error" id={`${id}-error`} role="alert">{error}</p> : null}
    </div>
  );
}

export interface AdminSelectPreviewProps {
  id: string;
  label: string;
  options: readonly string[];
  hint?: string;
}

export function AdminSelectPreview({ id, label, options, hint }: AdminSelectPreviewProps) {
  return (
    <div className="admin-field-preview">
      <label htmlFor={id}>{label}</label>
      <select id={id} disabled defaultValue={options[0] ?? ""} aria-describedby={hint ? `${id}-hint` : undefined}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      {hint ? <p className="field__hint" id={`${id}-hint`}>{hint}</p> : null}
    </div>
  );
}

export function AdminLocaleFieldPair({
  id,
  label,
  englishValue = "",
  arabicValue = ""
}: {
  id: string;
  label: string;
  englishValue?: string;
  arabicValue?: string;
}) {
  return (
    <div className="admin-locale-field-pair">
      <AdminFieldPreview id={`${id}-en`} label={`${label} — English`} value={englishValue} />
      <AdminFieldPreview id={`${id}-ar`} label={`${label} — Arabic`} value={arabicValue} direction="rtl" />
    </div>
  );
}

export interface AdminFieldProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "url";
  hint?: string;
  error?: string;
  direction?: "ltr" | "rtl";
  required?: boolean;
}

export function AdminField({
  id,
  name,
  label,
  defaultValue = "",
  placeholder,
  type = "text",
  hint,
  error,
  direction = "ltr",
  required = false
}: AdminFieldProps) {
  return (
    <div className="admin-field-preview" dir={direction}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionIds(id, hint, error)}
      />
      {hint ? <p className="field__hint" id={`${id}-hint`}>{hint}</p> : null}
      {error ? <p className="field__error" id={`${id}-error`} role="alert">{error}</p> : null}
    </div>
  );
}

export interface AdminTextareaFieldProps extends Omit<AdminFieldProps, "type"> {
  rows?: number;
}

export function AdminTextareaField({
  id,
  name,
  label,
  defaultValue = "",
  placeholder,
  hint,
  error,
  direction = "ltr",
  required = false,
  rows = 6
}: AdminTextareaFieldProps) {
  return (
    <div className="admin-field-preview" dir={direction}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionIds(id, hint, error)}
      />
      {hint ? <p className="field__hint" id={`${id}-hint`}>{hint}</p> : null}
      {error ? <p className="field__error" id={`${id}-error`} role="alert">{error}</p> : null}
    </div>
  );
}

export interface AdminSelectFieldOption {
  value: string;
  label: string;
}

export interface AdminSelectFieldProps {
  id: string;
  name: string;
  label: string;
  options: readonly AdminSelectFieldOption[];
  defaultValue?: string;
  hint?: string;
  required?: boolean;
}

export function AdminSelectField({
  id,
  name,
  label,
  options,
  defaultValue,
  hint,
  required = false
}: AdminSelectFieldProps) {
  return (
    <div className="admin-field-preview">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue ?? options[0]?.value ?? ""}
        required={required}
        aria-describedby={hint ? `${id}-hint` : undefined}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {hint ? <p className="field__hint" id={`${id}-hint`}>{hint}</p> : null}
    </div>
  );
}
