# change

Produces: a local branch with the change, verified step by step.

1. Current behavior understood (`how`) if the code is unfamiliar.
2. Open decisions settled (`align`). Skip for small, clear asks.
3. Blast radius known (`blast-radius`) if it touches shared code, procs, config, or contracts.
4. Plan in verifiable steps (per `principle-sequence-verifiable-units`). Show it if it's more than a few steps.
5. Local branch or worktree. Implement a step, verify it, commit. Repeat. Spans app and database repos → one branch per repo with the same name, and note the deploy order.
6. Whole change verified (per `principle-prove-it-works`). Review the diff: only intended lines changed.
7. Guard added for the new behavior where it's cheap.

Reply: what changed, evidence, risks from the blast radius, what's not done, and whether it's ready for open-pr.
