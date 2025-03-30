import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Get query parameters
    const url = new URL(request.url)
    const category = url.searchParams.get("category")
    const status = url.searchParams.get("status")

    // Start building the query
    let query = supabase.from("machines").select("*")

    // Apply filters if provided
    if (category) {
      query = query.eq("category", category)
    }

    if (status) {
      query = query.eq("status", status)
    }

    // Execute the query
    const { data, error } = await query.order("name", { ascending: true })

    if (error) {
      console.error("Error fetching machines:", error)
      return NextResponse.json({ error: "Failed to fetch machines" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in machines API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

