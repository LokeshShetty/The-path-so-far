import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Bot,
  Database,
  FileSignature,
  Globe,
  KeyRound,
  Layers,
  MapPin,
  MessagesSquare,
  Send,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import WorkArt, { type WorkArtVariant } from "./ui/WorkArt";

/* Catalog every WorkArt variant + the metadata to label it. The
   journey randomly picks 5 of these as wave-peak checkpoints on each
   load — so the gifs you see vary across visits. */
interface VariantInfo {
  art: WorkArtVariant;
  title: string;
  tag: string;
  Icon: LucideIcon;
  accent: string;
}

const VARIANT_CATALOG: VariantInfo[] = [
  { art: "survey",    title: "Survey Platform",   tag: "WE-Matter · 200+ surveys",          Icon: Send,           accent: "#EC4899" },
  { art: "kyara",     title: "Kyara · Insights",  tag: "WE-Matter · Conversational analytics", Icon: Bot,        accent: "#EC4899" },
  { art: "desktop",   title: "Chat Desktop",      tag: "SuperAGI · Tauri 2 + React 18",     Icon: MessagesSquare, accent: "#A855F7" },
  { art: "dag",       title: "Agent Builder",     tag: "SuperAGI · React Flow",             Icon: Workflow,       accent: "#A855F7" },
  { art: "schema",    title: "Metadata-driven CRM", tag: "SuperAGI · Schema-first UI",      Icon: Layers,         accent: "#A855F7" },
  { art: "auth",      title: "Auth-v2",           tag: "SuperAGI · OIDC · gRPC · Go",       Icon: KeyRound,       accent: "#A855F7" },
  { art: "layout",    title: "Layout Service",    tag: "SuperAGI · Schema-driven render",   Icon: Layers,         accent: "#A855F7" },
  { art: "table",     title: "Reusable Data Table", tag: "SuperAGI · Component library",    Icon: Database,       accent: "#A855F7" },
  { art: "billing",   title: "Invoice + E-Sign",  tag: "SuperAGI · Billing services",       Icon: FileSignature,  accent: "#A855F7" },
  { art: "extension", title: "Salesforce Ext.",   tag: "SuperAGI · Chrome MV3",             Icon: Globe,          accent: "#A855F7" },
];

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/* ────────────────────────────────────────────────────────────────
   Cinematic path-driven timeline.

   The section is tall (~items × 65vh). An inner stage stays pinned
   in the viewport. As the user scrolls the PAGE, an SVG wavy path
   "draws in" — its bright stroke fills via `pathLength`, a glowing
   orb rides the leading edge, and markers light up in turn.

   Content (pin cards / checkpoint animations) is anchored to its
   marker on the path: when scroll reaches the marker, the content
   crossfades in with a 3D rotateX tilt — like the rotating-globe
   feel, but each piece appears beside its checkpoint on the path.
   ──────────────────────────────────────────────────────────────── */

const VB_W = 600;
const VB_H = 1560;
const PATH_D =
  "M 300 80 " +
  "Q 100 220, 300 360 " +
  "T 300 640 " +
  "T 300 920 " +
  "T 300 1200 " +
  "T 300 1480";

interface BaseMarker {
  index: number;
  progress: number;
  x: number;
  y: number;
  /** Which side (relative to path centre) the content card opens. */
  side: "right" | "left";
}

interface PinMarker extends BaseMarker {
  kind: "pin";
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  pinFrom: string;
  pinTo: string;
}

interface CheckMarker extends BaseMarker {
  kind: "check";
  art: WorkArtVariant;
  title: string;
  tag: string;
  Icon: LucideIcon;
  accent: string;
}

type Marker = PinMarker | CheckMarker;

/* Static positions for the five wave-peak checkpoints — only the
   coordinates are fixed; the art/title rendered at each one is
   randomly drawn from VARIANT_CATALOG on page load. */
interface CheckpointSlot {
  progress: number;
  x: number;
  y: number;
  side: "right" | "left";
}

const CHECKPOINT_SLOTS: CheckpointSlot[] = [
  { progress: 1 / 6, x: 200, y: 220,  side: "left"  },
  { progress: 2 / 6, x: 400, y: 500,  side: "right" },
  { progress: 3 / 6, x: 200, y: 780,  side: "left"  },
  { progress: 4 / 6, x: 400, y: 1060, side: "right" },
  { progress: 5 / 6, x: 200, y: 1340, side: "left"  },
];

const PIN_HEAD: PinMarker = {
  kind: "pin",
  index: 0,
  progress: 0.0,
  x: 300,
  y: 80,
  side: "right",
  company: "WE-Matter",
  role: "SDE-1 · Fortune Super 30",
  dates: "Sep 2023 — Jan 2025",
  location: "Mumbai, India",
  pinFrom: "#EC4899",
  pinTo: "#A855F7",
  bullets: [
    "Built Kyara — AI insights chatbot surfacing engagement analytics conversationally instead of through dashboards.",
    "Survey platform at scale: 200+ active surveys, 5,000+ notif/day across Gmail / WhatsApp / SMS at 95% delivery.",
    "Redux analytics dashboard serving 500+ concurrent users with real-time response tracking.",
    "PDF reports with embedded charts via EJS — 1,000+ exports/month, 45% faster load.",
  ],
};

const PIN_TAIL: PinMarker = {
  kind: "pin",
  index: 6,
  progress: 1.0,
  x: 300,
  y: 1480,
  side: "right",
  company: "SuperAGI",
  role: "SDE-2 · Full-stack",
  dates: "Jan 2025 — Present",
  location: "Bangalore, India",
  pinFrom: "#A855F7",
  pinTo: "#6366F1",
  bullets: [
    "SuperAGI Chat Desktop (Tauri 2 + React 18) — native agentic-coding IDE for macOS / Windows / Linux.",
    "Architected Agent Builder — node-based DAG workflow engine on React Flow + Next.js 15.",
    "Built a fully metadata-driven CRM (View + CRM Service) — zero hardcoded UI, every form / table from schema.",
    "Architected Auth-v2 in Go (OIDC, gRPC, multi-tenant) and bootstrapped the superagi-ui pnpm + Turborepo monorepo.",
  ],
};

/* Pick 5 random VARIANT_CATALOG entries and snap them onto the slot
   coordinates. Runs once at module-load: stable through hot reloads
   and during a single session, but every fresh visit shuffles it. */
const checkVariants = pickRandom(VARIANT_CATALOG, CHECKPOINT_SLOTS.length);

const markers: Marker[] = [
  PIN_HEAD,
  ...CHECKPOINT_SLOTS.map<CheckMarker>((slot, i) => ({
    kind: "check",
    index: i + 1,
    progress: slot.progress,
    x: slot.x,
    y: slot.y,
    side: slot.side,
    ...checkVariants[i],
  })),
  PIN_TAIL,
];

const PER_ITEM_VH = 65;

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative"
      style={{ height: `${markers.length * PER_ITEM_VH + 30}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* Backdrop glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(168,85,247,0.12) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-6 md:grid-cols-[1fr_minmax(420px,560px)] md:gap-10 md:px-10">
          {/* ── Left: heading, vertically centred ────────────── */}
          <div className="relative z-10">
            <SectionHeading
              eyebrow="Experience"
              title="The path so far."
              description="Three years across two startups — engagement surveys at scale at WE-Matter, then agentic-coding desktops and platform services at SuperAGI."
            />
          </div>

          {/* ── Right: contained 600px path stage ────────────── */}
          <div
            className="relative mx-auto w-full overflow-hidden"
            style={{
              height: "min(600px, calc(100vh - 160px))",
              perspective: "1800px",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
            }}
          >
            <PathStage progress={progress} />
            {markers.map((m) => (
              <MarkerContent key={m.index} m={m} progress={progress} />
            ))}
          </div>
        </div>

        {/* Right-side dot index */}
        <ProgressDots progress={progress} />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  SVG path that highlights as you scroll                          */
/* ──────────────────────────────────────────────────────────────── */
function PathStage({ progress }: { progress: MotionValue<number> }) {
  const pathRef = useRef<SVGPathElement>(null);
  const orbX = useMotionValue(300);
  const orbY = useMotionValue(80);

  // Drive the orb's (x, y) from the path's geometry as scroll progresses.
  useMotionValueEvent(progress, "change", (val) => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    const pt = pathRef.current.getPointAtLength(val * len);
    orbX.set(pt.x);
    orbY.set(pt.y);
  });

  useEffect(() => {
    if (!pathRef.current) return;
    const pt = pathRef.current.getPointAtLength(0);
    orbX.set(pt.x);
    orbY.set(pt.y);
  }, [orbX, orbY]);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        transform: "rotateY(6deg)",
        transformOrigin: "center",
        filter: "drop-shadow(8px 12px 24px rgba(168,85,247,0.3))",
      }}
    >
      <defs>
        <linearGradient id="ls-trail-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <filter
          id="ls-trail-glow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="ls-orb-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Background dim dashed (full path always visible) */}
      <path
        d={PATH_D}
        stroke="rgba(168,85,247,0.18)"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="9 9"
        strokeLinecap="round"
      />

      {/* Bright trail — fills via pathLength as scroll progresses */}
      <motion.path
        d={PATH_D}
        stroke="url(#ls-trail-grad)"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />

      {/* Soft glow underline that also fills with scroll */}
      <motion.path
        d={PATH_D}
        stroke="url(#ls-trail-grad)"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
        filter="url(#ls-trail-glow)"
        style={{ pathLength: progress }}
      />

      {/* Hidden geometry path used for getPointAtLength() */}
      <path
        ref={pathRef}
        d={PATH_D}
        stroke="transparent"
        fill="none"
      />

      {/* Markers on the path */}
      {markers.map((m) => (
        <PathMarker key={m.index} m={m} progress={progress} />
      ))}

      {/* Glowing orb at the leading edge */}
      <motion.circle cx={orbX} cy={orbY} r="14" fill="#A855F7" opacity="0.5" filter="url(#ls-orb-glow)" />
      <motion.circle cx={orbX} cy={orbY} r="6" fill="#fff" />
      <motion.circle cx={orbX} cy={orbY} r="3" fill="#A855F7" />
    </svg>
  );
}

/* Pin / dot rendered ON the path. Lights up as scroll passes it. */
function PathMarker({
  m,
  progress,
}: {
  m: Marker;
  progress: MotionValue<number>;
}) {
  const slice = 1 / markers.length;
  const range = slice * 0.6;
  const start = m.progress - range;
  const end = m.progress + range;

  const dotScale = useTransform(
    progress,
    [start, m.progress, end],
    [1, 1.6, 1],
  );
  const dotOpacity = useTransform(
    progress,
    [start, m.progress, end],
    [0.45, 1, 0.45],
  );

  if (m.kind === "pin") {
    return (
      <motion.g style={{ transformOrigin: `${m.x}px ${m.y}px` }}>
        <motion.circle
          cx={m.x}
          cy={m.y}
          r="16"
          fill={m.pinFrom}
          stroke="#fff"
          strokeWidth="2"
          style={{ scale: dotScale, opacity: dotOpacity }}
        />
        <motion.circle
          cx={m.x}
          cy={m.y}
          r="6"
          fill="#fff"
          style={{ opacity: dotOpacity }}
        />
      </motion.g>
    );
  }

  return (
    <motion.g style={{ transformOrigin: `${m.x}px ${m.y}px` }}>
      <motion.circle
        cx={m.x}
        cy={m.y}
        r="8"
        fill="#A855F7"
        style={{ scale: dotScale, opacity: dotOpacity }}
      />
      <motion.circle
        cx={m.x}
        cy={m.y}
        r="3"
        fill="#fff"
        style={{ opacity: dotOpacity }}
      />
    </motion.g>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Content beside each marker — pin card or checkpoint art         */
/* ──────────────────────────────────────────────────────────────── */
function MarkerContent({
  m,
  progress,
}: {
  m: Marker;
  progress: MotionValue<number>;
}) {
  const slice = 1 / markers.length;
  const range = slice * 0.7;
  // Don't clamp to [0, 1]. scrollYProgress is already clamped, and
  // monotonic input ranges keep useTransform stable. Clamping to 1
  // for the last marker collapsed [0.9, 1, 1] to a degenerate set,
  // which made the card drift / skew on exit.
  const start = m.progress - range;
  const end = m.progress + range;

  const opacity = useTransform(
    progress,
    [
      start,
      m.progress - range * 0.4,
      m.progress + range * 0.4,
      end,
    ],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    progress,
    [start, m.progress, end],
    [0.7, 1, 0.7],
  );
  const rotateX = useTransform(
    progress,
    [start, m.progress, end],
    [40, 0, -40],
  );
  const yOffset = useTransform(
    progress,
    [start, m.progress, end],
    [60, 0, -60],
  );

  // Vertical position matches marker's y-position on the path.
  const topPct = (m.y / VB_H) * 100;

  // Top / bottom pins anchor by their top / bottom edge so their cards
  // don't run past the 600px window. Middle markers center vertically.
  const isTopPin = m.index === 0;
  const isBottomPin = m.index === markers.length - 1;
  const translateY = isTopPin ? "0%" : isBottomPin ? "-100%" : "-50%";

  return (
    <div
      className="absolute left-1/2 px-2"
      style={{
        top: `${topPct}%`,
        transform: `translate(-50%, ${translateY})`,
        width: "100%",
        maxWidth: 440,
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <motion.div
        className="pointer-events-auto"
        style={{
          opacity,
          scale,
          rotateX,
          y: yOffset,
          transformStyle: "preserve-3d",
          transformPerspective: 1800,
        }}
      >
        {m.kind === "pin" ? <PinCard p={m} /> : <CheckCard c={m} />}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Cards                                                            */
/* ──────────────────────────────────────────────────────────────── */
function PinCard({ p }: { p: PinMarker }) {
  return (
    <div
      className="relative w-[420px] max-w-[90vw] rounded-3xl glass-strong p-5 md:p-6"
      style={{
        boxShadow:
          "0 30px 80px -20px rgba(168,85,247,0.55), 0 0 0 1px rgba(168,85,247,0.18) inset",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl opacity-50"
        style={{
          background: `radial-gradient(circle, ${p.pinFrom}55, transparent 70%)`,
        }}
      />
      <div className="relative flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
          style={{
            background: `linear-gradient(140deg, ${p.pinFrom}, ${p.pinTo})`,
            boxShadow: `0 0 24px ${p.pinFrom}88`,
          }}
        >
          <MapPin className="h-6 w-6" strokeWidth={2.4} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-fg">
            {p.company}
          </h3>
          <p className="text-xs md:text-sm text-fg/55 italic">{p.role}</p>
        </div>
      </div>

      <div className="relative mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-fg/45">
        {p.dates} · {p.location}
      </div>

      <ul className="relative mt-4 space-y-2 text-[12.5px] leading-relaxed text-fg/85">
        {p.bullets.map((b, i) => (
          <li
            key={i}
            className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#A855F7] before:shadow-[0_0_6px_#A855F7]"
          >
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheckCard({ c }: { c: CheckMarker }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative aspect-[16/10] w-[360px] max-w-[80vw] overflow-hidden rounded-2xl glass-strong"
        style={{
          height: 220,
          boxShadow:
            "0 30px 70px -20px rgba(168,85,247,0.55), 0 0 0 1px rgba(168,85,247,0.18) inset",
        }}
      >
        <WorkArt variant={c.art} />
      </div>

      <div className="text-center">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-fg/45">
          {c.tag}
        </div>
        <h3 className="mt-1.5 inline-flex items-center gap-2 text-lg md:text-xl font-bold tracking-tight text-fg">
          <c.Icon
            className="h-4 w-4"
            style={{ color: c.accent }}
            strokeWidth={2.4}
          />
          {c.title}
        </h3>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Right-side progress dots                                         */
/* ──────────────────────────────────────────────────────────────── */
function ProgressDots({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
      {markers.map((m) => (
        <ProgressDot key={m.index} m={m} progress={progress} />
      ))}
    </div>
  );
}

function ProgressDot({
  m,
  progress,
}: {
  m: Marker;
  progress: MotionValue<number>;
}) {
  const slice = 1 / markers.length;
  const range = slice * 0.6;
  const start = m.progress - range;
  const end = m.progress + range;

  const opacity = useTransform(progress, [start, m.progress, end], [0.3, 1, 0.3]);
  const scale = useTransform(progress, [start, m.progress, end], [1, 1.6, 1]);

  return (
    <motion.span
      className="block rounded-full"
      style={{
        opacity,
        scale,
        width: m.kind === "pin" ? 10 : 6,
        height: m.kind === "pin" ? 10 : 6,
        background: m.kind === "pin" ? (m as PinMarker).pinFrom : "#A855F7",
        boxShadow: "0 0 12px rgba(168,85,247,0.7)",
      }}
    />
  );
}
