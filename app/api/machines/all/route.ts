import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("machines").select("*").order("name", { ascending: true })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch machines" }, { status: 500 })
    }

    // Ensure we return a valid array even if data is null
    return NextResponse.json(data || [])
  } catch (err) {
    console.error("Server error:", err)
    return NextResponse.json([], { status: 200 }) // Return empty array instead of error
  }
}

