---
name: triage
description: Get tracker tasks ready to work by showing what needs attention, checking a task's claim, and writing its brief or the questions it's missing.
disable-model-invocation: true
argument-hint: "[task ID, or what to look at]"
---

# triage

Move tasks in the repo's tracker through a small state machine until each one is ready to work or closed. The tracker is the one on the `Tracker:` line of the repo's `## dev-mode` block, through its file in [../dev-mode/trackers/](../dev-mode/trackers/). Operations named below are headings in that file. `todo` keeps no states, so triage there ends with the brief or questions in the reply.

## States

| State | Meaning |
|---|---|
| `needs-triage` | Not looked at yet |
| `needs-info` | Open questions are recorded on the task |
| `ready-for-agent` | Brief attached. An agent can take it. |
| `ready-for-human` | Brief attached, but it needs the user's judgment, access, or hands |
| `wontfix` | Closed with the reason |

A task holds one state. `needs-info` returns to `needs-triage` once the questions are answered. The user can override any transition.

On Jira and GitHub, start every comment triage writes with `> Written by an agent during triage.`

## What needs attention

**List** untriaged tasks, then `needs-info` tasks with activity since the last triage notes, oldest first. Show the count and one line per task, and let the user pick.

## Triage one task

1. **Read** it in full: body, comments, notes, and any earlier triage notes. A question those notes settled stays settled.
2. **Already built?** Search the code for the behavior by concept, not by the task's wording, and say where you looked. Found → `wontfix` as already built, pointing at where it lives.
3. **Claim checked.** A bug gets reproduced (`diagnose` when the repro isn't trivial). A change gets its current behavior confirmed. Report one of: confirmed, with the code path; not reproduced; or not enough detail, which points to `needs-info`.
4. **Recommend** the playbook (`bug-fix`, `change`, or `investigate`) and the target state, with one line of why. Wait for the user's direction.
5. **Gaps closed.** Open decisions go to `align`, one round at a time.
6. **Applied**, after the user sees each write:
   - `ready-for-agent`: replace the body, or add a comment, with a brief on `to-task`'s template ([../to-task/SKILL.md](../to-task/SKILL.md)), plus a `Playbook:` line.
   - `ready-for-human`: the same brief, plus why it can't be delegated.
   - `needs-info`: a **Note** in two parts, what's established and what's still needed. Each question is specific enough to answer in a line.
   - `wontfix`: **Close** with the reason.

   Then **Set state**.

## Quick override

"Move X to ready-for-agent" → trust it. Show the writes, apply them, and skip the steps above. If the task has no brief, offer to write one.

---

Adapted from [mattpocock/skills triage](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/triage/SKILL.md), aligned to 5beb35b. Category roles became the playbook pick, and the brief is `to-task`'s template. External PRs and the out-of-scope knowledge base are left out.
