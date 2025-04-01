import { cn } from "@/lib/utils"

interface Feature {
  title: string
  description: string
  icon?: string
}

interface FeatureListProps {
  features: Feature[]
  className?: string
}

/**
 * A component that renders a list of features with titles and descriptions
 */
export function FeatureList({ features, className }: FeatureListProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <h3 className="font-medium">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

