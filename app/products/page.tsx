import Link from "next/link"
import Image from "next/image"

// Static product data to ensure we always have content
const productTypes = [
  {
    id: 1,
    slug: "grocery",
    title: "Grocery",
    description: "Sell grocery items through automated retail with inventory management and freshness tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Freshness Tracking", "Inventory Management", "Temperature Control"],
  },
  {
    id: 2,
    slug: "vape",
    title: "Vape",
    description: "Age verification and compliance features for vape product sales through automated retail.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Age Verification", "Compliance Tracking", "Inventory Management"],
  },
  {
    id: 3,
    slug: "cannabis",
    title: "Cannabis",
    description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Age Verification", "Compliance Tracking", "Secure Storage"],
  },
  {
    id: 4,
    slug: "fresh-food",
    title: "Fresh Food",
    description: "Temperature monitoring and freshness tracking for perishable food items.",
    image_url: "/placeholder.svg?height=300&width=400",
    features: ["Temperature Control", "Freshness Tracking", "Inventory Management"],
  },
]

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Product Solutions</h1>
        <p className="text-xl text-gray-600">Specialized Vending Solutions for Every Industry</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productTypes.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <Image src={product.image_url || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <ul className="mb-4 space-y-1">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/products/${product.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

