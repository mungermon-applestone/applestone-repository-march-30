import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("business_goals").select("*").eq("slug", params.slug).single()

    if (error) {
      console.error("Error fetching business goal:", error)
      return NextResponse.json({ error: "Failed to fetch business goal" }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Business goal not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in business goal API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

