import { Card, CardContent } from "@/components/ui/card"
import { OptimizedImage } from "@/components/optimized-image"
import { cn } from "@/lib/utils"

interface TestimonialProps {
  quote: string
  author: string
  role?: string
  company?: string
  imageSrc?: string
  className?: string
}

export function Testimonial({ quote, author, role, company, imageSrc, className = "" }: TestimonialProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {imageSrc && (
            <div className="flex-shrink-0">
              <OptimizedImage
                src={imageSrc}
                alt={`${author}'s photo`}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
          )}

          <div className="flex-1">
            <blockquote className="text-lg italic mb-4">"{quote}"</blockquote>
            <div className="font-semibold">{author}</div>
            {(role || company) && (
              <div className="text-sm text-muted-foreground">
                {role}
                {role && company && ", "}
                {company}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

