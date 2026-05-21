# Nordven Web

The public marketing site for Nordven.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- `next-intl` for English (default) and Spanish
- Drizzle ORM + Postgres for contact-form leads
- Zod for environment and request validation

## Develop

```bash
cd web
npm install
cp .env.example .env.local   # fill in DATABASE_URL once you have one
npm run dev
```

Visit `http://localhost:3000`.

## Scripts

| Script              | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Local dev server                         |
| `npm run build`     | Production build                         |
| `npm run start`     | Run the production build                 |
| `npm run lint`      | ESLint                                   |
| `npm run typecheck` | TypeScript                               |
| `npm run db:generate` | Generate Drizzle migrations            |
| `npm run db:migrate`  | Apply migrations to `DATABASE_URL`     |
| `npm run db:studio`   | Open Drizzle Studio                    |

## Project layout

```
src/
├── app/                Next.js App Router (with [locale] segment)
├── components/         UI primitives, layout, and section blocks
├── content/            Site config, services, navigation - no inline strings in components
├── messages/           en.json and es.json - all visible copy
├── i18n/               next-intl routing, navigation, request config
├── db/                 Drizzle schema and client
└── lib/                Typed env, class-name helper
```

## Conventions

- All visible text comes from `src/messages/{locale}.json` - never inlined in JSX.
- Service definitions and navigation come from `src/content/*` - never inlined.
- Env vars are read through `src/lib/env.ts` (Zod-validated) - never `process.env.X` directly.
- Design tokens live in `src/app/globals.css` under `@theme`.
