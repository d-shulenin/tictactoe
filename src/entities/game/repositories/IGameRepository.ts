import { CreateGamePayload, Game, GameStatus } from "../model";

export interface GameRepository {
  getAllByStatus: (status: GameStatus) => Promise<Game[]>;
  create: (paylaod: CreateGamePayload) => Promise<void>;
}
