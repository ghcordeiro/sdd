# Learnings (Cross-Project Memory)

**Purpose:** Remember how the user works across ALL projects — preferences, stack, patterns, mistakes to avoid, and the projects themselves. Project-specific memory stays in `STATE.md` (see [state-management.md](state-management.md)).

**Output:** `~/.sdd/LEARNINGS.md` (global, outside any repo). Create it on first write with the template below.

The Markdown file is **always** the source of truth. It works with no tools installed. If a memory MCP (e.g. agentmemory) is available, use it **in addition**, never instead.

## Where does a learning go?

| Learning | Goes to |
|---|---|
| Applies only to this repo (decision, blocker, local lesson) | `.specs/project/STATE.md` |
| Applies to how the user works anywhere (preference, habit, stack choice, recurring correction) | `~/.sdd/LEARNINGS.md` |
| Immutable project law | `.specs/project/CONSTITUTION.md` |

When unsure, ask: "would this matter in a different project?" Yes → global. No → `STATE.md`.

## Template

```markdown
# SDD Learnings

**Last Updated:** [YYYY-MM-DD]

## Preferences & Way of Working

- [YYYY-MM-DD] [Preference] — Why: [reason the user gave]

## Stack & Code Patterns

- [YYYY-MM-DD] [Pattern / preferred library / convention] — Why: [reason]

## Mistakes to Avoid

- [YYYY-MM-DD] [What went wrong] → [what to do instead]

## Projects

| Project | Path | One-line summary | Last touched |
| ------- | ---- | ---------------- | ------------ |
| [name]  | [absolute path] | [what it is] | [YYYY-MM-DD] |
```

## When to READ

- Start of **Specify**, start of **Plan**, and on **resume work**.
- Read the whole file (keep it small — see Hygiene). Apply preferences silently; do not recite them back.
- If a memory MCP is available, also run a recall for the feature topic and the current project.

## When to WRITE

1. **Phase gate approved** (Specify, Plan, Tasks, Implement) — record any new cross-project preference or pattern that surfaced. Update the project's row in `## Projects`.
2. **User corrects the agent** ("don't do X", "always Y", "I prefer Z") — record it immediately under Preferences or Mistakes to Avoid, with the user's reason.
3. **A decision is made that reflects a general preference** (e.g. chose library A over B "because I always use A") — record under Stack & Code Patterns.

If a memory MCP is available, save the same entry there too.

Do not announce routine writes. One short line is enough: `Learning saved: [summary]`.

## Hygiene

- **One line per entry**, dated, with the *why*. No narratives.
- **Deduplicate:** update an existing entry instead of adding a near-copy. If a new learning contradicts an old one, replace the old one.
- **Keep it under ~150 lines.** When it grows, merge related entries and drop ones the user no longer follows.
- **Never store** secrets, credentials, tokens, customer data, or private personal information.
- Only write what the user said or clearly confirmed. Never record guesses as facts.

## Quick mode

Quick mode skips reading. It still writes when the user corrects the agent (rule 2).
