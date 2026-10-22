---
name: why
description: Reconstruct why code is the way it is from history and records. Use for "why is it like this", before removing something that looks pointless, or when intent matters for a change.
---

# why

History is gappy. Don't invent intent.

1. **Anchor in the code.** `git log -L` or `git blame` on the exact lines, then the commits and PRs that introduced them. This is the spine everything else hangs on.
2. **Fan out per source.** One pass per source that's available: commits and PRs, tickets (Jira, ServiceNow), docs (Confluence, repo docs), email and chat, logs or errors. Use subagents for these when there are several.
3. **Record null results.** "Searched Jira for X, nothing" is evidence too.
4. **Label every claim:**
   - **confirmed:** a record says so.
   - **likely:** records point to it.
   - **guess:** nothing says so.

Output: a short narrative of the decisions in order, each labeled and cited, then the null results, then what's still unknown.
