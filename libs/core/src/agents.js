import { homedir } from 'os';
import { join } from 'path';
export const AGENTS = [
    {
        id: 'claude-code',
        name: 'Claude Code',
        globalSkillsDir: join(homedir(), '.claude', 'skills'),
        localSkillsDir: join('.claude', 'skills'),
    },
    {
        id: 'cursor',
        name: 'Cursor',
        globalSkillsDir: join(homedir(), '.cursor', 'rules'),
        localSkillsDir: join('.cursor', 'rules'),
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
];
export function getAgent(id) {
    return AGENTS.find((a) => a.id === id);
}
//# sourceMappingURL=agents.js.map