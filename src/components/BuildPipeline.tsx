import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Check,
  Cpu,
  Database,
  FileSignature,
  Globe,
  Loader2,
  MessagesSquare,
  Rocket,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Real products I shipped — the production pane cycles through
   these so the visual tells the story "scratch → prod" across
   many products, not one toy URL.
   ──────────────────────────────────────────────────────────── */
type Product = {
  name: string;
  domain: string;
  version: string;
  Icon: LucideIcon;
  tag: string;
};

const products: Product[] = [
  {
    name: "SuperAGI Chat Desktop",
    domain: "superagi.com/desktop",
    version: "v2.4.1",
    Icon: MessagesSquare,
    tag: "Tauri 2 · React 18",
  },
  {
    name: "Agent Builder",
    domain: "superagi.com/agents",
    version: "v1.8.0",
    Icon: Workflow,
    tag: "React Flow · Next 15",
  },
  {
    name: "Metadata-driven CRM",
    domain: "superagi.com/crm",
    version: "v3.0.2",
    Icon: Database,
    tag: "Schema-driven UI",
  },
  {
    name: "Auth-v2 Service",
    domain: "auth.superagi.com",
    version: "v2.1.0",
    Icon: Cpu,
    tag: "Go · gRPC · OIDC",
  },
  {
    name: "E-Signature Service",
    domain: "superagi.com/sign",
    version: "v1.3.4",
    Icon: FileSignature,
    tag: "Audit-logged · async",
  },
  {
    name: "Kyara · Insights Bot",
    domain: "we-matter.com/kyara",
    version: "v1.0.0",
    Icon: Bot,
    tag: "Conversational analytics",
  },
];

/* The four lines that "type in" inside the editor pane. */
const codeLines = [
  { n: 1, t: "export function App() {" },
  { n: 2, t: "  const data = useQuery(", color: "indigo" as const },
  { n: 3, t: "    { key: 'users' },", color: "muted" as const },
  { n: 4, t: "  );" },
  { n: 5, t: "  return <Dashboard />;" },
  { n: 6, t: "}" },
];

const stages = [
  { id: "install", label: "pnpm install", duration: "0.3s" },
  { id: "typecheck", label: "tsc --noEmit", duration: "0.9s" },
  { id: "build", label: "vite build", duration: "1.2s" },
  { id: "deploy", label: "kubectl rollout", duration: "live" },
];

/* Cycle timing (ms) */
const TYPE_END = 700;
const STAGE_STARTS = [900, 1700, 2500, 3400];
const LIVE_AT = 4500;
const CYCLE_MS = 7800;

export default function BuildPipeline() {
  const [tick, setTick] = useState(0);
  const [productIdx, setProductIdx] = useState(0);

  // 80ms cadence is enough for everything visible here.
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 80);
    return () => window.clearInterval(id);
  }, []);

  // Advance the product on every cycle wrap.
  const cycleNumber = Math.floor((tick * 80) / CYCLE_MS);
  useEffect(() => {
    setProductIdx(cycleNumber % products.length);
  }, [cycleNumber]);

  const elapsed = (tick * 80) % CYCLE_MS;
  const stageState = (i: number): "idle" | "running" | "done" => {
    const start = STAGE_STARTS[i];
    const end = STAGE_STARTS[i + 1] ?? LIVE_AT;
    if (elapsed < start) return "idle";
    if (elapsed < end) return "running";
    return "done";
  };
  const isLive = elapsed >= LIVE_AT;
  const typedLines = Math.min(
    codeLines.length,
    Math.max(0, Math.floor((elapsed / TYPE_END) * codeLines.length)),
  );

  const product = products[productIdx];

  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4 md:p-5">
      {/* ── Editor pane ─────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-xl border border-line/15 bg-bg/55 shadow-[0_10px_30px_-15px_rgba(168,85,247,0.45)]">
        <div className="flex items-center gap-2 border-b border-line/10 bg-fg/[0.04] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/45">
            App.tsx
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-mono text-[9px] text-fg/40">
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
            saved
          </span>
        </div>

        <div className="font-mono text-[11px] leading-[1.55] px-3 py-2.5 min-h-[110px]">
          {codeLines.map((line, i) => {
            const visible = i < typedLines;
            const isCurrent = i === typedLines && i < codeLines.length;
            return (
              <div
                key={line.n}
                className="flex items-start gap-2 transition-opacity duration-200"
                style={{ opacity: visible || isCurrent ? 1 : 0.18 }}
              >
                <span className="w-3 select-none text-right text-fg/30">
                  {line.n}
                </span>
                <span
                  className={
                    line.color === "indigo"
                      ? "text-[#A5B4FC]"
                      : line.color === "muted"
                        ? "text-fg/45"
                        : "text-fg/85"
                  }
                >
                  {visible ? line.t : ""}
                  {isCurrent && (
                    <span className="ml-0.5 inline-block h-[10px] w-[6px] -mb-[1px] animate-pulse bg-[#A855F7]" />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CI pipeline pane ─────────────────────────────────── */}
      <div className="rounded-xl border border-line/15 bg-bg/55 px-3 py-2.5">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/45">
            CI · pipeline
          </span>
          <span className="font-mono text-[9px] text-fg/35">
            #{String(cycleNumber + 247).padStart(3, "0")}
          </span>
        </div>
        <ul className="space-y-1.5">
          {stages.map((s, i) => {
            const state = stageState(i);
            return (
              <li
                key={s.id}
                className="flex items-center gap-2 font-mono text-[11px]"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-300 ${
                    state === "done"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : state === "running"
                        ? "bg-[#A855F7]/20 text-[#A855F7]"
                        : "bg-fg/10 text-fg/30"
                  }`}
                >
                  {state === "done" ? (
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  ) : state === "running" ? (
                    <Loader2 className="h-2.5 w-2.5 animate-spin" />
                  ) : (
                    <span className="h-1 w-1 rounded-full bg-current" />
                  )}
                </span>
                <span
                  className={
                    state === "idle"
                      ? "text-fg/35"
                      : state === "running"
                        ? "text-fg/85"
                        : "text-fg/65"
                  }
                >
                  $ {s.label}
                </span>
                <span className="ml-auto text-fg/30">{s.duration}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Production pane (cycles across products) ─────────── */}
      <motion.div
        animate={{ opacity: isLive ? 1 : 0.45, scale: isLive ? 1 : 0.985 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-line/15 bg-bg/55 px-3 py-2.5"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-1 items-center gap-2.5 min-w-0"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#6366F1] via-[#A855F7] to-[#EC4899]">
              <product.Icon className="h-4 w-4 text-white" strokeWidth={2.2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[11px] font-semibold text-fg/90">
                {product.name}
              </div>
              <div className="truncate font-mono text-[9px] uppercase tracking-[0.2em] text-fg/45">
                <Globe className="mr-1 inline-block h-2.5 w-2.5 -mt-0.5" />
                {product.domain} · {product.tag}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <span
          className={`relative shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 ${
            isLive
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
              : "border-fg/15 bg-fg/5 text-fg/40"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isLive
                ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                : "bg-fg/30"
            }`}
          />
          {isLive ? `live · ${product.version}` : "deploying"}
        </span>

        {/* Rocket flies up briefly when each product first goes live */}
        {isLive && elapsed - LIVE_AT < 900 && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 1, 0], y: [-2, -28, -56] }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="pointer-events-none absolute right-3 top-1 text-[#A855F7]"
            aria-hidden
          >
            <Rocket className="h-3.5 w-3.5" />
          </motion.span>
        )}
      </motion.div>

      {/* ── Flow particles overlay ───────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#A855F7]"
            style={{
              boxShadow: "0 0 8px #A855F7",
              animation: `pipeline-flow 2.4s ${i * 0.8}s linear infinite`,
              top: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pipeline-flow {
          0%   { transform: translate(-50%, 0); opacity: 0; }
          15%  { opacity: 0.9; }
          85%  { opacity: 0.4; }
          100% { transform: translate(-50%, 100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
