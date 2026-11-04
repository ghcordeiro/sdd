<p align="center">
  <img src="https://img.shields.io/badge/Skill-Spec--Driven-blue?style=for-the-badge" alt="skill badge" />
  <img src="https://img.shields.io/badge/Stack-Agnostic-green?style=for-the-badge" alt="stack agnostic" />
  <img src="https://img.shields.io/badge/Version-4.0.0-purple?style=for-the-badge" alt="version" />
</p>

<h1 align="center">Spec-Driven Development</h1>

<p align="center">
  <strong>The single command for Tech Leads and Staff Engineers. Drives project and feature work through 4 adaptive phases — auto-sizing depth by complexity.</strong>
</p>

<p align="center">
  <strong>Author:</strong> <a href="https://github.com/ghcordeiro">Guilherme Cordeiro</a><br/>
  <em>Based on the original skill by <a href="https://github.com/felipfr">Felipe Rodrigues</a> (Tech Lead's Club) and SDD principles from Martin Fowler, DS Academy, and Microsoft Learn.</em>
</p>

## What Is This Skill?

`spec-driven` is the single entry point for all engineering work. It orchestrates the complete toolkit automatically — activating the right tool at the right moment. You never invoke other tools directly.

```
┌──────────┐   ┌──────────┐   ┌─────────┐   ┌───────────┐
│ SPECIFY  │ → │   PLAN   │ → │  TASKS  │ → │ IMPLEMENT │
└──────────┘   └──────────┘   └─────────┘   └───────────┘
   required      optional*      optional*      required

* Agent auto-skips when scope doesn't need it
▲ Each arrow is a phase gate — human approval required before advancing
```

**The complexity determines the depth:**

| Scope | What happens |
| --- | --- |
| **Small** (≤3 files) | Quick mode — describe → implement → verify → commit |
| **Medium** (clear feature) | Specify → Implement (plan and tasks inline) |
| **Large** (multi-component) | Full pipeline + ADRs + C4 diagrams |
| **Complex** (ambiguity, new domain) | Full pipeline + gray area discussion + research + UAT |

## SDD Philosophy

Three core axioms:

1. **Specifications are the source of truth — code is disposable.** If code and spec diverge, the spec wins. Update the code. If the spec was wrong, update the spec first, then re-derive the code.
2. **Engineers define WHAT; agents handle HOW.** Phase gates are where human intention is affirmed before agent execution begins. Without gates, agents optimize locally and lose the plot globally.
3. **The constitution is immutable; everything else evolves.** `CONSTITUTION.md` captures project laws that survive every session. Constitution violations are always bugs; spec changes are normal iteration.

## Project Structure

```
.specs/
├── project/
│   ├── CONSTITUTION.md # Immutable project laws (architectural, security, coding standards)
│   ├── PROJECT.md      # Vision & goals
│   ├── ROADMAP.md      # Features & milestones
│   └── STATE.md        # Memory: decisions, blockers, lessons, todos, deferred ideas
├── codebase/           # Brownfield analysis (existing projects)
│   ├── STACK.md
│   ├── ARCHITECTURE.md
│   ├── CONVENTIONS.md
│   ├── STRUCTURE.md
│   ├── TESTING.md
│   ├── INTEGRATIONS.md
│   └── CONCERNS.md
├── features/
│   └── [feature]/
│       ├── spec.md     # Requirements + System Process Context + traceable IDs
│       ├── context.md  # User decisions for gray areas (when triggered)
│       ├── plan.md     # Architecture + ADRs + C4 diagrams (Large/Complex)
│       └── tasks.md    # Atomic tasks with TDAD test pairs (Large/Complex)
└── quick/
    └── NNN-slug/
        ├── TASK.md
        └── SUMMARY.md

docs/
├── adr/               # Architecture Decision Records (created during Plan phase)
└── architecture/      # C4 diagrams (created during Plan phase)
```

## The Four Adaptive Phases

### Specify (always)

**Goal:** Capture WHAT to build with testable, traceable requirements.

Before writing user stories, the agent maps the **System Process Context** — understanding which larger process this feature belongs to, what it creates/modifies, and what is impacted. This anchors scope and drives decomposition.

**Decomposition coaching:** If the feature scope is too large, the agent actively helps break it into smaller independently-deliverable pieces. Deferred parts go to ROADMAP.md or STATE.md.

Acceptance criteria follow WHEN/THEN/SHALL format:

```markdown
### P1: User Login ⭐ MVP

WHEN user enters valid credentials THEN system SHALL authenticate and redirect
WHEN user enters invalid credentials THEN system SHALL display error message
WHEN user is already logged in THEN system SHALL redirect to dashboard
```

**Phase gate:** User approves `spec.md` before advancing to Plan.

### Plan (when needed)

**Goal:** Define HOW to build it. Architecture, components, what to reuse.

**Skipped when:** The change is straightforward — no architectural decisions, no new patterns.

**Always produces (not optional):**
- **ADR(s)** — one per significant architectural decision, recorded before advancing to Tasks
- **C4 diagrams** — agent validates with user which levels to generate:

```
Which architecture diagrams do you want?
1. Context (L1) — always recommended
2. Container (L2) — for new services/APIs
3. Component (L3) — for deep architectural features
4. Sequence diagram — optional, scoped to this feature's flow

Default: 1 + 2
```

**Phase gate:** User approves `plan.md` before advancing to Tasks.

### Tasks (when needed)

**Goal:** Break into granular, atomic tasks with clear dependencies.

**Skipped when:** There are ≤3 obvious steps (listed inline at the start of Implement).

**TDAD (Test-Driven Agentic Development):** For Medium/Large/Complex features, test tasks are written before implementation tasks. Each `T[N]-test` establishes the red state; `T[N]` makes it green. Tests are derived directly from the WHEN/THEN ACs in `spec.md`.

```
T1-test: write failing tests for auth interface → run red
T1:      implement auth interface → run green
T2-test: write failing tests for token storage → run red
T2:      implement token storage → run green
```

### Implement (always)

**Goal:** Implement one task at a time. Verify. Commit. Repeat.

**Builder-Verifier pattern:** The agent operates in two explicit modes:
- **Builder mode** — produces code satisfying the task definition
- **Verifier mode** — switches perspective, reads WHEN/THEN ACs from `spec.md` as a separate reviewer, checks each criterion against the produced code

One task = one atomic commit following [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

## Quick Mode

For small tasks (≤3 files, one-sentence scope) that don't need the full pipeline. Zero ceremony — no ADRs, no C4, no TDAD.

```
You: Quick fix: dark mode toggle doesn't persist after page refresh

Agent: Files: src/hooks/useTheme.ts
       Approach: Save preference to localStorage on toggle
       Verify: Toggle → refresh → preference persists

       ✅ fix(theme): persist dark mode preference to localStorage
```

## CONSTITUTION.md

The constitution is created during project initialization and captures immutable project laws:

- **Architectural Laws** — non-negotiable patterns (e.g., "all DB access via repository layer only")
- **Coding Standards** — apply to every file, every commit (e.g., "TypeScript strict, no `any`")
- **Technology Constraints** — locked-in technologies requiring RFC to change
- **Security Laws** — non-negotiable security requirements
- **Out of Bounds** — areas that need explicit human approval before any change

The constitution is loaded at every session start. It is amended only via ADR. Max 2,000 tokens — if it grows beyond that, prune it.

## Commands

### Project-level

| Trigger | Description |
| --- | --- |
| `Initialize project`, `Setup project` | Creates `CONSTITUTION.md` + `PROJECT.md` |
| `Create constitution`, `Project laws` | Creates or updates `CONSTITUTION.md` |
| `Create roadmap`, `Plan features` | Creates `ROADMAP.md` |
| `Map codebase`, `Analyze existing code` | Creates 7 brownfield docs |
| `Document concerns`, `Find tech debt` | Identifies codebase risks |
| `Record decision`, `Log blocker`, `Add todo` | Updates `STATE.md` |
| `Pause work`, `End session` | Creates session handoff |
| `Resume work`, `Continue` | Loads previous state |

### Feature-level (auto-sized)

| Trigger | Description |
| --- | --- |
| `Specify feature`, `Define requirements` | Creates `spec.md` with System Process Context |
| `Discuss feature`, `How should this work` | Captures user decisions for gray areas |
| `Plan feature`, `Architecture` | Creates `plan.md` + ADRs + C4 diagrams |
| `Break into tasks`, `Create tasks` | Creates `tasks.md` with TDAD test pairs |
| `Implement task`, `Build` | Executes task with Builder-Verifier cycle |
| `Validate`, `Verify work`, `UAT` | Feature-level validation and testing |
| `Quick fix`, `Quick task`, `Bug fix` | Express lane for small changes |

## Skill Integrations

### Plan phase — always produces

| Output | When |
| --- | --- |
| ADR(s) | Every significant architectural decision — mandatory before Tasks |
| C4 diagrams | All Medium/Large/Complex features — user selects levels |

### Conditional activations

| Phase | Skill | When |
| --- | --- | --- |
| Specify | `create-rfc` | High-stakes direction decision with stakeholder trade-offs |
| Specify | `technical-design-doc-creator` | Feature needs formal TDD before planning |
| Plan | `frontend-component-architect` | Feature includes UI components |
| Plan | `duplication-hunter` | Brownfield project — before designing new abstractions |
| Implement | `code-quality-guardian` | Before every commit on Medium/Large features |
| Implement | `best-practices` | Web project — any commit touching HTTP, HTML, APIs, security |
| Implement | `accessibility` | Feature introduces or modifies user-facing UI |
| Implement | `seo` | Feature introduces or modifies public-facing pages |
| Implement | `gh-fix-ci` | CI fails after a commit |
| Any | `chrome-devtools` | Browser debugging or performance issue |
| Any | `mermaid-studio` | Diagram creation (if installed) |
| Any | `codenavi` | Code exploration in existing repo (if installed) |

## SDD Maturity Levels

| Level | Name | What it means |
| --- | --- | --- |
| 1 | **Spec-First** | Specs written before code, but code can drift |
| 2 | **Spec-Anchored** | Spec updated before impl; code audited against spec **(default)** |
| 3 | **Spec-as-Source** | Code is regenerated/derived from specs |

## Reference Files

| File | Purpose |
| --- | --- |
| `project-init.md` | Project + CONSTITUTION.md initialization |
| `constitution.md` | Constitution concept, template, and guidance |
| `roadmap.md` | Roadmap creation and milestone tracking |
| `brownfield-mapping.md` | Existing codebase analysis (7 docs) |
| `concerns.md` | Tech debt, risks, and fragile areas |
| `specify.md` | Requirements + System Process Context + decomposition coaching |
| `discuss.md` | Gray area discussion and context capture |
| `plan.md` | Architecture + mandatory ADRs + C4 diagram validation |
| `tasks.md` | Granular task breakdown + TDAD methodology |
| `implement.md` | Builder-Verifier cycle + atomic commits |
| `validate.md` | Feature validation and interactive UAT |
| `quick-mode.md` | Express lane for ad-hoc tasks |
| `session-handoff.md` | Pause/resume work process |
| `state-management.md` | Persistent memory + constitution amendments |
| `coding-principles.md` | Behavioral guidelines for implementation |
| `context-limits.md` | Token budget and monitoring |
| `code-analysis.md` | Available tools and fallbacks |

## Cursor Rules

For Cursor users, a native `.mdc` rule is available in `cursor-rules/spec-driven.mdc`. It encodes the full SDD workflow as an `alwaysApply` rule — loaded automatically in every conversation, without needing to invoke the skill manually.

**Install:**

```bash
# Copy to your project's Cursor rules directory
cp cursor-rules/spec-driven.mdc .cursor/rules/spec-driven.mdc
```

The rule covers the same workflow as the skill (phases, phase gates, ADRs, C4 validation, TDAD, Builder-Verifier, context loading) in a format Cursor loads natively.

---

## Compatibility

Works with any AI coding agent that supports skills or custom instructions.

| Agent | Status |
| --- | --- |
| Claude Code | ✅ Tested |
| Cursor | ✅ Tested |
| GitHub Copilot | ✅ Tested |
| Opencode | ✅ Tested |

## License

This work is licensed under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/).

### Attribution

This skill is a derivative work. The following changes were made to the original:

- Phases renamed: Design → Plan, Execute → Implement
- `CONSTITUTION.md` concept added as immutable project laws layer
- ADRs and C4 diagrams made mandatory (not conditional) in the Plan phase
- C4 diagram user validation checkpoint added
- TDAD (Test-Driven Agentic Development) pattern added to Tasks phase
- Builder-Verifier pattern added to Implement phase
- SDD Philosophy (3 axioms) and Maturity Levels added
- System Process Context and decomposition coaching added to Specify
- Phase gates made explicit as non-negotiable checkpoints

**Original work:**
> *tlc-spec-driven* by [Felipe Rodrigues](https://github.com/felipfr) — [Tech Lead's Club](https://github.com/tech-leads-club)
> Source: https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(development)/tlc-spec-driven
> License: CC-BY-4.0

**SDD references:**
> Martin Fowler — [Spec-Driven Development: 3 Tools](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
> DS Academy — [Spec-Driven Development series (parts 1–5)](https://blog.dsacademy.com.br/spec-driven-development-a-nova-arquitetura-de-engenharia-de-software-na-era-dos-agentes-de-ia-parte-1/)
> Microsoft Learn — [Spec-Driven Development with GitHub Spec Kit](https://learn.microsoft.com/pt-br/training/modules/spec-driven-development-github-spec-kit-greenfield-intro/)
