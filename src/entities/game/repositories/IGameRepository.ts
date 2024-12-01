import { CreateGamePayload, Game, GameIdle, GameStatus } from "../model";

export interface GameRepository {
  getAllByStatus: (status: GameStatus) => Promise<Game[]>;
  create: (payload: CreateGamePayload) => Promise<GameIdle>;
}
