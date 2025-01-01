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
  type Game,
  type GameIdle,
  GameInProgress,
  GameOver,
  GameStatus,
  Symbol,
} from "../model";
import { type User } from "@/entities/user/@x/game";
import { booleanSchema, dateSchema } from "@/shared/lib/validation";

//TODO: process validation failure, fx ErrorBoundary
const userSchema: ZodType<User> = z.object({
  id: z.string(),
  login: z.string(),
  passwordHash: z.string(),
});
const gridSchema = z.array(z.union([z.nativeEnum(Symbol), z.null()]));

//TODO: create mappers.ts
const mapDbGameToGameIdle = (
  game: PrismaGame & { host: PrismaUser }
): GameIdle => {
  const { id, name, createdAt, host, grid } = game;
  return {
    id,
    name,
    host,
    createdAt,
    status: GameStatus.IDLE,
    grid: gridSchema.parse(grid),
  };
};

const mapDbGameToGameInProgress = (
  game: PrismaGame & { host: PrismaUser; guest: PrismaUser | null }
): GameInProgress => {
  const { id, name, createdAt, host, grid, startedAt, guest } = game;
  return {
    id,
    name,
    host,
    createdAt,
    startedAt: dateSchema.parse(startedAt),
    guest: userSchema.parse(guest),
    grid: gridSchema.parse(grid),
    status: GameStatus.IN_PROGRESS,
  };
};

const mapDbGameToGameOver = (
  game: PrismaGame & { host: PrismaUser; guest: PrismaUser | null }
): GameOver => {
  const {
    id,
    name,
    createdAt,
    host,
    grid,
    startedAt,
    guest,
    isDraw,
    winnerId,
    overAt,
  } = game;

  return {
    id,
    name,
    host,
    createdAt,
    winnerId,
    isDraw: booleanSchema.parse(isDraw),
    startedAt: dateSchema.parse(startedAt),
    overAt: dateSchema.parse(overAt),
    guest: userSchema.parse(guest),
    grid: gridSchema.parse(grid),
    status: GameStatus.OVER,
  };
};

const mapDbGameToGame = (
  dbGame: PrismaGame & { host: PrismaUser; guest: PrismaUser | null }
): Game => {
  switch (dbGame.status) {
    case "idle":
      return mapDbGameToGameIdle(dbGame);

    case "inProgress":
      return mapDbGameToGameInProgress(dbGame);

    case "over":
      return mapDbGameToGameOver(dbGame);
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

  async create(payload: CreateGamePayload) {
    const newDbGame = await prisma.game.create({
      data: payload,
      include: { host: true },
    });

    return mapDbGameToGameIdle(newDbGame);
  }
}
