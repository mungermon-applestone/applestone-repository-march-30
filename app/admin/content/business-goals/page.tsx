"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle, XCircle, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface BusinessGoal {
  id?: number
  slug: string
  title: string
  description: string
  image_url: string
  benefits?: string[]
}

export default function BusinessGoalsPage() {
  const [businessGoals, setBusinessGoals] = useState<BusinessGoal[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [editingGoal, setEditingGoal] = useState<BusinessGoal | null>(null)

  const router = useRouter()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    fetchBusinessGoals()
  }, [])

  async function fetchBusinessGoals() {
    setLoading(true)

    try {
      const { data, error } = await supabase.from("business_goals").select("*").order("id", { ascending: true })

      if (error) {
        throw error
      }

      setBusinessGoals(data || [])
    } catch (error) {
      console.error("Error fetching business goals:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditGoal = (goal: BusinessGoal) => {
    setEditingGoal({ ...goal, benefits: goal.benefits || [] })
    setSaveStatus(null)
    setErrorMessage("")
  }

  const handleNewGoal = () => {
    setEditingGoal({
      slug: "",
      title: "",
      description: "",
      image_url: "/placeholder.svg?height=300&width=400",
      benefits: [],
    })
    setSaveStatus(null)
    setErrorMessage("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (editingGoal) {
      setEditingGoal((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleBenefitChange = (index: number, value: string) => {
    if (editingGoal && editingGoal.benefits) {
      const newBenefits = [...editingGoal.benefits]
      newBenefits[index] = value
      setEditingGoal({ ...editingGoal, benefits: newBenefits })
    }
  }

  const addBenefit = () => {
    if (editingGoal) {
      const benefits = editingGoal.benefits || []
      setEditingGoal({ ...editingGoal, benefits: [...benefits, ""] })
    }
  }

  const removeBenefit = (index: number) => {
    if (editingGoal && editingGoal.benefits) {
      const newBenefits = editingGoal.benefits.filter((_, i) => i !== index)
      setEditingGoal({ ...editingGoal, benefits: newBenefits })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingGoal) return

    setSaving(true)
    setSaveStatus(null)
    setErrorMessage("")

    try {
      // Generate slug if empty
      if (!editingGoal.slug) {
        editingGoal.slug = editingGoal.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-")
      }

      let result

      if (editingGoal.id) {
        // Update existing record
        result = await supabase
          .from("business_goals")
          .update({
            slug: editingGoal.slug,
            title: editingGoal.title,
            description: editingGoal.description,
            image_url: editingGoal.image_url,
            benefits: editingGoal.benefits,
          })
          .eq("id", editingGoal.id)
      } else {
        // Insert new record
        result = await supabase.from("business_goals").insert([
          {
            slug: editingGoal.slug,
            title: editingGoal.title,
            description: editingGoal.description,
            image_url: editingGoal.image_url,
            benefits: editingGoal.benefits,
          },
        ])
      }

      if (result.error) {
        throw result.error
      }

      setSaveStatus(true)
      fetchBusinessGoals()

      // Close the form after successful save
      setTimeout(() => {
        setEditingGoal(null)
      }, 1500)
    } catch (error: any) {
      console.error("Error saving business goal:", error)
      setErrorMessage(error.message || "An error occurred while saving")
      setSaveStatus(false)
    } finally {
      setSaving(false)
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

      fetchBusinessGoals()
    } catch (error) {
      console.error("Error deleting business goal:", error)
      alert("Failed to delete business goal")
    }
  }

  const handleImageSelect = () => {
    // Open a new window to the image upload page
    window.open("/admin/images", "_blank")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Business Goals</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/content")}>
            Back to Content
          </Button>
          <Button onClick={handleNewGoal}>
            <Plus className="h-4 w-4 mr-2" /> Add New Goal
          </Button>
        </div>
      </div>

      {editingGoal ? (
        <div className="bg-muted/30 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingGoal.id ? `Edit: ${editingGoal.title}` : "Create New Business Goal"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={editingGoal.title} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL-friendly name)</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={editingGoal.slug}
                  onChange={handleChange}
                  placeholder="auto-generated-if-empty"
                />
                <p className="text-xs text-muted-foreground">Leave empty to auto-generate from title</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={editingGoal.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image_url"
                  name="image_url"
                  value={editingGoal.image_url}
                  onChange={handleChange}
                  required
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={handleImageSelect}>
                  Select Image
                </Button>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Image Preview:</p>
                <Image
                  src={editingGoal.image_url || "/placeholder.svg"}
                  alt="Preview"
                  width={200}
                  height={150}
                  className="rounded-md object-cover border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Benefits</Label>
              {editingGoal.benefits &&
                editingGoal.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      placeholder={`Benefit ${index + 1}`}
                      className="flex-1"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeBenefit(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
                <Plus className="h-4 w-4 mr-2" /> Add Benefit
              </Button>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                {saveStatus === true && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Saved successfully!</span>
                  </div>
                )}

                {saveStatus === false && (
                  <div className="flex items-center text-red-600">
                    <XCircle className="h-4 w-4 mr-2" />
                    <span>{errorMessage || "Save failed"}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setEditingGoal(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {businessGoals.length > 0 ? (
          businessGoals.map((goal) => (
            <div key={goal.id} className="border rounded-lg overflow-hidden bg-card">
              <div className="aspect-video relative">
                <Image src={goal.image_url || "/placeholder.svg"} alt={goal.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{goal.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>

                {goal.benefits && goal.benefits.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Benefits:</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {goal.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleEditGoal(goal)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => goal.id && handleDelete(goal.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 border rounded-lg bg-muted/30">
            <p className="text-muted-foreground">No business goals found. Click "Add New Goal" to create one.</p>
          </div>
        )}
      </div>
    </div>
  )
}

