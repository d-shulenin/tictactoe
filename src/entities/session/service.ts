import { cookies } from "next/headers";
import { TokenService } from "../token/@x/session";

export class SessionService {
  static async createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await TokenService.encrypt({ userId, expiresAt });
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  }

  static async updateSession() {
    const session = (await cookies()).get("session")?.value;
    const payload = await TokenService.decrypt(session);
    if (!session || !payload) {
      return null;
    }
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
    });
  }

  /**
   * You can use the deleteSession() function, for example, on logout.
   */
  static async deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  }

  static async verifySession() {
    const cookie = (await cookies()).get("session")?.value;
    const session = await TokenService.decrypt(cookie);

    return { isAuth: Boolean(session), userId: session?.userId };
  }
}
