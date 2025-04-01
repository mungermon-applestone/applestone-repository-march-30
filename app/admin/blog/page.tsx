"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, Trash2, Plus } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"

interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
}

// Static blog post data for fallback
const staticBlogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "future-of-automated-retail",
    title: "The Future of Automated Retail",
    excerpt:
      "Exploring the latest trends and technologies shaping the future of automated retail and vending solutions.",
    date: "2023-01-15",
    author: "John Doe",
  },
  {
    id: 2,
    slug: "maximizing-roi-with-smart-vending",
    title: "Maximizing ROI with Smart Vending Machines",
    excerpt: "Learn how smart vending technology can increase your return on investment and boost sales.",
    date: "2023-02-22",
    author: "Jane Smith",
  },
]

export default function AdminBlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase
          .from("blog_posts")
          .select("id, slug, title, excerpt, date, author")
          .order("date", { ascending: false })

        if (error) {
          console.error("Error fetching blog posts:", error)
          setBlogPosts(staticBlogPosts)
        } else {
          setBlogPosts(data || staticBlogPosts)
        }
      } catch (error) {
        console.error("Error in fetchBlogPosts:", error)
        setBlogPosts(staticBlogPosts)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      setDeleting(id)

      try {
        const supabase = createClientSupabaseClient()
        const { error } = await supabase.from("blog_posts").delete().eq("id", id)

        if (error) {
          console.error("Error deleting blog post:", error)
          alert("Failed to delete blog post. Please try again.")
        } else {
          setBlogPosts((prev) => prev.filter((post) => post.id !== id))
        }
      } catch (error) {
        console.error("Error in handleDelete:", error)
        alert("An unexpected error occurred. Please try again.")
      } finally {
        setDeleting(null)
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Blog Posts</h2>
        <Link
          href="/admin/blog/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2 text-gray-500">Loading blog posts...</p>
        </div>
      ) : blogPosts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No blog posts found.</p>
          <Link href="/admin/blog/new" className="mt-4 inline-block text-blue-600 hover:underline">
            Create your first blog post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogPosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{post.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/admin/blog/${post.slug}`} className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deleting === post.id}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        {deleting === post.id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-600 border-t-transparent"></div>
                        ) : (
                          <Trash2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

