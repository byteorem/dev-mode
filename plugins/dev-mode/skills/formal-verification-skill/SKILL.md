---
name: formal-verification-skill
description: Create or maintain a project-local skill that formally verifies one high-stakes property, such as no double payment under concurrency or retries, with a model checker, prover, or verifier.
disable-model-invocation: true
---

# formal-verification-skill

A formal verify skill lives in the repo's `.claude/skills/`. It runs a model checker, prover, or code-level verifier against named code, and records which code each check covers and the commit it was last confirmed against. This skill makes one, or brings existing ones back in line with the code.

1. Look in the repo's `.claude/skills/` for formal verify skills. They have no fixed name, so find them by what they do: run a verifier against named code.
2. Branch:
   - None, or the user names a new property or area to verify → follow [create.md](create.md).
   - Any exist, and the code may have moved since their sync commit → follow [maintain.md](maintain.md) on them, or on the one the user named.

State the branch in one line before starting, e.g. `maintain: verify-payment-race`.

---

Adapted from pstack's [create-formal-verification-skill](https://github.com/cursor/plugins/tree/eb4db2b55b2b7dec3d9282754cddf0a56bf4ff10/pstack/skills/create-formal-verification-skill) and [maintain-formal-verification-skill](https://github.com/cursor/plugins/tree/eb4db2b55b2b7dec3d9282754cddf0a56bf4ff10/pstack/skills/maintain-formal-verification-skill) (MIT, Lauren Tan), aligned to eb4db2b. Merging the two into one entry point, the examples, paths, and landing through `open-pr` are local.
