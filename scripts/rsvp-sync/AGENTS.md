# RSVP spreadsheet sync

Read `README.md` here before changing matching, preview/apply behavior, or the upload UI.
This is Google Apps Script (`Code.gs` + `Upload.html`), separate from the Next.js site.
Use Apps Script-compatible JavaScript; Node imports belong only in the local test harness.

Run `pnpm test:rsvp` from the repository root. It evaluates the script in a Node VM
with synthetic guests; it does not exercise the deployed spreadsheet or Google services.
Add regression cases for changes to matching and attendance decisions.
Deploying the bound script or applying real guest updates requires explicit task authorization.
Keep real guest CSV exports and spreadsheet data out of commits and test fixtures.

## Code Review Rules

- Preview may write the audit/plan but must not update guest RSVP statuses. Apply must
  retain the document lock and reject stale/already-applied plans, changed names/statuses,
  incompatible dropdowns, and rows no longer invited before writing any status.
- Match within the selected invitation, not the entire household. Fuzzy matches are
  suggestions only; preserve manual overrides and newest-response selection.
- Write only changed `RSVP Status (Individual)` cells. Treat blank values explicitly;
  do not silently turn missing responses into declines or change unrelated invitations.
