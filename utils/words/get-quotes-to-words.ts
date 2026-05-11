export type WordInfo = {
    freq: number;
    ar: string;
    en: string;
    bn?: string;
};

type Options = {
    removeDiacritics?: boolean;
};

/**
 * Removes Arabic harakat / tashkeel
 */
function stripArabicDiacritics(text: string): string {
    return text.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, "");
}

/**
 * Cleans unsupported punctuation/symbols while preserving:
 * - Arabic letters
 * - English letters
 * - numbers
 * - apostrophes
 * - spaces
 */
function cleanWord(text: string, removeDiacritics = false): string {
    let cleaned = text;

    // Remove Arabic diacritics if requested
    if (removeDiacritics) {
        cleaned = stripArabicDiacritics(cleaned);
    }

    // Remove Arabic punctuation + unsupported symbols
    cleaned = cleaned.replace(/[^\p{L}\p{N}\s']/gu, "");

    return cleaned.trim();
}

export function getQuotesToWords(quotes: string[], options: Options = {}): Map<string, WordInfo> {
    const { removeDiacritics = false } = options;

    const wordsMap = new Map<string, WordInfo>();

    for (const quote of quotes) {
        const cleanedQuote = cleanWord(quote, removeDiacritics);

        const words = cleanedQuote.split(/\s+/).filter(Boolean);

        for (const word of words) {
            if (wordsMap.has(word)) {
                wordsMap.get(word)!.freq += 1;
            } else {
                wordsMap.set(word, {
                    freq: 1,
                    ar: word,
                    en: "",
                    bn: "",
                });
            }
        }
    }

    return wordsMap;
}
