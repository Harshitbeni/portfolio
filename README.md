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

See `RESEARCH_AND_MIGRATION.md` for broader migration notes.
