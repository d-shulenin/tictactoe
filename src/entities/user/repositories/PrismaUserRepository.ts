import { prisma } from "@/shared/lib/db";
import { User } from "../model";
import { UserRepository } from "./IUserRepository";

export class PrismaUserRepository implements UserRepository {
  async create(payload: Omit<User, "id">) {
    return await prisma.user.create({ data: payload });
  }

  async findByLogin(login: string) {
    return await prisma.user.findUniqueOrThrow({ where: { login } });
  }
}
