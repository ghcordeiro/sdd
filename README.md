# @ghcordeiro/ai-skills

A curated collection of AI agent skills for Claude Code, Cursor, GitHub Copilot, Gemini CLI, and Antigravity — installable via a single interactive CLI.

```bash
npx @ghcordeiro/ai-skills
```

---

## What are skills?

Skills are structured instruction files (`SKILL.md`) that extend AI coding agents with specialized, domain-specific capabilities — from spec-driven development workflows to architecture documentation, SEO audits, code quality reviews, and more.

---

## Installation

### Interactive (recommended)

```bash
npx @ghcordeiro/ai-skills
```

A terminal UI will guide you through:

1. **Select your AI agent** — Claude Code, Cursor, GitHub Copilot, Gemini CLI, or Antigravity
2. **Choose install scope** — globally (`~/`) or in the current project (`./`)
3. **Pick skills** — browse and toggle with Space, confirm with Enter
4. **Done** — files copied to the right directory for your agent

### Non-interactive (scripting / CI)

```bash
npx @ghcordeiro/ai-skills install \
  --agent claude-code \
  --skills spec-driven,create-adr,code-quality-guardian \
  --global
```

| Flag | Description |
|---|---|
| `-a, --agent` | Target agent ID (see list below) |
| `-s, --skills` | Comma-separated skill IDs |
| `--global` | Install globally in `~/` (default) |
| `--local` | Install in current project directory |

---

## Supported Agents

| Agent | ID | Global path |
|---|---|---|
| Claude Code | `claude-code` | `~/.claude/skills/` |
| Cursor | `cursor` | `~/.cursor/rules/` |
| GitHub Copilot | `github-copilot` | `~/.github-copilot/skills/` |
| Gemini CLI | `gemini-cli` | `~/.gemini/skills/` |
| Antigravity | `antigravity` | `~/.antigravity/skills/` |

---

## Skills Catalog

| Skill | Description |
|---|---|
| `spec-driven` | Project & feature planning with 4 adaptive phases: Specify → Design → Tasks → Execute. Orchestrates all complementary skills. |
| `create-adr` | Creates immutable Architecture Decision Records (ADRs) to document significant architectural choices. |
| `create-rfc` | Creates structured Request for Comments (RFCs) for proposing and deciding on significant changes. |
| `c4-architect` | Generates C4 architecture diagrams (Context, Container, Component, Sequence) from source code. |
| `frontend-component-architect` | Evaluates React/Angular component boundaries, API design, and reuse opportunities. |
| `code-quality-guardian` | Reviews code for correctness, security, maintainability, and architecture fit — triaged by severity. |
| `duplication-hunter` | Detects exact and semantic code duplication and recommends safe shared abstractions. |
| `best-practices` | Audits web projects for security, compatibility, and modern code quality standards. |
| `seo` | Optimizes web pages for search engine visibility — meta tags, structured data, sitemaps. |
| `skill-architect` | Guides the design and creation of new AI agent skills. |
| `accessibility` | Audits and improves web accessibility following WCAG 2.1 guidelines. |
| `chrome-devtools` | Browser debugging, performance profiling, and automation via Chrome DevTools. |
| `cursor-subagent-creator` | Creates Cursor-specific AI subagents for complex multi-step workflows. |
| `gh-fix-ci` | Diagnoses and fixes failing GitHub Actions CI checks. |
| `technical-design-doc-creator` | Creates comprehensive Technical Design Documents (TDDs). |

---

## Monorepo Structure

```
ai-skills/
├── packages/
│   ├── cli/               # @ghcordeiro/ai-skills — the CLI
│   └── skills-catalog/    # all skill directories
├── libs/
│   └── core/              # shared catalog loader, installer, agent definitions
├── package.json           # npm workspaces root
└── nx.json
```

---

## Publishing a new version

```bash
# 1. Bump version
npm version patch -w @ghcordeiro/ai-skills

# 2. Commit
git add packages/cli/package.json package-lock.json
git commit -m "chore: bump cli to x.x.x"
git push

# 3. Tag → triggers the publish pipeline automatically
git tag vx.x.x
git push origin vx.x.x
```

The CI pipeline runs: **type-check → build → verify version → publish to npm**.

---

## License

MIT
