import { SignJWT, jwtVerify } from "jose";
import { TokenPayload } from "./model";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export class TokenService {
  static async encrypt(payload: TokenPayload) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);
  }

  static async decrypt(session: string | undefined = "") {
    try {
      const { payload } = await jwtVerify<TokenPayload>(session, encodedKey, {
        algorithms: ["HS256"],
      });
      return payload;
    } catch (e) {
      console.log(e instanceof Error ? e.message : "Failed to verify session");
    }
  }
}
