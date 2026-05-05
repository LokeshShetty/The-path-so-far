import { useMemo } from "react";

/* ──────────────────────────────────────────────────────────────
   Cosmic backdrop:
     • Layered twinkling star field (CSS-only, deterministic)
     • Periodic shooting stars streaking across
     • Slow drifting nebula glow
     • Faint constellation lines connecting bright stars
   All pure CSS animations so the GPU handles it — zero JS work
   per frame.
   ──────────────────────────────────────────────────────────── */

interface Star {
  x: number; // %
  y: number; // %
  r: number; // px
  delay: number; // s
  bright?: boolean;
}

/* Mulberry32 — small deterministic PRNG so the star map is stable
   across renders (otherwise stars jump on every re-render). */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateStars(count: number, seed: number): Star[] {
  const rng = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    x: rng() * 100,
    y: rng() * 100,
    r: 0.6 + rng() * 1.6,
    delay: rng() * 6,
    bright: rng() > 0.85,
  }));
}

export default function CosmicField() {
  const stars = useMemo(() => generateStars(120, 7), []);
  const brightStars = useMemo(
    () => stars.filter((s) => s.bright).slice(0, 8),
    [stars],
  );

  return (
    <div
      aria-hidden
      className="ls-cosmos pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Drifting nebula */}
      <span className="ls-nebula ls-nebula-1" />
      <span className="ls-nebula ls-nebula-2" />
      <span className="ls-nebula ls-nebula-3" />

      {/* Star field */}
      {stars.map((s, i) => (
        <span
          key={i}
          className={`ls-star ${s.bright ? "ls-star-bright" : ""}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.r,
            height: s.r,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Constellation lines between brightest stars */}
      {brightStars.length > 1 && (
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {brightStars.slice(0, -1).map((s, i) => {
            const next = brightStars[i + 1];
            return (
              <line
                key={i}
                x1={s.x}
                y1={s.y}
                x2={next.x}
                y2={next.y}
                stroke="rgba(168,85,247,0.18)"
                strokeWidth="0.08"
                strokeDasharray="0.3 0.6"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
      )}

      {/* Shooting stars — streaks animating across, staggered */}
      <span className="ls-shooter ls-shooter-1" />
      <span className="ls-shooter ls-shooter-2" />
      <span className="ls-shooter ls-shooter-3" />

      <style>{`
        .ls-cosmos {
          z-index: 0;
        }

        /* ── Stars ──────────────────────────────────────────── */
        .ls-star {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          opacity: 0.6;
          animation: ls-twinkle 4.6s ease-in-out infinite;
          will-change: opacity, transform;
        }
        .ls-star-bright {
          background: #fff;
          box-shadow: 0 0 6px rgba(168, 85, 247, 0.7),
            0 0 14px rgba(99, 102, 241, 0.45);
        }
        @keyframes ls-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50%      { opacity: 1;    transform: scale(1.1); }
        }

        /* ── Nebula ─────────────────────────────────────────── */
        .ls-nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          will-change: transform, opacity;
        }
        .ls-nebula-1 {
          width: 540px; height: 540px;
          left: -120px; top: -120px;
          background: radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%);
          animation: ls-drift-1 24s ease-in-out infinite;
        }
        .ls-nebula-2 {
          width: 460px; height: 460px;
          right: -100px; bottom: -120px;
          background: radial-gradient(circle, rgba(236,72,153,0.28), transparent 70%);
          animation: ls-drift-2 32s ease-in-out infinite;
        }
        .ls-nebula-3 {
          width: 360px; height: 360px;
          left: 35%; top: 30%;
          background: radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%);
          animation: ls-drift-3 28s ease-in-out infinite;
        }
        @keyframes ls-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          50%      { transform: translate(60px, 40px) scale(1.1); opacity: 1; }
        }
        @keyframes ls-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.55; }
          50%      { transform: translate(-50px, -30px) scale(1.08); opacity: 0.95; }
        }
        @keyframes ls-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(0.95); opacity: 0.5; }
          50%      { transform: translate(40px, -50px) scale(1.15); opacity: 0.85; }
        }

        /* ── Shooting stars — slim diagonal streaks ────────── */
        .ls-shooter {
          position: absolute;
          width: 140px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.85) 50%,
            rgba(168, 85, 247, 0.9) 100%
          );
          opacity: 0;
          transform-origin: left center;
          will-change: transform, opacity;
        }
        .ls-shooter::after {
          content: "";
          position: absolute;
          right: -2px;
          top: -2px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.95);
        }
        .ls-shooter-1 {
          top: 18%;
          left: -10%;
          animation: ls-shoot 7s linear infinite;
          animation-delay: 1s;
        }
        .ls-shooter-2 {
          top: 62%;
          left: -10%;
          animation: ls-shoot 9s linear infinite;
          animation-delay: 4s;
        }
        .ls-shooter-3 {
          top: 36%;
          left: -10%;
          animation: ls-shoot 11s linear infinite;
          animation-delay: 7s;
        }
        @keyframes ls-shoot {
          0% {
            transform: translate3d(0, 0, 0) rotate(18deg);
            opacity: 0;
          }
          10%  { opacity: 1; }
          70%  { opacity: 1; }
          100% {
            transform: translate3d(120vw, 220px, 0) rotate(18deg);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ls-star, .ls-nebula, .ls-shooter {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
