# Forever Fest 2026

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/sean-bloniens-projects/forever-fest-2026)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev)

Sean & Eva's wedding website for Forever Fest 2026, featuring RSVP functionality, travel information, our story, and more.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Radix UI for accessible components
- Tailwind CSS
- ESLint
- Vercel Analytics & Speed Insights
- Deployed on Vercel

## Development

```sh
# Use Node 24 (.nvmrc) and the pnpm version pinned in package.json.
# Install dependencies, Chromium, and generated Next.js types
pnpm agent:setup

# Run development server
pnpm dev

# Run checks without changing source files
pnpm validate

# Explicitly fix lint/formatting
pnpm lint

# Verify production compilation
pnpm build
```

Fresh Linux machines may need `pnpm agent:setup --with-deps` for Chromium's system
libraries. No application secrets are needed. Builds require access to Google Fonts.

## Working with agents

[AGENTS.md](AGENTS.md) contains implementation guidance and Codex review rules.
[Codex setup](docs/codex.md) covers cloud environments, desktop worktrees, network
requirements, and verification. GitHub PRs run the same validation plus a production
build through [Validate](.github/workflows/validate.yml).

The [RSVP CSV importer](scripts/rsvp-sync/README.md) is a separate Google Apps Script
application. `pnpm test:rsvp` uses synthetic local fixtures; it does not update the
live spreadsheet.
