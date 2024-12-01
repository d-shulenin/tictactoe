import { CreateGamePayload, DEFAULT_GRID, GameStatus } from "./model";
import { GameRepository } from "./repositories/IGameRepository";
import { PrismaGameRepository } from "./repositories/PrismaGameRepository";

class GameService {
  constructor(private gameRepository: GameRepository) {}

  getAllByStatus(status: GameStatus) {
    return this.gameRepository.getAllByStatus(status);
  }

  create(name: string) {
    const payload: CreateGamePayload = {
      name,
      hostId: "1", //TODO: get hostId from userService
      status: GameStatus.IDLE,
      grid: DEFAULT_GRID,
    };

    return this.gameRepository.create(payload);
  }
}

export const gameService = new GameService(new PrismaGameRepository());
