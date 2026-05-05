import {
  forwardRef,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { useMagnetic } from "../../hooks/useMagnetic";

type Variant = "primary" | "ghost";

// Allow data-* and aria-* attrs on either <a> or <button>.
type Props = {
  children: ReactNode;
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children">;

const MagneticButton = forwardRef<HTMLElement, Props>(function MagneticButton(
  {
    children,
    variant = "primary",
    as = "button",
    className = "",
    href,
    download,
    target,
    rel,
    onClick,
    ...rest
  },
  _outerRef,
) {
  const wrapRef = useMagnetic<HTMLDivElement>(0.32, 130);
  const innerRef = useRef<HTMLSpanElement>(null);

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-tight transition-shadow duration-300 will-change-transform overflow-hidden";

  const styles =
    variant === "primary"
      ? "text-white shadow-[0_10px_40px_-10px_rgba(168,85,247,0.6)] hover:shadow-[0_18px_60px_-10px_rgba(168,85,247,0.85)]"
      : "text-fg/90 hover:text-fg border border-fg/15 bg-fg/[0.06] hover:border-fg/25 hover:bg-fg/[0.09]";

  const handleRipple = (e: React.MouseEvent) => {
    const host = innerRef.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height) * 1.6;
    ripple.style.cssText = `position:absolute;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;width:${size}px;height:${size}px;border-radius:9999px;background:radial-gradient(circle, rgba(255,255,255,0.45), rgba(255,255,255,0) 60%);transform:scale(0);opacity:1;pointer-events:none;transition:transform 600ms ease-out, opacity 700ms ease-out;`;
    host.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = "scale(1)";
      ripple.style.opacity = "0";
    });
    setTimeout(() => ripple.remove(), 750);
  };

  const content = (
    <span
      ref={innerRef}
      className="relative z-10 inline-flex items-center gap-2"
      onClick={(e) => {
        handleRipple(e);
      }}
    >
      {children}
    </span>
  );

  const gradientBg =
    variant === "primary" ? (
      <span
        aria-hidden
        className="absolute inset-0 -z-0"
        style={{
          background:
            "linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)",
        }}
      />
    ) : null;

  if (as === "a") {
    return (
      <div ref={wrapRef} className="inline-block">
        <a
          href={href}
          download={download as never}
          target={target}
          rel={rel}
          onClick={onClick as never}
          className={`${base} ${styles} ${className}`}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {gradientBg}
          {content}
        </a>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="inline-block">
      <button
        onClick={onClick}
        className={`${base} ${styles} ${className}`}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {gradientBg}
        {content}
      </button>
    </div>
  );
});

export default MagneticButton;
