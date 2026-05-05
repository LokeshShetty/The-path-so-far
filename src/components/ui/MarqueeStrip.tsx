/**
 * Slow scrolling text strip used as a section divider. Compositor-only animation.
 */
const DEFAULT_ITEMS = [
  "AVAILABLE FOR HIRE",
  "BANGALORE · IND",
  "BUILDING IN PUBLIC",
  "REACT · TYPESCRIPT · GO",
  "ZERO-TO-ONE",
  "PRODUCTION-GRADE",
];

export default function MarqueeStrip({
  items = DEFAULT_ITEMS,
  speed = 60,
}: {
  items?: string[];
  speed?: number;
}) {
  const all = [...items, ...items, ...items];
  return (
    <div
      className="relative w-full overflow-hidden border-y border-fg/5 py-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(168,85,247,0.04), rgba(168,85,247,0))",
      }}
    >
      <div
        className="flex w-max gap-12 marquee-strip"
        style={{ animationDuration: `${speed}s` }}
      >
        {all.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-12 font-display text-2xl md:text-4xl font-extrabold tracking-tightest text-fg/15"
          >
            <span className="whitespace-nowrap">{it}</span>
            <span aria-hidden className="text-[#A855F7]/60 text-3xl">★</span>
          </div>
        ))}
      </div>
      <style>{`
        .marquee-strip {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @keyframes marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-33.333%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-strip { animation: none; }
        }
      `}</style>
    </div>
  );
}
