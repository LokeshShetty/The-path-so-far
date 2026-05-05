# The Path So Far — Lokesh Shetty's portfolio

Live at **https://lokeshshetty.github.io/The-path-so-far/**

Built with **Vite + React 18 + TypeScript**, styled with Tailwind v3, animated with Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll, and React Three Fiber. Deployed to GitHub Pages via Actions.

---

## ✨ Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS v3** — themed via CSS variables (dark / light), custom palette
- **Framer Motion** — UI animations, scroll-driven transforms, character-split text
- **React Three Fiber + drei** — 3D hero scene
- **GSAP + ScrollTrigger** — scroll-driven entrances
- **Lenis** — smooth scrolling
- **react-parallax-tilt** — 3D card tilt
- **Lucide React** — icons

## 🚀 Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → ./dist  (with the `/The-path-so-far/` base path)
npm run preview  # preview the production build locally
```

## 📦 Deploy — GitHub Pages

Pushes to `main` automatically rebuild and republish via **`.github/workflows/deploy.yml`**.

To set up a fresh fork:

1. **Repo → Settings → Pages → Source: "GitHub Actions"** (not "Deploy from a branch").
2. Push to `main`. The workflow runs `npm ci`, `npm run build`, and uploads `dist/` to Pages.
3. The site lands at `https://<your-username>.github.io/<repo-name>/`.

If you rename the repo, update the `base` in **[vite.config.ts](vite.config.ts)** to match the new sub-path. For root hosting (e.g. a `<username>.github.io` repo), set `base: '/'`.

## 🖼 Featured Work — animations

Each card in [src/components/Work.tsx](src/components/Work.tsx) is paired with a bespoke animated SVG illustration from [src/components/ui/WorkArt.tsx](src/components/ui/WorkArt.tsx). Variants: `desktop`, `dag`, `schema`, `layout`, `table`, `auth`, `billing`, `extension`, `survey`, `kyara`. To plug in a real GIF / WebM, drop the file at `public/gifs/<name>.gif` and reference it via the `gif` field on the project — the component falls back to the SVG art if the asset is missing.

## 📄 Resume

The PDF at `public/resume.pdf` is wired up to:

- The hero **Download Resume** button
- The nav **Resume** pill

There's no on-page resume section — the **Experience** timeline + **Skills** carousel cover the same ground. Replace `public/resume.pdf` whenever you re-export.

## ✏️ Where to swap text

| What | File | Search for |
| --- | --- | --- |
| Hero subtitle | `src/components/Hero.tsx` | `"Full-stack Developer building"` |
| About paragraphs / stats | `src/components/About.tsx` | `const stats =` |
| Featured work projects | `src/components/Work.tsx` | `const projects:` |
| Experience pin bullets | `src/components/Timeline.tsx` | `const PIN_HEAD` / `const PIN_TAIL` |
| Skills marquees | `src/components/Skills.tsx` | `const rows:` |
| Contact cards | `src/components/Contact.tsx` | `const cards =` |
| Page meta / OG | `index.html` | `<meta property="og:` |

## 🎨 Design tokens

Themed via CSS custom properties in [src/index.css](src/index.css). Switching between dark / light is handled by [src/lib/theme.tsx](src/lib/theme.tsx) using the View Transitions API for the circular reveal effect on toggle.

| Token | Value (dark) |
| --- | --- |
| Background | `#0A0A0F` |
| Primary gradient | `linear-gradient(135deg, #6366F1, #A855F7, #EC4899)` |
| Accent purple | `#A855F7` |
| Text primary | `#F5F5F7` |
| Text muted | `#9CA3AF` |

## 🧩 Project structure

```
src/
  components/
    Hero.tsx          HeroScene.tsx
    About.tsx         BuildPipeline.tsx
    Work.tsx          (carousel of flippable project cards)
    Skills.tsx
    Timeline.tsx      (cinematic path-driven experience section)
    Contact.tsx
    Nav.tsx           SectionHeading.tsx
    ui/
      WorkArt.tsx     (animated SVG illustrations per project)
      MagneticButton.tsx
      GlassCard.tsx
      CustomCursor.tsx
      AuroraBackground.tsx · GrainOverlay.tsx · DotGrid.tsx
      CosmicField.tsx (starfield + shooting stars on Contact)
      Spotlight.tsx · ScanLine.tsx · OrbitRings.tsx
      ScrollToTop.tsx (rocket launch / land animation)
      SplitText.tsx · MarqueeStrip.tsx
      ThemeToggle.tsx · HeroStatusBar.tsx · CodeFloater.tsx
  hooks/
    useScrollReveal.ts · useMagnetic.ts · useLenis.ts
    useInViewFrameloop.ts
  lib/
    motion.ts · theme.tsx
  App.tsx · main.tsx · index.css
public/
  resume.pdf · favicon.svg
  gifs/   (optional — fallback to SVG art if missing)
```

## ♿️ Accessibility

- Respects `prefers-reduced-motion` — disables Lenis, magnetic effects, custom cursor, the cosmic backdrop, and most animations.
- Custom cursor only activates on `(hover: hover) and (pointer: fine)` devices.
- All interactive elements stay keyboard-focusable; carousel arrows / pause button / progress segments are real `<button>` elements.

## 📝 License

MIT — fork freely.
