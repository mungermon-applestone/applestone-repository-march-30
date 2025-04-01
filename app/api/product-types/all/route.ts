import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"

export async function GET() {
  try {
    const { data, error } = await supabase.from("product_types").select("*").order("id")

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: `Failed to fetch product types: ${error.message}` }, { status: 500 })
    }

    // If no data is found, return an empty array instead of null
    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error("Error in product types API route:", error)
    return NextResponse.json({ error: `Failed to fetch product types: ${error.message}` }, { status: 500 })
  }
}

