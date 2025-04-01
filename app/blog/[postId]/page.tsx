import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { SectionHeader } from "@/components/section-header"

// This is using [postId] which might be conflicting with another route using [slug] for the same pattern
// Let's rename this to [slug] to be consistent

interface BlogPost {
  id: number
  title: string
  content: string
  image_url: string
  author: string
  date: string
  excerpt: string
}

// Static blog post data for fallback
const staticBlogPosts: Record<string, BlogPost> = {
  "1": {
    id: 1,
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
    title: "Maximizing ROI with Smart Vending Machines",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    image_url: "/placeholder.svg?height=400&width=800",
    author: "Jane Smith",
    date: "2023-02-22",
    excerpt: "Learn how smart vending technology can increase your return on investment and boost sales.",
  },
}

export async function generateMetadata({ params }: { params: { postId: string } }): Promise<Metadata> {
  // Try to get blog post from database or fallback to static data
  const post = await getBlogPost(params.postId)

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

async function getBlogPost(postId: string): Promise<BlogPost | null> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("blog_posts").select("*").eq("id", postId).single()

    if (error || !data) {
      // Fallback to static data
      return staticBlogPosts[postId] || null
    }

    return data
  } catch (error) {
    console.error("Error fetching blog post:", error)
    // Fallback to static data
    return staticBlogPosts[postId] || null
  }
}

export default async function BlogPostPage({ params }: { params: { postId: string } }) {
  const post = await getBlogPost(params.postId)

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

