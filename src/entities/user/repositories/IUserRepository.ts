import { User } from "../model";

export interface UserRepository {
  create: (payload: Omit<User, "id">) => Promise<User>;
  findByLogin: (login: string) => Promise<User | null>;
}
