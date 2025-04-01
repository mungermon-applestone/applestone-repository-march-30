"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, Trash2, Plus } from "lucide-react"

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

// Static product data
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

// Static product types
const staticProductTypes: Record<number, string> = {
  1: "Vending Machines",
  2: "Payment Systems",
  3: "Accessories",
}

export default function AdminProductsPage() {
  const [products] = useState<Product[]>(staticProducts)
  const [productTypes] = useState<Record<number, string>>(staticProductTypes)
  const [deleting, setDeleting] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      setDeleting(id)

      // Simulate API call
      setTimeout(() => {
        setDeleting(null)
      }, 1000)
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
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
    </div>
  )
}

