# Nordven ERP

Internal platform for running the studio: leads, projects, time tracking, invoicing, on-call rotation.

This app is reserved space. It is intentionally empty for now - we will scaffold it on the same conventions as `web/` (Next.js + Tailwind + Postgres + Drizzle) when we are ready to start. The decision to keep this folder in place is so that:

1. Routing, design tokens, and DB conventions are easy to share with `web/`.
2. CI workflows in `infra/` already know where ERP will live.
3. Railway can attach a service to this folder without restructuring the repo later.

## Planned stack

- Next.js (App Router) with route groups for `(auth)`, `(app)`, `(public)`
- Postgres (the same Railway instance, separate schema)
- NextAuth or Auth0 for SSO
- Drizzle ORM with schema split by domain (leads, projects, invoices)
- Background jobs via Inngest or Temporal once we have something async

## Status

Scope and first milestone are still being defined. See `infra/` for the deployment slot reserved for this app.
