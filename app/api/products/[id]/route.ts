import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

// This is using [id] which is consistent with app/products/[id]/page.tsx
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("products").select("*").eq("id", params.id).single()

    if (error || !data) {
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
      name: "Smart Vending Machine",
      description: "Our flagship smart vending machine with touchscreen interface and remote monitoring.",
      image_url: "/placeholder.svg?height=400&width=600",
      features: ["Touchscreen Interface", "Remote Monitoring", "Cashless Payment", "Inventory Tracking"],
      product_type: "vape",
      price: "Contact for pricing",
    },
    "2": {
      id: 2,
      name: "Compact Vending Solution",
      description: "Space-saving vending solution perfect for small retail spaces.",
      image_url: "/placeholder.svg?height=400&width=600",
      features: ["Space-Efficient Design", "Customizable Shelving", "Digital Payment", "Cloud Connectivity"],
      product_type: "grocery",
      price: "Starting at $3,999",
    },
    "3": {
      id: 3,
      name: "High-Capacity Vending System",
      description: "Large-capacity vending system for high-traffic locations.",
      image_url: "/placeholder.svg?height=400&width=600",
      features: [
        "High Capacity Storage",
        "Multiple Temperature Zones",
        "Advanced Analytics",
        "Automated Restocking Alerts",
      ],
      product_type: "fresh-food",
      price: "Contact for pricing",
    },
  }

  return staticProducts[id as keyof typeof staticProducts] || null
}

