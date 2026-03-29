---
name: spec-driven
description: "THE single command for Tech Leads and Staff Engineers. Orchestrates the full tech-lead-tools toolkit automatically — you never invoke other skills directly. Drives project and feature work through 4 adaptive phases (Specify, Design, Tasks, Execute), auto-sizing depth by complexity. Activates the right tool at the right moment: business docs, ADRs, C4 diagrams, RFCs, TDDs, component design, duplication analysis, code review, accessibility, SEO, CI fixes, browser debugging — all wired in. Stack-agnostic. Triggers on: initialize project, map codebase, specify feature, discuss feature, design, tasks, implement, validate, verify work, UAT, quick fix, quick task, pause work, resume work."
license: CC-BY-4.0
metadata:
  author: Felipe Rodrigues - github.com/felipfr
  version: 3.0.0
---

# Spec-Driven Development

**The only command you need.** `spec-driven` is the single entry point for all engineering work — it orchestrates the complete tech-lead-tools toolkit automatically, activating the right skill at the right moment based on what the project actually needs. You never invoke other skills directly.

```
You → /spec-driven → the right tools fire automatically
```

```
┌──────────┐   ┌──────────┐   ┌─────────┐   ┌─────────┐
│ SPECIFY  │ → │  DESIGN  │ → │  TASKS  │ → │ EXECUTE │
└──────────┘   └──────────┘   └─────────┘   └─────────┘
   required      optional*      optional*     required

* Agent auto-skips when scope doesn't need it
```

## Auto-Sizing: The Core Principle

**The complexity determines the depth, not a fixed pipeline.** Before starting any feature, assess its scope and apply only what's needed:

| Scope       | What                     | Specify                                                 | Design                                          | Tasks                         | Execute                                               |
| ----------- | ------------------------ | ------------------------------------------------------- | ----------------------------------------------- | ----------------------------- | ----------------------------------------------------- |
| **Small**   | ≤3 files, one sentence   | **Quick mode** — skip pipeline entirely                 | -                                               | -                             | -                                                     |
| **Medium**  | Clear feature, <10 tasks | Spec (brief)                                            | Skip — design inline                            | Skip — tasks implicit         | Implement + verify                                    |
| **Large**   | Multi-component feature  | Full spec + requirement IDs                             | Architecture + components                       | Full breakdown + dependencies | Implement + verify per task                           |
| **Complex** | Ambiguity, new domain    | Full spec + [discuss gray areas](references/discuss.md) | [Research](references/design.md) + architecture | Breakdown + parallel plan     | Implement + [interactive UAT](references/validate.md) |

**Rules:**

- **Specify and Execute are always required** — you always need to know WHAT and DO it
- **Design is skipped** when the change is straightforward (no architectural decisions, no new patterns)
- **Tasks is skipped** when there are ≤3 obvious steps (they become implicit in Execute)
- **Discuss is triggered within Specify** only when the agent detects ambiguous gray areas that need user input
- **Interactive UAT is triggered within Execute** only for user-facing features with complex behavior
- **Quick mode** is the express lane — for bug fixes, config changes, and small tweaks

**Safety valve:** Even when Tasks is skipped, Execute ALWAYS starts by listing atomic steps inline (see [implement.md](references/implement.md)). If that listing reveals >5 steps or complex dependencies, STOP and create a formal `tasks.md` — the Tasks phase was wrongly skipped.

## Project Structure

```
.specs/
├── project/
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
├── features/           # Feature specifications
│   └── [feature]/
│       ├── business.md # Business context & user journey (Large/Complex — created in Specify)
│       ├── spec.md     # Requirements with traceable IDs
│       ├── context.md  # User decisions for gray areas (only when discuss is triggered)
│       ├── design.md   # Architecture & components (only for Large/Complex)
│       └── tasks.md    # Atomic tasks with verification (only for Large/Complex)
└── quick/              # Ad-hoc tasks (quick mode)
    └── NNN-slug/
        ├── TASK.md
        └── SUMMARY.md
```

## Workflow

**New project:**

1. Initialize project → PROJECT.md + ROADMAP.md
2. For each feature → Specify → (Design) → (Tasks) → Execute (depth auto-sized)

**Existing codebase:**

1. Map codebase → 7 brownfield docs → `duplication-hunter` always runs
2. Initialize project → PROJECT.md + ROADMAP.md
3. For each feature → same adaptive workflow

**Quick mode:** Describe → Implement → Verify → Commit (≤3 files, one-sentence scope — no toolkit activations)

**Feature workflow (Large/Complex) — toolkit activations are automatic:**

1. **Specify:** `business.md` (always) → `spec.md` → `context.md` (gray areas) → `technical-design-doc-creator` (formal TDD needed) → `create-rfc` (high-stakes direction decision)
2. **Design:** `design.md` → `create-adr` (every architectural decision) → `c4-architect` (system boundary changes) → `frontend-component-architect` (UI features) → `duplication-hunter` (brownfield)
3. **Tasks:** Break into atomic tasks → `tasks.md` with dependencies
4. **Execute (per task):** Implement → `code-quality-guardian` (always) → `best-practices` (web) → `accessibility` (UI changes) → `seo` (public pages) → `create-adr` (emergent decisions) → commit → `gh-fix-ci` (if CI fails)

## Context Loading Strategy

**Base load (~15k tokens):**

- PROJECT.md (if exists)
- ROADMAP.md (when planning/working on features)
- STATE.md (persistent memory)

**On-demand load:**

- Codebase docs (when working in existing project)
- CONCERNS.md (when planning features that touch flagged areas, estimating risk, or modifying fragile components)
- business.md (when designing or implementing — provides business context and user journey)
- spec.md (when working on specific feature)
- context.md (when designing or implementing from user decisions)
- design.md (when implementing from design)
- tasks.md (when executing tasks)

**Never load simultaneously:**

- Multiple feature specs
- Multiple architecture docs
- Archived documents

**Target:** <40k tokens total context
**Reserve:** 160k+ tokens for work, reasoning, outputs
**Monitoring:** Display status when >40k (see [context-limits.md](references/context-limits.md))

## Commands

**Project-level:**
| Trigger Pattern | Reference |
|----------------|-----------|
| Initialize project, setup project | [project-init.md](references/project-init.md) |
| Create roadmap, plan features | [roadmap.md](references/roadmap.md) |
| Map codebase, analyze existing code | [brownfield-mapping.md](references/brownfield-mapping.md) |
| Document concerns, find tech debt, what's risky | [concerns.md](references/concerns.md) |
| Record decision, log blocker, add todo | [state-management.md](references/state-management.md) |
| Pause work, end session | [session-handoff.md](references/session-handoff.md) |
| Resume work, continue | [session-handoff.md](references/session-handoff.md) |

**Feature-level (auto-sized):**
| Trigger Pattern | Reference |
|----------------|-----------|
| Specify feature, define requirements | [specify.md](references/specify.md) |
| Discuss feature, capture context, how should this work | [discuss.md](references/discuss.md) |
| Design feature, architecture | [design.md](references/design.md) |
| Break into tasks, create tasks | [tasks.md](references/tasks.md) |
| Implement task, build, execute | [implement.md](references/implement.md) |
| Validate, verify, test, UAT, walk me through it | [validate.md](references/validate.md) |
| Quick fix, quick task, small change, bug fix | [quick-mode.md](references/quick-mode.md) |

## Skill Integrations

**All skills in this toolkit are always available.** `spec-driven` is the orchestrator — it activates each skill automatically based on what the project needs. No manual checking. No opt-in prompts. The right tool fires at the right moment.

> **Quick mode** is exempt from all integrations. Zero ceremony.

### Activation Map

| Phase | Skill | Activates when… |
|---|---|---|
| Specify | `business.md` artefact | Feature is Large or Complex |
| Specify | `create-rfc` | Gray area has high-stakes direction trade-offs requiring stakeholder alignment |
| Specify | `technical-design-doc-creator` | Feature requires a formal TDD before design begins |
| Specify | `skill-architect` | The thing being built IS an AI skill |
| Design | `create-adr` | Any significant architectural decision is made |
| Design | `c4-architect` | Feature introduces or changes system boundaries (new service, API, DB, queue, inter-system flow) |
| Design | `frontend-component-architect` | Feature includes UI components (React, Angular, Vue, etc.) |
| Design | `duplication-hunter` | Brownfield project or large codebase — always run before designing new abstractions |
| Execute | `code-quality-guardian` | Before every commit on Medium/Large features |
| Execute | `best-practices` | Web project — before every commit touching HTTP, HTML, APIs, cookies, or security |
| Execute | `accessibility` | Feature introduces or modifies user-facing UI |
| Execute | `seo` | Feature introduces or modifies public-facing pages, routes, or metadata |
| Execute | `create-adr` | An unexpected architectural decision emerges during implementation |
| Execute | `gh-fix-ci` | CI pipeline fails after a commit |
| Any | `chrome-devtools` | Browser debugging, performance profiling, or rendering issue needs investigation |
| Any | `mermaid-studio` | Diagram creation or rendering is needed (if installed) |
| Any | `codenavi` | Code exploration in an existing repo is needed (if installed) |

---

### Business Documentation → `business.md`

**Phase:** Specify — first artefact created, before `spec.md`, for Large/Complex features.

Captures the feature from a business perspective: the *why* before the *how*. Written in non-technical language so any stakeholder can understand the full picture.

**Template** (`.specs/features/[feature]/business.md`):
```markdown
# [Feature Name] — Business Document

## Overview
Non-technical description of what will be built.

## Problem / Opportunity
What motivated this feature? What pain does it solve or opportunity does it capture?

## Personas / Impacted Users
Who uses it? How do they use it today? How will they use it after?

## User Journey (Start to Finish)
Narrative walkthrough of the full journey: entry point → actions → expected outcome.
May include a simplified flow diagram.

## Success Criteria (Business)
How will we know it worked? Metrics, KPIs, expected behaviours.

## Out of Scope
What is explicitly NOT included in this version.

## Business Dependencies
Other teams, processes, or systems that need to be aligned.
```

---

### Architecture Decisions → `create-adr`

**Phase:** Design (proactive) + Execute (reactive). **Always activated when a significant architectural decision is made.**

Before finalizing `design.md`, or before committing a task that involved an architectural choice, invoke `create-adr` to record the decision as an ADR.

A decision is "significant" if it involves: choice of library/framework, structural patterns, data model strategy, integration approach, security model, or trade-offs with long-term consequences. Trivial implementation choices (variable names, minor formatting) do not qualify.

**Rule:** Do not advance from Design to Tasks, or commit a task in Execute, if a significant architectural decision was made and not yet recorded as an ADR.

---

### Architecture Diagrams → `c4-architect`

**Phase:** Design. **Always activated when the feature introduces or changes system boundaries.**

When `design.md` describes new services, APIs, databases, queues, or inter-system flows, delegate C4 diagram generation to `c4-architect` (Level 1 Context, Level 2 Container, Level 3 Component as applicable).

For purely internal/isolated changes (single module refactor with no system boundary impact), skip.

---

### Technical Design Document → `technical-design-doc-creator`

**Phase:** Specify — for features that require formal documentation before design begins.

Activate when the feature is complex enough to warrant a TDD: new subsystems, cross-team dependencies, infrastructure changes, or public API contracts. The TDD is produced before `design.md` and feeds directly into it.

---

### Stakeholder Alignment → `create-rfc`

**Phase:** Specify — when the `discuss` workflow surfaces a high-stakes direction decision.

Activate when a gray area involves choosing between multiple viable architectural or business directions with significant long-term trade-offs. Draft an RFC before finalizing the spec so the decision can be reviewed by stakeholders. Do not activate for every ambiguity — only when the stakes are high enough to warrant formal alignment.

---

### Frontend Component Design → `frontend-component-architect`

**Phase:** Design — always activated for features involving UI components.

For any feature with React, Angular, Vue, or similar UI components, invoke `frontend-component-architect` before writing `design.md`. This identifies responsibility overload, weak APIs, and missed reuse opportunities before implementation begins.

---

### Code Reuse Analysis → `duplication-hunter`

**Phase:** Design — always activated for brownfield projects or large codebases.

Before designing new abstractions in an existing project, invoke `duplication-hunter` to surface existing utilities and shared extraction candidates. Prevents reinventing what already exists.

---

### Code Review → `code-quality-guardian`

**Phase:** Execute — before every commit on Medium/Large features.

After implementing a task and before `git commit`, invoke `code-quality-guardian` to review changes for correctness, security, maintainability, and architecture fit. Findings are triaged as Critical (must fix before commit), Warning (address or justify), or Suggestion (optional).

---

### Web Standards → `best-practices`

**Phase:** Execute — before every commit in web projects.

For web projects (any feature touching HTTP handlers, HTML, APIs, cookies, or security headers), run `best-practices` as a final gate before committing. Catches security misconfigurations, deprecated APIs, and compatibility issues.

---

### Accessibility → `accessibility`

**Phase:** Execute — always activated when the feature introduces or modifies user-facing UI.

For any feature with visible UI changes, invoke `accessibility` before closing the task. Audits against WCAG 2.1 AA: keyboard navigation, screen reader support, color contrast, ARIA roles, and focus management. Skip for internal tooling, APIs, or non-visual features.

---

### SEO → `seo`

**Phase:** Execute — activated when the feature introduces or modifies public-facing pages.

When a feature adds or changes public routes, metadata, or page content, invoke `seo` before closing the task. Covers meta tags, structured data (JSON-LD), sitemap updates, and crawlability. Skip for authenticated-only features, APIs, and internal dashboards.

---

### CI Failures → `gh-fix-ci`

**Phase:** Execute — activated automatically when CI fails after a commit.

When the pipeline breaks, invoke `gh-fix-ci` immediately to inspect logs and draft a targeted fix. Do not proceed to the next task until CI is green.

---

### Browser Debugging → `chrome-devtools`

**Phase:** Any — activated when a browser rendering, performance, or JavaScript issue needs investigation.

For runtime errors, layout bugs, performance regressions, or network issues in a web project, delegate debugging to `chrome-devtools` before attempting blind fixes.

---

### Skill Building → `skill-architect`

**Phase:** Specify — only when the thing being built IS an AI skill.

When the user is building or designing a new `SKILL.md`, delegate the skill design process to `skill-architect`. It guides through Discovery → Architecture → Craft → Validate → Deliver.

---

### Diagrams → `mermaid-studio`

Whenever the workflow requires creating or updating a diagram, check if `mermaid-studio` is installed. If it is, delegate diagram creation and rendering to it. If not, use inline mermaid code blocks.

---

### Code Exploration → `codenavi`

Whenever the workflow requires exploring an existing repository (brownfield mapping, pattern identification, dependency tracing), check if `codenavi` is installed. If it is, delegate code exploration to it. If not, use built-in code analysis tools (see [code-analysis.md](references/code-analysis.md)).

## Knowledge Verification Chain

When researching, designing, or making any technical decision, follow this chain in strict order. Never skip steps.

```
Step 1: Codebase → check existing code, conventions, and patterns already in use
Step 2: Project docs → README, docs/, inline comments, .specs/codebase/
Step 3: Context7 MCP → resolve library ID, then query for current API/patterns
Step 4: Web search → official docs, reputable sources, community patterns
Step 5: Flag as uncertain → "I'm not certain about X — here's my reasoning, but verify"
```

**Rules:**

- Never skip to Step 5 if Steps 1-4 are available
- Step 5 is ALWAYS flagged as uncertain — never presented as fact
- **NEVER assume or fabricate.** If you cannot find an answer, say "I don't know" or "I couldn't find documentation for this". Inventing APIs, patterns, or behaviors causes cascading failures across design → tasks → implementation. Uncertainty is always preferable to fabrication.

## Output Behavior

**Model guidance:** After completing lightweight tasks (validation, state updates, session handoff), naturally mention once that such tasks work well with faster/cheaper models. Track in STATE.md under `Preferences` to avoid repeating. For heavy tasks (brownfield mapping, complex design), briefly note the reasoning requirements before starting.

Be conversational, not robotic. Don't interrupt workflow—add as a natural closing note. Skip if user seems experienced or has already acknowledged the tip.

## Code Analysis

Use available tools with graceful degradation. See [code-analysis.md](references/code-analysis.md).
