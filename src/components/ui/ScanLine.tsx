/**
 * A thin horizontal scan line that sweeps the area on a slow loop.
 * Decorative — meant to live inside a `relative` parent (e.g. the hero).
 */
export default function ScanLine() {
  return (
    <>
      <div aria-hidden className="scanline pointer-events-none absolute inset-x-0 h-px gpu-layer" />
      <style>{`
        .scanline {
          top: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(168,85,247,0) 10%,
            rgba(168,85,247,0.55) 50%,
            rgba(168,85,247,0) 90%,
            transparent 100%
          );
          box-shadow: 0 0 18px rgba(168,85,247,0.55);
          opacity: 0.9;
          animation: scan 9s linear infinite;
        }
        @keyframes scan {
          0%   { transform: translate3d(0, 0, 0); opacity: 0; }
          5%   { opacity: 0.9; }
          95%  { opacity: 0.9; }
          100% { transform: translate3d(0, 100vh, 0); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scanline { animation: none; opacity: 0; }
        }
      `}</style>
    </>
  );
}
