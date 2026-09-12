"use client";

import { useCallback, useState } from "react";
import usePartySocket from "partysocket/react";
import { CHESS_PARTY_HOST, CHESS_ROOM } from "@/lib/chess-config";

export type ChessView = {
  type: "sync";
  fen: string;
  turn: "w" | "b";
  moveCount: number;
  gameOver: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
};

export function useChessRoom() {
  const [view, setView] = useState<ChessView | null>(null);
  const [error, setError] = useState<string | null>(null);

  const socket = usePartySocket({
    host: CHESS_PARTY_HOST,
    room: CHESS_ROOM,
    onMessage(event: MessageEvent<string>) {
      const msg = JSON.parse(event.data);
      if (msg.type === "sync") {
        setView(msg);
        setError(null);
      }
      if (msg.type === "error") {
        setError(msg.message);
      }
    },
  });

  const move = useCallback(
    (from: string, to: string, promotion?: string) => {
      socket.send(JSON.stringify({ type: "move", from, to, promotion }));
    },
    [socket]
  );

  const reset = useCallback(() => {
    socket.send(JSON.stringify({ type: "reset" }));
  }, [socket]);

  return { view, error, move, reset };
}
