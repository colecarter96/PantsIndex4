import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // Expire immediately
    })
  );

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers,
  });
}
