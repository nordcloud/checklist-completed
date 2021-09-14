const core = require("@actions/core");
const github = require("@actions/github");

const checkOutstandingTasks = require("./check-outstanding-tasks");

function run() {
  try {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const myToken = core.getInput("myToken");

    const payload = github.context.payload;
    payload.pull_request;

    const octokit = github.getOctokit(myToken);

    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

    const startTime = new Date().toISOString();

    const { pull_request } = github.context.payload;

    const outstandingTasks = checkOutstandingTasks(pull_request.body);

    if (outstandingTasks.remaining > 0) {
      core.setFailed(`Remaining checklist tasks: ${outstandingTasks.remaining}`);
    }

    // send check back to GitHub
    core.notice("Success");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
