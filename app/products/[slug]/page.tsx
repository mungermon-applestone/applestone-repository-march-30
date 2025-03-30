import { createServerSupabaseClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Define the type for our product type data
interface ProductType {
  id: number
  title: string
  description: string
  image_url: string
  slug: string
}

// Fetch a specific product type from Supabase
async function getProductType(slug: string): Promise<ProductType | null> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("product_types").select("*").eq("slug", slug).single()

    if (error || !data) {
      console.log("Error fetching product type or no data found")
      return null
    }

    return data
  } catch (error) {
    console.error("Error fetching product type:", error)
    return null
  }
}

export default async function ProductTypePage({ params }: { params: { slug: string } }) {
  const productType = await getProductType(params.slug)

  if (!productType) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/products" className="inline-flex items-center text-sm mb-8 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all product types
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Image
            src={
              productType.image_url ||
              `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(productType.title)}`
            }
            alt={productType.title}
            width={800}
            height={600}
            className="rounded-lg object-cover w-full"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{productType.title}</h1>

          <div className="mb-8">
            <p className="text-muted-foreground">{productType.description}</p>
          </div>

          <Button size="lg" asChild>
            <Link href="/request-demo">Request a Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

