import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { SectionHeader } from "@/components/section-header"

// Changed from [postId] to [slug] for consistency

interface BlogPost {
  id: number
  slug: string // Added slug field
  title: string
  content: string
  image_url: string
  author: string
  date: string
  excerpt: string
}

// Static blog post data for fallback
const staticBlogPosts: Record<string, BlogPost> = {
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Try to get blog post from database or fallback to static data
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createServerSupabaseClient()

    // First try to fetch by slug
    let { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

    if (error || !data) {
      // If not found by slug, try by ID (in case slug is actually an ID)
      const possibleId = Number.parseInt(slug)
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
      return staticBlogPosts[slug] || null
    }

    return data
  } catch (error) {
    console.error("Error fetching blog post:", error)
    // Fallback to static data
    return staticBlogPosts[slug] || null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Blog
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        <SectionHeader
          title={post.title}
          subtitle={`By ${post.author} • ${new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
          alignment="center"
        />

        <div className="relative h-[400px] rounded-lg overflow-hidden my-8">
          <Image
            src={post.image_url || "/placeholder.svg?height=400&width=800"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose max-w-none">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  )
}

