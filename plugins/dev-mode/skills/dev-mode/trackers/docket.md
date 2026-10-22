# Tracker: docket

Tasks live in the repo's docket store under `.git/docket/`, shared by every worktree. The `docket` skill covers the CLI. This file maps dev-mode's tracker operations onto it. Writes are local, so showing the draft of a new task is the only approval step.

## Create

`docket create "<title>" --file <body.md>`. Write the body to a scratch file first. Piped stdin can hang.

## Read

`docket show <ID>` prints the body and notes, plus the parent, blockers, and subtasks.

## List

Ready to work: `docket ready`. Untriaged: `docket ls --status open`. Any other state: `docket ls --status <state>`.

## Claim

`docket set <ID> status in_progress`, then `docket set <ID> branch <branch>` and `docket set <ID> worktree <path>`.

## Note

`docket note <ID> "<text>"`. Resume notes and triage notes go here.

## Split

`docket create "<title>" --parent <ID> --dep <blocker-ID> --file <body.md>`, with `--dep` repeated per blocker. Create blockers first so each `--dep` names a real ID.

## Set state

`docket set <ID> status <state>`, using the triage state names as statuses. `open` counts as `needs-triage`.

## Close

`docket close <ID>`. For `wontfix`, first `docket set <ID> resolution wontfix` and note the reason.
