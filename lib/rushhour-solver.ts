export type Direction = "H" | "V";

export interface Car {
  id: string;
  row: number;
  col: number;
  length: 2 | 3;
  dir: Direction;
}

export type Board = Car[];

export interface Move {
  carId: string;
  row: number;
  col: number;
}

export interface SolveResult {
  moves: Move[];
  statesExplored: number;
}

function serializeBoard(board: Board): string {
  return board
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((c) => `${c.id}${c.row}${c.col}`)
    .join("|");
}

function buildGrid(board: Board): Set<string> {
  const occupied = new Set<string>();
  for (const car of board) {
    for (let i = 0; i < car.length; i++) {
      const r = car.dir === "V" ? car.row + i : car.row;
      const c = car.dir === "H" ? car.col + i : car.col;
      occupied.add(`${r},${c}`);
    }
  }
  return occupied;
}

function getCarCells(car: Car): Array<[number, number]> {
  const cells: Array<[number, number]> = [];
  for (let i = 0; i < car.length; i++) {
    const r = car.dir === "V" ? car.row + i : car.row;
    const c = car.dir === "H" ? car.col + i : car.col;
    cells.push([r, c]);
  }
  return cells;
}

function heuristic(board: Board): number {
  const target = board.find((c) => c.id === "X")!;
  const occupied = buildGrid(board);
  // Remove X's own cells from occupied for the blocking check
  for (let i = 0; i < target.length; i++) {
    occupied.delete(`${target.row},${target.col + i}`);
  }
  let blockers = 0;
  for (let c = target.col + target.length; c < 6; c++) {
    if (occupied.has(`${target.row},${c}`)) blockers++;
  }
  return blockers;
}

function getMoves(board: Board): Array<{ board: Board; move: Move }> {
  const occupied = buildGrid(board);
  const results: Array<{ board: Board; move: Move }> = [];

  for (const car of board) {
    const cells = getCarCells(car);

    if (car.dir === "H") {
      // Try sliding left
      for (let delta = -1; delta >= -(car.col); delta--) {
        const newCol = car.col + delta;
        const checkCell = `${car.row},${newCol}`;
        if (occupied.has(checkCell) && !cells.some(([r, c]) => r === car.row && c === newCol)) break;
        if (!occupied.has(checkCell) || cells.some(([r, c]) => r === car.row && c === newCol)) {
          const newBoard = board.map((c2) =>
            c2.id === car.id ? { ...c2, col: newCol } : c2
          );
          results.push({ board: newBoard, move: { carId: car.id, row: car.row, col: newCol } });
        } else {
          break;
        }
      }
      // Try sliding right
      for (let delta = 1; delta < 6 - (car.col + car.length - 1); delta++) {
        const newCol = car.col + delta;
        const checkCell = `${car.row},${newCol + car.length - 1}`;
        if (occupied.has(checkCell) && !cells.some(([r, c]) => r === car.row && c === newCol + car.length - 1)) break;
        if (!occupied.has(checkCell) || cells.some(([r, c]) => r === car.row && c === newCol + car.length - 1)) {
          const newBoard = board.map((c2) =>
            c2.id === car.id ? { ...c2, col: newCol } : c2
          );
          results.push({ board: newBoard, move: { carId: car.id, row: car.row, col: newCol } });
        } else {
          break;
        }
      }
    } else {
      // Try sliding up
      for (let delta = -1; delta >= -(car.row); delta--) {
        const newRow = car.row + delta;
        const checkCell = `${newRow},${car.col}`;
        if (occupied.has(checkCell) && !cells.some(([r, c]) => r === newRow && c === car.col)) break;
        if (!occupied.has(checkCell) || cells.some(([r, c]) => r === newRow && c === car.col)) {
          const newBoard = board.map((c2) =>
            c2.id === car.id ? { ...c2, row: newRow } : c2
          );
          results.push({ board: newBoard, move: { carId: car.id, row: newRow, col: car.col } });
        } else {
          break;
        }
      }
      // Try sliding down
      for (let delta = 1; delta < 6 - (car.row + car.length - 1); delta++) {
        const newRow = car.row + delta;
        const checkCell = `${newRow + car.length - 1},${car.col}`;
        if (occupied.has(checkCell) && !cells.some(([r, c]) => r === newRow + car.length - 1 && c === car.col)) break;
        if (!occupied.has(checkCell) || cells.some(([r, c]) => r === newRow + car.length - 1 && c === car.col)) {
          const newBoard = board.map((c2) =>
            c2.id === car.id ? { ...c2, row: newRow } : c2
          );
          results.push({ board: newBoard, move: { carId: car.id, row: newRow, col: car.col } });
        } else {
          break;
        }
      }
    }
  }

  return results;
}

function isGoal(board: Board): boolean {
  const target = board.find((c) => c.id === "X")!;
  return target.col + target.length === 6;
}

export function solve(initialBoard: Board): SolveResult {
  type Node = {
    board: Board;
    moves: Move[];
    g: number;
    f: number;
  };

  const startH = heuristic(initialBoard);
  const openList: Node[] = [{ board: initialBoard, moves: [], g: 0, f: startH }];
  const visited = new Set<string>();
  visited.add(serializeBoard(initialBoard));
  let statesExplored = 0;

  while (openList.length > 0) {
    // Find node with minimum f
    let minIdx = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[minIdx].f) minIdx = i;
    }
    const current = openList.splice(minIdx, 1)[0];
    statesExplored++;

    if (isGoal(current.board)) {
      return { moves: current.moves, statesExplored };
    }

    for (const { board: nextBoard, move } of getMoves(current.board)) {
      const key = serializeBoard(nextBoard);
      if (visited.has(key)) continue;
      visited.add(key);
      const g = current.g + 1;
      const h = heuristic(nextBoard);
      openList.push({
        board: nextBoard,
        moves: [...current.moves, move],
        g,
        f: g + h,
      });
    }

    // Safety cap to avoid browser hang on malformed puzzles
    if (statesExplored > 50000) break;
  }

  return { moves: [], statesExplored };
}
