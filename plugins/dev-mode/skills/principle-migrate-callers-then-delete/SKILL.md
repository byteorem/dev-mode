---
name: principle-migrate-callers-then-delete
description: "Apply when replacing a function, stored proc, or API. Add the new one, move every caller, verify, then delete the old one."
disable-model-invocation: true
---

# Migrate Callers Then Delete

Add the new one, move every caller, verify, then delete the old one.

**Why:** two live versions drift apart, and a half-finished migration is worse than either end state.

**Pattern:** find all callers (per blast-radius), migrate them in verifiable steps, confirm nothing calls the old one, delete it. For procs, deletion goes through the sqlproj and the normal release.

**Anti-patterns:** a new proc beside the old one "for now"; deleting before every caller is confirmed moved.
