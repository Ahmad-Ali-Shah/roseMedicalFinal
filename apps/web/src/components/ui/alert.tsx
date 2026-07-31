import type { HTMLAttributes, ReactNode } from "react";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "neutral" | "warning" | "danger" | "success";
  title: string;
  children: ReactNode;
}

export function Alert({ tone = "neutral", title, children, className = "", ...props }: AlertProps) {
  return (
    <div className={`alert alert--${tone} ${className}`.trim()} role={tone === "danger" ? "alert" : "status"} {...props}>
      <p className="alert__title">{title}</p>
      <div className="alert__body">{children}</div>
    </div>
  );
}
