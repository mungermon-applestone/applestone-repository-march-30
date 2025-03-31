import { createServerSupabaseClient } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { unstable_noStore as noStore } from "next/cache"

// Define the type for our product type data
interface ProductType {
  id: number
  title: string
  description: string
  image_url: string
  slug: string
}

// Fetch all product types from Supabase
async function getAllProductTypes(): Promise<ProductType[]> {
  // Disable caching
  noStore()

  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("product_types").select("*").order("title", { ascending: true })

    if (error || !data) {
      console.log("Error fetching product types or no data found")
      return []
    }

    return data
  } catch (error) {
    console.error("Error fetching product types:", error)
    return []
  }
}

export default async function ProductTypesPage() {
  const productTypes = await getAllProductTypes()

  return (
    <>
      <PageHeader
        pageKey="products"
        defaultTitle="Product Types"
        defaultDescription="Explore the different types of products you can sell through our vending machine software."
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productTypes.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block overflow-hidden rounded-lg border bg-background hover:shadow-md transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={
                    product.image_url ||
                    `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(product.title)}`
                  }
                  alt={product.title}
                  width={400}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-muted-foreground line-clamp-3">{product.description}</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

