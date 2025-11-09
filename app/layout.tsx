import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Poemily - Poetry Analysis Tool',
  description: 'Analyze poetry with word info, meter, stresses, rhyming dictionary, thesaurus, and more. Your poems are never saved or stored.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
