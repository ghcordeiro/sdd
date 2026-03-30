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
──────────────────────────────────────────
 ◆ SDD
   Spec-Driven Development toolkit for AI agents
──────────────────────────────────────────

  step 1 of 3 · Select agents
  ━━━━━━━━━━━━━──────────────────────────

  Which AI agent(s) do you use?

  › ○  Claude Code
    ○  Cursor
    ○  GitHub Copilot
    ○  Gemini CLI
    ○  Antigravity

  ↑↓ navigate  ·  space toggle  ·  a select all  ·  enter confirm

  step 2 of 3 · Install scope
  ━━━━━━━━━━━━━━━━━━━━━━━━━━─────────────

  Where should spec-driven be installed?

  › ◉  Global    available across all your projects
    ○  Local     this project only

  step 3 of 3 · Confirm
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Ready to install spec-driven

  Agent  Gemini CLI
  Scope  Global
         ~/.gemini/skills

  › Enter to install     c to cancel

  ✓ spec-driven installed
  → ~/.gemini/skills
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
| [`spec-driven`](packages/skills-catalog/spec-driven/) | Full project & feature planning with 4 adaptive phases: **Specify → Plan → Tasks → Implement**. Orchestrates all other skills. |
| [`c4-architect`](packages/skills-catalog/spec-driven/toolkit/c4-architect/) | Generates C4 architecture diagrams (Context, Container, Component, Sequence) from source code using PlantUML. |
| [`frontend-component-architect`](packages/skills-catalog/spec-driven/toolkit/frontend-component-architect/) | Evaluates React/Angular component boundaries, API design quality, state ownership, and reuse opportunities. |
| [`technical-design-doc-creator`](packages/skills-catalog/spec-driven/toolkit/technical-design-doc-creator/) | Creates comprehensive Technical Design Documents (TDDs) for implementation planning. |

### 📋 Decision & Documentation

| Skill | Description |
|---|---|
| [`create-adr`](packages/skills-catalog/spec-driven/toolkit/create-adr/) | Creates immutable Architecture Decision Records (ADRs) in MADR, Nygard, or Y-Statement format. |
| [`create-rfc`](packages/skills-catalog/spec-driven/toolkit/create-rfc/) | Creates structured Request for Comments (RFCs) to drive stakeholder alignment before committing to a direction. |

### 🔍 Code Quality

| Skill | Description |
|---|---|
| [`code-quality-guardian`](packages/skills-catalog/spec-driven/toolkit/code-quality-guardian/) | Reviews code for correctness, security, maintainability, and architecture fit — findings triaged as Critical / Warning / Suggestion. |
| [`duplication-hunter`](packages/skills-catalog/spec-driven/toolkit/duplication-hunter/) | Detects exact and semantic code duplication and recommends low-risk shared abstractions with migration steps. |
| [`best-practices`](packages/skills-catalog/spec-driven/toolkit/best-practices/) | Audits web projects for security misconfigurations, deprecated APIs, and modern code quality standards. |

### 🌐 Web & Frontend

| Skill | Description |
|---|---|
| [`seo`](packages/skills-catalog/spec-driven/toolkit/seo/) | Optimizes pages for search visibility — meta tags, structured data (JSON-LD), sitemaps, and crawlability. |
| [`accessibility`](packages/skills-catalog/spec-driven/toolkit/accessibility/) | Audits and improves web accessibility following WCAG 2.1 AA guidelines. |
| [`chrome-devtools`](packages/skills-catalog/spec-driven/toolkit/chrome-devtools/) | Browser debugging, performance profiling, and automation via Chrome DevTools. |

### ⚙️ Tooling & Automation

| Skill | Description |
|---|---|
| [`gh-fix-ci`](packages/skills-catalog/spec-driven/toolkit/gh-fix-ci/) | Diagnoses and fixes failing GitHub Actions CI checks by inspecting logs and drafting targeted fixes. |
| [`cursor-subagent-creator`](packages/skills-catalog/spec-driven/toolkit/cursor-subagent-creator/) | Creates Cursor-specific AI subagents with isolated context for complex multi-step workflows. |
| [`skill-architect`](packages/skills-catalog/spec-driven/toolkit/skill-architect/) | Expert guide for designing and building new AI agent skills from scratch. |

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
# Preview release result locally (optional)
npm run release:dry-run
```

Releases are fully automated with `semantic-release` on every push to `main`.
It automatically:

- analyzes Conventional Commits (`feat`, `fix`, `BREAKING CHANGE`)
- calculates the next version
- updates `packages/cli/package.json` + `package-lock.json`
- creates `CHANGELOG.md`
- creates git tag + GitHub release
- publishes `@ghcordeiro/sdd` to npm with provenance

Examples:

- `fix: ...` → patch release
- `feat: ...` → minor release
- `feat!: ...` or `BREAKING CHANGE:` → major release

### Troubleshooting release

- `npm ci` fails with lockfile mismatch:
  - run `npm install` locally to sync `package-lock.json`
  - commit `package-lock.json` before tagging
- provenance/repository mismatch (`E422`):
  - ensure `packages/cli/package.json` `repository.url` points to the same GitHub repo used by Actions
- publish workflow not triggered:
  - ensure commit was pushed to `main`
  - ensure commit follows Conventional Commits so `semantic-release` can determine a version bump

---

## Inspiration & Credits

This project's `spec-driven` skill is inspired by prior work from the community and published references on Spec-Driven Development.

**Original work**

- `tlc-spec-driven` by [Felipe Rodrigues](https://github.com/felipfr) — [Tech Lead's Club](https://github.com/tech-leads-club)
- Source: [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(development)/tlc-spec-driven)
- License: `CC-BY-4.0`

**SDD references**

- [Martin Fowler — Spec-Driven Development: 3 Tools](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- [DS Academy — Spec-Driven Development series (parts 1-5)](https://blog.dsacademy.com.br/spec-driven-development-a-nova-arquitetura-de-engenharia-de-software-na-era-dos-agentes-de-ia-parte-1/)
- [Microsoft Learn — Spec-Driven Development with GitHub Spec Kit](https://learn.microsoft.com/pt-br/training/modules/spec-driven-development-github-spec-kit-greenfield-intro/)

**Toolkit skill provenance**

| Skill | Credits | GitHub source | GitHub local | License |
|---|---|---|---|---|
| `accessibility` | External (`web-quality-skills`), adapted locally | [web-accessibility upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/web-accessibility) | [sdd/accessibility](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/accessibility) | `MIT` |
| `best-practices` | External (`web-quality-skills`), adapted locally | [web-best-practices upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/web-best-practices) | [sdd/best-practices](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/best-practices) | `MIT` |
| `c4-architect` | Local author (`ghcordeiro`) | — | [sdd/c4-architect](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/c4-architect) | `CC-BY-4.0` |
| `chrome-devtools` | External (upstream match), adapted locally | [chrome-devtools upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(tooling)/chrome-devtools) | [sdd/chrome-devtools](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/chrome-devtools) | `MIT` |
| `code-quality-guardian` | Credit undeclared in metadata; maintained locally | — | [sdd/code-quality-guardian](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/code-quality-guardian) | `MIT` |
| `create-adr` | External (Tech Leads Club), adapted locally | [create-adr upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(creation)/create-adr) | [sdd/create-adr](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/create-adr) | `CC-BY-4.0` |
| `create-rfc` | External (Tech Leads Club), adapted locally | [create-rfc upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(creation)/create-rfc) | [sdd/create-rfc](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/create-rfc) | `CC-BY-4.0` |
| `cursor-subagent-creator` | External (Tech Leads Club), adapted locally | [cursor-subagent-creator upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(creation)/cursor-subagent-creator) | [sdd/cursor-subagent-creator](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/cursor-subagent-creator) | `CC-BY-4.0` |
| `duplication-hunter` | Local author (`ghcordeiro`) | — | [sdd/duplication-hunter](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/duplication-hunter) | `CC-BY-4.0` |
| `frontend-component-architect` | Local author (`ghcordeiro`) | — | [sdd/frontend-component-architect](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/frontend-component-architect) | `CC-BY-4.0` |
| `gh-fix-ci` | External (Tech Leads Club), adapted locally | [gh-fix-ci upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(tooling)/gh-fix-ci) | [sdd/gh-fix-ci](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/gh-fix-ci) | `Apache-2.0` |
| `seo` | External (`web-quality-skills`), adapted locally | [seo upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/seo) | [sdd/seo](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/seo) | `MIT` |
| `skill-architect` | External (Felipe Rodrigues / Tech Leads Club), adapted locally | [skill-architect upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(creation)/skill-architect) | [sdd/skill-architect](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/skill-architect) | `CC-BY-4.0` |
| `technical-design-doc-creator` | External (Tech Leads Club), adapted locally | [create-technical-design-doc upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(creation)/create-technical-design-doc) | [sdd/technical-design-doc-creator](https://github.com/ghcordeiro/sdd/tree/main/packages/skills-catalog/spec-driven/toolkit/technical-design-doc-creator) | `CC-BY-4.0` |

---

## License

MIT — see [LICENSE](./LICENSE).

Individual skills may carry their own licenses — check each skill's directory for details.
