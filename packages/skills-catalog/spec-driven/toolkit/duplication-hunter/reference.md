# Reference Guide

## Duplication Types

### Exact duplication

Same or near-identical blocks with minor naming/formatting differences.

### Semantic duplication

Different code implementing the same business intent.

## Detection Workflow

1. Start from changed files.
2. Search nearby modules with similar responsibilities.
3. Compare inputs, outputs, and side effects.
4. Confirm whether business rules are truly equivalent.
5. Recommend extraction only if repetition is likely to continue.

## Extraction Decision Rules

- Extract now when duplicated logic appears in 2+ active flows and changes together.
- Delay extraction when logic appears once or rules are diverging.
- Prefer pure functions first for easier testing.

## Migration Strategy

1. Create shared abstraction with focused API.
2. Migrate one caller first.
3. Validate behavior with tests.
4. Migrate remaining callers.
5. Remove old duplicated code.

## Regression Checks

- Ensure behavior parity before/after extraction.
- Re-run domain tests covering all migrated callers.
- Watch for accidental coupling or abstraction leakage.
