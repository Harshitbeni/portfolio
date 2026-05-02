# harshitbeni.com (Next.js rebuild)

Phase 1 implements the **homepage** with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion, aligned with [harshitbeni.com](https://harshitbeni.com).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Showreel

The Showreel button opens a modal with Vimeo video [848991756](https://vimeo.com/848991756) by default. To point at another video, set `NEXT_PUBLIC_VIMEO_SHOWREEL_ID` in `.env.local` (see `.env.example`).

## Scripts

| Command   | Description              |
| --------- | ------------------------ |
| `npm run dev` | Development server   |
| `npm run build` | Production build   |
| `npm run start` | Production server    |
| `npm run lint` | ESLint               |

## Deploy on Vercel

Deployment must be finished in **your** Vercel account (OAuth and repo access cannot be done from this codebase).

1. **GitHub:** Confirm the latest code is on GitHub (`main`), e.g. repo `Harshitbeni/portfolio`.
2. **Vercel:** Sign up or log in at [vercel.com](https://vercel.com), preferably with **Continue with GitHub**.
3. **Authorize:** Allow Vercel to access the GitHub account/org that owns the repo.
4. **Import:** Dashboard → **Add New…** → **Project** → **Import** this repository.
5. **Preset:** Vercel should detect **Next.js**. Defaults are usually fine:
   - **Root directory:** `.` (repository root)
   - **Build command:** `npm run build` (or leave default)
   - **Install command:** `npm install`
   - **Output:** handled automatically for Next.js
6. **Environment variables (optional):**
   - `NEXT_PUBLIC_VIMEO_SHOWREEL_ID` — only if you override the built-in Showreel ID (see `.env.example`).
   - Add under **Environment Variables**, then redeploy if you change them later.
7. **Deploy:** Click **Deploy**. Production URL appears when the build finishes (`*.vercel.app`).
8. **Branches:** Every push to `main` updates **Production**. Other branches / pull requests get **Preview** deployments with unique URLs (when enabled for the project).
9. **Custom domain (later):** Project → **Settings** → **Domains** — add `harshitbeni.com` and follow DNS instructions when you are ready to cut over.

No `vercel.json` is required for a standard Next.js App Router app; the platform runs `next build` and serves the result.

See `RESEARCH_AND_MIGRATION.md` for broader migration notes.
