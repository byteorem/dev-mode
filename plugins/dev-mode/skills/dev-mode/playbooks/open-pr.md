# open-pr

Produces: a pushed branch and an open PR, each only after the user approves it.

1. Branch is verified (per `principle-prove-it-works`). If not, say what's missing and stop.
2. PR body drafted per `writing`. Use the repo's PR template if it has one. Otherwise: why, what changed, blast radius, verification, what was left alone.
3. Draft shown to the user. Push only after they approve it.
4. Create the PR only after the user approves.
5. After the user merges: offer `cleanup`.

Merging stays with the user, since merge to main deploys to Dev.

Reply: the PR link and what's left (review, deploy, change request).
