# harshitbeni.com — Research Summary & Next.js Migration Plan

## 1. Current site (as of April 2026)

**Platform:** Hosted on **Framer** (`Server: Framer/4c11ff8`), with assets preconnected to `framerusercontent.com`. The live HTML is large (~500 KB first response), consistent with a visual builder export rather than a minimal static page.

**Audience & positioning:** Product designer portfolio; Interaction Design at CCA (San Francisco); emphasis on **0→1 shipping** and B2B SaaS case studies.

**Information architecture:**

| Area | Purpose |
|------|---------|
| Home (`/`) | Hero, credentials, links to employers (Privado, Fold, Thursday, Thence), **showreel**, **resume** (`/cv`) |
| Work (`/work/*`) | Case studies (e.g. Privado mobile scan, assessments, Thursday culture & websites, Things 4 concept) |
| About (`/about`) | Bio / narrative |
| Journal (`/journal`) | Explorations (e.g. Flora, Things 4, macOS concepts) |
| Archive (`/archive` — “v3”) | Prior version |
| External | Notes subdomain (`notes.harshitbeni.com`), Framer affiliate link, social (X, LinkedIn, Bluesky), email |

**Interaction patterns implied:** Project grids/cards with rich thumbnails and blurbs; in-page anchor `#work`; navigation to work, about, notes, archive.

**Migration implication:** Content is **structured pages + media**, not a simple landing page. You will need **MDX or a CMS** for long-form case studies, **optimized images/video** for showreel and covers, and **redirect mapping** from current Framer URLs if URLs change.

---

## 2. Modern stack for a designer portfolio (Next.js–centric)

**Recommended core (aligned with your constraints):**

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 15** (App Router) | App Router + **React Server Components** keep portfolio JS small; `generateMetadata` / `sitemap` / `robots` for SEO; **ISR** or static export for mostly-static marketing pages. |
| Language | **TypeScript (strict)** | Safer refactors as case studies grow; better editor support for content models. |
| Styling | **Tailwind CSS v4** (or stable v3.4+) | Fast iteration on layout/spacing; **OKLCH**-friendly tokens for brand color; pairs well with design systems. |
| Motion | **Motion** (formerly Framer Motion) **v12+** | Page transitions, staggered reveals, scroll-linked effects; **lazy-load** motion on below-the-fold sections to protect LCP. |
| Content | **MDX** + `next-mdx-remote` or **Contentlayer**-style typed content | Case studies and journal posts as files in repo (Git-based workflow) or optional headless CMS later. |
| Images / media | **`next/image`** + **Mux** or **Cloudinary** (or self-hosted) for showreel | Designer sites are media-heavy; avoid shipping uncompressed hero assets. |
| UI primitives | **Radix UI** + **shadcn/ui** (optional) | Accessible dialogs, navigation menus, tooltips without reinventing patterns. |
| Fonts | **`next/font`** (variable fonts where possible) | Zero layout shift; subset weights you use. |
| Analytics | **Vercel Analytics** / **Plausible** / **Fathom** | Lightweight; respect privacy expectations for a personal brand site. |
| Hosting | **Vercel** (native Next) or **Netlify** | Preview deployments per branch help review case study drafts. |

**Performance & UX norms (2025–2026):**

- Prefer **Server Components** for grids and typography; reserve **client** boundaries for nav state, theme toggle, and motion.
- Use **`loading.tsx` / Suspense** for heavy case study media.
- Target **Core Web Vitals**: LCP from optimized hero image/video poster; CLS from explicit media dimensions.
- **Reduced motion**: respect `prefers-reduced-motion` when using Motion.

**What you are *not* replicating:** Framer’s visual editor and hosting. You gain **version-controlled content**, **custom logic** (forms, experiments), and **full control over HTML semantics** for accessibility and SEO.

---

## 3. Practical migration plan

### Phase A — Inventory & export (1–2 focused sessions)

1. **URL list:** Crawl or manually list every `/work/*`, `/journal/*`, `/about`, `/cv`, and static assets you must preserve.
2. **Content:** Copy case study copy into Markdown/MDX drafts (or export from Framer if an export path exists). **Screenshots / Figma exports:** collect highest-resolution sources, not only what Framer serves.
3. **Showreel:** Source file or best-quality encode; decide **hosted video** (Mux/YouTube unlisted/Cloudinary) vs. large self-hosted file (generally avoid for first byte).
4. **Redirects:** Document old → new URL map for `next.config` `redirects` (permanent 308 for SEO where paths change).

### Phase B — Next.js scaffold

1. `create-next-app` with TypeScript, Tailwind, ESLint, App Router, `src/` optional.
2. Add **MDX** pipeline and a **content folder** (`content/work/`, `content/journal/`) with a shared **frontmatter schema** (title, client, role, tags, cover image, order, `draft`).
3. Implement **layout shell:** header nav (work, about, notes link-out, archive), footer with socials; match IA to current site where intentional.
4. **Design tokens** in Tailwind (`theme.extend`) for colors/type scale; dark mode if desired (`next-themes`).

### Phase C — Page parity

1. **Home:** Hero + work grid consuming typed content index; CTA to resume and showreel.
2. **Dynamic routes:** `app/work/[slug]/page.tsx`, `app/journal/[slug]/page.tsx` driven by MDX + metadata.
3. **About / CV:** Static MDX or PDF link for resume if you keep PDF canonical.
4. **Motion pass:** Staggered grid entrance, subtle hover on cards; **one** signature transition (e.g. layout or shared element) — avoid competing animations.

### Phase D — Quality bar

1. **SEO:** Unique titles/descriptions per case study; Open Graph images; JSON-LD `Person` / `CreativeWork` where appropriate.
2. **a11y:** Landmarks, focus states, keyboard nav, contrast checks on custom backgrounds.
3. **Lighthouse / WebPageTest** on mobile; fix LCP and CLS regressions.
4. **DNS cutover:** Point apex domain to Vercel (or host of choice); keep Framer on a subdomain temporarily if you want a rollback window.

### Phase E — Decommission Framer (when stable)

1. Remove or archive Framer project after **301/308** redirects are verified.
2. Update external profiles if any URLs changed.

---

## 4. Risk checklist

| Risk | Mitigation |
|------|------------|
| URL breakage | `redirects` in `next.config.ts`; keep slug parity where possible |
| Media regression | Re-encode video; use `next/image` sizes for each layout |
| Content drift | Single source of truth in Git (MDX) or CMS with preview |
| Over-animation | Motion only on client islands; respect reduced motion |

---

## 5. Summary

**Today:** harshitbeni.com is a **Framer-built** designer portfolio with **work case studies, journal entries, about, resume, and external notes** — media-heavy and navigation-rich.

**Target:** **Next.js 15 + TypeScript + Tailwind + Motion**, MDX-backed case studies, optimized media, and **hosting with preview deploys**. Migration is **content export → typed MDX → page templates → redirects → DNS**, with performance and accessibility verified before turning off Framer.

This document is the canonical reference for scoping the rebuild in this repository.
