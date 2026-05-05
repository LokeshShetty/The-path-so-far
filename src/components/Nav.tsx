import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ui/ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize up to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <div
          className={`gpu-layer flex items-center gap-1 md:gap-2 rounded-full border px-2 md:px-3 py-1.5 transition-all duration-500 ${
            scrolled
              ? "border-fg/10 bg-bg/55 backdrop-blur-md shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
              : "border-fg/5 bg-bg/35 backdrop-blur-sm"
          }`}
        >
          <a
            href="#home"
            data-cursor="Top ↑"
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-fg"
            aria-label="Home"
          >
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #6366F1, #A855F7, #EC4899)",
                boxShadow: "0 0 10px #A855F7",
              }}
            />
            <span>LS</span>
          </a>

          <div className="hidden md:flex items-center">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-2.5 lg:px-3 py-1.5 text-xs font-medium text-fg/70 hover:text-fg transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noreferrer"
            download
            data-cursor="Download ↓"
            className="ml-1 hidden sm:inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-[0_8px_24px_-10px_rgba(168,85,247,0.7)]"
            style={{
              background:
                "linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)",
            }}
          >
            Resume
          </a>

          {/* Theme toggle (desktop) */}
          <div className="hidden md:block ml-1">
            <ThemeToggle variant="pill" />
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.06] text-fg/85 hover:text-fg hover:border-fg/25 transition-colors"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-bg/70 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="sheet"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-4 right-4 top-20 z-50 rounded-2xl border border-fg/10 bg-bg-soft/95 p-5 backdrop-blur-md md:hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
            >
              <div className="grid grid-cols-2 gap-2">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-fg/5 bg-fg/[0.03] px-4 py-3 text-sm font-semibold text-fg/85 hover:text-fg hover:border-[#A855F7]/40 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noreferrer"
                download
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)",
                }}
              >
                Download Resume
              </a>
              <div className="mt-2">
                <ThemeToggle variant="block" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
