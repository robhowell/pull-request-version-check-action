const validatePrTitle = require('./validatePrTitle');

it('detects valid PR titles', async () => {
  const inputs = [
    'patch: Fix bug',
    'minor: Add feature',
    'major: Drop support for Node 6'
  ];

  for (const input of inputs) {
    await validatePrTitle(input);
  }
});

it('throws for PR titles without a type', async () => {
  await expect(validatePrTitle('Fix bug')).rejects.toThrow(
    /No release type found in pull request title "Fix bug"./
  );
});

it('throws for PR titles with an unknown type', async () => {
  await expect(validatePrTitle('foo: Bar')).rejects.toThrow(
    /Unknown release type "foo" found in pull request title "foo: Bar"./
  );
});
