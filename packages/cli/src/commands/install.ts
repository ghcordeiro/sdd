import chalk from 'chalk';
import { getAgent, loadCatalog, installSkill, type InstallMode } from '@ghcordeiro/core';

interface InstallOptions {
  agentId: string;
  skillIds: string[];
  mode: InstallMode;
}

export async function installCommand({ agentId, skillIds, mode }: InstallOptions) {
  const agent = getAgent(agentId);
  if (!agent) {
    console.error(chalk.red(`Unknown agent: ${agentId}`));
    console.error(`Available: claude-code, cursor, github-copilot, gemini-cli, antigravity`);
    process.exit(1);
  }

  const catalog = loadCatalog();
  const selected = catalog.filter((s) => skillIds.includes(s.id));
  const missing = skillIds.filter((id) => !catalog.find((s) => s.id === id));

  if (missing.length > 0) {
    console.error(chalk.yellow(`Unknown skills: ${missing.join(', ')}`));
  }

  if (selected.length === 0) {
    console.error(chalk.red('No valid skills to install.'));
    process.exit(1);
  }

  console.log(chalk.bold(`\nInstalling ${selected.length} skill(s) for ${agent.name} (${mode})...\n`));

  for (const skill of selected) {
    const result = installSkill(skill, agent, mode);
    if (result.success) {
      console.log(`  ${chalk.green('✓')} ${skill.id}  →  ${result.destination}`);
    } else {
      console.log(`  ${chalk.red('✗')} ${skill.id}  ${chalk.dim(result.error ?? '')}`);
    }
  }

  console.log();
}
