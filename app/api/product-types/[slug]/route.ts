import { NextResponse } from "next/server"

// Static product type data
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
    return NextResponse.json(staticProductTypes[params.slug] || { error: "Product type not found" }, {
      status: staticProductTypes[params.slug] ? 200 : 404,
    })
  } catch (error) {
    console.error("Error in GET product type:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

