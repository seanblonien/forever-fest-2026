# AI pull request reviewers for Forever Fest

Researched October 8, 2026. Scope: GitHub PR integration, setup effort, and ongoing cost. Research only; no GitHub apps installed, settings changed, or review comments posted.

## Recommendation

Start with **Codex's native GitHub review** if the existing subscription is an eligible Plus/Pro plan. It avoids buying another subscription. **CodeRabbit is the strongest standalone free alternative for this repository**, which GitHub currently reports as public (`seanblonien/forever-fest-2026`, verified with `gh repo view`). These recommendations prioritize cost and setup, not an untested claim that either catches more bugs.

## Comparison

| Reviewer | Ongoing free/included access | Setup and fit |
| --- | --- | --- |
| Codex | Native automatic review included with eligible Plus/Pro subscriptions, within usage limits. | Connect GitHub/repository, enable code review, configure triggers. Best first trial with the existing subscription. |
| CodeRabbit | Full reviews free for every public repository; no application or special license requirement. | Install GitHub app for this repository; subsequent PRs receive reviews. Best separate free service here. |
| Greptile | Starter: one active developer, unlimited repositories, 50 credits/month. Base/Plus/Apex reviews cost 1/3/10 credits respectively. | Connect GitHub, enable repository, receive PR comments. A credible free limited alternative. |
| GitHub Copilot | Copilot Free excludes PR review. Pro starts at $10/month; reviews consume AI credits and agentic capabilities consume Actions minutes. | Native reviewer selection and optional automatic review settings. Easy integration, but another subscription unless already eligible. |

Sources and qualifications follow.

## Codex

Plus/Pro include native automatic code review with usage limits; verify the actual account allowance rather than assuming unlimited reviews. Connect GitHub and select the repository, then enable repository review and personal triggers in [Code review settings](https://app.chatgpt.com/settings/code-review). A PR comment containing `@codex review` requests a review. Codex follows applicable `AGENTS.md` instructions; current documentation describes P0/P1 findings by default. The native integration is the relevant subscription route; the GitHub Action uses separate API-key billing. Sources: [pricing](https://learn.chatgpt.com/docs/pricing), [GitHub integration](https://learn.chatgpt.com/docs/third-party/github), [GitHub Action](https://learn.chatgpt.com/docs/github-action).

## CodeRabbit

CodeRabbit explicitly defines eligibility for its free OSS offer as a public repository, so this wedding website qualifies without needing an OSI-approved license. Install the app for just this repository; no credit card or application is required. [Official public-repository offer](https://www.coderabbit.ai/oss), [setup](https://docs.coderabbit.ai/getting-started/quickstart).

Public access is the reason this option is free. Paid private-repository review starts at Essentials, $30/developer/month or $24/month billed annually, following a 14-day trial. Hourly allowances and fair-use restrictions apply; do not interpret free as unthrottled. [Pricing](https://www.coderabbit.ai/pricing), [billing and limits FAQ](https://www.coderabbit.ai/FAQ).

## Greptile

Starter's 50 credits support up to 50 Base reviews, 16 Plus reviews, or 5 Apex reviews if used exclusively on that tier; repeat reviews consume the allowance too. Its pricing page does not state a public-only restriction for Starter. Pro costs $30/seat/month with 50 credits and $1/additional credit. A separate free OSS program requires qualified non-commercial projects with an OSI-approved license; public visibility alone does not establish that eligibility. [Pricing](https://www.greptile.com/pricing), [Starter launch](https://www.greptile.com/changelog).

Setup connects the code provider and enables repositories. Greptile posts findings on PRs and offers handoff to Codex for fixes. [Integration overview](https://www.greptile.com/docs/introduction).

## GitHub Copilot

Select Copilot in the PR reviewer menu or configure automatic reviews. Public visibility does not unlock free PR review. Some teachers and maintainers of popular open-source projects qualify for free Pro, but this project's eligibility is unverified. Organization-sponsored reviews without a personal license are billed to the organization. Current billing uses AI credits plus Actions, so older comparisons promising a fixed number of premium-request reviews are outdated. [Review availability and usage](https://docs.github.com/en/copilot/concepts/agents/code-review), [license pricing and exceptions](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-licenses).

## Outdated free alternative: Gemini

Google's free consumer Gemini Code Assist GitHub app stopped accepting installations June 18, 2026 and shut down July 17, 2026. Do not follow older articles recommending it as a free install. The enterprise version survives as a separate offering. [Official sunset notice](https://developers.google.com/gemini-code-assist/docs/deprecations/consumer-code-review).

## Project-specific trial

Enable one automatic reviewer initially. Try it on a representative TypeScript/React PR, check whether findings are actionable, and retain the existing lint/typecheck/Playwright validation. For this Next.js 16 site, judge review usefulness on behavior, accessibility, framework compatibility, and regressions rather than formatting comments already covered by ESLint. No vendor quality benchmark was run during this research.
