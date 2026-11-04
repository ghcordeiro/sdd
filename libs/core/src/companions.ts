import { existsSync } from 'fs';
import { delimiter, join } from 'path';

export interface Companion {
  id: string;
  name: string;
  purpose: string;
  /** Binary looked up on PATH. Absent = cannot be detected (e.g. MCP-only tools). */
  bin?: string;
  install: string;
}

// Recommended only — sdd never installs or configures these.
export const COMPANIONS: Companion[] = [
  {
    id: 'agentmemory',
    name: 'agentmemory',
    purpose: 'cross-session memory the skill recalls and saves to',
    bin: 'agentmemory',
    install: 'npm i -g @agentmemory/agentmemory && agentmemory connect',
  },
  {
    id: 'rtk',
    name: 'RTK',
    purpose: 'compresses command output, cuts token usage',
    bin: 'rtk',
    install: 'brew install rtk && rtk init -g',
  },
  {
    id: 'context7',
    name: 'Context7',
    purpose: 'up-to-date library docs via MCP',
    install: 'https://context7.com/docs/resources/all-clients',
  },
];

function onPath(bin: string): boolean {
  const exts = process.platform === 'win32' ? ['', '.exe', '.cmd'] : [''];
  return (process.env.PATH ?? '')
    .split(delimiter)
    .some((dir) => dir && exts.some((ext) => existsSync(join(dir, bin + ext))));
}

/** true = found on PATH, false = missing, undefined = not detectable. */
export function detectCompanions(): Array<Companion & { installed?: boolean }> {
  return COMPANIONS.map((c) => ({ ...c, installed: c.bin ? onPath(c.bin) : undefined }));
}
