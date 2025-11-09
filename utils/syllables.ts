// Syllable counting and stress detection utilities

const vowels = 'aeiouy';

/**
 * Count syllables in a word using basic rules
 */
export function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;

  // Remove silent e
  word = word.replace(/(?:[^laeiouy]e|ed|es)$/, '');

  // Match vowel groups
  const syllableMatches = word.match(/[aeiouy]{1,2}/g);
  let count = syllableMatches ? syllableMatches.length : 1;

  // Adjust for common patterns
  if (word.endsWith('le') && word.length > 2 && !vowels.includes(word[word.length - 3])) {
    count++;
  }

  return Math.max(1, count);
}

/**
 * Split word into syllables (approximate)
 */
export function splitIntoSyllables(word: string): string[] {
  word = word.toLowerCase().trim();

  if (word.length <= 3) return [word];

  const syllables: string[] = [];
  let currentSyllable = '';

  for (let i = 0; i < word.length; i++) {
    currentSyllable += word[i];

    // If we have a vowel and the next char is a consonant (or end of word)
    if (vowels.includes(word[i])) {
      if (i === word.length - 1) {
        syllables.push(currentSyllable);
        currentSyllable = '';
      } else if (!vowels.includes(word[i + 1]) && i < word.length - 2) {
        // Look ahead to split properly
        if (!vowels.includes(word[i + 2])) {
          currentSyllable += word[i + 1];
          i++;
        }
        syllables.push(currentSyllable);
        currentSyllable = '';
      }
    }
  }

  if (currentSyllable) {
    if (syllables.length > 0) {
      syllables[syllables.length - 1] += currentSyllable;
    } else {
      syllables.push(currentSyllable);
    }
  }

  return syllables.length > 0 ? syllables : [word];
}

/**
 * Detect stress pattern (0 = unstressed, 1 = stressed)
 * This is a simplified version - real stress detection would need a phonetic dictionary
 */
export function detectStressPattern(word: string): number[] {
  const syllables = splitIntoSyllables(word);
  const syllableCount = syllables.length;

  // Simple heuristic-based stress pattern
  if (syllableCount === 1) return [1];
  if (syllableCount === 2) {
    // Common patterns: stress on first syllable for nouns, second for verbs
    // Default to first syllable
    return [1, 0];
  }
  if (syllableCount === 3) {
    // Common pattern: stress on first or second syllable
    return [1, 0, 0];
  }

  // For longer words, stress typically on first or second syllable
  const pattern = new Array(syllableCount).fill(0);
  pattern[1] = 1; // Primary stress on second syllable (common in English)

  return pattern;
}

/**
 * Get rhyme sound (last syllable approximation)
 */
export function getRhymeSound(word: string): string {
  word = word.toLowerCase().trim();

  // Find the last vowel cluster and everything after
  const match = word.match(/[aeiouy]+[^aeiouy]*$/);
  return match ? match[0] : word;
}

/**
 * Check if two words rhyme
 */
export function doWordsRhyme(word1: string, word2: string): boolean {
  const rhyme1 = getRhymeSound(word1);
  const rhyme2 = getRhymeSound(word2);

  return rhyme1 === rhyme2 && word1.toLowerCase() !== word2.toLowerCase();
}
