# Reference Guide

## Review Workflow

1. **Understand intent**
   - Identify what behavior changed.
   - Separate functional changes from refactors.
2. **Inspect risk areas first**
   - Input validation, permissions, persistence, side effects, async flows.
3. **Check regressions**
   - Compare old vs new behavior and edge cases.
4. **Evaluate test impact**
   - Verify critical paths, failure paths, and integration points are covered.
5. **Produce actionable feedback**
   - Provide fix direction and small validation steps.

## Severity Rules

### Critical

Use when there is a high probability of production bug, security issue, data loss, or broken core flow.

### Warning

Use for medium-risk design, reliability, or maintainability issues that can cause future defects.

### Suggestion

Use for optional improvements that increase clarity, consistency, or developer experience.

## Validation Plan Pattern

For each important finding, include:

- What to test
- Expected behavior
- Quick command or scenario

Example:

- Test: invalid payload for signup
- Expected: returns 400 with validation details
- Check: API integration test for invalid body
