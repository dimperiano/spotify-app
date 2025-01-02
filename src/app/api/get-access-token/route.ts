import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookies = req.cookies;
  const accessToken = cookies.get("access_token");

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token is missing" },
      { status: 400 },
    );
  }

  return NextResponse.json({ access_token: accessToken });
}
