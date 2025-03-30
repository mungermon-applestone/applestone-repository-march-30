import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("business_goals").select("*").order("title", { ascending: true })

    if (error) {
      console.error("Error fetching business goals:", error)
      return NextResponse.json({ error: "Failed to fetch business goals" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in business goals API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

