import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    if (!slug) {
      return NextResponse.json({ error: "Product type slug is required" }, { status: 400 })
    }

    // Only use the 'slug' column which we know exists
    const { data, error } = await supabase.from("product_types").select("*").eq("slug", slug).maybeSingle()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: `Failed to fetch product type: ${error.message}` }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Product type not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error in product type API route:", error)
    return NextResponse.json({ error: `Failed to fetch product type: ${error.message}` }, { status: 500 })
  }
}

