import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { fadeUp, stagger } from "../lib/motion";
import SectionHeading from "./SectionHeading";
import BuildPipeline from "./BuildPipeline";

const stats = [
  { value: 3, suffix: "", label: "Years experience", post: "YOE" },
  { value: 4, suffix: "", label: "Backend services", post: "Services" },
  { value: 1, suffix: "", label: "AI desktop shipped", post: "AI Desktop" },
];

export default function About() {
  const { ref, inView } = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto w-full max-w-7xl px-6 md:px-10 py-20 md:py-28 lg:py-32 cv-auto"
    >
      <SectionHeading
        eyebrow="About"
        title="Builder of zero-to-one SaaS systems."
        description="I ship features end-to-end — from architecture and Go services to React UIs and pixel-level polish — without waiting on a Figma handoff."
      />

      <div className="mt-10 md:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: zero-to-prod pipeline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="Zero → Production"
          className="lg:col-span-5 relative h-[440px]"
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-[2rem] glass-strong"
            style={{ boxShadow: "0 0 80px -20px rgba(168,85,247,0.55)" }}
          />
          <BuildPipeline />
          <div className="absolute -bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-fg/50">
            <span>// scratch</span>
            <span>→ production</span>
          </div>
        </motion.div>

        {/* Right: story */}
        <motion.div
          variants={stagger(0.1, 0.12)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="lg:col-span-7 space-y-5 text-fg/75 leading-relaxed text-base md:text-lg"
        >
          <motion.p variants={fadeUp}>
            I&apos;m a Full-stack Developer with{" "}
            <span className="text-fg">3 years</span> in industry, currently
            an <span className="text-fg">SDE-2 at SuperAGI</span>. I work
            best at startups where the surface area is wide and the brief is
            ambiguous — turning &ldquo;build me X&rdquo; into a shippable
            product end-to-end.
          </motion.p>
          <motion.p variants={fadeUp}>
            On the frontend I ship in{" "}
            <span className="text-fg">React and TypeScript</span>: a Tauri
            desktop with an embedded agentic-coding IDE, a node-based workflow
            engine on React Flow, and a fully metadata-driven CRM where every
            form, table, and detail view is generated from schema.
          </motion.p>
          <motion.p variants={fadeUp}>
            On the backend I own services in{" "}
            <span className="text-fg">Go</span> — Auth-v2 (OIDC, gRPC,
            PostgreSQL), Invoice, E-Signature, and Layout — and I
            bootstrapped the company&apos;s pnpm + Turborepo monorepo with a
            Changesets-driven semver release flow now consumed across teams.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="!mt-10 grid grid-cols-3 gap-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-xl p-4 hover:shadow-glow transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-extrabold tracking-tightest gradient-text">
                  {inView ? (
                    <CountUp end={s.value} duration={1.6} suffix={s.suffix} />
                  ) : (
                    "0"
                  )}
                </div>
                <div className="mt-1 text-[11px] font-mono uppercase tracking-[0.2em] text-fg/50">
                  {s.post}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
