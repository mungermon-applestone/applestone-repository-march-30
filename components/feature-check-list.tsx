import { Check } from "lucide-react"

interface FeatureCheckListProps {
  features: string[]
}

export function FeatureCheckList({ features }: FeatureCheckListProps) {
  return (
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <div className="mr-3 mt-1">
            <Check className="h-5 w-5 text-primary" />
          </div>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  )
}

