---
name: principle-redesign-from-first-principles
description: "Apply when a fix needs a third workaround. Stop patching. Restate the goal and ask what the design would be if built for it today."
disable-model-invocation: true
---

# Redesign from First Principles

Stop patching. Restate the goal and ask what the design would be if built for it today.

**Why:** workarounds stack until each new one breaks an old one.

**Pattern:** write the goal in one line, sketch the clean design, then compare its cost with one more patch. In legacy code, propose the redesign; don't start it without characterization coverage and the user's go-ahead.

**Anti-patterns:** a flag to bypass the last flag; rewriting working legacy code because it's ugly.
