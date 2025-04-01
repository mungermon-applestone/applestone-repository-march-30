"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, Trash2, Plus } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"

interface Product {
  id: number
  name: string
  price: number
  image_url: string
  product_type_id: number
}

interface ProductType {
  id: number
  name: string
}

// Static product data for fallback
const staticProducts: Product[] = [
  {
    id: 1,
    name: "Smart Vending Machine",
    price: 3999.99,
    image_url: "/placeholder.svg?height=100&width=100",
    product_type_id: 1,
  },
  {
    id: 2,
    name: "Compact Vending Solution",
    price: 2499.99,
    image_url: "/placeholder.svg?height=100&width=100",
    product_type_id: 1,
  },
]

// Static product types for fallback
const staticProductTypes: Record<number, string> = {
  1: "Vending Machines",
  2: "Payment Systems",
  3: "Accessories",
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [productTypes, setProductTypes] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    async function fetchProductTypes() {
      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase.from("product_types").select("id, name")

        if (error) {
          console.error("Error fetching product types:", error)
          setProductTypes(staticProductTypes)
        } else if (data) {
          const typesMap: Record<number, string> = {}
          data.forEach((type: ProductType) => {
            typesMap[type.id] = type.name
          })
          setProductTypes(typesMap)
        }
      } catch (error) {
        console.error("Error in fetchProductTypes:", error)
        setProductTypes(staticProductTypes)
      }
    }

    async function fetchProducts() {
      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase
          .from("products")
          .select("id, name, price, image_url, product_type_id")
          .order("name")

        if (error) {
          console.error("Error fetching products:", error)
          setProducts(staticProducts)
        } else {
          setProducts(data || staticProducts)
        }
      } catch (error) {
        console.error("Error in fetchProducts:", error)
        setProducts(staticProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProductTypes()
    fetchProducts()
  }, [])

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      setDeleting(id)

      try {
        const supabase = createClientSupabaseClient()
        const { error } = await supabase.from("products").delete().eq("id", id)

        if (error) {
          console.error("Error deleting product:", error)
          alert("Failed to delete product. Please try again.")
        } else {
          setProducts((prev) => prev.filter((product) => product.id !== id))
        }
      } catch (error) {
        console.error("Error in handleDelete:", error)
        alert("An unexpected error occurred. Please try again.")
      } finally {
        setDeleting(null)
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Products</h2>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2 text-gray-500">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No products found.</p>
          <Link href="/admin/products/new" className="mt-4 inline-block text-blue-600 hover:underline">
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          src={product.image_url || "/placeholder.svg?height=100&width=100"}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{productTypes[product.product_type_id] || "Unknown"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/admin/products/${product.id}`} className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleting === product.id}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        {deleting === product.id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-600 border-t-transparent"></div>
                        ) : (
                          <Trash2 className="h-5 w-5" />
                        )}
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

