import { create } from 'zustand';

export interface WordAnalysis {
  word: string;
  syllables: string[];
  syllableCount: number;
  stressPattern: number[];
  rhymeSounds: string[];
}

export interface LineAnalysis {
  text: string;
  words: WordAnalysis[];
  meterType?: string;
  stressPattern: string;
}

export interface PoemAnalysis {
  lines: LineAnalysis[];
  rhymeScheme: string[];
  overallMeter?: string;
}

interface PoemState {
  poemText: string;
  analysis: PoemAnalysis | null;
  selectedWord: string | null;
  setPoemText: (text: string) => void;
  setAnalysis: (analysis: PoemAnalysis | null) => void;
  setSelectedWord: (word: string | null) => void;
  clearPoem: () => void;
}

export const usePoemStore = create<PoemState>((set) => ({
  poemText: '',
  analysis: null,
  selectedWord: null,
  setPoemText: (text) => set({ poemText: text }),
  setAnalysis: (analysis) => set({ analysis }),
  setSelectedWord: (word) => set({ selectedWord: word }),
  clearPoem: () => set({ poemText: '', analysis: null, selectedWord: null }),
}));
