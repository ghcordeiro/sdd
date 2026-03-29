import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { AGENTS, type AgentDefinition } from '@ghcordeiro/core';

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
    } else if (key.return) {
      if (selected.size === 0) return;
      onSubmit(AGENTS.filter((a) => selected.has(a.id)));
    }
  });

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>Select your AI agent(s):</Text>
      <Text dimColor>↑/↓ navigate  ·  Space toggle  ·  A select all  ·  Enter confirm</Text>
      <Box flexDirection="column">
        {AGENTS.map((agent, i) => {
          const isActive = i === cursor;
          const isChecked = selected.has(agent.id);
          return (
            <Box key={agent.id}>
              <Text color={isActive ? 'cyan' : undefined}>
                {isActive ? '>' : ' '}
                {' '}
                {isChecked ? '◉' : '○'}
                {'  '}
                <Text bold={isActive}>{agent.name}</Text>
              </Text>
            </Box>
          );
        })}
      </Box>
      {selected.size > 0 && (
        <Text dimColor>{selected.size} agent(s) selected · Enter to continue</Text>
      )}
    </Box>
  );
}
