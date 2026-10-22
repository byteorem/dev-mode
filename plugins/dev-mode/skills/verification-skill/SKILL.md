---
name: verification-skill
description: Create or maintain the repo's verify skill, a project-local skill that drives the app the way a user does and captures proof.
disable-model-invocation: true
---

# verification-skill

A verify skill lives in the repo at `.claude/skills/verify-<app>/`. It launches the app, health-checks it, drives features the way a user does, captures evidence, and keeps a feature map of what to drive. This skill makes one, or keeps an existing one honest.

1. Look in the repo's `.claude/skills/` for a verify skill: one with launch and drive sections and a feature map, usually named `verify-*`.
2. Branch:
   - None, or the user wants one for another app or surface → follow [create.md](create.md).
   - One → follow [maintain.md](maintain.md) on it.
   - Several → ask which, then follow [maintain.md](maintain.md) on that one.

State the branch in one line before starting, e.g. `maintain: verify-orders`.

---

Adapted from pstack's [create-verification-skill](https://github.com/cursor/plugins/tree/eb4db2b55b2b7dec3d9282754cddf0a56bf4ff10/pstack/skills/create-verification-skill) and [maintain-verification-skill](https://github.com/cursor/plugins/tree/eb4db2b55b2b7dec3d9282754cddf0a56bf4ff10/pstack/skills/maintain-verification-skill) (MIT, Lauren Tan), aligned to eb4db2b. The feature-map example is copied unchanged. Merging the two into one entry point, the local-only environment rule, the subagent cap, and landing through `open-pr` are local.
