# Forever Fest Help

The site-wide floating Forever Fest Help uses the direct OpenAI Responses API (`gpt-6-luna`, reasoning off, `store:false`, no tools, no retries). Only published wedding content enters its server-owned corpus. No guest list or RSVP importer is accessed.

## Guest interface and history

The bottom-right disco-ball launcher opens the dark blue and pink chat panel on every route. The same icon appears beside the title. Replies are escaped plain text; three animated dots appear until the first answer text arrives, with a static fallback for reduced motion. Enter sends a question; Shift+Enter inserts a newline. Stop cancels the current response, and Escape closes the history list or panel.

Empty chats open with: “Hey, festival friend! 🪩 Your Forever Fest info booth is open. Ask about arrival, outfits, food, or the weekend plans. Let’s get you ready to celebrate! ✨” The server-owned instructions in `lib/chat/knowledge.ts` give Forever Fest Help a warm, inclusive festival-host voice with a subtle disco/rave influence. Answers lead with useful information, usually in 1–3 sentences. Generated replies must never use em dashes; use commas or periods instead. A short themed phrase can fit outfits, accessories or dancing, but many replies need none. Accessibility, allergies, payments, arrival problems, invitation eligibility and uncertain facts receive calm, direct answers without jokes or festival flourishes. The voice never changes published facts, assumes guests drink or dance, or claims to be Sean, Eva or a human organizer. Avoid forced greetings, repetitive catchphrases, default emoji and unnecessary follow-up questions.

On the first FAQ visit per browser-tab session, the closed launcher gives three brief pink glow pulses. The hint stops when chat opens or the visitor leaves FAQs, and respects reduced-motion preferences. A session-storage flag prevents repeats across reloads and FAQ category changes; if storage is unavailable, an in-memory flag lasts for the visit.

Below 640 pixels wide, the open chat fills the viewport and hides the bottom launcher; the header's close button returns to the site and restores its scroll position. The page is locked while chat is open; only the transcript, history list and composer can scroll. The panel follows the visual viewport's height and offset as the mobile keyboard opens, with an opaque background behind it. Header and composer padding respect mobile safe areas. Wider screens retain the floating panel.

The pencil starts a new chat; the clock opens the previous-chat list inside the panel. Completed conversations persist in this browser's local storage, including the active chat selection. Reopening history makes no provider request. Titles come from each conversation's first question. The ten most recently updated conversations are retained, with up to ten completed pairs and 48 KiB per conversation; only the last three pairs accompany a new question. Incomplete answers are never saved. Existing version-one tab history migrates on first use. If browser storage is blocked, history remains in memory for the visit.

## Local development

The site and automated checks require no credentials. For live local chat, privately fill the server variables in ignored `.env.local`, following [`.env.example`](../.env.example), then enable chat for the development process:

```sh
CHAT_ENABLED=true pnpm dev
```

`CHAT_ALLOWED_ORIGINS` must include the exact origin you visit. If using another port, include its localhost/loopback origins and pass that port to `pnpm dev --port 3002`. Keep `.env.local` out of Git.

## Content inventory

`lib/chat/knowledge.ts` assembles seven routes. Schedule presents times and a short overview; Travel holds entrance images, directions and parking; FAQs hold detailed practical answers, expandable menu/bar lists, coordinator contact and the shared photo album. `lib/guestInformation.ts` holds the confirmed details shared by these pages and the chatbot. `lib/publicWeddingDetails.ts` contains the Home, travel/hotel, RSVP, registry and story text consumed by the original pages. The questionnaire is authoring material and is not ingested directly. Links remain normal website navigation; answers render escaped plain text.

The server corpus references canonical facts instead of repeating shared paragraphs. Repeated FAQ, timeline, hotel and menu entries use compact arrays; question-only FAQ entries use the detailed FAQ facts. Directions links stay on the website, where chat directs guests to find them. Keep the corpus below 16 KiB so a full allowed request body still fits within the 32 KiB model-text limit; measure again when adding facts. Diet labels and weather forecasts must not be inferred from menu names or old planning notes.

## Configuration

Use `.env.example` as the list of server-only variables; enter credentials privately into ignored `.env.local`. Never prefix them with `NEXT_PUBLIC_`. The cookie secret must contain at least 32 bytes. The exact cutoff is `2026-10-19T05:00:00Z` (October 19, midnight Dallas). Invalid/missing configuration, disabled flag, storage failure or reached cutoff fails closed before provider work.

For a Vercel preview, set variables only for branch `codex/wedding-chatbot` in Preview. Set `CHAT_ENABLED=true`, namespace `forever-fest-2026:preview`, and exact HTTPS origins. Exact platform-issued `VERCEL_URL` and `VERCEL_BRANCH_URL` origins are also admitted; arbitrary request host/forwarded origin values are never added. The request Origin must equal the URL origin as well.

Production credentials and `CHAT_ENABLED=true` must be set deliberately with namespace `forever-fest-2026:production` and `https://foreverfest.wedding` in allowed origins, then the reviewed branch can be deployed/promoted. Use a separate production cookie secret. Keep the verified project cap and free Redis service. Redeploy after changing these variables so the built interface and API receive the new configuration.

## Limits and lifecycle

- 500 Unicode code points per question; 16 KiB body; last three complete pairs; 4 KiB per answer; total model text 32 KiB; maximum 600 output tokens.
- Five requests/session/minute; 30/network/ten minutes.
- Daily Chicago-midnight limits: 20/session, 120/network, 500/site. Atomic shared lifetime limit: 5,000/site. Stable preview/production namespaces survive redeployments.
- Signed anonymous HttpOnly/Lax cookie expires at cutoff; Secure on HTTPS. Only daily keyed hashes of normalized Vercel platform IPs enter Redis. Local development uses a deterministic loopback identity.
- All quota counters are reserved before a model call. Stop, disconnect, New chat and failure do not refund admission. No automatic retry/resume.
- Entire request deadline 20 seconds; Vercel function maximum 30 seconds. Abort propagates to the provider.
- Numeric usage logs contain a random request correlation ID, elapsed time and token counts only. Prompts, answers, guest identity, IPs, cookies and credentials are not logged.

## Verification and rollback

`pnpm validate` requires no credentials and uses browserless provider/limiter doubles and browser interception. Run `pnpm build` afterward, with dev/tests stopped. Real Redis verification is separately opt-in with the command in [the development guide](codex.md); its isolated synthetic keys expire after ten minutes. This test exercises the actual atomic quota script without model calls and does not delete or modify application quota counters.

Disable by setting `CHAT_ENABLED=false` in the intended environment and redeploying. The API checks the flag per request and always checks the immutable cutoff. The shared layout's panel availability is rendered at build time; redeploy to update its fallback promptly. After cutoff an already built panel can remain visible, but new requests receive safe unavailable copy and cannot call OpenAI.

New chat preserves previous completed conversations; it does not clear shared quotas. Do not delete quota counters as a workaround. Do not rotate the namespace during deployment. The lifetime counter expires seven days after cutoff; service accounts/keys are not automatically deleted. The restricted key expires independently; renew only after reviewing the required lifecycle.
