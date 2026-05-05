import { useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../lib/theme";

interface Props {
  /** Visual size variant. `pill` matches the nav, `block` is full-width for the mobile sheet. */
  variant?: "pill" | "block";
  className?: string;
}

export default function ThemeToggle({ variant = "pill", className = "" }: Props) {
  const { theme, toggleTheme } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === "dark";

  const onClick = () => {
    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : undefined;
    const y = rect ? rect.top + rect.height / 2 : undefined;
    toggleTheme(x, y);
  };

  if (variant === "block") {
    return (
      <button
        ref={btnRef}
        onClick={onClick}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        className={`group relative flex w-full items-center justify-between rounded-xl border border-line/15 bg-fg/[0.03] px-4 py-3 text-sm font-semibold text-fg/85 transition-colors hover:border-accent/40 hover:text-fg ${className}`}
      >
        <span className="flex items-center gap-2">
          <span className="relative inline-flex h-5 w-5 items-center justify-center">
            <Sun
              className={`absolute h-4 w-4 transition-all duration-500 ${
                isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <Moon
              className={`absolute h-4 w-4 transition-all duration-500 ${
                isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </span>
          Theme
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          {isDark ? "dark" : "light"}
        </span>
      </button>
    );
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      data-cursor={isDark ? "Lights On ☀" : "Lights Off ☾"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-line/15 bg-fg/[0.04] text-fg/80 transition-colors hover:text-fg hover:border-line/30 hover:bg-fg/[0.08] ${className}`}
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-500 ${
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-500 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
      {/* Halo on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "0 0 18px rgba(168,85,247,0.4)" }}
      />
    </button>
  );
}
