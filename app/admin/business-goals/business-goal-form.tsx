"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { saveBusinessGoal } from "./actions"

interface BusinessGoalData {
  id?: number
  title: string
  description: string
  image_url: string
  slug: string
}

export default function BusinessGoalForm({ initialData }: { initialData?: BusinessGoalData }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<BusinessGoalData>(
    initialData || {
      title: "",
      description: "",
      image_url: "",
      slug: "",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from title if slug field is empty
    if (name === "title" && (!formData.slug || formData.slug === "")) {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await saveBusinessGoal(formData)
      router.push("/admin/business-goals")
      router.refresh()
    } catch (error) {
      console.error("Error saving business goal:", error)
      alert("Failed to save business goal. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="slug" className="text-sm font-medium">
          Slug (URL-friendly name)
        </label>
        <input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          required
        />
        <p className="text-xs text-muted-foreground">Used in URLs, e.g., /business-goals/your-slug</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="image_url" className="text-sm font-medium">
          Image URL
        </label>
        <input
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/business-goals")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

