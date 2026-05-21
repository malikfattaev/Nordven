# Nordven Web

The public marketing site for Nordven.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- `next-intl` for English (default) and Spanish
- Zod for environment and request validation
- No database. Contact-form leads are forwarded to a configurable webhook (`CONTACT_WEBHOOK_URL`) - typically the ERP's ingestion endpoint. The marketing site does not own lead data.

## Develop

```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```

Visit `http://localhost:3000`.

## Scripts

| Script              | Purpose                  |
| ------------------- | ------------------------ |
| `npm run dev`       | Local dev server         |
| `npm run build`     | Production build         |
| `npm run start`     | Run the production build |
| `npm run lint`      | ESLint                   |
| `npm run typecheck` | TypeScript               |

## Project layout

```
src/
├── app/                Next.js App Router (with [locale] segment)
├── components/         UI primitives, layout, and section blocks
├── content/            Site config, services, navigation - no inline strings in components
├── messages/           en.json and es.json - all visible copy
├── i18n/               next-intl routing, navigation, request config
└── lib/                Typed env, class-name helper, lead delivery
```

## Conventions

- All visible text comes from `src/messages/{locale}.json` - never inlined in JSX.
- Service definitions and navigation come from `src/content/*` - never inlined.
- Env vars are read through `src/lib/env.ts` (Zod-validated) - never `process.env.X` directly.
- Design tokens live in `src/app/globals.css` under `@theme`.
- Persistence belongs to the ERP, not to this app. See `src/lib/leads.ts` for the delivery boundary.
