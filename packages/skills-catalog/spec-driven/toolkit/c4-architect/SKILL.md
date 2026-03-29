---
name: c4-architect
description: Analyze codebases and generate C4 architecture diagrams as PlantUML, then render PNG/SVG images.
---

# C4 Architecture Diagrams

## Goal

Generate architecture documentation from source code using C4:

- Context (Level 1)
- Container (Level 2)
- Component (Level 3)
- Sequence (Level 4)

## Engine and examples

- Engine: `~/.cursor/skills/c4-architect/scripts/c4_engine.py`
- Examples:
  - `~/.cursor/skills/c4-architect/examples/context.json`
  - `~/.cursor/skills/c4-architect/examples/container.json`
  - `~/.cursor/skills/c4-architect/examples/component.json`
  - `~/.cursor/skills/c4-architect/examples/sequence.json`

## Required workflow

1. Discover architecture from repository files (`README.md`, compose/k8s, app entrypoints, ORM/migrations, queues).
2. Build JSON contract for each required C4 level.
3. Generate `.puml` files in `docs/architecture/`.
4. Render image docs:

```bash
plantuml -tpng docs/architecture/*.puml
plantuml -tsvg docs/architecture/*.puml
```

5. Return generated file paths and a concise architecture summary.

## Generate command

```bash
echo '<JSON_OBJECT>' | python3 ~/.cursor/skills/c4-architect/scripts/c4_engine.py
```

## Notes

- Include format must be `!include <C4/C4_Context>` and equivalents.
- If PlantUML is missing on macOS:

```bash
brew install graphviz plantuml
```
