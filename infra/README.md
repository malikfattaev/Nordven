# Nordven Infra

Deployment, environment provisioning, and CI configuration for the Nordven ecosystem.

## What lives here

```
infra/
├── railway/        Per-service Railway configs (web, erp)
├── github/         Reusable workflow snippets (mirrored into .github/workflows)
└── terraform/      Reserved for cloud-side resources (DNS, secrets, observability)
```

## Production hosting

- **Railway** (project `nordven`, team `NORDVEN`):
  - `web` service - serves [nordven.com](https://nordven.com)
  - `erp` service - reserved slot, attached when the ERP starts shipping
  - Postgres database - shared across web (leads) and erp (operations)

## Workflows

GitHub Actions workflows under `.github/workflows/` at the repo root handle:

- `ci.yml` - typecheck and lint each app on every push
- `deploy-web.yml` - deploy `web/` to Railway on push to `main`

Workflow definitions in `infra/github/` are the source of truth and are kept in sync with `.github/workflows/`.

## Local environment

No tooling needs to be installed to read this folder. To use the Railway CLI:

```bash
brew install railway
railway login
railway link        # link the working directory to the nordven project
```
