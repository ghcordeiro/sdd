import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { AGENTS, type AgentDefinition } from '@ghcordeiro/core';

interface Props {
  onSelect: (agent: AgentDefinition) => void;
}

const items = AGENTS.map((a) => ({ label: a.name, value: a.id }));

export function AgentSelector({ onSelect }: Props) {
  const handleSelect = (item: { label: string; value: string }) => {
    const agent = AGENTS.find((a) => a.id === item.value)!;
    onSelect(agent);
  };

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>Select your AI agent:</Text>
      <SelectInput items={items} onSelect={handleSelect} />
    </Box>
  );
}
