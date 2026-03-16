import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Maintenance / Coming-Soon Gate ─────────────────────────────────────────
// When MAINTENANCE_PASSWORD is set in .env, the entire site is protected by
// HTTP Basic Auth. Remove (or clear) the variable when you're ready to go live.
const MAINTENANCE_PASSWORD = process.env.MAINTENANCE_PASSWORD;

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_PASSWORD) {
    // No password set → site is open to the public
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const base64 = authHeader.replace(/^Basic\s+/i, "");
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    // Accept any username; only the password matters
    const password = decoded.split(":").slice(1).join(":");

    if (password === MAINTENANCE_PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("האתר אינו זמין כרגע.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="MANAIO – Coming Soon"',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT Next.js internals and static files so the browser
     * can still load assets for any custom error pages.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
