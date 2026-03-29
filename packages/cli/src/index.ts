#!/usr/bin/env node
import { Command } from 'commander';
import { render } from 'ink';
import React from 'react';
import { App } from './app.js';
import { installCommand } from './commands/install.js';

const program = new Command();

program
  .name('ai-skills')
  .description('Install AI agent skills for Claude Code, Cursor, GitHub Copilot, Gemini CLI, and Antigravity')
  .version('0.1.0');

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

program.parse();
