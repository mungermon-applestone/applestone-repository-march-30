import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

// Using [slug] to be consistent with the page route
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const supabase = createServerSupabaseClient()

    // First try to fetch by slug
    let { data, error } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).single()

    if (error || !data) {
      // If not found by slug, try by ID (in case slug is actually an ID)
      const possibleId = Number.parseInt(params.slug)
      if (!isNaN(possibleId)) {
        const result = await supabase.from("blog_posts").select("*").eq("id", possibleId).single()

        if (!result.error && result.data) {
          data = result.data
          error = null
        }
      }
    }

    if (error || !data) {
      // Fallback to static data
      const staticData = getStaticBlogPost(params.slug)
      if (staticData) {
        return NextResponse.json(staticData)
      }
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching blog post:", error)

    // Fallback to static data
    const staticData = getStaticBlogPost(params.slug)
    if (staticData) {
      return NextResponse.json(staticData)
    }

    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

// Static data fallback
function getStaticBlogPost(slug: string) {
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

  return staticBlogPosts[slug as keyof typeof staticBlogPosts] || null
}

