import React from 'react';
import { Box, Text, useInput } from 'ink';
import type { AgentDefinition, InstallMode } from '@ghcordeiro/core';
import { Header } from './Header.js';
import { StepIndicator } from './StepIndicator.js';

interface Props {
  agents: AgentDefinition[];
  mode: InstallMode;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmStep({ agents, mode, onConfirm, onCancel }: Props) {
  useInput((input, key) => {
    if (key.return) onConfirm();
    if (input === 'c' || key.escape) onCancel();
  });

  const agentNames = agents.map((a) => a.name).join(', ');
  const paths = agents.map((a) =>
    mode === 'global' ? a.globalSkillsDir : a.localSkillsDir
  );

  return (
    <Box flexDirection="column">
      <Header />
      <StepIndicator current={3} total={3} label="Confirm" />

      <Box paddingLeft={2} marginBottom={1}>
        <Text>Ready to install </Text>
        <Text color="cyan" bold>spec-driven</Text>
      </Box>

      <Box flexDirection="column" paddingLeft={2} marginBottom={2}>
        <Box>
          <Text dimColor>{'Agent  '}</Text>
          <Text>{agentNames}</Text>
        </Box>
        <Box>
          <Text dimColor>{'Scope  '}</Text>
          <Text>{mode === 'global' ? 'Global' : 'Local'}</Text>
        </Box>
        {paths.map((p, i) => (
          <Box key={i} paddingLeft={7}>
            <Text dimColor>{p}</Text>
          </Box>
        ))}
      </Box>

      <Box paddingLeft={2}>
        <Text color="cyan" bold>› </Text>
        <Text bold>Enter</Text>
        <Text> to install</Text>
        <Text dimColor>     c to cancel</Text>
      </Box>
    </Box>
  );
}
