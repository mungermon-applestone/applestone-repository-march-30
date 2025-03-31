"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define the type for our product type data
interface ProductType {
  id: number
  slug: string
  name: string
  description: string
  image_url: string
  features?: string[]
}

// Default product types
const productTypes: ProductType[] = [
  {
    id: 1,
    slug: "grocery",
    name: "Grocery",
    description: "Sell grocery items through automated retail with inventory management and freshness tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Freshness Tracking", "Inventory Management", "Temperature Control"],
  },
  {
    id: 2,
    slug: "vape",
    name: "Vape",
    description: "Age verification and compliance features for vape product sales through automated retail.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Age Verification", "Compliance Tracking", "Inventory Management"],
  },
  {
    id: 3,
    slug: "cannabis",
    name: "Cannabis",
    description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Age Verification", "Compliance Tracking", "Secure Storage"],
  },
  {
    id: 4,
    slug: "fresh-food",
    name: "Fresh Food",
    description: "Temperature monitoring and freshness tracking for perishable food items.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Temperature Control", "Freshness Tracking", "Inventory Management"],
  },
  {
    id: 5,
    slug: "beverages",
    name: "Beverages",
    description: "Hot and cold drink vending options with temperature control and inventory management.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Temperature Control", "Multiple Sizes", "Energy Efficient"],
  },
  {
    id: 6,
    slug: "snacks",
    name: "Snacks",
    description: "Traditional snack vending solutions with inventory management and sales tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["High Capacity", "Multiple Sizes", "Sales Tracking"],
  },
]

// Product Card Component
function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background">
      <div className="aspect-video overflow-hidden">
        <Image
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="mb-4">
          <span className="text-2xl font-bold block">{product.name}</span>
        </div>
        <p className="text-gray-600">{product.description}</p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-4 inline-flex items-center text-sm font-medium text-blue-600"
        >
          Learn more <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export default function ProductsNewPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container px-4 md:px-6 py-12">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Product Types</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore the different types of products you can sell through our vending machine software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productTypes.map((productType) => (
              <ProductCard key={productType.id} product={productType} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Contact us today to learn more about our vending solutions for your specific product type.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/request-demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

