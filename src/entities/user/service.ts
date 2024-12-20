import { ApiError } from "@/shared/lib/errors";
import { UserRepository } from "./repositories/IUserRepository";
import { PrismaUserRepository } from "./repositories/PrismaUserRepository";
import bcrypt from "bcrypt";

class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(login: string, password: string) {
    const candidate = await this.userRepository.findByLogin(login);
    if (candidate) {
      throw ApiError.BadRequest("User with such login already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    return this.userRepository.create({ login, passwordHash });
  }
}

export const userService = new UserService(new PrismaUserRepository());
