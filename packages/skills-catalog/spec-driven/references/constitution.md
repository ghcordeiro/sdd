# Constitution

**Purpose:** The `CONSTITUTION.md` is the project's foundational law — a small, stable document that captures immutable constraints, non-negotiable standards, and permanent architectural decisions that every agent session must honor.

**Key property:** Unlike `STATE.md` (changes every session) or `PROJECT.md` (updated as goals evolve), the constitution does NOT change during normal development. It is amended only through an explicit human decision and a new ADR.

---

## Why It Matters in SDD

SDD separates concerns across three layers:

1. **Constitution** — what is always true (immutable project laws)
2. **Project docs** (`PROJECT.md`, `ROADMAP.md`) — what we're building toward (mutable goals)
3. **Feature specs** — what this specific thing does (feature-scoped, disposable after implementation)

The constitution prevents an agent from making locally "smart" decisions that violate project-wide laws. Without it, each session may drift — architectural patterns get invented on the fly, security rules get bypassed for convenience, technology constraints get ignored. The constitution is the guardrail that makes agentic development predictable.

---

## What Goes in the Constitution

The constitution captures **project laws** — things that do not change between sessions and apply to every file, every task, every feature.

**Good candidates:**
- Architectural laws that are non-negotiable (e.g., "All DB access via repository layer only")
- Coding standards that apply everywhere (e.g., "TypeScript strict mode, no `any`")
- Technology constraints that are locked in (e.g., "ORM: Prisma only")
- Security laws (e.g., "All routes require authentication unless explicitly marked public")
- Out-of-bounds areas (e.g., "Never auto-migrate the database")

**What does NOT go in the constitution:**
- Feature-specific decisions (those go in ADRs or `context.md`)
- Session state, current work, or todos (those go in `STATE.md`)
- Goals and roadmap items (those go in `PROJECT.md`/`ROADMAP.md`)
- "Guidelines" or suggestions — the constitution contains only hard rules

---

## When to Consult It

Load the constitution before:
- Any architectural decision in the Plan phase
- Adding a new dependency or technology
- Creating a new module, service, or top-level directory
- Any security-sensitive change
- When `CONCERNS.md` flags a fragile area

---

## When to Update It

The constitution is amended ONLY when:
1. A new architectural law is established → always creates an ADR
2. A security law is tightened → always creates an ADR
3. A technology constraint changes → always requires RFC + ADR
4. An out-of-bounds area is added or removed → always creates an ADR

**Never amend the constitution to "allow" a one-time exception.** One-time exceptions belong in `STATE.md` as decisions (AD-NNN). The constitution contains permanent truths, not workarounds.

---

## Relationship to CLAUDE.md

If the project uses a `CLAUDE.md` file (Claude Code project instructions), the constitution and `CLAUDE.md` should be kept in sync. Cross-cutting coding standards may live in `CLAUDE.md` directly. `CONSTITUTION.md` is the spec-driven layer — it travels with the `.specs/` directory and is loaded as part of base context.

When in doubt: `CLAUDE.md` is for the AI assistant's behavior; `CONSTITUTION.md` is for the project's architectural laws.

---

## Context Loading

The constitution is part of base context (loaded at every session start alongside `PROJECT.md` and `STATE.md`).

**Size limit: 2,000 tokens.** Keep it tight. If it's growing beyond 2k, the constitution is becoming a wiki — prune it. Specifics and rationale belong in ADRs; the constitution captures only the rule itself.

---

## Template

Location: `.specs/project/CONSTITUTION.md`

```markdown
# [Project Name] — Constitution

**Established:** [YYYY-MM-DD]
**Last amended:** [YYYY-MM-DD] via [ADR-NNN]
**Status:** Active — these constraints are permanent for this project

---

## Architectural Laws

Non-negotiable architectural decisions. Cannot be changed without explicit human approval and a new ADR.

- [e.g., "This is a monorepo. New packages require RFC before creation."]
- [e.g., "All database access goes through the repository layer. No direct DB calls in controllers or services."]
- [e.g., "Domain logic lives in the domain layer. No framework imports in domain classes."]

---

## Coding Standards

Standards that apply to every file, every commit, no exceptions.

- [e.g., "TypeScript strict mode. No `any`. No type assertions without inline comment justification."]
- [e.g., "All public functions require JSDoc. Internal functions require inline comments for non-obvious logic."]
- [e.g., "No magic numbers. All constants are named and co-located with their domain."]

---

## Technology Constraints

Technologies that are locked in. Adding or removing requires RFC + ADR.

- [e.g., "ORM: Prisma only. No raw SQL queries."]
- [e.g., "UI: Tailwind CSS only. No inline styles, no CSS modules, no styled-components."]
- [e.g., "State management: Zustand only. No Context API for global state."]

---

## Security Laws

Non-negotiable security requirements.

- [e.g., "All API routes require authentication unless decorated with @Public."]
- [e.g., "No secrets in code or version control. All credentials via environment variables."]
- [e.g., "All user inputs are validated at the API boundary before reaching the domain layer."]

---

## Out of Bounds

Things no agent should ever do in this project without explicit human approval.

- [e.g., "Never modify the payments module without dual-review."]
- [e.g., "Never auto-migrate the production database. All migrations require human review and approval."]
- [e.g., "Never add a new external dependency without updating CONSTITUTION.md first."]

---

## Amendment History

| Amendment | Decision | ADR | Date |
| --------- | -------- | --- | ---- |
| [What changed] | [Why] | [ADR-NNN](docs/adr/NNN-*.md) | [YYYY-MM-DD] |
```
