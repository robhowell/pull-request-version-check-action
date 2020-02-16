# Pull Request Version Check

Making it simple to automatically bump versions of JavaScript projects based on Pull Request name, using GitHub Actions.

This is a [Github Action](https://github.com/features/actions) that ensures that your PR title starts with `patch:`, `minor:` or `major:`.

This is helpful when you're using [semantic-release](https://github.com/semantic-release/semantic-release), to support the three prefixes above. When using the "Squash and merge" strategy, Github will suggest to use the PR title as the commit message. With this action you can validate that the PR title will lead to a correct commit message.

## Example

```yml
name: "Lint PR"
on:
  pull_request:
    types:
      - opened
      - edited
      - synchronize

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: robhowell/pull-request-version-check-action@v1.0.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Examples for valid PR titles:

- patch: Correct typo.
- minor: Add support for Node 12.
- major: Drop support for Node 8.

Additionally, the special `[WIP]` prefix is supported, to indicate that a pull request is work in progress and isn't ready to be merged. In this case the PR title isn't validated and the pull request checks remain pending.

## Prior art

- Initial version forked from [amannn/puill-request-version-check-action](https://github.com/amannn/puill-request-version-check-action)
- Thanks to [zeke/semantic-pull-requests](https://github.com/zeke/semantic-pull-requests) for the idea of defining versions using pull request titles instead of commit messages
- Thanks to [semantic-release/semantic-release](https://github.com/semantic-release/semantic-release) for the fantastic Semantic Release module!
