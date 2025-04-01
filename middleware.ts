import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Check if the path starts with /admin
  if (path.startsWith("/admin")) {
    // Get the authentication cookie
    const authCookie = request.cookies.get("admin-auth")

    // If there's no auth cookie and the path is not /admin/login, redirect to login
    if (!authCookie && path !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

