import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

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

    if (error || !data) {
      // Fallback to static data
      const staticData = getStaticProductType(params.slug)
      if (staticData) {
        return NextResponse.json(staticData)
      }
      return NextResponse.json({ error: "Product type not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching product type:", error)

    // Fallback to static data
    const staticData = getStaticProductType(params.slug)
    if (staticData) {
      return NextResponse.json(staticData)
    }

    return NextResponse.json({ error: "Failed to fetch product type" }, { status: 500 })
  }
}

// Static data fallback
function getStaticProductType(slugOrId: string) {
  const staticProductTypes = {
    "1": {
      id: 1,
      slug: "grocery",
      title: "Grocery",
      description: "Sell grocery items through automated retail with inventory management and freshness tracking.",
      image_url: "/placeholder.svg?height=300&width=400",
      features: ["Freshness Tracking", "Inventory Management", "Temperature Control"],
      long_description:
        "Our Grocery vending solutions enable retailers to sell fresh and packaged grocery items through automated retail channels. With advanced inventory management and freshness tracking, you can ensure your customers always receive quality products. Temperature control features maintain optimal conditions for perishable items.",
    },
    "2": {
      id: 2,
      slug: "vape",
      title: "Vape",
      description: "Age verification and compliance features for vape product sales through automated retail.",
      image_url: "/placeholder.svg?height=300&width=400",
      features: ["Age Verification", "Compliance Tracking", "Inventory Management"],
      long_description:
        "Our Vape vending solutions include robust age verification systems to ensure regulatory compliance. The platform tracks all sales for compliance reporting and manages inventory efficiently to prevent stockouts of popular products.",
    },
    "3": {
      id: 3,
      slug: "cannabis",
      title: "Cannabis",
      description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
      image_url: "/placeholder.svg?height=300&width=400",
      features: ["Age Verification", "Compliance Tracking", "Secure Storage"],
      long_description:
        "Our Cannabis vending solutions provide secure, compliant automated retail for cannabis products. With comprehensive age verification, compliance tracking, and secure storage, you can confidently expand your cannabis retail operations.",
    },
    "4": {
      id: 4,
      slug: "fresh-food",
      title: "Fresh Food",
      description: "Temperature monitoring and freshness tracking for perishable food items.",
      image_url: "/placeholder.svg?height=300&width=400",
      features: ["Temperature Control", "Freshness Tracking", "Inventory Management"],
      long_description:
        "Our Fresh Food vending solutions maintain optimal temperature conditions for perishable items. Real-time monitoring ensures food safety and quality, while smart inventory management reduces waste and ensures freshness.",
    },
    grocery: {
      id: 1,
      slug: "grocery",
      title: "Grocery",
      description: "Sell grocery items through automated retail with inventory management and freshness tracking.",
      image_url: "/placeholder.svg?height=300&width=400",
      features: ["Freshness Tracking", "Inventory Management", "Temperature Control"],
      long_description:
        "Our Grocery vending solutions enable retailers to sell fresh and packaged grocery items through automated retail channels. With advanced inventory management and freshness tracking, you can ensure your customers always receive quality products. Temperature control features maintain optimal conditions for perishable items.",
    },
    vape: {
      id: 2,
      slug: "vape",
      title: "Vape",
      description: "Age verification and compliance features for vape product sales through automated retail.",
      image_url: "/placeholder.svg?height=300&width=400",
      features: ["Age Verification", "Compliance Tracking", "Inventory Management"],
      long_description:
        "Our Vape vending solutions include robust age verification systems to ensure regulatory compliance. The platform tracks all sales for compliance reporting and manages inventory efficiently to prevent stockouts of popular products.",
    },
    cannabis: {
      id: 3,
      slug: "cannabis",
      title: "Cannabis",
      description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
      image_url: "/placeholder.svg?height=300&width=400",
      features: ["Age Verification", "Compliance Tracking", "Secure Storage"],
      long_description:
        "Our Cannabis vending solutions provide secure, compliant automated retail for cannabis products. With comprehensive age verification, compliance tracking, and secure storage, you can confidently expand your cannabis retail operations.",
    },
    "fresh-food": {
      id: 4,
      slug: "fresh-food",
      title: "Fresh Food",
      description: "Temperature monitoring and freshness tracking for perishable food items.",
      image_url: "/placeholder.svg?height=300&width=400",
      features: ["Temperature Control", "Freshness Tracking", "Inventory Management"],
      long_description:
        "Our Fresh Food vending solutions maintain optimal temperature conditions for perishable items. Real-time monitoring ensures food safety and quality, while smart inventory management reduces waste and ensures freshness.",
    },
  }

  // Try to find by slug or ID
  return staticProductTypes[slugOrId] || null
}

