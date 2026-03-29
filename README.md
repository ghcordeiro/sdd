<div align="center">

# ai-skills

**A curated collection of AI agent skills — installable in seconds.**

Extend Claude Code, Cursor, GitHub Copilot, Gemini CLI, and Antigravity with battle-tested, domain-specific capabilities via a single interactive CLI.

[![npm version](https://img.shields.io/npm/v/@ghcordeiro/ai-skills?color=crimson&label=npm)](https://www.npmjs.com/package/@ghcordeiro/ai-skills)
[![CI](https://github.com/ghcordeiro/ai-skills/actions/workflows/ci.yml/badge.svg)](https://github.com/ghcordeiro/ai-skills/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node.js ≥22](https://img.shields.io/badge/node-%3E%3D22-brightgreen)](https://nodejs.org)

```bash
npx @ghcordeiro/ai-skills
```

</div>

---

## What are skills?

Skills are structured instruction files (`SKILL.md`) that give AI coding agents deep, specialized knowledge — turning a general-purpose assistant into an expert in spec-driven development, architecture documentation, code quality, SEO, accessibility, and more.

Each skill is a self-contained directory that gets copied directly into your agent's skills folder. No cloud dependency. No lock-in. Plain Markdown.

---

## Quick Start

```bash
npx @ghcordeiro/ai-skills
```

The interactive CLI walks you through three steps:

```
? Select your AI agent        › Claude Code
? Install globally or local?  › Global  (~/.claude/skills/)
? Select skills to install    › [space to toggle, enter to confirm]

  ◉  spec-driven
  ◉  create-adr
  ○  create-rfc
  ◉  code-quality-guardian
  ○  seo
  ...

✓ spec-driven          → ~/.claude/skills/spec-driven
✓ create-adr           → ~/.claude/skills/create-adr
✓ code-quality-guardian → ~/.claude/skills/code-quality-guardian
```

---

## Usage

### Interactive

```bash
npx @ghcordeiro/ai-skills
```

### Non-interactive (scripts & CI)

```bash
npx @ghcordeiro/ai-skills install \
  --agent claude-code \
  --skills spec-driven,create-adr,code-quality-guardian \
  --global
```

| Flag | Alias | Description |
|---|---|---|
| `--agent <id>` | `-a` | Target agent (see supported agents below) |
| `--skills <ids>` | `-s` | Comma-separated list of skill IDs |
| `--global` | | Install to home directory `~/` (default) |
| `--local` | | Install to current project directory `./` |

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

## Skills Catalog

### 🏗️ Planning & Architecture

| Skill | Description |
|---|---|
| [`spec-driven`](packages/skills-catalog/spec-driven/) | Full project & feature planning with 4 adaptive phases: **Specify → Design → Tasks → Execute**. Auto-sizes depth by complexity. Orchestrates all complementary skills below. |
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
│   ├── cli/                  # @ghcordeiro/ai-skills — published CLI
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
3. Optionally add `references/`, `examples/`, or `scripts/` subdirectories
4. Open a pull request — the skill appears automatically in the CLI catalog on next release

### Publishing a new version

```bash
# 1. Bump version in packages/cli/package.json
npm version patch -w @ghcordeiro/ai-skills

# 2. Commit and push
git add packages/cli/package.json package-lock.json
git commit -m "chore: bump cli to x.x.x"
git push

# 3. Create a tag — triggers the full publish pipeline
git tag vx.x.x
git push origin vx.x.x
```

**Pipeline:** `type-check → build → verify version tag → publish to npm`

---

## License

The CLI (`packages/cli`) is licensed under [MIT](./LICENSE).

Individual skills may carry their own licenses — check each skill's directory for details.
