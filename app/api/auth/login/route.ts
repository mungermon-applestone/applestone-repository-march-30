import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Check credentials against environment variables
    const validUsername = process.env.ADMIN_USERNAME
    const validPassword = process.env.ADMIN_PASSWORD

    console.log("Login attempt:", {
      providedUsername: username,
      hasValidUsername: !!validUsername,
      passwordMatch: password === validPassword,
    })

    if (!validUsername || !validPassword) {
      console.error("Missing environment variables for authentication")
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 })
    }

    if (username !== validUsername || password !== validPassword) {
      console.log("Invalid credentials provided")
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
    }

    // Set a simple auth cookie
    const cookieStore = cookies()
    cookieStore.set("admin_authenticated", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "lax",
    })

    console.log("Authentication successful, cookie set")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

