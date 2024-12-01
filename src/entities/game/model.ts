import { User } from "../user/@x/game";

type UserId = User["id"];

enum Symbol {
  CROSS = "X",
  CIRCLE = "O",
}

type Cell = Symbol | null;

type Grid = Cell[];

const GRID_LENGTH = 9;
const DEFAULT_GRID: Grid = Array(GRID_LENGTH).fill(null);

enum GameStatus {
  IDLE = "idle",
  IN_PROGRESS = "inProgress",
  OVER = "over",
}

interface GameBase {
  id: string;
  name: string;
  host: User;
  grid: Grid;
  createdAt: Date;
}

interface GameIdle extends GameBase {
  status: GameStatus.IDLE;
}

interface GameInProgress extends GameBase {
  guest: User;
  status: GameStatus.IN_PROGRESS;
  startedAt: Date;
}

interface GameOver extends GameBase {
  guest: User;
  status: GameStatus.OVER;
  isDraw: boolean;
  winnerId: UserId | null;
  startedAt: Date;
  overAt: Date;
}

type Game = GameIdle | GameInProgress | GameOver;

interface CreateGamePayload
  extends Omit<GameIdle, "id" | "createdAt" | "host"> {
  hostId: UserId;
}

export {
  Symbol,
  DEFAULT_GRID,
  GameStatus,
  type GameIdle,
  type GameInProgress,
  type GameOver,
  type Game,
  type CreateGamePayload,
};
