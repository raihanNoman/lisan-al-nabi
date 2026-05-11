// Include "VOC" and "IMPN" under 'Ism'
const اسم = [
    "N", // Noun
    "PN", // Proper Noun
    "DET", // Determiner
    "ADJ", // Adjective
    "PRON", // Pronoun
    "REL", // Relative Pronoun
    "DEM", // Demonstrative Pronoun
    "VOC", // Vocative Particle (included under Ism)
    "T", // Time Adverb
    "LOC", // Location Adverb
    "INL", // Quranic Initials
    "IMPN", // Imperative Verbal Noun (included under Ism)
] as const;

const فعل: Tag[] = [
    "V", // Verb
];

const حرف = [
    "P", // Preposition
    "CONJ", // Conjunction
    "NEG", // Negative Particle
    "REM", // Resumption Particle
    "ACC", // Accusative Particle
    "EQ", // Equalization Particle
    "CIRC", // Circumstantial Particle
    "RES", // Restriction Particle
    "PRO", // Prohibition Particle
    "PREV", // Preventive Particle
    "INC", // Inceptive Particle
    "SUP", // Supplemental Particle
    "AMD", // Amendment Particle
    "SUB", // Subordinating Conjunction
    "INTG", // Interrogative Particle
    "COND", // Conditional Particle
    "EMPH", // Emphatic Particle
    "RSLT", // Result Particle
    "EXL", // Explanation Particle
    "EXP", // Exceptive Particle
    "CAUS", // Causative Particle
    "FUT", // Future Particle
    "CERT", // Certainty Particle
    "PRP", // Purpose Particle
    "ANS", // Answer Particle
    "RET", // Retraction Particle
    "EXH", // Exhortation Particle
    "INT", // Interpretation Particle
    "IMPV", // Imperative Particle
    "COM", // Comitative Particle
    "SUR", // Surprise Particle
    "AVR", // Aversion Particle
] as const;

export type Tag_Herfs = (typeof حرف)[number];
export type Tag_Isms = (typeof اسم)[number];

export const TAG_CATAGORY = {
    اسم,
    فعل,
    حرف,
    all: [...اسم, ...فعل, ...حرف],
};
