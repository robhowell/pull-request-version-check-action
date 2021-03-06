# Pull Request Version Check

Making it simple to automatically bump versions of JavaScript projects based on Pull Request name, using GitHub Actions.

This is a [Github Action](https://github.com/features/actions) that ensures that your PR title starts with `patch:`, `minor:` or `major:`.

This is helpful when you're using [semantic-release](https://github.com/semantic-release/semantic-release), to support the three prefixes above. When using the "Squash and merge" strategy, Github will suggest to use the PR title as the commit message. With this action you can validate that the PR title will lead to a correct commit message.

## How to setup this action

If you haven't used GitHub Actions before, create a file named `pull-request-version-check.yml` at the following path:

- `.github/workflows/pull-request-version-check.yml`

Add the following contents to the file:

```yml
name: 'Pull Request Version Check'
on:
  pull_request:
    types:
      - opened
      - edited
      - synchronize

jobs:
  version-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Pull Request Version Check
        uses: robhowell/pull-request-version-check-action@v2.0.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## How to configure Semantic Release on your mainline branch

Install `semantic-release` and plugins as `devDependencies` in your project:

- `npm --save-dev semantic-release @semantic-release/changelog @semantic-release/commit-analyzer @semantic-release/git @semantic-release/release-notes-generator`
- Create `release.yml` file based on the [release.yml](.github/workflows/release.yml) file in this repo

## Examples for valid PR titles

- patch: Correct typo.
- minor: Add support for Node 12.
- major: Drop support for Node 8.

## Prior art

- Initial version forked from [amannn/pull-request-version-check-action](https://github.com/amannn/pull-request-version-check-action)
- Thanks to [zeke/semantic-pull-requests](https://github.com/zeke/semantic-pull-requests) for the idea of defining versions using pull request titles instead of commit messages
- Thanks to [semantic-release/semantic-release](https://github.com/semantic-release/semantic-release) for the fantastic Semantic Release module!
