export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: Difficulty;
  url: string;
  patternId: string;
}

export interface Pattern {
  id: string;
  name: string;
  blurb: string;
  problems: Problem[];
}

const lc = (slug: string) => `https://leetcode.com/problems/${slug}/`;

type Raw = [number, string, Difficulty, string];

const build = (id: string, name: string, blurb: string, prefix: string, raw: Raw[]): Pattern => ({
  id,
  name,
  blurb,
  problems: raw.map(([number, title, difficulty, slug], index) => ({
    id: `${prefix}-${index + 1}`,
    number,
    title,
    difficulty,
    url: lc(slug),
    patternId: id,
  })),
});

export const patterns: Pattern[] = [
  build("basic-arrays", "Basic Array Traversal", "Traversal, in-place tricks and index math.", "ba", [
    [1920, "Build Array from Permutation", "Easy", "build-array-from-permutation"],
    [1480, "Running Sum of 1d Array", "Easy", "running-sum-of-1d-array"],
    [1929, "Concatenation of Array", "Easy", "concatenation-of-array"],
    [485, "Max Consecutive Ones", "Easy", "max-consecutive-ones"],
    [1295, "Find Numbers with Even Number of Digits", "Easy", "find-numbers-with-even-number-of-digits"],
    [414, "Third Maximum Number", "Easy", "third-maximum-number"],
    [977, "Squares of a Sorted Array", "Easy", "squares-of-a-sorted-array"],
    [26, "Remove Duplicates from Sorted Array", "Easy", "remove-duplicates-from-sorted-array"],
    [27, "Remove Element", "Easy", "remove-element"],
    [88, "Merge Sorted Array", "Easy", "merge-sorted-array"],
  ]),
  build("prefix-sum", "Prefix Sum", "Cumulative sums for O(1) range queries.", "ps", [
    [1480, "Running Sum of 1D Array", "Easy", "running-sum-of-1d-array"],
    [724, "Find Pivot Index", "Easy", "find-pivot-index"],
    [303, "Range Sum Query - Immutable", "Easy", "range-sum-query-immutable"],
    [560, "Subarray Sum Equals K", "Medium", "subarray-sum-equals-k"],
    [525, "Contiguous Array", "Medium", "contiguous-array"],
    [930, "Binary Subarrays With Sum", "Medium", "binary-subarrays-with-sum"],
    [238, "Product of Array Except Self", "Medium", "product-of-array-except-self"],
    [1732, "Find the Highest Altitude", "Easy", "find-the-highest-altitude"],
    [1991, "Find Middle Index", "Easy", "find-the-middle-index-in-array"],
    [2574, "Left and Right Sum Differences", "Easy", "left-and-right-sum-differences"],
  ]),
  build("hashing", "Hashing", "Hash maps and sets for O(1) lookups.", "hs", [
    [1, "Two Sum", "Easy", "two-sum"],
    [217, "Contains Duplicate", "Easy", "contains-duplicate"],
    [219, "Contains Duplicate II", "Easy", "contains-duplicate-ii"],
    [349, "Intersection of Two Arrays", "Easy", "intersection-of-two-arrays"],
    [350, "Intersection of Two Arrays II", "Easy", "intersection-of-two-arrays-ii"],
    [169, "Majority Element", "Easy", "majority-element"],
    [242, "Valid Anagram", "Easy", "valid-anagram"],
    [49, "Group Anagrams", "Medium", "group-anagrams"],
    [128, "Longest Consecutive Sequence", "Medium", "longest-consecutive-sequence"],
    [41, "First Missing Positive", "Hard", "first-missing-positive"],
  ]),
  build("two-pointers", "Two Pointers", "Converging or fixed-gap pointers over sorted or linear data.", "tp", [
    [167, "Two Sum II", "Medium", "two-sum-ii-input-array-is-sorted"],
    [11, "Container With Most Water", "Medium", "container-with-most-water"],
    [15, "3Sum", "Medium", "3sum"],
    [42, "Trapping Rain Water", "Hard", "trapping-rain-water"],
    [344, "Reverse String", "Easy", "reverse-string"],
    [125, "Valid Palindrome", "Easy", "valid-palindrome"],
    [392, "Is Subsequence", "Easy", "is-subsequence"],
    [283, "Move Zeroes", "Easy", "move-zeroes"],
    [977, "Squares of Sorted Array", "Easy", "squares-of-a-sorted-array"],
    [80, "Remove Duplicates II", "Medium", "remove-duplicates-from-sorted-array-ii"],
    [75, "Sort Colors", "Medium", "sort-colors"],
    [881, "Boats to Save People", "Medium", "boats-to-save-people"],
  ]),
  build("sliding-window", "Sliding Window", "Growing and shrinking a window to track a running property.", "sw", [
    [643, "Maximum Average Subarray", "Easy", "maximum-average-subarray-i"],
    [209, "Minimum Size Subarray Sum", "Medium", "minimum-size-subarray-sum"],
    [3, "Longest Substring Without Repeating Characters", "Medium", "longest-substring-without-repeating-characters"],
    [567, "Permutation in String", "Medium", "permutation-in-string"],
    [438, "Find All Anagrams", "Medium", "find-all-anagrams-in-a-string"],
    [904, "Fruit Into Baskets", "Medium", "fruit-into-baskets"],
    [1004, "Max Consecutive Ones III", "Medium", "max-consecutive-ones-iii"],
    [424, "Longest Repeating Character Replacement", "Medium", "longest-repeating-character-replacement"],
    [1456, "Maximum Number of Vowels", "Medium", "maximum-number-of-vowels-in-a-substring-of-given-length"],
    [76, "Minimum Window Substring", "Hard", "minimum-window-substring"],
    [239, "Sliding Window Maximum", "Hard", "sliding-window-maximum"],
    [713, "Subarray Product Less Than K", "Medium", "subarray-product-less-than-k"],
    [992, "Subarrays with K Different Integers", "Hard", "subarrays-with-k-different-integers"],
    [1343, "Number of Subarrays of Size K", "Medium", "number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold"],
    [1052, "Grumpy Bookstore Owner", "Medium", "grumpy-bookstore-owner"],
  ]),
  build("binary-search", "Binary Search", "Halving the search space on sorted or monotonic data.", "bs", [
    [704, "Binary Search", "Easy", "binary-search"],
    [35, "Search Insert Position", "Easy", "search-insert-position"],
    [34, "Find First and Last Position", "Medium", "find-first-and-last-position-of-element-in-sorted-array"],
    [33, "Search in Rotated Sorted Array", "Medium", "search-in-rotated-sorted-array"],
    [81, "Search in Rotated Sorted Array II", "Medium", "search-in-rotated-sorted-array-ii"],
    [153, "Find Minimum in Rotated Sorted Array", "Medium", "find-minimum-in-rotated-sorted-array"],
    [162, "Find Peak Element", "Medium", "find-peak-element"],
    [74, "Search a 2D Matrix", "Medium", "search-a-2d-matrix"],
    [875, "Koko Eating Bananas", "Medium", "koko-eating-bananas"],
    [1011, "Capacity To Ship Packages", "Medium", "capacity-to-ship-packages-within-d-days"],
    [69, "Sqrt(x)", "Easy", "sqrtx"],
    [278, "First Bad Version", "Easy", "first-bad-version"],
  ]),
  build("sorting", "Sorting", "Custom orderings, in-place partitioning and selection.", "srt", [
    [56, "Merge Intervals", "Medium", "merge-intervals"],
    [57, "Insert Interval", "Medium", "insert-interval"],
    [75, "Sort Colors", "Medium", "sort-colors"],
    [179, "Largest Number", "Medium", "largest-number"],
    [274, "H-Index", "Medium", "h-index"],
    [414, "Third Maximum Number", "Easy", "third-maximum-number"],
    [215, "Kth Largest Element", "Medium", "kth-largest-element-in-an-array"],
    [506, "Relative Ranks", "Easy", "relative-ranks"],
    [937, "Reorder Data in Log Files", "Medium", "reorder-data-in-log-files"],
    [406, "Queue Reconstruction", "Medium", "queue-reconstruction-by-height"],
  ]),
  build("kadane", "Kadane's Algorithm", "Running best/worst subarray sums in one pass.", "kd", [
    [53, "Maximum Subarray", "Medium", "maximum-subarray"],
    [918, "Maximum Sum Circular Subarray", "Medium", "maximum-sum-circular-subarray"],
    [152, "Maximum Product Subarray", "Medium", "maximum-product-subarray"],
    [1749, "Maximum Absolute Sum", "Medium", "maximum-absolute-sum-of-any-subarray"],
    [1191, "K-Concatenation Maximum Sum", "Medium", "k-concatenation-maximum-sum"],
  ]),
  build("matrix", "Matrix", "2D traversal, rotation and in-place grid manipulation.", "mx", [
    [54, "Spiral Matrix", "Medium", "spiral-matrix"],
    [59, "Spiral Matrix II", "Medium", "spiral-matrix-ii"],
    [48, "Rotate Image", "Medium", "rotate-image"],
    [73, "Set Matrix Zeroes", "Medium", "set-matrix-zeroes"],
    [74, "Search a 2D Matrix", "Medium", "search-a-2d-matrix"],
    [240, "Search Matrix II", "Medium", "search-a-2d-matrix-ii"],
    [289, "Game of Life", "Medium", "game-of-life"],
    [867, "Transpose Matrix", "Easy", "transpose-matrix"],
    [566, "Reshape Matrix", "Easy", "reshape-the-matrix"],
    [1572, "Matrix Diagonal Sum", "Easy", "matrix-diagonal-sum"],
    [463, "Island Perimeter", "Easy", "island-perimeter"],
    [200, "Number of Islands", "Medium", "number-of-islands"],
    [695, "Max Area of Island", "Medium", "max-area-of-island"],
    [994, "Rotting Oranges", "Medium", "rotting-oranges"],
    [542, "01 Matrix", "Medium", "01-matrix"],
  ]),
  build("monotonic-stack", "Monotonic Stack", "Maintaining an ordered stack to find next/previous extremes.", "ms", [
    [496, "Next Greater Element I", "Easy", "next-greater-element-i"],
    [503, "Next Greater Element II", "Medium", "next-greater-element-ii"],
    [739, "Daily Temperatures", "Medium", "daily-temperatures"],
    [901, "Online Stock Span", "Medium", "online-stock-span"],
    [84, "Largest Rectangle", "Hard", "largest-rectangle-in-histogram"],
    [42, "Trapping Rain Water", "Hard", "trapping-rain-water"],
    [907, "Sum of Subarray Minimums", "Medium", "sum-of-subarray-minimums"],
    [1475, "Final Prices", "Easy", "final-prices-with-a-special-discount-in-a-shop"],
    [1019, "Next Greater Node", "Medium", "next-greater-node-in-linked-list"],
    [2289, "Steps to Make Array Non-decreasing", "Medium", "steps-to-make-array-non-decreasing"],
  ]),
  build("heap", "Heap", "Priority queues for top-K, streaming and merge problems.", "hp", [
    [215, "Kth Largest Element", "Medium", "kth-largest-element-in-an-array"],
    [347, "Top K Frequent Elements", "Medium", "top-k-frequent-elements"],
    [973, "K Closest Points", "Medium", "k-closest-points-to-origin"],
    [1046, "Last Stone Weight", "Easy", "last-stone-weight"],
    [703, "Kth Largest in a Stream", "Easy", "kth-largest-element-in-a-stream"],
    [692, "Top K Frequent Words", "Medium", "top-k-frequent-words"],
    [373, "Find K Pairs", "Medium", "find-k-pairs-with-smallest-sums"],
    [295, "Find Median from Data Stream", "Hard", "find-median-from-data-stream"],
    [378, "Kth Smallest in Matrix", "Medium", "kth-smallest-element-in-a-sorted-matrix"],
    [23, "Merge K Sorted Lists", "Hard", "merge-k-sorted-lists"],
  ]),
  build("greedy", "Greedy", "Locally optimal choices that lead to a globally optimal result.", "gr", [
    [55, "Jump Game", "Medium", "jump-game"],
    [45, "Jump Game II", "Medium", "jump-game-ii"],
    [134, "Gas Station", "Medium", "gas-station"],
    [135, "Candy", "Hard", "candy"],
    [122, "Best Time to Buy and Sell Stock II", "Medium", "best-time-to-buy-and-sell-stock-ii"],
    [452, "Minimum Number of Arrows", "Medium", "minimum-number-of-arrows-to-burst-balloons"],
    [435, "Non-overlapping Intervals", "Medium", "non-overlapping-intervals"],
    [605, "Can Place Flowers", "Easy", "can-place-flowers"],
    [1005, "Maximize Sum After K Negations", "Easy", "maximize-sum-of-array-after-k-negations"],
    [1029, "Two City Scheduling", "Medium", "two-city-scheduling"],
  ]),
  build("dp", "Dynamic Programming", "Breaking problems into overlapping subproblems with memoization.", "dp", [
    [198, "House Robber", "Medium", "house-robber"],
    [213, "House Robber II", "Medium", "house-robber-ii"],
    [70, "Climbing Stairs", "Easy", "climbing-stairs"],
    [746, "Min Cost Climbing Stairs", "Easy", "min-cost-climbing-stairs"],
    [322, "Coin Change", "Medium", "coin-change"],
    [300, "Longest Increasing Subsequence", "Medium", "longest-increasing-subsequence"],
    [416, "Partition Equal Subset Sum", "Medium", "partition-equal-subset-sum"],
    [494, "Target Sum", "Medium", "target-sum"],
    [518, "Coin Change II", "Medium", "coin-change-ii"],
    [1143, "Longest Common Subsequence", "Medium", "longest-common-subsequence"],
    [62, "Unique Paths", "Medium", "unique-paths"],
    [64, "Minimum Path Sum", "Medium", "minimum-path-sum"],
    [931, "Minimum Falling Path Sum", "Medium", "minimum-falling-path-sum"],
    [221, "Maximal Square", "Medium", "maximal-square"],
    [139, "Word Break", "Medium", "word-break"],
  ]),
];

export const allProblems = patterns.flatMap((pattern) =>
  pattern.problems.map((problem) => ({ ...problem, patternName: pattern.name })),
);

export const totalProblems = allProblems.length;
