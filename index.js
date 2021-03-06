const core = require("@actions/core");
const github = require("@actions/github");

const checkOutstandingTasks = require("./check-outstanding-tasks");

function run() {
  try {
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
