import type { Board } from "@/lib/rushhour-solver";

export interface Puzzle {
  id: string;
  difficulty: "Easy" | "Medium" | "Hard";
  label: string;
  board: Board;
}

export const puzzles: Puzzle[] = [
  {
    id: "easy",
    difficulty: "Easy",
    label: "Beginner",
    // X (target) at row 2, col 0, length 2, horizontal
    // Solution: ~6 moves
    board: [
      { id: "X", row: 2, col: 0, length: 2, dir: "H" },
      { id: "A", row: 0, col: 0, length: 2, dir: "H" },
      { id: "B", row: 0, col: 3, length: 2, dir: "V" },
      { id: "C", row: 2, col: 3, length: 2, dir: "V" },
      { id: "D", row: 4, col: 1, length: 2, dir: "H" },
      { id: "E", row: 3, col: 4, length: 2, dir: "H" },
    ],
  },
  {
    id: "medium",
    difficulty: "Medium",
    label: "Intermediate",
    // Classic medium puzzle, ~12 moves
    board: [
      { id: "X", row: 2, col: 1, length: 2, dir: "H" },
      { id: "A", row: 0, col: 0, length: 3, dir: "V" },
      { id: "B", row: 0, col: 2, length: 2, dir: "H" },
      { id: "C", row: 0, col: 4, length: 2, dir: "V" },
      { id: "D", row: 1, col: 3, length: 2, dir: "H" },
      { id: "E", row: 2, col: 3, length: 2, dir: "V" },
      { id: "F", row: 3, col: 0, length: 2, dir: "H" },
      { id: "G", row: 4, col: 2, length: 2, dir: "V" },
      { id: "H", row: 4, col: 4, length: 2, dir: "H" },
    ],
  },
  {
    id: "hard",
    difficulty: "Hard",
    label: "Expert",
    // Dense puzzle, ~20 moves
    board: [
      { id: "X", row: 2, col: 0, length: 2, dir: "H" },
      { id: "A", row: 0, col: 0, length: 2, dir: "V" },
      { id: "B", row: 0, col: 1, length: 3, dir: "H" },
      { id: "C", row: 0, col: 4, length: 3, dir: "V" },
      { id: "D", row: 1, col: 3, length: 2, dir: "V" },
      { id: "E", row: 2, col: 2, length: 2, dir: "V" },
      { id: "F", row: 3, col: 0, length: 3, dir: "H" },
      { id: "G", row: 3, col: 3, length: 2, dir: "H" },
      { id: "H", row: 4, col: 1, length: 2, dir: "V" },
      { id: "I", row: 4, col: 5, length: 2, dir: "V" },
      { id: "J", row: 5, col: 3, length: 2, dir: "H" },
    ],
  },
];
