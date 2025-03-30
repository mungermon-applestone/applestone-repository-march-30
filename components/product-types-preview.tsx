import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabase"

// Define the type for our product type data
interface ProductType {
  id: number
  title: string
  description: string
  image_url: string
  slug: string
}

// Fetch product types from Supabase
async function getProductTypes(): Promise<ProductType[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("product_types").select("*").order("id", { ascending: true }).limit(4)

    if (error || !data) {
      console.log("Error fetching product types or no data found")
      return []
    }

    return data.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      image_url: product.image_url || "/placeholder.svg?height=300&width=400",
      slug: product.slug,
    }))
  } catch (error) {
    console.error("Error fetching product types:", error)
    return []
  }
}

export async function ProductTypesPreview() {
  const productTypes = await getProductTypes()

  // If no product types are found, use default data
  const displayProducts =
    productTypes.length > 0
      ? productTypes
      : [
          {
            id: 1,
            title: "Grocery",
            description:
              "Sell grocery items through automated retail with inventory management and freshness tracking.",
            image_url: "/placeholder.svg?height=300&width=400",
            slug: "grocery",
          },
          {
            id: 2,
            title: "Vape",
            description: "Age verification and compliance features for vape product sales through automated retail.",
            image_url: "/placeholder.svg?height=300&width=400",
            slug: "vape",
          },
          {
            id: 3,
            title: "Cannabis",
            description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
            image_url: "/placeholder.svg?height=300&width=400",
            slug: "cannabis",
          },
          {
            id: 4,
            title: "Fresh Food",
            description: "Temperature monitoring and freshness tracking for perishable food items.",
            image_url: "/placeholder.svg?height=300&width=400",
            slug: "fresh-food",
          },
        ]

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 py-8">
          {displayProducts.map((product) => (
            <div key={product.id} className="group relative overflow-hidden rounded-lg border bg-background">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{product.title}</h3>
                <p className="mt-2 text-muted-foreground">{product.description}</p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/products">View All Product Types</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

