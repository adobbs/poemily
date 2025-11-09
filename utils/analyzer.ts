import { PoemAnalysis, WordAnalysis, LineAnalysis } from '@/store/poemStore';
import {
  countSyllables,
  splitIntoSyllables,
  detectStressPattern,
  getRhymeSound,
} from './syllables';
import { analyzeLineMeter, getMeterName } from './meter';
import { detectRhymeScheme, identifyRhymePattern } from './rhyme';

/**
 * Clean and prepare word for analysis
 */
function cleanWord(word: string): string {
  return word.toLowerCase().replace(/[.,!?;:"'()[\]{}—–-]/g, '').trim();
}

/**
 * Analyze a single word
 */
export function analyzeWord(word: string): WordAnalysis {
  const cleaned = cleanWord(word);
  const syllables = splitIntoSyllables(cleaned);
  const syllableCount = countSyllables(cleaned);
  const stressPattern = detectStressPattern(cleaned);
  const rhymeSound = getRhymeSound(cleaned);

  return {
    word: cleaned,
    syllables,
    syllableCount,
    stressPattern,
    rhymeSounds: [rhymeSound],
  };
}

/**
 * Analyze a line of poetry
 */
export function analyzeLine(line: string): LineAnalysis {
  const words = line
    .split(/\s+/)
    .filter((w) => w.trim().length > 0)
    .map((w) => cleanWord(w))
    .filter((w) => w.length > 0);

  const wordAnalyses = words.map((word) => analyzeWord(word));

  // Get meter information
  const meterInfo = analyzeLineMeter(words);
  const stressPattern = wordAnalyses
    .flatMap((w) => w.stressPattern)
    .map((s) => (s === 1 ? '/' : '∪'))
    .join('');

  return {
    text: line,
    words: wordAnalyses,
    meterType: getMeterName(meterInfo),
    stressPattern,
  };
}

/**
 * Analyze an entire poem
 */
export function analyzePoem(poemText: string): PoemAnalysis {
  const lines = poemText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const lineAnalyses = lines.map((line) => analyzeLine(line));

  // Detect rhyme scheme
  const rhymeScheme = detectRhymeScheme(lines);

  // Detect overall meter (most common meter across lines)
  const meterCounts = new Map<string, number>();
  lineAnalyses.forEach((line) => {
    if (line.meterType) {
      meterCounts.set(line.meterType, (meterCounts.get(line.meterType) || 0) + 1);
    }
  });

  let overallMeter = 'Mixed Meter';
  let maxCount = 0;
  meterCounts.forEach((count, meter) => {
    if (count > maxCount) {
      maxCount = count;
      overallMeter = meter;
    }
  });

  // If less than 60% of lines have the same meter, consider it mixed
  if (maxCount / lineAnalyses.length < 0.6) {
    overallMeter = 'Mixed Meter';
  }

  // Try to identify rhyme pattern
  const rhymePatternName = identifyRhymePattern(rhymeScheme);
  if (rhymePatternName !== 'Custom Rhyme Scheme') {
    overallMeter = `${overallMeter} (${rhymePatternName})`;
  }

  return {
    lines: lineAnalyses,
    rhymeScheme,
    overallMeter,
  };
}
