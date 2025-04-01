import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

// Static product type data for fallback
const staticProductTypes = {
  "vending-machines": {
    id: 1,
    name: "Vending Machines",
    slug: "vending-machines",
    description: "Smart vending machines with advanced features and customization options.",
  },
  "payment-systems": {
    id: 2,
    name: "Payment Systems",
    slug: "payment-systems",
    description: "Cashless payment solutions for vending machines and retail.",
  },
  accessories: {
    id: 3,
    name: "Accessories",
    slug: "accessories",
    description: "Add-ons and accessories for vending machines and payment systems.",
  },
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const supabase = createServerSupabaseClient()

    // First try to fetch by slug
    let { data, error } = await supabase.from("product_types").select("*").eq("slug", params.slug).single()

    // If not found by slug and it's numeric, try by ID
    if ((error || !data) && !isNaN(Number.parseInt(params.slug))) {
      const result = await supabase.from("product_types").select("*").eq("id", Number.parseInt(params.slug)).single()

      if (!result.error && result.data) {
        data = result.data
        error = null
      }
    }

    if (error) {
      console.error("Error fetching product type:", error)
      // Fallback to static data
      return NextResponse.json(staticProductTypes[params.slug] || { error: "Product type not found" }, {
        status: staticProductTypes[params.slug] ? 200 : 404,
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GET product type:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

