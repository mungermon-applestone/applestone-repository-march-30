import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabase"

// Define the type for our business goal data
interface BusinessGoal {
  id: number
  title: string
  description: string
  image_url: string
  slug: string
}

// Fetch business goals from Supabase
async function getBusinessGoals(): Promise<BusinessGoal[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("business_goals").select("*").order("id", { ascending: true }).limit(4)

    if (error || !data) {
      console.log("Error fetching business goals or no data found")
      return []
    }

    return data.map((goal) => ({
      id: goal.id,
      title: goal.title,
      description: goal.description,
      image_url: goal.image_url || "/placeholder.svg?height=300&width=400",
      slug: goal.slug,
    }))
  } catch (error) {
    console.error("Error fetching business goals:", error)
    return []
  }
}

export async function BusinessGoalsPreview() {
  const businessGoals = await getBusinessGoals()

  // If no business goals are found, use default data
  const displayGoals =
    businessGoals.length > 0
      ? businessGoals
      : [
          {
            id: 1,
            title: "Increase Revenue",
            description:
              "Boost your vending machine revenue with smart pricing, promotions, and inventory optimization.",
            image_url: "/placeholder.svg?height=300&width=400",
            slug: "increase-revenue",
          },
          {
            id: 2,
            title: "Reduce Costs",
            description:
              "Cut operational costs with route optimization, remote monitoring, and predictive maintenance.",
            image_url: "/placeholder.svg?height=300&width=400",
            slug: "reduce-costs",
          },
          {
            id: 3,
            title: "Improve Customer Experience",
            description:
              "Enhance customer satisfaction with touchless payments, loyalty programs, and personalized offers.",
            image_url: "/placeholder.svg?height=300&width=400",
            slug: "improve-customer-experience",
          },
          {
            id: 4,
            title: "Expand Operations",
            description: "Scale your vending business with data-driven insights and automated inventory management.",
            image_url: "/placeholder.svg?height=300&width=400",
            slug: "expand-operations",
          },
        ]

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 py-8">
          {displayGoals.map((goal) => (
            <div key={goal.id} className="group relative overflow-hidden rounded-lg border bg-background">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={goal.image_url || "/placeholder.svg"}
                  alt={goal.title}
                  width={400}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{goal.title}</h3>
                <p className="mt-2 text-muted-foreground">{goal.description}</p>
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
          <Button size="lg" asChild>
            <Link href="/business-goals">View All Business Goals</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

