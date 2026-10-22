# Create a verify skill

Every serious project needs a scripted way to drive the real app and prove behavior: launch it, exercise a feature the way a user would, and capture evidence. This generates it as a project-local skill, `.claude/skills/verify-<app>/`, tailored to the repo. Write it for the next agent, who reads it cold, mid-task, and has never seen the app.

## 1. Interview the repo, not the user

Answer these from the codebase. Ask the user only what you can't observe.

- **Surface:** what does a user touch? A web UI, a CLI or TUI, a desktop app, an API, a library? A repo can have several; pick the primary one and note the rest.
- **Run:** how does the app start locally? Prefer the repo's own documented command (scripts, solution launch profile, README). Note ports, config, connection strings, seed data, and auth.
- **Drive:** how can an agent interact with it programmatically? Existing harnesses first: Playwright or Selenium specs, HTTP endpoints, a debug port. Only then a generic recipe: browser automation for web, a PTY harness for CLI or TUI, plain HTTP for services.
- **Observe:** what evidence can be captured? Screenshots, terminal transcripts, response bodies, logs, exit codes, database state read back with a query.
- **Isolate:** can two instances run side by side (ports, data folders, databases)? If not, the generated skill says so. Refusing to double-drive a shared instance beats corrupting the user's session.
- **Environment:** the generated skill drives a local instance only. If the app can only run against a shared database or environment (Dev, QA, prod), stop and say so. Seed data and state checks on a shared database become SQL the user runs.

If the checkout doesn't build or start as-is, fix that first or report it precisely. A skill written against a broken base teaches wrong steps. When an irrelevant missing asset blocks startup, such as a sample config, the generated skill may create it, marked as verification scaffolding, and remove it in cleanup.

## 2. Generate the skill

Write `.claude/skills/verify-<app>/SKILL.md` with frontmatter: `name: verify-<app>` and a `description` that names the app, the surface, and when to reach for it. Without frontmatter the skill never registers. Write it per `dev-mode:writing-for-agents`. Each section below is grounded in what the interview found, with no placeholders left.

- **Launch:** the exact command that starts the app for verification, and how to tell it's ready. Ready means usable, not just that a process answers: a health check can pass while migrations or seed scripts still run. Launch reaches a usable state from empty data, including migrations and seed data. Include teardown. For a short-lived CLI there is no server: launch means build once, then run each drive in its own isolated session.
- **Doctor:** one read-only check that answers "is this instance worth driving?": process up, right build, port owned by this run, auth valid. The agent runs it first, and whenever anything looks off.
- **Drive:** the harness recipe with real selectors and commands from this repo, not examples. Prefer stable handles (ARIA labels, IDs, data attributes, prompt strings, routes) over coordinates and tab order.
- **Evidence:** what to capture and where it goes. Proof standards: exercise the real user path, not internal setters or test-only endpoints; capture the action and the resulting state, not just the final screen; verify side effects (files written, rows inserted, messages sent) alongside what's visible; mock only where a production boundary already isolates the external system. When the safe path is a dry run or test mode, observe what it actually skips (files, network, email) instead of trusting its name.
- **Cleanup:** how to tear down what the run created. Kill what you started, never by process name. Cleanup removes instances and scratch state but never the evidence, which survives in a location the skill names.
- **Helpers:** any script the skill ships is runnable, and its invocation is in the skill body. A helper the reader has to reverse-engineer isn't a helper.

## 3. Seed the feature map

Create `.claude/skills/verify-<app>/features/README.md` plus one file per user-facing feature you can find. Start with the top 3 to 5, from routes, pages, commands, menus, or docs. Follow the shape in [references/feature-map-example/](references/feature-map-example/): a README index and one file per feature. Each file answers, from the user's point of view, what the feature is, how to reach it, how to drive it, and what observable end state proves it works. Its four H2s are `Sub-features`, `How to get to it (user POV)`, `Driving it with <harness>`, and `Gotchas`.

If the seed data lacks a precondition a journey needs, the journey reports a failure and the reason goes in that feature's `Gotchas`. Never weaken a journey to make it pass. The map is the repo's maintained verification source; a proof that drives one convenient entry point is incomplete when the map lists others.

## 4. Prove the generated skill

Run its own instructions end to end once: launch, doctor, drive one mapped feature, capture evidence, clean up. One feature is enough; the map lets later runs cover the rest. After cleanup, confirm the evidence still exists at the named location. A cleanup that eats the proof fails this step. Fix what fails, and run the generated cleanup after every failed attempt too, so broken attempts don't strand processes and ports.

A generated skill that was never run is a draft, not a deliverable. If you proved it in a stand-in for the real target, list every setup step the stand-in did that the target won't. Those stay unverified until a run on the real target covers them.

## 5. Hand off

The new skill lands on a local branch like any change, and goes up through `open-pr`. Rerunning `/dev-mode:verification-skill` later maintains it as the app changes.

Output: the skill's path, the surface and harness chosen, the features mapped, the proof run's evidence, and what's unverified.

