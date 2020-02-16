const core = require('@actions/core');
const github = require('@actions/github');
const validatePrTitle = require('./validatePrTitle');
const execShell = require('exec-sh').promise;

const run = async () => {
  try {
    const client = new github.GitHub(process.env.GITHUB_TOKEN);

    const pullRequestContext = github.context.payload.pull_request;
    if (!pullRequestContext) {
      throw new Error(
        "This action can only be invoked in `pull_request` events. Otherwise the pull request can't be inferred."
      );
    }

    const owner = pullRequestContext.base.user.login;
    const repo = pullRequestContext.base.repo.name;

    // The pull request info on the context isn't up to date. When
    // the user updates the title and re-runs the workflow, it would
    // be outdated. Therefore fetch the pull request via the REST API
    // to ensure we use the current title.
    const { data: pullRequestData } = await client.pulls.get({
      owner,
      repo,
      pull_number: pullRequestContext.number
    });

    const { data: commitsData } = await client.request(
      'GET /repos/:owner/:repo/pulls/:pull_number/commits',
      {
        owner,
        repo,
        pull_number: pullRequestContext.number
      }
    );

    if(true || commitsData.length === 1) {
      console.log('Only one commit found. Creating second commit to fix squash-and-merge commit message issue - see https://github.com/robhowell/pull-request-version-check-action');

      const commitUser = commitsData[0].commit.author || commitsData[0].commit.committer;
  
      console.log(`repo URL = github.com/${process.env.GITHUB_REPOSITORY}.git`);

      await execShell([
        `git config user.email "${commitUser.email}"`,
        `git config user.name "${commitUser.name}"`,
        `git clone https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`,
        `git checkout master`,
        `git commit -m "Empty commit\n[skip-ci]" --allow-empty`,
        `git push origin master`
      ]);
    }


    await validatePrTitle(pullRequestData.title);
  } catch (error) {
    core.setFailed(error.message);
  }
};

module.exports = run;
