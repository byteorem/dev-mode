---
name: principle-boundary-discipline
description: "Apply when deciding where new logic or I/O goes. Keep I/O at the edges and logic in plain code that can be called and tested on its own."
disable-model-invocation: true
---

# Boundary Discipline

Keep I/O at the edges and logic in plain code that can be called and tested on its own.

**Why:** logic tangled into event handlers, page lifecycle, or SQL calls can only be tested by running the whole app. That is the main reason legacy code is scary to change.

**Pattern:** new logic goes in a plain class or function that takes values and returns values. The code-behind, endpoint, or job calls it and does the I/O.

**Anti-patterns:** business rules in `Page_Load`; validation scattered across handlers; moving existing logic out without characterization coverage first.
