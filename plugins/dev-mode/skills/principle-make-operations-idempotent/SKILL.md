---
name: principle-make-operations-idempotent
description: "Apply when writing a script, job, migration, deploy step, or loop that can be rerun or crash halfway. Make it reach the same end state however many times it runs."
disable-model-invocation: true
---

# Make Operations Idempotent

An operation reaches the same end state however many times it runs and wherever the last run stopped.

**Why:** jobs, migrations, and deploy scripts get rerun after failures. If leftover state changes the next run's outcome, every rerun becomes a debugging session.

**Pattern:** read the current state, compare it to the goal, and apply only the difference. Schema changes check before they act (`IF NOT EXISTS`, `IF COL_LENGTH(...) IS NULL`). Writes upsert on a natural key instead of blindly inserting. Files are written to a temp path and renamed into place. Anything a run leaves behind, such as a lock, a half-written record, or a claimed job, carries what the next run needs to judge it stale. Before calling it done, ask: what if it runs twice? What if the last run crashed at each step? If the answer is "it depends on what was left behind," add a reconciliation step.

**Anti-patterns:** a migration that fails on its second run because the column exists; a job that marks a row sent after sending, so a crash in between sends twice; a lock file someone has to delete by hand after a crash.
