---
name: setup
description: Configure a repo for dev-mode by picking its task tracker and where the config lives, then writing the repo's dev-mode block.
disable-model-invocation: true
---

# setup

Write the repo's `## dev-mode` block: the data the router, `to-task`, and `triage` read to know where this repo's work is tracked. Explore first, confirm with the user, then write.

## The block

```markdown
## dev-mode

- Tracker: jira, project PAY
```

- `Tracker:` names a file in [../dev-mode/trackers/](../dev-mode/trackers/): `docket`, `jira` with its project key, `github`, or `todo`.
- `States:` maps `triage`'s state names to GitHub labels the repo already uses. Leave the line out when the defaults stand.

## Steps

1. **Explore.** Read what the repo already says, and assume nothing:
   - `git remote -v`: host, and whether the owner is the user's own git identity.
   - `CLAUDE.md`, `AGENTS.md`, `CLAUDE.local.md`, and any `## dev-mode` block already in them. A re-run edits that block in place.
   - Tracker signals: Jira keys (`[A-Z]+-\d+`) in branch names and `git log --oneline -50`, a docket store (`docket where`, `docket ls`), open issues (`gh issue list --limit 5`).
   - A `verify-*` skill under `.claude/skills/`.

2. **Ask.** One decision at a time, recommended answer first so the user can accept in a word. Skip any decision exploration already settled.
   - **Tracker.** Jira keys in the history → `jira` with that key. Issues already in use on GitHub → `github`. The user's own repo otherwise → `docket`. `todo` only when they want nothing persisted.
   - **Config home.** The user's own repo, or no remote → the committed instructions file: `CLAUDE.md`, or `AGENTS.md` when `CLAUDE.md` only imports it. Someone else's repo → `CLAUDE.local.md`. If neither `CLAUDE.md` nor `AGENTS.md` exists, ask which to create.
   - **State names.** Only for `github`, and only when the repo already uses its own labels for these states. Collect the mapping so `triage` reuses those labels instead of adding duplicates.

3. **Draft.** Show the block and the file it goes in. Let the user edit it.

4. **Write.** Replace an existing block in place, or append one. Leave the rest of the file as it was.
   - `CLAUDE.local.md`: if `git check-ignore CLAUDE.local.md` finds no rule, add it to `.git/info/exclude` so it stays out of the repo without touching `.gitignore`.
   - `github`: create each state label the repo lacks (`gh label create`), as part of the approved draft.

5. **Offer a verify skill.** No `verify-*` skill and an app that's hard to drive by hand → offer `verification-skill` once. On no, move on.

Reply: the block, the file it went in, and that it applies from the next session, since the instructions file loads at session start.

---

Adapted from [mattpocock/skills setup-matt-pocock-skills](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/setup-matt-pocock-skills/SKILL.md), aligned to 5beb35b. The docket and todo trackers, the per-repo config home, and the verify-skill offer (from pstack's `setup-pstack`) are local. Domain docs and GitLab are left out.
