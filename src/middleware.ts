import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAINTENANCE_PASSWORD = process.env.MAINTENANCE_PASSWORD;
const COOKIE_NAME = "site_access";

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_PASSWORD) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Always allow the password page and its API route
  if (pathname === "/coming-soon" || pathname === "/api/unlock") {
    return NextResponse.next();
  }

  // Check cookie
  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie?.value === MAINTENANCE_PASSWORD) {
    return NextResponse.next();
  }

  // Redirect to password page
  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
