/**
 * Pure-CSS aurora. No Framer Motion (no per-frame React re-renders).
 * Three big radial blobs animated on the compositor via `transform`.
 * Blur is baked into the gradient (radial fade) — no `filter: blur()`.
 *
 * Theme-aware: blob opacity + vignette read CSS variables so the layer
 * dims appropriately in light mode.
 */
export default function AuroraBackground() {
  return (
    <>
      <div
        aria-hidden
        className="aurora pointer-events-none fixed inset-0 -z-10 overflow-hidden gpu-layer bg-bg"
      >
        <div className="aurora__top" />
        <div className="aurora__a" />
        <div className="aurora__b" />
        <div className="aurora__c" />
        <div className="aurora__vignette" />
      </div>

      <style>{`
        .aurora__top {
          position: absolute; inset: 0;
          background: radial-gradient(60% 50% at 50% 0%, rgba(99,102,241,0.18), transparent 70%);
          opacity: var(--aurora-opacity);
        }
        .aurora__a, .aurora__b, .aurora__c {
          position: absolute;
          border-radius: 9999px;
          opacity: var(--aurora-opacity);
          will-change: transform;
          transition: opacity 0.6s ease;
        }
        .aurora__a {
          left: -25%; top: -20%;
          width: 60vmax; height: 60vmax;
          background: radial-gradient(circle, rgba(99,102,241,0.55), transparent 60%);
          animation: aurora-a 26s ease-in-out infinite;
        }
        .aurora__b {
          right: -15%; top: 10%;
          width: 55vmax; height: 55vmax;
          background: radial-gradient(circle, rgba(168,85,247,0.55), transparent 60%);
          animation: aurora-b 24s ease-in-out infinite;
        }
        .aurora__c {
          left: 20%; bottom: -20%;
          width: 55vmax; height: 55vmax;
          background: radial-gradient(circle, rgba(236,72,153,0.45), transparent 60%);
          opacity: calc(var(--aurora-opacity) * 0.85);
          animation: aurora-c 30s ease-in-out infinite;
        }
        .aurora__vignette {
          position: absolute; inset: 0;
          background: radial-gradient(
            120% 80% at 50% 50%,
            rgb(var(--aurora-vignette) / 0) 60%,
            rgb(var(--aurora-vignette) / var(--aurora-vignette-alpha)) 100%
          );
        }
        @keyframes aurora-a {
          0%,100% { transform: translate3d(0,0,0); }
          50%     { transform: translate3d(60px,40px,0); }
        }
        @keyframes aurora-b {
          0%,100% { transform: translate3d(0,0,0); }
          50%     { transform: translate3d(-50px,60px,0); }
        }
        @keyframes aurora-c {
          0%,100% { transform: translate3d(0,0,0); }
          50%     { transform: translate3d(40px,-40px,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora__a, .aurora__b, .aurora__c { animation: none; }
        }
      `}</style>
    </>
  );
}
