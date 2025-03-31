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

interface ProductType {
  id?: number
  title: string
  description: string
  image_url: string
  slug: string
  features?: string[]
}

export default function ProductTypesPage() {
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [currentProductType, setCurrentProductType] = useState<ProductType | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const supabase = createClientSupabaseClient()

  useEffect(() => {
    fetchProductTypes()
  }, [])

  async function fetchProductTypes() {
    setIsLoading(true)

    try {
      const { data, error } = await supabase.from("product_types").select("*").order("id", { ascending: true })

      if (error) {
        throw error
      }

      setProductTypes(data || [])
    } catch (error) {
      console.error("Error fetching product types:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateNew = () => {
    setCurrentProductType({
      title: "",
      description: "",
      image_url: "/placeholder.svg?height=300&width=400",
      slug: "",
      features: [],
    })
    setIsEditing(true)
    setErrorMessage("")
  }

  const handleEdit = (productType: ProductType) => {
    setCurrentProductType({ ...productType })
    setIsEditing(true)
    setErrorMessage("")
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentProductType(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProductType) return

    const { name, value } = e.target
    setCurrentProductType({ ...currentProductType, [name]: value })

    // Auto-generate slug from title if slug is empty
    if (name === "title" && (!currentProductType.slug || currentProductType.slug === "")) {
      setCurrentProductType({
        ...currentProductType,
        title: value,
        slug: generateSlug(value),
      })
    }
  }

  const handleFeatureChange = (index: number, value: string) => {
    if (!currentProductType || !currentProductType.features) return

    const updatedFeatures = [...currentProductType.features]
    updatedFeatures[index] = value

    setCurrentProductType({
      ...currentProductType,
      features: updatedFeatures,
    })
  }

  const handleAddFeature = () => {
    if (!currentProductType) return

    const features = currentProductType.features || []
    setCurrentProductType({
      ...currentProductType,
      features: [...features, ""],
    })
  }

  const handleRemoveFeature = (index: number) => {
    if (!currentProductType || !currentProductType.features) return

    const updatedFeatures = currentProductType.features.filter((_, i) => i !== index)
    setCurrentProductType({
      ...currentProductType,
      features: updatedFeatures,
    })
  }

  const handleImageUploaded = (url: string) => {
    if (!currentProductType) return

    setCurrentProductType({
      ...currentProductType,
      image_url: url,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentProductType) return

    setIsSaving(true)
    setErrorMessage("")

    try {
      // Ensure slug is set
      if (!currentProductType.slug) {
        currentProductType.slug = generateSlug(currentProductType.title)
      }

      let result

      if (currentProductType.id) {
        // Update existing record
        result = await supabase
          .from("product_types")
          .update({
            title: currentProductType.title,
            description: currentProductType.description,
            image_url: currentProductType.image_url,
            slug: currentProductType.slug,
            features: currentProductType.features || [],
          })
          .eq("id", currentProductType.id)
      } else {
        // Insert new record
        result = await supabase.from("product_types").insert([
          {
            title: currentProductType.title,
            description: currentProductType.description,
            image_url: currentProductType.image_url,
            slug: currentProductType.slug,
            features: currentProductType.features || [],
          },
        ])
      }

      if (result.error) {
        throw result.error
      }

      // Refresh the data
      await fetchProductTypes()

      // Close the form
      setIsEditing(false)
      setCurrentProductType(null)
    } catch (error: any) {
      console.error("Error saving product type:", error)
      setErrorMessage(error.message || "An error occurred while saving")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product type?")) {
      return
    }

    try {
      const { error } = await supabase.from("product_types").delete().eq("id", id)

      if (error) {
        throw error
      }

      // Refresh the data
      await fetchProductTypes()
    } catch (error) {
      console.error("Error deleting product type:", error)
      alert("Failed to delete product type")
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
        <h1 className="text-3xl font-bold">Product Types</h1>
        {!isEditing && (
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Product Type
          </Button>
        )}
      </div>

      {isEditing && currentProductType && (
        <div className="mb-8 p-6 border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {currentProductType.id ? "Edit Product Type" : "Create New Product Type"}
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
                <Input id="title" name="title" value={currentProductType.title} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="slug">Slug (URL-friendly name)</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={currentProductType.slug}
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
                value={currentProductType.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Image</Label>
                <ImageUploader
                  defaultImageUrl={currentProductType.image_url}
                  onImageUploaded={(result) => handleImageUploaded(result.url)}
                  folder="product-types"
                />
              </div>

              <div>
                <Label>Features</Label>
                <div className="space-y-2 mt-2">
                  {currentProductType.features &&
                    currentProductType.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder={`Feature ${index + 1}`}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveFeature(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                  <Button type="button" variant="outline" size="sm" onClick={handleAddFeature}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
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
                ) : currentProductType.id ? (
                  "Update Product Type"
                ) : (
                  "Create Product Type"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productTypes.length > 0 ? (
          productTypes.map((productType) => (
            <Card key={productType.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={productType.image_url || "/placeholder.svg"}
                  alt={productType.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{productType.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{productType.description}</p>

                {productType.features && productType.features.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {productType.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(productType)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => productType.id && handleDelete(productType.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 border rounded-lg bg-muted/30">
            <p className="text-muted-foreground">No product types found. Click "Add New Product Type" to create one.</p>
          </div>
        )}
      </div>
    </div>
  )
}

