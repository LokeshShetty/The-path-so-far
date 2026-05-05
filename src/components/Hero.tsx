import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Sparkles } from "lucide-react";
import HeroScene from "./HeroScene";
import MagneticButton from "./ui/MagneticButton";
import SplitText from "./ui/SplitText";
import OrbitRings from "./ui/OrbitRings";
import ScanLine from "./ui/ScanLine";
import CodeFloater from "./ui/CodeFloater";
import HeroStatusBar from "./ui/HeroStatusBar";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Decorative orbital rings (behind everything) */}
      <div aria-hidden className="absolute inset-0 -z-[2] flex items-center justify-center">
        <OrbitRings />
      </div>

      {/* 3D scene */}
      <div className="absolute inset-0 -z-[1]">
        <HeroScene />
      </div>

      {/* Mask gradient — softer so the sphere is visible */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[1]"
        style={{
          background:
            "radial-gradient(75% 70% at 50% 50%, rgba(10,10,15,0) 40%, rgba(10,10,15,0.55) 100%)",
        }}
      />

      {/* Slow scan line */}
      <ScanLine />

      {/* Floating code mock */}
      <CodeFloater />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 py-20 md:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.06] px-3 py-1.5 text-xs font-medium text-fg/80"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#A855F7]" />
          Available for new opportunities
          <span className="ml-1 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-mono text-emerald-300">
            <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            v1.0
          </span>
        </motion.div>

        <h1
          className="font-display text-[clamp(2.75rem,10.5vw,9.5rem)] font-black leading-[0.95] tracking-tightest break-words"
          style={{ letterSpacing: "-0.04em" }}
        >
          <span className="text-fg/95">
            <SplitText text="Lokesh" delay={0.15} />
          </span>
          <span>&nbsp;</span>
          <span className="gradient-flow">
            <SplitText text="Shetty." delay={0.4} />
          </span>
        </h1>

        {/* Roles ticker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-fg/55"
        >
          <span className="rounded-full border border-fg/10 px-2.5 py-1">Full-stack</span>
          <span className="text-fg/30">·</span>
          <span className="rounded-full border border-fg/10 px-2.5 py-1">Frontend Eng</span>
          <span className="text-fg/30">·</span>
          <span className="rounded-full border border-fg/10 px-2.5 py-1">SDE-2 @ SuperAGI</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-base md:text-lg text-fg/70 leading-relaxed"
        >
          Full-stack Developer building agentic-coding desktops, CRMs, and
          workflow engines that ship to production. Currently SDE-2 at SuperAGI,
          shipping React, TypeScript, and Go end-to-end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton as="a" href="#work" variant="primary" data-cursor="Let's Go →">
            View Work
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            download
            variant="ghost"
            data-cursor="Download ↓"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </MagneticButton>
        </motion.div>

        {/* Live status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <HeroStatusBar />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg/50 hover:text-fg transition-colors"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
