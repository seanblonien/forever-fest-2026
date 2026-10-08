# Codex development and review setup

Use root `AGENTS.md` for everyday work and `scripts/rsvp-sync/AGENTS.md` for the
spreadsheet importer. This guide covers environment preparation; the dated
[research and assessment](research/codex-agent-enablement-2026-10-08.md) records
sources and verification results.

## Reproducible checkout

Use Node 24 from `.nvmrc` and the exact pnpm release in `package.json#packageManager`.
With Node installed, an environment administrator can install that pnpm release:

```bash
npm install --global "pnpm@$(node -p 'require("./package.json").packageManager.split("+")[0].slice(5)')"
pnpm agent:setup
pnpm validate
pnpm build
```

`agent:setup` is repeatable: frozen dependency install, matching Chromium, and Next
type generation. On Linux with system-package permissions, append `--with-deps`.
If a managed image already contains browser libraries, omit it and verify by running
the smoke suite. A failed OS-library install or substituted system browser is not
proof that the pinned Playwright suite works.

`pnpm validate` is sequential and nonmutating to source: lint, generated route types
and TypeScript, RSVP fixtures, then Chromium smoke tests. It writes ignored type/test
artifacts. `pnpm lint` intentionally applies fixes. Production build follows tests,
because concurrent Next dev/build/type generation can interfere through `.next`.
ESLint covers the website; the Apps Script VM harness is outside its typed project
and is validated by `pnpm test:rsvp` instead.

No app secrets, real guest exports, Google credentials, or Vercel tokens are required.
The existing smoke suite checks seven routes and headings, not external RSVP submission
or the deployed Google Sheet. Keep those distinctions in completion reports.

## Current Codex Cloud: web, mobile, desktop

Open **Settings → Codex Cloud → Environments** and create/select the environment for
`seanblonien/forever-fest-2026`. Keep **Who can use → Only me**. Ask setup to use the
runtime and commands above, and review its actual test output before **Publish**.
Saving a draft does not publish a usable prepared filesystem.

Use the install script to install the pinned package manager and run `pnpm agent:setup`.
Use the start skill to read `AGENTS.md`, check the selected task checkout's manifest
against installed dependencies, and refresh with frozen install when it changes.
Cloud repository refresh does not automatically rerun installation. Keep shell PATH
and any browser/cache paths consistent between installation and task startup.

For interactive work, start `pnpm dev --hostname 0.0.0.0` only when a cloud preview
requires it; otherwise use loopback. Check server readiness before testing. Playwright
owns port 3001 itself. Run the same validation/build commands from the checkout root.

After publishing, select the environment through **Work in → Cloud** (mobile: Codex),
start a task, and verify setup/checks there. Existing tasks keep their own filesystem;
republish and start a fresh task when changing the reusable setup. Repository guidance
travels with Git; personal skills on this laptop do not automatically sync.

## Legacy environments for GitHub integration

Current published environments and **Legacy Codex Cloud** are separate. The legacy
environment controls GitHub/Code Review integrations. If configuring one, choose Node
24 and use the following after this PR is merged:

```bash
# Setup (after installing the pinned pnpm release)
pnpm agent:setup --with-deps
```

For cached-container maintenance, use `pnpm agent:setup` to refresh dependencies,
Chromium and types after checkout. Configure persistent environment values in the
environment UI; setup-shell exports do not persist to the agent phase. Reset caches
when incompatible dependencies remain. Do not assume a current Cloud environment
changes the legacy integration's configuration.

## Network requirements

Start with the package-manager preset. Add only required hosts:

- `fonts.googleapis.com`, `fonts.gstatic.com`: real `next/font/google` compilation.
- `cdn.playwright.dev`, `playwright.download.prss.microsoft.com`,
  `storage.googleapis.com`: Playwright/Chrome download and redirect hosts.
- `nodejs.org`: when runtime installation needs the upstream Node download.

Apply/save the policy before retrying. Verify actual requests and commands; a saved
allowlist is not a connectivity test. Keep TLS verification and lockfile integrity
checks enabled. Report blocked downloads separately from application failures.

## Desktop setup and optional runtime inspection

`.codex/environments/environment.toml` shares worktree setup and pnpm terminal actions.
It assumes Node/pnpm are installed on the connected computer; Linux may need browser
OS packages first. The configuration does not provision Cloud. Changes to these local
actions can be managed through the desktop environment editor.

Next.js already ships version-matched documentation in `node_modules/next/dist/docs/`
and a development MCP endpoint at `/_next/mcp`. Read `01-app/02-guides/mcp.md` there
when enabling runtime inspection. An optional `next-devtools-mcp` connection can help
inspect routes/errors; it is not required for checkout, CI, or hosted reviews. Host
MCP configuration is separate from cloud settings. No model, permission, credential,
or experimental-feature overrides are committed for individual Codex clients.

## GitHub review and verification

Repository Code Review settings should enable **All PRs → On PR open**; use
`@codex review` on an existing PR or after fixes. Keep paid-credit overages off if
reviews must stay within the subscription allowance. Applicable `AGENTS.md` files
provide review rules; current Codex docs describe GitHub findings as P0/P1-focused.

The `Validate` workflow runs on PRs and main pushes with read-only repository permission,
pinned actions, no application secrets, and retained failure diagnostics. It is a
deterministic companion to the reviewer, not a second API-billed AI review workflow.
Branch-protection requirements are separate GitHub settings; adding a workflow does
not automatically make its status check required.
