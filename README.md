<div align="center">

# sdd

**Spec-Driven Development toolkit for AI agents.**

Install battle-tested SDD skills into Claude Code, Cursor, GitHub Copilot, Gemini CLI, Antigravity, and Kiro — in seconds.

[![npm version](https://img.shields.io/npm/v/@ghcordeiro/sdd?color=crimson&label=npm)](https://www.npmjs.com/package/@ghcordeiro/sdd)
[![npm downloads](https://img.shields.io/npm/d18m/@ghcordeiro/sdd?color=crimson&label=downloads%20(18m))](https://www.npmjs.com/package/@ghcordeiro/sdd)
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
    ○  Kiro

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
| [Cursor](https://cursor.sh) | `cursor` | `~/.cursor/skills/` |
| [GitHub Copilot](https://github.com/features/copilot) | `github-copilot` | `~/.github-copilot/skills/` |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | `gemini-cli` | `~/.gemini/skills/` |
| [Antigravity](https://antigravity.dev) | `antigravity` | `~/.antigravity/skills/` |
| [Kiro](https://kiro.dev) | `kiro` | `~/.kiro/skills/` |

### Kiro Power (install from the repo link)

This repository is also a [Kiro Power](https://kiro.dev/docs/powers/) — no CLI needed:

1. Open the **Powers** panel in Kiro
2. **Add Custom Power** → **Import power from GitHub**
3. Paste `https://github.com/ghcordeiro/sdd` and click **Install**

The power manifest is [`plugin.json`](plugin.json) at the repo root; the skill lives in [`skills/spec-driven/`](skills/spec-driven/), and [`mcp.json`](mcp.json) adds the Context7 MCP server.

---

## Learning & Companion Tools

### Cross-project learnings

`spec-driven` learns how you work and carries it across projects. It keeps a plain Markdown file at `~/.sdd/LEARNINGS.md` with your preferences, stack and code patterns, mistakes to avoid, and an index of your projects.

- **Read** at the start of Specify, Plan, and when resuming work.
- **Written** at every phase gate, whenever you correct the agent, and when a decision reflects a general preference.
- Project-only memory stays in `.specs/project/STATE.md`.

The file needs no extra tooling, and it never stores secrets or credentials. Edit or delete entries any time.

### Recommended companions

`sdd` detects these and shows how to install them. It never installs or configures them for you. The skill uses each one when it is available.

| Tool | What it adds | Install |
|---|---|---|
| [agentmemory](https://www.npmjs.com/package/@agentmemory/agentmemory) | Automatic cross-session memory; the skill recalls and saves to it in addition to `LEARNINGS.md` | `npm i -g @agentmemory/agentmemory && agentmemory connect` |
| [RTK](https://github.com/rtk-ai/rtk) | Compresses command output to cut token usage | `brew install rtk && rtk init -g` (see `rtk init --help` for other agents) |
| [Context7](https://context7.com) | Up-to-date library docs via MCP, used in Plan and Implement | [Setup per client](https://context7.com/docs/resources/all-clients) — already included in the Kiro Power |
| [Playwright MCP](https://playwright.dev/mcp/configuration/options) | Browser automation for AC verification, mobile-web emulation and E2E tests | `claude mcp add playwright -- npx @playwright/mcp@latest` |
| [mobile-mcp](https://github.com/mobile-next/mobile-mcp) | Native iOS/Android device control for verification | `claude mcp add mobile-mcp -- npx -y @mobilenext/mobile-mcp@latest` |
| [Maestro](https://docs.maestro.dev/getting-started/maestro-mcp) | Repeatable mobile E2E flows in YAML; MCP via `maestro mcp` | `curl -fsSL "https://get.maestro.mobile.dev" \| bash` |

---

## Skills Included

### 🧭 Built-in workflows (loaded on demand)

`spec-driven` is a small router: each workflow below is a separate file loaded only when its trigger fires. If your agent already has an equivalent skill (e.g. `systematic-debugging`, `security-review`, `using-git-worktrees`), the host skill is used instead and the sdd file is never loaded.

| Workflow | Fires when |
|---|---|
| Spec readiness check | Before the Specify gate on Large/Complex features — a fresh subagent lists what a builder would still need to ask |
| Root-cause debugging | A bug, failing test, or unexpected behavior shows up |
| Security review | A change touches auth, external input, secrets, crypto, payments, PII, paths, or shell/SQL |
| Branch & finish | Start of Implement (branch/worktree + green baseline) and end of feature (PR, merge, keep, discard) |
| Parallel subagents | `tasks.md` has independent "Parallel OK" tasks and the agent supports subagents |
| Review response | PR or reviewer comments arrive — each one is verified before it is applied |
| Learning loop | Phase gates and corrections — see [Learning & Companion Tools](#learning--companion-tools) |

### 🏗️ Planning & Architecture

| Skill | Description |
|---|---|
| [`spec-driven`](skills/spec-driven/) | Full project & feature planning with 4 adaptive phases: **Specify → Plan → Tasks → Implement**. Orchestrates all other skills. |
| [`c4-architect`](skills/spec-driven/toolkit/c4-architect/) | Generates C4 architecture diagrams (Context, Container, Component, Sequence) from source code using PlantUML. |
| [`frontend-component-architect`](skills/spec-driven/toolkit/frontend-component-architect/) | Evaluates React/Angular component boundaries, API design quality, state ownership, and reuse opportunities. |
| [`technical-design-doc-creator`](skills/spec-driven/toolkit/technical-design-doc-creator/) | Creates comprehensive Technical Design Documents (TDDs) for implementation planning. |

### 📋 Decision & Documentation

| Skill | Description |
|---|---|
| [`create-adr`](skills/spec-driven/toolkit/create-adr/) | Creates immutable Architecture Decision Records (ADRs) in MADR, Nygard, or Y-Statement format. |
| [`create-rfc`](skills/spec-driven/toolkit/create-rfc/) | Creates structured Request for Comments (RFCs) to drive stakeholder alignment before committing to a direction. |

### 🔍 Code Quality

| Skill | Description |
|---|---|
| [`code-quality-guardian`](skills/spec-driven/toolkit/code-quality-guardian/) | Reviews code for correctness, security, maintainability, and architecture fit — findings triaged as Critical / Warning / Suggestion. |
| [`duplication-hunter`](skills/spec-driven/toolkit/duplication-hunter/) | Detects exact and semantic code duplication and recommends low-risk shared abstractions with migration steps. |
| [`best-practices`](skills/spec-driven/toolkit/best-practices/) | Audits web projects for security misconfigurations, deprecated APIs, and modern code quality standards. |

### 🌐 Web & Frontend

| Skill | Description |
|---|---|
| [`seo`](skills/spec-driven/toolkit/seo/) | Optimizes pages for search visibility — meta tags, structured data (JSON-LD), sitemaps, and crawlability. |
| [`accessibility`](skills/spec-driven/toolkit/accessibility/) | Audits and improves web accessibility following WCAG 2.1 AA guidelines. |
| [`playwright`](skills/spec-driven/toolkit/playwright/) | Verifies web flows against acceptance criteria in Chromium, Firefox and WebKit, checks mobile web with device emulation, and writes E2E tests — via Playwright MCP. |
| [`mobile`](skills/spec-driven/toolkit/mobile/) | Verifies native iOS/Android apps (React Native, Expo, Flutter, Swift, Kotlin) on simulators, emulators or devices via mobile-mcp, and writes repeatable Maestro flows. |
| [`chrome-devtools`](skills/spec-driven/toolkit/chrome-devtools/) | Browser debugging, performance profiling, and automation via Chrome DevTools. |

### ⚙️ Tooling & Automation

| Skill | Description |
|---|---|
| [`gh-fix-ci`](skills/spec-driven/toolkit/gh-fix-ci/) | Diagnoses and fixes failing GitHub Actions CI checks by inspecting logs and drafting targeted fixes. |
| [`cursor-subagent-creator`](skills/spec-driven/toolkit/cursor-subagent-creator/) | Creates Cursor-specific AI subagents with isolated context for complex multi-step workflows. |
| [`skill-architect`](skills/spec-driven/toolkit/skill-architect/) | Expert guide for designing and building new AI agent skills from scratch. |

---

## Repository Structure

```
sdd/
├── plugin.json               # Kiro Power manifest (Agent Plugins format)
├── mcp.json                  # Kiro Power MCP servers (Context7)
├── skills/
│   └── spec-driven/          # the skill — SKILL.md + embedded toolkit/
├── packages/
│   └── cli/                  # @ghcordeiro/sdd — CLI publicado no npm
│       ├── src/              # TypeScript source (Ink + Commander)
│       └── build.mjs         # esbuild bundler script
├── libs/
│   └── core/                 # shared logic (catalog, installer, agent definitions)
├── .github/workflows/
│   ├── ci.yml                # type-check on every push to main
│   └── publish.yml           # semantic-release on push to main (npm Trusted Publishing)
├── package.json              # npm workspaces root
└── nx.json
```

---

## Contributing

### Adding a new skill

1. Create a new directory under `skills/<skill-name>/`
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
- updates `packages/cli/package.json` + `package-lock.json` + `plugin.json` (Kiro Power)
- creates `CHANGELOG.md`
- creates git tag + GitHub release
- publishes `@ghcordeiro/sdd` to npm with provenance

Examples:

- `fix: ...` → patch release
- `feat: ...` → minor release
- `feat!: ...` or `BREAKING CHANGE:` → major release

### npm authentication — Trusted Publishing (OIDC)

There is **no npm token** in this repo. `publish.yml` authenticates to npm with [Trusted Publishing](https://docs.npmjs.com/trusted-publishers): GitHub Actions exchanges a short-lived OIDC token with the registry on each run.

| Setting | Value |
|---|---|
| npm package → Settings → Trusted Publisher | GitHub Actions · `ghcordeiro/sdd` · workflow `publish.yml` · environment `npm` · **Allow `npm publish`** |
| Workflow permission | `id-token: write` on the release job |
| GitHub environment | `npm` (no secrets needed) |
| Tooling | npm ≥ 11.5.1 (the workflow upgrades it), `semantic-release` ≥ 25 / `@semantic-release/npm` ≥ 13 |

Rules:

- Do **not** add `NPM_TOKEN` / `NODE_AUTH_TOKEN`, and do not set `registry-url` in `actions/setup-node` — both switch npm back to token auth.
- The trusted publisher is bound to the **filename** `publish.yml`. Renaming the workflow or the `npm` environment breaks publishing until the npm setting is updated.
- Publishing access can stay on "Require two-factor authentication and disallow bypass 2fa tokens" — trusted publishers keep working.

### Recovering a release that tagged but did not publish

If `semantic-release` created the tag but `npm publish` failed, the next push will not retry it (the tag already exists). Publish the existing tag from Actions:

```bash
gh workflow run publish.yml -f tag=vX.Y.Z
```

This checks out the tag, publishes it to npm with provenance, and creates the GitHub release if missing.

### Troubleshooting release

- `npm ci` fails with lockfile mismatch:
  - run `npm install` locally to sync `package-lock.json`
  - commit `package-lock.json` before tagging
- `ENONPMTOKEN` / `EINVALIDNPMTOKEN` / `EOTP`:
  - npm is not using OIDC — check the trusted publisher settings above and that no token or `registry-url` was added to the workflow
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
| `accessibility` | External (`web-quality-skills`), adapted locally | [web-accessibility upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/web-accessibility) | [sdd/accessibility](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/accessibility) | `MIT` |
| `best-practices` | External (`web-quality-skills`), adapted locally | [web-best-practices upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/web-best-practices) | [sdd/best-practices](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/best-practices) | `MIT` |
| `c4-architect` | Local author (`ghcordeiro`) | — | [sdd/c4-architect](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/c4-architect) | `CC-BY-4.0` |
| `playwright` | Local author (`ghcordeiro`) | — | [sdd/playwright](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/playwright) | `CC-BY-4.0` |
| `mobile` | Local author (`ghcordeiro`) | — | [sdd/mobile](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/mobile) | `CC-BY-4.0` |
| `chrome-devtools` | External (upstream match), adapted locally | [chrome-devtools upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(tooling)/chrome-devtools) | [sdd/chrome-devtools](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/chrome-devtools) | `MIT` |
| `code-quality-guardian` | Credit undeclared in metadata; maintained locally | — | [sdd/code-quality-guardian](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/code-quality-guardian) | `MIT` |
| `create-adr` | External (Tech Leads Club), adapted locally | [create-adr upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(creation)/create-adr) | [sdd/create-adr](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/create-adr) | `CC-BY-4.0` |
| `create-rfc` | External (Tech Leads Club), adapted locally | [create-rfc upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(creation)/create-rfc) | [sdd/create-rfc](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/create-rfc) | `CC-BY-4.0` |
| `cursor-subagent-creator` | External (Tech Leads Club), adapted locally | [cursor-subagent-creator upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(creation)/cursor-subagent-creator) | [sdd/cursor-subagent-creator](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/cursor-subagent-creator) | `CC-BY-4.0` |
| `duplication-hunter` | Local author (`ghcordeiro`) | — | [sdd/duplication-hunter](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/duplication-hunter) | `CC-BY-4.0` |
| `frontend-component-architect` | Local author (`ghcordeiro`) | — | [sdd/frontend-component-architect](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/frontend-component-architect) | `CC-BY-4.0` |
| `gh-fix-ci` | External (Tech Leads Club), adapted locally | [gh-fix-ci upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(tooling)/gh-fix-ci) | [sdd/gh-fix-ci](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/gh-fix-ci) | `Apache-2.0` |
| `seo` | External (`web-quality-skills`), adapted locally | [seo upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/seo) | [sdd/seo](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/seo) | `MIT` |
| `skill-architect` | External (Felipe Rodrigues / Tech Leads Club), adapted locally | [skill-architect upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(creation)/skill-architect) | [sdd/skill-architect](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/skill-architect) | `CC-BY-4.0` |
| `technical-design-doc-creator` | External (Tech Leads Club), adapted locally | [create-technical-design-doc upstream](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(creation)/create-technical-design-doc) | [sdd/technical-design-doc-creator](https://github.com/ghcordeiro/sdd/tree/main/skills/spec-driven/toolkit/technical-design-doc-creator) | `CC-BY-4.0` |

---

## License

MIT — see [LICENSE](./LICENSE).

Individual skills may carry their own licenses — check each skill's directory for details.
