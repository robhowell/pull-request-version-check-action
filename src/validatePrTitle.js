const allowedTypes = [
  'patch',
  'minor',
  'major'
];

const getPrTypeFromTitle = (prTitle) => {
  if (!prTitle.includes(':')) {
    return null;
  }

  return prTitle.split(':')[0];
}

const validatePrTitle = async (prTitle) => {
  const prType = getPrTypeFromTitle(prTitle);

  if (!prType) {
    throw new Error(
      `No release type found in pull request title "${prTitle}".` +
        '\n\nAdd a prefix of "patch:", "minor:" or "major:" to indicate what kind of release this pull request corresponds to.'
    );
  }

  if (!allowedTypes.includes(prType)) {
    throw new Error(
      `Unknown release type "${prType}" found in pull request title "${prTitle}".` +
        `\n\nPlease use one of these recognized types: ${allowedTypes.join(
          ', '
        )}.`
    );
  }
};

module.exports = validatePrTitle;
