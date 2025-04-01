import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

// Fallback business goals in case the fetch fails
const fallbackBusinessGoals = [
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

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("business_goals").select("*").order("id", { ascending: true }).limit(4)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(fallbackBusinessGoals)
    }

    // If no data or empty array, return fallback data
    return NextResponse.json(data && data.length > 0 ? data : fallbackBusinessGoals)
  } catch (err) {
    console.error("Server error:", err)
    return NextResponse.json(fallbackBusinessGoals)
  }
}

