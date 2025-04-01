import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

// Static blog post data for fallback
const staticBlogPosts = {
  "future-of-automated-retail": {
    id: 1,
    slug: "future-of-automated-retail",
    title: "The Future of Automated Retail",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    image_url: "/placeholder.svg?height=400&width=800",
    author: "John Doe",
    date: "2023-01-15",
    excerpt:
      "Exploring the latest trends and technologies shaping the future of automated retail and vending solutions.",
  },
  "maximizing-roi-with-smart-vending": {
    id: 2,
    slug: "maximizing-roi-with-smart-vending",
    title: "Maximizing ROI with Smart Vending Machines",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    image_url: "/placeholder.svg?height=400&width=800",
    author: "Jane Smith",
    date: "2023-02-22",
    excerpt: "Learn how smart vending technology can increase your return on investment and boost sales.",
  },
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const supabase = createServerSupabaseClient()

    // First try to fetch by slug
    let { data, error } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).single()

    // If not found by slug and it's numeric, try by ID
    if ((error || !data) && !isNaN(Number.parseInt(params.slug))) {
      const result = await supabase.from("blog_posts").select("*").eq("id", Number.parseInt(params.slug)).single()

      if (!result.error && result.data) {
        data = result.data
        error = null
      }
    }

    if (error) {
      console.error("Error fetching blog post:", error)
      // Fallback to static data
      return NextResponse.json(staticBlogPosts[params.slug] || { error: "Blog post not found" }, {
        status: staticBlogPosts[params.slug] ? 200 : 404,
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GET blog post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

