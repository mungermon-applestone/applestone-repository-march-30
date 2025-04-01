"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Trash2, Plus } from "lucide-react"

interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
}

// Static blog post data
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
  const [blogPosts] = useState<BlogPost[]>(staticBlogPosts)
  const [deleting, setDeleting] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      setDeleting(id)

      // Simulate API call
      setTimeout(() => {
        setDeleting(null)
      }, 1000)
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

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
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
    </div>
  )
}

