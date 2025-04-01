import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase"

interface ProductType {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  features: string[]
  long_description?: string
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
  grocery: {
    id: 1,
    slug: "grocery",
    title: "Grocery",
    description: "Sell grocery items through automated retail with inventory management and freshness tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Freshness Tracking", "Inventory Management", "Temperature Control"],
    long_description:
      "Our Grocery vending solutions enable retailers to sell fresh and packaged grocery items through automated retail channels. With advanced inventory management and freshness tracking, you can ensure your customers always receive quality products. Temperature control features maintain optimal conditions for perishable items.",
  },
  vape: {
    id: 2,
    slug: "vape",
    title: "Vape",
    description: "Age verification and compliance features for vape product sales through automated retail.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Age Verification", "Compliance Tracking", "Inventory Management"],
    long_description:
      "Our Vape vending solutions include robust age verification systems to ensure regulatory compliance. The platform tracks all sales for compliance reporting and manages inventory efficiently to prevent stockouts of popular products.",
  },
  cannabis: {
    id: 3,
    slug: "cannabis",
    title: "Cannabis",
    description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Age Verification", "Compliance Tracking", "Secure Storage"],
    long_description:
      "Our Cannabis vending solutions provide secure, compliant automated retail for cannabis products. With comprehensive age verification, compliance tracking, and secure storage, you can confidently expand your cannabis retail operations.",
  },
  "fresh-food": {
    id: 4,
    slug: "fresh-food",
    title: "Fresh Food",
    description: "Temperature monitoring and freshness tracking for perishable food items.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Temperature Control", "Freshness Tracking", "Inventory Management"],
    long_description:
      "Our Fresh Food vending solutions maintain optimal temperature conditions for perishable items. Real-time monitoring ensures food safety and quality, while smart inventory management reduces waste and ensures freshness.",
  },
}

// Static product data for fallback
const staticProducts: Product[] = [
  {
    id: 1,
    name: "Smart Grocery Vending Machine",
    description: "Advanced vending solution for grocery items with temperature control and inventory management.",
    price: 5999,
    image_url: "/placeholder.svg?height=300&width=400",
    product_type_id: 1,
  },
  {
    id: 2,
    name: "Compact Vape Dispenser",
    description: "Secure vape product dispenser with age verification and compliance tracking.",
    price: 3499,
    image_url: "/placeholder.svg?height=300&width=400",
    product_type_id: 2,
  },
  {
    id: 3,
    name: "Cannabis Retail Kiosk",
    description: "Secure, compliant cannabis retail kiosk with age verification and inventory tracking.",
    price: 6999,
    image_url: "/placeholder.svg?height=300&width=400",
    product_type_id: 3,
  },
  {
    id: 4,
    name: "Fresh Food Vending Solution",
    description: "Temperature-controlled vending solution for fresh food items.",
    price: 7499,
    image_url: "/placeholder.svg?height=300&width=400",
    product_type_id: 4,
  },
]

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
      return staticProducts.filter((p) => p.product_type_id === productTypeId)
    }

    return data
  } catch (error) {
    console.error("Error in getProductsByType:", error)
    return staticProducts.filter((p) => p.product_type_id === productTypeId)
  }
}

export default async function ProductTypePage({ params }: { params: { slug: string } }) {
  const productType = await getProductType(params.slug)

  if (!productType) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Type Not Found</h1>
        <p className="mb-8">The product type you're looking for doesn't exist or has been removed.</p>
        <Link href="/product-types" className="text-blue-600 hover:underline">
          Browse all product types
        </Link>
      </div>
    )
  }

  const products = await getProductsByType(productType.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="relative aspect-video">
          <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>}>
            <Image
              src={productType.image_url || "/placeholder.svg?height=400&width=600"}
              alt={productType.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </Suspense>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{productType.title}</h1>
          <p className="text-lg mb-6">{productType.description}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {productType.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {productType.long_description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About {productType.title} Solutions</h2>
              <p className="text-gray-700">{productType.long_description}</p>
            </div>
          )}

          <Link
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium"
          >
            Request More Information
          </Link>
        </div>
      </div>

      {products.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">{productType.title} Products</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={product.image_url || "/placeholder.svg?height=300&width=400"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 text-sm mb-3">{product.description}</p>
                    <div className="text-blue-600 font-bold">${product.price.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

