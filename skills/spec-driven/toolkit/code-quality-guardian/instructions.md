---
name: code-quality-guardian
description: Reviews code changes for correctness, security, maintainability, architecture fit, and test coverage risks in large codebases. Use when reviewing pull requests, validating recent edits, or when the user asks for a quality review.
license: MIT
---

# Code Quality Guardian

## Quick Start

When invoked:

1. Inspect changed files and behavior impacts first.
2. Prioritize findings by severity: Critical, Warnings, Suggestions.
3. Focus on correctness, security, maintainability, and tests.
4. Propose practical, incremental fixes.
5. Add a minimal executable validation plan.

## Mandatory Checklist

- Correctness and edge cases
- Error handling and fallback behavior
- Security and input validation
- Readability and naming clarity
- Maintainability and architectural consistency
- Performance hotspots and unnecessary complexity
- Test coverage for happy and failure paths

## Output Format

1. Critical issues (must fix before merge)
2. Warnings (should fix soon)
3. Suggestions (nice improvements)
4. Test plan (quick checklist)

## Constraints

- Be objective, concise, and evidence-based.
- Avoid suggesting large rewrites unless necessary.
- Prefer low-risk improvements aligned with existing architecture.

## Additional Resources

- Detailed workflow and quality gates: [reference.md](reference.md)
- Ready-to-use review examples: [examples.md](examples.md)
