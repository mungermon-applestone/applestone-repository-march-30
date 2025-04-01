import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  product_type_id: number
  features: string[]
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

async function getProduct(id: string) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching product:", error)
      return staticProducts[id] || null
    }

    return data
  } catch (error) {
    console.error("Error in getProduct:", error)
    return staticProducts[id] || null
  }
}

async function getProductType(id: number) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("product_types").select("title, slug").eq("id", id).single()

    if (error) {
      console.error("Error fetching product type:", error)
      // Return a default based on ID
      const types = {
        1: { title: "Grocery", slug: "grocery" },
        2: { title: "Vape", slug: "vape" },
        3: { title: "Cannabis", slug: "cannabis" },
        4: { title: "Fresh Food", slug: "fresh-food" },
      }
      return types[id as keyof typeof types] || { title: "Unknown", slug: "unknown" }
    }

    return data
  } catch (error) {
    console.error("Error in getProductType:", error)
    // Return a default based on ID
    const types = {
      1: { title: "Grocery", slug: "grocery" },
      2: { title: "Vape", slug: "vape" },
      3: { title: "Cannabis", slug: "cannabis" },
      4: { title: "Fresh Food", slug: "fresh-food" },
    }
    return types[id as keyof typeof types] || { title: "Unknown", slug: "unknown" }
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/products" className="text-blue-600 hover:underline">
          Browse all products
        </Link>
      </div>
    )
  }

  const productType = await getProductType(product.product_type_id)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square">
          <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>}>
            <Image
              src={product.image_url || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </Suspense>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <Link
            href={`/product-types/${productType.slug}`}
            className="inline-block mb-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {productType.title}
          </Link>

          <div className="text-2xl font-bold mb-6 text-blue-600">${product.price.toLocaleString()}</div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="list-disc pl-5 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md text-center font-medium"
            >
              Request Quote
            </Link>
            <Link
              href="/demo"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-md text-center font-medium"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

