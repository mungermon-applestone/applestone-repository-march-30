import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    benefits: ["Smart Pricing", "Targeted Promotions", "Inventory Optimization"],
  },
  {
    id: 2,
    slug: "reduce-costs",
    title: "Reduce Costs",
    description: "Cut operational costs with route optimization, remote monitoring, and predictive maintenance.",
    image_url: "/placeholder.svg?height=300&width=400",
    benefits: ["Route Optimization", "Remote Monitoring", "Predictive Maintenance"],
  },
  {
    id: 3,
    slug: "improve-customer-experience",
    title: "Improve Customer Experience",
    description: "Enhance customer satisfaction with touchless payments, loyalty programs, and personalized offers.",
    image_url: "/placeholder.svg?height=300&width=400",
    benefits: ["Touchless Payments", "Loyalty Programs", "Personalized Offers"],
  },
  {
    id: 4,
    slug: "expand-operations",
    title: "Expand Operations",
    description: "Scale your vending business with data-driven insights and automated inventory management.",
    image_url: "/placeholder.svg?height=300&width=400",
    benefits: ["Data-Driven Insights", "Automated Inventory", "Scalable Infrastructure"],
  },
]

// Fetch business goals from Supabase
async function getBusinessGoals(): Promise<BusinessGoal[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("business_goals").select("*").order("id", { ascending: true })

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

export default async function BusinessGoalsPage() {
  const businessGoals = await getBusinessGoals()

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Achieve Your Business Goals
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our vending machine software helps you achieve your business goals with powerful features and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Goals Grid */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
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
                  {goal.benefits && goal.benefits.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {goal.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                              ✓
                            </div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Achieve Your Goals?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Contact us today to learn how our vending machine software can help you achieve your business goals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/request-demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

