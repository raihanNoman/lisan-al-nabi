interface CorpusPart {
  location: string; // '114:1:1:1'
  form: string; //'qulo'
  tag: Tag; //'V'
  features: string; // 'STEM|POS:V|IMPV|LEM:qaAla|ROOT:qwl|2MS'
  attachment?: string;
}

type CorpusWords = { [position: number]: CorpusPart[] }; // 1 line // 1 verse // 1 ayah
type CorpusVerses = { [verse: number]: CorpusWords }; // 1 surah // 1 chapter

interface TagDefinition {
  tag: Tag;
  name: string;
  arabic: string;
  description: string;
  examples?: string[];
}

type WordType = "اسم" | "فعل" | "حرف";

type Tag =
  | "P" // Preposition
  | "N" // Noun
  | "PN" // Proper Noun
  | "DET" // Determiner
  | "ADJ" // Adjective
  | "PRON" // Pronoun
  | "V" // Verb
  | "VFFIX" // Verbal prefix
  | "CONJ" // Conjunction
  | "REL" // Relative Pronoun
  | "NEG" // Negative Particle
  | "INL" // Quranic Initials
  | "DEM" // Demonstrative Pronoun // pointers
  | "REM" // Resumption Particle
  | "ACC" // Accusative Particle
  | "EQ" // Equalization Particle
  | "CIRC" // Circumstantial Particle
  | "RES" // Restriction Particle
  | "T" // Time Adverb
  | "PRO" // Prohibition Particle
  | "PREV" // Preventive Particle
  | "INC" // Inceptive Particle
  | "SUP" // Supplemental Particle
  | "AMD" // Amendment Particle
  | "SUB" // Subordinating Conjunction
  | "INTG" // Interrogative Particle
  | "LOC" // Location Adverb
  | "COND" // Conditional Particle
  | "EMPH" // Emphatic Particle
  | "VOC" // Vocative Particle
  | "RSLT" // Result Particle
  | "EXL" // Explanation Particle
  | "EXP" // Exceptive Particle
  | "CAUS" // Causative Particle
  | "FUT" // Future Particle
  | "CERT" // Certainty Particle
  | "PRP" // Purpose Particle
  | "ANS" // Answer Particle
  | "RET" // Retraction Particle
  | "EXH" // Exhortation Particle
  | "INT" // Interpretation Particle
  | "IMPV" // Imperative Particle
  | "COM" // Comitative Particle
  | "SUR" // Surprise Particle
  | "AVR" // Aversion Particle
  | "IMPN"; // Imperative Verbal Noun
