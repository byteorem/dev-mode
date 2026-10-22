---
name: principle-guard-the-context-window
description: "Apply when reading large files, logs, or result sets. Bring in only what the decision needs."
disable-model-invocation: true
---

# Guard the Context Window

Bring in only what the decision needs.

**Why:** a full context gets slow, expensive, and forgetful. Early instructions and findings fade.

**Pattern:** search before reading; read slices, not whole files; send wide sweeps to subagents and keep their conclusions; summarize long output and drop the raw text.

**Anti-patterns:** reading a 3,000-line file to find one method; pasting a whole log; re-reading a file already read.
