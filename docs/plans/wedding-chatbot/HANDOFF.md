# Wedding chatbot implementation handoff

Status: implementation complete locally; local verification and live preview evaluation in progress. Production launch remains pending review.

## Start here

1. Read this file, repository `AGENTS.md`, and [implementation-plan.md](implementation-plan.md).
2. Work in the checkout containing these restored documents. The intended destination is `/Users/seanblonien/git/forever-fest-2026`, with the user restoring them on `main`. Verify the actual working directory, branch, revision, and status before acting; do not switch back to the old planning worktree.
3. Preserve the restored research/plan documents and unrelated work. The research inspected commit `ba4be0feee1bb45d25a1245ee4cbeb438ebbf581`; the destination may be newer or different. Reconcile the file map and public wedding facts with the current checkout instead of resetting it to that historical revision.
4. When dispatched for implementation, create an available `codex/` feature branch from the verified destination checkout, follow the phase gates, and update the table below as evidence is collected. This handoff is self-contained; the research chat history is not required.

## Scope and authority

The implementation plan is authoritative for confirmed requirements and proposed engineering defaults. The user has requested a working implementation plus a live preview, setup help for missing services, initial $5 OpenAI monthly hard cap, Upstash free tier, the specified request limits, and automatic shutdown at October 19 midnight Dallas time. Production launch remains for user review. Implementation and service setup are recorded below.

Use the user-prompt control for consequential questions, one at a time. Continue independent development when login/payment/secret entry needs the user. Do not ask the user to repeat decisions recorded in the plan. Never put credentials in messages, this file, commits or logs.

## Phase status

| Phase | State | Evidence / next step |
| --- | --- | --- |
| A: checkout/tooling/content inventory | Complete | Destination main `ca0aba04cc0ddd274f92be03d045c7deb3a93c33`; feature branch `codex/wedding-chatbot`; pinned dependencies installed |
| B: content/contracts/sessions/limits | Complete | 45 browserless tests; public content extraction; real Redis near-cap concurrency test passed |
| C: endpoint/UI/tab history | Complete | Desktop/mobile streamed UI, Stop/Clear/history restoration and safe errors verified with mocked provider |
| D: local regression checks | In progress | Full validation and production build pending final results |
| E: services/live preview/evaluation | In progress | Dedicated OpenAI project funded with enforced $5 monthly cap; Upstash free database; preview deployment/evaluation pending |
| F: production-review handoff | In progress | Operations guide prepared; final URL/revision/evaluation pending |


## Known setup state

- OpenAI project: Forever Fest 2026 Chatbot, `proj_hoZoaMZtHBVhJjXfhSOBpVVf`. Funded organization; auto-reload off. Enforced $5 monthly project limit, alerts at $4/$5, reloaded and verified. User created restricted Responses key with nine-day expiry and entered it privately.
- Upstash: `forever-fest-2026-chat`, Free ($0/month), primary AWS N. Virginia, no read replicas, eviction off. Real atomic quota script tested using isolated ten-minute synthetic keys.
- Vercel: `forever-fest-2026`, project `prj_GWi06pByklfqEATa40zYkrcGTry4`, team `team_Xb87Amsj3mC6w7GxQr9m53cS`, Hobby. Existing preview authentication retained. No existing custom firewall config/drafts; added and verified one included rule `Wedding chat burst limit` for exact `/api/chat`, 30/IP/600 seconds. No paid upgrade.
- Credentials remain in ignored `.env.local`; feature-branch preview setup pending branch registration. Production credentials/enablement remain pending explicit review.
- Next.js 16.3.0 / React 19.2.8, Node 24, pnpm 11.20.0. AI SDK 7/provider 4 installed-version contracts verified.

## Ready-to-use new-chat prompt

Implement the wedding FAQ chatbot described in `docs/plans/wedding-chatbot/implementation-plan.md`. Begin with `docs/plans/wedding-chatbot/HANDOFF.md` and repository `AGENTS.md`. Work in this checkout, where the planning documents have been restored. Inspect the current branch/revision/status, preserve the documents and unrelated work, reconcile the plan with current code, and create an available `codex/` feature branch. Deliver the tested implementation and a live Vercel preview, helping set up missing OpenAI/Upstash resources within the recorded limits. Keep production launch for my review. Use the user-prompt control for consequential scope/setup questions, one at a time; do not reopen confirmed choices or ask for secrets in chat. Continue independently with mocked development/tests while access-dependent work waits. Update HANDOFF with evidence and remaining work; a mocked test or saved setting is not a live integration check. Do not merge or promote to production.

## Resume record

Implementation branch: `codex/wedding-chatbot`.

Implementation commit: pending.

Preview URL and verified revision: pending.

Implementation continued in the current local chat.

Last verified checks: planning-only documentation/links and package metadata; app tests not run in planning.

Next action: finish validation/build, deploy protected feature-branch preview, evaluate the 26 public cases, and record final evidence. See [operations.md](operations.md).
