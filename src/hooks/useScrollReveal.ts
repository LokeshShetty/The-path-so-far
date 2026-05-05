import { useInView } from "react-intersection-observer";

export function useScrollReveal(threshold = 0.18, rootMargin = "0px 0px -10% 0px") {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  });
  return { ref, inView };
}
