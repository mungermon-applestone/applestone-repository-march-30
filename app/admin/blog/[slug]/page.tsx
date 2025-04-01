"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: number
  slug: string
  title: string
  content: string
  image_url: string
  author: string
  date: string
  excerpt: string
}

// Static blog post data
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

export default function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const isNew = params.slug === "new"
  const [saving, setSaving] = useState(false)
  const [blogPost, setBlogPost] = useState<BlogPost>(
    isNew
      ? {
          id: 0,
          slug: "",
          title: "",
          content: "",
          image_url: "/placeholder.svg?height=400&width=800",
          author: "",
          date: new Date().toISOString().split("T")[0],
          excerpt: "",
        }
      : staticBlogPosts[params.slug] || {
          id: 0,
          slug: "",
          title: "",
          content: "",
          image_url: "/placeholder.svg?height=400&width=800",
          author: "",
          date: new Date().toISOString().split("T")[0],
          excerpt: "",
        },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBlogPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      router.push("/admin/blog")
    }, 1000)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link href="/admin/blog" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <h2 className="text-xl font-semibold">{isNew ? "Add New Blog Post" : `Edit ${blogPost.title}`}</h2>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={blogPost.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={blogPost.slug}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                name="author"
                value={blogPost.author}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={blogPost.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image_url"
                value={blogPost.image_url}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
              <textarea
                name="excerpt"
                value={blogPost.excerpt}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                name="content"
                value={blogPost.content}
                onChange={handleChange}
                required
                rows={10}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

