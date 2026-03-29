# Reference Guide

## Review Workflow

1. Identify the user-facing behavior changed.
2. Map component tree and responsibility boundaries.
3. Inspect API design for parent/child contracts.
4. Check state ownership and side-effect placement.
5. Evaluate reuse and accessibility implications.
6. Define low-risk refactor and validation path.

## Boundary Heuristics

- Page/container components orchestrate data and side effects.
- Presentational components render UI from inputs and callbacks.
- Shared primitives stay domain-agnostic and composable.

## API Quality Rules

- Names express intent, not implementation details.
- Inputs are minimal and explicit.
- Events/callbacks represent domain actions.
- Avoid "god props" objects unless strictly justified.

## State and Side Effects

- Keep local UI state local.
- Lift state only when multiple siblings need coordination.
- Move async/business logic to hooks/services when it pollutes UI components.

## Validation Checklist Pattern

- Unit tests for pure render and event behavior
- Component tests for interaction flows
- Integration/e2e checks for end-to-end screen behavior
- Accessibility smoke checks for key interactions
