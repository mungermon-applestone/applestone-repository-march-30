import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for the admin area (except login)
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    // Check if the user is authenticated
    const isAuthenticated = request.cookies.has("admin_authenticated")
    console.log("Admin access attempt:", {
      path: request.nextUrl.pathname,
      isAuthenticated,
    })

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

