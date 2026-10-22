---
name: interrogate
description: Adversarial review of a change by one fresh subagent that tries to break it, then a verdict on what it found. Use before opening a PR on a risky or wide change, or when the user asks to interrogate, stress-test, or challenge work.
---

# interrogate

A reviewer with fresh context isn't anchored on how the change was made. It attacks; you judge.

1. **Scope.** The user's pointer if given. Otherwise the branch against its base (`git diff <base>...HEAD`) plus uncommitted changes.
2. **Intent.** One paragraph on what the change should do, from the task, ticket, and commits. Unsure of the intent? Ask. Pass the intent only, not your reasoning or why you think the change is right.
3. **Spawn** one `dev-mode:interrogator` with the intent, the diff command or range (not the pasted diff), and the repo's standards doc if it has one.
4. **Judge.** Run `git status` first: the reviewer has a shell, so confirm it changed nothing. Check each finding against the code before believing it, then sort it:
   - **Act on:** a real correctness, data, or security problem with a traceable path. It would block the PR.
   - **Consider:** legitimate, but whether it's worth the cost now is the user's call.
   - **Dismissed:** wrong, hypothetical (the caller can't reach it), "I'd do it differently", or missing context. One line of why each.

   A review of nothing but nits means the change is probably fine. Say so.
5. **Don't fix here.** Act-on items go back to the playbook step that owns the fix, then get verified like any other change.

Output: the intent, then Act on, Consider, and Dismissed, each finding with its location and reason.
