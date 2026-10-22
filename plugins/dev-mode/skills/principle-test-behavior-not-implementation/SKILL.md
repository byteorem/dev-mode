---
name: principle-test-behavior-not-implementation
description: "Apply when writing a test or guard. Assert what a user or caller can observe, not how the code gets there."
disable-model-invocation: true
---

# Test Behavior, Not Implementation

Assert what a user or caller can observe, not how the code gets there.

**Why:** tests tied to internals break on every refactor and still miss real regressions.

**Pattern:** assert on page output, return values, rows written, files produced. Characterization tests lock current behavior, even where it's wrong, and say so in their names.

**Anti-patterns:** asserting a private method was called; mocking so much the test only checks the mocks; "fixing" a characterization test to the behavior you expect.
