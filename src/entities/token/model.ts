import { JWTPayload } from "jose";
import { User } from "@/entities/user/@x/token";

export interface TokenPayload extends JWTPayload {
  userId: User["id"];
}
