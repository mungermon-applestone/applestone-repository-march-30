import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BadgeProps {
  text: string
  variant?: "basic" | "premium" | "enterprise" | "default"
}

interface ProductCardProps {
  title: string
  description: string
  imageUrl?: string
  learnMoreUrl: string
  badge?: BadgeProps
}

export function ProductCard({
  title,
  description,
  imageUrl = "/placeholder.svg?height=300&width=400",
  learnMoreUrl,
  badge,
}: ProductCardProps) {
  const getBadgeClasses = (variant = "default") => {
    switch (variant) {
      case "basic":
        return "bg-green-100 text-green-800"
      case "premium":
        return "bg-yellow-100 text-yellow-800"
      case "enterprise":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="aspect-video overflow-hidden rounded-md">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{title}</h3>
          {badge && (
            <span className={`text-xs px-3 py-1 rounded-full ${getBadgeClasses(badge.variant)}`}>{badge.text}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Link href={learnMoreUrl} className="mt-4 inline-flex items-center text-sm font-medium text-blue-600">
          Learn more <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

