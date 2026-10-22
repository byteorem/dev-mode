# Maintain a formal verify skill

A formal check proves a property of what it describes. When the code changes and the verification doesn't, the check can keep passing on code that no longer exists. That pass is the dangerous case, because it looks like a proof. This is the upkeep pass for the verify skills found in step 1 of `SKILL.md`. Each verify skill handles changes made while an agent uses it. This one handles the changes that skipped it: merges, edits made without the skill, and drift across many commits.

## Outcomes

Give each check one outcome, and say which:

- **in sync:** nothing since the last sync alters what the check describes, and it passes.
- **updated:** the code changed, the verification now describes the new code, and the check passes.
- **bug:** the verification describes the current code, and the code breaks the property. A finding about the code, not drift.
- **blocked:** the check couldn't be brought back in line or couldn't run. Say exactly why.

A check can be both updated and bug: the update makes the verification describe the code again, and then the property fails on it.

## Edit scope

Edit only the verification: models, harnesses, property files, and the verify skill itself. Never edit product code unless the user asks. When a property fails on the current code, don't weaken the property or the model to make it pass. Report the failure.

## Pass

1. **Collect the checks.** For each check in the verify skills, collect the property, the code it covers, the bounds and assumptions, the command, and the sync commit. No recorded sync commit → use the last commit that changed the verification files, and say so.
2. **Run it as it is.** Run each check once before changing anything, and record the result. A pass here only says the old description still holds. A failure can be drift or a bug; don't decide which until step 5.
3. **Read every change to covered code.** Diff the covered files from the sync commit to now, and read each commit message. Also follow code that moved (a covered function renamed, split, or moved is still covered) and new code that touches the guarded state. Sort each change:
   - **No effect.** It alters nothing the verification describes. Check this against the model or harness, not the commit message.
   - **Description stale.** An indivisible step became two, a branch was added or removed, a check moved, a new path reaches the guarded state, or a value's range changed. The model or harness must change.
   - **Promise changed on purpose.** Evidence in the change says the new behavior is intended: a doc comment, tests, a changelog, the commit message. The property must change; cite the evidence.
   - **Promise may be broken.** The code changed and nothing says the promise did. A failure that follows is a bug candidate.
4. **Update from the code, not from the result.** Change the model or harness so each changed part again points to code a reviewer can open, one indivisible step to one step. Write the update before rerunning, not shaped by what passes. Change a property only for a promise that changed on purpose, recording the old wording, the new, and the evidence. Keep the bounds unless the change makes them wrong; a reduced bound goes in the report.
5. **Rerun and judge.**
   - **Pass:** break the new code the way the property guards against, confirm the check catches it, then drop the break. A description can pass because it lost the ability to fail.
   - **Fail:** replay the counterexample against the real code step by step. A step that can't happen in the code means the verification is wrong: fix it and say what was wrong. If every step can happen, it's a bug. Name the commit that introduced it, tell the counterexample in the code's words, and state the harm in one sentence. A cheap repro against the real code goes in the report as evidence, not into product code.
6. **Update the verify skill.** Update the covered code, commands, bounds, assumptions, and sync commit. Set the sync commit to the commit you checked; leave it for a blocked check, and say so. Then follow the verify skill once, as the next agent would, to confirm its steps still run.

## Report

For each check: the outcome and the commits read; what changed in the verification and why (shape changed, or promise changed on purpose, with evidence); the rerun result and the break that showed it can still fail; each bug as counterexample steps, harm, and introducing commit; and what's still uncovered, including new code that should be. Say outright which failures were drift and which were bugs. A check that passed before the update and fails after had a stale pass.

The verification updates land on a local branch of their own, apart from any product fix, and go up through `open-pr`.

