import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL || "https://mymanaio.com",
  "https://mymanaio.com",
  "https://www.mymanaio.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

export function validateOrigin(request: NextRequest): NextResponse | null {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Allow same-origin requests (no Origin header = server-to-server or same-origin)
  if (!origin && !referer) return null;

  const source = origin || (referer ? new URL(referer).origin : null);
  if (!source) return null;

  if (!ALLOWED_ORIGINS.includes(source)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
