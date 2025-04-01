import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

// This file might be causing the conflict - let's rename the parameter to [slug]
export async function GET(request: Request, { params }: { params: { postId: string } }) {
  try {
    const supabase = createServerSupabaseClient()

    // First try to fetch by ID if it's numeric
    if (!isNaN(Number.parseInt(params.postId))) {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", Number.parseInt(params.postId))
        .single()

      if (!error && data) {
        return NextResponse.json(data)
      }
    }

    // If not found by ID or ID is not numeric, try by slug
    const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", params.postId).single()

    if (error || !data) {
      // Fallback to static data
      const staticData = getStaticBlogPost(params.postId)
      if (staticData) {
        return NextResponse.json(staticData)
      }
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching blog post:", error)

    // Fallback to static data
    const staticData = getStaticBlogPost(params.postId)
    if (staticData) {
      return NextResponse.json(staticData)
    }

    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

// Static data fallback
function getStaticBlogPost(postIdOrSlug: string) {
  const staticBlogPosts = {
    "1": {
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
    "2": {
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

  // Try to find by ID or slug
  return staticBlogPosts[postIdOrSlug] || null
}

