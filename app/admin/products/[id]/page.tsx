"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { createClientSupabaseClient } from "@/lib/supabase"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  product_type_id: number
  features: string[]
}

interface ProductType {
  id: number
  title: string
  slug: string
}

// Static product data for fallback
const staticProducts: Record<string, Product> = {
  "1": {
    id: 1,
    name: "Smart Grocery Vending Machine",
    description: "Advanced vending solution for grocery items with temperature control and inventory management.",
    price: 5999,
    image_url: "/placeholder.svg?height=600&width=600",
    product_type_id: 1,
    features: ["Temperature Control", "Inventory Management", "Touchscreen Interface"],
  },
  "2": {
    id: 2,
    name: "Compact Vape Dispenser",
    description: "Secure vape product dispenser with age verification and compliance tracking.",
    price: 3499,
    image_url: "/placeholder.svg?height=600&width=600",
    product_type_id: 2,
    features: ["Age Verification", "Compact Design", "Inventory Tracking"],
  },
}

// Static product types for fallback
const staticProductTypes: ProductType[] = [
  { id: 1, title: "Grocery", slug: "grocery" },
  { id: 2, title: "Vape", slug: "vape" },
  { id: 3, title: "Cannabis", slug: "cannabis" },
  { id: 4, title: "Fresh Food", slug: "fresh-food" },
]

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const isNew = params.id === "new"
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    image_url: "/placeholder.svg?height=600&width=600",
    product_type_id: 1,
    features: [],
  })
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [newFeature, setNewFeature] = useState("")

  useEffect(() => {
    async function fetchProductTypes() {
      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase.from("product_types").select("id, title, slug").order("title")

        if (error) {
          console.error("Error fetching product types:", error)
          setProductTypes(staticProductTypes)
        } else {
          setProductTypes(data || staticProductTypes)
        }
      } catch (error) {
        console.error("Error in fetchProductTypes:", error)
        setProductTypes(staticProductTypes)
      }
    }

    async function fetchProduct() {
      if (isNew) {
        setLoading(false)
        return
      }

      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase.from("products").select("*").eq("id", params.id).single()

        if (error) {
          console.error("Error fetching product:", error)
          // Fall back to static data
          const staticData = staticProducts[params.id]
          if (staticData) {
            setProduct(staticData)
          }
        } else if (data) {
          setProduct(data)
        }
      } catch (error) {
        console.error("Error in fetchProduct:", error)
        // Fall back to static data
        const staticData = staticProducts[params.id]
        if (staticData) {
          setProduct(staticData)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProductTypes()
    fetchProduct()
  }, [params.id, isNew])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "price") {
      // Convert to number and handle invalid input
      const numValue = Number.parseFloat(value) || 0
      setProduct((prev) => ({ ...prev, [name]: numValue }))
    } else if (name === "product_type_id") {
      // Convert to number for select
      setProduct((prev) => ({ ...prev, [name]: Number.parseInt(value) }))
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setProduct((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    setProduct((prev) => ({
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
        // Create new product
        const { data, error } = await supabase
          .from("products")
          .insert([
            {
              name: product.name,
              description: product.description,
              price: product.price,
              image_url: product.image_url,
              product_type_id: product.product_type_id,
              features: product.features,
            },
          ])
          .select()

        if (error) {
          console.error("Error creating product:", error)
          alert("Failed to create product. Please try again.")
        } else {
          router.push("/admin/products")
        }
      } else {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update({
            name: product.name,
            description: product.description,
            price: product.price,
            image_url: product.image_url,
            product_type_id: product.product_type_id,
            features: product.features,
          })
          .eq("id", product.id)

        if (error) {
          console.error("Error updating product:", error)
          alert("Failed to update product. Please try again.")
        } else {
          router.push("/admin/products")
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
        <p className="mt-2 text-gray-500">Loading product...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link href="/admin/products" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <h2 className="text-xl font-semibold">{isNew ? "Add New Product" : `Edit ${product.name}`}</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select
                name="product_type_id"
                value={product.product_type_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {productTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image_url"
                value={product.image_url}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
              <div className="flex mb-2">
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
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

