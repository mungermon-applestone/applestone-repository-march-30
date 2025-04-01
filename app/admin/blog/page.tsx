"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"

interface BlogPost {
  id: number
  slug: string
  title: string
  author: string
  date: string
  excerpt: string
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase
          .from("blog_posts")
          .select("id, slug, title, author, date, excerpt")
          .order("date", { ascending: false })

        if (error) {
          console.error("Error fetching blog posts:", error)
          // Fallback to static data
          setBlogPosts([
            {
              id: 1,
              slug: "future-of-automated-retail",
              title: "The Future of Automated Retail",
              author: "John Doe",
              date: "2023-01-15",
              excerpt:
                "Exploring the latest trends and technologies shaping the future of automated retail and vending solutions.",
            },
            {
              id: 2,
              slug: "maximizing-roi-with-smart-vending",
              title: "Maximizing ROI with Smart Vending Machines",
              author: "Jane Smith",
              date: "2023-02-22",
              excerpt: "Learn how smart vending technology can increase your return on investment and boost sales.",
            },
          ])
        } else {
          setBlogPosts(data || [])
        }
      } catch (error) {
        console.error("Error in fetchBlogPosts:", error)
        // Fallback to static data
        setBlogPosts([
          {
            id: 1,
            slug: "future-of-automated-retail",
            title: "The Future of Automated Retail",
            author: "John Doe",
            date: "2023-01-15",
            excerpt:
              "Exploring the latest trends and technologies shaping the future of automated retail and vending solutions.",
          },
          {
            id: 2,
            slug: "maximizing-roi-with-smart-vending",
            title: "Maximizing ROI with Smart Vending Machines",
            author: "Jane Smith",
            date: "2023-02-22",
            excerpt: "Learn how smart vending technology can increase your return on investment and boost sales.",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const filteredBlogPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return
    }

    try {
      const supabase = createClientSupabaseClient()
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (error) {
        console.error("Error deleting blog post:", error)
        alert("Failed to delete blog post. Please try again.")
      } else {
        setBlogPosts(blogPosts.filter((post) => post.id !== id))
      }
    } catch (error) {
      console.error("Error in handleDelete:", error)
      alert("An unexpected error occurred. Please try again.")
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

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2 text-gray-500">Loading blog posts...</p>
        </div>
      ) : filteredBlogPosts.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No blog posts found.</p>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBlogPosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</div>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/admin/blog/${post.slug}`} className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">
                        <Trash className="h-5 w-5" />
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

