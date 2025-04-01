"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Trash2, Plus } from "lucide-react"

interface ProductType {
  id: number
  name: string
  slug: string
  description: string
}

// Static product type data
const staticProductTypes: ProductType[] = [
  {
    id: 1,
    name: "Vending Machines",
    slug: "vending-machines",
    description: "Smart vending machines with advanced features and customization options.",
  },
  {
    id: 2,
    name: "Payment Systems",
    slug: "payment-systems",
    description: "Cashless payment solutions for vending machines and retail.",
  },
  {
    id: 3,
    name: "Accessories",
    slug: "accessories",
    description: "Add-ons and accessories for vending machines and payment systems.",
  },
]

export default function AdminProductTypesPage() {
  const [productTypes] = useState<ProductType[]>(staticProductTypes)
  const [deleting, setDeleting] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product type? This action cannot be undone.")) {
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
        <h2 className="text-xl font-semibold">Product Categories</h2>
        <Link
          href="/admin/product-types/new"
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productTypes.map((type) => (
              <tr key={type.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{type.name}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{type.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{type.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/admin/product-types/${type.slug}`} className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(type.id)}
                      disabled={deleting === type.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {deleting === type.id ? (
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

