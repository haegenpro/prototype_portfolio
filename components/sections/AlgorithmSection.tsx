"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { cn } from "@/lib/utils";
import { buildGrid, buildSolveSequence } from "@/lib/minesweeper-solver";
import { boardPresets } from "@/data/minesweeper-boards";
import type { Grid, SolveAction } from "@/lib/minesweeper-solver";
import type { BoardPreset } from "@/data/minesweeper-boards";
import { Play, Pause, SkipForward, RotateCcw, Cpu } from "lucide-react";

// ─── Number colors (classic Minesweeper palette) ──────────────────────────────
const NUM_COLORS = [
  "",
  "text-blue-400",
  "text-green-400",
  "text-red-400",
  "text-purple-400",
  "text-red-600",
  "text-cyan-400",
  "text-pink-400",
  "text-gray-400",
];

// ─── Grid component ───────────────────────────────────────────────────────────
function MinesweeperGrid({
  grid,
  highlightedCells,
  justFlaggedCells,
}: {
  grid: Grid;
  highlightedCells: Set<string>;
  justFlaggedCells: Set<string>;
}) {
  const CELL = 34;
  const GAP = 2;
  const rows = grid.length;
  const cols = grid[0].length;
  const W = cols * CELL + (cols - 1) * GAP;
  const H = rows * CELL + (rows - 1) * GAP;

  return (
    <div
      className="relative select-none mx-auto"
      style={{ width: W, height: H }}
    >
      {grid.map((row) =>
        row.map((cell) => {
          const key = `${cell.row},${cell.col}`;
          const left = cell.col * (CELL + GAP);
          const top = cell.row * (CELL + GAP);
          const isHighlighted = highlightedCells.has(key);
          const isJustFlagged = justFlaggedCells.has(key);

          return (
            <div
              key={key}
              className={cn(
                "absolute rounded flex items-center justify-center font-bold text-sm font-mono transition-all duration-200",
                cell.isRevealed
                  ? "bg-muted/60 border border-border/20"
                  : cell.isFlagged
                    ? cn(
                        "bg-red-500/20 border-2 border-red-400/60",
                        isJustFlagged && "scale-110 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                      )
                    : isHighlighted
                      ? "bg-primary/20 border-2 border-primary/50 scale-105"
                      : "bg-muted/80 border border-border/40 hover:bg-muted/60"
              )}
              style={{ left, top, width: CELL, height: CELL }}
            >
              {cell.isRevealed && cell.adjacentMines > 0 && (
                <span className={NUM_COLORS[cell.adjacentMines]}>
                  {cell.adjacentMines}
                </span>
              )}
              {cell.isFlagged && !cell.isRevealed && (
                <span className="text-red-400 text-base leading-none">🚩</span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
type SolveState = "idle" | "ready" | "playing" | "paused" | "done";

export function AlgorithmSection() {
  const [selectedPreset, setSelectedPreset] = useState<BoardPreset>(boardPresets[0]);
  const [grid, setGrid] = useState<Grid>(() => buildGrid(boardPresets[0].def));
  const [solveState, setSolveState] = useState<SolveState>("idle");
  const [actions, setActions] = useState<SolveAction[]>([]);
  const [actionIndex, setActionIndex] = useState(0);
  const [speed, setSpeed] = useState(80);
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());
  const [justFlaggedCells, setJustFlaggedCells] = useState<Set<string>>(new Set());
  const [minesFlagged, setMinesFlagged] = useState(0);
  const [cellsRevealed, setCellsRevealed] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gridHistoryRef = useRef<Grid[]>([]);
  const flagCountRef = useRef<number[]>([]);
  const revealCountRef = useRef<number[]>([]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleSolve = useCallback(() => {
    const solveActions = buildSolveSequence(selectedPreset.def);
    setActions(solveActions);
    setActionIndex(0);

    // Build grid history frame by frame
    const initialGrid = buildGrid(selectedPreset.def);
    const history: Grid[] = [JSON.parse(JSON.stringify(initialGrid))];
    const flags: number[] = [0];
    const reveals: number[] = [0];
    let currentGrid = JSON.parse(JSON.stringify(initialGrid)) as Grid;
    let flagCount = 0;
    let revealCount = 0;

    for (const action of solveActions) {
      currentGrid = JSON.parse(JSON.stringify(currentGrid)) as Grid;
      if (action.type === "reveal") {
        currentGrid[action.row][action.col].isRevealed = true;
        revealCount++;
      } else if (action.type === "flag") {
        currentGrid[action.row][action.col].isFlagged = true;
        flagCount++;
      }
      history.push(JSON.parse(JSON.stringify(currentGrid)));
      flags.push(flagCount);
      reveals.push(revealCount);
    }

    gridHistoryRef.current = history;
    flagCountRef.current = flags;
    revealCountRef.current = reveals;

    setGrid(initialGrid);
    setHighlightedCells(new Set());
    setJustFlaggedCells(new Set());
    setMinesFlagged(0);
    setCellsRevealed(0);
    setSolveState("ready");
  }, [selectedPreset]);

  const step = useCallback(
    (idx: number, actionList: SolveAction[]) => {
      if (idx >= actionList.length) {
        setSolveState("done");
        return;
      }
      const action = actionList[idx];
      const nextGrid = gridHistoryRef.current[idx + 1];
      if (!nextGrid) return;

      setGrid(nextGrid);
      setMinesFlagged(flagCountRef.current[idx + 1] ?? 0);
      setCellsRevealed(revealCountRef.current[idx + 1] ?? 0);
      setActionIndex(idx + 1);

      if (action.type === "flag") {
        const key = `${action.row},${action.col}`;
        setJustFlaggedCells(new Set([key]));
        setHighlightedCells(new Set());
        setTimeout(() => setJustFlaggedCells(new Set()), 400);
      } else {
        setHighlightedCells(new Set([`${action.row},${action.col}`]));
        setJustFlaggedCells(new Set());
        setTimeout(() => setHighlightedCells(new Set()), 200);
      }
    },
    []
  );

  const scheduleNext = useCallback(
    (idx: number, actionList: SolveAction[]) => {
      if (idx >= actionList.length) {
        setSolveState("done");
        return;
      }
      step(idx, actionList);
      timerRef.current = setTimeout(() => {
        scheduleNext(idx + 1, actionList);
      }, speed);
    },
    [step, speed]
  );

  const handlePlay = useCallback(() => {
    setSolveState("playing");
    scheduleNext(actionIndex, actions);
  }, [actionIndex, actions, scheduleNext]);

  const handlePause = useCallback(() => {
    clearTimer();
    setSolveState("paused");
  }, [clearTimer]);

  const handleStep = useCallback(() => {
    clearTimer();
    step(actionIndex, actions);
    if (actionIndex + 1 >= actions.length) {
      setSolveState("done");
    } else {
      setSolveState("paused");
    }
  }, [clearTimer, step, actionIndex, actions]);

  const handleReset = useCallback(() => {
    clearTimer();
    setGrid(buildGrid(selectedPreset.def));
    setActions([]);
    setActionIndex(0);
    setMinesFlagged(0);
    setCellsRevealed(0);
    setHighlightedCells(new Set());
    setJustFlaggedCells(new Set());
    setSolveState("idle");
    gridHistoryRef.current = [];
  }, [clearTimer, selectedPreset]);

  const handleSelectPreset = useCallback(
    (preset: BoardPreset) => {
      clearTimer();
      setSelectedPreset(preset);
      setGrid(buildGrid(preset.def));
      setActions([]);
      setActionIndex(0);
      setMinesFlagged(0);
      setCellsRevealed(0);
      setHighlightedCells(new Set());
      setJustFlaggedCells(new Set());
      setSolveState("idle");
      gridHistoryRef.current = [];
    },
    [clearTimer]
  );

  useEffect(() => () => clearTimer(), [clearTimer]);

  const isPlaying = solveState === "playing";
  const isDone = solveState === "done";
  const hasActions = actions.length > 0;
  const canPlay = hasActions && (solveState === "ready" || solveState === "paused") && !isDone;
  const canStep = hasActions && !isPlaying && actionIndex < actions.length;
  const totalMines = selectedPreset.def.mines.length;
  const totalSafe =
    selectedPreset.def.rows * selectedPreset.def.cols - totalMines;
  const progress = hasActions ? (actionIndex / actions.length) * 100 : 0;

  return (
    <section id="lab" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cpu className="w-6 h-6 text-accent" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text font-heading">
              Algorithm Lab
            </h2>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
            Watch an AI solve Minesweeper using constraint propagation and
            1&#8209;1 pattern recognition — the same logic behind my{" "}
            <span className="text-accent font-semibold">Minesweeper AI</span>{" "}
            project. Hit{" "}
            <span className="font-mono text-accent font-semibold">Solve</span>,
            then play through the solution.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <div className="glassmorphism border border-border/40 rounded-2xl p-6 md:p-10">
            <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
              {/* Grid */}
              <div className="flex-shrink-0">
                <MinesweeperGrid
                  grid={grid}
                  highlightedCells={highlightedCells}
                  justFlaggedCells={justFlaggedCells}
                />
              </div>

              {/* Controls */}
              <div className="flex flex-col gap-6 w-full max-w-xs">
                {/* Difficulty */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 font-semibold">
                    Board
                  </p>
                  <div className="flex gap-2">
                    {boardPresets.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPreset(p)}
                        className={cn(
                          "flex-1 text-xs py-2 px-2 rounded-lg border transition-all duration-200 font-medium",
                          selectedPreset.id === p.id
                            ? "bg-primary/20 border-primary/60 text-primary"
                            : "bg-muted/30 border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                        )}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="glassmorphism border border-border/30 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Algorithm</span>
                    <span className="font-mono text-accent font-semibold text-xs">
                      Constraint Propagation
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Patterns</span>
                    <span className="font-mono text-foreground text-xs">
                      Basic + 1&#8209;1 subset
                    </span>
                  </div>
                  <div className="h-px bg-border/30" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mines</span>
                    <span className="font-mono text-foreground">
                      {minesFlagged} / {totalMines}{" "}
                      <span className="text-red-400">🚩</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Safe revealed</span>
                    <span className="font-mono text-foreground">
                      {cellsRevealed} / {totalSafe}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Step</span>
                    <span className="font-mono text-foreground">
                      {hasActions ? `${actionIndex} / ${actions.length}` : "—"}
                    </span>
                  </div>
                </div>

                {/* Speed */}
                {hasActions && (
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span className="uppercase tracking-widest font-semibold">
                        Speed
                      </span>
                      <span className="font-mono">
                        {speed}ms/step
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={500}
                      step={10}
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                )}

                {/* Buttons */}
                <div className="space-y-3">
                  {!hasActions ? (
                    <button
                      onClick={handleSolve}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary/90 hover:bg-primary text-white font-semibold transition-all duration-200 soft-glow hover:scale-[1.02]"
                    >
                      <Cpu className="w-4 h-4" />
                      Solve with AI
                    </button>
                  ) : isDone ? (
                    <div className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold">
                      Board Cleared! 🎉
                    </div>
                  ) : isPlaying ? (
                    <button
                      onClick={handlePause}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent font-semibold transition-all duration-200"
                    >
                      <Pause className="w-4 h-4" />
                      Pause
                    </button>
                  ) : (
                    <button
                      onClick={handlePlay}
                      disabled={!canPlay}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary/90 hover:bg-primary text-white font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
                    >
                      <Play className="w-4 h-4" />
                      {solveState === "ready" ? "Play Solution" : "Resume"}
                    </button>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={handleStep}
                      disabled={!canStep}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-muted/40 hover:bg-muted/60 border border-border/40 text-foreground text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Step
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-muted/40 hover:bg-muted/60 border border-border/40 text-foreground text-sm font-medium transition-all duration-200"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                {hasActions && (
                  <div>
                    <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-border/20 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-muted/80 inline-block border border-border/40" />
                Unrevealed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-muted/60 inline-block border border-border/20" />
                Safe (revealed)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-500/20 inline-block border border-red-400/60" />
                Flagged mine 🚩
              </span>
              <span className="ml-auto font-mono opacity-60">
                Minesweeper · Constraint Propagation + 1-1 Pattern
              </span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
