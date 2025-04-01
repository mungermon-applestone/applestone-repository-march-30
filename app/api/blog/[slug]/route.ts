import { NextResponse } from "next/server"

// Static blog post data
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
    return NextResponse.json(staticBlogPosts[params.slug] || { error: "Blog post not found" }, {
      status: staticBlogPosts[params.slug] ? 200 : 404,
    })
  } catch (error) {
    console.error("Error in GET blog post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

