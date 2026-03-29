import React, { useState } from 'react';
import { Box, Text, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import { loadCatalog, installSkill, type AgentDefinition, type InstallMode } from '@ghcordeiro/core';
import { AgentSelector } from './components/AgentSelector.js';

type Step = 'welcome' | 'agent' | 'mode' | 'confirm' | 'done';

interface InstallResult {
  skill: string;
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
        <Text dimColor>{'  '}<Text color="cyan">{catalog.length} skills</Text>{' ready to install into your AI agent'}</Text>
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
        <Text bold>Ready to install <Text color="cyan">{catalog.length} skills</Text> into:</Text>
        {agents.map((a) => (
          <Text key={a.id} dimColor>
            {'  • '}{a.name}{'  '}
            <Text dimColor italic>
              ({mode === 'global' ? a.globalSkillsDir : a.localSkillsDir})
            </Text>
          </Text>
        ))}
        <Box marginTop={1}>
          <SelectInput
            items={[
              { label: `Install all ${catalog.length} skills`, value: 'install' },
              { label: 'Cancel', value: 'cancel' },
            ]}
            onSelect={(item) => {
              if (item.value === 'cancel') {
                exit();
                return;
              }
              const results: InstallResult[] = [];
              for (const agent of agents) {
                for (const skill of catalog) {
                  const result = installSkill(skill, agent, mode!);
                  results.push({
                    skill: result.skill,
                    agent: agent.name,
                    success: result.success,
                    destination: result.destination,
                    error: result.error,
                  });
                }
              }
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

    const byAgent = agents.map((agent) => ({
      agent,
      items: results.filter((r) => r.agent === agent.name),
    }));

    return (
      <Box flexDirection="column" gap={1} paddingY={1}>
        <Text bold color="green">✓ Installation complete</Text>
        {byAgent.map(({ agent, items }) => (
          <Box key={agent.id} flexDirection="column">
            {agents.length > 1 && (
              <Text bold color="cyan">  {agent.name}</Text>
            )}
            {items.map((r) => (
              <Text key={`${r.agent}-${r.skill}`}>
                {'  '}<Text color={r.success ? 'green' : 'red'}>{r.success ? '✓' : '✗'}</Text>{' '}{r.skill}
                {r.error ? <Text dimColor> — {r.error}</Text> : null}
              </Text>
            ))}
            <Text dimColor>
              {'  → '}{mode === 'global' ? agent.globalSkillsDir : agent.localSkillsDir}
            </Text>
          </Box>
        ))}
        {failed.length > 0 && (
          <Text color="red">{failed.length} skill(s) failed</Text>
        )}
        <Text dimColor>{succeeded.length} skill(s) installed successfully</Text>
      </Box>
    );
  }

  return null;
}
