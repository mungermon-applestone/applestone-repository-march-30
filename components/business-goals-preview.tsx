import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase"

// Define the type for our business goals data
interface BusinessGoal {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  benefits?: string[]
}

// Default business goals in case the database is empty
const defaultBusinessGoals: BusinessGoal[] = [
  {
    id: 1,
    slug: "increase-revenue",
    title: "Increase Revenue",
    description: "Boost your vending machine revenue with smart pricing, promotions, and inventory optimization.",
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    slug: "reduce-costs",
    title: "Reduce Costs",
    description: "Cut operational costs with route optimization, remote monitoring, and predictive maintenance.",
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    slug: "improve-customer-experience",
    title: "Improve Customer Experience",
    description: "Enhance customer satisfaction with touchless payments, loyalty programs, and personalized offers.",
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    slug: "expand-operations",
    title: "Expand Operations",
    description: "Scale your vending business with data-driven insights and automated inventory management.",
    image_url: "/placeholder.svg?height=300&width=400",
  },
]

// Fetch business goals from Supabase
async function getBusinessGoals(): Promise<BusinessGoal[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("business_goals").select("*").order("id", { ascending: true }).limit(4)

    if (error || !data || data.length === 0) {
      console.log("No business goals found, using default")
      return defaultBusinessGoals
    }

    return data.map((item) => ({
      id: item.id,
      slug: item.slug || `goal-${item.id}`,
      title: item.title,
      description: item.description,
      image_url: item.image_url || "/placeholder.svg?height=300&width=400",
      benefits: item.benefits || [],
    }))
  } catch (error) {
    console.error("Error fetching business goals:", error)
    return defaultBusinessGoals
  }
}

export async function BusinessGoalsPreview() {
  const businessGoals = await getBusinessGoals()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Achieve Your Business Goals</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our vending machine software helps you achieve your business goals with powerful features and insights.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {businessGoals.map((goal) => (
            <div key={goal.id} className="group relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="aspect-video overflow-hidden rounded-md">
                <Image
                  src={goal.image_url || "/placeholder.svg"}
                  alt={goal.title}
                  width={400}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{goal.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{goal.description}</p>
                <Link
                  href={`/business-goals/${goal.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/business-goals"
            className="inline-flex items-center justify-center rounded-md bg-[#2563EB] px-8 py-3 text-lg font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-[400px] max-w-full"
          >
            View All Business Goals
          </Link>
        </div>
      </div>
    </section>
  )
}

