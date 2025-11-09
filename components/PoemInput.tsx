'use client';

import { useState } from 'react';
import { Textarea, Button, Group, Select, Stack, Text } from '@mantine/core';
import { Upload, FileText, Sparkles, X } from 'lucide-react';
import { usePoemStore } from '@/store/poemStore';
import { analyzePoem } from '@/utils/analyzer';
import { examplePoems } from '@/data/examplePoems';

export function PoemInput() {
  const { poemText, setPoemText, setAnalysis, clearPoem } = usePoemStore();
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const handleAnalyze = () => {
    if (!poemText.trim()) return;

    const analysis = analyzePoem(poemText);
    setAnalysis(analysis);
  };

  const handleLoadExample = (value: string | null) => {
    if (!value) return;

    const example = examplePoems.find((p) => p.title === value);
    if (example) {
      setPoemText(example.text);
      setSelectedExample(value);
    }
  };

  const handleClear = () => {
    clearPoem();
    setSelectedExample(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setPoemText(text);
    };
    reader.readAsText(file);
  };

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Text size="lg" fw={600}>
          Enter or Upload a Poem
        </Text>
        <Group gap="xs">
          <Select
            placeholder="Load example"
            data={examplePoems.map((p) => ({ value: p.title, label: p.title }))}
            value={selectedExample}
            onChange={handleLoadExample}
            leftSection={<FileText size={16} />}
            clearable
            style={{ width: 200 }}
          />
          <Button
            component="label"
            variant="light"
            leftSection={<Upload size={16} />}
          >
            Upload
            <input
              type="file"
              accept=".txt,.poem"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </Button>
        </Group>
      </Group>

      <Textarea
        placeholder="Paste your poem here..."
        value={poemText}
        onChange={(e) => setPoemText(e.currentTarget.value)}
        minRows={10}
        autosize
        maxRows={20}
      />

      <Group justify="space-between">
        <Button
          onClick={handleClear}
          variant="subtle"
          color="red"
          leftSection={<X size={16} />}
        >
          Clear
        </Button>
        <Button
          onClick={handleAnalyze}
          leftSection={<Sparkles size={16} />}
          disabled={!poemText.trim()}
        >
          Analyze Poem
        </Button>
      </Group>
    </Stack>
  );
}
