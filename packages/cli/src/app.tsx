import React, { useState } from 'react';
import { Box, Text, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import { loadCatalog, installSkill, type AgentDefinition, type SkillEntry, type InstallMode } from '@ghcordeiro/core';
import { AgentSelector } from './components/AgentSelector.js';
import { SkillSelector } from './components/SkillSelector.js';

type Step = 'welcome' | 'agent' | 'mode' | 'skills' | 'confirm' | 'done';

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
  selectedSkills: SkillEntry[];
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
    selectedSkills: [],
    results: [],
  });

  if (state.step === 'welcome') {
    return (
      <Box flexDirection="column" gap={1} paddingY={1}>
        <Text bold color="cyan">{'  ◆ @ghcordeiro/ai-skills'}</Text>
        <Text dimColor>{'  Install AI agent skills for Claude Code, Cursor, Copilot, Gemini CLI & Antigravity'}</Text>
        <Box marginTop={1}>
          <Text>Press <Text bold>Enter</Text> to start</Text>
        </Box>
        <SelectInput
          items={[{ label: 'Start →', value: 'start' }]}
          onSelect={() => setState((s) => ({ ...s, step: 'agent' }))}
        />
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
            setState((s) => ({ ...s, mode: item.value as InstallMode, step: 'skills' }))
          }
        />
      </Box>
    );
  }

  if (state.step === 'skills') {
    return (
      <Box paddingY={1}>
        <SkillSelector
          skills={catalog}
          onSubmit={(selected) => setState((s) => ({ ...s, selectedSkills: selected, step: 'confirm' }))}
        />
      </Box>
    );
  }

  if (state.step === 'confirm') {
    const { agents, mode, selectedSkills } = state;
    return (
      <Box flexDirection="column" gap={1} paddingY={1}>
        <Text bold>Ready to install:</Text>
        <Text>  Agents: <Text color="cyan">{agents.map((a) => a.name).join(', ')}</Text></Text>
        <Text>  Mode:   <Text color="cyan">{mode}</Text></Text>
        <Text>  Skills: <Text color="cyan">{selectedSkills.length}</Text></Text>
        {selectedSkills.map((s) => (
          <Text key={s.id} dimColor>    • {s.id}</Text>
        ))}
        <Box marginTop={1}>
          <SelectInput
            items={[
              { label: 'Install', value: 'install' },
              { label: 'Cancel', value: 'cancel' },
            ]}
            onSelect={(item) => {
              if (item.value === 'cancel') {
                exit();
                return;
              }
              const results: InstallResult[] = [];
              for (const agent of agents) {
                for (const skill of selectedSkills) {
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

    // Group results by agent for cleaner output
    const byAgent = agents.map((agent) => ({
      agent,
      items: results.filter((r) => r.agent === agent.name),
    }));

    return (
      <Box flexDirection="column" gap={1} paddingY={1}>
        <Text bold color="green">Installation complete</Text>
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
            {items.some((r) => r.success) && (
              <Text dimColor>
                {'  → '}{mode === 'global' ? agent.globalSkillsDir : agent.localSkillsDir}
              </Text>
            )}
          </Box>
        ))}
        {failed.length > 0 && (
          <Text color="red">{failed.length} skill(s) failed to install</Text>
        )}
        <Text dimColor>{succeeded.length} skill(s) installed successfully</Text>
      </Box>
    );
  }

  return null;
}
