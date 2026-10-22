# Tracker: docket

Tasks live in the repo's docket store. The `docket` skill covers the CLI and its rules; this file only maps dev-mode's tracker operations onto it. Writes are local, so showing the draft of a new task is the only approval step.

## Create

`docket create "<title>" --file <body.md>`.

## Read

`docket show <ID>`.

## List

Ready to work: `docket ready --status ready-for-agent`. Untriaged: `docket ls --status open`. Any other state: `docket ls --status <state>`.

## Claim

`docket set <ID> status in_progress`, then `docket set <ID> branch <branch>` and `docket set <ID> worktree <path>`.

## Note

`docket note <ID> "<text>"`.

## Split

`docket create "<title>" --parent <ID> --dep <blocker-ID> --file <body.md>`, with `--dep` repeated per blocker.

## Set state

`docket set <ID> status <state>`, using the triage state names as statuses, except `needs-triage`, which is docket's default `open`.

## Close

`docket close <ID>`. For `wontfix`, first `docket set <ID> resolution wontfix` and note the reason.
