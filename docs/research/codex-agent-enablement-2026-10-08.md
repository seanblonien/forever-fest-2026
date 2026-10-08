# Codex agent enablement research and assessment

Researched October 8, 2026 for `seanblonien/forever-fest-2026`. Goal: make fresh checkouts reproducible and give Codex useful implementation/review context, with verified hosted execution. This document separates product documentation, repository recommendations, and observed results. It is not persistent agent instruction.

## Findings from current official documentation

| Area | Documented behavior | Repository decision |
| --- | --- | --- |
| Instruction discovery | Codex reads global guidance and project guidance from root toward the working directory, preferring `AGENTS.override.md` over `AGENTS.md` at each level. The default combined project limit is 32 KiB. Discovery happens at session startup. [Instruction discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | Keep a compact root `AGENTS.md`; scope RSVP spreadsheet rules to `scripts/rsvp-sync/AGENTS.md`. Verify fresh-session loading separately from document correctness. |
| GitHub review | Add `## Code Review Rules` to applicable root/scoped guides. OpenAI recommends two or three consequential, durable checks with safe paths or exceptions; mechanical checks belong in CI. The current docs say GitHub review flags P0/P1 issues. `@codex review` requests a review; other task mentions can start a legacy cloud chat. [GitHub integration](https://learn.chatgpt.com/docs/third-party/github) | Focus on broken guest journeys, date/time correctness, and RSVP data integrity. Do not inflate severity to force cosmetic findings. An enabled switch is not evidence that a review completed. |
| Shared configuration | Project `.codex/config.toml` loads only for trusted projects. CLI flags override project settings; project settings override user defaults. Untrusted project hooks and rules are skipped. [Configuration](https://learn.chatgpt.com/docs/config-file/config-basic) | Avoid pinning personal models, reasoning budgets, permissions, or experimental flags. Add shared settings only for a demonstrated repository need. Do not assume this file configures hosted GitHub review. |
| Tool connections | Desktop, CLI, and IDE can share host MCP configuration; trusted projects can define project-scoped servers. An optional server need not block startup. [MCP](https://learn.chatgpt.com/docs/extend/mcp) | Optional framework tooling can help local debugging, but require verification before adding it. No extra GitHub MCP or paid API workflow is required merely to use the native review integration. |
| Local worktree setup | Desktop local environments define automatic worktree setup and reusable terminal actions, stored under `.codex`; the app generates the configuration for sharing in Git. [Local environments](https://learn.chatgpt.com/docs/environments/local-environment) | Share dependency setup and useful pnpm actions through the supported UI. A worktree setup file does not provision a cloud environment. |
| Worktree continuity | Worktrees isolate checkout files but run on the connected computer. `.worktreeinclude` can copy ignored files into local managed worktrees, not remote or manually created worktrees. [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees) | The public website needs no private environment values, so do not copy local secrets or `node_modules` into new worktrees. Install from the lockfile. |

## Two cloud experiences must be verified separately

**Current Codex Cloud:** publish a prepared environment through **Work in → Cloud** or **Settings → Codex Cloud → Environments**. It supports web/mobile/desktop continuation while the local computer sleeps. Its reusable setup has an install script and start skill. Saving configuration and publishing the prepared filesystem are separate operations. Repository refresh preserves caches without rerunning install/start commands, so dependency changes need a deliberate refresh. Test a new task after publishing. Repository skills are available; personal local skills do not sync. Current documentation lists computer/browser use as unsupported; executable repository tests need their own validation. [Current cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environments)

**Codex Cloud (Legacy):** still serves Code Review and GitHub/Linear integrations. It checks out a task branch, runs setup, and optionally runs maintenance when resuming cached containers. Setup has internet access; agent internet access is separately configured. Setup shell exports do not persist into the agent phase. Secrets are setup-only. Cache invalidation follows configuration changes; incompatible repository changes can require resetting the cache. [Legacy environments](https://learn.chatgpt.com/docs/environments/cloud-environment)

**Project-specific setup recommendation:** use Node 24+, the exact `packageManager` pnpm version, `pnpm install --frozen-lockfile`, and the lockfile-matched Playwright Chromium installation. On Linux, install Chromium system dependencies as needed. Confirm typed-route generation on a fresh checkout before plain `tsc`. Use the repository's CI checks as the acceptance test. Keep the environment private and without application secrets. Allow only hosts actually required by package/runtime/browser installation and font downloads; test those requests rather than treating an allowlist as proof of connectivity.

This recommendation follows checked-in runtime declarations and tests. Observed hosted results are recorded separately below. The pre-existing legacy environment remains on automatic setup with agent internet off; its runtime picker only offered Node 18/20/22, so it was not changed to an untested Node 24 configuration. Native PR review execution was verified separately.

## Initial repository audit

Evidence read: `AGENTS.md`, `README.md`, `package.json`, `pnpm-lock.yaml` location, `next.config.ts`, `playwright.config.ts`, `tests/e2e/smoke.spec.ts`, `scripts/rsvp-sync/README.md`, and `.gitignore`.

- Root guidance says pnpm 10+, but `package.json` requires pnpm 11+ and pins 11.20.0. README says Next.js 15 and Framer Motion although the manifest uses Next.js 16 and contains no Framer Motion dependency.
- Existing lint uses `--fix`; review/CI needs an explicitly nonmutating lint command.
- The normal validation aggregate covers lint, TypeScript, and browser smoke tests, but omits the independent RSVP test suite.
- Playwright owns a development server at `127.0.0.1:3001`; its Chromium dependency is a separate fresh-checkout prerequisite. Smoke coverage confirms page navigation/headings, not full accessibility or live Jotform/Google service behavior.
- RSVP sync operates on a real bound Google Sheet. Preview/apply separation, stale-cell checks, invite eligibility, and narrow status writes are substantive review boundaries. Local tests do not authorize deployment or touching guest records.
- A locally present `.codex/environments/environment.toml` initially had empty setup and a `bun dev` action. Its existence did not establish that it was tracked or that cloud provisioning was configured.

## Acceptance standard and final assessment

Assessed the final local edits on October 8, 2026. The repository-agent-guide rubric evaluates the following ten criteria; these are derived review criteria, not an OpenAI certification. Evidence includes the updated root/scoped guides, README, `docs/codex.md`, `package.json`, `scripts/agent/setup.sh`, `.nvmrc`, ESLint configuration, desktop environment TOML, and GitHub validation workflow.

| Criterion | Status | Evidence or gap |
| --- | --- | --- |
| Placement and scope | Pass | Root `AGENTS.md` contains common guidance; `scripts/rsvp-sync/AGENTS.md` contains only the Apps Script-specific workflow and review rules. Fresh CLI instruction loading was verified separately below. |
| Project orientation | Pass | Updated map identifies home route groups, shared schedule/FAQ data, calendar time duplication, redirects, browser tests, and the separate spreadsheet application. |
| Reproducible workflow | Pass | Root-relative setup checks runtime/package-manager versions, installs frozen dependencies and Chromium, and generates Next types. Local setup and complete validation passed. A fresh hosted draft also passed setup, complete validation and build, as detailed below. |
| Runtime and dependencies | Pass | `.nvmrc` selects Node 24; setup reads exact pnpm from `package.json`; README corrects Next.js 16 and removes the absent Framer Motion claim. Linux browser library privileges are explicit. |
| Implementation conventions | Pass | Strict TypeScript, Tailwind, typed routes, React Compiler, framework-local documentation, and generated-file constraints match checked-in configuration. |
| Proportional verification | Pass | Commands distinguish documentation, UI, runtime/configuration, and RSVP work. Source-preserving lint is separate from auto-fix. Aggregate validation now includes RSVP fixtures and runs sequentially to avoid shared Next artifact races. |
| Honest completion | Pass | Root instructions require actual check outcomes and coverage limits; fixture checks, live integration, configured settings, and executed cloud/review tasks are explicitly distinguished. |
| State and external effects | Pass | Guides preserve unrelated work, exclude guest records/credentials from public output, and scope live script deployment and spreadsheet mutation to explicit task authorization. CI has read-only repository permission and no app secrets. |
| Concise and actionable writing | Pass | Generic component boilerplate is removed; core guidance has task-specific commands and domain invariants, with conditional pointers to longer setup instructions. |
| Maintainability | Pass | Manifest/lockfile own versions, root instructions own common rules, scoped instructions own RSVP rules, and detailed operational research stays outside the guides. |

### Verification evidence and limits

- The implementation run reported successful `pnpm agent:setup`, `pnpm validate` (nonmutating lint, Next type generation plus TypeScript, RSVP fixture tests, and all seven Chromium smoke tests), and `pnpm build`.
- The research review independently ran `git diff --check` and `bash -n scripts/agent/setup.sh`; both succeeded. Review found no substantive defects in the final local instruction/setup changes.
- The implementation corrected pre-existing fresh-checkout type generation failures and the typed ESLint project-service error for the standalone Apps Script Node VM harness. That harness is explicitly excluded from website typed lint and remains exercised by `pnpm test:rsvp`; fixture coverage is not equivalent to lint coverage.
- **Fresh-client instruction loading: verified.** An ephemeral read-only `codex-cli 0.154.0` session launched with `--ignore-user-config` from `scripts/rsvp-sync` correctly identified both applicable guides, setup, different UI/RSVP verification paths, and detailed preview/apply/matching invariants without reading files through tools. Its ephemeral response was inspected but is not committed.
- **Local desktop automatic setup trigger: unverified.** The corrected TOML parsed successfully and its underlying setup command passed, but the desktop UI did not allow an end-to-end worktree-creation check. The formerly ignored file is now tracked in the PR for sharing.
- **GitHub CI: verified on Linux.** [PR #5](https://github.com/seanblonien/forever-fest-2026/pull/5) triggered the [Validate run](https://github.com/seanblonien/forever-fest-2026/actions/runs/37733074182), which passed frozen setup, lint, types, RSVP fixtures, all seven pinned-Chromium smoke tests, and the production build at commit `c8b7ab6`. Vercel preview deployment also passed. This does not make the check required through branch protection.
- **Hosted Cloud: fresh execution verified.** The private `forever-fest-2026` environment uses Node 24.19.0 and exact pnpm 11.20.0, frozen install/start instructions, no secrets, and five browser/font domains. Initial setup received proxy HTTP 403 despite saved policy; publishing and creating a fresh draft applied the policy successfully. That fresh hosted instance checked out `c8b7ab6` and passed `pnpm agent:setup`, `pnpm validate` (including all seven actual pinned-Chromium tests), and `pnpm build`. Google Fonts CSS/binaries returned HTTP 200. Production startup and homepage/schedule/travel HTTP checks passed; the source tree remained clean. System Chromium was not substituted. The tested snapshot and corrected startup instructions were published. The UI then reported a chat-reconnection problem separately from successful publication; final UI recovery is recorded in the PR handoff.
- **GitHub Codex review: configuration and execution are separate.** The repository is enabled for All PRs / On PR open, with paid-credit overages off. Opening PR #5 automatically started the native Codex review at `c8b7ab6`, confirmed by its [review status comment](https://github.com/seanblonien/forever-fest-2026/pull/5#issuecomment-6053104065). The review completed with no posted findings; the review-comment API returned zero inline comments. This verifies integration execution, not reviewer accuracy on future changes.
- Real task effectiveness beyond the instruction-discovery check remains unverified. These improvements have not been benchmarked for reviewer recall, precision, or future task completion.

### Desk review of two task paths

1. **Change the RSVP link or event schedule — pass.** The root guide locates route/config, shared event constants and duplicated calendar values, directs UI validation and viewport inspection, and requires preserving approved times/audience. It acknowledges that route smoke tests do not establish timezone correctness or external-service behavior.
2. **Change CSV party matching — pass.** The root guide routes the agent to the scoped guide/README and `pnpm test:rsvp`; scoped instructions identify preview/apply separation, invitation-scoped matching, stale-cell/invite protections, synthetic fixtures, and explicit authorization for live deployment/data changes.

These are document desk reviews, not implementation of either hypothetical task. The desktop automatic setup trigger remains unverified. Actual CI, hosted checks and native review execution are recorded above; document assessment alone did not establish those results.

## Deliberately avoid unnecessary configuration

Do not add a second AI reviewer, API-billed Codex Action, automatic self-fixing workflow, duplicated instruction files, broad secret copying, or speculative hooks just to increase the number of AI-related files. The intended measurable improvement is a clean checkout that can install and verify the project, plus reviewers that receive the right domain constraints. Configuration should earn its place through those outcomes.
