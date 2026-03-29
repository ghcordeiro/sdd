import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { SkillEntry } from '@ghcordeiro/core';

interface Props {
  skills: SkillEntry[];
  onSubmit: (selected: SkillEntry[]) => void;
}

export function SkillSelector({ skills, onSubmit }: Props) {
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useInput((input, key) => {
    if (key.upArrow) {
      setCursor((c) => (c > 0 ? c - 1 : skills.length - 1));
    } else if (key.downArrow) {
      setCursor((c) => (c < skills.length - 1 ? c + 1 : 0));
    } else if (input === ' ') {
      const id = skills[cursor].id;
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    } else if (key.return) {
      onSubmit(skills.filter((s) => selected.has(s.id)));
    } else if (input === 'a') {
      // toggle all
      if (selected.size === skills.length) {
        setSelected(new Set());
      } else {
        setSelected(new Set(skills.map((s) => s.id)));
      }
    }
  });

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>Select skills to install:</Text>
      <Text dimColor>↑/↓ navigate  ·  Space toggle  ·  A select all  ·  Enter confirm</Text>
      <Box flexDirection="column">
        {skills.map((skill, i) => {
          const isActive = i === cursor;
          const isChecked = selected.has(skill.id);
          return (
            <Box key={skill.id}>
              <Text color={isActive ? 'cyan' : undefined}>
                {isActive ? '>' : ' '}
                {' '}
                {isChecked ? '◉' : '○'}
                {'  '}
                <Text bold={isActive}>{skill.id}</Text>
              </Text>
            </Box>
          );
        })}
      </Box>
      {selected.size > 0 && (
        <Text dimColor>{selected.size} skill(s) selected</Text>
      )}
    </Box>
  );
}
