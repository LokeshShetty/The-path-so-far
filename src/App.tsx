import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AuroraBackground from "./components/ui/AuroraBackground";
import GrainOverlay from "./components/ui/GrainOverlay";
import CustomCursor from "./components/ui/CustomCursor";
import DotGrid from "./components/ui/DotGrid";
import MarqueeStrip from "./components/ui/MarqueeStrip";
import ScrollToTop from "./components/ui/ScrollToTop";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import { useLenis } from "./hooks/useLenis";
import { ThemeProvider } from "./lib/theme";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useLenis();

  // GSAP-driven section reveals (kept light — Framer Motion handles most)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap-fade]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ThemeProvider>
      <main className="relative min-h-screen bg-bg text-fg">
        <AuroraBackground />
        <DotGrid />
        <GrainOverlay />
        <CustomCursor />
        <Nav />

        <Hero />
        <About />
        <MarqueeStrip />
        <Work />
        <Skills />
        <MarqueeStrip
          items={[
            "FROM ZERO TO ONE",
            "SHIP · MEASURE · ITERATE",
            "OWNED END-TO-END",
            "DESIGN + ENGINEER",
          ]}
          speed={75}
        />
        <Timeline />
        <Contact />

        <ScrollToTop />
      </main>
    </ThemeProvider>
  );
}
