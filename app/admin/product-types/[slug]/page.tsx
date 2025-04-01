"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { createClientSupabaseClient } from "@/lib/supabase"

interface ProductType {
  id: number
  name: string
  slug: string
  description: string
}

// Static product type data for fallback
const staticProductTypes: Record<string, ProductType> = {
  "vending-machines": {
    id: 1,
    name: "Vending Machines",
    slug: "vending-machines",
    description: "Smart vending machines with advanced features and customization options.",
  },
  "payment-systems": {
    id: 2,
    name: "Payment Systems",
    slug: "payment-systems",
    description: "Cashless payment solutions for vending machines and retail.",
  },
  accessories: {
    id: 3,
    name: "Accessories",
    slug: "accessories",
    description: "Add-ons and accessories for vending machines and payment systems.",
  },
}

export default function EditProductTypePage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const isNew = params.slug === "new"
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [productType, setProductType] = useState<ProductType>({
    id: 0,
    name: "",
    slug: "",
    description: "",
  })

  useEffect(() => {
    async function fetchProductType() {
      if (isNew) {
        setLoading(false)
        return
      }

      try {
        const supabase = createClientSupabaseClient()

        // First try to fetch by slug
        let { data, error } = await supabase.from("product_types").select("*").eq("slug", params.slug).single()

        // If not found by slug and it's numeric, try by ID
        if ((error || !data) && !isNaN(Number.parseInt(params.slug))) {
          const result = await supabase
            .from("product_types")
            .select("*")
            .eq("id", Number.parseInt(params.slug))
            .single()

          if (!result.error && result.data) {
            data = result.data
            error = null
          }
        }

        if (error) {
          console.error("Error fetching product type:", error)
          // Fall back to static data
          const staticData = staticProductTypes[params.slug]
          if (staticData) {
            setProductType(staticData)
          }
        } else if (data) {
          setProductType(data)
        }
      } catch (error) {
        console.error("Error in fetchProductType:", error)
        // Fall back to static data
        const staticData = staticProductTypes[params.slug]
        if (staticData) {
          setProductType(staticData)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProductType()
  }, [params.slug, isNew])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductType((prev) => ({ ...prev, [name]: value }))
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
              name: productType.name,
              slug: productType.slug,
              description: productType.description,
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
            name: productType.name,
            slug: productType.slug,
            description: productType.description,
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
          <h2 className="text-xl font-semibold">{isNew ? "Add New Product Type" : `Edit ${productType.name}`}</h2>
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
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={productType.name}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={productType.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

