# Tracker: GitHub Issues

Issues live in the repo's GitHub Issues, through the `gh` CLI, which infers the repo inside a clone. Every write here is public or shared, so show it and wait for the user's yes, per the router. Pass bodies with `--body-file` from a scratch file. GitHub is used for basic tracking only: issues, comments, assignees, and GitHub's default labels. No custom labels or Projects.

## Create

`gh issue create --title "<title>" --body-file <body.md>`.

## Read

`gh issue view <n> --json number,title,body,state,labels,assignees,comments`.

## List

Untriaged: `gh issue list --search "-label:bug -label:enhancement -label:documentation -label:question"`. Waiting on info: `gh issue list --label question`. Ready: `gh issue list --search "-label:question"`, keeping those with a type label.

## Claim

`gh issue edit <n> --add-assignee @me`, then comment the branch name.

## Note

`gh issue comment <n> --body-file <note.md>`.

## Split

`gh issue create --parent <n> --blocked-by <blocker>,<blocker> ...`, creating blockers first so the numbers exist. Native sub-issues and dependencies need `gh` 2.94 or later. On older versions, put `Part of #<n>` and `Blocked by: #<n>` at the top of the body.

## Set state

A type label marks the issue triaged: `bug`, `enhancement`, or `documentation`. `needs-info` adds `question`, and removes it once answered. `ready-for-agent` and `ready-for-human` look the same on GitHub, so the brief says which. `wontfix` is **Close**. Use `gh issue edit <n> --add-label <label> --remove-label <label>`, and never create a label.

## Close

`gh issue close <n> --comment "<what landed>"`. For `wontfix`, add `--reason "not planned"` and the `wontfix`, `duplicate`, or `invalid` label that fits.

---

Adapted from [mattpocock/skills setup-matt-pocock-skills/issue-tracker-github.md](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/setup-matt-pocock-skills/issue-tracker-github.md), aligned to 5beb35b. The operation headings, the `gh` 2.94+ blocking flags, and tracking state with only default labels are local.
