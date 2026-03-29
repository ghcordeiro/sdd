import { cpSync, mkdirSync, existsSync } from 'fs';
import { join, resolve, normalize } from 'path';
import type { AgentDefinition } from './agents.js';
import type { SkillEntry } from './catalog.js';

export type InstallMode = 'global' | 'local';

export interface InstallResult {
  skill: string;
  agent: string;
  destination: string;
  success: boolean;
  error?: string;
}

function isPathSafe(base: string, target: string): boolean {
  const resolved = resolve(target);
  const normalizedBase = normalize(base);
  return resolved.startsWith(normalizedBase);
}

export function installSkill(
  skill: SkillEntry,
  agent: AgentDefinition,
  mode: InstallMode,
  cwd: string = process.cwd()
): InstallResult {
  const baseDir =
    mode === 'global' ? agent.globalSkillsDir : join(cwd, agent.localSkillsDir);
  const destination = join(baseDir, skill.id);

  if (!isPathSafe(baseDir, destination)) {
    return {
      skill: skill.id,
      agent: agent.id,
      destination,
      success: false,
      error: 'Path traversal detected — aborting.',
    };
  }

  try {
    mkdirSync(baseDir, { recursive: true });
    cpSync(skill.dir, destination, { recursive: true, force: true });
    return { skill: skill.id, agent: agent.id, destination, success: true };
  } catch (err) {
    return {
      skill: skill.id,
      agent: agent.id,
      destination,
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export function isSkillInstalled(
  skillId: string,
  agent: AgentDefinition,
  mode: InstallMode,
  cwd: string = process.cwd()
): boolean {
  const baseDir =
    mode === 'global' ? agent.globalSkillsDir : join(cwd, agent.localSkillsDir);
  return existsSync(join(baseDir, skillId));
}
