"use client";

import dynamic from "next/dynamic";

// react-chessboard measures its container's layout on mount and doesn't
// tolerate running during server-side rendering (no real DOM to measure),
// so this whole component tree is browser-only.
export const ChessSection = dynamic(() => import("./ChessBoardImpl"), {
  ssr: false,
});
