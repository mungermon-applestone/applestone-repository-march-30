import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // First try to get the business goal from the database
    const { data, error } = await supabase.from("business_goals").select("*").eq("slug", slug)

    // If there's an error that's not just "no rows returned"
    if (error && error.code !== "PGRST116") {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch business goal" }, { status: 500 })
    }

    // If we found a business goal in the database, return it
    if (data && data.length === 1) {
      return NextResponse.json(data[0])
    }

    // If no business goal was found, return a fallback goal based on the slug
    const fallbackGoal = getFallbackGoal(slug)
    if (fallbackGoal) {
      return NextResponse.json(fallbackGoal)
    }

    // If no fallback is available, return 404
    return NextResponse.json({ error: "Business goal not found" }, { status: 404 })
  } catch (err) {
    console.error("Server error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Function to provide fallback data for business goals
function getFallbackGoal(slug: string) {
  const fallbackGoals = [
    {
      id: 1,
      slug: "increase-revenue",
      title: "Increase Revenue",
      description: "Boost your vending machine revenue with smart pricing, promotions, and inventory optimization.",
      image_url: "/placeholder.svg?height=300&width=400",
      benefits: ["Smart Pricing", "Targeted Promotions", "Inventory Optimization"],
    },
    {
      id: 2,
      slug: "reduce-costs",
      title: "Reduce Costs",
      description: "Cut operational costs with route optimization, remote monitoring, and predictive maintenance.",
      image_url: "/placeholder.svg?height=300&width=400",
      benefits: ["Route Optimization", "Remote Monitoring", "Predictive Maintenance"],
    },
    {
      id: 3,
      slug: "improve-customer-experience",
      title: "Improve Customer Experience",
      description: "Enhance customer satisfaction with touchless payments, loyalty programs, and personalized offers.",
      image_url: "/placeholder.svg?height=300&width=400",
      benefits: ["Touchless Payments", "Loyalty Programs", "Personalized Offers"],
    },
    {
      id: 4,
      slug: "expand-operations",
      title: "Expand Operations",
      description: "Scale your vending business with data-driven insights and automated inventory management.",
      image_url: "/placeholder.svg?height=300&width=400",
      benefits: ["Data-Driven Insights", "Automated Inventory", "Scalable Infrastructure"],
    },
  ]

  return fallbackGoals.find((goal) => goal.slug === slug)
}

