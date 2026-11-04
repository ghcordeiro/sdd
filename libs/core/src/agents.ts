import { homedir } from 'os';
import { join } from 'path';

export interface AgentDefinition {
  id: string;
  name: string;
  globalSkillsDir: string;
  localSkillsDir: string;
  /** Project dir for the skill's cursor-rules/*.mdc (local installs only). */
  localRulesDir?: string;
}

export const AGENTS: AgentDefinition[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    globalSkillsDir: join(homedir(), '.claude', 'skills'),
    localSkillsDir: join('.claude', 'skills'),
  },
  {
    id: 'cursor',
    name: 'Cursor',
    globalSkillsDir: join(homedir(), '.cursor', 'skills'),
    localSkillsDir: join('.cursor', 'skills'),
    localRulesDir: join('.cursor', 'rules'),
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    globalSkillsDir: join(homedir(), '.github-copilot', 'skills'),
    localSkillsDir: join('.github', 'copilot', 'skills'),
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    globalSkillsDir: join(homedir(), '.gemini', 'skills'),
    localSkillsDir: join('.gemini', 'skills'),
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    globalSkillsDir: join(homedir(), '.antigravity', 'skills'),
    localSkillsDir: join('.antigravity', 'skills'),
  },
  {
    id: 'kiro',
    name: 'Kiro',
    globalSkillsDir: join(homedir(), '.kiro', 'skills'),
    localSkillsDir: join('.kiro', 'skills'),
  },
];

export function getAgent(id: string): AgentDefinition | undefined {
  return AGENTS.find((a) => a.id === id);
}
