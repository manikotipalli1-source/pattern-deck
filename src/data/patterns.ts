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
  build("arrays", "Basic Arrays", "Traversal, in-place tricks and index math.", "arr", [
    [1, "Two Sum", "Easy", "two-sum"],
    [121, "Best Time to Buy and Sell Stock", "Easy", "best-time-to-buy-and-sell-stock"],
    [26, "Remove Duplicates from Sorted Array", "Easy", "remove-duplicates-from-sorted-array"],
    [27, "Remove Element", "Easy", "remove-element"],
    [66, "Plus One", "Easy", "plus-one"],
    [88, "Merge Sorted Array", "Easy", "merge-sorted-array"],
    [189, "Rotate Array", "Medium", "rotate-array"],
    [238, "Product of Array Except Self", "Medium", "product-of-array-except-self"],
    [31, "Next Permutation", "Medium", "next-permutation"],
    [41, "First Missing Positive", "Hard", "first-missing-positive"],
  ]),
  build("prefix-sum", "Prefix Sum", "Cumulative sums for O(1) range queries.", "ps", [
    [1480, "Running Sum of 1d Array", "Easy", "running-sum-of-1d-array"],
    [724, "Find Pivot Index", "Easy", "find-pivot-index"],
    [303, "Range Sum Query - Immutable", "Easy", "range-sum-query-immutable"],
    [1732, "Find the Highest Altitude", "Easy", "find-the-highest-altitude"],
    [560, "Subarray Sum Equals K", "Medium", "subarray-sum-equals-k"],
    [304, "Range Sum Query 2D - Immutable", "Medium", "range-sum-query-2d-immutable"],
    [525, "Contiguous Array", "Medium", "contiguous-array"],
    [523, "Continuous Subarray Sum", "Medium", "continuous-subarray-sum"],
    [974, "Subarray Sums Divisible by K", "Medium", "subarray-sums-divisible-by-k"],
    [327, "Count of Range Sum", "Hard", "count-of-range-sum"],
  ]),
  build("hashing", "Hashing", "Maps and sets for O(1) lookups.", "hs", [
    [217, "Contains Duplicate", "Easy", "contains-duplicate"],
    [242, "Valid Anagram", "Easy", "valid-anagram"],
    [383, "Ransom Note", "Easy", "ransom-note"],
    [349, "Intersection of Two Arrays", "Easy", "intersection-of-two-arrays"],
    [205, "Isomorphic Strings", "Easy", "isomorphic-strings"],
    [49, "Group Anagrams", "Medium", "group-anagrams"],
    [347, "Top K Frequent Elements", "Medium", "top-k-frequent-elements"],
    [128, "Longest Consecutive Sequence", "Medium", "longest-consecutive-sequence"],
    [454, "4Sum II", "Medium", "4sum-ii"],
    [30, "Substring with Concatenation of All Words", "Hard", "substring-with-concatenation-of-all-words"],
  ]),
  build("two-pointers", "Two Pointers", "Converging or parallel scans on sorted data.", "tp", [
    [125, "Valid Palindrome", "Easy", "valid-palindrome"],
    [344, "Reverse String", "Easy", "reverse-string"],
    [283, "Move Zeroes", "Easy", "move-zeroes"],
    [977, "Squares of a Sorted Array", "Easy", "squares-of-a-sorted-array"],
    [392, "Is Subsequence", "Easy", "is-subsequence"],
    [167, "Two Sum II - Input Array Is Sorted", "Medium", "two-sum-ii-input-array-is-sorted"],
    [15, "3Sum", "Medium", "3sum"],
    [16, "3Sum Closest", "Medium", "3sum-closest"],
    [18, "4Sum", "Medium", "4sum"],
    [11, "Container With Most Water", "Medium", "container-with-most-water"],
    [75, "Sort Colors", "Medium", "sort-colors"],
    [42, "Trapping Rain Water", "Hard", "trapping-rain-water"],
  ]),
  build("sliding-window", "Sliding Window", "Dynamic windows over sequences.", "sw", [
    [643, "Maximum Average Subarray I", "Easy", "maximum-average-subarray-i"],
    [219, "Contains Duplicate II", "Easy", "contains-duplicate-ii"],
    [1876, "Substrings of Size Three with Distinct Characters", "Easy", "substrings-of-size-three-with-distinct-characters"],
    [3, "Longest Substring Without Repeating Characters", "Medium", "longest-substring-without-repeating-characters"],
    [424, "Longest Repeating Character Replacement", "Medium", "longest-repeating-character-replacement"],
    [567, "Permutation in String", "Medium", "permutation-in-string"],
    [438, "Find All Anagrams in a String", "Medium", "find-all-anagrams-in-a-string"],
    [209, "Minimum Size Subarray Sum", "Medium", "minimum-size-subarray-sum"],
    [1004, "Max Consecutive Ones III", "Medium", "max-consecutive-ones-iii"],
    [1493, "Longest Subarray of 1's After Deleting One Element", "Medium", "longest-subarray-of-1s-after-deleting-one-element"],
    [904, "Fruit Into Baskets", "Medium", "fruit-into-baskets"],
    [1456, "Maximum Number of Vowels in a Substring of Given Length", "Medium", "maximum-number-of-vowels-in-a-substring-of-given-length"],
    [1423, "Maximum Points You Can Obtain from Cards", "Medium", "maximum-points-you-can-obtain-from-cards"],
    [76, "Minimum Window Substring", "Hard", "minimum-window-substring"],
    [239, "Sliding Window Maximum", "Hard", "sliding-window-maximum"],
  ]),
  build("binary-search", "Binary Search", "Halving the search space, including on answers.", "bs", [
    [704, "Binary Search", "Easy", "binary-search"],
    [35, "Search Insert Position", "Easy", "search-insert-position"],
    [278, "First Bad Version", "Easy", "first-bad-version"],
    [69, "Sqrt(x)", "Easy", "sqrtx"],
    [744, "Find Smallest Letter Greater Than Target", "Easy", "find-smallest-letter-greater-than-target"],
    [153, "Find Minimum in Rotated Sorted Array", "Medium", "find-minimum-in-rotated-sorted-array"],
    [33, "Search in Rotated Sorted Array", "Medium", "search-in-rotated-sorted-array"],
    [34, "Find First and Last Position of Element in Sorted Array", "Medium", "find-first-and-last-position-of-element-in-sorted-array"],
    [74, "Search a 2D Matrix", "Medium", "search-a-2d-matrix"],
    [875, "Koko Eating Bananas", "Medium", "koko-eating-bananas"],
    [1011, "Capacity To Ship Packages Within D Days", "Medium", "capacity-to-ship-packages-within-d-days"],
    [4, "Median of Two Sorted Arrays", "Hard", "median-of-two-sorted-arrays"],
  ]),
  build("sorting", "Sorting", "Comparison sorts, custom comparators, bucketing.", "so", [
    [1005, "Maximize Sum Of Array After K Negations", "Easy", "maximize-sum-of-array-after-k-negations"],
    [912, "Sort an Array", "Medium", "sort-an-array"],
    [56, "Merge Intervals", "Medium", "merge-intervals"],
    [57, "Insert Interval", "Medium", "insert-interval"],
    [179, "Largest Number", "Medium", "largest-number"],
    [148, "Sort List", "Medium", "sort-list"],
    [147, "Insertion Sort List", "Medium", "insertion-sort-list"],
    [215, "Kth Largest Element in an Array", "Medium", "kth-largest-element-in-an-array"],
    [969, "Pancake Sorting", "Medium", "pancake-sorting"],
    [164, "Maximum Gap", "Hard", "maximum-gap"],
  ]),
  build("kadane", "Kadane's Algorithm", "Running optimum for maximum subarray problems.", "kd", [
    [53, "Maximum Subarray", "Medium", "maximum-subarray"],
    [152, "Maximum Product Subarray", "Medium", "maximum-product-subarray"],
    [918, "Maximum Sum Circular Subarray", "Medium", "maximum-sum-circular-subarray"],
    [1749, "Maximum Absolute Sum of Any Subarray", "Medium", "maximum-absolute-sum-of-any-subarray"],
    [1191, "K-Concatenation Maximum Sum", "Medium", "k-concatenation-maximum-sum"],
  ]),
  build("matrix", "Matrix", "2D traversal, rotation and boundary walks.", "mx", [
    [867, "Transpose Matrix", "Easy", "transpose-matrix"],
    [1572, "Matrix Diagonal Sum", "Easy", "matrix-diagonal-sum"],
    [2022, "Convert 1D Array Into 2D Array", "Easy", "convert-1d-array-into-2d-array"],
    [566, "Reshape the Matrix", "Easy", "reshape-the-matrix"],
    [54, "Spiral Matrix", "Medium", "spiral-matrix"],
    [59, "Spiral Matrix II", "Medium", "spiral-matrix-ii"],
    [48, "Rotate Image", "Medium", "rotate-image"],
    [73, "Set Matrix Zeroes", "Medium", "set-matrix-zeroes"],
    [240, "Search a 2D Matrix II", "Medium", "search-a-2d-matrix-ii"],
    [200, "Number of Islands", "Medium", "number-of-islands"],
    [130, "Surrounded Regions", "Medium", "surrounded-regions"],
    [994, "Rotting Oranges", "Medium", "rotting-oranges"],
    [79, "Word Search", "Medium", "word-search"],
    [221, "Maximal Square", "Medium", "maximal-square"],
    [85, "Maximal Rectangle", "Hard", "maximal-rectangle"],
  ]),
  build("monotonic-stack", "Monotonic Stack", "Next greater / smaller element in linear time.", "ms", [
    [496, "Next Greater Element I", "Easy", "next-greater-element-i"],
    [1475, "Final Prices With a Special Discount in a Shop", "Easy", "final-prices-with-a-special-discount-in-a-shop"],
    [739, "Daily Temperatures", "Medium", "daily-temperatures"],
    [503, "Next Greater Element II", "Medium", "next-greater-element-ii"],
    [901, "Online Stock Span", "Medium", "online-stock-span"],
    [402, "Remove K Digits", "Medium", "remove-k-digits"],
    [316, "Remove Duplicate Letters", "Medium", "remove-duplicate-letters"],
    [907, "Sum of Subarray Minimums", "Medium", "sum-of-subarray-minimums"],
    [1130, "Minimum Cost Tree From Leaf Values", "Medium", "minimum-cost-tree-from-leaf-values"],
    [84, "Largest Rectangle in Histogram", "Hard", "largest-rectangle-in-histogram"],
  ]),
  build("heap", "Heap", "Priority queues for top-k and streaming order.", "hp", [
    [1046, "Last Stone Weight", "Easy", "last-stone-weight"],
    [703, "Kth Largest Element in a Stream", "Easy", "kth-largest-element-in-a-stream"],
    [973, "K Closest Points to Origin", "Medium", "k-closest-points-to-origin"],
    [621, "Task Scheduler", "Medium", "task-scheduler"],
    [692, "Top K Frequent Words", "Medium", "top-k-frequent-words"],
    [355, "Design Twitter", "Medium", "design-twitter"],
    [1834, "Single-Threaded CPU", "Medium", "single-threaded-cpu"],
    [1962, "Remove Stones to Minimize the Total", "Medium", "remove-stones-to-minimize-the-total"],
    [295, "Find Median from Data Stream", "Hard", "find-median-from-data-stream"],
    [23, "Merge k Sorted Lists", "Hard", "merge-k-sorted-lists"],
  ]),
  build("greedy", "Greedy", "Locally optimal choices that stay optimal.", "gr", [
    [455, "Assign Cookies", "Easy", "assign-cookies"],
    [860, "Lemonade Change", "Easy", "lemonade-change"],
    [55, "Jump Game", "Medium", "jump-game"],
    [45, "Jump Game II", "Medium", "jump-game-ii"],
    [134, "Gas Station", "Medium", "gas-station"],
    [763, "Partition Labels", "Medium", "partition-labels"],
    [435, "Non-overlapping Intervals", "Medium", "non-overlapping-intervals"],
    [452, "Minimum Number of Arrows to Burst Balloons", "Medium", "minimum-number-of-arrows-to-burst-balloons"],
    [678, "Valid Parenthesis String", "Medium", "valid-parenthesis-string"],
    [135, "Candy", "Hard", "candy"],
  ]),
  build("dynamic-programming", "Dynamic Programming", "Overlapping subproblems and optimal substructure.", "dp", [
    [70, "Climbing Stairs", "Easy", "climbing-stairs"],
    [746, "Min Cost Climbing Stairs", "Easy", "min-cost-climbing-stairs"],
    [198, "House Robber", "Medium", "house-robber"],
    [213, "House Robber II", "Medium", "house-robber-ii"],
    [322, "Coin Change", "Medium", "coin-change"],
    [518, "Coin Change II", "Medium", "coin-change-ii"],
    [300, "Longest Increasing Subsequence", "Medium", "longest-increasing-subsequence"],
    [62, "Unique Paths", "Medium", "unique-paths"],
    [63, "Unique Paths II", "Medium", "unique-paths-ii"],
    [64, "Minimum Path Sum", "Medium", "minimum-path-sum"],
    [1143, "Longest Common Subsequence", "Medium", "longest-common-subsequence"],
    [5, "Longest Palindromic Substring", "Medium", "longest-palindromic-substring"],
    [139, "Word Break", "Medium", "word-break"],
    [72, "Edit Distance", "Medium", "edit-distance"],
    [32, "Longest Valid Parentheses", "Hard", "longest-valid-parentheses"],
  ]),
];

export const allProblems = patterns.flatMap((pattern) =>
  pattern.problems.map((problem) => ({ ...problem, patternName: pattern.name })),
);

export const totalProblems = allProblems.length;
