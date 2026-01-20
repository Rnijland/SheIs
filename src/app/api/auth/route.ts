import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "she-admin-2026";
const SESSION_COOKIE = "she-admin-session";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      // Create a simple session token
      const sessionToken = Buffer.from(
        `${Date.now()}-${Math.random().toString(36)}`
      ).toString("base64");

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Onjuist wachtwoord" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Er is iets misgegaan" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Er is iets misgegaan" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);

    return NextResponse.json({
      authenticated: !!session?.value,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
