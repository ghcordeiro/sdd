# Debug: Root Cause Before Fix

**Trigger:** any bug, failing test, unexpected behavior, or "it doesn't work" — in Quick mode or during Implement.

> If the host agent has a dedicated debugging skill (e.g. `systematic-debugging`), use it instead of this file.

**Iron rule:** no fix without a confirmed root cause. A fix for a symptom you cannot explain is a guess.

## Process

1. **Reproduce.** Get an exact, repeatable trigger: command, input, steps. Capture the exact error text. Cannot reproduce? Gather more data (logs, versions, env) before touching code.
2. **Read the evidence.** Read the full error and stack trace. Note file:line. Check what changed recently (`git log -p`, `git diff`, dependency bumps).
3. **Trace to the source.** Follow the bad value backwards from where it fails to where it is first wrong. The fix goes at the source, not where it crashes.
4. **One hypothesis at a time.** State it: "X fails because Y." Run the smallest experiment that proves or kills it. Change one variable per experiment.
5. **Write the failing test first.** A test (or scripted check) that reproduces the bug and fails for the stated reason.
6. **Fix the root cause once,** in shared code if callers share it. Grep every caller of the function you touch.
7. **Verify.** The new test passes, the original repro passes, the existing suite still passes. Show the output.

## Stop signals

- **3 failed fixes in a row** → stop patching. The model of the problem is wrong. Re-read the evidence, question the architecture, tell the user.
- Fix needs >3 files or a design choice → leave Quick mode, run the full pipeline.
- "It works now and I don't know why" → not done. Find why.

## Record

Add a Lesson Learned to `STATE.md` (Context / Problem / Solution / Prevents). If the mistake would recur in other projects, also add it to `~/.sdd/LEARNINGS.md` under Mistakes to Avoid.
