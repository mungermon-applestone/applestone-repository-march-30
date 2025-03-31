"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/image-uploader"
import { Loader2, Plus, Pencil, Trash2, X, Calendar } from "lucide-react"
import Image from "next/image"
import { generateSlug, formatDate } from "@/lib/content-utils"

interface Update {
  id?: number
  title: string
  excerpt: string
  content?: string
  date: string
  category: string
  slug: string
  image_url?: string
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [currentUpdate, setCurrentUpdate] = useState<Update | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const supabase = createClientSupabaseClient()

  useEffect(() => {
    fetchUpdates()
  }, [])

  async function fetchUpdates() {
    setIsLoading(true)

    try {
      const { data, error } = await supabase.from("updates").select("*").order("date", { ascending: false })

      if (error) {
        throw error
      }

      setUpdates(data || [])
    } catch (error) {
      console.error("Error fetching updates:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateNew = () => {
    const today = new Date().toISOString().split("T")[0]

    setCurrentUpdate({
      title: "",
      excerpt: "",
      content: "",
      date: today,
      category: "Product Update",
      slug: "",
      image_url: "/placeholder.svg?height=300&width=400",
    })
    setIsEditing(true)
    setErrorMessage("")
  }

  const handleEdit = (update: Update) => {
    setCurrentUpdate({ ...update })
    setIsEditing(true)
    setErrorMessage("")
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentUpdate(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentUpdate) return

    const { name, value } = e.target
    setCurrentUpdate({ ...currentUpdate, [name]: value })

    // Auto-generate slug from title if slug is empty
    if (name === "title" && (!currentUpdate.slug || currentUpdate.slug === "")) {
      setCurrentUpdate({
        ...currentUpdate,
        title: value,
        slug: generateSlug(value),
      })
    }
  }

  const handleImageUploaded = (url: string) => {
    if (!currentUpdate) return

    setCurrentUpdate({
      ...currentUpdate,
      image_url: url,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUpdate) return

    setIsSaving(true)
    setErrorMessage("")

    try {
      // Ensure slug is set
      if (!currentUpdate.slug) {
        currentUpdate.slug = generateSlug(currentUpdate.title)
      }

      let result

      if (currentUpdate.id) {
        // Update existing record
        result = await supabase
          .from("updates")
          .update({
            title: currentUpdate.title,
            excerpt: currentUpdate.excerpt,
            content: currentUpdate.content,
            date: currentUpdate.date,
            category: currentUpdate.category,
            slug: currentUpdate.slug,
            image_url: currentUpdate.image_url,
          })
          .eq("id", currentUpdate.id)
      } else {
        // Insert new record
        result = await supabase.from("updates").insert([
          {
            title: currentUpdate.title,
            excerpt: currentUpdate.excerpt,
            content: currentUpdate.content,
            date: currentUpdate.date,
            category: currentUpdate.category,
            slug: currentUpdate.slug,
            image_url: currentUpdate.image_url,
          },
        ])
      }

      if (result.error) {
        throw result.error
      }

      // Refresh the data
      await fetchUpdates()

      // Close the form
      setIsEditing(false)
      setCurrentUpdate(null)
    } catch (error: any) {
      console.error("Error saving update:", error)
      setErrorMessage(error.message || "An error occurred while saving")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this update?")) {
      return
    }

    try {
      const { error } = await supabase.from("updates").delete().eq("id", id)

      if (error) {
        throw error
      }

      // Refresh the data
      await fetchUpdates()
    } catch (error) {
      console.error("Error deleting update:", error)
      alert("Failed to delete update")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Updates & News</h1>
        {!isEditing && (
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Update
          </Button>
        )}
      </div>

      {isEditing && currentUpdate && (
        <div className="mb-8 p-6 border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{currentUpdate.id ? "Edit Update" : "Create New Update"}</h2>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {errorMessage && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={currentUpdate.title} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="slug">Slug (URL-friendly name)</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={currentUpdate.slug}
                  onChange={handleChange}
                  placeholder="auto-generated-from-title"
                />
                <p className="text-xs text-muted-foreground mt-1">Leave empty to auto-generate from title</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={currentUpdate.date} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={currentUpdate.category}
                  onChange={handleChange}
                  placeholder="e.g., Product Update, Company News, etc."
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt (Summary)</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={currentUpdate.excerpt}
                onChange={handleChange}
                rows={2}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">A brief summary that appears in listings</p>
            </div>

            <div>
              <Label htmlFor="content">Full Content</Label>
              <Textarea
                id="content"
                name="content"
                value={currentUpdate.content || ""}
                onChange={handleChange}
                rows={8}
              />
            </div>

            <div>
              <Label>Featured Image</Label>
              <ImageUploader
                defaultImageUrl={currentUpdate.image_url}
                onImageUploaded={(result) => handleImageUploaded(result.url)}
                folder="updates"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : currentUpdate.id ? (
                  "Update News Item"
                ) : (
                  "Create News Item"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {updates.length > 0 ? (
          updates.map((update) => (
            <Card key={update.id} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {update.image_url && (
                  <div className="md:col-span-1">
                    <div className="aspect-square relative h-full">
                      <Image
                        src={update.image_url || "/placeholder.svg"}
                        alt={update.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className={update.image_url ? "md:col-span-3" : "md:col-span-4"}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {update.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(update.date)}
                      </span>
                    </div>
                    <CardTitle>{update.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{update.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(update)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => update.id && handleDelete(update.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/30">
            <p className="text-muted-foreground">No updates found. Click "Add New Update" to create one.</p>
          </div>
        )}
      </div>
    </div>
  )
}

