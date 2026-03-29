import { build } from 'esbuild';
import { chmodSync, copyFileSync, cpSync, rmSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const catalogSrc = resolve(__dirname, '../../packages/skills-catalog');
const catalogDest = resolve(__dirname, 'dist/skills-catalog');

// Limpar catalog anterior
rmSync(catalogDest, { recursive: true, force: true });

await build({
  entryPoints: [resolve(__dirname, 'src/index.ts')],
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  outfile: resolve(__dirname, 'dist/index.js'),
  banner: {
    js: '#!/usr/bin/env node',
  },
  external: [
    // dependências de runtime — ficam em node_modules
    'ink',
    'ink-select-input',
    'ink-spinner',
    'react',
    'chalk',
    'commander',
    'gray-matter',
  ],
});

// Copiar skills-catalog para dentro de dist/
cpSync(catalogSrc, catalogDest, { recursive: true });

// Copiar README da raiz do monorepo para o pacote (exibido no npmjs.com)
copyFileSync(resolve(__dirname, '../../README.md'), resolve(__dirname, 'README.md'));

chmodSync(resolve(__dirname, 'dist/index.js'), '755');
console.log('✓ Built dist/index.js');
console.log('✓ Copied skills-catalog → dist/skills-catalog/');
console.log('✓ Copied README.md → packages/cli/README.md');
