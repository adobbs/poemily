import { doWordsRhyme, getRhymeSound } from './syllables';

/**
 * Detect rhyme scheme for a poem
 */
export function detectRhymeScheme(lines: string[]): string[] {
  const endWords = lines.map((line) => {
    const words = line.trim().split(/\s+/);
    return words[words.length - 1]?.replace(/[.,!?;:]$/, '') || '';
  });

  const scheme: string[] = new Array(lines.length).fill('');
  const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let currentLabel = 0;

  for (let i = 0; i < endWords.length; i++) {
    if (scheme[i]) continue; // Already assigned

    // Check if this word rhymes with any previous word
    let foundRhyme = false;
    for (let j = 0; j < i; j++) {
      if (doWordsRhyme(endWords[i], endWords[j])) {
        scheme[i] = scheme[j];
        foundRhyme = true;
        break;
      }
    }

    if (!foundRhyme) {
      // Assign new label
      scheme[i] = labels[currentLabel % labels.length];

      // Check if any following words rhyme with this one
      for (let j = i + 1; j < endWords.length; j++) {
        if (!scheme[j] && doWordsRhyme(endWords[i], endWords[j])) {
          scheme[j] = labels[currentLabel % labels.length];
        }
      }

      currentLabel++;
    }
  }

  return scheme;
}

/**
 * Find words that rhyme with a given word from a word list
 */
export function findRhymes(word: string, wordList: string[]): string[] {
  return wordList.filter(
    (w) => w.toLowerCase() !== word.toLowerCase() && doWordsRhyme(word, w)
  );
}

/**
 * Get common rhyme patterns
 */
export function identifyRhymePattern(scheme: string[]): string {
  const pattern = scheme.join('');

  const patterns: { [key: string]: string } = {
    AABB: 'Couplet',
    ABAB: 'Alternate Rhyme',
    ABBA: 'Enclosed Rhyme',
    AAAA: 'Monorhyme',
    ABCABC: 'Tercet',
    ABABCC: 'Sicilian Sestet',
    ABABBCBC: 'Ottava Rima',
    ABABCDCDEFEFGG: 'Shakespearean Sonnet',
    ABBAABBACDECDE: 'Petrarchan Sonnet',
    ABBAABBACDCDCD: 'Petrarchan Sonnet Variation',
  };

  return patterns[pattern] || 'Custom Rhyme Scheme';
}

/**
 * Generate a simple rhyming dictionary from common words
 */
export function buildRhymingDictionary(words: string[]): Map<string, string[]> {
  const dictionary = new Map<string, string[]>();

  words.forEach((word) => {
    const rhymeSound = getRhymeSound(word);
    if (!dictionary.has(rhymeSound)) {
      dictionary.set(rhymeSound, []);
    }
    dictionary.get(rhymeSound)?.push(word);
  });

  return dictionary;
}
