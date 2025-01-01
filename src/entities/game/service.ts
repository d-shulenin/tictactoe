import { ApiError } from "@/shared/lib/errors";
import { SessionService } from "../session";
import { CreateGamePayload, DEFAULT_GRID, GameStatus } from "./model";
import { GameRepository } from "./repositories/IGameRepository";
import { PrismaGameRepository } from "./repositories/PrismaGameRepository";

class GameService {
  constructor(private gameRepository: GameRepository) {}

  getAllByStatus(status: GameStatus) {
    return this.gameRepository.getAllByStatus(status);
  }

  async create(name: string) {
    const { userId } = await SessionService.verifySession(); //FIXME: maybe store userId, not request it

    if (!userId) throw ApiError.UnauthorizedError();

    const payload: CreateGamePayload = {
      name,
      hostId: userId,
      status: GameStatus.IDLE,
      grid: DEFAULT_GRID,
    };

    return this.gameRepository.create(payload);
  }

  findById(id: string) {
    return this.gameRepository.findById(id);
  }
}

export const gameService = new GameService(new PrismaGameRepository());
