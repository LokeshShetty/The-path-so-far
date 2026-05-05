import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { fadeUp, stagger } from "../lib/motion";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./ui/MagneticButton";
import CosmicField from "./ui/CosmicField";

const cards = [
  {
    label: "Email",
    value: "lokesh.k0904@gmail.com",
    href: "mailto:lokesh.k0904@gmail.com",
    icon: Mail,
    cursor: "Send Mail ↗",
    accent: "from-[#6366F1] to-[#A855F7]",
  },
  {
    label: "LinkedIn",
    value: "/in/LokeshshettyS",
    href: "https://linkedin.com/in/LokeshshettyS",
    icon: Linkedin,
    cursor: "Let's Connect ↗",
    accent: "from-[#A855F7] to-[#EC4899]",
  },
  {
    label: "GitHub",
    value: "@LokeshShetty",
    href: "https://github.com/LokeshShetty",
    icon: Github,
    cursor: "See Code ↗",
    accent: "from-[#EC4899] to-[#6366F1]",
  },
];

export default function Contact() {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative mx-auto w-full max-w-7xl px-6 md:px-10 pt-16 md:pt-20 lg:pt-24 pb-20 md:pb-28 lg:pb-32 cv-auto"
    >
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something."
        description="Open to product-engineering roles, freelance, and interesting collaborations. Fastest reply via email."
      />

      <motion.div
        variants={stagger(0.1, 0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mt-10 md:mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <motion.a
              key={c.label}
              variants={fadeUp}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor={c.cursor}
              className="group relative overflow-hidden rounded-2xl glass p-7 transition-all duration-500 hover:border-[#A855F7]/60 hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.7)]"
            >
              {/* Accent gradient bar */}
              <div
                aria-hidden
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${c.accent} opacity-60`}
              />
              {/* Glow blob on hover */}
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                style={{
                  background:
                    "radial-gradient(circle, rgba(168,85,247,0.6), transparent 70%)",
                }}
              />

              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fg/5 border border-fg/10 transition-colors group-hover:border-[#A855F7]/50">
                  <Icon className="h-5 w-5 text-fg" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-fg/40 transition-all duration-300 group-hover:text-fg group-hover:rotate-45" />
              </div>

              <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-fg/40">
                {c.label}
              </div>
              <div className="mt-1 text-lg md:text-xl font-semibold text-fg break-all">
                {c.value}
              </div>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Big CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-10 md:mt-14 lg:mt-16 overflow-hidden rounded-3xl glass-strong p-10 md:p-14 text-center"
      >
        {/* Cosmic backdrop — twinkling stars + drifting nebula +
            periodic shooting stars. Sits behind the content. */}
        <CosmicField />

        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(168,85,247,0.55), transparent 60%)",
          }}
        />

        {/* Floating "available" badge — top corner, terminal vibe */}
        <div
          aria-hidden
          className="absolute left-5 top-5 z-10 hidden md:flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Online · Bangalore
        </div>

        {/* Floating timezone pill — opposite corner */}
        <div
          aria-hidden
          className="absolute right-5 top-5 z-10 hidden md:flex items-center gap-1.5 rounded-full border border-fg/15 bg-fg/[0.05] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/55"
        >
          <span className="h-1 w-1 rounded-full bg-[#A855F7] shadow-[0_0_6px_#A855F7]" />
          IST · GMT+5:30
        </div>

        <h3
          className="relative z-10 text-3xl md:text-5xl font-extrabold tracking-tightest text-fg"
          style={{ letterSpacing: "-0.03em" }}
        >
          Got an idea worth shipping?
        </h3>
        <p className="relative z-10 mt-4 text-fg/65 max-w-xl mx-auto">
          I&apos;m most useful at the zero-to-one stage — turning vague briefs
          into shippable systems end-to-end.
        </p>
        <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-4">
          <MagneticButton
            as="a"
            href="mailto:lokesh.k0904@gmail.com"
            variant="primary"
          >
            <Mail className="h-4 w-4" />
            Send me an email
          </MagneticButton>
          <MagneticButton
            as="a"
            href="tel:+918147777707"
            variant="ghost"
          >
            <Phone className="h-4 w-4" />
            +91 81477 77707
          </MagneticButton>
        </div>

        <div className="relative z-10 mt-8 flex items-center justify-center gap-2 text-xs text-fg/40 font-mono">
          <MapPin className="h-3.5 w-3.5" /> Bangalore, India
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-fg/5 pt-8 font-mono text-xs text-fg/40">
        <div>© {new Date().getFullYear()} Lokesh Shetty</div>
        <div className="flex items-center gap-4">
          <span>built with React · R3F · Framer Motion</span>
          <span className="hidden md:inline">·</span>
          <a
            href="#home"
            className="hover:text-fg transition-colors uppercase tracking-[0.3em]"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  );
}
