import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { fadeUp, stagger } from "../lib/motion";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: Props) {
  const { ref, inView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      variants={stagger(0.1, 0.1)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}
    >
      <motion.div
        variants={fadeUp}
        className="inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.06] px-3 py-1 text-xs font-mono uppercase tracking-[0.25em] text-fg/70"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] shadow-[0_0_10px_#A855F7]" />
        {eyebrow}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tightest text-fg"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-5 text-base md:text-lg leading-relaxed text-fg/60"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
