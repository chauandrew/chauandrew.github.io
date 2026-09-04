"use client";

import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useChessRoom } from "./useChessRoom";

const START_FEN = new Chess().fen();

export default function ChessBoardImpl() {
  const { view, error, move, reset } = useChessRoom();

  const frozen = view === null || view.gameOver;

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

  return (
    <section>
      <h2 className="mb-5 text-xs tracking-wider text-muted uppercase">
        Live Chess
      </h2>
      <p className="mb-4 max-w-[52ch] text-[0.92rem] text-muted">
        One shared board, played one move at a time by whoever visits. Take a
        turn.
      </p>
      <div className="max-w-[420px]">
        <Chessboard
          options={{
            position: view?.fen ?? START_FEN,
            allowDragging: !frozen,
            onPieceDrop: ({ sourceSquare, targetSquare }) => {
              if (frozen || !targetSquare || !view) return false;
              const check = new Chess(view.fen);
              try {
                check.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
              } catch {
                return false;
              }
              move(sourceSquare, targetSquare, "q");
              return true;
            },
          }}
        />
        <div className="mt-3 flex items-center justify-between text-sm text-muted">
          <span>{statusText}</span>
          {view?.gameOver && (
            <button
              onClick={reset}
              className="rounded-full border border-accent px-3 py-1 text-accent"
            >
              New game
            </button>
          )}
        </div>
        {error && <p className="mt-2 text-[0.8rem] text-muted">{error}</p>}
      </div>
    </section>
  );
}
