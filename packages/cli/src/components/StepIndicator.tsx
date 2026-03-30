import React from 'react';
import { Box, Text } from 'ink';

interface Props {
  current: number;
  total: number;
  label: string;
}

export function StepIndicator({ current, total, label }: Props) {
  const barWidth = Math.floor(40 / total);
  const filled = '━'.repeat(current * barWidth);
  const empty = '─'.repeat((total - current) * barWidth);

  return (
    <Box flexDirection="column" paddingLeft={2} marginBottom={1}>
      <Box gap={1}>
        <Text dimColor>step</Text>
        <Text color="cyan" bold>{String(current)}</Text>
        <Text dimColor>of {String(total)}</Text>
        <Text dimColor>·</Text>
        <Text>{label}</Text>
      </Box>
      <Box>
        <Text color="cyan">{filled}</Text>
        <Text dimColor>{empty}</Text>
      </Box>
    </Box>
  );
}
