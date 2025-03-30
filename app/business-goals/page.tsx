import { createServerSupabaseClient } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Define the type for our business goal data
interface BusinessGoal {
  id: number
  title: string
  description: string
  image_url: string
  slug: string
}

// Fetch all business goals from Supabase
async function getAllBusinessGoals(): Promise<BusinessGoal[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("business_goals").select("*").order("title", { ascending: true })

    if (error || !data) {
      console.log("Error fetching business goals or no data found")
      return []
    }

    return data
  } catch (error) {
    console.error("Error fetching business goals:", error)
    return []
  }
}

export default async function BusinessGoalsPage() {
  const businessGoals = await getAllBusinessGoals()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Business Goals</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover how our vending machine software can help you achieve your business goals.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {businessGoals.map((goal) => (
          <Link
            key={goal.id}
            href={`/business-goals/${goal.slug}`}
            className="group block overflow-hidden rounded-lg border bg-background hover:shadow-md transition-shadow"
          >
            <div className="aspect-video overflow-hidden">
              <Image
                src={goal.image_url || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(goal.title)}`}
                alt={goal.title}
                width={400}
                height={300}
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
              <p className="text-muted-foreground line-clamp-3">{goal.description}</p>
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

