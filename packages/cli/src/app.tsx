import React, { useState } from 'react';
import { Box, Text, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import { loadCatalog, installSkill, type AgentDefinition, type SkillEntry, type InstallMode } from '@ghcordeiro/core';
import { AgentSelector } from './components/AgentSelector.js';
import { SkillSelector } from './components/SkillSelector.js';

type Step = 'welcome' | 'agent' | 'mode' | 'skills' | 'confirm' | 'done';

interface State {
  step: Step;
  agent?: AgentDefinition;
  mode?: InstallMode;
  selectedSkills: SkillEntry[];
  results: Array<{ skill: string; success: boolean; destination: string; error?: string }>;
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
        <AgentSelector onSelect={(agent) => setState((s) => ({ ...s, agent, step: 'mode' }))} />
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
    const { agent, mode, selectedSkills } = state;
    return (
      <Box flexDirection="column" gap={1} paddingY={1}>
        <Text bold>Ready to install:</Text>
        <Text>  Agent: <Text color="cyan">{agent!.name}</Text></Text>
        <Text>  Mode:  <Text color="cyan">{mode}</Text></Text>
        <Text>  Skills ({selectedSkills.length}):</Text>
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
              const results = selectedSkills.map((skill) => {
                const result = installSkill(skill, agent!, mode!);
                return {
                  skill: result.skill,
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
    const { results, agent, mode } = state;
    const succeeded = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    return (
      <Box flexDirection="column" gap={1} paddingY={1}>
        <Text bold color="green">Installation complete</Text>
        {succeeded.map((r) => (
          <Text key={r.skill}>  <Text color="green">✓</Text> {r.skill}</Text>
        ))}
        {failed.map((r) => (
          <Text key={r.skill}>  <Text color="red">✗</Text> {r.skill} — {r.error}</Text>
        ))}
        {succeeded.length > 0 && (
          <Box marginTop={1} flexDirection="column">
            <Text dimColor>Installed to: {mode === 'global' ? agent!.globalSkillsDir : agent!.localSkillsDir}</Text>
          </Box>
        )}
      </Box>
    );
  }

  return null;
}
