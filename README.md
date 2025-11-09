# Poemily - Poetry Analysis Tool

A comprehensive open-source poetry analysis tool built with Next.js, TypeScript, Mantine, and Zustand. Analyze poems for meter, rhyme schemes, stress patterns, word information, and more.

## Features

- **Syllable Analysis**: Automatic syllable counting and splitting for each word
- **Stress Pattern Detection**: Identifies stressed and unstressed syllables
- **Meter Detection**: Recognizes poetic meters (iambic, trochaic, anapestic, dactylic, etc.)
- **Rhyme Scheme Analysis**: Automatically detects rhyme schemes (ABAB, AABB, etc.)
- **Word Information**: Integration with Free Dictionary API for definitions, etymology, and pronunciation
- **Rhyming Dictionary**: Find words that rhyme with selected words
- **Thesaurus**: View synonyms and antonyms
- **Privacy First**: All analysis happens in your browser - no data is saved or transmitted

## Tech Stack

- **Next.js 16.0.1** - React framework
- **TypeScript** - Type safety
- **Mantine 8.3.7** - UI component library
- **Zustand** - State management
- **Lucide React** - Icon library
- **Free Dictionary API** - Word definitions and etymology

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/poemily.git
cd poemily
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Enter a Poem**: Type or paste a poem into the text area, or upload a text file
2. **Load Examples**: Use the example dropdown to load sample poems
3. **Analyze**: Click the "Analyze Poem" button to process the poem
4. **Explore**:
   - View overall meter and rhyme scheme
   - Click on any word to see detailed information
   - See stress patterns for each line
   - Find rhyming words and synonyms

## Project Structure

```
poemily/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with Mantine provider
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── PoemInput.tsx     # Poem input and upload
│   ├── PoemAnalysis.tsx  # Analysis display
│   ├── WordInfo.tsx      # Word details panel
│   └── PrivacyNotice.tsx # Privacy information
├── store/                # Zustand state management
│   └── poemStore.ts      # Poem state store
├── utils/                # Utility functions
│   ├── analyzer.ts       # Main poem analysis
│   ├── syllables.ts      # Syllable detection
│   ├── meter.ts          # Meter analysis
│   └── rhyme.ts          # Rhyme detection
├── lib/                  # External integrations
│   └── dictionaryApi.ts  # Dictionary API client
└── data/                 # Static data
    └── examplePoems.ts   # Example poems
```

## Features in Detail

### Syllable Detection

The tool uses pattern-matching algorithms to:
- Count syllables in each word
- Split words into syllables
- Handle common English pronunciation patterns

### Meter Analysis

Detects common poetic meters:
- Iambic (unstressed-stressed)
- Trochaic (stressed-unstressed)
- Anapestic (unstressed-unstressed-stressed)
- Dactylic (stressed-unstressed-unstressed)
- Mixed meter and free verse

### Rhyme Scheme

Automatically identifies:
- End rhymes
- Rhyme patterns (couplets, alternate rhyme, enclosed rhyme)
- Common forms (sonnets, etc.)

## Privacy

Poemily is built with privacy as a core principle:
- **No server-side processing**: All analysis happens in your browser
- **No data collection**: Your poems are never saved, stored, or transmitted
- **No tracking**: No analytics or tracking scripts
- **API calls**: Only made to the public Free Dictionary API for word definitions (optional)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Free Dictionary API](https://dictionaryapi.dev/) for word definitions
- [Mantine](https://mantine.dev/) for the excellent UI components
- [Lucide](https://lucide.dev/) for beautiful icons

## Roadmap

- [ ] Advanced rhyme detection with phonetic analysis
- [ ] Support for more poetic forms (haiku, limerick, etc.)
- [ ] Export analysis as PDF or markdown
- [ ] Dark mode toggle
- [ ] More comprehensive etymology database
- [ ] Support for multiple languages
- [ ] Audio pronunciation
- [ ] Comparison with classical poetry patterns

## Development

### Build for Production

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.
