---
name: cleanup
description: Remove local leftovers from finished or abandoned work, such as worktrees, branches, scratch files, and processes. Use after a merge, when a task closes, or when the user asks to clean up.
---

# cleanup

Nothing is deleted without the user's say-so.

1. **Find what the work left behind:**
   - Worktrees: `git worktree list`.
   - Local branches: merged into main, or tied to the task.
   - The remote branch, if it still exists after merge.
   - Scratch files the work created.
   - Processes started for the work: IIS Express, dev servers, browsers.
   - The task, if it's still open.
2. **Flag anything risky:** an unmerged branch, uncommitted changes, a worktree with local edits.
3. **Show the list,** grouped by type, risky items marked.
4. **Remove only what the user approves.** Risky items and remote branches need a yes per item.
5. **Finish with** `git worktree prune`, and close the task.

Output: what was removed, what was kept, and why.
