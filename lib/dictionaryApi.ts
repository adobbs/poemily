export interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export interface Phonetic {
  text: string;
  audio?: string;
}

export interface WordInfo {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  origin?: string;
}

/**
 * Fetch word information from Free Dictionary API
 */
export async function fetchWordInfo(word: string): Promise<WordInfo | null> {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return null;
    }

    const entry = data[0];

    return {
      word: entry.word,
      phonetics: entry.phonetics || [],
      meanings: entry.meanings || [],
      origin: entry.origin,
    };
  } catch (error) {
    console.error('Error fetching word info:', error);
    return null;
  }
}

/**
 * Get synonyms for a word
 */
export function getSynonyms(wordInfo: WordInfo): string[] {
  const synonyms = new Set<string>();

  wordInfo.meanings.forEach((meaning) => {
    meaning.definitions.forEach((def) => {
      def.synonyms?.forEach((syn) => synonyms.add(syn));
    });
  });

  return Array.from(synonyms);
}

/**
 * Get antonyms for a word
 */
export function getAntonyms(wordInfo: WordInfo): string[] {
  const antonyms = new Set<string>();

  wordInfo.meanings.forEach((meaning) => {
    meaning.definitions.forEach((def) => {
      def.antonyms?.forEach((ant) => antonyms.add(ant));
    });
  });

  return Array.from(antonyms);
}
