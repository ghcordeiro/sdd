// Runs on the npm `version` lifecycle (triggered by semantic-release) to keep
// the Kiro power manifest (repo-root plugin.json) on the same version as the CLI.
import { readFileSync, writeFileSync } from 'fs';

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const pluginUrl = new URL('../../plugin.json', import.meta.url);
const plugin = JSON.parse(readFileSync(pluginUrl, 'utf8'));
plugin.version = version;
writeFileSync(pluginUrl, JSON.stringify(plugin, null, 2) + '\n');
console.log(`✓ plugin.json version → ${version}`);
