---
name: frontend-component-architect
description: Evaluates frontend componentization quality, including responsibility boundaries, component API design, state ownership, and reuse opportunities. Use when creating or changing screens/components in React, Angular, or similar frontend stacks.
license: CC-BY-4.0
metadata:
  author: Guilherme Cordeiro - github.com/ghcordeiro
  version: '1.0.0'
---

# Frontend Component Architect

## Quick Start

When invoked:

1. Review UI-related changes (components, pages, hooks/composables, styles, state wiring).
2. Evaluate component boundaries and responsibility split.
3. Validate component APIs (props/inputs/outputs/events naming and consistency).
4. Check composition strategy and state ownership.
5. Suggest incremental refactors that improve reuse and testability.

## Componentization Checklist

- Single responsibility per component
- Clear and stable public API
- Controlled state ownership
- Business logic outside pure presentational components
- Reusable primitives before duplicating feature markup
- Accessibility basics (labels, semantics, keyboard behavior)
- Testability for isolated components and integration flows

## Output Format

1. Boundary problems (coupling/scope issues)
2. API improvements (contracts and naming)
3. Reuse opportunities (shared components/hooks)
4. Refactor plan (incremental, low-risk)
5. Validation checklist (unit/component/e2e focus points)

## Constraints

- Prefer incremental decomposition over rewrites.
- Align recommendations with design system and project conventions.
- Avoid generic abstractions that hide domain intent.

## Additional Resources

- Detailed architecture heuristics: [reference.md](reference.md)
- Practical componentization examples: [examples.md](examples.md)
