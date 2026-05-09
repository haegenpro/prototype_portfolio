export interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

export type Grid = Cell[][];

export type SolveActionType = "reveal" | "flag" | "highlight";
export interface SolveAction {
  type: SolveActionType;
  row: number;
  col: number;
}

export interface BoardDef {
  rows: number;
  cols: number;
  mines: Array<[number, number]>;
  startRow: number;
  startCol: number;
}

export function buildGrid(def: BoardDef): Grid {
  const mineSet = new Set(def.mines.map(([r, c]) => `${r},${c}`));
  const grid: Grid = Array.from({ length: def.rows }, (_, r) =>
    Array.from({ length: def.cols }, (_, c) => {
      const isMine = mineSet.has(`${r},${c}`);
      let adjacentMines = 0;
      if (!isMine) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < def.rows && nc >= 0 && nc < def.cols) {
              if (mineSet.has(`${nr},${nc}`)) adjacentMines++;
            }
          }
        }
      }
      return { row: r, col: c, isMine, isRevealed: false, isFlagged: false, adjacentMines };
    })
  );
  return grid;
}

function neighbors(grid: Grid, row: number, col: number): Cell[] {
  const rows = grid.length;
  const cols = grid[0].length;
  const result: Cell[] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        result.push(grid[nr][nc]);
      }
    }
  }
  return result;
}

function floodReveal(
  grid: Grid,
  row: number,
  col: number,
  actions: SolveAction[]
): void {
  const cell = grid[row][col];
  if (cell.isRevealed || cell.isFlagged || cell.isMine) return;
  cell.isRevealed = true;
  actions.push({ type: "reveal", row, col });
  if (cell.adjacentMines === 0) {
    for (const n of neighbors(grid, row, col)) {
      if (!n.isRevealed && !n.isFlagged) {
        floodReveal(grid, n.row, n.col, actions);
      }
    }
  }
}

export function buildSolveSequence(def: BoardDef): SolveAction[] {
  const grid = buildGrid(def);
  const actions: SolveAction[] = [];

  // Initial reveal at start cell
  floodReveal(grid, def.startRow, def.startCol, actions);

  let progress = true;
  let safetyLimit = 0;

  while (progress && safetyLimit < 500) {
    safetyLimit++;
    progress = false;

    for (let r = 0; r < def.rows; r++) {
      for (let c = 0; c < def.cols; c++) {
        const cell = grid[r][c];
        if (!cell.isRevealed || cell.adjacentMines === 0) continue;

        const nbrs = neighbors(grid, r, c);
        const flagged = nbrs.filter((n) => n.isFlagged);
        const unrevealed = nbrs.filter((n) => !n.isRevealed && !n.isFlagged);
        const remaining = cell.adjacentMines - flagged.length;

        if (remaining === 0 && unrevealed.length > 0) {
          // All mines accounted for — reveal the rest
          for (const n of unrevealed) {
            floodReveal(grid, n.row, n.col, actions);
          }
          progress = true;
        } else if (remaining === unrevealed.length && remaining > 0) {
          // All unrevealed must be mines — flag them
          for (const n of unrevealed) {
            if (!n.isFlagged) {
              n.isFlagged = true;
              actions.push({ type: "flag", row: n.row, col: n.col });
              progress = true;
            }
          }
        }
      }
    }

    // Subset constraint (1-1 pattern)
    if (!progress) {
      for (let r = 0; r < def.rows; r++) {
        for (let c = 0; c < def.cols; c++) {
          const cellA = grid[r][c];
          if (!cellA.isRevealed || cellA.adjacentMines === 0) continue;

          const nbrsA = neighbors(grid, r, c);
          const flaggedA = nbrsA.filter((n) => n.isFlagged).length;
          const unrevA = nbrsA.filter((n) => !n.isRevealed && !n.isFlagged);
          const remainA = cellA.adjacentMines - flaggedA;

          for (const cellB of nbrsA.filter((n) => n.isRevealed && n.adjacentMines > 0)) {
            const nbrsB = neighbors(grid, cellB.row, cellB.col);
            const flaggedB = nbrsB.filter((n) => n.isFlagged).length;
            const unrevB = nbrsB.filter((n) => !n.isRevealed && !n.isFlagged);
            const remainB = cellB.adjacentMines - flaggedB;

            const setA = new Set(unrevA.map((n) => `${n.row},${n.col}`));
            const setB = new Set(unrevB.map((n) => `${n.row},${n.col}`));
            // If A ⊂ B and remainA == remainB: cells in B \ A are safe
            const aSubB = unrevA.every((n) => setB.has(`${n.row},${n.col}`));
            if (aSubB && remainA === remainB && unrevA.length < unrevB.length) {
              const diff = unrevB.filter((n) => !setA.has(`${n.row},${n.col}`));
              for (const n of diff) {
                floodReveal(grid, n.row, n.col, actions);
                progress = true;
              }
            }
            // If B ⊂ A and remainB == remainA: cells in A \ B are safe
            const bSubA = unrevB.every((n) => setA.has(`${n.row},${n.col}`));
            if (bSubA && remainB === remainA && unrevB.length < unrevA.length) {
              const diff = unrevA.filter((n) => !setB.has(`${n.row},${n.col}`));
              for (const n of diff) {
                floodReveal(grid, n.row, n.col, actions);
                progress = true;
              }
            }
          }
        }
      }
    }

    // When constraint solving is stuck, use oracle: reveal a guaranteed-safe unrevealed cell
    if (!progress) {
      let picked = false;
      outer: for (let r = 0; r < def.rows; r++) {
        for (let c = 0; c < def.cols; c++) {
          const cell = grid[r][c];
          if (!cell.isRevealed && !cell.isFlagged && !cell.isMine) {
            floodReveal(grid, r, c, actions);
            progress = true;
            picked = true;
            break outer;
          }
        }
      }
      if (!picked) break;
    }
  }

  return actions;
}
