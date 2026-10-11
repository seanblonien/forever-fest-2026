# Wedding chatbot implementation handoff

Status: phases A–F complete. Implementation, protected preview, live evaluation and real midnight quota reset verified. Production launch remains pending explicit user review.

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
| B: content/contracts/sessions/limits | Complete | 47 browserless tests; public content extraction; real Redis near-cap concurrency test passed |
| C: endpoint/UI/tab history | Complete | Desktop/mobile streamed UI, Stop/Clear/history restoration and safe errors verified with mocked provider |
| D: local regression checks | Complete | `pnpm validate`: RSVP fixtures, 47 chat contracts, 20 Chromium route/chat tests (one future shutdown case conditionally skipped); `pnpm build` passed; desktop/mobile inspected |
| E: services/live preview/evaluation | Complete | Both services work; 26/26 live cases passed; actual Redis concurrency, deployed 429/403/503, WAF denial/cooldown, real midnight reset and final-revision stream verified |
| F: production-review handoff | Complete | Protected final preview and exact SHA below; [live evaluation](live-evaluation.md), [operations](operations.md); draft PR prepared for review |


## Known setup state

- OpenAI project: Forever Fest 2026 Chatbot, `proj_hoZoaMZtHBVhJjXfhSOBpVVf`. Funded organization; auto-reload off. Enforced $5 monthly project limit, alerts at $4/$5, reloaded and verified. User created restricted Responses key with nine-day expiry and entered it privately.
- Upstash: `forever-fest-2026-chat`, Free ($0/month), primary AWS N. Virginia, no read replicas, eviction off. Real atomic quota script tested using isolated ten-minute synthetic keys.
- Vercel: `forever-fest-2026`, project `prj_GWi06pByklfqEATa40zYkrcGTry4`, team `team_Xb87Amsj3mC6w7GxQr9m53cS`, Hobby. Existing preview authentication retained. No existing custom firewall config/drafts; added and verified one included rule `Wedding chat burst limit` for exact `/api/chat`, 30/IP/600 seconds. No paid upgrade.
- Credentials remain in ignored `.env.local`; eight variables saved only for `codex/wedding-chatbot` in Preview, with provider key/Redis token/cookie secret marked Secret. Production credentials/enablement remain pending explicit review.
- Next.js 16.3.0 / React 19.2.8, Node 24, pnpm 11.20.0. AI SDK 7/provider 4 installed-version contracts verified.

## Ready-to-use new-chat prompt

Implement the wedding FAQ chatbot described in `docs/plans/wedding-chatbot/implementation-plan.md`. Begin with `docs/plans/wedding-chatbot/HANDOFF.md` and repository `AGENTS.md`. Work in this checkout, where the planning documents have been restored. Inspect the current branch/revision/status, preserve the documents and unrelated work, reconcile the plan with current code, and create an available `codex/` feature branch. Deliver the tested implementation and a live Vercel preview, helping set up missing OpenAI/Upstash resources within the recorded limits. Keep production launch for my review. Use the user-prompt control for consequential scope/setup questions, one at a time; do not reopen confirmed choices or ask for secrets in chat. Continue independently with mocked development/tests while access-dependent work waits. Update HANDOFF with evidence and remaining work; a mocked test or saved setting is not a live integration check. Do not merge or promote to production.

## Resume record

Implementation branch: `codex/wedding-chatbot`.

Implementation commit: `9f75996c590b1461cd3a67d05dd17d17f34e6d36`. Original evaluated endpoint SHA: `bc14390e446f2d5928ca2e7aed7e2627b18a2718`; endpoint/facts unchanged in final commit.

Preview URL: [FAQ chat](https://forever-fest-2026-mgwytu7lv-sean-bloniens-projects.vercel.app/faqs), deployment `dpl_CCcnoSwQnb9kZyW3P42ZcTSfcQ3r`, READY with verified Git metadata SHA `9f75996c590b1461cd3a67d05dd17d17f34e6d36` and target Preview. Authentication retained.

Implementation continued in the current local chat.

Last verified checks: full local validation/build, real primary-Redis atomic concurrency, protected model/UI stream, 26 public evaluations, real quota denial/foreign-origin/disabled responses, actual iCal export. See [live-evaluation.md](live-evaluation.md) and [operations.md](operations.md). No live RSVP/guest-data mutations.

Next action: user reviews the protected preview and draft PR, then decides whether to launch. Merging, production credential/flag setup and promotion remain pending explicit user review. Enable/disable steps are in [operations.md](operations.md). Implementation is complete; the production decision is not a remaining engineering gate.


## Completion evidence and limits

- All 26 live public cases passed with 84,654 input / 1,128 output tokens. Conservative pass estimate $0.01115; all evaluation and smoke probes stayed below $0.014. All answers streamed incrementally and completed normally; no wrong venue/time/attendance/cost or invented invitation status was found in this finite pass.
- Actual Dallas midnight: exhausted prior-day session stayed 20; new session/day became 1; shared lifetime counter increased 27 to 28 on the final revision. Quotas were not cleared or namespaces changed.
- `pnpm validate` passed with 47 chat tests and 20 Chromium tests plus RSVP fixtures, with the future shutdown case conditionally skipped; `pnpm build` passed afterward. Existing lint warnings and a pre-existing welcome-party-image eager-loading advisory do not fail validation.
- Actual downloaded iCal export retained America/Chicago, October 17 6–11 PM, DEC on Dragon and published cost distinctions. RSVP/address redirects and FAQ filters/anchors were verified without external form submission.
- Deterministic cutoff tests verify zero provider calls at/after the future shutdown; the actual October 19 shutdown date has not occurred. This is test evidence, not a future-date live claim.
- OpenAI model answers are nondeterministic; the finite evaluation does not guarantee every future answer. Fixed website references and the visible AI notice remain available.
- Production deployment remained `dpl_7QD75pFhowcGx6vib9n2TrYvsDSH`, and production chat variables remain unset. The only project-wide change was the expressly planned supplemental firewall rule, scoped to `/api/chat`.
- Latest implementation commit above is the exact deployed application revision. The later handoff/evaluation and lifecycle-test commits change documentation/tests only; deployed application files remain identical.

Draft pull request: [#7 — Add bounded wedding FAQ chatbot](https://github.com/seanblonien/forever-fest-2026/pull/7). The initial PR validation run passed on documentation SHA `72cee978f4958f9026b28dc50dec911fd6a3471a`; the final test-only lifecycle revision triggers the same CI checks. Interactive browser cases stop after the fixed cutoff, and the unavailable-panel browser check then activates, keeping future site validation usable.
