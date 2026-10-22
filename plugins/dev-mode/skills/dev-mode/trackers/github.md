# Tracker: GitHub Issues

Issues live in the repo's GitHub Issues, through the `gh` CLI, which infers the repo inside a clone. Every write here is public or shared, so show it and wait for the user's yes, per the router. Pass bodies with `--body-file` from a scratch file.

## Create

`gh issue create --title "<title>" --body-file <body.md>`.

## Read

`gh issue view <n> --json number,title,body,state,labels,assignees,comments`.

## List

Ready to work: `gh issue list --label ready-for-agent`. Untriaged: `gh issue list --search "-label:needs-info -label:ready-for-agent -label:ready-for-human"`. Any other state: `--label <state>`.

## Claim

`gh issue edit <n> --add-assignee @me`, then comment the branch name.

## Note

`gh issue comment <n> --body-file <note.md>`.

## Split

`gh issue create --parent <n> --blocked-by <blocker>,<blocker> ...`, creating blockers first so the numbers exist. Native sub-issues and dependencies need `gh` 2.94 or later. On older versions, put `Part of #<n>` and `Blocked by: #<n>` at the top of the body.

## Set state

`gh issue edit <n> --add-label <state> --remove-label <other states>`. Create a missing label with `gh label create`.

## Close

`gh issue close <n> --comment "<what landed>"`. For `wontfix`, add `--reason "not planned"`.

---

Adapted from [mattpocock/skills setup-matt-pocock-skills/issue-tracker-github.md](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/setup-matt-pocock-skills/issue-tracker-github.md), aligned to 5beb35b. The operation headings and the `gh` 2.94+ blocking flags are local.
