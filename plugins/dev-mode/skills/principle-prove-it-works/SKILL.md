---
name: principle-prove-it-works
description: "Apply before declaring a task done. Verify against the real thing, not a proxy."
disable-model-invocation: true
---

# Prove It Works

Verify against the real thing, not a proxy.

**Why:** indirect checks feel cheaper than looking, but acting on a wrong inference costs more than checking.

**Pattern:** exercise the change. Run the page, call the endpoint, rerun the repro, have the user run the query. State how far it was exercised: compiled, run locally, checked in Dev. Inconclusive is not a pass.

**Anti-patterns:** "build passed, so it works"; "probably fixed"; trusting a subagent's "done" without looking.
