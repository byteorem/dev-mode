---
name: principle-fix-root-causes
description: "Apply when a fix works but the cause isn't named. Fix the cause, not the symptom. If the cause is out of scope, fix the symptom and say so plainly."
disable-model-invocation: true
---

# Fix Root Causes

Fix the cause, not the symptom. If the cause is out of scope, fix the symptom and say so plainly.

**Why:** a symptom fix hides the bug and it comes back somewhere else.

**Pattern:** name the cause with evidence before writing the fix. A symptom-only fix is labeled as one in the reply and the PR, with the cause noted as a follow-up.

**Anti-patterns:** a null check that makes the error go away; a retry around something that shouldn't fail; "it works now".
