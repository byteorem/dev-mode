---
name: retro
description: Look back over a session for what made the work slower, costlier, or wrong, and propose fixes to the agent's environment or to dev-mode itself.
disable-model-invocation: true
argument-hint: "[scope, default this session]"
---

# retro

The user has asked for a **retrospective**. You are suggesting improvements to the agent's **environment**, meaning the files, checks, and tools the next agent meets, to improve future runs.

## Steps

1. Use the `dev-mode:writing-for-agents` skill for the writing style guide.

2. Read the primary sources for the session the user names. Default to this one: `${CLAUDE_SESSION_ID}.jsonl` under `~/.claude/projects/`, which still holds turns that compaction dropped. For another session, search the session logs on this machine. Read the tool calls and results, not just the chat; most friction never reaches the chat. Transcripts are large, so hand the read to a `dev-mode:dev-mode-agent` with the path and the categories below, and keep its findings.

3. Look for candidates for improvement in these categories. Skip a category whose _Use when_ never showed up.

   - **Navigation**: how easy was it for the agent to find the right files? Are there hidden dependencies between files? Would a **navigation pointer** make it easier? _Use when_ the session took a long time to find a piece of information.
   - **Automated checks**: are there automated checks that could catch errors the agent made? Linting, typing, tests, filesystem linters? Read the repo's own check commands first (its package scripts, build tool, CI workflow), so a check that already exists but sits unwired or silently broken is the finding, not a reinvention. A repo with no **guardrail** (no pre-commit hook and no CI job running its checks) is itself a finding. _Use when_ the agent made a mistake an automated check could have caught, or the repo has no guardrail at all.
   - **Coding standards**: should the reviewer be given a new rule to enforce? Should an existing rule be removed or clarified? Classify the violation first. A **mechanical** one (a fixed syntactic pattern, a banned API, an import shape, a file-location rule) gets a deterministic check: a custom rule in the repo's linter, a pre-commit hook, or a CI job, whichever the repo makes cheapest. Default to building the check over writing the rule. Reserve the repo's standards doc for genuine **judgement calls** (cross-file consistency, matching the surrounding style). _Use when_ a mistake got past review, or the user had to correct the agent.
   - **AGENTS.md and CLAUDE.md**: are there steering instructions that should move to coding standards or automated checks instead? _Use when_ the file is particularly large.
   - **Tool economy**: did the agent make expensive tool calls that could be streamlined? Is there custom tooling (CLIs, MCP servers) that is particularly token-inefficient? _Use when_ the agent made an expensive tool call.
   - **No-ops**: instructions in steering files that don't change the agent's behavior. _Use when_ the steering files are large and unwieldy.
   - **Information access**: chances to give the agent information it lacked, such as teeing dev server logs or read-only access to a third-party service. _Use when_ a crucial piece of information was not available to the agent.
   - **dev-mode**: a playbook step, rule, or principle that misled the agent, was missing, or was ignored. _Use when_ the agent followed dev-mode and still went wrong, or the user corrected something dev-mode should cover.

4. Present the candidates to the user in order of severity, each with its evidence from the session: the tool call or turn that shows it. Wait for the user to pick, apply only those, and don't commit.

## Reference

### Implementation vs. review

All work goes through two stages: implementation and review. The implementing agent carries the most **context pressure**: it explores, writes code, and debugs failures.

The reviewer carries the least. It receives a diff, so it needs no exploration, and it often doesn't write code or debug. In dev-mode the reviewer is `interrogate`, which hands the repo's standards doc to its `interrogator`. So the reviewer, not the implementing agent, is where coding standards belong.

### Where fixes go

- **Project fixes** land in the repo's git root, never in global instructions.
- **dev-mode fixes** name the file at fault, relative to the plugin root, with the exact edit. The installed plugin is a cache that updates overwrite, so the user applies the edit in the dev-mode repo, apart from task work.

### Files

- `CLAUDE.md` / `AGENTS.md`: pushed into the context of every agent working in the repo. Use them very sparingly, usually only for **navigation pointers** to other files.
- Standards doc, such as `CODING_STANDARDS.md`: read during review, not implementation. Once it passes about 1,000 lines, add navigation pointers to docs it splits into.
- Docs: reference files that other files point to. Look for existing docs before writing new ones.
- Skills: for docs an agent should find on its own (the description sits in its context), or for commands the user invokes. Follow the `dev-mode:writing-for-agents` skill.

---

Adapted from [mattpocock/skills retro](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/retro/SKILL.md), aligned to 5beb35b. The dev-mode category, the reviewer mapping, and Where fixes go are local.
