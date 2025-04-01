import { NextResponse } from "next/server"

// Static product data
const staticProducts = {
  "1": {
    id: 1,
    name: "Smart Vending Machine",
    description: "Our flagship smart vending machine with touchscreen interface and cashless payment options.",
    price: 3999.99,
    image_url: "/placeholder.svg?height=400&width=400",
    product_type_id: 1,
    features: ["Touchscreen", "Cashless Payment", "Remote Monitoring", "Inventory Tracking"],
  },
  "2": {
    id: 2,
    name: "Compact Vending Solution",
    description: "A smaller vending machine perfect for offices and small spaces.",
    price: 2499.99,
    image_url: "/placeholder.svg?height=400&width=400",
    product_type_id: 1,
    features: ["Space Efficient", "Energy Saving", "Digital Display", "Multiple Payment Options"],
  },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    return NextResponse.json(staticProducts[params.id] || { error: "Product not found" }, {
      status: staticProducts[params.id] ? 200 : 404,
    })
  } catch (error) {
    console.error("Error in GET product:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

