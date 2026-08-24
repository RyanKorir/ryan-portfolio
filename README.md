# Ryan Kiprotich Korir — Portfolio

Personal portfolio + interactive product for Ryan Kiprotich Korir. Built as a
content-first Next.js app: UI components read from `src/data/*.json`, never
the other way around, so adding a project never means touching the layout.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Deploy target: Vercel

## Status

**Scaffold phase.** Project structure, data files, types, and the GitHub
data-fetch utility exist. No real UI has been built yet — `src/app/page.tsx`
is a bare placeholder that only proves the data layer is wired correctly.

## Architecture

```
src/
  app/            Next.js App Router pages + layout + global styles
  components/      (empty — UI components go here next)
  data/           Structured content: profile, experience, projects, skills,
                  build-lab, achievements, config. Edit these, not the UI,
                  to update content.
  lib/
    types.ts      Shared TypeScript types for every data shape
    data.ts       Typed accessors for src/data/*.json
    github.ts     GitHub REST API fetch with graceful failure handling
```

Core site (About/Experience/Projects/Skills/Contact) is meant to work fully
standalone. Command Center, Terminal, Achievements, GitHub Explorer, and the
Portfolio AI Assistant are optional layers on top, gated behind
`config.json → featureFlags`, and must degrade gracefully if their backing
service is unavailable (GitHub API, AI API, etc.) — see Section 38 of the
original spec doc for the exact fallback copy.

## Content rules (do not violate)

Anything in `src/data/*.json` marked `[ADD ...]` or `null` is an
**unconfirmed placeholder**, not a gap to fill with a guess. Per the spec's
"What Must Not Be Invented" list: no fabricated employment details, job
titles, dates, GitHub stats, clients, certifications, awards, metrics, or
testimonials. When in doubt, leave the placeholder and surface it to Ryan.

## Getting started

```bash
npm install
npm run dev
```

## Next build phases (not yet done)

1. Core UI: Hero, About, Experience, Projects (with filtering), Skills,
   Build Lab, Contact — all reading from `src/data/`.
2. Command Center dashboard + optional Terminal.
3. Achievement system (localStorage-backed, per `achievements.json`).
4. GitHub Explorer UI wired to `lib/github.ts`.
5. Portfolio AI Assistant — start as a deterministic FAQ over `src/data/`
   before wiring any real AI API (Section 15).
6. Accessibility + reduced-motion pass, SEO metadata per route, deploy to
   Vercel.

## Outstanding info needed from Ryan before launch

- Real contact email, LinkedIn URL, phone (optional), website
- Confirmed job title + dates for the Gulf African Bank internship
- Project detail gaps marked `[ADD DETAIL]` across `projects.json`
- Profile photo
