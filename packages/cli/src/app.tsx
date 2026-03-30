import React from 'react';
import { Box, Text, useApp } from 'ink';
import { loadCatalog, installSkill, type AgentDefinition, type InstallMode } from '@ghcordeiro/core';
import { AgentSelector } from './components/AgentSelector.js';
import { ModeSelector } from './components/ModeSelector.js';
import { ConfirmStep } from './components/ConfirmStep.js';
import { Header } from './components/Header.js';
import { useState } from 'react';

type Step = 'agent' | 'mode' | 'confirm' | 'done';

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
const skill = catalog[0]; // spec-driven — the only entry point

const HOW_TO_STEPS = [
  'Open your AI agent (Claude Code, Cursor…)',
  'Start a new conversation or open a project',
  'Type  /spec-driven  and press Enter',
  'Describe the feature you want to build',
  'The skill guides you through structured planning',
];

const RULE = '─'.repeat(34);

export function App() {
  const { exit } = useApp();
  const [state, setState] = useState<State>({
    step: 'agent',
    agents: [],
    results: [],
  });

  if (state.step === 'agent') {
    return (
      <AgentSelector
        onSubmit={(agents) => setState((s) => ({ ...s, agents, step: 'mode' }))}
      />
    );
  }

  if (state.step === 'mode') {
    return (
      <ModeSelector
        onSubmit={(mode) => setState((s) => ({ ...s, mode, step: 'confirm' }))}
      />
    );
  }

  if (state.step === 'confirm') {
    return (
      <ConfirmStep
        agents={state.agents}
        mode={state.mode!}
        onCancel={() => exit()}
        onConfirm={() => {
          const results: InstallResult[] = state.agents.map((agent) => {
            const result = installSkill(skill, agent, state.mode!);
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
    );
  }

  if (state.step === 'done') {
    const { results, agents, mode } = state;
    const succeeded = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    return (
      <Box flexDirection="column">
        <Header />

        {/* Success / failure */}
        <Box paddingLeft={2} marginBottom={2}>
          {failed.length === 0 ? (
            <>
              <Text color="green" bold>✓ </Text>
              <Text bold>spec-driven installed</Text>
            </>
          ) : (
            <>
              <Text color={succeeded.length > 0 ? 'green' : 'red'} bold>
                {succeeded.length > 0 ? '✓ ' : '✗ '}
              </Text>
              <Text bold>spec-driven</Text>
              {succeeded.length > 0 && (
                <Text dimColor>  ({failed.length} agent{failed.length !== 1 ? 's' : ''} failed)</Text>
              )}
            </>
          )}
        </Box>

        {failed.length > 0 && (
          <Box flexDirection="column" paddingLeft={2} marginBottom={1}>
            {failed.map((r) => (
              <Box key={r.agent}>
                <Text color="red">✗ </Text>
                <Text>{r.agent}</Text>
                {r.error && <Text dimColor>  {r.error}</Text>}
              </Box>
            ))}
          </Box>
        )}

        {/* How to use */}
        <Box paddingLeft={2} marginBottom={0}>
          <Text bold>How to use it</Text>
        </Box>
        <Box paddingLeft={2} marginBottom={1}>
          <Text dimColor>{RULE}</Text>
        </Box>

        <Box flexDirection="column" paddingLeft={2} marginBottom={1}>
          {HOW_TO_STEPS.map((step, i) => (
            <Box key={i}>
              <Text dimColor>{String(i + 1) + '.  '}</Text>
              <Text>{step}</Text>
            </Box>
          ))}
        </Box>

        <Box paddingLeft={2} marginBottom={1}>
          <Text dimColor>{RULE}</Text>
        </Box>

        {/* Tip */}
        <Box paddingLeft={2}>
          <Text color="cyan">Tip  </Text>
          <Text dimColor>/spec-driven works best at the start of a new task.</Text>
        </Box>

        {/* Installed paths */}
        {succeeded.length > 0 && (
          <Box flexDirection="column" paddingLeft={2} marginTop={1}>
            {agents
              .filter((a) => results.find((r) => r.agent === a.name)?.success)
              .map((a) => (
                <Box key={a.id}>
                  <Text dimColor>
                    {'→ '}
                    {mode === 'global' ? a.globalSkillsDir : a.localSkillsDir}
                  </Text>
                </Box>
              ))}
          </Box>
        )}
      </Box>
    );
  }

  return null;
}
