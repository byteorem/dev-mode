# bug-fix

Produces: a local fix branch, evidence, and a guard.

1. Local branch or worktree for the fix.
2. A repro exists (per `diagnose`). No fix before this. If it can't be reproduced locally, say what's missing (data, environment, access) and ask.
3. Root cause named, with evidence (per `principle-fix-root-causes`).
4. Guard written before the fix, so it can't come back silently: a test, a smoke-checklist line, or a SQL check the user can run. Confirm it fails on the defect.
5. Smallest fix the evidence supports. Run `blast-radius` if it touches shared code.
6. Verified against the original repro and the guard (per `principle-prove-it-works`). Review the diff: only intended lines changed.
7. Committed locally.

Reply: what broke, why, the fix, evidence, the guard, and whether it's ready for open-pr.
