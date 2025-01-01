import { NextRequest, NextResponse } from "next/server";
import { SessionService } from "./entities/session";

// 1. Specify public routes
const publicRoutes = ["/sign-in", "/sign-up"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected
  const path = req.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);

  // 3. Verify session
  const { isAuth } = await SessionService.verifySession();

  // 4. Redirect to /sign-in if the user is not authenticated
  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
