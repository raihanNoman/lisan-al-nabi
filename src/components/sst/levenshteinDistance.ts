export function levenshteinDistance(s1: string, s2: string): number {
  const len1 = s1.length;
  const len2 = s2.length;

  // Initialize a 2D array for dynamic programming
  const dp: number[][] = Array.from({ length: len1 + 1 }, () =>
    new Array(len2 + 1).fill(0)
  );

  // Define groups of equivalent characters
  const alifVariants = new Set(["ا", "أ", "إ", "آ", "ٱ"]);
  const yaVariants = new Set(["ي", "ى"]);
  const taMarbutaVariants = new Set(["ة", "ه"]);

  // Initialize the first row and column of the DP array
  for (let i = 0; i <= len1; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= len2; j++) {
    dp[0][j] = j;
  }

  // Compute the Levenshtein distance
  for (let i = 1; i <= len1; i++) {
    const c1 = s1[i - 1];

    for (let j = 1; j <= len2; j++) {
      const c2 = s2[j - 1];

      let cost = 0;

      if (c1 === c2) {
        cost = 0;
      } else if (
        (alifVariants.has(c1) && alifVariants.has(c2)) ||
        (yaVariants.has(c1) && yaVariants.has(c2)) ||
        (taMarbutaVariants.has(c1) && taMarbutaVariants.has(c2))
      ) {
        cost = 0; // Treat variants as equal
      } else {
        cost = 1; // Characters are different
      }

      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // Deletion
        dp[i][j - 1] + 1, // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return dp[len1][len2];
}

function old_levenshteinDistance(s1: string, s2: string): number {
  const len1 = s1.length;
  const len2 = s2.length;
  const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) {
    for (let j = 0; j <= len2; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (
        (s1[i - 1] === "ا" &&
          (s2[j - 1] === "ا" || s2[j - 1] === "أ" || s2[j - 1] === "إ")) ||
        (s2[j - 1] === "ا" &&
          (s1[i - 1] === "ا" || s1[i - 1] === "أ" || s1[i - 1] === "إ"))
      ) {
        dp[i][j] = dp[i - 1][j - 1]; // Ignore Alif differences
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[len1][len2];
}
