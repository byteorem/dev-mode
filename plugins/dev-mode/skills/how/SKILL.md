---
name: how
description: Explain how code works now by tracing the real path. Use for "how does X work", before changing unfamiliar code, or to ground other work in the current code.
---

# how

Explain from the real code path, not a skim.

**Size it.**
- Simple question: trace it yourself.
- Spans many files, layers, or repos: send 2 to 4 read-only explorers in parallel, each with one slice (UI, data access, procs, config). Then write one explanation.

**Trace.** Follow the actual path from entry point to effect: page or endpoint, code-behind or handler, DAL, stored proc, tables. Read the code at each hop. Note config and environment branches.

**Output:**
- **Overview:** two or three sentences.
- **How it works:** the path, step by step, with file:line.
- **Where things live:** the files that matter.
- **Gotchas:** anything surprising, implicit, or load-bearing.

Mark anything not confirmed in the code as inferred. Runtime behavior you couldn't observe is inferred.
