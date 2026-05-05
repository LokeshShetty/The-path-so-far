import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard(
  { children, glow = true, className = "", ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`relative rounded-2xl glass transition-all duration-500 ${className}`}
      style={{
        boxShadow: glow
          ? "0 0 0 1px rgba(168,85,247,0.0) inset, 0 30px 80px -30px rgba(0,0,0,0.7)"
          : undefined,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

export default GlassCard;
