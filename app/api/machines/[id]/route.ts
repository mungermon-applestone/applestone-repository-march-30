import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("machines").select("*").eq("id", params.id).single()

    if (error) {
      console.error("Error fetching machine:", error)
      return NextResponse.json({ error: "Failed to fetch machine" }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in machine API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

