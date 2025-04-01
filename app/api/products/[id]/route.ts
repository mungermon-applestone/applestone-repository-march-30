import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("products").select("*").eq("id", params.id).single()

    if (error) {
      console.error("Error fetching product:", error)

      // Fallback to static data
      const staticData = getStaticProduct(params.id)
      if (staticData) {
        return NextResponse.json(staticData)
      }

      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching product:", error)

    // Fallback to static data
    const staticData = getStaticProduct(params.id)
    if (staticData) {
      return NextResponse.json(staticData)
    }

    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

// Static data fallback
function getStaticProduct(id: string) {
  const staticProducts = {
    "1": {
      id: 1,
      name: "Smart Grocery Vending Machine",
      description: "Advanced vending solution for grocery items with temperature control and inventory management.",
      price: 5999,
      image_url: "/placeholder.svg?height=600&width=600",
      product_type_id: 1,
      features: ["Temperature Control", "Inventory Management", "Touchscreen Interface"],
    },
    "2": {
      id: 2,
      name: "Compact Vape Dispenser",
      description: "Secure vape product dispenser with age verification and compliance tracking.",
      price: 3499,
      image_url: "/placeholder.svg?height=600&width=600",
      product_type_id: 2,
      features: ["Age Verification", "Compact Design", "Inventory Tracking"],
    },
  }

  return staticProducts[id] || null
}

