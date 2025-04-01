import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { SectionHeader } from "@/components/section-header"
import { CallToAction } from "@/components/call-to-action"

// This is using [id] which is fine as it's a different route pattern from product-types/[slug]

interface Product {
  id: number
  name: string
  description: string
  image_url: string
  features?: string[]
  product_type?: string
  price?: string
}

// Static product data for fallback
const staticProducts: Record<string, Product> = {
  "1": {
    id: 1,
    name: "Smart Vending Machine",
    description: "Our flagship smart vending machine with touchscreen interface and remote monitoring.",
    image_url: "/placeholder.svg?height=400&width=600",
    features: ["Touchscreen Interface", "Remote Monitoring", "Cashless Payment", "Inventory Tracking"],
    product_type: "vape",
    price: "Contact for pricing",
  },
  "2": {
    id: 2,
    name: "Compact Vending Solution",
    description: "Space-saving vending solution perfect for small retail spaces.",
    image_url: "/placeholder.svg?height=400&width=600",
    features: ["Space-Efficient Design", "Customizable Shelving", "Digital Payment", "Cloud Connectivity"],
    product_type: "grocery",
    price: "Starting at $3,999",
  },
  "3": {
    id: 3,
    name: "High-Capacity Vending System",
    description: "Large-capacity vending system for high-traffic locations.",
    image_url: "/placeholder.svg?height=400&width=600",
    features: [
      "High Capacity Storage",
      "Multiple Temperature Zones",
      "Advanced Analytics",
      "Automated Restocking Alerts",
    ],
    product_type: "fresh-food",
    price: "Contact for pricing",
  },
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Try to get product from database or fallback to static data
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: product.name,
    description: product.description,
  }
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error || !data) {
      // Fallback to static data
      return staticProducts[id] || null
    }

    return data
  } catch (error) {
    console.error("Error fetching product:", error)
    // Fallback to static data
    return staticProducts[id] || null
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/products" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Products
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <SectionHeader
            title={product.name}
            subtitle={
              product.product_type
                ? `${product.product_type.charAt(0).toUpperCase() + product.product_type.slice(1)} Vending Solution`
                : "Vending Solution"
            }
            alignment="left"
          />
          <p className="text-lg mb-6">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.price && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-1">Pricing</h3>
              <p className="text-lg">{product.price}</p>
            </div>
          )}

          <div className="mt-8">
            <CallToAction text="Request a Quote" href="/contact" variant="primary" />
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg?height=400&width=600"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </main>
  )
}

