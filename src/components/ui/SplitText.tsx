import { motion, type Variants } from "framer-motion";
import { splitChar, stagger } from "../../lib/motion";

interface Props {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  perChar?: boolean;
  variants?: Variants;
}

/**
 * Split text into characters (or words) and reveal them with a stagger.
 * Use `perChar={false}` for word-level splits to keep wrapping predictable.
 */
export default function SplitText({
  text,
  className,
  charClassName,
  delay = 0,
  perChar = true,
  variants,
}: Props) {
  const tokens = perChar ? Array.from(text) : text.split(/(\s+)/);

  return (
    <motion.span
      className={className}
      variants={stagger(delay, perChar ? 0.025 : 0.06)}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-block", perspective: 800 }}
    >
      {tokens.map((t, i) =>
        t === " " || /^\s+$/.test(t) ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <motion.span
            key={i}
            variants={variants ?? splitChar}
            style={{ display: "inline-block", whiteSpace: "pre" }}
            className={charClassName}
          >
            {t}
          </motion.span>
        ),
      )}
    </motion.span>
  );
}
