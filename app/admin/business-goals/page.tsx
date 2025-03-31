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
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react"
import Image from "next/image"
import { generateSlug } from "@/lib/content-utils"

interface BusinessGoal {
  id?: number
  title: string
  description: string
  image_url: string
  slug: string
  benefits?: string[]
}

export default function BusinessGoalsPage() {
  const [businessGoals, setBusinessGoals] = useState<BusinessGoal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [currentGoal, setCurrentGoal] = useState<BusinessGoal | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const supabase = createClientSupabaseClient()

  useEffect(() => {
    fetchBusinessGoals()
  }, [])

  async function fetchBusinessGoals() {
    setIsLoading(true)

    try {
      const { data, error } = await supabase.from("business_goals").select("*").order("id", { ascending: true })

      if (error) {
        throw error
      }

      setBusinessGoals(data || [])
    } catch (error) {
      console.error("Error fetching business goals:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateNew = () => {
    setCurrentGoal({
      title: "",
      description: "",
      image_url: "/placeholder.svg?height=300&width=400",
      slug: "",
      benefits: [],
    })
    setIsEditing(true)
    setErrorMessage("")
  }

  const handleEdit = (goal: BusinessGoal) => {
    setCurrentGoal({ ...goal })
    setIsEditing(true)
    setErrorMessage("")
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentGoal(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentGoal) return

    const { name, value } = e.target
    setCurrentGoal({ ...currentGoal, [name]: value })

    // Auto-generate slug from title if slug is empty
    if (name === "title" && (!currentGoal.slug || currentGoal.slug === "")) {
      setCurrentGoal({
        ...currentGoal,
        title: value,
        slug: generateSlug(value),
      })
    }
  }

  const handleBenefitChange = (index: number, value: string) => {
    if (!currentGoal || !currentGoal.benefits) return

    const updatedBenefits = [...currentGoal.benefits]
    updatedBenefits[index] = value

    setCurrentGoal({
      ...currentGoal,
      benefits: updatedBenefits,
    })
  }

  const handleAddBenefit = () => {
    if (!currentGoal) return

    const benefits = currentGoal.benefits || []
    setCurrentGoal({
      ...currentGoal,
      benefits: [...benefits, ""],
    })
  }

  const handleRemoveBenefit = (index: number) => {
    if (!currentGoal || !currentGoal.benefits) return

    const updatedBenefits = currentGoal.benefits.filter((_, i) => i !== index)
    setCurrentGoal({
      ...currentGoal,
      benefits: updatedBenefits,
    })
  }

  const handleImageUploaded = (url: string) => {
    if (!currentGoal) return

    setCurrentGoal({
      ...currentGoal,
      image_url: url,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentGoal) return

    setIsSaving(true)
    setErrorMessage("")

    try {
      // Ensure slug is set
      if (!currentGoal.slug) {
        currentGoal.slug = generateSlug(currentGoal.title)
      }

      let result

      if (currentGoal.id) {
        // Update existing record
        result = await supabase
          .from("business_goals")
          .update({
            title: currentGoal.title,
            description: currentGoal.description,
            image_url: currentGoal.image_url,
            slug: currentGoal.slug,
            benefits: currentGoal.benefits || [],
          })
          .eq("id", currentGoal.id)
      } else {
        // Insert new record
        result = await supabase.from("business_goals").insert([
          {
            title: currentGoal.title,
            description: currentGoal.description,
            image_url: currentGoal.image_url,
            slug: currentGoal.slug,
            benefits: currentGoal.benefits || [],
          },
        ])
      }

      if (result.error) {
        throw result.error
      }

      // Refresh the data
      await fetchBusinessGoals()

      // Close the form
      setIsEditing(false)
      setCurrentGoal(null)
    } catch (error: any) {
      console.error("Error saving business goal:", error)
      setErrorMessage(error.message || "An error occurred while saving")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this business goal?")) {
      return
    }

    try {
      const { error } = await supabase.from("business_goals").delete().eq("id", id)

      if (error) {
        throw error
      }

      // Refresh the data
      await fetchBusinessGoals()
    } catch (error) {
      console.error("Error deleting business goal:", error)
      alert("Failed to delete business goal")
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
        <h1 className="text-3xl font-bold">Business Goals</h1>
        {!isEditing && (
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Goal
          </Button>
        )}
      </div>

      {isEditing && currentGoal && (
        <div className="mb-8 p-6 border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {currentGoal.id ? "Edit Business Goal" : "Create New Business Goal"}
            </h2>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {errorMessage && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={currentGoal.title} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="slug">Slug (URL-friendly name)</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={currentGoal.slug}
                  onChange={handleChange}
                  placeholder="auto-generated-from-title"
                />
                <p className="text-xs text-muted-foreground mt-1">Leave empty to auto-generate from title</p>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={currentGoal.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Image</Label>
                <ImageUploader
                  defaultImageUrl={currentGoal.image_url}
                  onImageUploaded={(result) => handleImageUploaded(result.url)}
                  folder="business-goals"
                />
              </div>

              <div>
                <Label>Benefits</Label>
                <div className="space-y-2 mt-2">
                  {currentGoal.benefits &&
                    currentGoal.benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={benefit}
                          onChange={(e) => handleBenefitChange(index, e.target.value)}
                          placeholder={`Benefit ${index + 1}`}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveBenefit(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                  <Button type="button" variant="outline" size="sm" onClick={handleAddBenefit}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Benefit
                  </Button>
                </div>
              </div>
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
                ) : currentGoal.id ? (
                  "Update Goal"
                ) : (
                  "Create Goal"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessGoals.length > 0 ? (
          businessGoals.map((goal) => (
            <Card key={goal.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src={goal.image_url || "/placeholder.svg"} alt={goal.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{goal.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{goal.description}</p>

                {goal.benefits && goal.benefits.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {goal.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(goal)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => goal.id && handleDelete(goal.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 border rounded-lg bg-muted/30">
            <p className="text-muted-foreground">No business goals found. Click "Add New Goal" to create one.</p>
          </div>
        )}
      </div>
    </div>
  )
}

