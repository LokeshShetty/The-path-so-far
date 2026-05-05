import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { tiltCard } from "../lib/motion";
import SectionHeading from "./SectionHeading";
import WorkArt, { type WorkArtVariant } from "./ui/WorkArt";

interface ProjectDetails {
  scope: string;
  highlights: string[];
  impact: string;
  status: string;
}

interface Project {
  title: string;
  description: string;
  gif: string;
  art: WorkArtVariant;
  tags: string[];
  meta: string;
  details: ProjectDetails;
}

const projects: Project[] = [
  {
    title: "SuperAGI Chat Desktop",
    description:
      "Tauri-based agentic-coding IDE with embedded terminal, multi-agent threads, and one-click PRs. Comparable to Cursor, Claude Code, and Codex.",
    gif: "/gifs/chat-desktop.gif",
    art: "desktop",
    tags: ["Tauri 2", "React 18", "Xterm.js", "TipTap", "MQTT", "LiveKit"],
    meta: "Native · macOS / Win / Linux",
    details: {
      scope: "Architect & owner — single codebase, three OS targets",
      highlights: [
        "Embedded Coder Agent (Plan / Ask / Edit modes) with Xterm.js terminal via tauri-pty",
        "Per-tool permissions, code-diff side drawer, parallel multi-agent threads with isolated context",
        "Mention-based agent invocation (TipTap), MQTT real-time chat, LiveKit voice & video — one unified surface",
        "One-click PR creation, all without leaving the app",
      ],
      impact: "Native client shipping for macOS / Windows / Linux from a single codebase",
      status: "Shipping internally at SuperAGI",
    },
  },
  {
    title: "Agent Builder",
    description:
      "Node-based DAG workflow engine built with React Flow. Compose dozens of nodes — triggers, branches, delays, webhooks, agents — in minutes.",
    gif: "/gifs/agent-builder.gif",
    art: "dag",
    tags: ["React Flow", "Next.js 15", "React 19", "Zustand"],
    meta: "Workflow Engine",
    details: {
      scope: "Architected from scratch",
      highlights: [
        "Extensible node-type system: triggers, conditional branches, if / else, time delays, webhooks, agent actions",
        "Connector-pattern integration layer with schema-cached metadata model",
        "Every node, connector, and configuration form is fully reusable",
        "Users compose dozens of nodes in minutes",
      ],
      impact: "Workflow engine consumed by SuperAGI ops & customers",
      status: "Production",
    },
  },
  {
    title: "Metadata-driven CRM",
    description:
      "Zero hardcoded UI. 20–25 custom attribute types. Forms, tables, Kanban — all generated dynamically from the schema.",
    gif: "/gifs/crm.gif",
    art: "schema",
    tags: ["TypeScript", "React Query", "Ant Design", "PostgreSQL"],
    meta: "Schema-first · CRM Service",
    details: {
      scope: "Owned end-to-end (View Service + CRM Service)",
      highlights: [
        "Custom objects supporting 20-25 attribute types",
        "Every form, table, and detail view generated dynamically from schema",
        "New entities ship without a frontend deploy",
        "Powers SuperSales — sequences, prospects, lists, custom objects",
      ],
      impact: "Zero hardcoded UI across the entire CRM surface",
      status: "Production",
    },
  },
  {
    title: "Layout Service",
    description:
      "Schema-driven rendering engine with a stable contract consumed by N+ services across the platform — eliminating duplicate UI code.",
    gif: "/gifs/layout-service.gif",
    art: "layout",
    tags: ["Go", "gRPC", "TypeScript", "JSON Schema"],
    meta: "Platform Service",
    details: {
      scope: "Designed frontend + backend",
      highlights: [
        "Schema-driven rendering engine with a stable contract",
        "Any service declares its layout in metadata and gets fully rendered forms, tables & detail views for free",
        "Eliminates duplicate UI code platform-wide",
        "Consumed by multiple internal services beyond CRM",
      ],
      impact: "One layout contract — N+ services share it",
      status: "Production",
    },
  },
  {
    title: "Reusable Data Table",
    description:
      "Drag-to-reorder, hide/show, resizable widths, row-grouping, Kanban view, advanced multi-condition filters, bulk actions.",
    gif: "/gifs/data-table.gif",
    art: "table",
    tags: ["React 18", "TypeScript", "TanStack", "Virtualization"],
    meta: "Component Library",
    details: {
      scope: "Engineered as a shared component",
      highlights: [
        "Drag-to-reorder columns, hide / show, resizable widths, row-grouping, Kanban view",
        "Advanced multi-condition filters",
        "Bulk-action library: add-to-sequence, add-to-list, bulk edit, export, assign, quick-call, quick-email",
        "Composed by SuperSales, CRM, custom objects — without rewriting",
      ],
      impact: "Powers every entity surface across SuperSales and CRM",
      status: "Production",
    },
  },
  {
    title: "Auth-v2",
    description:
      "Go backend with OIDC for federated identity, gRPC + REST handlers, multi-tenant orgs and refresh-token rotation. RBAC + ABAC on the frontend.",
    gif: "/gifs/auth-v2.gif",
    art: "auth",
    tags: ["Go", "GORM", "OIDC", "gRPC", "PostgreSQL", "ABAC"],
    meta: "Identity Service",
    details: {
      scope: "Architected backend + frontend access layer",
      highlights: [
        "Go service: GORM on PostgreSQL, gRPC + REST handlers, multi-tenant orgs",
        "OIDC (OpenID Connect) for federated identity & login flows",
        "Frontend RBAC + ABAC gating routes, components, and actions",
        "Used across every SuperAGI product",
      ],
      impact: "One identity layer for the entire platform",
      status: "Production",
    },
  },
  {
    title: "Invoice + E-Signature",
    description:
      "End-to-end Invoice and E-Signature services — frontend and backend — integrated into the SuperSales billing flow with line items, totals, and audit trails.",
    gif: "/gifs/invoice.gif",
    art: "billing",
    tags: ["Go", "React", "PostgreSQL", "PDF"],
    meta: "Billing · SuperSales",
    details: {
      scope: "Owned both services end-to-end",
      highlights: [
        "Go backends + React UIs",
        "Audit-logged signing flow",
        "Async PDF generation pipeline",
        "Webhook delivery with retries",
      ],
      impact: "Live billing flow inside SuperSales",
      status: "Production",
    },
  },
  {
    title: "Salesforce Chrome Extension",
    description:
      "Manifest V3 extension that surfaces SuperAGI actions inside Salesforce Lightning — add to sequence, quick-call, quick-email, sync to CRM.",
    gif: "/gifs/extension.gif",
    art: "extension",
    tags: ["Chrome MV3", "TypeScript", "React", "Salesforce"],
    meta: "Browser Extension · MV3",
    details: {
      scope: "Built for enterprise clients",
      highlights: [
        "Manifest V3 extension running inside Salesforce Lightning",
        "Surfaces add-to-sequence, quick-call, quick-email actions in-page",
        "Two-way sync back to SuperAGI CRM",
        "Cross-frame messaging + service-worker architecture",
      ],
      impact: "SuperAGI actions live where the sales team already works",
      status: "Production",
    },
  },
  {
    title: "Kyara · Insights Bot",
    description:
      "AI-powered insights chatbot for WE-Matter — surfaces engagement analytics through a conversational interface so HR teams ask questions instead of drilling through dashboards.",
    gif: "/gifs/kyara.gif",
    art: "schema",
    tags: ["React", "LLM", "Redux", "Real-time"],
    meta: "WE-Matter · AI Insights",
    details: {
      scope: "Designed and shipped end-to-end",
      highlights: [
        "Conversational analytics over engagement-survey data",
        "Drill-down questions like “how is engagement trending in APAC?”",
        "Streams answers in real-time with cited data points",
        "Replaces dashboard-hunting for non-technical HR teams",
      ],
      impact: "Lifts adoption of the analytics layer across HR teams",
      status: "Production · WE-Matter",
    },
  },
  {
    title: "Survey Platform",
    description:
      "Multi-role survey platform with 200+ active surveys, 5,000+ daily notifications across Gmail / WhatsApp / SMS at 95% delivery, and PDF report exports.",
    gif: "/gifs/survey.gif",
    art: "survey",
    tags: ["React", "Redux", "Node.js", "EJS", "Styled Components"],
    meta: "WE-Matter · Fortune Super 30",
    details: {
      scope: "Owned core platform features",
      highlights: [
        "4 user roles: admin, client, superadmin, user — managing 200+ active surveys",
        "Reminder system across Gmail / WhatsApp / SMS — 5,000+ notif/day at 95% delivery",
        "Redux dashboard with real-time tracking — 500+ concurrent users",
        "PDF reports via EJS templating — 1,000+ exports/month, 45% faster load times",
      ],
      impact: "Used by Fortune-listed clients for engagement programs",
      status: "Production · WE-Matter",
    },
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      variants={tiltCard}
      custom={index}
      className="h-full"
      style={{ minHeight: 620 }}
    >
      <Tilt
        glareEnable={!flipped}
        glareMaxOpacity={0.18}
        glareColor="#A855F7"
        glarePosition="all"
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        transitionSpeed={1400}
        scale={1.015}
        className="h-full"
      >
        <div
          data-cursor={flipped ? "Flip back" : `View · ${project.title}`}
          onClick={(e) => {
            // Don't flip if a real link/button inside the card was clicked.
            if ((e.target as HTMLElement).closest("a, button")) return;
            setFlipped((f) => !f);
          }}
          className="relative h-full w-full cursor-pointer"
          style={{ perspective: "1400px" }}
        >
          <div
            className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* ── FRONT FACE ────────────────────────────────────── */}
            <article
              className="group absolute inset-0 overflow-hidden rounded-2xl glass transition-shadow duration-500 hover:border-[#A855F7]/60 hover:shadow-[0_0_60px_-10px_rgba(168,85,247,0.6)]"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-bg-soft to-bg">
                <WorkArt variant={project.art} />

                {!imgFailed && (
                  <img
                    src={project.gif}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500"
                    onLoad={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = "1";
                    }}
                    onError={() => setImgFailed(true)}
                  />
                )}

                <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-bg/65 transition-all duration-300 group-hover:bg-[#A855F7] group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4 text-fg" />
                </div>

                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-bg/65 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/70">
                  {project.meta}
                </div>

                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 35%, rgba(168,85,247,0.18) 50%, transparent 65%)",
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-fg">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-fg/65">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.04 * i, duration: 0.4 }}
                      className="chip"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#A855F7]/70">
                  <Sparkles className="h-3 w-3" />
                  Click to flip
                </div>
              </div>

              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A855F7, transparent)",
                }}
              />
            </article>

            {/* ── BACK FACE ─────────────────────────────────────── */}
            <article
              className="absolute inset-0 overflow-hidden rounded-2xl glass-strong"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full opacity-40 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(168,85,247,0.6), transparent 70%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full opacity-30 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)",
                }}
              />

              <div className="relative flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A855F7]/80">
                      Inside · {project.title}
                    </div>
                    <h3 className="mt-1.5 text-lg md:text-xl font-bold tracking-tight text-fg">
                      {project.details.scope}
                    </h3>
                  </div>
                  <span
                    className="shrink-0 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300"
                    title={project.details.status}
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    {project.details.status.split("·")[0].trim()}
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-fg/75">
                  {project.details.highlights.map((h) => (
                    <li
                      key={h}
                      className="relative pl-4 before:absolute before:left-0 before:top-[7px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#A855F7] before:shadow-[0_0_6px_#A855F7]"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  <div className="rounded-xl border border-[#A855F7]/25 bg-[#A855F7]/5 p-3">
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-fg/45">
                      Impact
                    </div>
                    <div className="mt-1 text-[13px] font-medium text-fg/90">
                      {project.details.impact}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/50">
                    <RotateCcw className="h-3 w-3" />
                    Click to flip back
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

const AUTOPLAY_MS = 5000;

export default function Work() {
  const { ref, inView } = useScrollReveal(0.05);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance to the next card every AUTOPLAY_MS — pauses while
  // the section is off-screen, on hover, or when user has manually
  // paused via the play/pause button.
  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % projects.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, inView]);

  const goTo = (i: number) =>
    setActiveIndex(((i % projects.length) + projects.length) % projects.length);
  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  return (
    <section
      id="work"
      ref={ref}
      className="relative mx-auto w-full max-w-7xl px-0 md:px-4 py-20 md:py-28 lg:py-32 cv-auto"
    >
      <div className="px-6 md:px-10">
        <SectionHeading
          eyebrow="Featured Work"
          title="Production systems, not portfolio toys."
          description="From a native agentic-coding desktop to a fully metadata-driven CRM — every card is something I designed, built, and shipped to production end-to-end."
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-12 md:mt-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Holographic spotlight that pools behind the active card ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[460px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.28), rgba(99,102,241,0.12) 40%, transparent 70%)",
          }}
        />

        {/* ── Prev / Next — diamond HUD chevrons ── */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
          data-cursor="◀ Previous"
          className="ls-nav-btn left-2 md:left-6"
        >
          <span className="ls-nav-glow" />
          <ChevronLeft className="relative h-4 w-4" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next project"
          data-cursor="Next ▶"
          className="ls-nav-btn right-2 md:right-6"
        >
          <span className="ls-nav-glow" />
          <ChevronRight className="relative h-4 w-4" strokeWidth={2.5} />
        </button>

        {/* ── 3-card track ─────────────────────────────────
             Renders ALL projects on a flex track and translates
             the track left/right to centre the active one. The
             track is masked so neighbours fade at the edges, and
             a single rocket sails between the active card and
             the next one to come into focus. */}
        <div
          className="relative overflow-hidden py-12"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex items-stretch gap-4 md:gap-6"
            animate={{
              // Centre the active card by shifting the whole track
              // left by activeIndex card-widths, then a half-card
              // back so the active card is in the middle column.
              x: `calc(50% - (var(--ls-card-w) + var(--ls-gap)) * ${activeIndex} - var(--ls-card-w) / 2)`,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 24,
              mass: 0.6,
            }}
            style={
              {
                // CSS variables driven by media-queries so the same
                // formula above works at every breakpoint.
                ["--ls-card-w" as never]: "var(--card-w)",
                ["--ls-gap" as never]: "var(--card-gap)",
              } as React.CSSProperties
            }
          >
            {projects.map((p, i) => {
              const distance = Math.abs(i - activeIndex);
              const isActive = distance === 0;
              return (
                <div
                  key={p.title}
                  className="ls-card-slot shrink-0"
                  style={{
                    transition: "opacity 600ms, filter 600ms",
                    opacity: distance > 1 ? 0.18 : isActive ? 1 : 0.55,
                    filter: distance > 1 ? "blur(2px)" : "blur(0)",
                  }}
                  onClick={() => {
                    if (!isActive) goTo(i);
                  }}
                >
                  {/* Halo behind the active card */}
                  {isActive && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-3 rounded-[2rem] z-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(168,85,247,0.45), rgba(236,72,153,0.4))",
                        filter: "blur(28px)",
                        opacity: 0.7,
                        animation: "ls-active-pulse 4s ease-in-out infinite",
                      }}
                    />
                  )}
                  <div className="relative h-full">
                    <ProjectCard project={p} index={i} />
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

        {/* ── Bottom HUD: counter + segmented progress + play/pause ── */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em]">
            <span className="text-[#A855F7]">[</span>
            <span className="text-fg/70">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-fg/30">/</span>
            <span className="text-fg/40">
              {String(projects.length).padStart(2, "0")}
            </span>
            <span className="text-[#A855F7]">]</span>
            <span className="ml-1 h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            <span className="text-fg/55">{projects[activeIndex].title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
              data-cursor={paused ? "Resume" : "Pause"}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-fg/15 bg-fg/[0.04] text-fg/70 transition-all hover:bg-fg/[0.1] hover:text-fg hover:border-[#A855F7]/40"
            >
              {paused ? (
                <Play className="h-3 w-3" strokeWidth={2.5} />
              ) : (
                <Pause className="h-3 w-3" strokeWidth={2.5} />
              )}
            </button>

            <div className="flex items-center gap-1">
              {projects.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${p.title}`}
                  data-cursor={p.title}
                  className="group relative h-3 transition-all duration-500"
                  style={{ width: i === activeIndex ? 30 : 14 }}
                >
                  <span
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)",
                      background:
                        i === activeIndex
                          ? "linear-gradient(90deg, #6366F1, #A855F7, #EC4899)"
                          : "rgba(168,85,247,0.18)",
                      boxShadow:
                        i === activeIndex
                          ? "0 0 14px rgba(168,85,247,0.7)"
                          : "none",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        :root {
          --card-w: 86vw;
          --card-gap: 16px;
        }
        @media (min-width: 640px) {
          :root { --card-w: 60vw; --card-gap: 20px; }
        }
        @media (min-width: 768px) {
          :root { --card-w: 44vw; --card-gap: 22px; }
        }
        @media (min-width: 1024px) {
          :root { --card-w: 30vw; --card-gap: 24px; }
        }
        @media (min-width: 1280px) {
          :root { --card-w: 26vw; --card-gap: 24px; }
        }
        @media (min-width: 1536px) {
          :root { --card-w: 22vw; --card-gap: 24px; }
        }
        .ls-card-slot {
          position: relative;
          width: var(--card-w);
        }

        .ls-nav-btn {
          position: absolute;
          top: 50%;
          z-index: 20;
          transform: translateY(-50%) rotate(45deg);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgb(var(--fg) / 0.85);
          background: rgb(var(--bg) / 0.7);
          border: 1px solid rgb(var(--fg) / 0.12);
          backdrop-filter: blur(12px);
          transition: all 280ms cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .ls-nav-btn > svg { transform: rotate(-45deg); }
        .ls-nav-btn:hover {
          color: rgb(var(--fg));
          border-color: rgba(168,85,247,0.6);
          box-shadow: 0 0 24px -4px rgba(168,85,247,0.7);
        }
        .ls-nav-glow {
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(99,102,241,0.6), rgba(168,85,247,0.6), rgba(236,72,153,0.6));
          opacity: 0;
          transition: opacity 280ms;
          z-index: -1;
        }
        .ls-nav-btn:hover .ls-nav-glow { opacity: 1; }

        @keyframes ls-active-pulse {
          0%, 100% { opacity: 0.45; }
          50%      { opacity: 0.9; }
        }

      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
    </section>
  );
}


