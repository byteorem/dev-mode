---
name: dev-mode
description: Entry point for engineering work. Use when the user invokes dev-mode or hands over a task "in dev-mode". Loads repo context, picks a playbook, and stays on for the session.
---

# dev-mode

Once invoked, this stays on for the session. Apply it to work turns. Stay quiet on side questions and chat.

## 1. Repo first

Before picking a playbook, take in what the repo says about itself.

- `CLAUDE.md` and `CLAUDE.local.md` are already in context when present. Their rules beat any default here. Example: "no DB access, return SQL for me to run in SSMS."
- If neither exists, say so once and carry on.
- No `## dev-mode` block in them → mention `/dev-mode:setup` once.
- Decide with this repo's constraints in mind, not general best practice. Legacy code is load-bearing until shown otherwise.

## 2. Pick a playbook

State the pick in one line, e.g. `bug-fix: totals page shows wrong sum`, so a wrong pick is fixed in one word.

| Playbook | When | File |
|---|---|---|
| investigate | A question. No code changes. | [playbooks/investigate.md](playbooks/investigate.md) |
| bug-fix | Something is broken. | [playbooks/bug-fix.md](playbooks/bug-fix.md) |
| change | A feature, tweak, or refactor. | [playbooks/change.md](playbooks/change.md) |
| open-pr | A verified local branch is ready to go up. | [playbooks/open-pr.md](playbooks/open-pr.md) |
| authoring-a-skill | Writing or changing a skill, agent, or playbook. | [playbooks/authoring-a-skill.md](playbooks/authoring-a-skill.md) |
| figure-it-out | Nothing above fits, or the work is large, cross-repo, or long-running. | [playbooks/figure-it-out.md](playbooks/figure-it-out.md) |

Copy the playbook's steps into the todo list. Steps are outcomes; pick the method. Skip any step that doesn't fit and leave it visible as `skip: <reason>`.

## Always-on rules

- Unfamiliar code and a non-trivial change → run `how` first.
- Spec is ambiguous or has several reasonable readings → run `align`. Don't guess.
- Change touches shared code, a stored proc, config, or anything another page or app uses → run `blast-radius`.
- Before saying done → apply `principle-prove-it-works`.
- Proving it means driving the app, or the change touches code a project-local verify skill covers → follow that skill. No verify skill and the app is hard to drive by hand → offer `verification-skill`.
- Change is wide or risky, and about to go up as a PR → run `interrogate` first.
- Data is needed, or a change targets a shared database → write the SQL for the user to run. Never run it yourself, and never assume what the data looks like.
- About to push, or to create, edit, comment on, or merge a PR → show what will go up and wait for the user's yes.
- About to deploy, trigger a workflow run, update Jira, Confluence, or ServiceNow, send an email or Teams message, or submit a change request or a request to another team → show the draft and wait for the user's yes.
- About to create, edit, or move persistent memory → show the change and wait for the user's yes.
- About to delete a branch or worktree with unmerged or uncommitted work → ask first.
- Local, undoable work (reading, local branches and commits, worktrees, builds, local runs) → go ahead without asking.
- The user is away when a yes is needed → wait. Don't route around it.
- Task finished or abandoned → offer `cleanup`.

## Tasks

Multi-step or multi-session work gets a task. Single-turn work doesn't.

- Use the tracker on the `Tracker:` line of the repo's `## dev-mode` block, through its file in [trackers/](trackers/). No block → [trackers/todo.md](trackers/todo.md).
- Create tasks per [to-task](../to-task/SKILL.md), which drafts and shows them first.
- Picking up a task with no acceptance criteria or an unchecked claim → [triage](../triage/SKILL.md) it first.
- Claim it. Record the branch and worktree path on it.
- Pausing: commit work in progress, then leave a resume note: intent, done, verified, next, gotchas.
- Picking up: the task, branch, and git log are the source of truth. Re-verify inherited claims before building on them.

## Subagents

- Spawn `dev-mode:dev-mode-agent` for any subagent inside a playbook step, unless a technique names its own type, as `interrogate` does. It preloads this router; `general-purpose` doesn't, and drifts.
- Spawn a fresh one per task. Brief it with the scope, file pointers, and how to know it's done.
- You own its work. Check its diff and evidence before reporting them as yours.

## Principles

Each principle is a user-invoked skill at `../principle-<name>/SKILL.md` from this file. They carry no description in the session, so read the file directly when its trigger applies. Cite a principle only when it changes a decision, name the decision, and cite only principles whose SKILL.md you read this session.

| Principle | Apply when |
|---|---|
| [principle-boundary-discipline](../principle-boundary-discipline/SKILL.md) | Deciding where new logic or I/O goes |
| [principle-build-the-lever](../principle-build-the-lever/SKILL.md) | Doing the same manual step a third time |
| [principle-encode-lessons-in-structure](../principle-encode-lessons-in-structure/SKILL.md) | A mistake repeats or a lesson is learned |
| [principle-fix-root-causes](../principle-fix-root-causes/SKILL.md) | A fix works but the cause isn't named |
| [principle-foundational-thinking](../principle-foundational-thinking/SKILL.md) | Choosing core types and data shapes, or what lands first |
| [principle-guard-the-context-window](../principle-guard-the-context-window/SKILL.md) | Reading large files, logs, or result sets |
| [principle-laziness-protocol](../principle-laziness-protocol/SKILL.md) | About to hand the user a step you could do, or say "probably" |
| [principle-make-operations-idempotent](../principle-make-operations-idempotent/SKILL.md) | Writing a script, job, migration, or deploy step that can rerun or crash halfway |
| [principle-migrate-callers-then-delete](../principle-migrate-callers-then-delete/SKILL.md) | Replacing a function, proc, or API |
| [principle-minimize-reader-load](../principle-minimize-reader-load/SKILL.md) | Writing anything a person reads |
| [principle-model-the-domain](../principle-model-the-domain/SKILL.md) | Writing stateful logic, or code that branches a lot or repeats a shape assumption |
| [principle-prove-it-works](../principle-prove-it-works/SKILL.md) | Before declaring a task done |
| [principle-redesign-from-first-principles](../principle-redesign-from-first-principles/SKILL.md) | A fix needs a third workaround |
| [principle-separate-before-serializing-shared-state](../principle-separate-before-serializing-shared-state/SKILL.md) | Concurrent actors might write the same file, branch, row, or state |
| [principle-sequence-verifiable-units](../principle-sequence-verifiable-units/SKILL.md) | Planning more than one step |
| [principle-subtract-before-you-add](../principle-subtract-before-you-add/SKILL.md) | About to add code, config, files, or steps |
| [principle-test-behavior-not-implementation](../principle-test-behavior-not-implementation/SKILL.md) | Writing a test or guard |

## Reply

Every final answer covers: what was done, the evidence, what's left, and anything waiting on the user's approval. The playbook's `Reply:` line adds to this.

## Improving

When something in this plugin caused a mistake, propose a small edit to the file at fault. The user accepts or rejects it on the spot. A correction made twice becomes structure: a check, a script, or a test. Ship system fixes separately from task work. For a deeper look back, the user runs [retro](../retro/SKILL.md).
