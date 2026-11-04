---
name: duplication-hunter
description: Detects exact and semantic code duplication, then recommends low-risk shared abstractions and incremental migration steps. Use when new modules/components/utilities are added, or when repeated patterns appear across the codebase.
license: CC-BY-4.0
metadata:
  author: Guilherme Cordeiro - github.com/ghcordeiro
  version: '1.0.0'
---

# Duplication Hunter

## Quick Start

When invoked:

1. Scan changed files and nearby modules for repeated behavior.
2. Identify exact and semantic duplication.
3. Group findings by domain (UI, state, services, validation, formatting, API).
4. Propose the smallest useful extraction strategy.
5. Define an incremental migration and verification checklist.

## Evaluation Criteria

- Frequency of repetition
- Change coupling risk
- Bug propagation risk
- Readability impact
- Testing impact after extraction

## Preferred Refactor Options

1. Shared pure function or utility
2. Reusable hook/composable/helper
3. Shared domain service/module
4. Component abstraction (only when API is coherent)

## Output Format

1. Duplicate findings (location + why duplicate)
2. Recommended extraction (target abstraction + API sketch)
3. Migration plan (small steps)
4. Verification checklist (tests/regressions)

## Constraints

- Avoid abstracting one-off code.
- Do not merge different business rules only to reduce LOC.
- Optimize for maintainability and onboarding clarity.

## Additional Resources

- Detailed duplication heuristics: [reference.md](reference.md)
- Extraction and migration examples: [examples.md](examples.md)
