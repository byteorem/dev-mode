---
name: principle-subtract-before-you-add
description: "Apply when about to add code, config, files, or steps. Check whether removing, reusing, or simplifying solves it first."
disable-model-invocation: true
---

# Subtract Before You Add

Check whether removing, reusing, or simplifying solves it first.

**Why:** every addition is something to read, maintain, and break. Most systems need less, not more.

**Pattern:** look for existing code that already does it, a step that can go, or a narrower change.

**Anti-patterns:** a new helper beside an identical one; a new config key for a value that never changes; a new playbook step to patch a bad one.
