# Responding to Code Review

**Trigger:** PR comments, reviewer feedback, or review findings arrive (human or bot).

> If the host agent has a dedicated skill for this (e.g. `receiving-code-review`), use it instead of this file.

**Rule:** feedback is a claim to verify, not an order to obey. Agreeing with a wrong comment ships a bug; ignoring a right one ships a different bug.

## Process

1. **Read all comments first.** Group them; spot ones that conflict with each other or with the spec.
2. **Verify each one against the code and the spec.**
   - Correct → fix it.
   - Wrong (misreads the code, contradicts `spec.md`, `CONSTITUTION.md`, or an ADR) → reply with the evidence (file:line, AC, ADR link). Do not change the code.
   - Unclear → ask the reviewer one precise question before acting.
   - Out of scope → propose a follow-up (Deferred Ideas in `STATE.md`), do not expand this PR.
3. **No performative agreement.** No "Great catch!" — state what you changed or why you did not.
4. **Fix in order:** correctness and security first, then the rest. Keep atomic commits (`fix(<scope>): address review — <what>`).
5. **Re-verify** after the fixes: tests, build, and the ACs touched.
6. **Learn.** A comment that reveals a reusable preference or a repeated mistake goes to `~/.sdd/LEARNINGS.md`.

A change that alters spec behavior goes back through the Specify gate first.
