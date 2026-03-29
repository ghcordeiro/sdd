import { readdirSync, readFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

export interface SkillMeta {
  name: string;
  description: string;
  license?: string;
  version?: string;
  author?: string;
}

export interface SkillEntry {
  id: string;
  meta: SkillMeta;
  dir: string;
}

const CATALOG_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../../packages/skills-catalog'
);

export function loadCatalog(): SkillEntry[] {
  const entries: SkillEntry[] = [];

  for (const folder of readdirSync(CATALOG_DIR)) {
    const dir = join(CATALOG_DIR, folder);
    if (!statSync(dir).isDirectory()) continue;

    const skillMdPath = join(dir, 'SKILL.md');
    try {
      const raw = readFileSync(skillMdPath, 'utf8');
      const { data } = matter(raw);
      entries.push({
        id: folder,
        dir,
        meta: {
          name: data.name ?? folder,
          description: data.description ?? '',
          license: data.license,
          version: data.metadata?.version,
          author: data.metadata?.author,
        },
      });
    } catch {
      // skip folders without SKILL.md
    }
  }

  return entries.sort((a, b) => a.id.localeCompare(b.id));
}
