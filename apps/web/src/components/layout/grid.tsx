import type { CSSProperties, HTMLAttributes } from "react";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: string;
}

export function Grid({ columns = 2, gap, style, className = "", ...props }: GridProps) {
  const nextStyle = gap ? ({ ...style, "--grid-gap": gap } as CSSProperties) : style;
  return <div className={`layout-grid layout-grid--${columns} ${className}`.trim()} style={nextStyle} {...props} />;
}
