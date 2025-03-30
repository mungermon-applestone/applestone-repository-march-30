import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("product_types").select("*").eq("slug", params.slug).single()

    if (error) {
      console.error("Error fetching product type:", error)
      return NextResponse.json({ error: "Failed to fetch product type" }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Product type not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in product type API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

