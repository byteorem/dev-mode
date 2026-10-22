---
name: to-task
description: Turn the settled conversation, a plan, or a ticket into a task in the repo's tracker, split into blocked subtasks when it won't fit one session.
disable-model-invocation: true
argument-hint: "[plan path or ticket ID]"
---

# to-task

Turn what's already settled into a task a fresh session can pick up cold. Synthesize. Don't interview.

## Steps

1. **Tracker known.** Read the `Tracker:` line of the repo's `## dev-mode` block and open its file in [../dev-mode/trackers/](../dev-mode/trackers/). No block → `todo`. Every operation named below is a heading in that file.

2. **Source gathered.** Work from the conversation. If the argument names a plan file or a ticket, read all of it, comments included. A decision that changes what gets built is still open → run `align` first.

3. **Code read** enough that the task uses the codebase's own names and points at the real seam. Look for a prefactor that makes the change easy, and make it the first slice.

4. **Task drafted** on the template below. Done when every acceptance criterion can be shown true or false by a test, a run, or a query.

5. **Split if needed.** If the work won't fit one fresh session, cut it into _tracer bullets_: each slice a narrow path through every layer that can be verified on its own. Prefactors go first. Give each slice its blockers: the slices that must finish before it can start. A wide mechanical change goes expand, migrate in batches, contract, per `principle-migrate-callers-then-delete`.

   Show the slices as a numbered list: title, blocked by, and what it delivers. Ask whether the granularity and the blocking edges are right. Iterate until the user approves.

6. **Published.** Show the final draft, then **Create** the task, and **Split** for each slice, blockers first so edges point at real IDs. **Set state** to `ready-for-agent`, or `ready-for-human` when it needs the user's judgment, access, or hands. Leave a source ticket as it was, apart from linking the new task to it.

## Template

```markdown
## Goal

What is true when this is done, from the user's side. One or two sentences.

## Context

Current behavior and why it changes. Link the source: ticket, plan, or PR.

## Decisions

What was settled, so a fresh session doesn't re-decide it. Name types, functions, procs, and config keys rather than paths and line numbers, which go stale before the task is picked up.

## Acceptance

- [ ] A criterion a test, run, or query can show true or false

## Verify

How to prove it: the test, the verify skill, or the SQL for the user to run.

## Out of scope

- Adjacent work this task leaves alone
```

A subtask keeps Goal, Acceptance, and Verify, and points at the parent for the rest.

Reply: the task and subtask IDs or links, the blocking edges, and which slices can start now.

---

Adapted from [mattpocock/skills to-spec](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/to-spec/SKILL.md) and [to-tickets](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/to-tickets/SKILL.md), aligned to 5beb35b. Merged into one skill: the spec is the parent task and the tickets are its subtasks. The template, the `align` hand-off, and the tracker files are local.
