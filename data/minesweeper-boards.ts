import type { BoardDef } from "@/lib/minesweeper-solver";

export interface BoardPreset {
  id: string;
  label: string;
  difficulty: "Beginner" | "Intermediate" | "Expert";
  def: BoardDef;
}

export const boardPresets: BoardPreset[] = [
  {
    id: "beginner",
    label: "Beginner",
    difficulty: "Beginner",
    def: {
      rows: 9,
      cols: 9,
      mines: [
        [0, 5],
        [1, 8],
        [2, 3],
        [3, 6],
        [4, 0],
        [4, 7],
        [5, 4],
        [6, 1],
        [7, 6],
        [8, 3],
      ],
      startRow: 0,
      startCol: 0,
    },
  },
  {
    id: "intermediate",
    label: "Intermediate",
    difficulty: "Intermediate",
    def: {
      rows: 9,
      cols: 9,
      mines: [
        [0, 3],
        [0, 7],
        [1, 5],
        [2, 0],
        [2, 8],
        [3, 4],
        [4, 2],
        [4, 6],
        [5, 0],
        [5, 8],
        [6, 3],
        [6, 7],
        [7, 1],
        [8, 5],
        [8, 8],
      ],
      startRow: 0,
      startCol: 0,
    },
  },
  {
    id: "expert",
    label: "Expert",
    difficulty: "Expert",
    def: {
      rows: 9,
      cols: 9,
      mines: [
        [0, 2],
        [0, 6],
        [1, 0],
        [1, 4],
        [1, 8],
        [2, 3],
        [2, 7],
        [3, 1],
        [3, 5],
        [4, 0],
        [4, 4],
        [4, 8],
        [5, 2],
        [5, 6],
        [6, 0],
        [6, 4],
        [6, 8],
        [7, 3],
        [7, 7],
        [8, 1],
      ],
      startRow: 0,
      startCol: 0,
    },
  },
];
