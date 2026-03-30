<div align="center">

# sdd

**Spec-Driven Development toolkit for AI agents.**

Install battle-tested SDD skills into Claude Code, Cursor, GitHub Copilot, Gemini CLI, and Antigravity — in seconds.

[![npm version](https://img.shields.io/npm/v/@ghcordeiro/sdd?color=crimson&label=npm)](https://www.npmjs.com/package/@ghcordeiro/sdd)
[![CI](https://github.com/ghcordeiro/sdd/actions/workflows/ci.yml/badge.svg)](https://github.com/ghcordeiro/sdd/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node.js ≥22](https://img.shields.io/badge/node-%3E%3D22-brightgreen)](https://nodejs.org)

```bash
npx @ghcordeiro/sdd
```

</div>

---

## What is this?

`sdd` installs a curated set of AI agent skills for Spec-Driven Development — spec-driven planning, architecture documentation, ADR creation, C4 diagrams, code quality review, RFC writing, and more.

All skills are installed at once, as a single toolkit. No picking and choosing — just run, select your agent, and get to work.

Each skill is a self-contained `SKILL.md` file that gives your AI agent deep, specialized knowledge. Plain Markdown. No cloud dependency. No lock-in.

---

## Quick Start

```bash
npx @ghcordeiro/sdd
```

The interactive CLI walks you through three steps:

```
  ◆ SDD
  Spec-Driven Development toolkit for AI agents
  14 skills ready to install into your AI agent

  Get started →

? Select your AI agent(s):
  ↑/↓ navigate  ·  Space toggle  ·  A select all  ·  Enter confirm

  ◉  Claude Code
  ○  Cursor
  ○  GitHub Copilot
  ○  Gemini CLI
  ○  Antigravity

? Install globally or in current project?
  › Global  (~/ — available in all projects)
    Local   (./ — current project only)

Ready to install 14 skills into:
  • Claude Code  (~/.claude/skills/)

  › Install all 14 skills

✓ Installation complete
  ✓ spec-driven
  ✓ c4-architect
  ✓ create-adr
  ✓ create-rfc
  ✓ code-quality-guardian
  ✓ duplication-hunter
  ✓ best-practices
  ✓ frontend-component-architect
  ✓ technical-design-doc-creator
  ✓ seo
  ✓ accessibility
  ✓ chrome-devtools
  ✓ gh-fix-ci
  ✓ cursor-subagent-creator
  ✓ skill-architect
  → ~/.claude/skills/

14 skills installed successfully
```

---

## Non-interactive (scripts & CI)

```bash
npx @ghcordeiro/sdd install \
  --agent claude-code \
  --skills spec-driven \
  --global
```

| Flag | Alias | Description |
|---|---|---|
| `--agent <id>` | `-a` | Target agent (see supported agents below) |
| `--skills <ids>` | `-s` | Comma-separated skill IDs (e.g. `spec-driven`) |
| `--global` | | Install to home directory `~/` (default) |
| `--local` | | Install to current project directory `./` |

You can always inspect the full CLI help with:

```bash
npx @ghcordeiro/sdd --help
```

---

## Supported Agents

| Agent | ID | Global install path |
|---|---|---|
| [Claude Code](https://claude.ai/code) | `claude-code` | `~/.claude/skills/` |
| [Cursor](https://cursor.sh) | `cursor` | `~/.cursor/rules/` |
| [GitHub Copilot](https://github.com/features/copilot) | `github-copilot` | `~/.github-copilot/skills/` |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | `gemini-cli` | `~/.gemini/skills/` |
| [Antigravity](https://antigravity.dev) | `antigravity` | `~/.antigravity/skills/` |

---

## Skills Included

### 🏗️ Planning & Architecture

| Skill | Description |
|---|---|
| [`spec-driven`](packages/skills-catalog/spec-driven/) | Full project & feature planning with 4 adaptive phases: **Specify → Design → Tasks → Execute**. Orchestrates all other skills. |
| [`c4-architect`](packages/skills-catalog/c4-architect/) | Generates C4 architecture diagrams (Context, Container, Component, Sequence) from source code using PlantUML. |
| [`frontend-component-architect`](packages/skills-catalog/frontend-component-architect/) | Evaluates React/Angular component boundaries, API design quality, state ownership, and reuse opportunities. |
| [`technical-design-doc-creator`](packages/skills-catalog/technical-design-doc-creator/) | Creates comprehensive Technical Design Documents (TDDs) for implementation planning. |

### 📋 Decision & Documentation

| Skill | Description |
|---|---|
| [`create-adr`](packages/skills-catalog/create-adr/) | Creates immutable Architecture Decision Records (ADRs) in MADR, Nygard, or Y-Statement format. |
| [`create-rfc`](packages/skills-catalog/create-rfc/) | Creates structured Request for Comments (RFCs) to drive stakeholder alignment before committing to a direction. |

### 🔍 Code Quality

| Skill | Description |
|---|---|
| [`code-quality-guardian`](packages/skills-catalog/code-quality-guardian/) | Reviews code for correctness, security, maintainability, and architecture fit — findings triaged as Critical / Warning / Suggestion. |
| [`duplication-hunter`](packages/skills-catalog/duplication-hunter/) | Detects exact and semantic code duplication and recommends low-risk shared abstractions with migration steps. |
| [`best-practices`](packages/skills-catalog/best-practices/) | Audits web projects for security misconfigurations, deprecated APIs, and modern code quality standards. |

### 🌐 Web & Frontend

| Skill | Description |
|---|---|
| [`seo`](packages/skills-catalog/seo/) | Optimizes pages for search visibility — meta tags, structured data (JSON-LD), sitemaps, and crawlability. |
| [`accessibility`](packages/skills-catalog/accessibility/) | Audits and improves web accessibility following WCAG 2.1 AA guidelines. |
| [`chrome-devtools`](packages/skills-catalog/chrome-devtools/) | Browser debugging, performance profiling, and automation via Chrome DevTools. |

### ⚙️ Tooling & Automation

| Skill | Description |
|---|---|
| [`gh-fix-ci`](packages/skills-catalog/gh-fix-ci/) | Diagnoses and fixes failing GitHub Actions CI checks by inspecting logs and drafting targeted fixes. |
| [`cursor-subagent-creator`](packages/skills-catalog/cursor-subagent-creator/) | Creates Cursor-specific AI subagents with isolated context for complex multi-step workflows. |
| [`skill-architect`](packages/skills-catalog/skill-architect/) | Expert guide for designing and building new AI agent skills from scratch. |

---

## Repository Structure

```
ai-skills/
├── packages/
│   ├── cli/                  # @ghcordeiro/sdd — CLI publicado no npm
│   │   ├── src/              # TypeScript source (Ink + Commander)
│   │   └── build.mjs         # esbuild bundler script
│   └── skills-catalog/       # one directory per skill
│       ├── spec-driven/
│       ├── create-adr/
│       └── ...
├── libs/
│   └── core/                 # shared logic (catalog, installer, agent definitions)
├── .github/workflows/
│   ├── ci.yml                # type-check on every push to main
│   └── publish.yml           # build + publish on version tag
├── package.json              # npm workspaces root
└── nx.json
```

---

## Contributing

### Adding a new skill

1. Create a new directory under `packages/skills-catalog/<skill-name>/`
2. Add a `SKILL.md` with YAML frontmatter (`name`, `description`, `license`)
3. Open a pull request — the skill is automatically included in the next release

### Publishing a new version

```bash
# 1. Bump version
npm version patch -w @ghcordeiro/sdd

# 2. Commit and push
git add packages/cli/package.json package-lock.json
git commit -m "chore: bump to x.x.x"
git push

# 3. Tag — triggers the publish pipeline
git tag vx.x.x
git push origin vx.x.x
```

**Pipeline:** `type-check → build → verify version tag → publish to npm`

### Troubleshooting release

- `npm ci` fails with lockfile mismatch:
  - run `npm install` locally to sync `package-lock.json`
  - commit `package-lock.json` before tagging
- provenance/repository mismatch (`E422`):
  - ensure `packages/cli/package.json` `repository.url` points to the same GitHub repo used by Actions
- publish workflow not triggered:
  - verify tag format is `vX.Y.Z` and matches `packages/cli/package.json` version exactly

---

## License

MIT — see [LICENSE](./LICENSE).

Individual skills may carry their own licenses — check each skill's directory for details.
