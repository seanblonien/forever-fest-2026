import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const codeUrl = new URL('./Code.gs', import.meta.url);
const source = fs.readFileSync(codeUrl, 'utf8');
const context = vm.createContext({
  Map,
  Number,
  Object,
  Set,
  String,
  console,
});
vm.runInContext(source, context, { filename: 'Code.gs' });

const call = (name, ...args) => {
  const fn = context[name];
  assert.equal(typeof fn, 'function', `Missing ${name}`);
  return fn(...args);
};

const plain = (value) => JSON.parse(JSON.stringify(value));

const makeGuest = ({
  formalAddress = '',
  household,
  invite = 'Yes',
  name,
  rowNumber,
  status = 'Pending',
  validationValid = true,
}) => ({ formalAddress, household, invite, name, rowNumber, status, validationValid });

const csv = [
  '\uFEFF"Submission Date","Please search for your party to RSVP for below\u00a0","How many from your party will be attending the Wedding?","Will you be attending the Wedding?","Will you be attending the Welcome Party on Friday","OPTIONAL: What is your email?"',
  '"Aug 18, 2026","Ms. Alex Example & Mr. Blair Example, Party of 2",1,,"Yes, I\'ll be there","alex@example.com"',
  '"Aug 17, 2026","Ms. Alex Example & Mr. Blair Example, Party of 2",2,,"Yes, I\'ll be there","alex@example.com"',
  '"Aug 16, 2026","Mr. Jordan Guest, Party of 1",2,,"Yes, I\'ll be there","jordan@example.com"',
  '"Aug 15, 2026","Ms. Nadya Sample, Party of 1",1,,"Yes, I\'ll be there","nadya@example.com"',
].join('\r\n');

const guests = [
  makeGuest({
    formalAddress: 'Ms. Alex Example & Mr. Blair Example, Party of 2',
    household: 'Example Household',
    name: 'Alex Example',
    rowNumber: 2,
  }),
  makeGuest({ household: 'Example Household', name: 'Blair Example', rowNumber: 3 }),
  makeGuest({ household: 'Example Household', name: 'Casey Elsewhere', rowNumber: 4 }),
  makeGuest({
    formalAddress: 'Mr. Jordan Guest, Party of 2',
    household: 'Jordan Household',
    name: 'Jordan Guest',
    rowNumber: 5,
  }),
  makeGuest({
    formalAddress: 'Ms. Nadya Sample, Party of 1',
    household: 'Nadya Household',
    name: 'Nadya Sample',
    rowNumber: 6,
  }),
];

const preview = call(
  'rsvpBuildPreview_',
  csv,
  'fixture.csv',
  { guests, statusColumn: 5, statusColumnLetter: 'E' },
  {},
  'run-1',
  'hash',
);

assert.equal(preview.summary.sourceRows, 4);
assert.equal(preview.summary.uniqueParties, 3);
assert.equal(preview.summary.supersededRows, 1);
assert.equal(preview.summary.matchedParties, 3);
assert.equal(preview.summary.proposedAttending, 3);
assert.equal(preview.summary.proposedDeclined, 1);
assert.equal(preview.summary.unrepresentedAttendees, 1);
assert.equal(preview.summary.changedCells, 4);

const changes = new Map(preview.changes.map((change) => [change.name, change.newValue]));
assert.equal(changes.get('Alex Example'), 'Attending');
assert.equal(changes.get('Blair Example'), 'Declined');
assert.equal(changes.has('Casey Elsewhere'), false);
assert.equal(changes.get('Jordan Guest'), 'Attending');
assert.equal(changes.get('Nadya Sample'), 'Attending');

assert.deepEqual(
  plain(call('rsvpParseCsv_', '"a","b,b"\n"1","two"')),
  [
    ['a', 'b,b'],
    ['1', 'two'],
  ],
);
assert.equal(call('rsvpNormalizeComparison_', 'Dr. A & Ms. B'), 'a and b');
assert.equal(
  vm.runInContext(
    "RSVP_CONFIG.seededOverrides[rsvpNormalizeComparison_('Ms. Nadia Benson, Party of 1')]",
    context,
  ),
  'Ms. Nadya Benson, Party of 1',
);
assert.equal(call('rsvpParsePartySize_', 'Person, Party of 3'), 3);
assert.deepEqual(
  plain(call('rsvpResolveAttendanceCount_', '', 'No, we cannot attend')),
  { count: 0, ok: true },
);
assert.equal(call('rsvpResolveAttendanceCount_', '', '').ok, false);
assert.equal(call('rsvpResolveAttendanceCount_', '2', 'No').ok, false);

console.log('RSVP sync tests passed');
