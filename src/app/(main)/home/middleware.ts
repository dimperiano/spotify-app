import { NextResponse } from "next/server"

export function middleware(request: Request) {
  const accessToken = request.headers
    .get("cookie")
    ?.match(/access_token=([^;]+)/)?.[1]

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/home"],
}
