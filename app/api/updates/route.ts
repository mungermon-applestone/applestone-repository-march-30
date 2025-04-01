import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("updates").select("*").order("date", { ascending: false }).limit(10)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch updates" }, { status: 500 })
    }

    // If no data, return empty array instead of null
    return NextResponse.json(data || [])
  } catch (err) {
    console.error("Server error:", err)
    return NextResponse.json([], { status: 200 }) // Return empty array instead of error
  }
}

