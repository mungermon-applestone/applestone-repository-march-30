import Link from "next/link"
import Image from "next/image"
import { createServerSupabaseClient } from "@/lib/supabase"
import { SectionHeader } from "@/components/section-header"

interface BlogPost {
  id: number
  slug: string // Added slug field
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
    image_url: "/placeholder.svg?height=400&width=600",
    author: "John Doe",
    date: "2023-01-15",
  },
  {
    id: 2,
    slug: "maximizing-roi-with-smart-vending",
    title: "Maximizing ROI with Smart Vending Machines",
    excerpt: "Learn how smart vending technology can increase your return on investment and boost sales.",
    image_url: "/placeholder.svg?height=400&width=600",
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

    return data || staticBlogPosts
  } catch (error) {
    console.error("Error in getBlogPosts:", error)
    return staticBlogPosts
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="container mx-auto px-4 py-8">
      <SectionHeader title="Blog" subtitle="Latest News and Insights" alignment="center" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={post.image_url || "/placeholder.svg?height=400&width=600"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  By {post.author} •{" "}
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="text-gray-700">{post.excerpt}</p>
                <div className="mt-4 text-blue-600 font-medium group-hover:text-blue-800 transition-colors duration-300">
                  Read More →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

