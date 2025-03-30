import { createServerSupabaseClient } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

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
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Types of Products You Can Sell
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our vending software can sell many types of products and can be used by vending operators,
                  enterprises, SMBs, and brands.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">Request a Demo</Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Various products in vending machines"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Product Types Grid */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-8">
            {productTypes.map((product) => (
              <div key={product.id} className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
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
                    href={`/products/${product.id}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary"
                  >
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Special Features Section */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Special Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our software includes specialized features to help you sell any product type effectively.
              </p>
            </div>
          </div>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  width={100}
                  height={100}
                  alt="Age verification"
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Age Verification</h3>
              <p className="text-muted-foreground">
                Secure age verification for age-restricted products like vape, alcohol, and cannabis with multiple
                verification methods.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  width={100}
                  height={100}
                  alt="Temperature control"
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Temperature Control</h3>
              <p className="text-muted-foreground">
                Advanced temperature monitoring and control for fresh food, beverages, and other perishable items to
                ensure quality.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  width={100}
                  height={100}
                  alt="Inventory management"
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
              <p className="text-muted-foreground">
                Real-time inventory tracking with expiration date monitoring and automatic reordering capabilities.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Form Section */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="text-muted-foreground md:text-xl">
                  Contact us to learn more about how our software can help you sell any product type through automated
                  retail.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="first-name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      First name
                    </label>
                    <input
                      id="first-name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="last-name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Last name
                    </label>
                    <input
                      id="last-name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us about your needs"
                  ></textarea>
                </div>
                <Button size="lg" className="w-full">
                  Submit Request
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Contact us"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section> */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Product Types</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore the different types of products you can sell through our vending machine software.
        </p>
      </div>

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
                  product.image_url || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(product.title)}`
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
  )
}

