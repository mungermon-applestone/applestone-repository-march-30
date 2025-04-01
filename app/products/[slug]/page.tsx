import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"

interface ProductType {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  features: string[]
  long_description?: string
  benefits?: string[]
}

// Static product data to ensure we always have fallback content
const productData: Record<string, ProductType> = {
  grocery: {
    id: 1,
    slug: "grocery",
    title: "Grocery",
    description: "Sell grocery items through automated retail with inventory management and freshness tracking.",
    image_url: "/placeholder.svg?height=600&width=800",
    features: ["Freshness Tracking", "Inventory Management", "Temperature Control"],
    long_description:
      "Our Grocery vending solutions enable retailers to sell fresh and packaged grocery items through automated retail channels. With advanced inventory management and freshness tracking, you can ensure your customers always receive quality products. Temperature control features maintain optimal conditions for perishable items.",
  },
  vape: {
    id: 2,
    slug: "vape",
    title: "Vape",
    description: "Age verification and compliance features for vape product sales through automated retail.",
    image_url: "/placeholder.svg?height=600&width=800",
    features: ["Age Verification", "Compliance Tracking", "Inventory Management"],
    long_description:
      "Our Vape vending solutions include robust age verification systems to ensure regulatory compliance. The platform tracks all sales for compliance reporting and manages inventory efficiently to prevent stockouts of popular products.",
  },
  cannabis: {
    id: 3,
    slug: "cannabis",
    title: "Cannabis",
    description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
    image_url: "/placeholder.svg?height=600&width=800",
    features: ["Age Verification", "Compliance Tracking", "Secure Storage"],
    long_description:
      "Our Cannabis vending solutions provide secure, compliant automated retail for cannabis products. With comprehensive age verification, compliance tracking, and secure storage, you can confidently expand your cannabis retail operations.",
  },
  "fresh-food": {
    id: 4,
    slug: "fresh-food",
    title: "Fresh Food",
    description: "Temperature monitoring and freshness tracking for perishable food items.",
    image_url: "/placeholder.svg?height=600&width=800",
    features: ["Temperature Control", "Freshness Tracking", "Inventory Management"],
    long_description:
      "Our Fresh Food vending solutions maintain optimal temperature conditions for perishable items. Real-time monitoring ensures food safety and quality, while smart inventory management reduces waste and ensures freshness.",
  },
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  // Get the product directly from our static data
  const product = productData[params.slug]

  // If product not found, return 404
  if (!product) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title} Vending Solutions</h1>
          <p className="text-lg mb-6">{product.description}</p>
          <p className="mb-8">{product.long_description}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              Request Demo
            </Link>
            <Link
              href="/technology"
              className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-md transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={`${product.title} Vending Solution`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Key Features</h2>
          <p className="text-xl text-gray-600">Why Choose Our {product.title} Solution</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-3 mt-1">
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {product.benefits && (
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Benefits</h2>
            <p className="text-xl text-gray-600">Advantages of {product.title} Automated Retail</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/products"
            className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-md transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  )
}

