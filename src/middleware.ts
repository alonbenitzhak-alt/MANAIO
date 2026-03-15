import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const protectedRoutes: Record<string, string[]> = {
  "/dashboard/buyer": ["buyer", "admin"],
  "/dashboard/agent": ["agent", "admin"],
  "/admin": ["admin"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this route needs protection
  const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );
  if (!matchedRoute) return NextResponse.next();

  // Get session from cookie
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Extract access token from Supabase auth cookie
  const accessToken = request.cookies.get("sb-access-token")?.value
    ?? request.cookies.getAll().find(c => c.name.includes("-auth-token"))?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    });

    const { data: { user } } = await supabase.auth.getUser(accessToken);
    if (!user) return NextResponse.redirect(new URL("/", request.url));

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile) return NextResponse.redirect(new URL("/", request.url));

    const allowedRoles = protectedRoutes[matchedRoute];
    if (!allowedRoles.includes(profile.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch {
    // On error, deny access (fail-closed)
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
