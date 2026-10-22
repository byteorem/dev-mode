---
name: align
description: Interview the user to settle open decisions before building. Use when a spec, ticket, or ask is ambiguous or has several reasonable readings.
---

# align

Settle decisions before building, instead of guessing.

1. Look up every fact yourself: code, config, tickets, history. Only decisions go to the user.
2. Model the work as a tree of decisions. A decision is open when its prerequisites are settled.
3. Ask all open decisions at once, numbered. Give each a recommended answer and one line of why.
4. Fold the answers in. New decisions may open up; ask those next round.
5. Done when nothing is open and the user confirms a one-paragraph summary.

Keep it short. Two or three rounds is normal. If a decision doesn't change what gets built, don't ask it.
