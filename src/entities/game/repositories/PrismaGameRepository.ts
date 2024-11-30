//TODO: eslint sort imports
import { type GameRepository } from "./IGameRepository";
import { prisma } from "@/shared/lib/db";
import {
  type Game as PrismaGame,
  type User as PrismaUser,
} from "@prisma/client";
import { z, ZodType } from "zod";
import {
  CreateGamePayload,
  DEFAULT_GRID,
  type Game,
  type GameIdle,
  GameInProgress,
  GameOver,
  GameStatus,
  Symbol,
} from "../model";
import { type User } from "@/entities/user/@x/game";

//TODO: process validation failure, fx ErrorBoundary
const userSchema: ZodType<User> = z.object({
  id: z.string(),
  login: z.string(),
  passwordHash: z.string(),
});
const gridSchema = z.array(z.union([z.nativeEnum(Symbol), z.null()]));
//TODO: move to shared
const dateSchema = z.date();
const booleanSchema = z.boolean();

const mapDbGameToGame = (
  game: PrismaGame & { host: PrismaUser; guest: PrismaUser | null }
): Game => {
  const host = game.host;
  const { id, name, grid, isDraw, winnerId, startedAt, overAt, guest } = game;

  switch (game.status) {
    case "idle":
      return {
        id,
        name,
        host,
        status: GameStatus.IDLE,
        grid: gridSchema.parse(grid),
      } satisfies GameIdle;

    case "inProgress":
      return {
        id,
        name,
        host,
        status: GameStatus.IN_PROGRESS,
        guest: userSchema.parse(guest),
        startedAt: dateSchema.parse(startedAt),
        grid: gridSchema.parse(grid),
      } satisfies GameInProgress;

    case "over":
      return {
        id,
        name,
        winnerId,
        host,
        status: GameStatus.OVER,
        isDraw: booleanSchema.parse(isDraw),
        guest: userSchema.parse(game.guest),
        startedAt: dateSchema.parse(startedAt),
        overAt: dateSchema.parse(overAt),
        grid: gridSchema.parse(grid),
      } satisfies GameOver;
  }
};

export class PrismaGameRepository implements GameRepository {
  async getAllByStatus(status: GameStatus) {
    const allGames = await prisma.game.findMany({
      where: { status: { equals: status } },
      include: { host: true, guest: true },
    });

    return allGames.map(mapDbGameToGame);
  }

  async create({ name, hostId }: CreateGamePayload) {
    await prisma.game.create({
      data: {
        name,
        hostId,
        status: GameStatus.IDLE,
        grid: DEFAULT_GRID,
      },
    });
  }
}
