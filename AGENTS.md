# dev-mode

The source for the `dev-mode` plugin. When adding to it, follow the plugin's own `authoring-a-skill` playbook (`plugins/dev-mode/skills/dev-mode/playbooks/authoring-a-skill.md`); this file is the repo-specific part that playbook defers to.

## Checks

`bun scripts/check.ts` checks the router tables, README tables, layout block, and principle counts against the files on disk. It also checks skill and agent frontmatter, relative links, and the manifests. The tree on disk is the source of truth: when the check fails, update the listing to match. It runs as a pre-commit hook once hooks are on in the clone (`git config core.hooksPath .githooks`).

The check doesn't cover:

- Bumping `version` in `plugins/dev-mode/.claude-plugin/plugin.json` before pushing, so installs pick up the change.
- Wiring a new piece into the router where it belongs: an always-on rule or a playbook step that calls it.

## Pick the layer

The README's "How it works" table defines the layers. Decide which one a new piece belongs to before writing it:

- **Playbook**: a kind of task, with ordered steps that end in an artifact. Each step is an outcome with a completion criterion, not a command. End with a `Reply:` line. Cite techniques and principles by name rather than restating them.
- **Technique**: a reusable procedure that several playbooks could call, or that the user runs directly. It gets its own `skills/<name>/` folder. Make it user-invoked when only the user should start it, as with `retro`.
- **Principle**: one judgment rule, not a procedure. It lives in `skills/principle-<name>/SKILL.md` and uses the Why / Pattern / Anti-patterns shape of the existing principles. Its router trigger names a concrete moment ("about to add code"), since the router table is the only way a principle gets read.
- **Agent**: only when a technique needs a different tool list or model than `dev-mode-agent`, the way `interrogator` drops Edit and Write.
- **Always-on rule** in the router: one line of trigger → action that applies across every playbook. Every session pays for these, so prefer a playbook step or a principle trigger.

If an existing file covers most of what you'd add, extend that file. Each rule lives in one place, and every other file cites it.

## Keep it lean

The router and every model-invoked description load into each session where the plugin is installed. Look for something to cut or merge before you add. When a skill grows past one screen, move material that only some branches need into a sibling file behind a pointer, as `verification-skill` does with `create.md` and `maintain.md`.

## Adapted skills

A skill adapted from pstack or mattpocock/skills ends with an attribution line. The line has a link pinned to the upstream commit, the license and author where upstream states them, `aligned to <sha>`, and what's local. Copy the shape from `skills/retro/SKILL.md`. Adapt rather than port: keep what fits, change what doesn't, and leave out the rest.

## Commits

Make one commit per concern, in the existing style: `Add <thing>, <what it does>`. Router and README updates go in the same commit as the piece they list, or in a final listing commit.
