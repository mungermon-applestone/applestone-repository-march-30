import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("business_goals").select("*").order("title", { ascending: true })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch business goals" }, { status: 500 })
    }

    // If no data, return empty array instead of null
    return NextResponse.json(data || [])
  } catch (err) {
    console.error("Server error:", err)
    // Return an empty array with 200 status instead of an error
    return NextResponse.json([], { status: 200 })
  }
}

