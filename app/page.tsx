'use client';

import { Container, Title, Text, Stack, Grid, Paper } from '@mantine/core';
import { Feather } from 'lucide-react';
import { PoemInput } from '@/components/PoemInput';
import { PoemAnalysis } from '@/components/PoemAnalysis';
import { WordInfo } from '@/components/WordInfo';
import { PrivacyNotice } from '@/components/PrivacyNotice';

export default function HomePage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Paper p="xl" withBorder style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <Feather size={40} />
            <Title order={1}>Poemily</Title>
          </div>
          <Text size="lg" c="dimmed" mt="md">
            Poetry Analysis Tool - Analyze meter, rhyme, stress patterns, and more
          </Text>
        </Paper>

        {/* Privacy Notice */}
        <PrivacyNotice />

        {/* Main Content */}
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <PoemInput />
              <PoemAnalysis />
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <WordInfo />
          </Grid.Col>
        </Grid>

        {/* Footer */}
        <Paper p="md" withBorder style={{ textAlign: 'center' }}>
          <Text size="sm" c="dimmed">
            Built with Next.js, TypeScript, Mantine, and Zustand
          </Text>
          <Text size="xs" c="dimmed" mt="xs">
            Open source poetry analysis tool - No data collection or storage
          </Text>
        </Paper>
      </Stack>
    </Container>
  );
}
