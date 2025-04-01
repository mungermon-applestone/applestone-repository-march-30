import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { SectionHeader } from "@/components/section-header"
import { FeatureCheckList } from "@/components/feature-check-list"
import { CallToAction } from "@/components/call-to-action"

// Keep using [slug] here as this is a different route pattern from admin/product-types/[id]
// The error occurs when the same route pattern uses different parameter names

interface ProductType {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  features: string[]
  long_description?: string
}

// Static product data for fallback
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Try to get product type from database or fallback to static data
  const productType = await getProductType(params.slug)

  if (!productType) {
    return {
      title: "Product Type Not Found",
      description: "The requested product type could not be found.",
    }
  }

  return {
    title: `${productType.title} Vending Solutions`,
    description: productType.description,
  }
}

async function getProductType(slug: string): Promise<ProductType | null> {
  try {
    const supabase = createServerSupabaseClient()

    // First try to fetch by slug
    const { data, error } = await supabase.from("product_types").select("*").eq("slug", slug).single()

    if (error || !data) {
      // Fallback to static data
      return staticProductTypes[slug] || null
    }

    return data
  } catch (error) {
    console.error("Error fetching product type:", error)
    // Fallback to static data
    return staticProductTypes[slug] || null
  }
}

export default async function ProductTypePage({ params }: { params: { slug: string } }) {
  const productType = await getProductType(params.slug)

  if (!productType) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/product-types" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Product Types
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <SectionHeader title={productType.title} subtitle="Vending Solutions" alignment="left" />
          <p className="text-lg mb-6">{productType.description}</p>
          {productType.long_description && <p className="mb-6">{productType.long_description}</p>}
          <FeatureCheckList features={productType.features} />
          <div className="mt-8">
            <CallToAction text="Request a Quote" href="/contact" variant="primary" />
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={productType.image_url || "/placeholder.svg?height=400&width=600"}
            alt={productType.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </main>
  )
}

