import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  product_type_id: number
  features: string[]
}

// Static product data
const staticProducts: Record<string, Product> = {
  "1": {
    id: 1,
    name: "Smart Vending Machine",
    description: "Our flagship smart vending machine with touchscreen interface and cashless payment options.",
    price: 3999.99,
    image_url: "/placeholder.svg?height=400&width=400",
    product_type_id: 1,
    features: ["Touchscreen", "Cashless Payment", "Remote Monitoring", "Inventory Tracking"],
  },
  "2": {
    id: 2,
    name: "Compact Vending Solution",
    description: "A smaller vending machine perfect for offices and small spaces.",
    price: 2499.99,
    image_url: "/placeholder.svg?height=400&width=400",
    product_type_id: 1,
    features: ["Space Efficient", "Energy Saving", "Digital Display", "Multiple Payment Options"],
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = staticProducts[params.id]

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/products" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>}>
            <Image
              src={product.image_url || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              fill
              className="object-contain rounded-lg"
              priority
            />
          </Suspense>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-6">${product.price.toFixed(2)}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md">Contact Sales</button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

