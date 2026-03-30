import React from 'react';
import { Box, Text } from 'ink';

const RULE = '─'.repeat(42);

export function Header() {
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text color="cyan" dimColor>{RULE}</Text>
      <Box gap={1} paddingLeft={1}>
        <Text color="cyan" bold>◆</Text>
        <Text bold>Tech Lead Tools</Text>
      </Box>
      <Box paddingLeft={3}>
        <Text dimColor>Spec-driven workflows for engineers</Text>
      </Box>
      <Text color="cyan" dimColor>{RULE}</Text>
    </Box>
  );
}
