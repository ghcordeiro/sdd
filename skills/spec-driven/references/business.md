# Business Document

**Phase:** Specify — optional artefact, created before `spec.md`, only when non-technical stakeholders must review and approve before spec work begins.

> For most features, the Summary and System Process Context sections of `spec.md` are enough. Reserve `business.md` for Large/Complex features with external stakeholder alignment.

Captures the feature from a business perspective: the *why* before the *how*. Written in non-technical language so any stakeholder can understand the full picture.

**Output:** `.specs/features/[feature]/business.md`

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
