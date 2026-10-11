# Wedding FAQ chatbot implementation plan

Plan date: October 10, 2026. Status: implementation-ready scope; code and services not implemented.

Start with [HANDOFF.md](HANDOFF.md) for checkout, authority, progress, and the next action. This file owns the implementation requirements. The [research report](../../research/wedding-faq-chatbot-2026-10-10.md) contains cost analysis and alternatives, not additional scope.

## 1. Confirmed decisions and delivery boundary

| Decision | Accepted requirement |
| --- | --- |
| Knowledge | Only information published on this wedding website |
| Chat | Text-only streaming replies using Vercel AI SDK and direct OpenAI |
| Visitors | Anonymous; no login, email collection, or guest lookup |
| History | Preserve within the browser tab across refresh and site navigation |
| Budget | $5–$10/month preference; start with an enforced $5 OpenAI project limit |
| Setup | Help configure missing OpenAI access/billing and Upstash free tier |
| Delivery | Working implementation and live preview; production launch awaits user review |
| Session limits | 5 requests/fixed minute and 20/day |
| Network limit | 120/day; retain the research proposal's 30/fixed 10-minute burst limit |
| Site limits | 500/day and 5,000 admitted calls over the feature's lifetime |
| Shutdown | October 19, 2026, 00:00 America/Chicago = `2026-10-19T05:00:00Z` |
| Questions | Use the user-prompt control, exactly one question at a time |

Engineering defaults below resolve routine choices. Ask again only if evidence requires changing product scope, budget, provider, or publication authority. Never treat a missing credential as a reason to stop independent implementation and mocked verification.

## 2. Guest experience

Add one compact inline panel below the `/faqs` heading and above category filters. Reuse existing translucent card styling, fonts, colors, `Button`, and `cn()`. Keep the page's FAQ content and navigation usable throughout. Other routes gain no chat widget or global client provider.

- Heading: **Ask about Forever Fest**. Description: **Answers from our wedding website.**
- Three example questions: arrival time, dress code, welcome-party location. Clicking fills the composer; submitting starts the call.
- Labelled textarea, 500-character counter, Send, Stop while streaming, and Clear chat. Enter submits; Shift+Enter adds a newline; preserve input-method composition behavior.
- Render streamed text with normal escaping and whitespace preservation. No HTML/Markdown renderer or automatic links from model text.
- Show a fixed **Website references** row linking to `/faqs`, `/schedule`, `/travel`, `/rsvp`, `/registry`, and `/our-story`. These are navigation aids, not a claim of per-answer citations. This deliberately avoids a second model call or custom citation protocol.
- Notice: **AI answers can be wrong. Questions are processed by OpenAI. Please avoid sharing private information.**
- Keep focus in the composer; announce loading/completion/errors without announcing every streamed token. Respect reduced motion, small-screen layout, and keyboard navigation. Only follow new text automatically when the reader is already at the bottom.
- State-specific copy: brief limit message with actual retry time; service unavailable with FAQ link; stopped/incomplete response clearly labelled. Existing questions remain available.
- UI disables duplicate submission while one answer streams. No auto-send, automatic retry, regenerate button, resumable stream service, transcript export, or feedback dashboard in v1.

Done: desktop and mobile browser inspection demonstrates sending, streaming, stopping, clearing, navigating away/back, refreshing, and every failure state without breaking existing FAQs.

## 3. Tooling and precise dependency baseline

Registry metadata was checked read-only on October 10. Use these compatible versions initially; resolve an actual availability/security conflict with documented evidence rather than silently changing major versions:

| Runtime package | Version |
| --- | --- |
| `ai` | `7.0.137` |
| `@ai-sdk/react` | `4.0.140` |
| `@ai-sdk/openai` | `4.0.91` |
| `zod` | `4.6.5` |
| `@upstash/redis` | `1.39.0` |
| `@upstash/ratelimit` | `2.2.0` |

`@ai-sdk/react@4.0.140` depends on `ai@7.0.137`; the AI and OpenAI packages require Zod `^3.25.76 || ^4.1.8`. AI requires Node >=22 and the React package supports the project's React 19.2.8. Metadata compatibility is not proof of runtime compatibility.

Use Node from `.nvmrc` and manifest-pinned pnpm. The future implementation command is:

```bash
pnpm add --save-exact ai@7.0.137 @ai-sdk/react@4.0.140 @ai-sdk/openai@4.0.91 zod@4.6.5 @upstash/redis@1.39.0 @upstash/ratelimit@2.2.0
```

Keep the existing Playwright runner for both browser tests and a separate browserless chat-contract suite. Add no second testing framework. Do not install the standalone OpenAI SDK, AI Elements, Gateway account, agent framework, vector database, or separate backend.

After installation, read version-matched `node_modules/ai/docs/`, provider docs/source, and installed Next.js route/environment guides. The current AI SDK docs are v7; older v6 skills/examples are not an API contract. Relevant concepts are `useChat`, `DefaultChatTransport`, `streamText`, and the v7 UI-message stream helpers. Verify signatures from installed types rather than copying an older `toUIMessageStreamResponse()` example. [Chat UI](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot), [streamText](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text), [OpenAI provider](https://ai-sdk.dev/providers/ai-sdk-providers/openai).

Done: lockfile updated, frozen reinstall works, and typecheck validates the chosen SDK interfaces.

## 4. File map and content ownership

Suggested file boundaries; combine adjacent small helpers if it improves clarity. Preserve kebab-case components and camelCase utilities. Keep server modules out of `lib/index.ts` and client imports.

| File | Responsibility |
| --- | --- |
| `app/faqs/page.tsx` | Mount panel while preserving heading, metadata, filters and list |
| `app/faqs/wedding-chat.tsx` | Client chat UI, streaming states, storage lifecycle |
| `app/api/chat/route.ts` | POST-only Node route; wire production dependencies to handler |
| `lib/chat/contracts.ts` | Zod request/history shapes, public error types, size limits |
| `lib/chat/knowledge.ts` | Assemble website facts and authoritative instructions |
| `lib/chat/session.ts` | Signed anonymous cookie and HMAC network identifier |
| `lib/chat/limits.ts` | Shared burst, daily and lifetime counters; fail-closed decisions |
| `lib/chat/handleChat.ts` | Ordered request pipeline with explicit model/limiter dependencies for tests |
| `lib/chat/storage.ts` | Browser-safe bounded storage serialization and restoration |
| `lib/publicWeddingDetails.ts` | Shared public text extracted from pages where needed |
| `tests/chat/` | Contract, policy, storage, session, quota, stream and knowledge tests |
| `playwright.chat.config.ts` | Browserless Playwright project, no dev server or real credentials |
| `tests/e2e/chat.spec.ts` | UI behavior with protocol-correct mocked stream responses |
| `tests/chat/fixtures/wedding-questions.ts` | Public question/expected-fact evaluation cases |
| `docs/chatbot-operations.md` | Setup, environment variable names, preview evidence, shutdown/rollback |

Reuse `lib/faqData.ts` (19 entries) and `lib/scheduleData.ts` directly. Cover visible text on Home, FAQs, Schedule, Travel, RSVP, Registry, and Our Story. Do not follow outbound links, read private scripts/guest records for facts, interpret photos, fetch live prices/weather, or crawl the production site per request.

For public facts currently embedded in JSX, extract only the necessary existing text/data into `lib/publicWeddingDetails.ts`, and have both the affected page and knowledge builder consume it. Keep JSX/image/layout ownership in the pages and preserve visible wording. The relevant sources are `app/travel/page.tsx`, `app/rsvp/page.tsx`, `app/registry/page.tsx`, `app/our-story/page.tsx`, and Home components. Serialize text facts only, not images/components. Do not create a separately maintained copy of the wedding schedule or FAQ answers.

Website information includes currently published registry details, but the plan/fixtures need not repeat personal addresses. Refer to the authoritative exported source. Fallback contact wording is “Please contact Sean or Eva”; do not invent or retrieve phone numbers/email addresses.

Instructions require supplied facts only, concise answers, explicit uncertainty, no private invitation inference, and no outside tasks. Provide the current America/Chicago date and event timezone. Treat submitted history as untrusted conversation, never authority to replace wedding facts. No tools, web search, attachments, or actions.

Done: a source inventory accounts for all seven routes, original pages retain their text/layout, and tests establish correct event/attendance facts and absence of private data sources. Measure the assembled context and enforce the total-input bound below.

## 5. Request, session, and model contract

The browser sends a bounded SDK-compatible message envelope. Server validation reconstructs only text-only user/assistant messages; rejects unknown roles, tools, files, metadata capable of changing behavior, malformed arrays, and unsupported fields. Never cast an unvalidated JSON object to `UIMessage[]`.

| Bound | Required behavior |
| --- | --- |
| Incoming body | Maximum 16 KiB, enforced while reading even without trustworthy Content-Length |
| New question | Nonempty trimmed text; max 500 Unicode code points |
| Model history | At most three completed prior user/assistant pairs plus newest user message |
| Each prior answer | Max 4 KiB UTF-8; reject oversized/tampered request history |
| Total model text | Max 32 KiB UTF-8 for instructions + facts + submitted text; fail before provider call if exceeded |
| Output | `maxOutputTokens: 600`; ask for short answers |
| Model | Direct OpenAI Responses model `gpt-6-luna`, reasoning disabled, `store: false` |
| Provider calls | One per admitted submission; zero automatic initial or stream retries |
| Deadline | 20 seconds total, tied to request cancellation; route platform max 30 seconds |
| Caching | `Cache-Control: no-store`; no application prompt/response cache |

The 32 KiB bound is a conservative byte limit, not a claim of exact token counting. Record actual input/output usage during preview evaluation. If the website corpus grows beyond the bound, report it and revise the extraction deliberately; do not silently drop core wedding facts or accept arbitrary context length.

Signed cookie: random opaque ID plus issued/expiry times and HMAC signature, HttpOnly, SameSite=Lax, Path=/, Secure on HTTPS. Expiry cannot exceed the cutoff. Use Node crypto and constant-time signature comparison. A missing/invalid cookie gets a fresh anonymous identity only after origin/body checks; IP/site controls still apply. Cookies can span tabs; clearing tab history does not refresh quotas.

Only accept same-origin browser requests on configured local/preview/production origins; reject missing, null, or foreign Origin. This is defense in depth, not authentication. On Vercel use documented platform IP headers with validation/normalization; do not accept an arbitrary user header as trusted identity. Reject missing/invalid IP in deployed environments. Loopback development/test gets a deterministic local identity without trusting arbitrary forwarded headers. Persist only a keyed hash of the normalized address, with daily namespace/TTL. [Vercel request headers](https://vercel.com/docs/headers/request-headers).

Pipeline order:

1. Check feature flag, cutoff and required server configuration. No Redis/provider work when disabled.
2. Check method/origin/content type and bounded body; validate allowed text message envelope.
3. Resolve cookie/IP identity; assemble server-owned facts/instructions and validate total text size.
4. Check shared burst limits, then atomically reserve daily/lifetime quotas.
5. Make exactly one model call and return the SDK's UI stream. Attach the issued cookie before streaming starts.
6. Cancel on Stop/disconnect/deadline; conservatively retain consumed quota. Emit only safe client errors; never include provider request objects, credentials, prompts or answers in logs.

Pre-stream error mapping: 400 invalid input, 403 origin, 413 oversized body, 415 unsupported content type, 429 quota with Retry-After/reset metadata, 503 disabled/configuration/storage/provider unavailable. Use a stable public error code and short message. After headers begin, use a safe stream error and mark the answer incomplete; do not pretend an HTTP status can be changed then.

Done: contract tests prove zero provider calls on all rejected paths, exactly one on admission, and no retry on midstream failure. A live preview verifies model access/behavior; documented model availability alone is insufficient. [OpenAI model](https://developers.openai.com/api/docs/models/gpt-6-luna), [data controls](https://developers.openai.com/api/docs/guides/your-data).

## 6. Quotas and shutdown

Use one shared Upstash database/primary path. Fixed minute/10-minute burst windows may straddle boundaries; communicate actual reset times rather than describing a rolling guarantee.

- `@upstash/ratelimit`: session 5/minute, network 30/10 minutes. Explicitly reject timeout outcomes, exceptions, and denied results; keep identifier analytics disabled.
- Daily quotas reset at midnight America/Chicago. Derive the date key and next midnight explicitly; do not assume the library's UTC fixed-day window provides Chicago midnight.
- Use one small atomic Redis script for the daily session/network/site counters and event-lifetime site counter: check all caps, reserve one unit in every applicable counter if allowed, and set bounded TTLs. No separate read/check/write race. Include script tests against a dedicated live test namespace before declaring concurrency enforcement verified.
- Daily/identity keys expire shortly after their window. Lifetime key is stable across cookies, deployments and config changes and lasts through cutoff plus seven days. Preview and production use separate namespaces; site totals aggregate all instances within the namespace. Never namespace by deployment ID or commit SHA.
- Failed, cancelled and interrupted model attempts retain quota. A manually repeated question consumes a new allowance. A denied request makes no model call.
- Server rechecks cutoff on every POST, including tabs opened before midnight. `CHAT_ENABLED=false` and absent configuration deny calls. No scheduled job is needed to stop answering.
- A session/IP rotation can evade per-identity quotas; global allowance and provider budget are separate backstops. Shared Wi-Fi consumes one network budget. These are accepted practical anonymous limits, not perfect identification or an exact dollar guarantee through infrastructure failures.

OpenAI project hard cap: $5/month with alerts below the cap. Slight propagation overshoot remains possible. Keep the Upstash service on its free tier; if unavailable, ask before enabling paid storage. Vercel WAF is supplemental: inspect the plan and existing rules, and use an available chat-path burst rule without replacing unrelated protection or requiring a paid upgrade. [Upstash timeout semantics](https://upstash.com/docs/redis/sdks/ratelimit-ts/features), [consistency](https://upstash.com/docs/redis/features/consistency), [OpenAI spend limits](https://developers.openai.com/api/docs/guides/spend-limits).

Done: boundary/concurrency tests, storage-failure tests, deployment-persistent namespace checks, and before/at/after cutoff tests pass. Deleting any counters is not part of routine restart or deployment.

## 7. Browser-tab persistence

Use `sessionStorage` under a versioned key, e.g. `forever-fest-chat:v1`. Store at most ten completed pairs and 48 KiB total, trimming oldest complete pairs; send only the last three pairs. Store answer text and local IDs only, never cookies, credentials, provider response IDs, or hidden reasoning. The current composer can stay in memory.

Restore once after client mount, validate and bound stored JSON, and initialize/update chat state without issuing a request. Delay sending until restoration completes. Persist completed pairs; a Stop, navigation, or refresh during streaming does not save a partial answer as completed or resume it later. Clear aborts any current stream, clears local history, and leaves quotas intact. Blocked/full/malformed browser storage falls back to in-memory operation without crashing.

Keep the chat client scoped to `/faqs`; navigating elsewhere unmounts it, then sessionStorage restores on return. Normal tab-session end removes history, subject to browser restoration behavior. No localStorage, cross-device history, conversation database, or provider-managed persistent conversation. [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

Done: browser tests prove refresh/navigation restoration sends zero network requests, in-progress streams do not replay, and Clear/storage failures behave correctly.

## 8. Service setup and environment inventory

Perform setup only in the implementation chat, after the user has dispatched it. Inspect existing resources before creating duplicates. Help with signup/login or required payment entry via user prompts; never request secrets in chat. Enter/store credentials through an appropriate secret input, local ignored environment file, or provider environment manager. Record variable names and readiness only.

| Variable | Purpose / value |
| --- | --- |
| `OPENAI_API_KEY` | Restricted project key, server only |
| `UPSTASH_REDIS_REST_URL` | Selected free database REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Server-side Redis credential |
| `CHAT_COOKIE_SECRET` | Cryptographically random >=32 bytes; HMAC purposes separated by label |
| `CHAT_ENABLED` | Default false; true on the explicitly selected preview |
| `CHAT_ENDS_AT` | `2026-10-19T05:00:00Z` |
| `CHAT_QUOTA_NAMESPACE` | Stable `forever-fest-2026:preview` or eventual `forever-fest-2026:production` |
| `CHAT_ALLOWED_ORIGINS` | Exact trusted origins; localhost only in development/test |

Model and quota values live as typed server constants for v1, not a client-supplied option or generic settings dashboard. Validate environment configuration lazily at request time so builds and ordinary tests do not need secrets. The UI flag is a server-provided boolean; document that Vercel environment changes require redeployment to update rendered state.

Setup sequence and evidence:

1. Verify OpenAI project/model access and billing status. Create a dedicated project if needed, configure enforced $5 monthly cap, then issue a restricted key. Do not infer funded access from a ChatGPT subscription. Any required funding purchase gets a concrete amount reviewed with the user.
2. Select/create a durable claimed Upstash free database, not an unclaimed three-day demo database. Verify selected plan and REST access without printing the token.
3. Put actual credentials in ignored `.env.local` only for authorized live checks and in the selected Vercel preview environment. Add a tracked `.env.example` with blank placeholders and safe defaults; `.gitignore` currently ignores `.env*`, so add the narrow exception `!.env.example`.
4. Keep production unconfigured/off. Scope live preview values to the implementation branch where supported; otherwise do not enable other unrelated previews. Keep synthetic CI/browser-test configuration separate from real credentials.
5. Verify Redis counter round-trip and concurrent admission with only an isolated test namespace. Run a live model smoke call through the application endpoint, not merely the provider dashboard.
6. Deploy a Vercel preview, confirm preview URL, build commit and environment scope, then test it in the browser. Preserve existing deployment protection; arrange user access without disabling protection globally.

Done: a working authenticated-to-providers preview is independently exercised; reports distinguish setup saved, connection verified, app flow verified, and production untouched.

## 9. Implementation order and verification gates

| Phase | Deliverable | Completion evidence |
| --- | --- | --- |
| A | Correct checkout/branch, dependencies, source inventory | Status preserved; versions/type contracts confirmed |
| B | Shared public content, contracts, session/limits helpers | Browserless contract tests pass; original content preserved |
| C | Streaming endpoint and client panel with storage | Mocked end-to-end chat/stop/reload/error flows pass |
| D | Local regression verification | `pnpm validate`, then `pnpm build`; mobile/desktop inspection |
| E | OpenAI/Redis setup and protected live preview | Real stream, real quota, failure/cutoff checks; evaluated answers |
| F | Handoff for production decision | Preview URL, exact revision, results, known limits, enable/disable steps |

Add `test:chat` using `pnpm exec playwright test --config=playwright.chat.config.ts` and include it in `validate` before browser tests. Use `ai/test`'s installed-version mock language model for deterministic request/stream tests and fake limiter dependencies for rejection cases. Playwright's existing runner can execute browserless tests without introducing Vitest. Production adapters must never switch to a mock based on a public request/header. Browser tests intercept `/api/chat`; no live credentials or paid API calls in CI. [AI SDK test helpers](https://ai-sdk.dev/docs/ai-sdk-core/testing).

Required automated coverage:

- Bounds/roles: malformed JSON, wrong type, no Origin, foreign Origin, 16 KiB overflow without Content-Length, huge history, forged system/tool/file parts, and tampered storage.
- Limits: exact last allowance, next request denied, simultaneous near-cap calls, Redis errors/timeouts, midnight Chicago boundary, invalid/tampered cookie, network key handling, namespaces, persistent lifetime allowance.
- Provider: one call, correct source context, no tools, reasoning off, storage off, short output, no initial/stream retries, cancellation, pre-stream and midstream errors.
- UI: incremental response, usable composer, Stop, Clear, no replay on restore, source navigation, keyboard, 390px mobile and 1280px desktop, unavailable chat with working FAQs.
- Regressions: existing route smoke suite, FAQ filters/anchors, schedule/calendar attendance/time details, `/rsvp-form` and `/address` redirects. No form submission or guest-data mutation.

Use a dedicated test namespace to verify actual Redis atomic-script behavior without model calls. Mocked Redis tests do not establish deployed concurrency safety. If a live test is blocked, report it separately and keep the gate incomplete.

Live answer evaluation: 20–30 public prompts, one pass initially, re-run failing categories after fixes. Cover ceremony arrival/start/end, both venues, welcome-party attendance/cost/parking, attire, wristbands, valet, rooftop/weather setup, food/dietary limits, cash bar distinction, hotel block, RSVP/update/deadline, plus-one/kids, registry directions, story, unknown questions, contradictory history, instruction injection, and a follow-up pronoun reference. Require no wrong venue/time/attendance/cost answers and no invented invitation status. Unknown/private questions must abstain. Save public prompts and concise verdicts, not private guest conversations. Record actual token use and response timing; require incremental text before completion and no routine timeout in the pass. Keep live evaluation below $0.25; obtain a decision before expanding beyond that allowance.

Keep build and dev/browser tests sequential because they share `.next`. Update `docs/codex.md` only as needed to preserve its no-secrets-required development/CI guarantee. End-to-end evidence must distinguish mock tests from live provider calls.

## 10. Preview handoff and production review

At completion update HANDOFF with phase statuses, exact commit/branch, preview URL, test outcomes, live evaluation results, service readiness, outstanding issues and the next concrete action. Include no credentials. A preview deployment is not a production release.

Production review should present the actual working preview and the finite actions needed to enable it. Merging, production deployment/domain promotion, and setting production chat credentials/enablement remain pending explicit review. Rollback is `CHAT_ENABLED=false` plus redeployment if needed; the cutoff always remains enforced on the server. Shutdown does not automatically delete accounts, refunds, or subscriptions.

Estimated engineering effort remains roughly one to two focused days, with account access/payment waits separate. If implementation starts after the cutoff, do not silently extend it: complete safe offline work and ask for a new lifecycle decision before live use.
