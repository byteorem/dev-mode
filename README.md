# dev-mode

A Claude Code marketplace with one plugin, `dev-mode`: an engineering workflow where the agent follows a playbook, a human approves anything others will see, and the plugin improves from use. Repo context comes first; playbooks work around it.

Inspired by Cursor's [pstack](https://github.com/cursor/plugins/tree/main/pstack/skills) and Matt Pocock's [skills](https://github.com/mattpocock/skills/tree/main/skills).

## Why

An agent in a plain chat session starts every task from zero. It improvises the procedure, so the same kind of task goes differently each time. What it learns is gone when the session ends. It has no line between safe and unsafe actions, so it asks about everything or nothing. And when work spans days or parallel sessions, the only record of progress is a transcript.

dev-mode answers each of these with structure:

- **One procedure per kind of task.** A bug fix and an investigation each get a playbook with fixed steps, so a failure traces to a step.
- **Judgment kept apart from procedure.** Playbooks say what to do. Principles say how to decide. Each rule lives in one file and is cited by name, never copied.
- **Evidence over claims.** A step is done when there is proof: a repro, a before and after, a page that was run. "It compiles" is not proof.
- **Reversible work runs; visible or irreversible work waits.** Anything others can see, or that can't be undone, waits for the user's yes.
- **State outside the chat.** Multi-session work lives on a task with a resume note, not in a transcript.
- **The system improves from use.** When the plugin causes a mistake, the fix goes into the plugin.

It's written for brownfield work: existing behavior is load-bearing until shown otherwise, data comes from queries the user runs, and every fix leaves a guard.

## How it works

Run `/dev-mode <task>`. The router reads the repo's `CLAUDE.md` and `CLAUDE.local.md`, names the playbook it picked in one line, copies the playbook's steps into the todo list, and stays on for the rest of the session.

| Layer | What it answers | Where |
|---|---|---|
| Router | Which playbook, and what always applies? | `skills/dev-mode/SKILL.md` |
| Playbook | What are the steps for this kind of task? | `skills/dev-mode/playbooks/` |
| Principle | How should this judgment call go? | `skills/principle-*/` |
| Technique | How is this reusable procedure done? | `skills/<name>/` |
| Agent | Which subagent does the work get delegated to? | `agents/` |

Only the router is loaded up front. A playbook loads when picked, and a principle loads when its trigger applies.

### Agent

Subagents start without the parent's skills, so a `general-purpose` delegate works without dev-mode's rules. The router spawns `dev-mode:dev-mode-agent` instead. It preloads the router and leaves the playbook, tasks, and approvals to the parent session. Modeled on pstack's `poteto-agent`.

`interrogate` uses its own agent, `dev-mode:interrogator`: an adversarial reviewer on Sonnet whose tool list leaves out Edit and Write.

### Playbooks

| Playbook | When | Produces |
|---|---|---|
| investigate | A question, no code changes | A cited answer |
| bug-fix | Something is broken | A local fix branch, evidence, and a guard |
| change | A feature, tweak, or refactor | A local branch, verified step by step |
| open-pr | A verified branch is ready to go up | A pushed branch and an open PR |
| authoring-a-skill | Writing or changing a skill, agent, or playbook | A test-run skill in the repo or in dev-mode |
| figure-it-out | Nothing fits, or the work is large or long-running | An approved plan, then the work |

### Techniques

Skills that playbooks call by name. You can also run them directly.

| Technique | Use |
|---|---|
| `how` | Trace how code works now |
| `why` | Reconstruct why code is the way it is, from history and records |
| `diagnose` | Find a bug's cause with a repro loop and tested hypotheses |
| `align` | Settle open decisions with the user before building |
| `blast-radius` | Find what a change could break elsewhere |
| `interrogate` | Have one fresh subagent try to break a change, then judge what it found |
| `cleanup` | Remove worktrees, branches, and scratch files after the work |
| `writing` | Writing rules for PR bodies, commits, and summaries |
| `writing-for-agents` | Writing rules for skills, `AGENTS.md`, prompts, and briefs that an agent reads |
| `retro` | Look back over a session and propose fixes to the project or to dev-mode. User-invoked. |
| `verification-skill` | Create the repo's `verify-<app>` skill, which drives the app like a user and captures proof, or audit an existing one against the app. User-invoked. |
| `formal-verification-skill` | Create a repo-local skill that model-checks or proves one high-stakes property, or bring existing ones back in line with the code. User-invoked. |
| `setup` | Pick a repo's task tracker and write its `## dev-mode` block. User-invoked. |
| `to-task` | Turn the settled conversation, a plan, or a ticket into a task, split into blocked subtasks when it's too big for one session. User-invoked; the router also follows it. |
| `triage` | Show which tasks need attention, check a task's claim, and write its brief or the questions it's missing. User-invoked; the router also follows it. |

### Principles

17 one-rule skills, named `principle-<name>` as in pstack, such as `principle-prove-it-works` and `principle-fix-root-causes`. They set `disable-model-invocation: true`, so they don't add 17 descriptions to every session. The router lists each with its trigger and reads the file when the trigger applies. You can run one directly (`/principle-prove-it-works`).

### Approval

Approval is stated at the step that needs it, not in a separate list. `open-pr` pushes only after the user approves the draft, and `cleanup` deletes only what the user approves. Actions no playbook owns, such as deploys, ticket updates, messages, and memory writes, are always-on rules in the router: show the draft and wait for a yes. Local, undoable work goes ahead without asking.

## What lives outside the plugin

The plugin holds only the generic workflow. These pieces come from elsewhere:

| Piece | Home |
|---|---|
| Repo rules | The repo's `CLAUDE.md` or `CLAUDE.local.md` |
| Tasks | The tracker on the `Tracker:` line of the repo's `## dev-mode` block, written by `setup`: docket, Jira, or GitHub Issues. Without a block, the session todo list. |
| Memory | Whatever memory system you use |
| Tool skills | git, gh, Outlook, ServiceNow, and similar skills you have installed |

## Layout

```
plugins/dev-mode/
  agents/
    dev-mode-agent.md         delegate for subagent work, preloads the router
    interrogator.md           read-only adversarial reviewer for interrogate
  skills/
    dev-mode/                 router: invoke with /dev-mode <task>
      SKILL.md
      playbooks/              investigate, bug-fix, change, open-pr, authoring-a-skill, figure-it-out
      trackers/               docket, jira, github, todo: one file per tracker, same operations in each
    principle-*/              17 one-rule skills
    align/ diagnose/ how/ why/ blast-radius/ interrogate/ cleanup/ writing/ writing-for-agents/ retro/    techniques
    verification-skill/ formal-verification-skill/    create or maintain repo-local verify skills
    setup/ to-task/ triage/   configure a repo's tracker, write tasks to it, get them ready to work
```

## Install

```
/plugin marketplace add byteorem/dev-mode
/plugin install dev-mode@dev-mode
```
