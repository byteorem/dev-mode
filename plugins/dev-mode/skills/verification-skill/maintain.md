# Maintain a verify skill

A feature map rots the moment the app changes. This is the upkeep pass for the verify skill found in step 1 of `SKILL.md`. The unit of rigor is the feature, not the sentence: cover every feature file from source and exercise every feature live, without proving every bullet.

## Outcomes

Pick one, and say which:

- **clean:** every feature got source and live coverage, and nothing needs changing. No branch.
- **changed:** one local branch of proven corrections to the docs, harness, or map. It goes up through `open-pr`.
- **blocked:** coverage couldn't finish, or a proven fix couldn't land safely. Say exactly what blocked it.

## Edit scope

Edit only the verification skill's own folder: its `SKILL.md`, `features/`, and any harness scripts it owns. Never edit product code during a pass. Behavior the map describes that the app no longer has is either drift (fix the map) or a regression (report it, don't paper over it in docs).

## Pass

1. **Index hygiene.** Read the feature map README and list its sibling files. Fix missing, extra, duplicate, or dead entries.
2. **Source wave.** One read-only `Explore` subagent per feature file, at most three at a time. Each explains how its feature works from source, flags likely drift with citations, and returns one live-verification recipe. They never drive the app or edit files. Return shape: feature summary, source entry points, likely drift or none, one recipe.
3. **Reconcile.** Every feature file has a returned summary. Merge overlapping recipes into as few app states as practical. Spot-check cited drift; don't re-prove clean claims. Check recent commits for user-facing surfaces missing from the map, and name a concrete source path before calling one missing.
4. **Live pass.** Required even when the source looks clean. You do all the driving, following the verification skill's own launch model. Exercise every feature at least once, and hold three invariants the whole pass:
   - Never drive an instance you haven't health-checked since it last surprised you. Run doctor before the first drive and after any failed drive. Where doctor can't see the failure, such as a stuck UI on a healthy process, reset or relaunch.
   - Evidence captured so far survives every cleanup. Check it at its named location rather than assuming.
   - Nothing a drive started outlives its usefulness. Clean up failed-attempt residue whether the session is stuck, exited, or shared. For a shared instance, clean the residue, not the instance.

   A doctor failure caused by skill drift is drift: fix it within edit scope and retry once before calling the pass blocked. A feature counts as unreachable only with the concrete prerequisite (auth, permission, OS, external state) and the route attempted. If the map omits that prerequisite, that's drift. Re-drive any harness fix live before it lands. Tear down after the last drive, re-proofs included; the evidence stays.
5. **Triage.** A wrong or missing user-POV description is doc drift: fix it. Working behavior the harness can't drive is a harness gap: fix it, with any script runnable and its invocation in the skill body. App behavior that's broken is a product gap: report it to the user and keep it out of this branch.
6. **Land or stop.** Changed: one local branch of proven corrections, every changed file re-read first. Clean or blocked: no branch.

Keep brief run notes (features covered, unreachable prerequisites, confirmed drift, outcome) in a scratch location. Don't commit them.

Output: the outcome, coverage per feature, the drift fixed, product gaps found, and what blocked anything.

