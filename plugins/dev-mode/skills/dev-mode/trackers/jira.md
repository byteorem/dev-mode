# Tracker: Jira

Issues live in the Jira project named on the block's `Tracker:` line. Jira is used for basic tracking only: issues, sub-tasks, comments, and the To Do / In Progress / Done statuses. No labels, links, branch integration, or workflow automation. Use the Jira access the session has: an Atlassian MCP server, the `acli` CLI, or a Jira skill. With none, draft the text for the user to paste. Every write here is visible to others, so show it and wait for the user's yes, per the router.

## Create

An issue in the project, with the title as the summary and the task body as the description.

## Read

The issue's description, comments, status, and sub-tasks.

## List

Open issues in the project assigned to the user: `project = <KEY> AND assignee = currentUser() AND statusCategory != Done`. Read each one's `State:` line for its triage state.

## Claim

Assign the issue to the user and move it to In Progress.

## Note

A comment on the issue.

## Split

A sub-task under the parent for each slice. Put `Blocked by: <KEY-n>, <KEY-n>` as the first line of its description, creating blockers first.

## Set state

Write `State: <state>` as the first line of the description, replacing any earlier one. The status stays To Do until the issue is claimed.

## Close

Move to Done, only when the user says the work is done. For `wontfix`, comment the reason first.
