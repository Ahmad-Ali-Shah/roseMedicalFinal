import type { CSSProperties, HTMLAttributes } from "react";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: string;
}

export function Stack({ gap, style, className = "", ...props }: StackProps) {
  const nextStyle = gap ? ({ ...style, "--stack-gap": gap } as CSSProperties) : style;
  return <div className={`stack ${className}`.trim()} style={nextStyle} {...props} />;
}
