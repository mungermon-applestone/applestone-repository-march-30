import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase"

// Define the type for our product type data
interface ProductType {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  features?: string[]
}

// Default product types in case the database is empty
const defaultProductTypes: ProductType[] = [
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

// Fetch product types from Supabase
async function getProductTypes(): Promise<ProductType[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("product_types").select("*").order("id", { ascending: true }).limit(4)

    if (error || !data || data.length === 0) {
      console.log("No product types found, using default")
      return defaultProductTypes
    }

    return data.map((item) => ({
      id: item.id,
      slug: item.slug || `product-${item.id}`,
      title: item.title,
      description: item.description,
      image_url: item.image_url || "/placeholder.svg?height=300&width=400",
      features: item.features || [],
    }))
  } catch (error) {
    console.error("Error fetching product types:", error)
    return defaultProductTypes
  }
}

export async function ProductTypesPreview() {
  const productTypes = await getProductTypes()

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
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {productTypes.map((productType) => (
            <div key={productType.id} className="group relative overflow-hidden rounded-lg border bg-background">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={productType.image_url || "/placeholder.svg"}
                  alt={productType.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{productType.title}</h3>
                </div>
                <p className="text-gray-600">{productType.description}</p>
                <Link
                  href={`/products/${productType.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-blue-600"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-md bg-[#2563EB] px-8 py-3 text-lg font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-[400px] max-w-full"
          >
            View All Product Types
          </Link>
        </div>
      </div>
    </section>
  )
}

