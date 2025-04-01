"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"

interface ProductType {
  id: number
  slug: string
  title: string
  description: string
}

export default function ProductTypesPage() {
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchProductTypes() {
      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase
          .from("product_types")
          .select("id, slug, title, description")
          .order("title")

        if (error) {
          console.error("Error fetching product types:", error)
          // Fallback to static data
          setProductTypes([
            {
              id: 1,
              slug: "grocery",
              title: "Grocery",
              description:
                "Sell grocery items through automated retail with inventory management and freshness tracking.",
            },
            {
              id: 2,
              slug: "vape",
              title: "Vape",
              description: "Age verification and compliance features for vape product sales through automated retail.",
            },
            {
              id: 3,
              slug: "cannabis",
              title: "Cannabis",
              description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
            },
            {
              id: 4,
              slug: "fresh-food",
              title: "Fresh Food",
              description: "Temperature monitoring and freshness tracking for perishable food items.",
            },
          ])
        } else {
          setProductTypes(data || [])
        }
      } catch (error) {
        console.error("Error in fetchProductTypes:", error)
        // Fallback to static data
        setProductTypes([
          {
            id: 1,
            slug: "grocery",
            title: "Grocery",
            description:
              "Sell grocery items through automated retail with inventory management and freshness tracking.",
          },
          {
            id: 2,
            slug: "vape",
            title: "Vape",
            description: "Age verification and compliance features for vape product sales through automated retail.",
          },
          {
            id: 3,
            slug: "cannabis",
            title: "Cannabis",
            description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
          },
          {
            id: 4,
            slug: "fresh-food",
            title: "Fresh Food",
            description: "Temperature monitoring and freshness tracking for perishable food items.",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProductTypes()
  }, [])

  const filteredProductTypes = productTypes.filter(
    (productType) =>
      productType.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      productType.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product type?")) {
      return
    }

    try {
      const supabase = createClientSupabaseClient()
      const { error } = await supabase.from("product_types").delete().eq("id", id)

      if (error) {
        console.error("Error deleting product type:", error)
        alert("Failed to delete product type. Please try again.")
      } else {
        setProductTypes(productTypes.filter((pt) => pt.id !== id))
      }
    } catch (error) {
      console.error("Error in handleDelete:", error)
      alert("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product Types</h2>
        <Link
          href="/admin/product-types/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search product types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2 text-gray-500">Loading product types...</p>
        </div>
      ) : filteredProductTypes.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No product types found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProductTypes.map((productType) => (
                <tr key={productType.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{productType.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2">{productType.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{productType.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/admin/product-types/${productType.slug}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button onClick={() => handleDelete(productType.id)} className="text-red-600 hover:text-red-900">
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

