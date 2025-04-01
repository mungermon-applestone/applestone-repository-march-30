import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase"

interface ProductType {
  id: number
  name: string
  slug: string
  description: string
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  product_type_id: number
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

// Static products data for fallback
const staticProducts: Record<number, Product[]> = {
  1: [
    {
      id: 1,
      name: "Smart Vending Machine",
      description: "Our flagship smart vending machine with touchscreen interface and cashless payment options.",
      price: 3999.99,
      image_url: "/placeholder.svg?height=300&width=300",
      product_type_id: 1,
    },
    {
      id: 2,
      name: "Compact Vending Solution",
      description: "A smaller vending machine perfect for offices and small spaces.",
      price: 2499.99,
      image_url: "/placeholder.svg?height=300&width=300",
      product_type_id: 1,
    },
  ],
  2: [
    {
      id: 3,
      name: "Cashless Payment Terminal",
      description: "Accept credit cards, mobile payments, and more with this versatile payment terminal.",
      price: 799.99,
      image_url: "/placeholder.svg?height=300&width=300",
      product_type_id: 2,
    },
    {
      id: 4,
      name: "Mobile Payment Integration Kit",
      description: "Add mobile payment capabilities to your existing vending machines.",
      price: 349.99,
      image_url: "/placeholder.svg?height=300&width=300",
      product_type_id: 2,
    },
  ],
  3: [
    {
      id: 5,
      name: "Temperature Control Module",
      description: "Keep products at the optimal temperature with this advanced cooling system.",
      price: 599.99,
      image_url: "/placeholder.svg?height=300&width=300",
      product_type_id: 3,
    },
    {
      id: 6,
      name: "Inventory Management System",
      description: "Track inventory levels and get alerts when products need restocking.",
      price: 449.99,
      image_url: "/placeholder.svg?height=300&width=300",
      product_type_id: 3,
    },
  ],
}

async function getProductType(slug: string) {
  try {
    const supabase = createServerSupabaseClient()

    // First try to fetch by slug
    let { data, error } = await supabase.from("product_types").select("*").eq("slug", slug).single()

    // If not found by slug and it's numeric, try by ID
    if ((error || !data) && !isNaN(Number.parseInt(slug))) {
      const result = await supabase.from("product_types").select("*").eq("id", Number.parseInt(slug)).single()

      if (!result.error && result.data) {
        data = result.data
        error = null
      }
    }

    if (error) {
      console.error("Error fetching product type:", error)
      return staticProductTypes[slug] || null
    }

    return data
  } catch (error) {
    console.error("Error in getProductType:", error)
    return staticProductTypes[slug] || null
  }
}

async function getProductsByType(productTypeId: number) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("products").select("*").eq("product_type_id", productTypeId)

    if (error) {
      console.error("Error fetching products by type:", error)
      return staticProducts[productTypeId] || []
    }

    return data
  } catch (error) {
    console.error("Error in getProductsByType:", error)
    return staticProducts[productTypeId] || []
  }
}

export default async function ProductTypePage({ params }: { params: { slug: string } }) {
  const productType = await getProductType(params.slug)

  if (!productType) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Category Not Found</h1>
        <p className="mb-8">The product category you're looking for doesn't exist or has been removed.</p>
        <Link href="/products" className="text-blue-600 hover:underline">
          View All Products
        </Link>
      </div>
    )
  }

  const products = await getProductsByType(productType.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Products
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">{productType.name}</h1>
        <p className="text-lg text-gray-700 max-w-3xl">{productType.description}</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative aspect-square">
                  <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse"></div>}>
                    <Image
                      src={product.image_url || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </Suspense>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600">{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <p className="text-blue-600 font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

