import { type NextRequest, NextResponse } from "next/server"
import { deleteMachine } from "../actions"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Machine ID is required" }, { status: 400 })
    }

    await deleteMachine(id)

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/machines")
    revalidatePath("/admin/machines")

    // Redirect back to the machines page
    return NextResponse.redirect(new URL("/admin/machines", request.url))
  } catch (error) {
    console.error("Error deleting machine:", error)
    return NextResponse.json({ error: "Failed to delete machine" }, { status: 500 })
  }
}

