---
name: spec-driven
description: "THE single command for Tech Leads and Staff Engineers. Orchestrates the full sdd toolkit automatically — you never invoke other skills directly. Drives project and feature work through 4 adaptive phases (Specify, Plan, Tasks, Implement), auto-sizing depth by complexity, loading only the guidance each step needs. Wires in ADRs and C4 diagrams (mandatory in Plan), RFCs, TDDs, business docs, component design, duplication analysis, code and security review, root-cause debugging, parallel subagent execution, branch/PR finishing, accessibility, SEO, CI fixes, browser debugging, and a cross-project learning loop. Stack-agnostic. Triggers on: initialize project, map codebase, specify feature, discuss feature, plan, tasks, implement, validate, verify work, UAT, quick fix, bug fix, debug, review feedback, pause work, resume work, remember this."
license: CC-BY-4.0
metadata:
  author: Guilherme Cordeiro - github.com/ghcordeiro
  based-on:
    - original-skill: "tlc-spec-driven by Felipe Rodrigues (github.com/felipfr) — github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(development)/tlc-spec-driven — License: CC-BY-4.0 — Changes: phases renamed (Design→Plan, Execute→Implement), CONSTITUTION.md added, ADRs and C4 diagrams made mandatory in Plan, TDAD and Builder-Verifier patterns added, SDD Philosophy and Maturity Levels added, System Process Context added to Specify"
    - sdd-reference: "Martin Fowler — martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html"
    - sdd-reference: "DS Academy — blog.dsacademy.com.br — Spec-Driven Development series, parts 1–5"
    - sdd-reference: "Microsoft Learn — learn.microsoft.com/pt-br/training/modules/spec-driven-development-github-spec-kit-greenfield-intro/"
  version: 4.1.0
---

# Spec-Driven Development

**The only command you need.** `spec-driven` is the single entry point for all engineering work. It routes each step to the right guidance file and loads **only** that file. You never invoke other skills directly.

```
┌──────────┐   ┌──────────┐   ┌─────────┐   ┌───────────┐
│ SPECIFY  │ → │   PLAN   │ → │  TASKS  │ → │ IMPLEMENT │
└──────────┘   └──────────┘   └─────────┘   └───────────┘
   required      optional*      optional*      required

* Agent auto-skips when scope doesn't need it
▲ Each arrow is a phase gate — human approval required before advancing
```

## Loading Rule (read first)

This file is a router. Everything else is loaded **on demand**:

- Load a `references/*.md` file only when its trigger in the tables below applies.
- Load a `toolkit/*/instructions.md` file only when the Activation Map says it fires — never "just in case".
- **Host skill first:** before loading a toolkit or reference file, check whether the host agent already has an equivalent skill or command (table below). If it does, use the host's and skip the file — never load both.
- Never load several feature specs, architecture docs, or archived documents at once.

## Auto-Sizing: The Core Principle

**The complexity determines the depth, not a fixed pipeline.** Assess scope before starting any feature:

| Scope       | What                     | Specify                                                 | Plan                                            | Tasks                         | Implement                                             |
| ----------- | ------------------------ | ------------------------------------------------------- | ----------------------------------------------- | ----------------------------- | ----------------------------------------------------- |
| **Small**   | ≤3 files, one sentence   | **Quick mode** — skip pipeline entirely                 | -                                               | -                             | -                                                     |
| **Medium**  | Clear feature, <10 tasks | Spec (brief)                                            | Skip — plan inline                              | Skip — tasks implicit         | Implement + verify                                    |
| **Large**   | Multi-component feature  | Full spec + requirement IDs + readiness check           | Architecture + components + ADRs + C4           | Full breakdown + dependencies | Branch + implement + verify per task                  |
| **Complex** | Ambiguity, new domain    | Full spec + [discuss gray areas](references/discuss.md) | [Research](references/plan.md) + architecture + ADRs + C4 | Breakdown + parallel plan     | Branch + implement + [interactive UAT](references/validate.md) |

**Rules:**

- **Specify and Implement are always required** — you always need to know WHAT and DO it
- **Plan is skipped** when the change is straightforward (no architectural decisions, no new patterns)
- **Tasks is skipped** when there are ≤3 obvious steps (they become implicit in Implement)
- **Discuss** triggers within Specify only for ambiguous gray areas; **Interactive UAT** within Implement only for complex user-facing behavior
- **Quick mode** is the express lane — bug fixes with known cause, config changes, small tweaks
- **Phase gates are non-negotiable** — Specify → Plan, Plan → Tasks, Tasks → Implement each need explicit human approval
- **Spec wins** — if code and spec diverge, fix the code; if the spec was wrong, update the spec first. Why: [philosophy.md](references/philosophy.md)

**Safety valve:** Even when Tasks is skipped, Implement ALWAYS starts by listing atomic steps inline. If that reveals >5 steps or complex dependencies, STOP and create `tasks.md`.

## Project Structure

```
.specs/
├── project/        CONSTITUTION.md · PROJECT.md · ROADMAP.md · STATE.md (project memory)
├── codebase/       STACK · ARCHITECTURE · CONVENTIONS · STRUCTURE · TESTING · INTEGRATIONS · CONCERNS (.md)
├── features/[feature]/
│                   business.md (opt) · spec.md · context.md (opt) · plan.md · tasks.md
└── quick/NNN-slug/ TASK.md · SUMMARY.md
docs/adr/           ADRs (mandatory in Plan)
docs/architecture/  C4 diagrams + PNGs (mandatory in Plan)
~/.sdd/LEARNINGS.md cross-project memory (global)
```

## Workflow

**New project:** Initialize → `CONSTITUTION.md` + `PROJECT.md` + `ROADMAP.md` → per feature: Specify → (Plan) → (Tasks) → Implement.
**Existing codebase:** Map codebase (7 docs, `duplication-hunter` always runs) → Initialize → same per-feature flow.
**Quick mode:** Describe → Implement → Verify → Commit. No toolkit activations.

**Feature workflow (Large/Complex):**

0. **Pre-Specify:** Linear check (if the user uses Linear) · recall learnings
1. **Specify:** `spec.md` → `context.md` (gray areas) → `business.md` / TDD / RFC (only if triggered) → readiness check → **GATE**
2. **Plan:** `plan.md` → ADRs (always) → C4 + PNGs (always) → component design / duplication analysis (if triggered) → **GATE**
3. **Tasks:** TDAD — test tasks before implementation tasks → `tasks.md` with dependencies and parallel phases → **GATE** → Linear sync (if used)
4. **Implement:** branch/worktree → per task: Builder → Verifier (evidence) → reviews (if triggered) → atomic commit → finish branch → CI

## Context Loading

**Base load (always, small):** `CONSTITUTION.md` · `PROJECT.md` · `STATE.md` (each a no-op if absent). `ROADMAP.md` when planning features. `~/.sdd/LEARNINGS.md` at the start of Specify, Plan, and resume.

**On demand:** codebase docs (existing project) · `CONCERNS.md` (touching flagged areas) · the current feature's `spec.md` / `context.md` / `plan.md` / `tasks.md` only.

**Target:** <40k tokens of loaded context. Monitor per [context-limits.md](references/context-limits.md).

## Commands → Reference Files

| Trigger | Load |
|---|---|
| Initialize project, setup project | [project-init.md](references/project-init.md) |
| Create constitution, project laws, coding standards | [constitution.md](references/constitution.md) |
| Create roadmap, plan features | [roadmap.md](references/roadmap.md) |
| Map codebase, analyze existing code | [brownfield-mapping.md](references/brownfield-mapping.md) + [code-analysis.md](references/code-analysis.md) |
| Document concerns, tech debt, what's risky | [concerns.md](references/concerns.md) |
| Record decision, log blocker, add todo | [state-management.md](references/state-management.md) |
| Remember this, learn this, always/never do X | [learnings.md](references/learnings.md) |
| Pause work, end session, resume, continue | [session-handoff.md](references/session-handoff.md) |
| Specify feature, define requirements | [specify.md](references/specify.md) |
| Business context for non-technical stakeholders | [business.md](references/business.md) |
| Discuss feature, gray areas, how should this work | [discuss.md](references/discuss.md) |
| Plan feature, architecture | [plan.md](references/plan.md) |
| Break into tasks | [tasks.md](references/tasks.md) |
| Implement task, build, execute | [implement.md](references/implement.md) + [coding-principles.md](references/coding-principles.md) |
| Start/finish feature branch, open PR, merge | [branch-workflow.md](references/branch-workflow.md) |
| Run parallel tasks with subagents | [parallel-execution.md](references/parallel-execution.md) |
| Validate, verify, test, UAT | [validate.md](references/validate.md) |
| Bug, failing test, unexpected behavior, debug | [debug.md](references/debug.md) |
| PR comments, review feedback | [review-response.md](references/review-response.md) |
| Quick fix, quick task, small change | [quick-mode.md](references/quick-mode.md) |
| Why SDD, maturity levels, why this gate | [philosophy.md](references/philosophy.md) |

## Activation Map (toolkit — load only when it fires)

Quick mode is exempt from all activations.

| Phase | Toolkit file | Fires when… |
|---|---|---|
| Pre-Specify / Post-Tasks | `toolkit/linear/instructions.md` | User confirms they use Linear and the MCP is reachable (Hook 1 pulls the issue; Hook 2 syncs after the Tasks gate). User says no → silence both for the session |
| Specify | `toolkit/technical-design-doc-creator/instructions.md` | Formal TDD needed: new subsystem, cross-team dependency, infra change, public API contract. Load only the `sections/` files the TDD uses |
| Specify | `toolkit/create-rfc/instructions.md` | A gray area has high-stakes direction trade-offs needing stakeholder sign-off |
| Specify | `toolkit/skill-architect/instructions.md` | The thing being built IS an AI skill |
| Plan | `toolkit/create-adr/instructions.md` | **Always** — one ADR per significant decision (library, structural pattern, data model, integration, security model, long-term trade-off). Also in Implement for emergent decisions |
| Plan | `toolkit/c4-architect/instructions.md` | **Always** for Medium+ — user picks levels (default L1+L2), PNGs mandatory. Details in [plan.md](references/plan.md) |
| Plan | `toolkit/frontend-component-architect/instructions.md` | Feature includes UI components |
| Plan | `toolkit/duplication-hunter/instructions.md` | Brownfield or large codebase, before designing new abstractions |
| Implement | `toolkit/code-quality-guardian/instructions.md` | Before every commit on Medium/Large features |
| Implement | [security.md](references/security.md) | Change touches auth, external input, secrets, crypto, payments, PII, paths, shell/SQL |
| Implement | `toolkit/best-practices/instructions.md` | Web project: HTTP, HTML, APIs, cookies, security headers |
| Implement | `toolkit/accessibility/instructions.md` | User-facing UI is added or changed |
| Implement | `toolkit/seo/instructions.md` | Public pages, routes, or metadata change |
| Implement | `toolkit/gh-fix-ci/instructions.md` | CI fails after a push — do not start the next task until green |
| Any | `toolkit/chrome-devtools/instructions.md` | Browser rendering, performance, network, or JS runtime issue |

## Host Skill First

If the host agent has one of these, use it **instead of** the sdd file (do not load both):

| Need | Host skill/command examples | sdd fallback |
|---|---|---|
| Root-cause debugging | `systematic-debugging` | [debug.md](references/debug.md) |
| Test-first implementation | `test-driven-development` | TDAD in [tasks.md](references/tasks.md) |
| Evidence before "done" | `verification-before-completion` | Verifier mode in [implement.md](references/implement.md) |
| Code review | `code-review`, `requesting-code-review` | `code-quality-guardian` |
| Security review | `security-review` | [security.md](references/security.md) |
| Responding to review | `receiving-code-review` | [review-response.md](references/review-response.md) |
| Branch / worktree / finish | `using-git-worktrees`, `finishing-a-development-branch` | [branch-workflow.md](references/branch-workflow.md) |
| Parallel subagents | `subagent-driven-development`, `dispatching-parallel-agents` | [parallel-execution.md](references/parallel-execution.md) |
| Diagrams beyond C4 (flow, sequence, state, ER) | `archify`, `mermaid-studio` | inline Mermaid in `plan.md` |
| Code exploration | `graphify`, `codenavi` | [code-analysis.md](references/code-analysis.md) |

The host's skill replaces the sdd file's *method*, never the sdd *outputs*: specs, ADRs, C4 PNGs, `tasks.md`, and gates stay mandatory.

## Learning Loop

The agent learns how the user works and carries it across projects. Rules: [learnings.md](references/learnings.md) (load when writing).

- **Read** `~/.sdd/LEARNINGS.md` at the start of Specify, Plan, and resume.
- **Write** at every phase gate, whenever the user corrects the agent, and when a decision reflects a general preference.
- Project-only → `STATE.md`. Cross-project → `~/.sdd/LEARNINGS.md`. The Markdown is always written; a memory MCP, if present, is used in addition.

## Companion Tools (use if available)

Optional. Detect them; never install or configure them yourself. If one is missing and would help, mention it once and note that in `STATE.md` under `Preferences`.

| Tool | How the skill uses it |
|---|---|
| **agentmemory** (MCP) | Recall feature topic + project before Specify/Plan; save the same entries written to `LEARNINGS.md` / `STATE.md` |
| **Context7** (MCP) | Plan and Implement: query library docs before choosing or using an external API — never trust memory for versions or signatures |
| **RTK** (CLI) | Nothing to do — hooks compress command output. Output truncated or garbled → re-run with `rtk bypass <cmd>` |
| **graphify** (skill/CLI) | Brownfield mapping and "what calls X": query the graph before broad file reads |
| **PR/CI watcher** (e.g. `pr-watch` MCP, `gh run watch`) | After push in [branch-workflow.md](references/branch-workflow.md): wait on CI instead of polling; on failure, `gh-fix-ci` |

## Knowledge Verification Chain

For any technical decision, in strict order:

1. **Codebase** — existing code, conventions, patterns
2. **Project docs** — README, `docs/`, `.specs/codebase/`
3. **Context7 MCP** — resolve library ID, then query current API/patterns
4. **Web search** — official docs, reputable sources
5. **Flag as uncertain** — "I'm not certain about X — here's my reasoning, but verify"

Never skip to step 5 when 1–4 are available. **Never assume or fabricate** — inventing APIs or behavior cascades through plan → tasks → code. "I don't know" beats a guess.
