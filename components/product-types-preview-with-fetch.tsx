"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { ProductType } from "@/types/database"

// Static fallback data
const fallbackProductTypes: ProductType[] = [
  {
    id: 1,
    slug: "grocery",
    title: "Grocery",
    description: "Sell grocery items through automated retail with inventory management and freshness tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    slug: "vape",
    title: "Vape",
    description: "Age verification and compliance features for vape product sales through automated retail.",
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    slug: "cannabis",
    title: "Cannabis",
    description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    slug: "fresh-food",
    title: "Fresh Food",
    description: "Temperature monitoring and freshness tracking for perishable food items.",
    image_url: "/placeholder.svg?height=300&width=400",
  },
]

export function ProductTypesPreviewWithFetch() {
  const [productTypes, setProductTypes] = useState<ProductType[]>(fallbackProductTypes)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProductTypes() {
      try {
        const response = await fetch("/api/product-types/all")

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()

        // Only update state if we got valid data
        if (Array.isArray(data) && data.length > 0) {
          setProductTypes(data)
        } else {
          console.warn("Using fallback data: API returned empty or invalid data")
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Failed to fetch product types:", err)
        setError("Failed to load product types. Using fallback data.")
        setIsLoading(false)
      }
    }

    fetchProductTypes()
  }, [])

  if (isLoading) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 flex justify-center items-center" style={{ minHeight: "400px" }}>
          <LoadingSpinner size="large" />
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Types of Products You Can Sell
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our vending software can sell many types of products and can be used by vending operators, enterprises,
              SMBs, and brands.
            </p>
            {error && <p className="text-amber-600 text-sm mt-2">{error}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {productTypes.map((product) => (
            <div key={product.id} className="group relative overflow-hidden rounded-lg border bg-background">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={product.image_url || "/placeholder.svg?height=300&width=400"}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{product.title}</h3>
                </div>
                <p className="text-gray-600">{product.description}</p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-blue-600"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button size="lg" className="w-[400px] max-w-full">
            <Link href="/products">View All Product Types</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

