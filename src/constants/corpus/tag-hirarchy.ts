
export const TagHierarchy: Tag[] = [
    "V",
    "IMPN",
    "N",
    "PN",
    "ADJ",
    "PRON",
    "NEG",
    "P",
    "SUB",
    "REL",
    "DEM",
    "T",
    "LOC",
    "INTG",
    "DET",
    "REM",
    "ACC",
    "EQ",
    "CIRC",
    "RES",
    "PRO",
    "PREV",
    "INC",
    "SUP",
    "AMD",
    "EMPH",
    "VOC",
    "RSLT",
    "EXL",
    "EXP",
    "CAUS",
    "FUT",
    "CERT",
    "PRP",
    "ANS",
    "RET",
    "EXH",
    "INT",
    "IMPV",
    "COM",
    "SUR",
    "AVR",
    "INL",
    "CONJ",
];

const priorityTags = new Set(["V", "ADJ", "PN", "N"]);

export default function getDominantTag(tags: Tag[]): Tag | null {
    let dominantTag: Tag | null = null;
    let highestPriority = Infinity;

    for (const tag of tags) {
        if (priorityTags.has(tag)) return tag;

        // Check priority in TagHierarchy
        const tagPriority = TagHierarchy.indexOf(tag);
        if (tagPriority !== -1 && tagPriority < highestPriority) {
            dominantTag = tag;
            highestPriority = tagPriority;
        }
    }

    return dominantTag;
}

// getDominantTag.fromWord = (word: WordInfo) => {
//     const tags: Tag[] = word.parts.map((part: VqPart) => part[2]);
//     return getDominantTag(tags);
// };
