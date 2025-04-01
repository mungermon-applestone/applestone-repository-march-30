import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/optimized-image"

interface ProductTypeCardProps {
  productType: {
    id: string
    name: string
    slug: string
    description?: string
    image_url?: string
  }
}

export function ProductTypeCard({ productType }: ProductTypeCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video relative">
        <OptimizedImage
          src={productType.image_url || "/placeholder.svg?height=200&width=400"}
          alt={productType.name}
          fill
          className="object-cover"
          fallbackSrc="/placeholder.svg?height=200&width=400"
        />
      </div>
      <CardHeader>
        <CardTitle>{productType.name}</CardTitle>
        {productType.description && <CardDescription>{productType.description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow">{/* Additional content can go here */}</CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/products/${productType.slug}`}>View Products</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

