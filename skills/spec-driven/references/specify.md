# Specify

**Goal**: Capture WHAT to build with testable, traceable requirements.

> **SDD contract:** The spec produced here is the source of truth for the entire pipeline. Code is derived from specs, not the reverse. If implementation reveals the spec was wrong, return here and update the spec first — then propagate changes through plan, tasks, and implementation. Specs are never adjusted silently to match code.

If the feature has ambiguous gray areas (multiple valid approaches for user-facing behavior), the agent will automatically trigger the [discuss gray areas](discuss.md) process within this phase. For clear, well-defined features, it goes straight to the next phase.

## Process

### 1. Clarify Requirements

You are a thinking partner, not an interviewer. Start open — let the user dump their mental model. Follow the energy: whatever they emphasize, dig into that.

Ask conversationally (not as a checklist):

- "What problem are you solving?"
- "Who is the user and what's their pain?"
- "What does success look like?"

If needed:

- "What are the constraints (time, tech, resources)?"
- "What is explicitly out of scope?"

**Challenge vagueness.** Never accept fuzzy answers. "Good" means what? "Users" means who? "Simple" means how? Make the abstract concrete: "Walk me through using this." "What does that actually look like?"

**Know when to stop.** When you understand what they're building, why, who it's for, and what done looks like — offer to proceed.

### 2. Map the System Process (before writing stories)

Before writing user stories, help the user understand where this feature sits within the larger system process.

Ask:

- "Which larger process or flow does this feature belong to?" (e.g., user onboarding, checkout pipeline, notification system)
- "What does this feature create that didn't exist before? What does it change?"
- "What other parts of the system are impacted — even indirectly?"

**Decomposition coaching:** If the user describes something large ("implement the entire checkout flow"), map out the sub-processes and actively help them narrow the scope:

1. List the sub-processes you identify from their description
2. Ask: "Which of these should be the scope of this feature?"
3. Document deferred parts immediately in ROADMAP.md (as future features) or STATE.md (as Deferred Ideas)

The goal is a spec that is independently deliverable — not a spec that requires 3 other features to be meaningful.

### 3. Capture User Stories with Priorities

**P1 = MVP** (must ship), **P2** (should have), **P3** (nice to have)

Each story MUST be **independently testable** - you can implement and demo just that story.

### 4. Write Acceptance Criteria

Use **WHEN/THEN/SHALL** format - it's precise and testable:

- WHEN [event/action] THEN [system] SHALL [response/behavior]

---

## Template: `.specs/features/[feature]/spec.md`

```markdown
# [Feature Name] Specification

## Summary

[2-3 sentences: what is this feature, who is it for, what value does it deliver?
Written for a non-technical stakeholder — this is the headline anyone can read.]

---

## System Process Context

**Part of process:** [Which larger business or system process does this feature belong to?
e.g., "User onboarding flow", "Order checkout pipeline", "Notification delivery system"]

**Creates:** [What new entities, data, capabilities, or behaviors does this feature introduce?]

**Modifies:** [What existing behavior, data, or components does this change?]

**Impacts:** [What other features, services, or user journeys are affected — even indirectly?]

**Process boundary:** [Where does this feature start and end within the larger process?
e.g., "Starts when user clicks 'Pay'. Ends when confirmation email is sent."]

---

## Problem Statement

[Describe the problem in 2-3 sentences. What pain point are we solving? Why now?]

## Goals

- [ ] [Primary goal with measurable outcome]
- [ ] [Secondary goal with measurable outcome]

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature     | Reason         |
| ----------- | -------------- |
| [Feature X] | [Why excluded] |
| [Feature Y] | [Why excluded] |

---

## User Stories

### P1: [Story Title] ⭐ MVP

**User Story**: As a [role], I want [capability] so that [benefit].

**Why P1**: [Why this is critical for MVP]

**Acceptance Criteria**:

1. WHEN [user action/event] THEN system SHALL [expected behavior]
2. WHEN [user action/event] THEN system SHALL [expected behavior]
3. WHEN [edge case] THEN system SHALL [graceful handling]

**Independent Test**: [How to verify this story works alone - e.g., "Can demo by doing X and seeing Y"]

---

### P2: [Story Title]

**User Story**: As a [role], I want [capability] so that [benefit].

**Why P2**: [Why this isn't MVP but important]

**Acceptance Criteria**:

1. WHEN [event] THEN system SHALL [behavior]
2. WHEN [event] THEN system SHALL [behavior]

**Independent Test**: [How to verify]

---

### P3: [Story Title]

**User Story**: As a [role], I want [capability] so that [benefit].

**Why P3**: [Why this is nice-to-have]

**Acceptance Criteria**:

1. WHEN [event] THEN system SHALL [behavior]

---

## Edge Cases

- WHEN [boundary condition] THEN system SHALL [behavior]
- WHEN [error scenario] THEN system SHALL [graceful handling]
- WHEN [unexpected input] THEN system SHALL [validation response]

---

## Requirement Traceability

Each requirement gets a unique ID for tracking across plan, tasks, and validation.

| Requirement ID | Story       | Phase | Status  | Test   |
| -------------- | ----------- | ----- | ------- | ------ |
| [FEAT]-01      | P1: [Story] | Plan  | Pending | Pending |
| [FEAT]-02      | P1: [Story] | Plan  | Pending | Pending |
| [FEAT]-03      | P2: [Story] | -     | Pending | Pending |

**ID format:** `[CATEGORY]-[NUMBER]` (e.g., `AUTH-01`, `CART-03`, `NOTIF-02`)

**Status values:** Pending → In Plan → In Tasks → Implementing → Verified

**Test values:** Pending → T[N]-test created → Verified

**Coverage:** X total, Y mapped to tasks, Z unmapped ⚠️

---

## Success Criteria

How we know the feature is successful:

- [ ] [Measurable outcome - e.g., "User can complete X in < 2 minutes"]
- [ ] [Measurable outcome - e.g., "Zero errors in Y scenario"]
```

---

## Tips

- **Summary first** — Write the 2-3 sentence summary before anything else; it forces clarity
- **System Process Context = scope anchor** — If you can't fill this section clearly, the feature isn't well-defined yet
- **Decompose before specifying** — If the feature touches more than one system process, split it first
- **P1 = Vertical Slice** — A complete, demo-able feature, not just backend or frontend
- **WHEN/THEN is code** — If you can't write it as a test, rewrite it
- **Requirement IDs are mandatory** — Every story maps to trackable IDs
- **Edge cases matter** — What breaks? What's empty? What's huge?
- **Out of Scope prevents creep** — If it's not here, it doesn't get built
- **Phase gate** — User MUST approve spec.md before the pipeline advances to Plan. This is the SDD phase gate. Approval means: "I agree this is what we're building." Once approved, the spec is frozen — changes require going back to this gate.
- **Confirm before Discuss** — User must approve spec before moving to discuss phase
