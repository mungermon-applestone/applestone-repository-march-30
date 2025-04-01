"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Plus, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createClientSupabaseClient } from "@/lib/supabase"

interface ProductType {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  features: string[]
  long_description?: string
}

// Static product data for fallback
const staticProductTypes: Record<string, ProductType> = {
  "1": {
    id: 1,
    slug: "grocery",
    title: "Grocery",
    description: "Sell grocery items through automated retail with inventory management and freshness tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Freshness Tracking", "Inventory Management", "Temperature Control"],
    long_description:
      "Our Grocery vending solutions enable retailers to sell fresh and packaged grocery items through automated retail channels. With advanced inventory management and freshness tracking, you can ensure your customers always receive quality products. Temperature control features maintain optimal conditions for perishable items.",
  },
  "2": {
    id: 2,
    slug: "vape",
    title: "Vape",
    description: "Age verification and compliance features for vape product sales through automated retail.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Age Verification", "Compliance Tracking", "Inventory Management"],
    long_description:
      "Our Vape vending solutions include robust age verification systems to ensure regulatory compliance. The platform tracks all sales for compliance reporting and manages inventory efficiently to prevent stockouts of popular products.",
  },
  "3": {
    id: 3,
    slug: "cannabis",
    title: "Cannabis",
    description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Age Verification", "Compliance Tracking", "Secure Storage"],
    long_description:
      "Our Cannabis vending solutions provide secure, compliant automated retail for cannabis products. With comprehensive age verification, compliance tracking, and secure storage, you can confidently expand your cannabis retail operations.",
  },
  "4": {
    id: 4,
    slug: "fresh-food",
    title: "Fresh Food",
    description: "Temperature monitoring and freshness tracking for perishable food items.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Temperature Control", "Freshness Tracking", "Inventory Management"],
    long_description:
      "Our Fresh Food vending solutions maintain optimal temperature conditions for perishable items. Real-time monitoring ensures food safety and quality, while smart inventory management reduces waste and ensures freshness.",
  },
}

export default function EditProductTypePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const isNew = params.id === "new"
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [productType, setProductType] = useState<ProductType>({
    id: 0,
    slug: "",
    title: "",
    description: "",
    image_url: "/placeholder.svg?height=300&width=400",
    features: [],
    long_description: "",
  })
  const [newFeature, setNewFeature] = useState("")

  useEffect(() => {
    async function fetchProductType() {
      if (isNew) {
        setLoading(false)
        return
      }

      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase.from("product_types").select("*").eq("id", params.id).single()

        if (error) {
          console.error("Error fetching product type:", error)
          // Fall back to static data
          const staticData = staticProductTypes[params.id]
          if (staticData) {
            setProductType(staticData)
          }
        } else if (data) {
          setProductType(data)
        }
      } catch (error) {
        console.error("Error in fetchProductType:", error)
        // Fall back to static data
        const staticData = staticProductTypes[params.id]
        if (staticData) {
          setProductType(staticData)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProductType()
  }, [params.id, isNew])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductType((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setProductType((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    setProductType((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const supabase = createClientSupabaseClient()

      if (isNew) {
        // Create new product type
        const { data, error } = await supabase
          .from("product_types")
          .insert([
            {
              slug: productType.slug,
              title: productType.title,
              description: productType.description,
              image_url: productType.image_url,
              features: productType.features,
              long_description: productType.long_description,
            },
          ])
          .select()

        if (error) {
          console.error("Error creating product type:", error)
          alert("Failed to create product type. Please try again.")
        } else {
          router.push("/admin/product-types")
        }
      } else {
        // Update existing product type
        const { error } = await supabase
          .from("product_types")
          .update({
            slug: productType.slug,
            title: productType.title,
            description: productType.description,
            image_url: productType.image_url,
            features: productType.features,
            long_description: productType.long_description,
          })
          .eq("id", productType.id)

        if (error) {
          console.error("Error updating product type:", error)
          alert("Failed to update product type. Please try again.")
        } else {
          router.push("/admin/product-types")
        }
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error)
      alert("An unexpected error occurred. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        <p className="mt-2 text-gray-500">Loading product type...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link href="/admin/product-types" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <h2 className="text-xl font-semibold">{isNew ? "Add New Product Type" : `Edit ${productType.title}`}</h2>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={productType.title}
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
                value={productType.slug}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={productType.description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
              <textarea
                name="long_description"
                value={productType.long_description || ""}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image_url"
                value={productType.image_url}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
              <div className="flex">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a feature"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {productType.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

