import { type NextRequest, NextResponse } from "next/server"
import { deleteBusinessGoal } from "../actions"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const idParam = url.searchParams.get("id")

    if (!idParam) {
      return NextResponse.json({ error: "Business goal ID is required" }, { status: 400 })
    }

    const id = Number.parseInt(idParam, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid business goal ID" }, { status: 400 })
    }

    await deleteBusinessGoal(id)

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/business-goals")
    revalidatePath("/admin/business-goals")

    // Redirect back to the business goals page
    return NextResponse.redirect(new URL("/admin/business-goals", request.url))
  } catch (error) {
    console.error("Error deleting business goal:", error)
    return NextResponse.json({ error: "Failed to delete business goal" }, { status: 500 })
  }
}

