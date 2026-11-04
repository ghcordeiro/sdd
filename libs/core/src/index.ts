export { AGENTS, getAgent } from './agents.js';
export type { AgentDefinition } from './agents.js';

export { loadCatalog } from './catalog.js';
export type { SkillEntry, SkillMeta } from './catalog.js';

export { COMPANIONS, detectCompanions } from './companions.js';
export type { Companion } from './companions.js';

export { installSkill, isSkillInstalled } from './installer.js';
export type { InstallMode, InstallResult } from './installer.js';
