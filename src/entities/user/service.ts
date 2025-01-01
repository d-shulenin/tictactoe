import { ApiError } from "@/shared/lib/errors";
import { UserRepository } from "./repositories/IUserRepository";
import { PrismaUserRepository } from "./repositories/PrismaUserRepository";
import { pbkdf2Sync } from "crypto";

const salt = process.env.PASSWORD_ENCRYPTION_SALT;

function encryptPassword(password: string) {
  if (!salt) throw new Error("Salt for password encryption was not provided");

  const encryptedPassword = pbkdf2Sync(password, salt, 100000, 64, "sha512");

  return encryptedPassword.toString("hex");
}

class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(login: string, password: string) {
    const candidate = await this.userRepository.findByLogin(login);
    if (candidate) {
      throw ApiError.BadRequest("User with such login already exists");
    }

    const passwordHash = encryptPassword(password);
    return this.userRepository.create({ login, passwordHash });
  }

  async login(login: string, password: string) {
    const user = await this.userRepository.findByLogin(login);

    if (!user) {
      throw ApiError.BadRequest("User with such login doesn't exist");
    }

    const encryptedPassword = encryptPassword(password);
    const isPasswordValid = encryptedPassword === user.passwordHash;

    if (!isPasswordValid) {
      throw ApiError.BadRequest("Invalid password");
    }

    return user;
  }
}

export const userService = new UserService(new PrismaUserRepository());
