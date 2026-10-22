# Create a formal verify skill

A test checks the cases someone thought to write. Formal verification checks every case in a stated scope: every order of steps in a model, every input up to a bound, or every input. This finds the part of the repo where that matters most, verifies one property of it, and leaves a project-local skill that lets the next agent check a change against that property. Write that skill for an agent who reads it cold, mid-change. The user must be able to trust the result and act on it without learning the verification language.

## Choose the target from the code

Answer from the codebase, and ask the user only what you can't observe. If the user named an area or a bug, start there.

A good target is a promise the code makes, where a break harms users and tests rarely reach the case that breaks it: two requests racing on one record, a retry that double-applies, a status workflow that can reach a state it shouldn't. Choose the strongest such target in the repo, not the easiest to verify.

## Let the question choose the tool

Pick the tool that answers the question at the lowest cost: a model checker, a proof assistant, an SMT-backed verifier, or another tool.

- Whether events can happen in a bad order usually suits a model checker over a small model of the design. TLA+ is the default for that in any language.
- Whether the code itself behaves for every input, as with overflow or a data-structure invariant, usually suits a verifier that runs on the code. If none runs on this language, say so, and test the real code with generated inputs (property-based testing), not a hand model of the function.
- A property that must hold at every size, where a bound isn't enough, can need a proof.

Prefer a tool the repo's developers can install and run, and tell the user why you chose it.

## What makes it good

- **True to the code.** Every part of the model or proof points to code a reviewer can open. What the verification treats as one indivisible step is one indivisible step in the code: a transaction, a lock, a single statement. Names come from this repo.
- **Able to fail.** A check you've never seen fail proves nothing. Show each property failing on a broken variant of the code it guards, such as a removed check or a reordered step.
- **Findings stay findings.** When the current code breaks the property, report it with the counterexample in the code's terms. Don't weaken the property or the model until it passes, and don't change product code unless the user asks.
- **Honest about scope.** Say what is verified, under which bounds and assumptions, and what is left out. A pass covers the model or the bound, not the whole system.
- **Readable without the tool.** State the property and the harm in one plain sentence each. Tell a counterexample as a short sequence of steps in the code's words.
- **Cheap to rerun.** One command, a pinned tool version, and a run short enough that the next agent uses it on every relevant change.
- **Kept in step with the code.** Record which files and functions each check covers, and the commit at which you last confirmed the verification describes them.

## Generate the verify skill

Write a project-local skill in `.claude/skills/`, per `dev-mode:writing-for-agents`, with frontmatter that names the area and says when to use it. Without frontmatter, it never registers. From that skill alone, the next agent must be able to tell whether a change touches the verified code, run the check, tell a real bug from a modeling error, and update the verification when a change is intended. Put the coverage record and the sync commit in the skill, and tell the next agent to move the sync commit forward only after confirming the verification describes the code at the new commit. Use this repo's real commands, paths, and nouns, with no placeholders.

## Prove it before you hand off

Follow the generated skill once, as the next agent would, on a scratch change that breaks the property in the real code. It must catch the break. Then drop the scratch change and confirm the check is back where it started: passing, or failing only on the findings you'll report. If the skill misses the break or a step doesn't run, fix the skill or the verification, not the scratch change. A verify skill that was never run is a draft.

## Hand off

The verify skill lands on a local branch apart from any product fix, and goes up through `open-pr`. Tell the user what you verified, which tool and why, the bounds, what the check found in plain words, how to run it, and what it doesn't cover. Suggest a second target only if you found a close one. Rerunning `/dev-mode:formal-verification-skill` later brings it back in line after changes that skipped the recheck.

