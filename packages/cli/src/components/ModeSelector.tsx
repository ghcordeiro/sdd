import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { InstallMode } from '@ghcordeiro/core';
import { Header } from './Header.js';
import { StepIndicator } from './StepIndicator.js';

interface Props {
  onSubmit: (mode: InstallMode) => void;
}

const OPTIONS: { value: InstallMode; label: string; description: string }[] = [
  { value: 'global', label: 'Global', description: 'available across all your projects' },
  { value: 'local',  label: 'Local',  description: 'this project only' },
];

export function ModeSelector({ onSubmit }: Props) {
  const [cursor, setCursor] = useState(0);

  useInput((_input, key) => {
    if (key.upArrow)   setCursor((c) => (c > 0 ? c - 1 : OPTIONS.length - 1));
    if (key.downArrow) setCursor((c) => (c < OPTIONS.length - 1 ? c + 1 : 0));
    if (key.return)    onSubmit(OPTIONS[cursor].value);
  });

  return (
    <Box flexDirection="column">
      <Header />
      <StepIndicator current={2} total={3} label="Install scope" />

      <Box paddingLeft={2} marginBottom={1}>
        <Text>Where should </Text>
        <Text color="cyan" bold>spec-driven</Text>
        <Text> be installed?</Text>
      </Box>

      <Box flexDirection="column" paddingLeft={2}>
        {OPTIONS.map((opt, i) => {
          const isActive = i === cursor;
          return (
            <Box key={opt.value}>
              <Text color={isActive ? 'cyan' : undefined} bold={isActive}>
                {isActive ? '› ' : '  '}
                {isActive ? '◉' : '○'}
                {'  '}
                {opt.label.padEnd(10)}
              </Text>
              <Text dimColor>{opt.description}</Text>
            </Box>
          );
        })}
      </Box>

      <Box paddingLeft={2} marginTop={1}>
        <Text dimColor>↑↓ navigate  ·  enter confirm</Text>
      </Box>
    </Box>
  );
}
