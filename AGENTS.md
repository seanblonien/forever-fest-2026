# Forever Fest 2026

Sean & Eva's public wedding site: Next.js App Router, React, strict TypeScript,
Tailwind v4, and Vercel. `package.json` and `pnpm-lock.yaml` define exact tooling.
The Google Apps Script RSVP importer is a separate application under `scripts/rsvp-sync/`.

## Checkout and verification

Run commands from the repository root. Use Node 24 (`.nvmrc`) and the exact pnpm
version in `package.json#packageManager`; keep installs frozen to the lockfile.

- Fresh checkout: `pnpm agent:setup` installs dependencies, Chromium, and Next types.
  On a fresh Linux cloud/CI machine, use `pnpm agent:setup --with-deps` to install
  Chromium's OS libraries too (requires system-package privileges).
- Develop: `pnpm dev`. Playwright starts its own server on `127.0.0.1:3001`.
- Check without rewriting files: `pnpm lint:check`, `pnpm typecheck`.
  `pnpm lint` is the explicit auto-fix command; inspect its diff.
- UI changes: `pnpm validate` runs lint, generated types/TypeScript, RSVP fixtures,
  then all seven Chromium route smoke tests. Also inspect the affected UI at mobile
  and desktop sizes: smoke tests cover navigation/headings, not every interaction.
- Runtime/dependency/config changes: also run `pnpm build` after validation.
  Keep build and dev/tests sequential: they share generated `.next` artifacts.
- RSVP importer changes: read `scripts/rsvp-sync/AGENTS.md`; run `pnpm test:rsvp`.
- Docs-only changes: verify instructions/links and `git diff --check`; app tests
  are needed when the documented workflow itself changes.

No secrets are needed to develop or test the site. `next/font/google` downloads
fonts during compilation; a blocked network is not a successful build.
For cloud setup, cache refresh, network hosts, and local Codex actions, read
[docs/codex.md](docs/codex.md) when preparing a new agent environment.

## Where changes belong

- `app/`: routes, layout, metadata, and page-local components; home lives in `app/(home)/`.
- `lib/scheduleData.ts`: shared event details; `lib/faqData.ts`: FAQ content.
  Calendar links also encode event times in `components/shared/calendar-embed-content.tsx`.
- `components/shared/`: navigation, calendar, invitation, header/footer.
  `components/ui/`: shared UI primitives; `components/svgs/`: artwork.
- `hooks/`: browser state and lazy loading; `public/`: photos/static assets.
- `next.config.ts`: Jotform redirects, typed routes, React Compiler, asset headers.
- `tests/e2e/`: route smoke coverage. `scripts/rsvp-sync/`: bound spreadsheet tool,
  not a website backend and not deployed with Next.js.

## Implementation

Use Server Components by default; client boundaries are for interactivity/browser APIs.
Reuse existing components, `cn()` and metadata helpers in `lib/`. Preserve semantic HTML,
keyboard/focus behavior and reduced-motion handling. Use static `next/image` imports for
local images where practical. React Compiler is enabled; introduce manual memoization
only with evidence. Follow the existing Tailwind tokens and CSS font variables.

Use `type` for shapes and `import type`; keep strict types. Let ESLint own mechanical
formatting/import ordering. Modify generated output through its source; `.next`,
`next-env.d.ts`, reports and caches stay untracked. Keep the managed Next.js block below.

## Code Review Rules

- Event edits must keep shared schedule data, calendar exports, FAQs and invitation
  surfaces consistent where they describe the same event. Preserve explicit attendance
  scope and America/Chicago calendar times; flag changes that send guests to the wrong
  place/time or invite the wrong audience, not harmless wording differences.
- Preserve working `/rsvp-form` and `/address` redirects and safe external-link behavior.
  Review changes to navigation, hydration/client boundaries and keyboard interaction
  for concrete guest-facing regressions; explain the affected flow and trigger.
- Keep private guest records and credentials out of public assets, client bundles, logs
  and fixtures. The website links to Jotform; live spreadsheet mutations belong to the
  separately authorized Apps Script workflow and its nested review rules.

## Completion

Preserve unrelated work. Report the behavior changed, checks actually run and outcomes,
plus remaining failures or coverage limits. A local fixture test is not a live integration
check. Scope publishing, live guest-data changes and other external effects to the user's
explicit task; ordinary development/test setup needs no production credentials.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
