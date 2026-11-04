# Implement

**Goal**: Implement ONE task at a time. Surgical changes. Verify. Commit. Repeat.

This is where code gets written. Every task follows the same cycle: plan → implement → verify → commit. Verification is built into every task, not a separate phase.

---

> **Builder-Verifier Pattern:** During implementation, the agent operates in two distinct modes. In **Builder mode** (Steps 3–4), the focus is solely on producing code that satisfies the task definition. In **Verifier mode** (Steps 5–6), the agent switches perspective — reads the acceptance criteria from `spec.md` as if it were a separate reviewer — and checks the produced code against each WHEN/THEN criterion. This context switch is deliberate: it catches the gaps that a builder mindset tends to overlook.

---

## MANDATORY: Before Starting Any Implementation

**Read [coding-principles.md](coding-principles.md) and state:**

1. **Assumptions** - What am I assuming? Any uncertainty?
2. **Files to touch** - List ONLY files this task requires
3. **Success criteria** - How will I verify this works?

⚠️ **Do not proceed without stating these explicitly.**

---

## Process

### 0. List Atomic Steps (MANDATORY when Tasks phase was skipped)

If there is no `tasks.md` for this feature, you MUST list atomic steps before writing any code. This is non-negotiable — it prevents the agent from losing focus and doing too many things at once.

```
## Execution Plan

1. [Step] → files: [list] → verify: [how] → commit: [message]
2. [Step] → files: [list] → verify: [how] → commit: [message]
3. [Step] → files: [list] → verify: [how] → commit: [message]
```

**Each step must be:**

- ONE deliverable (one component, one function, one endpoint, one file change)
- Independently verifiable (can prove it works before moving on)
- Independently committable (gets its own atomic git commit)

If listing steps reveals >5 steps or complex dependencies, STOP and create a formal `tasks.md` instead. The Tasks phase was wrongly skipped.

### 1. Pick Task

From `tasks.md` (if exists) or from the execution plan above. User specifies ("implement T3") or suggest next available.

### 2. Verify Dependencies

If `tasks.md` exists, check dependencies. If using inline plan, follow the order listed.

❌ If blocked: "T3 depends on T2 which isn't done. Should I do T2 first?"

### 3. State Implementation Plan (Builder mode begins)

Before writing code:

```
Files: [list]
Approach: [brief description]
Success: [how to verify]
```

### 4. Implement

- Follow "What" and "Where" exactly
- Reference "Reuses" for patterns
- Apply [coding-principles.md](coding-principles.md):
  - Simplest code that works
  - Touch ONLY listed files
  - No scope creep

### 5. Verify "Done When" (Verifier mode begins)

Switch mode: load the WHEN/THEN acceptance criteria from `spec.md` for this user story. Check each criterion as a verifier — not the builder who just wrote the code. Ask: "Would this criterion pass if I had no knowledge of the implementation?"

Confirm each AC from `spec.md` is traceable to the changes in this commit.

### 6. Self-Check

Ask: "Would senior engineer flag this as overcomplicated?"

- Yes → Simplify before continuing
- No → Proceed to git commit

### 7. Atomic Git Commit

Each task gets its own commit immediately after verification. Never batch multiple tasks into one commit.

**Format ([Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)):**

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**

| Type       | When to use                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | New feature or capability                               |
| `fix`      | Bug fix                                                 |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `docs`     | Documentation only                                      |
| `test`     | Adding or correcting tests                              |
| `style`    | Formatting, missing semicolons, etc. (no code change)   |
| `perf`     | Performance improvement                                 |
| `build`    | Build system or external dependencies                   |
| `ci`       | CI configuration files and scripts                      |
| `chore`    | Maintenance tasks that don't modify src or test files   |

**Scope:** Feature name or module area, lowercase, e.g., `auth`, `cart`, `api`

**Description rules:**

- Imperative mood ("add", not "added" or "adds")
- Lowercase first letter
- No period at the end
- Complete the sentence: "If applied, this commit will _[your description]_"

**Breaking changes:** Append `!` after type/scope AND add `BREAKING CHANGE:` footer:

```
feat(api)!: change authentication endpoint response format

BREAKING CHANGE: login endpoint now returns JWT in body instead of cookie
```

**Examples:**

```
feat(auth): add email validation to login form
```

```
fix(cart): prevent negative quantity on item decrement
```

```
refactor(api): extract token refresh logic into service

Move token refresh from inline handler to dedicated AuthTokenService
for reuse across multiple endpoints.
```

**Rules:**

- One task = one commit
- Description references what was DONE, not what was planned
- Include only files listed in the task — never sneak in "while I'm here" changes
- If tests are part of the task, include them in the same commit

### 8. Scope Guardrail

During implementation, you will notice things that could be improved, refactored, or added. **Do not act on them.** Instead:

- If it's a bug: note it in STATE.md as a blocker or use quick mode
- If it's an improvement: note it in STATE.md under "Deferred Ideas" or "Lessons Learned"
- If it's related to the current task: only include it if it's in the "Done when" criteria

**The heuristic:** "Is this in my task definition?" If no, don't touch it.

### 9. Update Task Status

Mark task complete in `tasks.md`. Update requirement traceability in `spec.md` if requirement IDs are used.

---

## Execution Template

```markdown
## Implementing T[X]: [Task Title]

**Reading**: task definition from tasks.md
**Dependencies**: [All done? ✅ | Blocked by: TY]

### Pre-Implementation (MANDATORY)

- **Assumptions**: [state explicitly]
- **Files to touch**: [list ONLY these]
- **Success criteria**: [how to verify]

### Implementation (Builder mode)

[Do the work]

### Verification (Verifier mode)

- [x] WHEN/THEN criterion 1 from spec.md → [PASS/FAIL]
- [x] WHEN/THEN criterion 2 from spec.md → [PASS/FAIL]
- [x] No unnecessary changes made
- [x] Matches existing patterns

**Status**: ✅ Complete | ❌ Blocked | ⚠️ Partial
```

---

## Tips

- **One task at a time** — Focus prevents errors
- **Builder → Verifier** — Always switch mode before verifying; builder bias is real
- **WHEN/THEN = test** — Each acceptance criterion is a test; if it passes, the task is done
- **Tools matter** — Wrong MCP = wrong approach
- **Reuses save tokens** — Copy patterns, don't reinvent
- **Check before commit** — Verify all criteria, then commit
- **Stay surgical** — Touch only what's necessary
- **Commit per task** — Clean git history enables bisect and rollback
- **Never "while I'm here"** — Scope creep during implementation is the #1 quality killer
- **Learn from mistakes** — If something goes wrong, add a Lesson Learned to STATE.md
