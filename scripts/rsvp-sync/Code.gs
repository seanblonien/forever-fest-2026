/** @OnlyCurrentDoc */

const RSVP_CONFIG = Object.freeze({
  auditSheetName: 'RSVP Import',
  guestSheetName: 'Wedding Guest List',
  allowedStatuses: Object.freeze(['Pending', 'Attending', 'Declined']),
  propertyKey: 'RSVP_LAST_PREVIEW',
  maxCsvBytes: 2000000,
  seededOverrides: Object.freeze({
    'nadia benson party of 1': 'Ms. Nadya Benson, Party of 1',
  }),
});

const RSVP_AUDIT_HEADERS = Object.freeze([
  'Run ID',
  'Source File',
  'File SHA-256',
  'Source Row',
  'Submission Date',
  'Source Party',
  'Attending Count',
  'Wedding Answer',
  'Welcome Party Answer',
  'Email',
  'Selection',
  'Match Method',
  'Matched Formal Address',
  'Matched Members',
  'Existing Statuses',
  'Proposed Changes',
  'Result',
  'Notes',
  'Manual Formal Address Override',
]);

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('RSVP Sync')
    .addItem('Import CSV…', 'showRsvpImportDialog')
    .addItem('Open RSVP Import tab', 'openRsvpImportTab')
    .addToUi();
}

function onInstall() {
  onOpen();
}

function showRsvpImportDialog() {
  const html = HtmlService.createHtmlOutputFromFile('Upload')
    .setWidth(620)
    .setHeight(670);

  SpreadsheetApp.getUi().showModalDialog(html, 'Import RSVP CSV');
}

function openRsvpImportTab() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(RSVP_CONFIG.auditSheetName);

  if (!sheet) {
    SpreadsheetApp.getUi().alert('Run an RSVP preview first.');
    return;
  }

  spreadsheet.setActiveSheet(sheet);
}

function previewRsvpCsv(csvText, fileName) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);

  try {
    if (typeof csvText !== 'string' || csvText.length === 0) {
      throw new Error('Choose a non-empty CSV file.');
    }

    if (Utilities.newBlob(csvText).getBytes().length > RSVP_CONFIG.maxCsvBytes) {
      throw new Error('The CSV is larger than the 2 MB safety limit.');
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const guestSheet = spreadsheet.getSheetByName(RSVP_CONFIG.guestSheetName);
    if (!guestSheet) {
      throw new Error(`Missing required tab: ${RSVP_CONFIG.guestSheetName}`);
    }

    const guestModel = rsvpReadGuestModel_(guestSheet);
    const overrides = rsvpReadOverrides_(spreadsheet);
    const runId = Utilities.getUuid();
    const checksum = rsvpSha256_(csvText);
    const preview = rsvpBuildPreview_(
      csvText,
      String(fileName || 'RSVP export.csv'),
      guestModel,
      overrides,
      runId,
      checksum,
    );

    rsvpWriteAudit_(spreadsheet, preview);
    rsvpStorePreviewPlan_(preview);

    return {
      auditSheetName: RSVP_CONFIG.auditSheetName,
      canApply: preview.canApply,
      runId: preview.runId,
      summary: preview.summary,
    };
  } finally {
    lock.releaseLock();
  }
}

function applyRsvpPreview(runId) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);

  try {
    const plan = rsvpLoadPreviewPlan_();
    if (!plan || plan.runId !== runId) {
      throw new Error('This preview is no longer current. Run Preview again.');
    }

    if (plan.appliedAt) {
      throw new Error('This preview has already been applied.');
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const guestSheet = spreadsheet.getSheetByName(RSVP_CONFIG.guestSheetName);
    if (!guestSheet) {
      throw new Error(`Missing required tab: ${RSVP_CONFIG.guestSheetName}`);
    }

    const guestModel = rsvpReadGuestModel_(guestSheet);
    const recordsByRow = new Map(guestModel.guests.map((guest) => [guest.rowNumber, guest]));
    const stale = [];

    plan.changes.forEach((change) => {
      const current = recordsByRow.get(change.rowNumber);
      if (!current) {
        stale.push(`Row ${change.rowNumber} no longer exists.`);
        return;
      }

      if (current.name !== change.name) {
        stale.push(`Row ${change.rowNumber} changed from ${change.name} to ${current.name}.`);
      }
      if (current.status !== change.oldValue) {
        stale.push(
          `${change.name} changed from ${change.oldValue || '(blank)'} to ${current.status || '(blank)'}.`,
        );
      }
      if (!current.validationValid) {
        stale.push(`${change.name} no longer has the expected RSVP dropdown.`);
      }
      if (rsvpNormalizeComparison_(current.invite) !== 'yes') {
        stale.push(`${change.name} is no longer marked Invite? = Yes.`);
      }
    });

    if (stale.length > 0) {
      throw new Error(`The guest list changed after Preview:\n${stale.join('\n')}`);
    }

    const attendingCells = plan.changes
      .filter((change) => change.newValue === 'Attending')
      .map((change) => `${guestModel.statusColumnLetter}${change.rowNumber}`);
    const declinedCells = plan.changes
      .filter((change) => change.newValue === 'Declined')
      .map((change) => `${guestModel.statusColumnLetter}${change.rowNumber}`);

    if (attendingCells.length > 0) {
      guestSheet.getRangeList(attendingCells).setValue('Attending');
    }
    if (declinedCells.length > 0) {
      guestSheet.getRangeList(declinedCells).setValue('Declined');
    }

    SpreadsheetApp.flush();

    plan.appliedAt = new Date().toISOString();
    PropertiesService.getDocumentProperties().setProperty(
      RSVP_CONFIG.propertyKey,
      JSON.stringify(plan),
    );
    rsvpMarkAuditApplied_(spreadsheet, plan);

    return {
      appliedAt: plan.appliedAt,
      changedCells: plan.changes.length,
      attendingChanges: attendingCells.length,
      declinedChanges: declinedCells.length,
    };
  } finally {
    lock.releaseLock();
  }
}

function rsvpBuildPreview_(csvText, fileName, guestModel, overrides, runId, checksum) {
  const parsed = rsvpParseSourceRows_(csvText);
  const selectedByParty = rsvpSelectLatestRows_(parsed.rows);
  const auditBySourceRow = new Map();
  const changesByTargetRow = new Map();
  let matchedParties = 0;
  let skippedParties = 0;
  let warnings = 0;
  let errors = 0;
  let proposedAttending = 0;
  let proposedDeclined = 0;
  let unchangedCells = 0;
  let unrepresentedAttendees = 0;

  parsed.rows.forEach((sourceRow) => {
    const selected = selectedByParty.get(sourceRow.partyKey) === sourceRow;
    if (!selected) {
      auditBySourceRow.set(
        sourceRow.sourceRow,
        rsvpCreateAuditRow_(sourceRow, {
          selection: 'Superseded',
          result: 'Skipped',
          notes: 'A newer submission for this party was selected.',
        }),
      );
      return;
    }

    const override = overrides[sourceRow.partyKey] || '';
    const countResult = rsvpResolveAttendanceCount_(
      sourceRow.attendingCountRaw,
      sourceRow.weddingAnswer,
    );
    if (!countResult.ok) {
      skippedParties += 1;
      errors += 1;
      auditBySourceRow.set(
        sourceRow.sourceRow,
        rsvpCreateAuditRow_(sourceRow, {
          selection: 'Selected',
          result: 'Error',
          notes: countResult.error,
          manualOverride: override,
        }),
      );
      return;
    }

    const match = rsvpMatchParty_(sourceRow.party, override, guestModel.guests);
    if (!match.ok) {
      skippedParties += 1;
      errors += 1;
      auditBySourceRow.set(
        sourceRow.sourceRow,
        rsvpCreateAuditRow_(sourceRow, {
          selection: 'Selected',
          result: 'Error',
          notes: match.error,
          manualOverride: override,
        }),
      );
      return;
    }

    const canonicalPartySize =
      rsvpParsePartySize_(match.guest.formalAddress) || rsvpParsePartySize_(sourceRow.party) || 1;
    if (countResult.count > canonicalPartySize) {
      skippedParties += 1;
      errors += 1;
      auditBySourceRow.set(
        sourceRow.sourceRow,
        rsvpCreateAuditRow_(sourceRow, {
          selection: 'Selected',
          matchMethod: match.method,
          matchedFormalAddress: match.guest.formalAddress,
          result: 'Error',
          notes: `Attending count ${countResult.count} exceeds canonical party size ${canonicalPartySize}.`,
          manualOverride: override,
        }),
      );
      return;
    }

    const resolution = rsvpResolvePartyMembers_(
      match.guest,
      guestModel.guests,
      canonicalPartySize,
    );
    if (!resolution.ok) {
      skippedParties += 1;
      errors += 1;
      auditBySourceRow.set(
        sourceRow.sourceRow,
        rsvpCreateAuditRow_(sourceRow, {
          selection: 'Selected',
          matchMethod: match.method,
          matchedFormalAddress: match.guest.formalAddress,
          result: 'Error',
          notes: resolution.error,
          manualOverride: override,
        }),
      );
      return;
    }

    const partyChanges = [];
    const partyWarnings = [];
    resolution.members.forEach((member, memberIndex) => {
      const proposed = memberIndex < countResult.count ? 'Attending' : 'Declined';
      if (!member.validationValid) {
        partyWarnings.push(`${member.name} does not have the expected RSVP dropdown.`);
        return;
      }
      if (rsvpNormalizeComparison_(member.invite) !== 'yes') {
        partyWarnings.push(`${member.name} is not marked Invite? = Yes.`);
        return;
      }

      const change = {
        name: member.name,
        newValue: proposed,
        oldValue: member.status,
        rowNumber: member.rowNumber,
        sourceRow: sourceRow.sourceRow,
      };
      partyChanges.push(change);
    });

    const missingAttendees = Math.max(0, countResult.count - resolution.members.length);
    if (missingAttendees > 0) {
      unrepresentedAttendees += missingAttendees;
      partyWarnings.push(
        `${missingAttendees} attendee${missingAttendees === 1 ? '' : 's'} cannot be represented by a named guest row.`,
      );
    }
    if (resolution.missingMembers > 0) {
      partyWarnings.push(
        `${resolution.missingMembers} expected party member${resolution.missingMembers === 1 ? '' : 's'} could not be resolved from the guest list.`,
      );
    }

    if (partyWarnings.some((warning) => warning.includes('dropdown') || warning.includes('Invite?'))) {
      skippedParties += 1;
      errors += 1;
      auditBySourceRow.set(
        sourceRow.sourceRow,
        rsvpCreateAuditRow_(sourceRow, {
          selection: 'Selected',
          matchMethod: match.method,
          matchedFormalAddress: match.guest.formalAddress,
          matchedMembers: resolution.members.map((member) => member.name).join('; '),
          existingStatuses: resolution.members
            .map((member) => `${member.name}: ${member.status || '(blank)'}`)
            .join('; '),
          result: 'Error',
          notes: partyWarnings.join(' '),
          manualOverride: override,
        }),
      );
      return;
    }

    let targetConflict = '';
    partyChanges.forEach((change) => {
      const existing = changesByTargetRow.get(change.rowNumber);
      if (existing && existing.newValue !== change.newValue) {
        targetConflict = `${change.name} is targeted by multiple parties with conflicting statuses.`;
      }
    });
    if (targetConflict) {
      skippedParties += 1;
      errors += 1;
      auditBySourceRow.set(
        sourceRow.sourceRow,
        rsvpCreateAuditRow_(sourceRow, {
          selection: 'Selected',
          matchMethod: match.method,
          matchedFormalAddress: match.guest.formalAddress,
          result: 'Error',
          notes: targetConflict,
          manualOverride: override,
        }),
      );
      return;
    }

    partyChanges.forEach((change) => changesByTargetRow.set(change.rowNumber, change));

    partyChanges.forEach((change) => {
      if (change.newValue === 'Attending') proposedAttending += 1;
      if (change.newValue === 'Declined') proposedDeclined += 1;
      if (change.oldValue === change.newValue) unchangedCells += 1;
    });

    matchedParties += 1;
    warnings += partyWarnings.length > 0 ? 1 : 0;
    const changedForParty = partyChanges.filter((change) => change.oldValue !== change.newValue);
    auditBySourceRow.set(
      sourceRow.sourceRow,
      rsvpCreateAuditRow_(sourceRow, {
        selection: 'Selected',
        matchMethod: match.method,
        matchedFormalAddress: match.guest.formalAddress,
        matchedMembers: resolution.members.map((member) => member.name).join('; '),
        existingStatuses: resolution.members
          .map((member) => `${member.name}: ${member.status || '(blank)'}`)
          .join('; '),
        proposedChanges: partyChanges
          .map((change) =>
            change.oldValue === change.newValue
              ? `${change.name}: ${change.newValue} (unchanged)`
              : `${change.name}: ${change.oldValue || '(blank)'} → ${change.newValue}`,
          )
          .join('; '),
        result:
          partyWarnings.length > 0
            ? 'Ready with warning'
            : changedForParty.length > 0
              ? 'Ready'
              : 'No changes',
        notes: partyWarnings.join(' '),
        manualOverride: override,
      }),
    );
  });

  const allTargetedChanges = Array.from(changesByTargetRow.values());
  const changes = allTargetedChanges.filter((change) => change.oldValue !== change.newValue);
  const auditRows = parsed.rows.map((sourceRow) => auditBySourceRow.get(sourceRow.sourceRow));
  const summary = {
    sourceRows: parsed.rows.length,
    uniqueParties: selectedByParty.size,
    supersededRows: parsed.rows.length - selectedByParty.size,
    matchedParties,
    skippedParties,
    proposedAttending,
    proposedDeclined,
    changedCells: changes.length,
    unchangedCells,
    unrepresentedAttendees,
    warnings,
    errors,
  };

  return {
    auditRows,
    canApply: changes.length > 0,
    changes,
    checksum,
    fileName,
    runId,
    summary,
  };
}

function rsvpParseSourceRows_(csvText) {
  const matrix = rsvpParseCsv_(csvText);
  if (matrix.length < 2) {
    throw new Error('The CSV must contain a header row and at least one response.');
  }

  const semanticHeaders = matrix[0].map(rsvpHeaderSemanticKey_);
  const required = ['submissionDate', 'party', 'attendingCount', 'weddingAnswer'];
  required.forEach((header) => {
    if (!semanticHeaders.includes(header)) {
      throw new Error(`Missing required CSV column: ${header}`);
    }
  });

  const headerIndex = {};
  semanticHeaders.forEach((header, index) => {
    if (header) headerIndex[header] = index;
  });

  const rows = matrix.slice(1).map((row, index) => {
    const party = rsvpCell_(row, headerIndex.party);
    if (!party) {
      throw new Error(`CSV row ${index + 2} is missing a party.`);
    }

    const submissionDate = rsvpCell_(row, headerIndex.submissionDate);
    return {
      attendingCountRaw: rsvpCell_(row, headerIndex.attendingCount),
      email: rsvpCell_(row, headerIndex.email),
      party,
      partyKey: rsvpNormalizeComparison_(party),
      sourceRow: index + 2,
      submissionDate,
      submissionDateKey: rsvpParseSubmissionDateKey_(submissionDate),
      weddingAnswer: rsvpCell_(row, headerIndex.weddingAnswer),
      welcomePartyAnswer: rsvpCell_(row, headerIndex.welcomePartyAnswer),
    };
  });

  return { rows };
}

function rsvpParseCsv_(csvText) {
  const input = String(csvText || '').replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const nextCharacter = input[index + 1];

    if (inQuotes) {
      if (character === '"' && nextCharacter === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        inQuotes = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      inQuotes = true;
    } else if (character === ',') {
      row.push(field);
      field = '';
    } else if (character === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (character === '\r') {
      if (nextCharacter !== '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      }
    } else {
      field += character;
    }
  }

  if (inQuotes) {
    throw new Error('The CSV contains an unterminated quoted field.');
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((candidate) => candidate.some((value) => String(value).trim() !== ''));
}

function rsvpSelectLatestRows_(rows) {
  const selected = new Map();
  rows.forEach((row) => {
    const existing = selected.get(row.partyKey);
    if (!existing) {
      selected.set(row.partyKey, row);
      return;
    }

    if (row.submissionDateKey > existing.submissionDateKey) {
      selected.set(row.partyKey, row);
      return;
    }

    if (
      row.submissionDateKey === existing.submissionDateKey &&
      row.sourceRow < existing.sourceRow
    ) {
      selected.set(row.partyKey, row);
    }
  });
  return selected;
}

function rsvpMatchParty_(sourceParty, override, guests) {
  const candidate = override || sourceParty;
  const exact = guests.filter(
    (guest) => guest.formalAddress && guest.formalAddress.trim() === candidate.trim(),
  );
  if (exact.length === 1) {
    return { guest: exact[0], method: override ? 'Override' : 'Exact', ok: true };
  }
  if (exact.length > 1) {
    return { error: `Formal address matches multiple rows: ${candidate}`, ok: false };
  }

  const normalizedCandidate = rsvpNormalizeComparison_(candidate);
  const normalized = guests.filter(
    (guest) => rsvpNormalizeComparison_(guest.formalAddress) === normalizedCandidate,
  );
  if (normalized.length === 1) {
    return { guest: normalized[0], method: override ? 'Override' : 'Normalized', ok: true };
  }
  if (normalized.length > 1) {
    return { error: `Normalized formal address matches multiple rows: ${candidate}`, ok: false };
  }

  const identityCandidate = rsvpNormalizePartyIdentity_(candidate);
  const identity = guests.filter(
    (guest) => rsvpNormalizePartyIdentity_(guest.formalAddress) === identityCandidate,
  );
  if (identity.length === 1) {
    return { guest: identity[0], method: 'Normalized identity', ok: true };
  }
  if (identity.length > 1) {
    return { error: `Party identity matches multiple rows: ${candidate}`, ok: false };
  }

  const suggestions = guests
    .filter((guest) => guest.formalAddress)
    .map((guest) => ({
      address: guest.formalAddress,
      distance: rsvpEditDistance_(
        rsvpNormalizePartyIdentity_(candidate),
        rsvpNormalizePartyIdentity_(guest.formalAddress),
      ),
    }))
    .sort((left, right) => left.distance - right.distance || left.address.localeCompare(right.address))
    .slice(0, 3)
    .map((suggestion) => suggestion.address);

  return {
    error: `No safe formal-address match for ${sourceParty}.${
      suggestions.length > 0 ? ` Suggestions: ${suggestions.join(' | ')}` : ''
    }`,
    ok: false,
  };
}

function rsvpResolvePartyMembers_(lead, guests, partySize) {
  if (partySize <= 1) {
    return { members: [lead], missingMembers: 0, ok: true };
  }
  if (!lead.household) {
    return {
      error: `Party lead ${lead.name} has no household value for companion matching.`,
      ok: false,
    };
  }

  const householdKey = rsvpNormalizeComparison_(lead.household);
  const candidates = guests
    .filter(
      (guest) =>
        guest.rowNumber !== lead.rowNumber &&
        rsvpNormalizeComparison_(guest.household) === householdKey &&
        rsvpNormalizeComparison_(guest.invite) === 'yes',
    )
    .map((guest) => ({
      guest,
      score: rsvpScoreNameAgainstFormal_(guest.name, lead.formalAddress),
    }))
    .filter((candidate) => candidate.score >= 4)
    .sort(
      (left, right) =>
        right.score - left.score || left.guest.rowNumber - right.guest.rowNumber,
    );

  const companionCount = partySize - 1;
  if (
    candidates.length > companionCount &&
    candidates[companionCount - 1] &&
    candidates[companionCount] &&
    candidates[companionCount - 1].score === candidates[companionCount].score
  ) {
    return {
      error: `Companion matching is ambiguous for ${lead.formalAddress}.`,
      ok: false,
    };
  }

  const companions = candidates.slice(0, companionCount).map((candidate) => candidate.guest);
  return {
    members: [lead, ...companions],
    missingMembers: Math.max(0, companionCount - companions.length),
    ok: true,
  };
}

function rsvpScoreNameAgainstFormal_(name, formalAddress) {
  const normalizedName = rsvpNormalizePersonName_(name);
  const normalizedFormal = rsvpNormalizePersonName_(formalAddress);
  if (!normalizedName) return 0;
  if (normalizedFormal.includes(normalizedName)) return 12;

  const nameTokens = normalizedName.split(' ').filter(Boolean);
  const formalTokens = normalizedFormal.split(' ').filter(Boolean);
  if (nameTokens.length === 0) return 0;

  const firstName = nameTokens[0];
  const lastName = nameTokens[nameTokens.length - 1];
  let score = 0;
  if (formalTokens.includes(firstName)) {
    score += 5;
  } else if (formalTokens.some((token) => rsvpEditDistance_(token, firstName) === 1)) {
    score += 2;
  }

  if (nameTokens.length > 1 && formalTokens.includes(lastName)) {
    score += 4;
  } else if (
    nameTokens.length > 1 &&
    formalTokens.some((token) => rsvpEditDistance_(token, lastName) === 1)
  ) {
    score += 2;
  }

  return score;
}

function rsvpResolveAttendanceCount_(rawCount, weddingAnswer) {
  const countText = String(rawCount || '').trim();
  const answer = rsvpNormalizeComparison_(weddingAnswer);
  const saysNo = /(^|\s)(no|declined|decline)(\s|$)/.test(answer) || answer.includes('not attending');
  const saysYes = /(^|\s)yes(\s|$)/.test(answer);

  if (!countText) {
    if (saysNo) return { count: 0, ok: true };
    if (saysYes) return { error: 'Wedding answer is Yes but attending count is blank.', ok: false };
    return { error: 'Attending count and wedding answer are both blank.', ok: false };
  }

  if (!/^\d+$/.test(countText)) {
    return { error: `Invalid attending count: ${countText}`, ok: false };
  }

  const count = Number(countText);
  if (saysNo && count > 0) {
    return { error: `Wedding answer is No but attending count is ${count}.`, ok: false };
  }
  if (saysYes && count === 0) {
    return { error: 'Wedding answer is Yes but attending count is 0.', ok: false };
  }

  return { count, ok: true };
}

function rsvpReadGuestModel_(sheet) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow < 2 || lastColumn < 1) {
    throw new Error('The guest-list tab has no data rows.');
  }

  const values = sheet.getRange(1, 1, lastRow, lastColumn).getDisplayValues();
  const headerIndex = {};
  values[0].forEach((header, index) => {
    headerIndex[String(header).trim()] = index;
  });
  const requiredHeaders = [
    'Name',
    'Household Name',
    'Formal Address',
    'Invite?',
    'RSVP Status (Individual)',
  ];
  requiredHeaders.forEach((header) => {
    if (headerIndex[header] === undefined) {
      throw new Error(`Missing required guest-list column: ${header}`);
    }
  });

  const statusIndex = headerIndex['RSVP Status (Individual)'];
  const validations = sheet.getRange(2, statusIndex + 1, lastRow - 1, 1).getDataValidations();
  const guests = values.slice(1).map((row, index) => ({
    formalAddress: String(row[headerIndex['Formal Address']] || '').trim(),
    household: String(row[headerIndex['Household Name']] || '').trim(),
    invite: String(row[headerIndex['Invite?']] || '').trim(),
    name: String(row[headerIndex.Name] || '').trim(),
    rowNumber: index + 2,
    status: String(row[statusIndex] || '').trim(),
    validationValid: rsvpValidationAllowsStatuses_(validations[index][0]),
  }));

  return {
    guests,
    statusColumn: statusIndex + 1,
    statusColumnLetter: rsvpColumnLetter_(statusIndex + 1),
  };
}

function rsvpValidationAllowsStatuses_(validation) {
  if (!validation) return false;
  if (validation.getCriteriaType() !== SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST) {
    return false;
  }

  const criteria = validation.getCriteriaValues();
  const values = Array.isArray(criteria[0]) ? criteria[0].map(String) : [];
  return RSVP_CONFIG.allowedStatuses.every((status) => values.includes(status));
}

function rsvpReadOverrides_(spreadsheet) {
  const overrides = { ...RSVP_CONFIG.seededOverrides };
  const sheet = spreadsheet.getSheetByName(RSVP_CONFIG.auditSheetName);
  if (!sheet || sheet.getLastRow() < 2) return overrides;

  const values = sheet.getDataRange().getDisplayValues();
  const sourcePartyIndex = values[0].indexOf('Source Party');
  const overrideIndex = values[0].indexOf('Manual Formal Address Override');
  if (sourcePartyIndex < 0 || overrideIndex < 0) return overrides;

  values.slice(1).forEach((row) => {
    const sourceParty = String(row[sourcePartyIndex] || '').trim();
    const override = String(row[overrideIndex] || '').trim();
    if (sourceParty && override) {
      overrides[rsvpNormalizeComparison_(sourceParty)] = override;
    }
  });
  return overrides;
}

function rsvpWriteAudit_(spreadsheet, preview) {
  let sheet = spreadsheet.getSheetByName(RSVP_CONFIG.auditSheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(RSVP_CONFIG.auditSheetName);

  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.clear();
  sheet.setConditionalFormatRules([]);

  const values = [
    RSVP_AUDIT_HEADERS.slice(),
    ...preview.auditRows.map((auditRow) => [
      preview.runId,
      preview.fileName,
      preview.checksum,
      auditRow.sourceRow,
      auditRow.submissionDate,
      auditRow.party,
      auditRow.attendingCountRaw,
      auditRow.weddingAnswer,
      auditRow.welcomePartyAnswer,
      auditRow.email,
      auditRow.selection,
      auditRow.matchMethod,
      auditRow.matchedFormalAddress,
      auditRow.matchedMembers,
      auditRow.existingStatuses,
      auditRow.proposedChanges,
      auditRow.result,
      auditRow.notes,
      auditRow.manualOverride,
    ]),
  ];

  const range = sheet.getRange(1, 1, values.length, RSVP_AUDIT_HEADERS.length);
  range.setValues(values);
  range.setVerticalAlignment('top');
  range.setWrap(true);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, RSVP_AUDIT_HEADERS.length)
    .setBackground('#e5e7eb')
    .setFontWeight('bold')
    .setWrap(true);
  range.createFilter();

  const widths = [150, 210, 230, 85, 120, 330, 110, 180, 220, 240, 115, 130, 330, 260, 300, 380, 145, 380, 330];
  widths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));

  if (values.length > 1) {
    const resultRange = sheet.getRange(2, 17, values.length - 1, 1);
    const rules = [
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextContains('Error')
        .setBackground('#fce8e6')
        .setRanges([resultRange])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextContains('warning')
        .setBackground('#fef7e0')
        .setRanges([resultRange])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextContains('Ready')
        .setBackground('#e6f4ea')
        .setRanges([resultRange])
        .build(),
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextContains('Applied')
        .setBackground('#d2e3fc')
        .setRanges([resultRange])
        .build(),
    ];
    sheet.setConditionalFormatRules(rules);
  }
}

function rsvpStorePreviewPlan_(preview) {
  const plan = {
    appliedAt: '',
    changes: preview.changes,
    checksum: preview.checksum,
    createdAt: new Date().toISOString(),
    fileName: preview.fileName,
    runId: preview.runId,
    summary: preview.summary,
  };
  PropertiesService.getDocumentProperties().setProperty(
    RSVP_CONFIG.propertyKey,
    JSON.stringify(plan),
  );
}

function rsvpLoadPreviewPlan_() {
  const value = PropertiesService.getDocumentProperties().getProperty(RSVP_CONFIG.propertyKey);
  return value ? JSON.parse(value) : null;
}

function rsvpMarkAuditApplied_(spreadsheet, plan) {
  const sheet = spreadsheet.getSheetByName(RSVP_CONFIG.auditSheetName);
  if (!sheet || sheet.getLastRow() < 2) return;

  const range = sheet.getDataRange();
  const values = range.getValues();
  const runIndex = values[0].indexOf('Run ID');
  const selectionIndex = values[0].indexOf('Selection');
  const resultIndex = values[0].indexOf('Result');
  const notesIndex = values[0].indexOf('Notes');
  const appliedLabel = `Applied at ${plan.appliedAt}`;

  values.slice(1).forEach((row) => {
    if (row[runIndex] !== plan.runId || row[selectionIndex] !== 'Selected') return;
    if (String(row[resultIndex]).startsWith('Ready')) row[resultIndex] = 'Applied';
    row[notesIndex] = [row[notesIndex], appliedLabel].filter(Boolean).join(' ');
  });

  range.setValues(values);
}

function rsvpCreateAuditRow_(sourceRow, overrides) {
  return {
    attendingCountRaw: sourceRow.attendingCountRaw,
    email: sourceRow.email,
    existingStatuses: '',
    manualOverride: '',
    matchedFormalAddress: '',
    matchedMembers: '',
    matchMethod: '',
    notes: '',
    party: sourceRow.party,
    proposedChanges: '',
    result: '',
    selection: '',
    sourceRow: sourceRow.sourceRow,
    submissionDate: sourceRow.submissionDate,
    weddingAnswer: sourceRow.weddingAnswer,
    welcomePartyAnswer: sourceRow.welcomePartyAnswer,
    ...overrides,
  };
}

function rsvpHeaderSemanticKey_(header) {
  const normalized = rsvpNormalizeComparison_(header);
  if (normalized === 'submission date') return 'submissionDate';
  if (normalized.startsWith('please search for your party to rsvp for below')) return 'party';
  if (normalized.startsWith('how many from your party will be attending the wedding')) {
    return 'attendingCount';
  }
  if (normalized.startsWith('will you be attending the wedding')) return 'weddingAnswer';
  if (normalized.startsWith('will you be attending the welcome party on friday')) {
    return 'welcomePartyAnswer';
  }
  if (normalized.startsWith('optional what is your email')) return 'email';
  return '';
}

function rsvpNormalizeComparison_(value) {
  return String(value || '')
    .replace(/\u00a0/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\b(mr|mrs|ms|miss|dr)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function rsvpNormalizePartyIdentity_(value) {
  return rsvpNormalizeComparison_(value).replace(/\bparty of \d+\b/g, '').trim();
}

function rsvpNormalizePersonName_(value) {
  return rsvpNormalizePartyIdentity_(value)
    .replace(/\b(jr|sr|ii|iii|iv)\b/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function rsvpParsePartySize_(value) {
  const match = String(value || '').match(/party\s+of\s+(\d+)/i);
  return match ? Number(match[1]) : 0;
}

function rsvpParseSubmissionDateKey_(value) {
  const match = String(value || '').trim().match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) throw new Error(`Invalid submission date: ${value}`);

  const months = {
    apr: 4,
    aug: 8,
    dec: 12,
    feb: 2,
    jan: 1,
    jul: 7,
    jun: 6,
    mar: 3,
    may: 5,
    nov: 11,
    oct: 10,
    sep: 9,
  };
  const month = months[match[1].slice(0, 3).toLowerCase()];
  if (!month) throw new Error(`Invalid submission month: ${value}`);
  return Number(match[3]) * 10000 + month * 100 + Number(match[2]);
}

function rsvpEditDistance_(leftValue, rightValue) {
  const left = String(leftValue || '');
  const right = String(rightValue || '');
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitutionCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + substitutionCost,
      );
    }
    previous.splice(0, previous.length, ...current);
  }

  return previous[right.length];
}

function rsvpCell_(row, index) {
  if (index === undefined) return '';
  return String(row[index] || '').trim();
}

function rsvpColumnLetter_(columnNumber) {
  let value = columnNumber;
  let result = '';
  while (value > 0) {
    const remainder = (value - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    value = Math.floor((value - 1) / 26);
  }
  return result;
}

function rsvpSha256_(value) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    value,
    Utilities.Charset.UTF_8,
  );
  return digest
    .map((byte) => ((byte < 0 ? byte + 256 : byte).toString(16).padStart(2, '0')))
    .join('');
}

// Existing bound-script utility preserved during RSVP Sync installation.
function sortWeddingGuestList() {
  const sheetName = 'Wedding Guest List';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());

  dataRange.sort([
    { column: 4, ascending: true },
    { column: 5, ascending: true },
    { column: 2, ascending: true },
  ]);

  SpreadsheetApp.getUi().alert('Guest list sorted!');
}
