---
name: principle-sequence-verifiable-units
description: "Apply when planning more than one step. Break work into steps that each leave things working and can be checked on their own."
disable-model-invocation: true
---

# Sequence Verifiable Units

Break work into steps that each leave things working and can be checked on their own.

**Why:** a big change verified at the end fails in ways that can't be traced to a step.

**Pattern:** order steps so each builds on a verified one. Verify, commit, then move on.

**Anti-patterns:** ten files changed before the first build; one commit for the whole feature; a step that can only be checked once the next one lands.
