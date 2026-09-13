"use client";

import { useState } from "react";
import { Chess, type Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useChessRoom } from "./useChessRoom";

const START_FEN = new Chess().fen();

function isSquare(value: string): value is Square {
  return /^[a-h][1-8]$/.test(value);
}

function legalTargetsFrom(fen: string, square: string): string[] {
  if (!isSquare(square)) return [];
  const check = new Chess(fen);
  return check.moves({ square, verbose: true }).map((m) => m.to);
}

export default function ChessBoardImpl() {
  const { view, error, move, reset } = useChessRoom();
  const [selected, setSelected] = useState<string | null>(null);
  const [targets, setTargets] = useState<string[]>([]);
  const [selectedForFen, setSelectedForFen] = useState<string | undefined>(undefined);

  const frozen = view === null || view.gameOver;

  // The position only ever changes via a server broadcast, so any local
  // selection is stale the instant that happens (a move landed, whether
  // ours or someone else's). Clear it during render rather than in an
  // effect, so there's no extra render showing stale dots first.
  if (view?.fen !== selectedForFen) {
    setSelectedForFen(view?.fen);
    if (selected !== null) setSelected(null);
    if (targets.length > 0) setTargets([]);
  }

  function selectSquare(square: string) {
    if (!view) return;
    const legal = legalTargetsFrom(view.fen, square);
    if (legal.length > 0) {
      setSelected(square);
      setTargets(legal);
    } else {
      setSelected(null);
      setTargets([]);
    }
  }

  function attemptMove(from: string, to: string) {
    if (!view) return false;
    const check = new Chess(view.fen);
    try {
      check.move({ from, to, promotion: "q" });
    } catch {
      return false;
    }
    move(from, to, "q");
    setSelected(null);
    setTargets([]);
    return true;
  }

  let statusText = "Connecting…";
  if (view) {
    if (view.isCheckmate) {
      statusText = `Checkmate. ${view.turn === "w" ? "Black" : "White"} wins.`;
    } else if (view.isStalemate) {
      statusText = "Stalemate. Draw.";
    } else if (view.isDraw) {
      statusText = "Draw.";
    } else {
      statusText = view.turn === "w" ? "White to move" : "Black to move";
    }
  }

  const canReset = view !== null && (view.gameOver || view.moveCount >= 10);

  const squareStyles: Record<string, React.CSSProperties> = {};
  if (selected) {
    squareStyles[selected] = {
      backgroundColor: "color-mix(in srgb, var(--accent) 25%, transparent)",
    };
  }
  for (const square of targets) {
    squareStyles[square] = {
      ...squareStyles[square],
      backgroundImage:
        "radial-gradient(circle, color-mix(in srgb, var(--accent) 45%, transparent) 22%, transparent 26%)",
    };
  }

  return (
    <section>
      <h2 className="mb-4 text-xs tracking-wider text-muted uppercase">
        Live Chess: {statusText}
      </h2>
      <div className="max-w-[420px]">
        <div className="overflow-hidden rounded-sm border border-border">
          <Chessboard
            options={{
              position: view?.fen ?? START_FEN,
              allowDragging: !frozen,
              squareStyles,
              lightSquareStyle: { backgroundColor: "var(--board-light)" },
              darkSquareStyle: { backgroundColor: "var(--board-dark)" },
              alphaNotationStyle: { color: "var(--muted)" },
              numericNotationStyle: { color: "var(--muted)" },
              onPieceDrag: ({ square }) => {
                if (!frozen && square) selectSquare(square);
              },
              onSquareClick: ({ square }) => {
                if (frozen) return;
                if (selected && targets.includes(square)) {
                  attemptMove(selected, square);
                } else {
                  selectSquare(square);
                }
              },
              onPieceDrop: ({ sourceSquare, targetSquare }) => {
                if (frozen || !targetSquare) return false;
                return attemptMove(sourceSquare, targetSquare);
              },
            }}
          />
        </div>
        {canReset && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={reset}
              className="rounded-full border border-accent px-3 py-1 text-sm text-accent"
            >
              Reset board
            </button>
          </div>
        )}
        {error && <p className="mt-2 text-[0.8rem] text-muted">{error}</p>}
      </div>
    </section>
  );
}
