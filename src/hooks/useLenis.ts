import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    // Expose so other components (e.g. ScrollToTop) can drive the same
    // smooth-scroll instance. Without this, native window.scrollTo doesn't
    // visibly scroll the page because Lenis is the one moving the viewport.
    window.__lenis = lenis;

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Anchor links
    const onClick = (e: Event) => {
      const a = (e.target as HTMLElement)?.closest(
        "a[href^='#']",
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id) as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -20, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);
}
