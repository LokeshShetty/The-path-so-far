import { useEffect, useRef, useState } from "react";

/**
 * Creative cursor system:
 *   - Tiny purple dot tracks the pointer 1:1
 *   - Outer ring lags behind with a softening factor
 *   - 6 trail particles with progressive lag + fade
 *   - Contextual label pill: hovering any `[data-cursor]` element shows that
 *     element's attribute value as a floating pill next to the cursor
 *   - Magnetic snap toward interactive element centers when very close
 *   - Click → expanding shockwave ripple
 *
 * Disabled on touch / coarse-pointer / reduced-motion.
 */

const TRAIL = 6;
/** Smoothing factor for ring/trail (0..1). Lower = more lag. */
const RING_LERP = 0.18;
const TRAIL_LERP_BASE = 0.32;
/** Within this distance to a magnetic target, the cursor pulls toward it. */
const MAGNET_RADIUS = 90;
/** How strongly the cursor is pulled toward magnetic targets. */
const MAGNET_STRENGTH = 0.35;

type CursorMode = "default" | "active" | "label";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.body.classList.add("has-cursor");

    /* ---- pointer state ---- */
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    const tx = new Array(TRAIL).fill(mx);
    const ty = new Array(TRAIL).fill(my);
    let raf = 0;

    /* ---- magnetic target ---- */
    let magnetEl: HTMLElement | null = null;

    const resolveCursorTarget = (
      el: HTMLElement | null,
    ): { node: HTMLElement; label: string | null } | null => {
      if (!el) return null;
      // Closest [data-cursor] OR closest interactive element
      const explicit = el.closest<HTMLElement>("[data-cursor]");
      if (explicit) return { node: explicit, label: explicit.dataset.cursor || "" };
      const interactive = el.closest<HTMLElement>(
        "a, button, [role='button'], [data-cursor-hover]",
      );
      if (interactive) return { node: interactive, label: null };
      return null;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = resolveCursorTarget(e.target as HTMLElement | null);
      if (!target) {
        magnetEl = null;
        setMode("default");
        setLabel("");
        return;
      }
      magnetEl = target.node;
      if (target.label) {
        setLabel(target.label);
        setMode("label");
      } else {
        setLabel("");
        setMode("active");
      }
    };

    const onOut = (e: MouseEvent) => {
      // Reset only when leaving a tracked element to nothing tracked.
      const next = resolveCursorTarget(e.relatedTarget as HTMLElement | null);
      if (!next) {
        magnetEl = null;
        setMode("default");
        setLabel("");
      }
    };

    /* ---- click ripple ---- */
    const spawnRipple = (x: number, y: number) => {
      const r = document.createElement("div");
      r.className = "cursor-ripple";
      r.style.cssText = `position:fixed;left:${x}px;top:${y}px;`;
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 700);
    };
    const onDown = (e: MouseEvent) => spawnRipple(e.clientX, e.clientY);

    /* ---- main loop ---- */
    const tick = () => {
      // Magnetic pull toward the center of the focused interactive element
      let targetX = mx;
      let targetY = my;
      if (magnetEl) {
        const rect = magnetEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.hypot(dx, dy);
        if (dist < MAGNET_RADIUS) {
          // The closer we get, the more we snap (eased)
          const pull = (1 - dist / MAGNET_RADIUS) * MAGNET_STRENGTH;
          targetX = mx + dx * pull;
          targetY = my + dy * pull;
        }
      }

      rx += (targetX - rx) * RING_LERP;
      ry += (targetY - ry) * RING_LERP;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${rx + 16}px, ${ry + 12}px, 0)`;
      }

      // Trail — each particle lags slightly more than the previous
      for (let i = 0; i < TRAIL; i++) {
        const lerp = TRAIL_LERP_BASE * (1 - i / (TRAIL + 2));
        const prevX = i === 0 ? rx : tx[i - 1];
        const prevY = i === 0 ? ry : ty[i - 1];
        tx[i] += (prevX - tx[i]) * lerp;
        ty[i] += (prevY - ty[i]) * lerp;
        const node = trailRefs.current[i];
        if (node) {
          const size = 6 - i * 0.6;
          node.style.transform = `translate3d(${tx[i] - size / 2}px, ${ty[i] - size / 2}px, 0)`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;

  const ringSize = mode === "label" ? 56 : mode === "active" ? 44 : 36;
  const ringBorder =
    mode === "label"
      ? "1.5px solid rgba(168,85,247,1)"
      : mode === "active"
        ? "1.5px solid rgba(168,85,247,0.95)"
        : "1.5px solid rgba(168,85,247,0.45)";
  const ringBg =
    mode === "label"
      ? "rgba(168,85,247,0.18)"
      : mode === "active"
        ? "rgba(168,85,247,0.10)"
        : "transparent";
  const dotScale = mode === "default" ? 1 : 0.6;

  return (
    <>
      {/* Trail — render before ring so it sits underneath.
          Each starts off-screen so it doesn't render at (0,0) on first paint
          before the rAF loop has had a chance to position it. */}
      {Array.from({ length: TRAIL }).map((_, i) => {
        const size = 6 - i * 0.6;
        const opacity = 0.35 * (1 - i / (TRAIL + 1));
        return (
          <div
            key={i}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[98] rounded-full"
            style={{
              width: size,
              height: size,
              background: "#A855F7",
              opacity,
              boxShadow: "0 0 8px rgba(168,85,247,0.7)",
              transition: "opacity 0.4s ease",
              transform: "translate3d(-200px, -200px, 0)",
              willChange: "transform",
            }}
          />
        );
      })}

      {/* Main dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full"
        style={{
          background: "#A855F7",
          boxShadow: "0 0 12px #A855F7, 0 0 28px rgba(168,85,247,0.7)",
          transform: "translate3d(-100px, -100px, 0)",
          transition: "transform 80ms linear, opacity 200ms",
          opacity: mode === "label" ? 0 : 1,
          scale: String(dotScale),
          willChange: "transform",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full"
        style={{
          width: ringSize,
          height: ringSize,
          marginLeft: -(ringSize - 36) / 2,
          marginTop: -(ringSize - 36) / 2,
          border: ringBorder,
          background: ringBg,
          transition:
            "width 280ms cubic-bezier(0.16,1,0.3,1), height 280ms cubic-bezier(0.16,1,0.3,1), background 280ms, border-color 280ms",
          willChange: "transform",
        }}
      />

      {/* Floating label pill — appears only when there's something to say */}
      <div
        ref={labelRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] origin-left"
        style={{ willChange: "transform" }}
      >
        <div
          className="overflow-hidden rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white whitespace-nowrap"
          style={{
            background:
              "linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)",
            boxShadow: "0 8px 24px -8px rgba(168,85,247,0.7)",
            transition:
              "max-width 360ms cubic-bezier(0.16,1,0.3,1), padding 280ms cubic-bezier(0.16,1,0.3,1), opacity 220ms ease",
            maxWidth: mode === "label" && label ? 320 : 0,
            padding: mode === "label" && label ? "5px 12px" : "5px 0",
            opacity: mode === "label" && label ? 1 : 0,
          }}
        >
          {label}
        </div>
      </div>

      {/* Click ripple keyframes (one-shot DOM nodes inserted on click) */}
      <style>{`
        .cursor-ripple {
          width: 16px;
          height: 16px;
          margin-left: -8px;
          margin-top: -8px;
          border-radius: 9999px;
          border: 1.5px solid rgba(168,85,247,0.9);
          pointer-events: none;
          z-index: 102;
          animation: cursor-ripple 700ms ease-out forwards;
        }
        @keyframes cursor-ripple {
          0%   { transform: scale(0.6); opacity: 0.9; }
          80%  { opacity: 0.4; }
          100% { transform: scale(7);   opacity: 0;   }
        }
      `}</style>
    </>
  );
}
