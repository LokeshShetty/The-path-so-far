/**
 * Subtle global dot grid behind everything. Pure CSS — composited as a single
 * background image, masked into a soft ellipse so it fades at the edges.
 * Color + opacity read CSS variables so the grid stays tasteful in both themes.
 */
export default function DotGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[5] gpu-layer"
      style={{
        backgroundImage:
          "radial-gradient(rgb(var(--grid-dot) / var(--grid-dot-opacity)) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
        backgroundPosition: "0 0",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)",
        opacity: 0.7,
      }}
    />
  );
}
