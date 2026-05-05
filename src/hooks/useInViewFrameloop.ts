import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + a frameloop value ("always" | "never") suitable for R3F's <Canvas>.
 * The canvas only renders while in view — saves huge amounts of GPU/CPU off-screen.
 */
export function useInViewFrameloop<T extends HTMLElement>(threshold = 0.01) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, frameloop: inView ? ("always" as const) : ("never" as const), inView };
}
