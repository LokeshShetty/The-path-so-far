import { motion } from "framer-motion";
import { Bot, Code2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useTheme } from "../lib/theme";

interface SkillItem {
  name: string;
  slug?: string;
  color?: string;
  /** Falls back to a Lucide icon for brands missing from simple-icons. */
  Icon?: LucideIcon;
}

interface SkillRow {
  category: string;
  items: SkillItem[];
  reverse?: boolean;
}

const rows: SkillRow[] = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
      { name: "Go", slug: "go", color: "00ADD8" },
      { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
      { name: "C++", slug: "cplusplus", color: "00599C" },
      { name: "SQL", slug: "postgresql", color: "4169E1" },
      { name: "HTML5", slug: "html5", color: "E34F26" },
      { name: "CSS3", slug: "css3", color: "1572B6" },
    ],
  },
  {
    category: "Frontend",
    reverse: true,
    items: [
      { name: "React", slug: "react", color: "61DAFB" },
      { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
      { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
      { name: "Ant Design", slug: "antdesign", color: "0170FE" },
      { name: "Framer Motion", slug: "framer", color: "0055FF" },
      { name: "Three.js", slug: "threedotjs", color: "FFFFFF" },
      { name: "Vite", slug: "vite", color: "646CFF" },
    ],
  },
  {
    category: "Backend & Data",
    items: [
      { name: "Go", slug: "go", color: "00ADD8" },
      { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { name: "gRPC", slug: "grpc", color: "FFFFFF" },
      { name: "GORM", slug: "go", color: "00ADD8" },
      { name: "Redis", slug: "redis", color: "FF4438" },
      { name: "MQTT", slug: "mqtt", color: "660066" },
      { name: "WebSockets", slug: "socketdotio", color: "FFFFFF" },
      { name: "REST", slug: "swagger", color: "85EA2D" },
    ],
  },
  {
    category: "DevOps & Tooling",
    reverse: true,
    items: [
      { name: "Docker", slug: "docker", color: "2496ED" },
      { name: "Bazel", slug: "bazel", color: "43A047" },
      { name: "pnpm", slug: "pnpm", color: "F69220" },
      { name: "Turborepo", slug: "turborepo", color: "EF4444" },
      { name: "Git", slug: "git", color: "F05032" },
      { name: "Sentry", slug: "sentry", color: "362D59" },
    ],
  },
  {
    category: "AI & Editors",
    items: [
      { name: "Claude Code", slug: "claude", color: "D97757" },
      { name: "Cursor", slug: "cursor", color: "FFFFFF" },
      { name: "GitHub Copilot", slug: "githubcopilot", color: "FFFFFF" },
      // VS Code was removed from simple-icons (Microsoft brand
      // policy), so we fall back to a Lucide editor glyph.
      { name: "VS Code", Icon: Code2 },
      // ChatGPT — Lucide bot glyph keeps the sizing consistent
      // with the OpenAI brand mark when it doesn't render.
      { name: "ChatGPT", Icon: Bot },
      { name: "Anthropic", slug: "anthropic", color: "D97757" },
      { name: "Postman", slug: "postman", color: "FF6C37" },
      { name: "Figma", slug: "figma", color: "F24E1E" },
    ],
  },
];

/** True for hex strings that read as "white-ish" — anything we'd
 *  expect to disappear when rendered against a light background. */
function isNearWhite(hex: string): boolean {
  const m = hex.match(/^#?([0-9a-fA-F]{6})$/);
  if (!m) return false;
  const v = parseInt(m[1], 16);
  const r = (v >> 16) & 0xff;
  const g = (v >> 8) & 0xff;
  const b = v & 0xff;
  // Luminance > 240/255 = effectively white
  return r > 240 && g > 240 && b > 240;
}

function Chip({ name, slug, color, Icon }: SkillItem) {
  const { theme } = useTheme();

  // Swap white-ish brand colours to a near-black in light mode so
  // the icon stays visible against the light surface. Dark mode
  // keeps the canonical brand colour.
  const resolvedColor = (() => {
    const fallback = theme === "light" ? "0A0A0F" : "FFFFFF";
    if (!color) return fallback;
    if (theme === "light" && isNearWhite(color)) return "0A0A0F";
    return color;
  })();

  return (
    <div
      data-cursor={name}
      className="group flex items-center gap-3 rounded-2xl glass px-5 py-3 transition-all duration-300 hover:border-[#A855F7]/60 hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.7)]"
    >
      {Icon ? (
        <Icon
          className="h-5 w-5 text-fg/85 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={2}
          aria-hidden
        />
      ) : slug ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}/${resolvedColor}`}
          alt=""
          loading="lazy"
          className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // simple-icons CDN sometimes returns 404 for brands the
            // package has dropped — show a generic glyph instead of
            // collapsing the chip to a bare label.
            const img = e.currentTarget as HTMLImageElement;
            img.outerHTML = `
              <span class="ls-fallback-icon flex h-5 w-5 items-center justify-center rounded-md bg-fg/10 text-fg/70 text-[10px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5">
                  <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
                </svg>
              </span>`;
          }}
        />
      ) : (
        <Sparkles className="h-5 w-5 text-fg/85" aria-hidden />
      )}
      <span className="text-sm font-medium text-fg/85 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({ row }: { row: SkillRow }) {
  // Duplicate items so the strip can loop seamlessly
  const items = [...row.items, ...row.items];
  return (
    <div className="group/row">
      <div className="mb-3 flex items-center gap-3 px-2 font-mono text-[11px] uppercase tracking-[0.3em] text-fg/40">
        <span className="h-px w-6 bg-fg/20" />
        {row.category}
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex w-max gap-4 group-hover/row:[animation-play-state:paused]"
          style={{
            animation: `marquee 38s linear infinite ${row.reverse ? "reverse" : ""}`,
          }}
        >
          {items.map((s, i) => (
            <Chip key={`${row.category}-${s.name}-${i}`} {...s} />
          ))}
        </div>
        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24"
          style={{
            background:
              "linear-gradient(to right, rgb(var(--bg)), rgb(var(--bg) / 0))",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24"
          style={{
            background:
              "linear-gradient(to left, rgb(var(--bg)), rgb(var(--bg) / 0))",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-7xl px-6 md:px-10 py-20 md:py-28 lg:py-32 cv-auto"
    >
      <SectionHeading
        eyebrow="Skills"
        title="The toolbox."
        description="Languages, frameworks, and infrastructure I reach for daily — production-grade, not just resume-grade."
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-10 md:mt-14 lg:mt-16 space-y-10"
      >
        {rows.map((r) => (
          <MarqueeRow key={r.category} row={r} />
        ))}
      </motion.div>
    </section>
  );
}
