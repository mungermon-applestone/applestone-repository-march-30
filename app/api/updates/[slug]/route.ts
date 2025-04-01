import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // First try to get the update from the database
    const { data, error } = await supabase.from("updates").select("*").eq("slug", slug)

    // If there's an error that's not just "no rows returned"
    if (error && error.code !== "PGRST116") {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch update" }, { status: 500 })
    }

    // If we found an update in the database, return it
    if (data && data.length === 1) {
      return NextResponse.json(data[0])
    }

    // If no update was found, return a fallback update based on the slug
    const fallbackUpdate = getFallbackUpdate(slug)
    if (fallbackUpdate) {
      return NextResponse.json(fallbackUpdate)
    }

    // If no fallback is available, return 404
    return NextResponse.json({ error: "Update not found" }, { status: 404 })
  } catch (err) {
    console.error("Server error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Function to provide fallback data for updates
function getFallbackUpdate(slug: string) {
  const fallbackUpdates = [
    {
      id: 1,
      title: "New Mobile App Features Released",
      excerpt: "We've added new features to our mobile app to help you manage your vending machines on the go.",
      content:
        "Our latest mobile app update includes real-time inventory tracking, push notifications for low stock alerts, and a new dashboard for quick performance insights. Download the latest version today!",
      date: "2023-11-15",
      category: "Product Update",
      slug: "mobile-app-features",
      image_url: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "AppleStone Solutions Expands to European Market",
      excerpt:
        "We're excited to announce our expansion into the European market with new offices in London and Berlin.",
      content:
        "After years of success in North America, we're bringing our vending machine software solutions to Europe. Our new offices in London and Berlin will serve as hubs for our European operations, allowing us to better serve our growing customer base in the region.",
      date: "2023-10-22",
      category: "Company News",
      slug: "european-expansion",
      image_url: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Introducing Temperature Monitoring for Refrigerated Machines",
      excerpt:
        "Our new temperature monitoring feature helps ensure your refrigerated products stay at the optimal temperature.",
      content:
        "With our new temperature monitoring feature, you can track the temperature of your refrigerated vending machines in real-time. Set custom alerts for temperature fluctuations and view historical temperature data to ensure your products are always stored safely.",
      date: "2023-09-18",
      category: "Product Update",
      slug: "temperature-monitoring",
      image_url: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "Partnership with PayQuick for Faster Payment Processing",
      excerpt:
        "We've partnered with PayQuick to offer faster and more secure payment processing for your vending machines.",
      content:
        "Our new partnership with PayQuick brings industry-leading payment processing to our platform. Customers will enjoy faster transactions, and operators will benefit from lower processing fees and quicker deposits. This integration is available to all customers starting next month.",
      date: "2023-08-05",
      category: "Partnership",
      slug: "payquick-partnership",
      image_url: "/placeholder.svg?height=300&width=400",
    },
  ]

  return fallbackUpdates.find((update) => update.slug === slug)
}

