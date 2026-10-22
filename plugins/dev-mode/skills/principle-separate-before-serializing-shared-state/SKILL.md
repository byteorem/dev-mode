---
name: principle-separate-before-serializing-shared-state
description: "Apply when concurrent actors might write the same file, branch, row, key, or state object. Remove the sharing first; serialize structurally only when one shared writer is a real invariant."
disable-model-invocation: true
---

# Separate Before Serializing Shared State

When concurrent actors might write the same thing, first remove the sharing. Serialize only when one shared target is a real invariant, and then do it structurally.

**Why:** concurrent writes to shared state cause races that are intermittent, hard to reproduce, and expensive to debug.

**Pattern:** name the shared mutable state: files, branches, working trees, table rows, cache keys, session state. By default, give each actor its own target and merge where the results are read. Two workers each writing their own field into one `state.json` still share it; `indexer-state.json` and `metrics-state.json` don't. Parallel subagents that edit code get separate worktrees. When one target really must be shared, serialize with structure: a lock, a transaction with a rowversion or concurrency check, a single writer, or sequential phases. Instructions and conventions are not concurrency control.

**Anti-patterns:** two subagents editing the same working tree; two jobs doing read-modify-write on the same status row with no concurrency check; "we need a lock" as the first answer instead of a design smell to check.
