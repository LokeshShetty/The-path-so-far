/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  // `class` for opt-in `dark:` variants and `[data-theme="dark"]` selector
  // so child styles can target either signal.
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens — read CSS variables, support `<alpha-value>`.
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-soft": "rgb(var(--bg-soft) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        "fg-strong": "rgb(var(--fg-strong) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",

        // Brand constants — same in both themes.
        accent: "#A855F7",
        indigo: "#6366F1",
        pink: "#EC4899",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(168, 85, 247, 0.35)",
        "glow-lg": "0 0 80px rgba(168, 85, 247, 0.5)",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(-3%, 4%) rotate(180deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        aurora: "aurora 20s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
