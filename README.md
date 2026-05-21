# Nordven

The Nordven ecosystem - one repository, three apps that share infrastructure and conventions.

```
nordven/
├── web/      Marketing site (Next.js, public)
├── erp/      Internal ERP platform
└── infra/    Shared infrastructure, CI, and deployment configuration
```

## Apps

| App     | Stack                              | Purpose                                                  |
| ------- | ---------------------------------- | -------------------------------------------------------- |
| `web`   | Next.js, Tailwind, Postgres (EN/ES) | Public marketing site for Nordven                        |
| `erp`   | Reserved for the internal ERP      | Operations, CRM, and project management for the studio   |
| `infra` | Railway, Terraform, GitHub Actions | Deployment configs, CI workflows, environment provisioning |

Each app is independently buildable and deployable. They are kept in one repo so they can share conventions, types, and operational tooling.

## Local development

Each app has its own `README.md` with setup instructions:

- [web/README.md](./web/README.md)
- [erp/README.md](./erp/README.md)
- [infra/README.md](./infra/README.md)

## Conventions

- **Languages:** All user-facing surfaces ship in English (default) and Spanish.
- **Code style:** TypeScript strict mode, ESLint, no hardcoded copy or config inside components.
- **Tokens:** Design tokens live in `web/src/app/globals.css`; ERP will inherit them.
- **Database:** Postgres (Railway) is the default persistence layer across apps.
