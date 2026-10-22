---
name: blast-radius
description: Find what a change could break elsewhere. Use before changing shared code, stored procs, config, schema, or anything another page, job, or app depends on.
---

# blast-radius

1. **List what the change touches:** functions, classes, procs, tables, config keys, session values, URLs, files.
2. **Find who depends on each:**
   - Callers in this repo, including dynamic ones (string-built SQL, reflection, `FindControl`, markup).
   - Other repos and apps on the same database or service.
   - Scheduled jobs, exports, and file transfers.
   - Contracts: proc signatures, result-set shape, column order, file formats.
3. **Check each one.** Read it. Say how it's affected or why it isn't.

Output: a table of dependent, how it's touched, how checked, and verdict (safe, affected, unknown). Unknowns are what verification and review need to cover.
