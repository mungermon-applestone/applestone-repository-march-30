import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase"

interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  image_url: string
  author: string
  date: string
}

// Static blog post data for fallback
const staticBlogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "future-of-automated-retail",
    title: "The Future of Automated Retail",
    excerpt:
      "Exploring the latest trends and technologies shaping the future of automated retail and vending solutions.",
    image_url: "/placeholder.svg?height=300&width=500",
    author: "John Doe",
    date: "2023-01-15",
  },
  {
    id: 2,
    slug: "maximizing-roi-with-smart-vending",
    title: "Maximizing ROI with Smart Vending Machines",
    excerpt: "Learn how smart vending technology can increase your return on investment and boost sales.",
    image_url: "/placeholder.svg?height=300&width=500",
    author: "Jane Smith",
    date: "2023-02-22",
  },
]

async function getBlogPosts() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false })

    if (error) {
      console.error("Error fetching blog posts:", error)
      return staticBlogPosts
    }

    return data
  } catch (error) {
    console.error("Error in getBlogPosts:", error)
    return staticBlogPosts
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Stay updated with the latest news, insights, and trends in the vending machine industry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md h-full flex flex-col">
              <div className="relative aspect-video">
                <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse"></div>}>
                  <Image
                    src={post.image_url || "/placeholder.svg?height=300&width=500"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </Suspense>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{post.title}</h2>
                <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
                <div className="text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}

