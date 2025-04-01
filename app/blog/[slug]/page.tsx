import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase"

interface BlogPost {
  id: number
  slug: string
  title: string
  content: string
  image_url: string
  author: string
  date: string
}

// Static blog post data for fallback
const staticBlogPosts: Record<string, BlogPost> = {
  "1": {
    id: 1,
    slug: "future-of-automated-retail",
    title: "The Future of Automated Retail",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    image_url: "/placeholder.svg?height=400&width=800",
    author: "John Doe",
    date: "2023-01-15",
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
  },
}

async function getBlogPost(slug: string) {
  try {
    const supabase = createServerSupabaseClient()

    // First try to fetch by slug
    let { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

    // If not found by slug and it's numeric, try by ID
    if ((error || !data) && !isNaN(Number.parseInt(slug))) {
      const result = await supabase.from("blog_posts").select("*").eq("id", Number.parseInt(slug)).single()

      if (!result.error && result.data) {
        data = result.data
        error = null
      }
    }

    if (error) {
      console.error("Error fetching blog post:", error)
      return staticBlogPosts[slug] || null
    }

    return data
  } catch (error) {
    console.error("Error in getBlogPost:", error)
    return staticBlogPosts[slug] || null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link href="/blog" className="text-blue-600 hover:underline">
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

        <div className="text-gray-600 mb-6">
          By {post.author} •{" "}
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </div>

        <div className="relative aspect-video mb-8">
          <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>}>
            <Image
              src={post.image_url || "/placeholder.svg?height=400&width=800"}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </Suspense>
        </div>

        <div className="prose max-w-none">
          <p>{post.content}</p>
        </div>
      </article>
    </main>
  )
}

