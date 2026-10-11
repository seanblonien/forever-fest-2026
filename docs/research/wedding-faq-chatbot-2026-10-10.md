# Small anonymous wedding FAQ chatbot

Researched October 10, 2026. Research only: no application code, dependencies, credentials, accounts, deployment settings, or guest data changed. Recommendations and effort estimates below are engineering judgments, not measured implementation results.

Follow-up: [the implementation plan](../plans/wedding-chatbot/implementation-plan.md) now records the user's confirmed delivery/setup/limit/shutdown choices and a registry-verified dependency baseline, including required Zod. Use [the handoff](../plans/wedding-chatbot/HANDOFF.md) to start implementation. Alternatives and provisional choices below remain the dated research record; the implementation plan owns the final requirements.

## Recommendation and scope

Feasible in approximately **7–12 focused engineering hours, normally one to two days**, provided it stays a text-only assistant on `/faqs` using approved public wedding information. Following the user's scope choices, recommend a small React chat panel using Vercel AI SDK for streaming replies, one Next.js POST route, a direct OpenAI provider connection, and shared rate-limit counters. Retain the conversation within the browser tab using `sessionStorage`.

Confirmed by the user: **website information only**, **streaming replies using Vercel AI SDK**, **$5–$10/month preferred OpenAI budget**, and **conversation retained in the current browser tab across refresh/navigation until the tab session ends**. Use published site content, with no additional private knowledge, guest records, or external web research in chatbot answers. When the site does not answer a question, acknowledge the gap and refer the guest to Sean/Eva. Recommend $5 as the initial provider spending limit; the range is a preference, not authorization to configure billing. Exact request quotas below remain proposed defaults. Ask any further scope questions through the user-prompt control, one at a time. No implementation approval has been requested or inferred.

Proposed guest experience: an inline “Ask about the wedding” panel above the existing FAQs, a few example questions, short streaming answers, links to relevant site sections, a clear AI label, loading/error/limit states, and a reset button. Keep the existing FAQs available when the bot is disabled or unavailable. No login, email collection, uploads, voice, booking actions, RSVP lookups/edits, or server-side transcript archive. The browser tab retains a bounded local conversation.

This needs one model response per question. Tool use, an agent loop, Agents SDK, LangChain, embeddings, vector search, file search, and a separate backend service would add scope without a demonstrated need.

## Current repository evidence

- `package.json` and `pnpm-lock.yaml`: Next.js 16.3.0, React 19.2.8, strict TypeScript/Tailwind conventions; no existing AI or Redis dependency.
- `app/faqs/page.tsx` renders `FaqList`; `app/faqs/faq-list.tsx` provides category filters.
- `lib/faqData.ts` contains **19 FAQ entries** with string questions/answers and optional related-component keys.
- `lib/scheduleData.ts` contains wedding and welcome-party data, including explicit attendance language.
- `app/faqs/individual-faq.tsx` and `app/faqs/utils.ts` already provide question anchors suitable for source links.
- `app/travel/page.tsx` contains hotel/airport information within the component; those facts are not all exported as shared data. A narrow extraction would be needed if the bot must answer them directly rather than link to Travel.
- No existing application API route was found in the inspected `app/` tree. Adding a route is supported by the installed Next.js documentation: `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md` and `01-app/02-guides/backend-for-frontend.md`.
- Next.js server environment variables are documented in the installed `01-app/02-guides/environment-variables.md`; provider credentials must never use `NEXT_PUBLIC_`.

These findings concern this checkout. The deployed Vercel plan, current production revision, available API credits/model access, and existing account limits were not inspected.

## Minimal architecture

```text
FAQ chat panel (temporary browser conversation)
    -> POST /api/chat (same Next.js application)
        -> validate body, roles, lengths, origin and anonymous session
        -> enforce session, IP and global limits in shared storage
        -> assemble authoritative public wedding context on the server
        -> one OpenAI Responses API call
    <- short answer and approved source links
```

Keep a bounded conversation in `sessionStorage` so it survives refreshes and navigation within the same tab. Send only a bounded recent history to the model. Provide a reset control that clears local conversation data without resetting quotas. Restore completed messages without resubmitting them or automatically restarting an interrupted stream. Fall back to in-memory conversation if browser storage is unavailable. A random server-issued, signed, short-lived cookie can identify the anonymous session for counters; it is not guest authentication, and cookies may span tabs. A future implementation should use secure, HttpOnly, SameSite cookie settings.

`sessionStorage` is partitioned by origin and tab, survives reloads/restores, and normally clears when the tab session ends. Browser session-restoration behavior means it should not be described as a guaranteed secure deletion on physical tab closure. No cross-device history or durable account history is proposed. [MDN sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

Read FAQ/schedule exports directly on the server and serialize a compact knowledge packet on each call. Avoid crawling the live website. Include the current date in America/Chicago and explicit rules to preserve attendance scope. For remaining public pages, use a small reviewed text extraction or shared data exports, with tests against drift. The entire useful corpus is small enough to send directly; actual token size must be measured before launch.

OpenAI recommends the Responses API for new projects. It supports manually supplied conversation context and `store: false`. Server-side instructions must be rebuilt by the application; never accept client-supplied system/developer instructions. [Responses API guidance](https://developers.openai.com/api/docs/guides/migrate-to-responses).

## Libraries and services

| Option | Additions | Assessment |
| --- | --- | --- |
| Non-streaming alternative | `openai`, `@upstash/redis`, `@upstash/ratelimit`; existing React/Tailwind | Smaller alternative if streaming is later dropped. Native `fetch` from browser to route. No chat UI framework required. |
| Recommended streaming implementation | `ai`, `@ai-sdk/react`, `@ai-sdk/openai`, plus the two Upstash packages; optional `zod` for schemas | Matches the user's streaming preference. Built-in streaming and chat state support, with a small browser-storage adapter. Use the explicit OpenAI provider; Gateway is optional. Avoid also installing `openai` without a separate need. |
| OpenAI ChatKit | Embedded UI plus a server integration | More integration surface than this project needs. Current docs direct new integrations to a custom server; the older Agent Builder hosted path is in transition. |

Sources: [OpenAI JavaScript SDK](https://github.com/openai/openai-node), [AI SDK Next.js integration](https://ai-sdk.dev/docs/getting-started/nextjs-app-router), [AI SDK OpenAI provider](https://ai-sdk.dev/providers/ai-sdk-providers/openai), [ChatKit](https://developers.openai.com/api/docs/guides/chatkit), [Upstash rate-limit setup](https://upstash.com/docs/redis/sdks/ratelimit-ts/gettingstarted).

Exact package versions should be selected and pinned against the current project at implementation time. No installation or compatibility test was performed for this research.

Setup would require a dedicated OpenAI API project with billing and a restricted project key; one Upstash Redis database for expiring counters; server-only Vercel environment variables for those credentials and session/IP hashing secrets; and separate preview/production quota namespaces. Use mocked responses for routine tests so production credentials are not required to develop the site. Existing ChatGPT/Codex access is not evidence of funded API access.

## Anonymous sessions and practical strict limits

Anonymous means no guest account or identity lookup. It cannot guarantee a per-human allowance: visitors can clear cookies, switch browsers, or change IP addresses. Layer session and IP limits with a global allowance to bound overall model calls.

Proposed starting settings, all adjustable and not yet approved:

| Layer | Initial proposal |
| --- | --- |
| Anonymous session | 5 questions per fixed minute; 20 per day |
| IP/network backstop | 30 questions per fixed 10-minute interval; 120 per day |
| Whole site | 500 model calls per day; 5,000 total for the feature's event lifetime |
| Each request | 500 characters for the newest question; bounded total body/history and model input; approximately 600 maximum output tokens |
| Conversation | Last 3 question/answer pairs; no unlimited history |
| Failure behavior | Reject if quota storage is unavailable or times out; existing FAQs remain usable |

Fixed windows mean a burst can straddle a boundary; do not describe them as an exact rolling-window guarantee. Define daily resets explicitly, preferably using the wedding's America/Chicago calendar date. The lifetime counter must survive redeploys and must not reset with the session.

Consume quota before contacting OpenAI, using atomic counter operations in shared storage rather than separate read/check/write calls. Disable uncounted automatic provider retries; every actual retry must consume quota. Set an explicit short provider timeout, for example 15–20 seconds, and cancel upstream work on disconnect where supported. The official SDK's documented defaults are two retries and a ten-minute timeout, which do not fit this flow. [SDK request controls](https://github.com/openai/openai-node#retries). A serverless in-memory map is insufficient across multiple instances/redeploys. Count failed attempts conservatively. Use trusted platform IP information, normalize addresses, and store only a keyed hash with a short TTL. Hashing does not make infrastructure processing of IPs disappear.

Upstash's default rate-limit timeout is **5 seconds and allows requests through**. A strict implementation must inspect timeout reasons and reject them, and handle thrown storage errors the same way. Use one primary counter path instead of asynchronous multi-region limiting. [Timeout and multi-region behavior](https://upstash.com/docs/redis/sdks/ratelimit-ts/features).

This is a practical abuse/cost control, not a mathematically exact dollar ceiling under every outage. Upstash documents eventual consistency; its failover behavior does not justify claiming zero possible counter loss. OpenAI hard spend limits also have propagation delay. If absolute no-overshoot accounting is a requirement, it changes the design and estimate. [Upstash consistency](https://upstash.com/docs/redis/features/consistency), [OpenAI spend limits](https://developers.openai.com/api/docs/guides/spend-limits).

Shared hotel/venue Wi-Fi can make several guests share the IP allowance. A botnet can exhaust the global allowance and make chat unavailable to real guests. For this small site, falling back to the FAQs is an acceptable proposed tradeoff; lower-cost protection before the function can reduce unnecessary Redis/function traffic.

Vercel currently documents one WAF rate-limit rule on Hobby with fixed-window controls. A path-specific rule can supplement application limits, subject to the account's available rule and plan; it does not provide the proposed anonymous-session and lifetime quotas by itself. [Vercel WAF rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting).

Origin checks reduce casual cross-site misuse but do not authenticate callers. Render answers as escaped text; source links should come from an approved registry, with server validation of returned source identifiers. Do not render arbitrary model HTML or trust model-generated URLs.

## Answer quality and privacy

Require answers to use supplied facts, decline unrelated requests, and say when information is missing. Prompt instructions reduce errors but do not guarantee accuracy. Validate with representative guest questions before launch and keep source links visible.

Specific regression cases from this site:

- Arrival is around 5:30 PM; ceremony is at 6:00 PM, October 17, 2026, Dallas time.
- Welcome party is October 16 at State & Allen; all wedding guests are welcome, no separate RSVP needed. Do not confuse that venue with DEC on Dragon.
- Cocktail-hour drinks are covered; reception has a cash bar.
- No official hotel block is listed.
- An individual plus-one's invitation/RSVP status cannot be inferred.
- The published September 20 RSVP deadline is already past on the research date. Report the published date and refer late-policy questions to Sean/Eva instead of inventing an extension.
- Do not turn food labels or side-dish availability into an allergy-safety guarantee.

Do not archive transcripts on the application server or send prompt/answer bodies to application analytics/logs. Persist only counters and minimal operational metadata on the server; the browser tab holds the bounded local conversation chosen by the user. Resetting the UI does not reset quota. Browser-held history is untrusted input and must pass the same role/size validation on every request.

Set `store: false` for the Responses API. This avoids persisted response application state but is **not zero data retention**: OpenAI may retain abuse-monitoring content for up to 30 days by default, with documented exceptions. API content is not used for model training by default. Hosting/providers still process request metadata. A short UI notice should say questions are processed by OpenAI and ask guests not to share private information. [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data).

## Model and illustrative cost

**GPT-6 Luna is a reasonable first evaluation candidate**, with reasoning disabled for short factual answers. Official docs position it for focused, high-volume work and support `reasoning.effort: none`, Responses, streaming, and structured outputs. Actual account access and wedding-answer quality are unverified. [Model documentation](https://developers.openai.com/api/docs/models/gpt-6-luna).

Current short-context Standard rates are $0.10/million input tokens and $0.50/million output tokens. For illustration, 4,000 input tokens including wedding context/history and 300 output tokens cost **$0.00055 per answer**, or **$0.55 per 1,000 answers**. At the documented cache-write input rate of $0.125/million, the same example is $0.65 per 1,000. These are modeled costs, not measured usage; longer context, reasoning, retries, model changes, and hosting affect totals. [OpenAI pricing](https://developers.openai.com/api/docs/pricing).

Upstash currently advertises a free tier with 500,000 commands/month. Several counters mean several commands per chat request; blocked traffic can consume commands too. Its paid usage price is $0.20/100,000 commands. Existing account/free-tier availability is unverified. [Redis pricing](https://upstash.com/pricing/redis).

Do not buy a Vercel upgrade just for this proposal without checking current plan/usage. Function/traffic usage is separate from OpenAI cost. The user prefers a $5–$10 OpenAI monthly budget; recommend starting with a $5 project hard limit as an additional backstop. OpenAI now explicitly supports enforced hard limits, unlike spend alerts, but notes possible slight overshoot while enforcement propagates. Keep application caps as well. No spending limit has been configured. [Spend limits](https://developers.openai.com/api/docs/guides/spend-limits).

## Effort and acceptance criteria

| Work | Estimate |
| --- | --- |
| Review source corpus and define answer policy | 1–2 hours |
| Inline panel and one server endpoint | 2–3 hours |
| Anonymous sessions, shared quotas, failure handling, service setup | 2–4 hours |
| Answer evaluation, abuse/failure checks, mobile/keyboard checks | 2–3 hours |
| Total | 7–12 hours |

These estimates assume ready account access, no new design system, no private data, and no server-side transcript persistence. A 2–4 hour demo would omit some production validation and is not the recommended completion target. Streaming and browser-tab persistence fit the estimate using AI SDK and `sessionStorage`, but need cancellation/error checks, refresh/navigation restoration checks, and protection against replaying completed requests.

Future completion would require representative question evaluation (approximately 20–30 cases), forged history/oversized input tests, concurrency and quota-boundary tests, provider/storage failure tests, checking no secrets/transcripts reach the browser/logs, and the repository's UI/runtime checks: `pnpm validate`, then `pnpm build`, plus mobile/desktop inspection. A small live API preview test is needed to establish actual quality, token usage, latency, and account access. Mocked tests alone cannot establish those facts.

Given the October 17 wedding, keep this optional and isolated. A disabled bot must leave every existing FAQ, schedule link, and RSVP flow working. An environment-controlled off switch and a chosen post-event shutdown date would keep ongoing maintenance small.

## Research verification

Inspected repository source and installed Next.js guidance; fetched current primary vendor documentation. No model calls, integrations, dependency installation, or production changes were performed. Only this research document was added. Documentation checks do not establish runtime compatibility or live service readiness.
