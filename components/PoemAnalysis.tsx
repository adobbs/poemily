'use client';

import { Paper, Text, Stack, Group, Badge, Divider, Code } from '@mantine/core';
import { usePoemStore } from '@/store/poemStore';
import { BookOpen } from 'lucide-react';

export function PoemAnalysis() {
  const { analysis, setSelectedWord } = usePoemStore();

  if (!analysis) {
    return (
      <Paper p="xl" withBorder style={{ textAlign: 'center', opacity: 0.6 }}>
        <BookOpen size={48} style={{ margin: '0 auto 16px' }} />
        <Text size="lg" c="dimmed">
          Analyze a poem to see detailed insights
        </Text>
      </Paper>
    );
  }

  return (
    <Stack gap="lg">
      {/* Overall Analysis */}
      <Paper p="md" withBorder>
        <Text size="sm" fw={600} mb="xs">
          Overall Analysis
        </Text>
        <Group gap="xs">
          <Badge variant="light" size="lg">
            {analysis.overallMeter}
          </Badge>
          <Badge variant="light" color="grape" size="lg">
            Rhyme Scheme: {analysis.rhymeScheme.join('')}
          </Badge>
        </Group>
      </Paper>

      {/* Line by Line Analysis */}
      <Paper p="md" withBorder>
        <Text size="sm" fw={600} mb="md">
          Line Analysis
        </Text>
        <Stack gap="md">
          {analysis.lines.map((line, idx) => (
            <div key={idx}>
              <Group gap="xs" mb="xs">
                <Badge size="sm" variant="dot" color="blue">
                  Line {idx + 1}
                </Badge>
                <Badge size="sm" variant="light" color="pink">
                  {analysis.rhymeScheme[idx]}
                </Badge>
                <Badge size="sm" variant="light">
                  {line.meterType}
                </Badge>
              </Group>

              <Text mb="xs">
                {line.words.map((word, wordIdx) => (
                  <span
                    key={wordIdx}
                    onClick={() => setSelectedWord(word.word)}
                    style={{
                      cursor: 'pointer',
                      padding: '2px 4px',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {word.word}{' '}
                  </span>
                ))}
              </Text>

              <Group gap="xs">
                <Text size="xs" c="dimmed">
                  Stress Pattern:
                </Text>
                <Code>{line.stressPattern}</Code>
                <Text size="xs" c="dimmed">
                  (/ = stressed, ∪ = unstressed)
                </Text>
              </Group>

              {idx < analysis.lines.length - 1 && <Divider my="sm" />}
            </div>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
