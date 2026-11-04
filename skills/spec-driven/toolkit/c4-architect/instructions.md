---
name: c4-architect
description: Analyze codebases and generate C4 architecture diagrams as PlantUML, then render PNG/SVG images.
license: CC-BY-4.0
metadata:
  author: Guilherme Cordeiro - github.com/ghcordeiro
  version: '1.0.0'
---

# C4 Architecture Diagrams

## Goal

Generate architecture documentation from source code using C4:

- Context (Level 1)
- Container (Level 2)
- Component (Level 3)
- Sequence (Level 4)

## Engine and examples

The engine and examples are bundled **in the same directory as this file** (`toolkit/c4-architect/`):

- Engine: `scripts/c4_engine.py`
- Examples:
  - `examples/context.json`
  - `examples/container.json`
  - `examples/component.json`
  - `examples/sequence.json`

## Required workflow

1. Discover architecture from repository files (`README.md`, compose/k8s, app entrypoints, ORM/migrations, queues).
2. Build JSON contract for each required C4 level.
3. Generate `.puml` files in `docs/architecture/`.
4. **[OBRIGATÓRIO] Render PNG — o toolkit não termina sem este passo:**

   ```bash
   plantuml -tpng docs/architecture/*.puml
   plantuml -tsvg docs/architecture/*.puml
   ```

   Se PlantUML não estiver instalado, instale **antes de continuar**:

   ```bash
   brew install graphviz plantuml
   ```

   Confirme que os arquivos `.png` foram criados em `docs/architecture/` antes de prosseguir.

5. Referencie cada PNG no documento (`plan.md` ou onde for incorporado):

   ```markdown
   ![Diagram Title](docs/architecture/<nome>.png)
   ```

6. Return generated file paths and a concise architecture summary.

## Generate command

Resolve `<toolkit-dir>` to the directory where this `instructions.md` file lives (e.g. `~/.claude/skills/spec-driven/toolkit/c4-architect` or the repo path if running locally).

```bash
echo '<JSON_OBJECT>' | python3 <toolkit-dir>/scripts/c4_engine.py
```

## Notes

- Include format must be `!include <C4/C4_Context>` and equivalents.
- PNG rendering is not optional — do not return control to the calling phase until PNGs are confirmed on disk.
