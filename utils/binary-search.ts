export type Segment = [number, number, number]; // [position, startMS, endMS]
export interface WordStamp {
    word: string;
    start: number;
    end: number;
}

export default function binarySearch(activeMS: number) {
    function bySegments(segments: Segment[], initialIndex: number = 0): number {
        let low = initialIndex;
        let high = segments.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const [pos, start, end] = segments[mid];

            if (activeMS < start) high = mid - 1;
            else if (activeMS >= end) low = mid + 1;
            else return mid; // Found the correct word index
        }

        return NaN; // No matching word found
    }

    /**
     *
     *
     *
     *
     *
     *
     *
     */
    function byTimeStamps(WordStamps: WordStamp[]) {
        let low = 0;
        let high = WordStamps.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            let { start, end } = WordStamps[mid];
            // start *= 1000; // @debug:  adjust later from source
            // end *= 1000; // @debug: adjust later from source

            if (activeMS < start) high = mid - 1;
            else if (activeMS >= end) low = mid + 1;
            else return mid; // Found the correct word index
        }

        return NaN; // No matching word found
    }

    return { bySegments, byTimeStamps };
}
