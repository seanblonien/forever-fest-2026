# RSVP CSV Sync

This folder is the version-controlled source for the bound Google Apps Script installed in the `Wedding Guest List` spreadsheet.

## Ongoing use

1. Download the latest CSV from Jotform.
2. Open the Google Sheet and choose `RSVP Sync > Import CSV…`.
3. Drop in the CSV and select `Preview`.
4. Review the visible `RSVP Import` audit tab.
5. Select `Apply reviewed changes`.

Preview never changes guest statuses. Apply rechecks the live cells and writes only changed values in `RSVP Status (Individual)`.

## Matching and safety

- The newest response per party wins; equal dates use the CSV's top-to-bottom order.
- Matching uses manual override, exact formal address, normalized formal address, then a unique party identity that ignores only the `Party of N` suffix.
- Fuzzy matches are suggestions only.
- The row containing the formal address is the party lead.
- Companion matching uses both the household and names present in the formal address. Other invitations in the same household are not touched.
- The audit tab preserves values in `Manual Formal Address Override` across previews.
- The `Nadia Benson` to `Nadya Benson` override is seeded in `Code.gs`.
- Apply refuses stale cells, incompatible dropdown validation, or guests no longer marked `Invite? = Yes`.

## Local test

```bash
pnpm test:rsvp
```

The installed project contains `Code.gs` and `Upload.html`. `appsscript.json` is retained here as a reference manifest.
