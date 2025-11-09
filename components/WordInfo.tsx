'use client';

import { useEffect, useState } from 'react';
import {
  Paper,
  Text,
  Stack,
  Loader,
  Badge,
  Divider,
  Group,
  Accordion,
  Code,
  ScrollArea,
} from '@mantine/core';
import { BookOpen, Volume2, Shuffle, List } from 'lucide-react';
import { usePoemStore } from '@/store/poemStore';
import { fetchWordInfo, WordInfo as WordInfoType } from '@/lib/dictionaryApi';
import { analyzeWord } from '@/utils/analyzer';
import { findRhymes } from '@/utils/rhyme';

// Common words for rhyme suggestions
const commonWords = [
  'cat', 'hat', 'mat', 'bat', 'rat', 'sat', 'flat', 'that',
  'dog', 'log', 'fog', 'hog', 'jog', 'blog', 'frog',
  'tree', 'see', 'bee', 'free', 'key', 'tea', 'sea', 'me',
  'sun', 'fun', 'run', 'gun', 'done', 'one', 'ton',
  'day', 'way', 'say', 'may', 'play', 'stay', 'gray',
  'night', 'light', 'sight', 'right', 'might', 'bright', 'fight',
  'love', 'dove', 'above', 'glove', 'shove',
  'heart', 'part', 'start', 'art', 'cart', 'smart',
  'mind', 'kind', 'find', 'blind', 'wind', 'behind',
];

export function WordInfo() {
  const { selectedWord } = usePoemStore();
  const [wordInfo, setWordInfo] = useState<WordInfoType | null>(null);
  const [loading, setLoading] = useState(false);
  const [rhymes, setRhymes] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedWord) {
      setWordInfo(null);
      setRhymes([]);
      return;
    }

    setLoading(true);

    // Fetch dictionary info
    fetchWordInfo(selectedWord).then((info) => {
      setWordInfo(info);
      setLoading(false);
    });

    // Find rhymes
    const foundRhymes = findRhymes(selectedWord, commonWords);
    setRhymes(foundRhymes.slice(0, 20));
  }, [selectedWord]);

  if (!selectedWord) {
    return (
      <Paper p="xl" withBorder style={{ textAlign: 'center', opacity: 0.6 }}>
        <BookOpen size={48} style={{ margin: '0 auto 16px' }} />
        <Text size="lg" c="dimmed">
          Click on a word to see details
        </Text>
      </Paper>
    );
  }

  const analysis = analyzeWord(selectedWord);

  return (
    <ScrollArea h={600}>
      <Stack gap="md">
        <Paper p="md" withBorder>
          <Text size="xl" fw={700} mb="xs">
            {selectedWord}
          </Text>

          {loading ? (
            <Loader size="sm" />
          ) : wordInfo ? (
            <>
              {wordInfo.phonetics.length > 0 && (
                <Group gap="xs" mb="sm">
                  <Volume2 size={16} />
                  <Text size="sm" c="dimmed">
                    {wordInfo.phonetics[0]?.text}
                  </Text>
                </Group>
              )}
            </>
          ) : null}

          <Group gap="xs" mb="sm">
            <Badge variant="light">
              {analysis.syllableCount} syllable{analysis.syllableCount !== 1 ? 's' : ''}
            </Badge>
            <Badge variant="light" color="grape">
              {analysis.syllables.join('·')}
            </Badge>
          </Group>

          <Text size="xs" c="dimmed" mb="xs">
            Stress Pattern:
          </Text>
          <Code mb="sm">
            {analysis.stressPattern.map((s, i) => (
              <span key={i}>{s === 1 ? '/' : '∪'}</span>
            ))}
          </Code>
        </Paper>

        {loading ? (
          <Paper p="md" withBorder style={{ textAlign: 'center' }}>
            <Loader size="sm" />
            <Text size="sm" c="dimmed" mt="xs">
              Loading dictionary info...
            </Text>
          </Paper>
        ) : wordInfo ? (
          <>
            {/* Definitions */}
            <Paper p="md" withBorder>
              <Group gap="xs" mb="md">
                <List size={16} />
                <Text size="sm" fw={600}>
                  Definitions
                </Text>
              </Group>
              <Accordion variant="separated">
                {wordInfo.meanings.map((meaning, idx) => (
                  <Accordion.Item key={idx} value={`meaning-${idx}`}>
                    <Accordion.Control>
                      <Badge variant="light" size="sm">
                        {meaning.partOfSpeech}
                      </Badge>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Stack gap="xs">
                        {meaning.definitions.slice(0, 3).map((def, defIdx) => (
                          <div key={defIdx}>
                            <Text size="sm">
                              {defIdx + 1}. {def.definition}
                            </Text>
                            {def.example && (
                              <Text size="xs" c="dimmed" fs="italic" ml="md">
                                "{def.example}"
                              </Text>
                            )}
                          </div>
                        ))}
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Paper>

            {/* Etymology */}
            {wordInfo.origin && (
              <Paper p="md" withBorder>
                <Text size="sm" fw={600} mb="xs">
                  Etymology
                </Text>
                <Text size="sm">{wordInfo.origin}</Text>
              </Paper>
            )}

            {/* Synonyms */}
            {wordInfo.meanings.some((m) =>
              m.definitions.some((d) => d.synonyms && d.synonyms.length > 0)
            ) && (
              <Paper p="md" withBorder>
                <Group gap="xs" mb="md">
                  <Shuffle size={16} />
                  <Text size="sm" fw={600}>
                    Synonyms
                  </Text>
                </Group>
                <Group gap="xs">
                  {wordInfo.meanings
                    .flatMap((m) => m.definitions)
                    .flatMap((d) => d.synonyms || [])
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .slice(0, 15)
                    .map((syn, idx) => (
                      <Badge key={idx} variant="dot" size="sm">
                        {syn}
                      </Badge>
                    ))}
                </Group>
              </Paper>
            )}
          </>
        ) : (
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed">
              Dictionary information not available for this word.
            </Text>
          </Paper>
        )}

        {/* Rhymes */}
        {rhymes.length > 0 && (
          <Paper p="md" withBorder>
            <Text size="sm" fw={600} mb="md">
              Rhymes
            </Text>
            <Group gap="xs">
              {rhymes.map((rhyme, idx) => (
                <Badge key={idx} variant="outline" size="sm">
                  {rhyme}
                </Badge>
              ))}
            </Group>
          </Paper>
        )}
      </Stack>
    </ScrollArea>
  );
}
