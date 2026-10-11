# Wedding chat operations

The inline FAQ chat uses the direct OpenAI Responses API (`gpt-6-luna`, reasoning off, `store:false`, no tools, no retries). Only published wedding content enters its server-owned corpus. No guest list or RSVP importer is accessed.

## Content inventory

`lib/chat/knowledge.ts` assembles seven routes. Existing `lib/faqData.ts` and `lib/scheduleData.ts` remain authoritative. `lib/publicWeddingDetails.ts` contains the same Home, travel/hotel, RSVP, registry and story text now consumed by the original pages. Links remain normal website navigation; answers render escaped plain text.

## Configuration

Use `.env.example` as the list of server-only variables; enter credentials privately into ignored `.env.local`. Never prefix them with `NEXT_PUBLIC_`. The cookie secret must contain at least 32 bytes. The exact cutoff is `2026-10-19T05:00:00Z` (October 19, midnight Dallas). Invalid/missing configuration, disabled flag, storage failure or reached cutoff fails closed before provider work.

For a Vercel preview, set variables only for branch `codex/wedding-chatbot` in Preview. Set `CHAT_ENABLED=true`, namespace `forever-fest-2026:preview`, and exact HTTPS origins. Exact platform-issued `VERCEL_URL` and `VERCEL_BRANCH_URL` origins are also admitted; arbitrary request host/forwarded origin values are never added. The request Origin must equal the URL origin as well.

Production is a separate review decision: production credentials and `CHAT_ENABLED=true` must be set deliberately with namespace `forever-fest-2026:production` and `https://foreverfest.wedding` in allowed origins, then the reviewed branch can be deployed/promoted. Keep the verified project cap and free Redis service. Production launch has not been performed.

## Limits and lifecycle

- 500 Unicode code points per question; 16 KiB body; last three complete pairs; 4 KiB per answer; total model text 32 KiB; maximum 600 output tokens.
- Five requests/session/minute; 30/network/ten minutes.
- Daily Chicago-midnight limits: 20/session, 120/network, 500/site. Atomic shared lifetime limit: 5,000/site. Stable preview/production namespaces survive redeployments.
- Signed anonymous HttpOnly/Lax cookie expires at cutoff; Secure on HTTPS. Only daily keyed hashes of normalized Vercel platform IPs enter Redis. Local development uses a deterministic loopback identity.
- All quota counters are reserved before a model call. Stop, disconnect, Clear and failure do not refund admission. No automatic retry/resume.
- Entire request deadline 20 seconds; Vercel function maximum 30 seconds. Abort propagates to the provider.
- Tab storage retains only ten completed pairs, at most 48 KiB, trimming oldest. Restore issues zero model requests. Blocked storage falls back to memory; incomplete answers are not saved.
- Numeric usage logs contain a random request correlation ID, elapsed time and token counts only. Prompts, answers, guest identity, IPs, cookies and credentials are not logged.

## Verification and rollback

`pnpm validate` requires no credentials and uses browserless provider/limiter doubles and browser interception. Run `pnpm build` afterward, with dev/tests stopped. Real Redis verification is separately opt-in with the command in `docs/codex.md`; its isolated synthetic keys expire after ten minutes. Public live evaluation results are recorded separately from mocks.

Disable by setting `CHAT_ENABLED=false` in the intended environment and redeploying. The API checks the flag per request and always checks the immutable cutoff. The FAQ page's panel availability is rendered at build time; redeploy to update its fallback promptly. After cutoff an already built panel can remain visible, but new requests receive safe unavailable copy and cannot call OpenAI.

Clear removes tab conversation only; it does not clear shared quotas. Do not delete quota counters as a workaround. Do not rotate the namespace during deployment. The lifetime counter expires seven days after cutoff; service accounts/keys are not automatically deleted. The restricted key expires independently; renew only after reviewing the required lifecycle.
