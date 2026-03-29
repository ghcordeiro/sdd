---
name: spec-driven
description: Project and feature planning with 4 adaptive phases - Specify, Design, Tasks, Execute. Auto-sizes depth by complexity. Creates atomic tasks with verification criteria, atomic git commits, requirement traceability, and persistent memory across sessions. Orchestrates complementary skills: business documentation (business.md), architecture decision records (create-adr), C4 diagrams (c4-architect), stakeholder alignment (create-rfc), frontend componentization (frontend-component-architect), code reuse analysis (duplication-hunter), code review (code-quality-guardian), web best practices (best-practices), SEO (seo), and skill design (skill-architect). Stack-agnostic. Use when (1) Starting new projects (initialize vision, goals, roadmap), (2) Working with existing codebases (map stack, architecture, conventions), (3) Planning features (requirements, design, task breakdown), (4) Implementing with verification and atomic commits, (5) Quick ad-hoc tasks (bug fixes, config changes), (6) Tracking decisions/blockers/deferred ideas across sessions, (7) Pausing/resuming work. Triggers on "initialize project", "map codebase", "specify feature", "discuss feature", "design", "tasks", "implement", "validate", "verify work", "UAT", "quick fix", "quick task", "pause work", "resume work". Do NOT use for architecture decomposition analysis (use architecture skills) or technical design docs (use create-technical-design-doc).
license: CC-BY-4.0
metadata:
  author: Felipe Rodrigues - github.com/felipfr
  version: 2.0.0
---

# Spec-Driven Development

Plan and implement projects with precision. Granular tasks. Clear dependencies. Right tools. Zero ceremony.

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

1. Map codebase → 7 brownfield docs + optionally `duplication-hunter`
2. Initialize project → PROJECT.md + ROADMAP.md
3. For each feature → same adaptive workflow

**Quick mode:** Describe → Implement → Verify → Commit (for ≤3 files, one-sentence scope — no skill integrations)

**Feature workflow (Large/Complex):**

1. **Specify:** Create `business.md` first → then `spec.md` → resolve gray areas in `context.md` → optionally trigger `create-rfc` for high-stakes direction decisions
2. **Design:** Draft `design.md` → record all architectural decisions via `create-adr` → generate C4 diagrams via `c4-architect` if system boundaries change → optionally invoke `frontend-component-architect` (frontend) or `duplication-hunter` (brownfield)
3. **Tasks:** Break into atomic tasks → `tasks.md` with dependencies
4. **Execute (per task):** Implement → review with `code-quality-guardian` + `best-practices` (web) → record any emergent architectural decisions via `create-adr` → commit → optionally run `seo` audit (public pages)

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

This skill coexists with other skills. Before specific tasks, check if complementary skills are installed and prefer them when available.

The table below summarizes when each integration applies and whether it is **mandatory** (the phase does not advance without it) or **optional** (offered when context is unambiguous, user can decline):

| Phase | Skill | When | Level |
|---|---|---|---|
| Specify | `business.md` artefact | Large/Complex features | **Mandatory** |
| Specify | `create-rfc` | Ambiguous direction needing stakeholder alignment | Optional |
| Specify | `skill-architect` | Project/feature being built IS a skill | Optional |
| Design | `create-adr` | Any significant architectural decision | **Mandatory** |
| Design | `c4-architect` | Feature changes system containers or components | **Mandatory** |
| Design | `frontend-component-architect` | Frontend feature (React, Angular, etc.) | Optional |
| Design | `duplication-hunter` | Brownfield project or large codebase | Optional |
| Execute | `code-quality-guardian` | Medium/Large feature, before each commit | Contextual |
| Execute | `best-practices` | Web project, before each commit | Contextual |
| Execute | `seo` | Feature exposes public-facing URLs/pages | Optional |
| Execute | `create-adr` | Unexpected architectural decision emerges | **Mandatory** |
| Any | `mermaid-studio` | Diagram creation/rendering needed | Contextual |
| Any | `codenavi` | Code exploration in existing repo | Contextual |

> **Quick mode** is exempt from all integrations. Zero ceremony.

---

### Business Documentation → `business.md` (new artefact)

**Phase:** Specify — created as the first artefact before `spec.md` for Large/Complex features.

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

### Architecture Decisions → create-adr

**Phase:** Design (proactive) + Execute (reactive). **Mandatory whenever a significant architectural decision is made.**

Before finalizing `design.md` or before committing a task that involved an architectural choice, **always** check if `create-adr` is installed. If it is, invoke it to record the decision as an ADR. If it is not installed, document the decision inline in `design.md` and recommend installing `create-adr`.

A decision is "significant" if it involves: choice of library/framework, structural patterns, data model strategy, integration approach, security model, or trade-offs with long-term consequences. Trivial implementation choices (variable names, minor formatting) do not qualify.

**Rule:** Do not advance from Design to Tasks, or commit a task in Execute, if a significant architectural decision was made and not yet recorded.

---

### Architecture Diagrams → c4-architect

**Phase:** Design. **Mandatory when the feature changes or introduces system-level containers or components.**

When `design.md` describes new services, APIs, databases, queues, or inter-system flows, **always** check if `c4-architect` is installed. If it is, delegate C4 diagram generation to it (Level 1 Context, Level 2 Container, Level 3 Component as applicable). If it is not installed, proceed with inline mermaid diagrams and recommend installing `c4-architect` for richer PlantUML-rendered diagrams.

For purely internal/isolated changes (e.g., a single module refactor with no system boundary changes), C4 diagrams are optional.

---

### Stakeholder Alignment → create-rfc

**Phase:** Specify (when gray areas involve high-impact direction decisions). Optional.

When the `discuss` workflow detects that a gray area requires choosing between multiple viable directions with significant architectural or business trade-offs, **check if `create-rfc` is installed**. If it is, offer to draft an RFC before finalizing the spec so the decision can be reviewed by stakeholders. If the user declines or `create-rfc` is not installed, resolve the decision inline in `context.md` as usual.

Do not offer `create-rfc` for every ambiguity — only when the stakes are high enough to warrant formal stakeholder review.

---

### Frontend Component Design → frontend-component-architect

**Phase:** Design. Optional — frontend projects only.

When the feature involves UI components (React, Angular, Vue, etc.) and `frontend-component-architect` is installed, **offer to evaluate component boundaries** before writing `design.md`. This identifies responsibility overload, weak APIs, and missed reuse opportunities before implementation begins. If the user declines, continue with inline component design.

---

### Code Reuse Analysis → duplication-hunter

**Phase:** Design. Optional — brownfield projects or large codebases.

When mapping an existing codebase or designing a feature in a brownfield project, **check if `duplication-hunter` is installed** and offer to scan for reuse opportunities before designing new abstractions. This prevents reinventing existing utilities and surfaces shared extraction candidates. If the user declines or the project is greenfield, skip.

---

### Code Review → code-quality-guardian

**Phase:** Execute — before committing each task in Medium/Large features. Contextual (skip in Quick mode).

After implementing a task and before running `git commit`, **check if `code-quality-guardian` is installed** and invoke it to review the changes for correctness, security, maintainability, and architecture fit. Findings are triaged as Critical (must fix before commit), Warning (address or justify), or Suggestion (optional). If not installed, perform a manual inline review checklist.

---

### Web Standards → best-practices

**Phase:** Execute — before committing tasks in web projects. Contextual (skip in Quick mode).

For web projects (any feature touching HTTP handlers, HTML, APIs, cookies, or security headers), **check if `best-practices` is installed** and run it as a final gate before committing. This catches security misconfigurations, deprecated APIs, and compatibility issues. If not installed, run a manual checklist covering: HTTPS, CSP, input sanitization, secure cookies, and error handling.

---

### SEO → seo

**Phase:** Execute — after implementing features that expose public-facing URLs or pages. Optional.

When a feature introduces or modifies public-facing pages, routes, or metadata, **check if `seo` is installed** and offer to run an SEO audit before closing the task. This covers meta tags, structured data, sitemap updates, and crawlability. If the feature is internal (authenticated-only, APIs, dashboards), skip entirely.

---

### Skill Building → skill-architect

**Phase:** Specify. Optional — only when the project/feature being built IS a skill.

When the user is building or designing a new AI skill (a `SKILL.md` file), **check if `skill-architect` is installed** and delegate the skill design process to it. It guides through Discovery → Architecture → Craft → Validate → Deliver, ensuring the skill follows quality patterns. If not installed, proceed with inline skill design.

---

### Diagrams → mermaid-studio

Whenever the workflow requires creating or updating a diagram (architecture overviews, data flows, component diagrams, sequence diagrams, etc.), **always** check if the `mermaid-studio` skill is installed in the user's environment before proceeding. If it is installed, delegate all diagram creation and rendering to it. If it is not installed, proceed with inline mermaid code blocks as usual and recommend the user install `mermaid-studio` for richer diagram capabilities (rendering to SVG/PNG, validation, theming, etc.). Display this recommendation at most once per session.

---

### Code Exploration → codenavi

Whenever the workflow requires exploring or discovering things in an existing repository (brownfield mapping, code reuse analysis, pattern identification, dependency tracing, etc.), **always** check if the `codenavi` skill is installed in the user's environment before proceeding. If it is installed, delegate code exploration and navigation tasks to it. If it is not installed, fall back to the built-in code analysis tools (see [code-analysis.md](references/code-analysis.md)) and recommend the user install `codenavi` for more effective codebase exploration. Display this recommendation at most once per session.

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
