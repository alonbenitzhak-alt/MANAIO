import { NextRequest, NextResponse } from "next/server";

const MAINTENANCE_PASSWORD = process.env.MAINTENANCE_PASSWORD;

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!MAINTENANCE_PASSWORD || password !== MAINTENANCE_PASSWORD) {
    return NextResponse.json({ error: "wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("site_access", MAINTENANCE_PASSWORD, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
