---
name: diagnose
description: Find the cause of a bug with a repro loop and tested hypotheses. Use when something is broken and the cause isn't known.
---

# diagnose

No loop, no hypotheses.

1. **Loop.** Build something that fails on the exact symptom: a local run, a test, a script, or a query the user runs. Not a nearby symptom.
2. **Minimize.** Strip the repro down until removing anything makes it pass.
3. **Hypotheses.** Write 3 to 5, ranked, each falsifiable: "if X, then changing Y makes it pass."
4. **Test.** Change one variable at a time. Record each result, including the ones that ruled something out.
5. **Guard first.** Write the failing test or check before the fix, then fix.
6. **Clean up.** Remove instrumentation and debug output.

Can't build a loop locally? Say exactly what's missing (data, environment, access) and stop. Don't theorize past it.

Output: the repro, hypotheses with results, the confirmed cause.
