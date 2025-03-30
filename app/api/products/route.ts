import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("product_types").select("*").order("title", { ascending: true })

    if (error) {
      console.error("Error fetching product types:", error)
      return NextResponse.json({ error: "Failed to fetch product types" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in products API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

