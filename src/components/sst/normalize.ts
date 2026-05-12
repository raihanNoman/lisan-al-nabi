export function normalize(text: string): string {
  return (
    text
      .normalize("NFC") // Normalize Unicode
      .replace(/^(الله|اللَّه|ﷲ)$/g, "الله")
      .replace(/أ|إ|آ|ٱ/g, "ا") // Normalize Alifs
      .replace(/ؤ|ئ|ء/g, "") // Remove Hamza and variants
      .replace(/ٰ|ـٰ/g, "ا") // Normalize Superscript Alif and Madda
      .replace(/ى/g, "ي") // Normalize final Ya
      .replace(/ة/g, "ه") // Normalize Ta Marbuta
      .replace(/ـ/g, "") // Remove Tatweel
      .replace(/[\u064B-\u065F]/g, "") // Remove diacritics
      .replace(/\s+/g, "") // Remove extra spaces
      // .replace(/^[ا]?ل/g, "") // Remove leading Alif-Lam
      // .replace(/ال/g, "ل") // Convert remaining "ال" to "ل"
      // .replace(/لا/g, "ل") // Convert "لا" to "ل"
      .replace(/[^ء-ي]/g, "")
      .replace(/[\u200C-\u200F]/g, "") // zero-width and RTL markers
  ); // Remove non-Arabic letters
}

function old_works(text: string): string {
  return text
    .normalize("NFC") // Normalize to Unicode NFC form for consistent character representation
    .replace(/أ|إ|آ|ٱ/g, "ا") // Normalize all forms of Alif to plain Alif
    .replace(/ة/g, "ه") // Normalize Ta Marbuta to Ha
    .replace(/ء/g, "") // Remove Hamza to treat variations equally
    .replace(/ﻻ/g, "لا") // Normalize Lam-Alif ligature
    .replace(/ـ/g, "") // Remove Tatweel (Kashida) which is sometimes used for elongation
    .replace(/ٰ/g, "ا") // Normalize Superscript Alif to plain Alif
    .replace(/ـٰ/g, "ا") // Replace Superscript Alif (Madda) with plain Alif
    .replace(/ً|ٌ|ٍ|َ|ُ|ِ|ّ|ْ/g, "") // Remove all diacritics
    .replace(/\s+/g, "") // Remove any extra spaces
    .replace(/^(ا)?ل(ا)?/g, "ل") // Simplify common prefixes like Alif-Lam ("ال") to a consistent form
    .replace(/^[ا]?ل/g, "ل") // Normalize leading "Al" (أل)
    .replace(/ال/g, "ل") // Convert "ال" to "ل" to handle cases like "الرحمان" vs "الرحمن"
    .replace(/ى/g, "ي"); // Normalize final "Ya" (ى) to regular "Ya" (ي)
}

function normalizee(text: string): string {
  return text
    .normalize("NFC")
    .replace(/أ|إ|آ|ٱ/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ء|ئ|ؤ/g, "") // Remove Hamza and its variants
    .replace(/ى/g, "ي")
    .replace(/[\u064B-\u065F]/g, "") // Remove all diacritics
    .replace(/\s+/g, "") // Remove any extra spaces
    .replace(/^(ال)/g, "") // Remove definite articles at the beginning
    .replace(/لا/g, "لا") // Normalize Lam-Alif ligatures
    .replace(/[^ء-ي]/g, ""); // Remove any non-Arabic letters
}

/** simple version
     normalize("NFC") // Normalize to Unicode NFC form
    .replace(/أ|إ|آ|ا|ٱ/g, "ا") // Normalize all forms of Alif, including Alif Wasla
    .replace(/ة/g, "ه") // Normalize Ta Marbuta to Ha
    .replace(/ء/g, "") // Remove Hamza
    .replace(/ﻻ/g, "لا") // Normalize Lam-Alif ligature
    .replace(/ـٰ/g, "ا") // Replace Superscript Alif (Madda) with plain Alif
    .replace(/ٰ/g, "") // Remove standalone Superscript Alif
    .replace(/ً|ٌ|ٍ|َ|ُ|ِ|ّ|ْ/g, "") // Remove all diacritics
    .replace(/\s+/g, ""); // Remove any extra spaces
 */
