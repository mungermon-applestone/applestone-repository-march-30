"use client"

import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string
  image_url: string
  price: number
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg overflow-hidden bg-card">
          <div className="aspect-video relative">
            <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

