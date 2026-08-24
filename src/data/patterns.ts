export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
}

export interface Pattern {
  id: string;
  name: string;
  blurb: string;
  problems: Problem[];
}

const p = (id: string, title: string, difficulty: Difficulty): Problem => ({
  id,
  title,
  difficulty,
});

export const patterns: Pattern[] = [
  {
    id: "arrays",
    name: "Arrays",
    blurb: "Traversal, in-place tricks and index math.",
    problems: [
      p("arr-1", "Two Sum", "Easy"),
      p("arr-2", "Best Time to Buy and Sell Stock", "Easy"),
      p("arr-3", "Remove Duplicates from Sorted Array", "Easy"),
      p("arr-4", "Rotate Array", "Medium"),
      p("arr-5", "Product of Array Except Self", "Medium"),
      p("arr-6", "First Missing Positive", "Hard"),
    ],
  },
  {
    id: "prefix-sum",
    name: "Prefix Sum",
    blurb: "Cumulative sums for O(1) range queries.",
    problems: [
      p("ps-1", "Running Sum of 1d Array", "Easy"),
      p("ps-2", "Find Pivot Index", "Easy"),
      p("ps-3", "Subarray Sum Equals K", "Medium"),
      p("ps-4", "Range Sum Query 2D - Immutable", "Medium"),
      p("ps-5", "Contiguous Array", "Medium"),
      p("ps-6", "Count of Range Sum", "Hard"),
    ],
  },
  {
    id: "hashing",
    name: "Hashing",
    blurb: "Maps and sets for O(1) lookups.",
    problems: [
      p("hs-1", "Contains Duplicate", "Easy"),
      p("hs-2", "Valid Anagram", "Easy"),
      p("hs-3", "Group Anagrams", "Medium"),
      p("hs-4", "Top K Frequent Elements", "Medium"),
      p("hs-5", "Longest Consecutive Sequence", "Medium"),
      p("hs-6", "Substring with Concatenation of All Words", "Hard"),
    ],
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    blurb: "Converging or parallel scans on sorted data.",
    problems: [
      p("tp-1", "Valid Palindrome", "Easy"),
      p("tp-2", "Merge Sorted Array", "Easy"),
      p("tp-3", "Two Sum II - Input Array Is Sorted", "Medium"),
      p("tp-4", "3Sum", "Medium"),
      p("tp-5", "Container With Most Water", "Medium"),
      p("tp-6", "Trapping Rain Water", "Hard"),
    ],
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    blurb: "Dynamic windows over sequences.",
    problems: [
      p("sw-1", "Maximum Average Subarray I", "Easy"),
      p("sw-2", "Longest Substring Without Repeating Characters", "Medium"),
      p("sw-3", "Longest Repeating Character Replacement", "Medium"),
      p("sw-4", "Permutation in String", "Medium"),
      p("sw-5", "Minimum Size Subarray Sum", "Medium"),
      p("sw-6", "Minimum Window Substring", "Hard"),
    ],
  },
  {
    id: "binary-search",
    name: "Binary Search",
    blurb: "Halving the search space, including on answers.",
    problems: [
      p("bs-1", "Binary Search", "Easy"),
      p("bs-2", "Search Insert Position", "Easy"),
      p("bs-3", "Find Minimum in Rotated Sorted Array", "Medium"),
      p("bs-4", "Search in Rotated Sorted Array", "Medium"),
      p("bs-5", "Koko Eating Bananas", "Medium"),
      p("bs-6", "Median of Two Sorted Arrays", "Hard"),
    ],
  },
  {
    id: "sorting",
    name: "Sorting",
    blurb: "Comparison sorts, custom comparators, bucketing.",
    problems: [
      p("so-1", "Sort Colors", "Medium"),
      p("so-2", "Merge Intervals", "Medium"),
      p("so-3", "Insert Interval", "Medium"),
      p("so-4", "Largest Number", "Medium"),
      p("so-5", "Sort an Array", "Medium"),
      p("so-6", "Maximum Gap", "Hard"),
    ],
  },
  {
    id: "kadane",
    name: "Kadane",
    blurb: "Running optimum for maximum subarray problems.",
    problems: [
      p("kd-1", "Maximum Subarray", "Medium"),
      p("kd-2", "Maximum Product Subarray", "Medium"),
      p("kd-3", "Maximum Sum Circular Subarray", "Medium"),
      p("kd-4", "Best Time to Buy and Sell Stock II", "Medium"),
      p("kd-5", "Maximum Absolute Sum of Any Subarray", "Medium"),
      p("kd-6", "K-Concatenation Maximum Sum", "Hard"),
    ],
  },
  {
    id: "matrix",
    name: "Matrix",
    blurb: "2D traversal, rotation and boundary walks.",
    problems: [
      p("mx-1", "Transpose Matrix", "Easy"),
      p("mx-2", "Spiral Matrix", "Medium"),
      p("mx-3", "Rotate Image", "Medium"),
      p("mx-4", "Set Matrix Zeroes", "Medium"),
      p("mx-5", "Search a 2D Matrix", "Medium"),
      p("mx-6", "Number of Islands", "Medium"),
    ],
  },
  {
    id: "monotonic-stack",
    name: "Monotonic Stack",
    blurb: "Next greater / smaller element in linear time.",
    problems: [
      p("ms-1", "Next Greater Element I", "Easy"),
      p("ms-2", "Daily Temperatures", "Medium"),
      p("ms-3", "Online Stock Span", "Medium"),
      p("ms-4", "Remove K Digits", "Medium"),
      p("ms-5", "Largest Rectangle in Histogram", "Hard"),
      p("ms-6", "Maximal Rectangle", "Hard"),
    ],
  },
  {
    id: "heap",
    name: "Heap",
    blurb: "Priority queues for top-k and streaming order.",
    problems: [
      p("hp-1", "Last Stone Weight", "Easy"),
      p("hp-2", "Kth Largest Element in an Array", "Medium"),
      p("hp-3", "K Closest Points to Origin", "Medium"),
      p("hp-4", "Task Scheduler", "Medium"),
      p("hp-5", "Find Median from Data Stream", "Hard"),
      p("hp-6", "Merge k Sorted Lists", "Hard"),
    ],
  },
  {
    id: "greedy",
    name: "Greedy",
    blurb: "Locally optimal choices that stay optimal.",
    problems: [
      p("gr-1", "Assign Cookies", "Easy"),
      p("gr-2", "Jump Game", "Medium"),
      p("gr-3", "Jump Game II", "Medium"),
      p("gr-4", "Gas Station", "Medium"),
      p("gr-5", "Partition Labels", "Medium"),
      p("gr-6", "Candy", "Hard"),
    ],
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    blurb: "Overlapping subproblems and optimal substructure.",
    problems: [
      p("dp-1", "Climbing Stairs", "Easy"),
      p("dp-2", "House Robber", "Medium"),
      p("dp-3", "Coin Change", "Medium"),
      p("dp-4", "Longest Increasing Subsequence", "Medium"),
      p("dp-5", "Unique Paths", "Medium"),
      p("dp-6", "Edit Distance", "Medium"),
      p("dp-7", "Longest Valid Parentheses", "Hard"),
    ],
  },
];

export const allProblems = patterns.flatMap((pattern) =>
  pattern.problems.map((problem) => ({ ...problem, patternId: pattern.id, patternName: pattern.name })),
);

export const totalProblems = allProblems.length;
