import { detectStressPattern } from './syllables';

export type MeterType =
  | 'iambic'
  | 'trochaic'
  | 'anapestic'
  | 'dactylic'
  | 'spondaic'
  | 'pyrrhic'
  | 'mixed'
  | 'free verse';

export interface MeterInfo {
  type: MeterType;
  feet: number;
  confidence: number;
  pattern: string;
}

/**
 * Detect the meter of a line based on stress patterns
 */
export function detectMeter(stressPattern: number[]): MeterInfo {
  if (stressPattern.length < 2) {
    return {
      type: 'free verse',
      feet: 0,
      confidence: 0,
      pattern: stressPattern.join(''),
    };
  }

  // Analyze patterns
  let iambicCount = 0; // unstressed-stressed (01)
  let trochaicCount = 0; // stressed-unstressed (10)
  let anapesticCount = 0; // unstressed-unstressed-stressed (001)
  let dactylicCount = 0; // stressed-unstressed-unstressed (100)

  for (let i = 0; i < stressPattern.length - 1; i++) {
    // Iambic (01)
    if (stressPattern[i] === 0 && stressPattern[i + 1] === 1) {
      iambicCount++;
    }
    // Trochaic (10)
    if (stressPattern[i] === 1 && stressPattern[i + 1] === 0) {
      trochaicCount++;
    }

    // Three-syllable patterns
    if (i < stressPattern.length - 2) {
      // Anapestic (001)
      if (
        stressPattern[i] === 0 &&
        stressPattern[i + 1] === 0 &&
        stressPattern[i + 2] === 1
      ) {
        anapesticCount++;
      }
      // Dactylic (100)
      if (
        stressPattern[i] === 1 &&
        stressPattern[i + 1] === 0 &&
        stressPattern[i + 2] === 0
      ) {
        dactylicCount++;
      }
    }
  }

  // Determine dominant meter
  const maxCount = Math.max(
    iambicCount,
    trochaicCount,
    anapesticCount,
    dactylicCount
  );

  let type: MeterType = 'free verse';
  let feet = 0;
  let confidence = 0;

  if (maxCount === 0) {
    type = 'free verse';
  } else if (iambicCount === maxCount) {
    type = 'iambic';
    feet = iambicCount;
    confidence = iambicCount / (stressPattern.length / 2);
  } else if (trochaicCount === maxCount) {
    type = 'trochaic';
    feet = trochaicCount;
    confidence = trochaicCount / (stressPattern.length / 2);
  } else if (anapesticCount === maxCount) {
    type = 'anapestic';
    feet = anapesticCount;
    confidence = anapesticCount / (stressPattern.length / 3);
  } else if (dactylicCount === maxCount) {
    type = 'dactylic';
    feet = dactylicCount;
    confidence = dactylicCount / (stressPattern.length / 3);
  }

  // If confidence is low, mark as mixed
  if (confidence < 0.6 && type !== 'free verse') {
    type = 'mixed';
  }

  return {
    type,
    feet: Math.round(feet),
    confidence: Math.min(1, confidence),
    pattern: stressPattern.join(''),
  };
}

/**
 * Get meter name with foot count (e.g., "Iambic Pentameter")
 */
export function getMeterName(meterInfo: MeterInfo): string {
  if (meterInfo.type === 'free verse') return 'Free Verse';
  if (meterInfo.type === 'mixed') return 'Mixed Meter';

  const footNames: { [key: number]: string } = {
    1: 'Monometer',
    2: 'Dimeter',
    3: 'Trimeter',
    4: 'Tetrameter',
    5: 'Pentameter',
    6: 'Hexameter',
    7: 'Heptameter',
    8: 'Octameter',
  };

  const meterName =
    meterInfo.type.charAt(0).toUpperCase() + meterInfo.type.slice(1);
  const footName = footNames[meterInfo.feet] || `${meterInfo.feet}-foot`;

  return `${meterName} ${footName}`;
}

/**
 * Analyze a line of poetry and return its meter
 */
export function analyzeLineMeter(words: string[]): MeterInfo {
  const allStresses: number[] = [];

  words.forEach((word) => {
    const stresses = detectStressPattern(word);
    allStresses.push(...stresses);
  });

  return detectMeter(allStresses);
}
