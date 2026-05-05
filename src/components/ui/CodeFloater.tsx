import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const lines: { text: string; cls?: string }[] = [
  { text: "$ npx hire lokesh", cls: "text-fg/70" },
  { text: "› role:    full-stack · sde-2", cls: "text-[#A855F7]" },
  { text: "› stack:   react · ts · go · postgres", cls: "text-fg/85" },
  { text: "› shipped: tauri-desktop, crm, agent-builder", cls: "text-fg/85" },
  { text: "✓ available — dm me.", cls: "text-emerald-400" },
];

export default function CodeFloater() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(lines.length);
      return;
    }
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), 600 + shown * 200);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: 4 }}
      transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:block absolute right-6 top-[28%] w-[360px] floater"
      style={{ transformOrigin: "top right" }}
    >
      <div className="rounded-2xl border border-fg/10 bg-bg-soft/85 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
        {/* chrome */}
        <div className="flex items-center justify-between rounded-t-2xl border-b border-fg/5 bg-fg/[0.03] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="font-mono text-[10px] text-fg/40">~ — zsh</div>
          <div className="w-12" />
        </div>
        {/* body */}
        <div className="p-4 font-mono text-[12.5px] leading-relaxed">
          {lines.slice(0, shown).map((l, i) => (
            <div key={i} className={l.cls ?? "text-fg/80"}>
              {l.text}
            </div>
          ))}
          {shown < lines.length && (
            <span className="inline-block h-3.5 w-1.5 translate-y-0.5 bg-[#A855F7] animate-pulse" />
          )}
        </div>
      </div>

      {/* glow underglow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-[1] rounded-3xl blur-2xl opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(168,85,247,0.35), transparent 70%)",
        }}
      />

      <style>{`
        .floater { animation: floaty 8s ease-in-out infinite; will-change: transform; }
        @keyframes floaty {
          0%,100% { transform: translateY(0) rotate(4deg); }
          50%     { transform: translateY(-10px) rotate(4.5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .floater { animation: none; }
        }
      `}</style>
    </motion.div>
  );
}
