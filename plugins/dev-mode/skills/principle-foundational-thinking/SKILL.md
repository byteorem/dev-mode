---
name: principle-foundational-thinking
description: "Apply before writing logic or ordering the work: choosing core types and data shapes, or deciding what lands first. Get the data shape right so the code that follows is obvious."
disable-model-invocation: true
---

# Foundational Thinking

Get the data shape right before writing logic, and land first whatever every later step needs.

**Why:** logic written against the wrong shape gets rewritten when the shape changes. Scaffolding that arrives late gets worked around in every step before it.

**Pattern:** define the core types and trace each way they're read before writing the logic. Pick structures that fit the dominant path. Order for option value: dead code out, then shared types, test harness, and characterization tests, then features. Tests come before fixes. Make the structure DRY, not every line: three similar statements beat a premature abstraction.

**Anti-patterns:** writing the handler first and inventing the model as you go; a new capability spread across callers as special cases; building on code you meant to delete.
