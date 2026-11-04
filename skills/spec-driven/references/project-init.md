# Project Initialization

**Trigger:** "Initialize project", "Setup project", "Start new project"

## Process

Extract project vision via iterative Q&A (max 3-5 questions per message):

**Essential questions:**

1. What are you building?
2. Who is it for and what problem does it solve?
3. What tech stack are you using? (if known)
4. What's in scope for v1? What's explicitly excluded?
5. Critical constraints? (timeline, technical, resources)

**Stop when:** Clear understanding of vision, goals, and boundaries.

## Output 1: .specs/project/PROJECT.md

**Structure:**

```markdown
# [Project Name]

**Vision:** [1-2 sentence description]
**For:** [target users]
**Solves:** [core problem being addressed]

## Goals

- [Primary goal with measurable success metric]
- [Secondary goal with measurable success metric]

## Tech Stack

**Core:**

- Framework: [name + version]
- Language: [name + version]
- Database: [name]

**Key dependencies:** [3-5 critical libraries/frameworks]

## Scope

**v1 includes:**

- [Core capability 1]
- [Core capability 2]
- [Core capability 3]

**Explicitly out of scope:**

- [What is NOT being built]
- [What is NOT being built]

## Constraints

- Timeline: [if applicable]
- Technical: [if applicable]
- Resources: [if applicable]
```

**Size limit:** 2,000 tokens (~1,200 words)

---

## Output 2: .specs/project/CONSTITUTION.md (Required)

The constitution is created alongside `PROJECT.md` during initialization. It is **not optional** — every project needs one, even if minimal.

Unlike `PROJECT.md` (which captures mutable project state and goals), `CONSTITUTION.md` captures immutable project laws — constraints and principles that do not change during implementation. Engineers define these once; agents must always honor them.

Walk the user through the five constitution sections. Anything left blank is intentional — only populate what they confirm. If a section has no rules yet, write `[None established — add as needed]`.

See [constitution.md](constitution.md) for the full template and guidance.

**Key questions to ask for each section:**

**Architectural Laws:**
- "Are there any layers or patterns that must always be respected? (e.g., all DB access via repositories, no circular dependencies, specific module structure)"
- "Any patterns that are forbidden?"

**Coding Standards:**
- "Any non-negotiable coding standards? (TypeScript strict mode, mandatory JSDoc, naming conventions)"
- "How strict are you about test coverage?"

**Technology Constraints:**
- "Are any libraries or frameworks locked in? Should the agent avoid adding new ones without approval?"

**Security Laws:**
- "What security rules must always be followed? (authentication requirements, secret management, input validation)"

**Out of Bounds:**
- "Are there any areas of the codebase that should never be touched without human review? (payments, migrations, critical infrastructure)"

**Size limit:** 2,000 tokens. Keep it tight.

---

## Validation

- [ ] Vision clear in 1-2 sentences?
- [ ] Goals have measurable outcomes?
- [ ] Scope boundaries explicit?
- [ ] Constitution created and reviewed with user?
- [ ] Constitution has at least one rule in each section (or explicit "None established")?
