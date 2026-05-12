import { levenshteinDistance } from "./levenshteinDistance";
import { normalize } from "./normalize";
/** @note addressing extra alif case  "الرحمان" vs "الرحمن"*/
// function removeAlifs(text: string): string {
//   return text.replace(/ا|أ|إ|آ|ٱ/g, "");
// }

// s1 = removeAlifs(s1);
// s2 = removeAlifs(s2);

export function similarity(s1: string, s2: string): number {
    s1 = normalize(s1);
    s2 = normalize(s2);

    const maxLength = Math.max(s1.length, s2.length);
    if (maxLength === 0) return 100;

    const distance = levenshteinDistance(s1, s2);
    const similarity_perCent = ((maxLength - distance) / maxLength) * 100;

    return Math.round(similarity_perCent);
}

const isSimilar = (s1: string | undefined, s2: string | undefined, percent = 80) => {
    if (!s1 || !s2) return false;
    return similarity(s1, s2) > percent;
};

export default isSimilar;
