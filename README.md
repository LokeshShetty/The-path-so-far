# Lokesh Shetty — Portfolio

Stunning, animated developer portfolio. **Vite + React 18 + TypeScript**, with Framer Motion, React Three Fiber, GSAP + ScrollTrigger, Lenis smooth scroll, and Tailwind CSS v3.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/LokeshShetty/portfolio)

---

## ✨ Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS v3** (dark-mode-only, custom palette)
- **Framer Motion** — UI animations, scroll reveals, character-split text
- **React Three Fiber + drei** — 3D hero scene + animated avatar blob
- **GSAP + ScrollTrigger** — scroll-driven entrance animations
- **Lenis** — buttery smooth scrolling
- **Lucide React** — icons
- **react-parallax-tilt** — 3D card tilt
- **react-countup** — animated stats

## 🚀 Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → ./dist
npm run preview  # preview the production build locally
```

## 📦 Deploy to Netlify

This repo includes `netlify.toml` so deploys are zero-config:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Either:
- **Drag-and-drop** the `/dist` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or
- **Connect the repo** in Netlify and let CI build it.

## 🖼 Adding your own GIFs

Drop your previews into `public/gifs/` with these exact filenames:

```
public/gifs/
  chat-desktop.gif
  agent-builder.gif
  crm.gif
  layout-service.gif
  data-table.gif
  auth-v2.gif
```

The cards in [src/components/Work.tsx](src/components/Work.tsx) reference each path. To add a new project, append to the `projects` array in that file:

```ts
{
  title: "Your project",
  description: "Two-line description.",
  gif: "/gifs/your-project.gif",
  tags: ["React", "Go", "..."],
  meta: "Category · Service",
}
```

> Tip: keep GIFs under ~3 MB. For sharper, lighter previews use `.webm` / `.mp4` and replace the `<img>` in `Work.tsx` with a muted `<video>`.

## 📄 Resume

Drop your PDF at `public/resume.pdf`. It's already wired up to:

- The hero **Download Resume** button
- The nav **Resume** pill
- The **Resume** section iframe (`/resume.pdf#view=FitH`)
- The **Download Resume (PDF)** CTA below the iframe

## ✏️ Where to swap placeholder text

| What | File | Search for |
| --- | --- | --- |
| Hero subtitle | `src/components/Hero.tsx` | `"Full-stack Developer building"` |
| About paragraphs | `src/components/About.tsx` | `"I'm a Full-stack Developer"` |
| Stats (3 / 15+ / 4 / 1) | `src/components/About.tsx` | `const stats =` |
| Project list | `src/components/Work.tsx` | `const projects:` |
| Skills marquees | `src/components/Skills.tsx` | `const rows:` |
| Experience timeline | `src/components/Timeline.tsx` | `const jobs:` |
| Contact details | `src/components/Contact.tsx` | `const cards =` |
| Phone / location | `src/components/Contact.tsx` | `+91 81477 77707` |
| Page meta / OG | `index.html` | `<meta property="og:` |

## 🎨 Design tokens

Edit `tailwind.config.js` to tweak the palette. Defaults:

| Token | Value |
| --- | --- |
| Background | `#0A0A0F` |
| Primary gradient | `linear-gradient(135deg, #6366F1, #A855F7, #EC4899)` |
| Accent purple | `#A855F7` |
| Text primary | `#F5F5F7` |
| Text muted | `#9CA3AF` |
| Glass | `rgba(168,85,247,0.08)` + `backdrop-blur(20px)` |

## 🧩 Project structure

```
src/
  components/
    Hero.tsx          HeroScene.tsx
    About.tsx         AvatarBlob.tsx
    Work.tsx
    Skills.tsx
    Timeline.tsx
    ResumeEmbed.tsx
    Contact.tsx
    Nav.tsx           SectionHeading.tsx
    ui/
      MagneticButton.tsx
      GlassCard.tsx
      CustomCursor.tsx
      AuroraBackground.tsx
      GrainOverlay.tsx
      Spotlight.tsx
      SplitText.tsx
  hooks/
    useScrollReveal.ts
    useMagnetic.ts
    useLenis.ts
  lib/
    motion.ts
  App.tsx · main.tsx · index.css
public/
  resume.pdf
  favicon.svg
  gifs/
```

## ♿️ Accessibility

- Respects `prefers-reduced-motion` — disables Lenis, magnetic effects, custom cursor, and most animations.
- Custom cursor only activates on `(hover: hover) and (pointer: fine)` devices.
- All interactive elements remain keyboard-focusable.

## 📝 License

MIT — fork freely.
