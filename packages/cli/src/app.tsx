import React, { useState } from 'react';
import { Box, Text, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import { loadCatalog, installSkill, type AgentDefinition, type InstallMode } from '@ghcordeiro/core';
import { AgentSelector } from './components/AgentSelector.js';

type Step = 'welcome' | 'agent' | 'mode' | 'confirm' | 'done';

interface InstallResult {
  agent: string;
  success: boolean;
  destination: string;
  error?: string;
}

interface State {
  step: Step;
  agents: AgentDefinition[];
  mode?: InstallMode;
  results: InstallResult[];
}

const catalog = loadCatalog();
const skill = catalog[0]; // spec-driven — the only skill

const modeItems = [
  { label: 'Global  (~/ — available in all projects)', value: 'global' },
  { label: 'Local   (./ — current project only)', value: 'local' },
];

export function App() {
  const { exit } = useApp();
  const [state, setState] = useState<State>({
    step: 'welcome',
    agents: [],
    results: [],
  });

  if (state.step === 'welcome') {
    return (
      <Box flexDirection="column" gap={1} paddingY={1}>
        <Text bold color="cyan">{'  ◆ Tech Lead Tools'}</Text>
        <Text dimColor>{'  A curated toolkit for Tech Leads and Staff Engineers'}</Text>
        <Box marginTop={1}>
          <SelectInput
            items={[{ label: 'Get started →', value: 'start' }]}
            onSelect={() => setState((s) => ({ ...s, step: 'agent' }))}
          />
        </Box>
      </Box>
    );
  }

  if (state.step === 'agent') {
    return (
      <Box paddingY={1}>
        <AgentSelector
          onSubmit={(agents) => setState((s) => ({ ...s, agents, step: 'mode' }))}
        />
      </Box>
    );
  }

  if (state.step === 'mode') {
    return (
      <Box flexDirection="column" gap={1} paddingY={1}>
        <Text bold>Install globally or in current project?</Text>
        <SelectInput
          items={modeItems}
          onSelect={(item) =>
            setState((s) => ({ ...s, mode: item.value as InstallMode, step: 'confirm' }))
          }
        />
      </Box>
    );
  }

  if (state.step === 'confirm') {
    const { agents, mode } = state;
    return (
      <Box flexDirection="column" gap={1} paddingY={1}>
        <Text bold>Ready to install <Text color="cyan">spec-driven</Text> into:</Text>
        {agents.map((a) => (
          <Text key={a.id} dimColor>
            {'  • '}{a.name}{'  '}({mode === 'global' ? a.globalSkillsDir : a.localSkillsDir})
          </Text>
        ))}
        <Box marginTop={1}>
          <SelectInput
            items={[
              { label: 'Install', value: 'install' },
              { label: 'Cancel', value: 'cancel' },
            ]}
            onSelect={(item) => {
              if (item.value === 'cancel') { exit(); return; }
              const results: InstallResult[] = agents.map((agent) => {
                const result = installSkill(skill, agent, mode!);
                return {
                  agent: agent.name,
                  success: result.success,
                  destination: result.destination,
                  error: result.error,
                };
              });
              setState((s) => ({ ...s, results, step: 'done' }));
            }}
          />
        </Box>
      </Box>
    );
  }

  if (state.step === 'done') {
    const { results, agents, mode } = state;
    const succeeded = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    return (
      <Box flexDirection="column" gap={1} paddingY={1}>
        <Text bold color="green">✓ Installation complete</Text>
        {results.map((r) => (
          <Box key={r.agent} flexDirection="column">
            <Text>
              {'  '}<Text color={r.success ? 'green' : 'red'}>{r.success ? '✓' : '✗'}</Text>
              {' spec-driven → '}
              <Text dimColor>{mode === 'global' ? agents.find(a => a.name === r.agent)!.globalSkillsDir : agents.find(a => a.name === r.agent)!.localSkillsDir}</Text>
            </Text>
            {r.error && <Text color="red">    {r.error}</Text>}
          </Box>
        ))}
        {failed.length === 0 && (
          <Text dimColor>
            {'  Includes full toolkit: accessibility, best-practices, c4-architect,\n  code-quality-guardian, create-adr, create-rfc, duplication-hunter,\n  frontend-component-architect, gh-fix-ci, seo, skill-architect,\n  chrome-devtools, cursor-subagent-creator, technical-design-doc-creator'}
          </Text>
        )}
        <Text dimColor>{succeeded.length === agents.length ? 'Installed successfully' : `${failed.length} failed`}</Text>
      </Box>
    );
  }

  return null;
}
