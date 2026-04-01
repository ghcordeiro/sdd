---
name: spec-driven
description: "THE single command for Tech Leads and Staff Engineers. Orchestrates the full sdd toolkit automatically — you never invoke other skills directly. Drives project and feature work through 4 adaptive phases (Specify, Plan, Tasks, Implement), auto-sizing depth by complexity. Activates the right tool at the right moment: business docs, ADRs (mandatory in Plan), C4 diagrams (mandatory in Plan with user validation), RFCs, TDDs, component design, duplication analysis, code review, accessibility, SEO, CI fixes, browser debugging — all wired in. Stack-agnostic. Triggers on: initialize project, map codebase, specify feature, discuss feature, plan, tasks, implement, validate, verify work, UAT, quick fix, quick task, pause work, resume work."
license: CC-BY-4.0
metadata:
  author: Guilherme Cordeiro - github.com/ghcordeiro
  based-on:
    - original-skill: "tlc-spec-driven by Felipe Rodrigues (github.com/felipfr) — github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(development)/tlc-spec-driven — License: CC-BY-4.0 — Changes: phases renamed (Design→Plan, Execute→Implement), CONSTITUTION.md added, ADRs and C4 diagrams made mandatory in Plan, TDAD and Builder-Verifier patterns added, SDD Philosophy and Maturity Levels added, System Process Context added to Specify"
    - sdd-reference: "Martin Fowler — martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html"
    - sdd-reference: "DS Academy — blog.dsacademy.com.br — Spec-Driven Development series, parts 1–5"
    - sdd-reference: "Microsoft Learn — learn.microsoft.com/pt-br/training/modules/spec-driven-development-github-spec-kit-greenfield-intro/"
  version: 4.0.0
---

# Spec-Driven Development

**The only command you need.** `spec-driven` is the single entry point for all engineering work — it orchestrates the complete sdd toolkit automatically, activating the right skill at the right moment based on what the project actually needs. You never invoke other skills directly.

```
You → /spec-driven → the right tools fire automatically
```

```
┌──────────┐   ┌──────────┐   ┌─────────┐   ┌───────────┐
│ SPECIFY  │ → │   PLAN   │ → │  TASKS  │ → │ IMPLEMENT │
└──────────┘   └──────────┘   └─────────┘   └───────────┘
   required      optional*      optional*      required

* Agent auto-skips when scope doesn't need it
▲ Each arrow is a phase gate — human approval required before advancing
```

## Auto-Sizing: The Core Principle

**The complexity determines the depth, not a fixed pipeline.** Before starting any feature, assess its scope and apply only what's needed:

| Scope       | What                     | Specify                                                 | Plan                                            | Tasks                         | Implement                                             |
| ----------- | ------------------------ | ------------------------------------------------------- | ----------------------------------------------- | ----------------------------- | ----------------------------------------------------- |
| **Small**   | ≤3 files, one sentence   | **Quick mode** — skip pipeline entirely                 | -                                               | -                             | -                                                     |
| **Medium**  | Clear feature, <10 tasks | Spec (brief)                                            | Skip — plan inline                              | Skip — tasks implicit         | Implement + verify                                    |
| **Large**   | Multi-component feature  | Full spec + requirement IDs                             | Architecture + components + ADRs + C4           | Full breakdown + dependencies | Implement + verify per task                           |
| **Complex** | Ambiguity, new domain    | Full spec + [discuss gray areas](references/discuss.md) | [Research](references/plan.md) + architecture + ADRs + C4 | Breakdown + parallel plan     | Implement + [interactive UAT](references/validate.md) |

**Rules:**

- **Specify and Implement are always required** — you always need to know WHAT and DO it
- **Plan is skipped** when the change is straightforward (no architectural decisions, no new patterns)
- **Tasks is skipped** when there are ≤3 obvious steps (they become implicit in Implement)
- **Discuss is triggered within Specify** only when the agent detects ambiguous gray areas that need user input
- **Interactive UAT is triggered within Implement** only for user-facing features with complex behavior
- **Quick mode** is the express lane — for bug fixes, config changes, and small tweaks
- **Phase gates are non-negotiable** — every phase boundary (Specify → Plan, Plan → Tasks, Tasks → Implement) requires explicit human approval before advancing. This is the SDD checkpoint, not a suggestion.

**Safety valve:** Even when Tasks is skipped, Implement ALWAYS starts by listing atomic steps inline (see [implement.md](references/implement.md)). If that listing reveals >5 steps or complex dependencies, STOP and create a formal `tasks.md` — the Tasks phase was wrongly skipped.

---

## SDD Philosophy

Spec-Driven Development rests on three axioms:

**1. Specifications are the source of truth — code is disposable.**
The spec defines what the system must do. Code is how we satisfy it today. If code and spec diverge, the spec wins — update the code to match the spec. If the spec was wrong, update the spec first, then re-derive the code. The `.specs/` directory is the authoritative system model. Code can always be regenerated; a lost spec cannot.

**2. Engineers define WHAT; agents handle HOW.**
Humans set intentions, constraints, and approvals. Agents execute, generate, and verify. The phase gates are where human intention is affirmed before agent execution begins. This is not ceremony — it is the control structure that prevents agentic drift. Without gates, agents optimize locally and lose the plot globally.

**3. The constitution is immutable; everything else evolves.**
`CONSTITUTION.md` captures project laws that survive every session — architectural rules, security constraints, technology boundaries. All other artifacts (specs, plans, tasks) are living documents updated as requirements change. Constitution violations are always bugs; spec changes are normal iteration.

---

### SDD Maturity Levels

| Level | Name | What it means |
|---|---|---|
| 1 | **Spec-First** | Specs written before code, but code can drift from spec over time |
| 2 | **Spec-Anchored** | Spec updated before implementation; code is audited against spec (**default target**) |
| 3 | **Spec-as-Source** | Specs are the canonical system model; code is regenerated/derived from them |

**This skill targets Level 2 by default.** All teams should operate at Level 2 minimum.

**Leveling up:**
- Level 1 → 2: Enforce phase gates. Never update code without confirming the spec is current first.
- Level 2 → 3: Pair all implementation tasks with TDAD test tasks. Achieve spec-to-test-to-code traceability end to end.

---

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
├── features/           # Feature specifications
│   └── [feature]/
│       ├── business.md # [Optional] Business context for external stakeholders
│       ├── spec.md     # Requirements with traceable IDs + System Process Context
│       ├── context.md  # User decisions for gray areas (only when discuss is triggered)
│       ├── plan.md     # Architecture, components, ADRs + C4 diagrams (Large/Complex)
│       └── tasks.md    # Atomic tasks with TDAD test pairs (Large/Complex)
└── quick/              # Ad-hoc tasks (quick mode)
    └── NNN-slug/
        ├── TASK.md
        └── SUMMARY.md
```

**Architecture decisions:** `docs/adr/` (created during Plan phase — mandatory)
**Architecture diagrams:** `docs/architecture/` (C4 diagrams from Plan phase)

## Workflow

**New project:**

1. Initialize project → `CONSTITUTION.md` + `PROJECT.md` + `ROADMAP.md`
2. For each feature → Specify → (Plan) → (Tasks) → Implement (depth auto-sized)

**Existing codebase:**

1. Map codebase → 7 brownfield docs → `duplication-hunter` always runs
2. Initialize project → `CONSTITUTION.md` + `PROJECT.md` + `ROADMAP.md`
3. For each feature → same adaptive workflow

**Quick mode:** Describe → Implement → Verify → Commit (≤3 files, one-sentence scope — no toolkit activations)

**Feature workflow (Large/Complex) — toolkit activations are automatic:**

0. **[Pre-Specify] Linear check** *(condicional — skipped em Quick mode)*: Verifica MCP Linear, pergunta ao usuário se há issue ID, busca contexto via `toolkit/linear/instructions.md` Hook 1. Armazena `LINEAR_ISSUE_ID` na sessão.
1. **Specify:** `spec.md` (System Process Context first → user stories → ACs) → `context.md` (gray areas) → `business.md` (if external stakeholder alignment needed) → `technical-design-doc-creator` (formal TDD needed) → `create-rfc` (high-stakes direction decision)
2. **Plan:** `plan.md` → **ADR(s) for every architectural decision** (always) → **C4 diagrams with user validation** (always — L1+L2 default, sequence optional) → `frontend-component-architect` (UI features) → `duplication-hunter` (brownfield)
3. **Tasks:** TDAD — write test tasks before implementation tasks → `tasks.md` with dependencies

[GATE — usuário aprova tasks.md]

4. **[Post-Tasks] Linear sync** *(condicional — só se `LINEAR_ISSUE_ID` foi fornecido no step 0)*: Atualiza descrição do issue pai + cria sub-issues via `toolkit/linear/instructions.md` Hook 2.
5. **Implement (per task):** Implement (Builder mode) → Verify against spec ACs (Verifier mode) → `code-quality-guardian` (always) → `best-practices` (web) → `accessibility` (UI changes) → `seo` (public pages) → `create-adr` (emergent decisions) → commit → `gh-fix-ci` (if CI fails)

## Context Loading Strategy

**Base load (~17k tokens, always):**

- `CONSTITUTION.md` (if exists — immutable project laws; no-op if absent)
- `PROJECT.md` (if exists)
- `ROADMAP.md` (when planning/working on features)
- `STATE.md` (persistent memory)

**On-demand load:**

- Codebase docs (when working in existing project)
- `CONCERNS.md` (when planning features that touch flagged areas, estimating risk, or modifying fragile components)
- `spec.md` (when working on specific feature)
- `context.md` (when planning or implementing from user decisions)
- `plan.md` (when implementing from plan)
- `tasks.md` (when executing tasks)

**Never load simultaneously:**

- Multiple feature specs
- Multiple architecture docs
- Archived documents

**Target:** <40k tokens total context
**Reserve:** 160k+ tokens for work, reasoning, outputs
**Monitoring:** Display status when >40k (see [context-limits.md](references/context-limits.md))

**Note on CONSTITUTION.md absence:** If `CONSTITUTION.md` does not exist, treat as no-op on load. Prompt creation only during project initialization.

## Commands

**Project-level:**
| Trigger Pattern | Reference |
|----------------|-----------|
| Initialize project, setup project | [project-init.md](references/project-init.md) |
| Create constitution, project laws, coding standards | [constitution.md](references/constitution.md) |
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
| Plan feature, architecture | [plan.md](references/plan.md) |
| Break into tasks, create tasks | [tasks.md](references/tasks.md) |
| Implement task, build, execute | [implement.md](references/implement.md) |
| Validate, verify, test, UAT, walk me through it | [validate.md](references/validate.md) |
| Quick fix, quick task, small change, bug fix | [quick-mode.md](references/quick-mode.md) |

## Skill Integrations

**All skills in this toolkit are always available.** `spec-driven` is the orchestrator — it activates each skill automatically based on what the project needs. No manual checking. No opt-in prompts. The right tool fires at the right moment.

> **Quick mode** is exempt from all integrations. Zero ceremony.

### Plan Phase — Always Produces

The following are **mandatory outputs** of the Plan phase for Medium/Large/Complex features. They are not optional toolkit activations — they are built into the Plan phase process.

| Output | What | How |
|---|---|---|
| **ADR(s)** | One ADR per significant architectural decision | Use `toolkit/create-adr/instructions.md` format. Placed in `docs/adr/`. Required before advancing to Tasks. |
| **C4 Diagrams** | Architecture diagrams with user-selected levels | Agent validates with user: offer L1 (Context), L2 (Container), L3 (Component). Default: L1+L2. Sequence diagram is optional and always feature-scoped. Use `@toolkit/c4-architect` (`toolkit/c4-architect/instructions.md`). **PNG geração obrigatória** — toolkit não está completo sem os `.png` em `docs/architecture/`. |

### Activation Map (Conditional)

| Phase | Skill | Activates when… |
|---|---|---|
| Specify | `business.md` artefact | External stakeholder alignment is needed before spec work |
| Specify | `create-rfc` | Gray area has high-stakes direction trade-offs requiring stakeholder alignment |
| Specify | `technical-design-doc-creator` | Feature requires a formal TDD before planning begins |
| Specify | `skill-architect` | The thing being built IS an AI skill |
| Plan | `frontend-component-architect` | Feature includes UI components (React, Angular, Vue, etc.) |
| Plan | `duplication-hunter` | Brownfield project or large codebase — always run before designing new abstractions |
| Implement | `code-quality-guardian` | Before every commit on Medium/Large features |
| Implement | `best-practices` | Web project — before every commit touching HTTP, HTML, APIs, cookies, or security |
| Implement | `accessibility` | Feature introduces or modifies user-facing UI |
| Implement | `seo` | Feature introduces or modifies public-facing pages, routes, or metadata |
| Implement | `create-adr` | An unexpected architectural decision emerges during implementation |
| Implement | `gh-fix-ci` | CI pipeline fails after a commit |
| Any | `chrome-devtools` | Browser debugging, performance profiling, or rendering issue needs investigation |
| Any | `mermaid-studio` | Diagram creation or rendering is needed (if installed) |
| Any | `codenavi` | Code exploration in an existing repo is needed (if installed) |
| Pre-Specify | `linear` (toolkit) | Usuário usa Linear E MCP está configurado — busca contexto do issue antes do spec |
| Post-Tasks  | `linear` (toolkit) | Issue Linear foi fornecido — sincroniza spec+plan+tasks ao Linear após gate de Tasks |

---

### Business Documentation → `business.md`

**Phase:** Specify — optional artefact, created before `spec.md`, when external stakeholder alignment is needed.

> **Note:** For most features, the Summary and System Process Context sections of `spec.md` are sufficient to communicate business context. The `business.md` artefact is reserved for Large/Complex features where non-technical stakeholders need to review and approve before spec work begins.

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

**Phase:** Plan (mandatory) + Implement (reactive).

**In the Plan phase, ADR creation is not optional.** Every significant architectural decision made while producing `plan.md` must be recorded as an ADR before the phase gate closes. The agent records decisions inline — no delegation, no skipping.

In the Implement phase, if an unexpected architectural decision emerges during a task, invoke `create-adr` before committing that task.

A decision is "significant" if it involves: choice of library/framework, structural patterns, data model strategy, integration approach, security model, or trade-offs with long-term consequences. Trivial implementation choices (variable names, minor formatting) do not qualify.

**Format:** `toolkit/create-adr/instructions.md`. ADRs are placed in `docs/adr/`.

**Rule:** Do not advance from Plan to Tasks, or commit a task in Implement, if a significant architectural decision was made and not yet recorded as an ADR.

---

### Architecture Diagrams → C4

**Phase:** Plan (mandatory for Medium/Large/Complex).

C4 diagrams are a required output of the Plan phase. Before generating, the agent validates with the user:

```
Which architecture diagrams do you want for this feature?
1. Context (L1) — always recommended
2. Container (L2) — for new services/APIs
3. Component (L3) — for deep architectural features
4. Sequence diagram — optional, scoped to [current feature name]

Default: 1 + 2 (press Enter to confirm)
```

**The Sequence diagram is always feature-scoped** — it documents the specific flow triggered by this feature, not the entire system. It is generated after structural diagrams (L1/L2/L3) so the sequence has components to reference.

**Toolkit:** `@toolkit/c4-architect` (`toolkit/c4-architect/instructions.md`). Diagrams are placed in `docs/architecture/`.

**PNG geração é obrigatória.** Para cada diagrama:
1. Gere o `.puml` via `c4_engine.py`
2. Renderize com `plantuml -tpng docs/architecture/*.puml` (instale com `brew install graphviz plantuml` se ausente)
3. Referencie o PNG no `plan.md` com `![Title](docs/architecture/<nome>.png)`

O toolkit não está completo sem os `.png` confirmados em disco.

---

### Technical Design Document → `technical-design-doc-creator`

**Phase:** Specify — for features that require formal documentation before planning begins.

Activate when the feature is complex enough to warrant a TDD: new subsystems, cross-team dependencies, infrastructure changes, or public API contracts. The TDD is produced before `plan.md` and feeds directly into it.

---

### Stakeholder Alignment → `create-rfc`

**Phase:** Specify — when the `discuss` workflow surfaces a high-stakes direction decision.

Activate when a gray area involves choosing between multiple viable architectural or business directions with significant long-term trade-offs. Draft an RFC before finalizing the spec so the decision can be reviewed by stakeholders. Do not activate for every ambiguity — only when the stakes are high enough to warrant formal alignment.

---

### Frontend Component Design → `frontend-component-architect`

**Phase:** Plan — activated for features involving UI components.

For any feature with React, Angular, Vue, or similar UI components, invoke `frontend-component-architect` before writing `plan.md`. This identifies responsibility overload, weak APIs, and missed reuse opportunities before implementation begins.

---

### Code Reuse Analysis → `duplication-hunter`

**Phase:** Plan — activated for brownfield projects or large codebases.

Before designing new abstractions in an existing project, invoke `duplication-hunter` to surface existing utilities and shared extraction candidates. Prevents reinventing what already exists.

---

### Code Review → `code-quality-guardian`

**Phase:** Implement — before every commit on Medium/Large features.

After implementing a task and before `git commit`, invoke `code-quality-guardian` to review changes for correctness, security, maintainability, and architecture fit. Findings are triaged as Critical (must fix before commit), Warning (address or justify), or Suggestion (optional).

---

### Web Standards → `best-practices`

**Phase:** Implement — before every commit in web projects.

For web projects (any feature touching HTTP handlers, HTML, APIs, cookies, or security headers), run `best-practices` as a final gate before committing. Catches security misconfigurations, deprecated APIs, and compatibility issues.

---

### Accessibility → `accessibility`

**Phase:** Implement — activated when the feature introduces or modifies user-facing UI.

For any feature with visible UI changes, invoke `accessibility` before closing the task. Audits against WCAG 2.1 AA: keyboard navigation, screen reader support, color contrast, ARIA roles, and focus management. Skip for internal tooling, APIs, or non-visual features.

---

### SEO → `seo`

**Phase:** Implement — activated when the feature introduces or modifies public-facing pages.

When a feature adds or changes public routes, metadata, or page content, invoke `seo` before closing the task. Covers meta tags, structured data (JSON-LD), sitemap updates, and crawlability. Skip for authenticated-only features, APIs, and internal dashboards.

---

### CI Failures → `gh-fix-ci`

**Phase:** Implement — activated automatically when CI fails after a commit.

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

---

### Linear Integration → `linear`

**Phase:** Pre-Specify (pull) + Post-Tasks (push) — ambos condicionais ao usuário confirmar uso do Linear.

> **Quick mode é isento.** Hooks do Linear não rodam em Quick mode.

**Pre-Specify hook** — antes da fase Specify: verifica se o MCP está acessível via `get_authenticated_user`, pergunta ao usuário se tem um issue Linear para a feature e, se sim, busca o issue via `get_issue` para enriquecer a conversa de spec com requisitos e contexto já capturados. O ID do issue (e seu UUID interno) são armazenados por toda a sessão.

**Post-Tasks hook** — após aprovação do `tasks.md`: lê `spec.md`, `plan.md` e `tasks.md` e então:
1. Atualiza a descrição do issue pai no Linear com resumo estruturado (Objetivo, Fluxo resumido, Requisitos principais, Decisões de arquitetura, NFRs, Fora de escopo, Ordem de execução).
2. Cria um sub-issue por task do `tasks.md`, com título `[TASK-ID] — [task title]` e descrição populada com os campos What / Where / Done-when da task.
3. Atualiza a tabela Sub-issues do issue pai com links para cada sub-issue criado.

**Formato:** `toolkit/linear/instructions.md`

**Skip conditions:**
- Usuário diz "não" ao Linear → ambos os hooks silenciados para toda a sessão.
- MCP não configurado → informa o usuário com link de setup, skipa ambos os hooks, SDD continua normalmente.
- Tasks phase foi skipada (escopo pequeno) → Post-Tasks hook não se aplica; somente o Pre-Specify hook pode ter rodado.

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
- **NEVER assume or fabricate.** If you cannot find an answer, say "I don't know" or "I couldn't find documentation for this". Inventing APIs, patterns, or behaviors causes cascading failures across plan → tasks → implementation. Uncertainty is always preferable to fabrication.

## Output Behavior

**Model guidance:** After completing lightweight tasks (validation, state updates, session handoff), naturally mention once that such tasks work well with faster/cheaper models. Track in STATE.md under `Preferences` to avoid repeating. For heavy tasks (brownfield mapping, complex design), briefly note the reasoning requirements before starting.

Be conversational, not robotic. Don't interrupt workflow—add as a natural closing note. Skip if user seems experienced or has already acknowledged the tip.

## Code Analysis

Use available tools with graceful degradation. See [code-analysis.md](references/code-analysis.md).
