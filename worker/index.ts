/// <reference types="@cloudflare/workers-types" />
import { Server, routePartykitRequest, type Connection, type WSMessage } from "partyserver";
import { Chess } from "chess.js";

interface Env {
  Main: DurableObjectNamespace<ChessServer>;
}

const STORAGE_KEY = "fen";

type ClientMessage =
  | { type: "move"; from: string; to: string; promotion?: string }
  | { type: "reset" };

export class ChessServer extends Server<Env> {
  chess = new Chess();

  async onStart() {
    const savedFen = await this.ctx.storage.get<string>(STORAGE_KEY);
    if (savedFen) this.chess.load(savedFen);
  }

  onConnect(conn: Connection) {
    conn.send(JSON.stringify(this.view()));
  }

  async onMessage(sender: Connection, raw: WSMessage) {
    if (typeof raw !== "string") return;

    let msg: ClientMessage;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }

    if (msg.type === "move") {
      try {
        this.chess.move({
          from: msg.from,
          to: msg.to,
          promotion: msg.promotion ?? "q",
        });
      } catch {
        sender.send(JSON.stringify({ type: "error", message: "Illegal move" }));
        return;
      }
      await this.ctx.storage.put(STORAGE_KEY, this.chess.fen());
      this.broadcast(JSON.stringify(this.view()));
      return;
    }

    if (msg.type === "reset") {
      if (!this.chess.isGameOver()) {
        sender.send(
          JSON.stringify({ type: "error", message: "Game still in progress" })
        );
        return;
      }
      this.chess = new Chess();
      await this.ctx.storage.put(STORAGE_KEY, this.chess.fen());
      this.broadcast(JSON.stringify(this.view()));
    }
  }

  private view() {
    return {
      type: "sync" as const,
      fen: this.chess.fen(),
      turn: this.chess.turn(),
      gameOver: this.chess.isGameOver(),
      isCheckmate: this.chess.isCheckmate(),
      isStalemate: this.chess.isStalemate(),
      isDraw: this.chess.isDraw(),
    };
  }
}

const worker = {
  async fetch(request: Request, env: Env) {
    return (
      (await routePartykitRequest(request, env)) ??
      new Response("Not found", { status: 404 })
    );
  },
};

export default worker;
