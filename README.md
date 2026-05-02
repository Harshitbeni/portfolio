# harshitbeni.com (Next.js rebuild)

Phase 1 implements the **homepage** with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion, aligned with [harshitbeni.com](https://harshitbeni.com).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Showreel

The live site uses a Vimeo embed inside the Showreel control. Set `NEXT_PUBLIC_VIMEO_SHOWREEL_ID` in `.env.local` (see `.env.example`) to enable the iframe in the modal.

## Scripts

| Command   | Description              |
| --------- | ------------------------ |
| `npm run dev` | Development server   |
| `npm run build` | Production build   |
| `npm run start` | Production server    |
| `npm run lint` | ESLint               |

See `RESEARCH_AND_MIGRATION.md` for broader migration notes.
