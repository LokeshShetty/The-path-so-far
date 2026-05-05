/**
 * Decorative concentric rings (perspective-tilted) that sit behind the hero
 * sphere. Plus a tiny "satellite" dot orbiting the largest ring.
 * Pure CSS, compositor-only animations.
 */
export default function OrbitRings() {
  return (
    <>
      <div
        aria-hidden
        className="orbit pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="orbit__ring orbit__ring--lg">
          <span className="orbit__satellite" />
        </div>
        <div className="orbit__ring orbit__ring--md" />
        <div className="orbit__ring orbit__ring--sm" />
      </div>
      <style>{`
        .orbit { width: min(80vmin, 900px); aspect-ratio: 1 / 1; transform-style: preserve-3d; }
        .orbit__ring {
          position: absolute; inset: 0; margin: auto;
          border-radius: 9999px;
          border: 1px solid rgba(168, 85, 247, 0.18);
          will-change: transform;
        }
        .orbit__ring::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit;
          background: conic-gradient(from 0deg,
            rgba(168,85,247,0) 0deg,
            rgba(168,85,247,0.45) 60deg,
            rgba(99,102,241,0.4) 120deg,
            rgba(168,85,247,0) 200deg,
            rgba(236,72,153,0.45) 280deg,
            rgba(168,85,247,0) 360deg);
          mask: radial-gradient(circle, transparent calc(50% - 1px), black calc(50% - 0.5px));
          -webkit-mask: radial-gradient(circle, transparent calc(50% - 1px), black calc(50% - 0.5px));
          opacity: 0.5;
        }
        .orbit__ring--lg { transform: rotateX(72deg) rotateZ(0deg); animation: spin 22s linear infinite; }
        .orbit__ring--md { width: 70%; height: 70%; left: 0; right: 0; top: 0; bottom: 0; transform: rotateX(72deg) rotateZ(0deg); animation: spin 16s linear infinite reverse; opacity: 0.85; }
        .orbit__ring--sm { width: 44%; height: 44%; left: 0; right: 0; top: 0; bottom: 0; transform: rotateX(72deg) rotateZ(0deg); animation: spin 11s linear infinite; opacity: 0.7; }
        .orbit__satellite {
          position: absolute; top: -4px; left: 50%; transform: translateX(-50%);
          width: 8px; height: 8px; border-radius: 9999px;
          background: #ec4899; box-shadow: 0 0 14px #ec4899, 0 0 30px rgba(236,72,153,0.6);
        }
        @keyframes spin {
          from { transform: rotateX(72deg) rotateZ(0deg); }
          to   { transform: rotateX(72deg) rotateZ(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit__ring { animation: none !important; }
        }
      `}</style>
    </>
  );
}
