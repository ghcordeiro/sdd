# Parallel Execution with Subagents

**Trigger:** `tasks.md` has a "Parallel OK" phase with 2+ independent tasks, AND the host agent can dispatch subagents. No subagent support → run the tasks sequentially with [implement.md](implement.md); skip this file.

> If the host agent has a dedicated skill for this (e.g. `subagent-driven-development`, `dispatching-parallel-agents`), use it instead of this file.

## When tasks are truly independent

All must hold, otherwise run them sequentially:
- No shared files in their **Where** fields
- No dependency between them in `tasks.md`
- No shared mutable state (same DB table migration, same config key, same lockfile)

## Process

1. **One subagent per task.** The prompt is self-contained — the subagent has none of your context. Include:
   - the task block from `tasks.md` (What / Where / Reuses / Done when)
   - the matching WHEN/THEN acceptance criteria from `spec.md`
   - relevant constraints from `CONSTITUTION.md` and the plan
   - the rules: touch only the listed files, write the test first, do not commit, report changed files + verification output
2. **Dispatch the batch together.** Wait for all to report.
3. **Verify each result yourself** (Verifier mode in [implement.md](implement.md)). A subagent's "done" is a claim, not evidence. Read the diff, run the checks.
4. **Check the integration**: run the full suite after the whole batch, since independent tasks can still conflict at runtime.
5. **Commit one task at a time** — atomic commits stay the rule, in task order.

## Fallback

A subagent fails or goes off scope → discard its changes, run that task yourself sequentially. Do not retry the same prompt unchanged.
