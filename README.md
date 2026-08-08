# devos-portfolio

Personal portfolio site for Renatus Cartesius.

Built with the DevOS pipeline. All product and design decisions are locked in the approved Master Design Plan (`projects/portfolio-v1/` in the DevOS repository).

## Stack

- **Next.js** (App Router) + TypeScript (strict)
- **Inter** via `next/font`
- **Tailwind CSS** v4 + design tokens from Visual Blueprint v0.2
- **Content**: file-based Markdown / MDX (coming in WP-02)
- **Hosting**: Vercel
- **Contact**: Formspree + visible email CTA

## Project structure

```
devos-portfolio/
├── content/                 # Markdown / MDX content (projects, pages)
│   └── projects/
├── public/
│   └── images/              # Static media
├── src/
│   ├── app/                 # App Router pages & layouts
│   ├── components/          # Shared UI components
│   ├── lib/                 # Utilities, content loaders
│   └── types/               # Shared TypeScript types
├── package.json
└── ...
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Work packages

Implementation follows `implementation.md` in the DevOS portfolio-v1 package.

- **WP-01** (this) — Scaffolding
- WP-02 — Content model + placeholders
- WP-03 — Design tokens & global styles (foundation already present)
- WP-04 → WP-08 + WP-12 — First usable version

## Design tokens

See `src/app/globals.css` and the Visual Blueprint. Key values:

- Background `#FAFAFA`, surface `#FFFFFF`, foreground `#0A0A0A`
- Accent `#1E3A5F`
- Typography: Inter only
- Radius: 4–8 px
- Motion: short CSS transitions, respects `prefers-reduced-motion`
