import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { AGENTS, type AgentDefinition } from '@ghcordeiro/core';
import { Header } from './Header.js';
import { StepIndicator } from './StepIndicator.js';

interface Props {
  onSubmit: (agents: AgentDefinition[]) => void;
}

export function AgentSelector({ onSubmit }: Props) {
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useInput((input, key) => {
    if (key.upArrow) {
      setCursor((c) => (c > 0 ? c - 1 : AGENTS.length - 1));
    } else if (key.downArrow) {
      setCursor((c) => (c < AGENTS.length - 1 ? c + 1 : 0));
    } else if (input === ' ') {
      const id = AGENTS[cursor].id;
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    } else if (input === 'a') {
      if (selected.size === AGENTS.length) {
        setSelected(new Set());
      } else {
        setSelected(new Set(AGENTS.map((a) => a.id)));
      }
    } else if (key.return && selected.size > 0) {
      onSubmit(AGENTS.filter((a) => selected.has(a.id)));
    }
  });

  return (
    <Box flexDirection="column">
      <Header />
      <StepIndicator current={1} total={3} label="Select agents" />

      <Box paddingLeft={2} marginBottom={1}>
        <Text>Which AI agent(s) do you use?</Text>
      </Box>

      <Box flexDirection="column" paddingLeft={2}>
        {AGENTS.map((agent, i) => {
          const isActive = i === cursor;
          const isChecked = selected.has(agent.id);
          return (
            <Box key={agent.id}>
              <Text color={isActive ? 'cyan' : undefined} bold={isActive}>
                {isActive ? '› ' : '  '}
                {isChecked ? '◉' : '○'}
                {'  '}
                {agent.name}
              </Text>
            </Box>
          );
        })}
      </Box>

      <Box paddingLeft={2} marginTop={1}>
        <Text dimColor>↑↓ navigate  ·  space toggle  ·  a select all  ·  enter confirm</Text>
      </Box>

      {selected.size > 0 && (
        <Box paddingLeft={2} marginTop={1}>
          <Text color="cyan">
            {selected.size} agent{selected.size !== 1 ? 's' : ''} selected
          </Text>
          <Text dimColor>  ·  press enter to continue</Text>
        </Box>
      )}
    </Box>
  );
}
