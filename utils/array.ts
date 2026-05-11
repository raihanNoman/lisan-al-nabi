/**  Fisher-Yates (aka Knuth) shuffle*/
export function shuffle<T>(array: Array<T>): Array<T> {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function deduplicate<T>(arr: T[]) {
    return {
        by<K extends keyof T>(key: K): T[] {
            const seen = new Set<unknown>();
            return arr.filter((item) => {
                const val = item[key];
                if (seen.has(val)) return false;
                seen.add(val);
                return true;
            });
        },
    };
}
