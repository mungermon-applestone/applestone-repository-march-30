import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

interface ProductType {
  id: number
  name: string
  slug: string
  description: string
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  product_type_id: number
}

// Static product types data
const staticProductTypes: ProductType[] = [
  {
    id: 1,
    name: "Vending Machines",
    slug: "vending-machines",
    description: "Smart vending machines with advanced features and customization options.",
  },
  {
    id: 2,
    name: "Payment Systems",
    slug: "payment-systems",
    description: "Cashless payment solutions for vending machines and retail.",
  },
  {
    id: 3,
    name: "Accessories",
    slug: "accessories",
    description: "Add-ons and accessories for vending machines and payment systems.",
  },
]

// Static products data
const staticProducts: Product[] = [
  {
    id: 1,
    name: "Smart Vending Machine",
    description: "Our flagship smart vending machine with touchscreen interface and cashless payment options.",
    price: 3999.99,
    image_url: "/placeholder.svg?height=300&width=300",
    product_type_id: 1,
  },
  {
    id: 2,
    name: "Compact Vending Solution",
    description: "A smaller vending machine perfect for offices and small spaces.",
    price: 2499.99,
    image_url: "/placeholder.svg?height=300&width=300",
    product_type_id: 1,
  },
  {
    id: 3,
    name: "Cashless Payment Terminal",
    description: "Accept credit cards, mobile payments, and more with this versatile payment terminal.",
    price: 799.99,
    image_url: "/placeholder.svg?height=300&width=300",
    product_type_id: 2,
  },
  {
    id: 4,
    name: "Mobile Payment Integration Kit",
    description: "Add mobile payment capabilities to your existing vending machines.",
    price: 349.99,
    image_url: "/placeholder.svg?height=300&width=300",
    product_type_id: 2,
  },
  {
    id: 5,
    name: "Temperature Control Module",
    description: "Keep products at the optimal temperature with this advanced cooling system.",
    price: 599.99,
    image_url: "/placeholder.svg?height=300&width=300",
    product_type_id: 3,
  },
  {
    id: 6,
    name: "Inventory Management System",
    description: "Track inventory levels and get alerts when products need restocking.",
    price: 449.99,
    image_url: "/placeholder.svg?height=300&width=300",
    product_type_id: 3,
  },
]

export default function ProductsPage() {
  const productTypes = staticProductTypes
  const products = staticProducts

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Explore our range of innovative vending machines, payment systems, and accessories.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productTypes.map((type) => (
            <Link key={type.id} href={`/product-types/${type.slug}`} className="group">
              <div className="bg-white rounded-lg shadow-sm p-6 transition-shadow hover:shadow-md h-full">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{type.name}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md h-full flex flex-col">
                <div className="relative aspect-square">
                  <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse"></div>}>
                    <Image
                      src={product.image_url || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </Suspense>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 flex-1">{product.description}</p>
                  <p className="text-blue-600 font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

