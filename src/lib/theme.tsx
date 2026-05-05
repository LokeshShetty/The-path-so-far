import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  /**
   * Toggle the theme. The transition direction (LTR / RTL) follows the
   * destination theme: dark → light = LTR, light → dark = RTL.
   * `originX`/`originY` are no longer needed for this animation but
   * we keep the signature for compatibility.
   */
  toggleTheme: (originX?: number, originY?: number) => void;
}

const STORAGE_KEY = "ls-portfolio-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

/** Largest distance from (x, y) to any viewport corner — used as the
 *  reveal-circle radius so the clip-path always reaches every pixel. */
function farthestCornerDistance(x: number, y: number): number {
  return Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
}

/** Read the background color the page would have under `theme`,
 *  composed from our `--bg` token and the matching --bg value. */
function bgFor(theme: Theme): string {
  // Tokens defined in index.css. Kept in sync intentionally — if we ever
  // change them there we'll change them here. They drive the no-VT fallback
  // overlay, not the live DOM.
  return theme === "dark" ? "rgb(10, 10, 15)" : "rgb(250, 248, 255)";
}

/** Browsers without the View Transitions API still get the same circular
 *  reveal: spawn a fixed overlay painted with the *new* theme color,
 *  animate its clip-path from 0 → r, then swap the real theme underneath
 *  once the overlay is fully covering the viewport. */
function fallbackReveal(
  next: Theme,
  x: number,
  y: number,
  r: number,
  apply: () => void,
) {
  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.cssText = [
    "position:fixed",
    "inset:0",
    "z-index:99999",
    "pointer-events:none",
    `background:${bgFor(next)}`,
    `clip-path:circle(0 at ${x}px ${y}px)`,
    "transition:clip-path 0.5s ease-in-out",
    "will-change:clip-path",
  ].join(";");
  document.body.appendChild(overlay);

  // Force layout, then animate to full radius.
  void overlay.offsetWidth;
  overlay.style.clipPath = `circle(${r}px at ${x}px ${y}px)`;

  const cleanup = () => {
    apply(); // swap the real theme — page underneath now matches overlay
    requestAnimationFrame(() => overlay.remove());
  };
  overlay.addEventListener("transitionend", cleanup, { once: true });
  // Safety net in case transitionend never fires.
  window.setTimeout(cleanup, 700);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => readInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Sync with system preference if the user hasn't explicitly chosen.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? "light" : "dark");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback((originX?: number, originY?: number) => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Anchor the reveal to the click origin (falls back to viewport center).
    const x = originX ?? window.innerWidth / 2;
    const y = originY ?? window.innerHeight / 2;
    const r = farthestCornerDistance(x, y);

    const startViewTransition = (
      document as Document & {
        startViewTransition?: (cb: () => void) => {
          ready: Promise<void>;
          finished: Promise<void>;
        };
      }
    ).startViewTransition?.bind(document);

    if (reduce) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    if (!startViewTransition) {
      // No View Transitions API (older Firefox / Safari) — paint the same
      // circular reveal manually with an overlay so every browser gets it.
      fallbackReveal(next, x, y, r, () => {
        applyTheme(next);
        setTheme(next);
      });
      return;
    }

    const transition = startViewTransition(() => {
      // Apply to DOM *synchronously* so the API captures the NEW state
      // when the callback returns. Without flushSync the "new" snapshot
      // can be identical to the "old" — animation runs but reveals nothing.
      applyTheme(next);
      flushSync(() => setTheme(next));
    });

    // Drive the animation from JS via the Web Animations API. This is
    // more reliable than relying on CSS keyframes on the pseudo-element
    // (some browsers have cascade edge cases with default ::view-transition
    // animations). `transition.ready` resolves once both snapshots exist.
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${r}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        /* transition was skipped — nothing to do */
      });
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

export const NO_FLICKER_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){}})();`;
