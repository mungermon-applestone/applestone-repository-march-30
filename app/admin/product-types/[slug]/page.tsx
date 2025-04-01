"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface ProductType {
  id: number
  name: string
  slug: string
  description: string
}

// Static product type data
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
  const [saving, setSaving] = useState(false)
  const [productType, setProductType] = useState<ProductType>(
    isNew
      ? {
          id: 0,
          name: "",
          slug: "",
          description: "",
        }
      : staticProductTypes[params.slug] || {
          id: 0,
          name: "",
          slug: "",
          description: "",
        },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductType((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      router.push("/admin/product-types")
    }, 1000)
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

