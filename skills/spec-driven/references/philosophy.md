# SDD Philosophy & Maturity

Load only when the user asks why SDD works this way, questions a phase gate, or wants to level up the team's practice.

## Three Axioms

**1. Specifications are the source of truth — code is disposable.**
The spec defines what the system must do. Code is how we satisfy it today. If code and spec diverge, the spec wins — update the code to match the spec. If the spec was wrong, update the spec first, then re-derive the code. The `.specs/` directory is the authoritative system model. Code can always be regenerated; a lost spec cannot.

**2. Engineers define WHAT; agents handle HOW.**
Humans set intentions, constraints, and approvals. Agents execute, generate, and verify. The phase gates are where human intention is affirmed before agent execution begins. This is not ceremony — it is the control structure that prevents agentic drift. Without gates, agents optimize locally and lose the plot globally.

**3. The constitution is immutable; everything else evolves.**
`CONSTITUTION.md` captures project laws that survive every session — architectural rules, security constraints, technology boundaries. All other artifacts (specs, plans, tasks) are living documents updated as requirements change. Constitution violations are always bugs; spec changes are normal iteration.

## Maturity Levels

| Level | Name | What it means |
|---|---|---|
| 1 | **Spec-First** | Specs written before code, but code can drift from spec over time |
| 2 | **Spec-Anchored** | Spec updated before implementation; code is audited against spec (**default target**) |
| 3 | **Spec-as-Source** | Specs are the canonical system model; code is regenerated/derived from them |

**This skill targets Level 2 by default.** All teams should operate at Level 2 minimum.

**Leveling up:**
- Level 1 → 2: Enforce phase gates. Never update code without confirming the spec is current first.
- Level 2 → 3: Pair all implementation tasks with TDAD test tasks. Achieve spec-to-test-to-code traceability end to end.

## Output Behavior

**Model guidance:** After lightweight tasks (validation, state updates, session handoff), mention once that such tasks work well with faster/cheaper models. Track in `STATE.md` under `Preferences` to avoid repeating. For heavy tasks (brownfield mapping, complex design), briefly note the reasoning requirements before starting. Be conversational; skip if the user is experienced or already acknowledged the tip.
