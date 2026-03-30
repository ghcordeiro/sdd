import { Command } from 'commander';
import { render } from 'ink';
import React from 'react';
import { App } from './app.js';
import { installCommand } from './commands/install.js';

const program = new Command();
const CLI_VERSION = '1.0.0';

program
  .name('sdd')
  .description('Install Spec-Driven Development skills for Claude Code, Cursor, GitHub Copilot, Gemini CLI, and Antigravity')
  .version(CLI_VERSION);

program
  .command('install', { isDefault: true })
  .description('Interactively select and install skills')
  .option('-a, --agent <agent>', 'Target agent (claude-code, cursor, github-copilot, gemini-cli, antigravity)')
  .option('-s, --skills <skills>', 'Comma-separated list of skill IDs to install')
  .option('--global', 'Install globally (default: global)')
  .option('--local', 'Install in current project directory')
  .action(async (opts) => {
    const hasNonInteractiveArgs = opts.agent && opts.skills;

    if (hasNonInteractiveArgs) {
      await installCommand({
        agentId: opts.agent,
        skillIds: opts.skills.split(',').map((s: string) => s.trim()),
        mode: opts.local ? 'local' : 'global',
      });
    } else {
      // Interactive mode via Ink
      render(React.createElement(App));
    }
  });

program.addHelpText(
  'after',
  `
Examples:
  sdd
  sdd install --agent claude-code --skills spec-driven --global
  sdd install --agent cursor --skills spec-driven --local
`
);

program.parse();
