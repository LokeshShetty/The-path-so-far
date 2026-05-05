import { useEffect, useRef, useState } from "react";
import { Rocket } from "lucide-react";

type Phase = "idle" | "launching" | "flying" | "landing";

/**
 * Floating rocket button.
 *   idle      — sits in the corner, no fire
 *   launching — short windup (shake + small flame)
 *   flying    — full fire trail while the page smooth-scrolls to top
 *   landing   — small bounce + smoke puff once scroll reaches the top
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While flying, watch for the page to settle at the top, then land.
  useEffect(() => {
    if (phase !== "flying") return;
    let settleTimer: number | null = null;

    const check = () => {
      if (window.scrollY <= 4) {
        if (settleTimer) window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => {
          if (phaseRef.current === "flying") {
            setPhase("landing");
            window.setTimeout(() => setPhase("idle"), 750);
          }
        }, 80); // settle delay so we don't false-trigger mid-scroll
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });

    // Safety: if scroll never reaches top (user grabs scrollbar etc.), reset.
    const safety = window.setTimeout(() => {
      if (phaseRef.current === "flying") setPhase("idle");
    }, 4000);

    return () => {
      window.removeEventListener("scroll", check);
      if (settleTimer) window.clearTimeout(settleTimer);
      window.clearTimeout(safety);
    };
  }, [phase]);

  const onClick = () => {
    if (phase !== "idle") return;
    setPhase("launching");

    // Lenis is the page's smooth-scroll engine — calling window.scrollTo
    // with `behavior:'smooth'` does nothing visible because Lenis owns
    // the viewport. Drive Lenis directly when it's available.
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.setTimeout(() => {
      if (phaseRef.current === "launching") setPhase("flying");
    }, 220);
  };

  const flying = phase === "flying";
  const launching = phase === "launching";
  const landed = phase === "landing";
  const showFire = flying || launching;

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={phase !== "idle"}
        aria-label="Scroll to top"
        data-cursor={
          showFire ? "🚀 Liftoff!" : landed ? "Landed ✓" : "Back to top ↑"
        }
        className={`group fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full text-white transition-opacity duration-500 ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none translate-y-4"
        } ${showFire ? "rocket-thrust" : ""} ${landed ? "rocket-land" : ""}`}
        style={{
          background:
            "linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)",
          boxShadow:
            "0 12px 30px -10px rgba(168,85,247,0.6), 0 0 0 1px rgba(255,255,255,0.08) inset",
        }}
      >
        {/* Halo on launch */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 ${
            showFire ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow:
              "0 0 30px rgba(255,170,80,0.7), 0 0 60px rgba(255,90,120,0.4)",
          }}
        />

        {/* Rocket — pointing straight up. Lucide Rocket icon ships at -45deg
            (up-right), so an extra -45deg rotation makes it vertical. */}
        <Rocket
          className={`relative h-6 w-6 transition-transform duration-300 ${
            showFire ? "-translate-y-0.5" : ""
          }`}
          strokeWidth={2.2}
          style={{ transform: "rotate(-45deg)" }}
        />

        {/* Fire trail under the rocket */}
        {showFire && (
          <span aria-hidden className="rocket-flames">
            <span className="flame flame-outer" />
            <span className="flame flame-inner" />
            <span className="ember ember-1" />
            <span className="ember ember-2" />
            <span className="ember ember-3" />
          </span>
        )}

        {/* Landing smoke puffs */}
        {landed && (
          <span aria-hidden className="rocket-puff">
            <span className="puff puff-1" />
            <span className="puff puff-2" />
            <span className="puff puff-3" />
          </span>
        )}
      </button>

      <style>{`
        /* Engine vibration during liftoff & flight */
        .rocket-thrust {
          animation: rocket-thrust 90ms steps(2) infinite;
        }
        @keyframes rocket-thrust {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(0.5px, -0.5px); }
          100% { transform: translate(-0.5px, 0.5px); }
        }

        /* Touch-down bounce */
        .rocket-land {
          animation: rocket-land 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes rocket-land {
          0%   { transform: translateY(-10px); }
          55%  { transform: translateY(3px); }
          100% { transform: translateY(0); }
        }

        /* ── Fire trail ───────────────────────────────────────── */
        .rocket-flames {
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          width: 18px;
          height: 38px;
          pointer-events: none;
          filter: drop-shadow(0 0 6px rgba(255,140,40,0.6));
        }
        .flame {
          position: absolute;
          left: 50%;
          top: -2px;
          transform: translateX(-50%);
          border-radius: 50% 50% 50% 50% / 30% 30% 70% 70%;
        }
        .flame-outer {
          width: 14px;
          height: 26px;
          background: linear-gradient(180deg, #FFD56A 0%, #FF8A3C 55%, #FF4D6D 100%);
          animation: flame-flicker-outer 0.18s ease-in-out infinite alternate;
          opacity: 0.95;
        }
        .flame-inner {
          width: 7px;
          height: 14px;
          background: linear-gradient(180deg, #FFFFFF 0%, #FFE08A 60%, #FF8A3C 100%);
          animation: flame-flicker-inner 0.13s ease-in-out infinite alternate;
        }
        @keyframes flame-flicker-outer {
          0%   { transform: translateX(-50%) scaleY(1)   scaleX(1); }
          100% { transform: translateX(-50%) scaleY(1.3) scaleX(0.8); }
        }
        @keyframes flame-flicker-inner {
          0%   { transform: translateX(-50%) scaleY(0.9) scaleX(1); opacity: 0.85; }
          100% { transform: translateX(-50%) scaleY(1.4) scaleX(0.7); opacity: 1; }
        }

        /* Bright embers raining out of the exhaust */
        .ember {
          position: absolute;
          left: 50%;
          top: 12px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #FFD56A;
          box-shadow: 0 0 6px #FF8A3C;
        }
        .ember-1 { animation: ember-fall 0.55s ease-in 0ms infinite; }
        .ember-2 { animation: ember-fall 0.7s  ease-in 180ms infinite; }
        .ember-3 { animation: ember-fall 0.6s  ease-in 320ms infinite; }
        @keyframes ember-fall {
          0%   { transform: translate(-50%, 0)  scale(1);   opacity: 1; }
          100% { transform: translate(calc(-50% + var(--ex, 4px)), 22px) scale(0.3); opacity: 0; }
        }
        .ember-1 { --ex: -5px; }
        .ember-2 { --ex:  6px; }
        .ember-3 { --ex: -2px; }

        /* ── Landing puff ─────────────────────────────────────── */
        .rocket-puff {
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          width: 36px;
          height: 18px;
          pointer-events: none;
        }
        .puff {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(220, 220, 235, 0.75);
          filter: blur(2px);
          animation: puff-out 0.7s ease-out forwards;
        }
        .puff-1 { left: 2px;  animation-delay: 0ms; }
        .puff-2 { left: 13px; animation-delay: 80ms; }
        .puff-3 { left: 24px; animation-delay: 160ms; }
        @keyframes puff-out {
          0%   { transform: translate(0, 0) scale(0.4); opacity: 0; }
          30%  { opacity: 0.9; }
          100% { transform: translate(0, 14px) scale(1.7); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rocket-thrust, .rocket-land, .flame, .ember, .puff {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
