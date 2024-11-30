import { CreateGamePayload, GameStatus } from "./model";
import { GameRepository } from "./repositories/IGameRepository";
import { PrismaGameRepository } from "./repositories/PrismaGameRepository";

class GameService {
  constructor(private gameRepository: GameRepository) {}

  getAllByStatus(status: GameStatus) {
    return this.gameRepository.getAllByStatus(status);
  }

  create(payload: CreateGamePayload) {
    return this.gameRepository.create(payload);
  }
}

export const gameService = new GameService(new PrismaGameRepository());
