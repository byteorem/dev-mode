# authoring-a-skill

Produces: a new or changed skill, agent, or playbook, test-run before it's called done.

1. Need confirmed. Search the plugin and the repo's `.claude/skills/` first; prefer editing what exists. A lesson a check could enforce gets the check instead (per `principle-encode-lessons-in-structure`).
2. Home picked. Specific to one repo → that repo's `.claude/skills/`. Generic workflow → the dev-mode repo, never the installed plugin cache, which updates overwrite.
3. Written per `dev-mode:writing-for-agents`. Its `SKILL-MECHANICS.md` settles whether the skill is model-invoked or user-invoked.
4. Validated: frontmatter has `name` and `description`, the name matches the folder, every linked file exists, and references to other skills resolve. A dev-mode skill that shares a name with one installed elsewhere is referenced as `dev-mode:<name>`.
5. Test-run in a fresh headless session (`claude -p`, plus `--plugin-dir <plugin>` for a dev-mode change), and read what it actually did, not what it says it did. A skill about style gets one sample run you read yourself, not a test suite.
6. Every place the home repo lists its skills updated, per that repo's `AGENTS.md` or `CLAUDE.md`. Run its checks if it has them.
7. Going up → `open-pr`, following the home repo's release steps, such as a version bump.

Reply: what the skill does, where it lives, its invocation choice, and the test-run evidence.
