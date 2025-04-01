"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoadingFallback } from "@/components/loading-fallback"
import { AlertMessage } from "@/components/alert-message"
import { PageHeader } from "@/components/page-header"
import { OptimizedImage } from "@/components/optimized-image"
import { useFetchData } from "@/hooks/use-fetch-data"

// Define the type for our business goals data
interface BusinessGoal {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  benefits?: string[]
}

// Fallback business goals in case the fetch fails
const fallbackBusinessGoals: BusinessGoal[] = [
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

export default function BusinessGoalsPage() {
  const {
    data: businessGoals,
    isLoading,
    error,
    retry,
  } = useFetchData<BusinessGoal[]>({
    url: "/api/business-goals/all",
    fallbackData: fallbackBusinessGoals,
  })

  if (isLoading) {
    return (
      <>
        <PageHeader
          pageKey="business-goals"
          defaultTitle="Achieve Your Business Goals"
          defaultDescription="Our vending machine software helps you achieve your business goals with powerful features and insights."
        />
        <div className="container px-4 md:px-6 py-8">
          <LoadingFallback minHeight="400px" />
        </div>
      </>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <PageHeader
        pageKey="business-goals"
        defaultTitle="Achieve Your Business Goals"
        defaultDescription="Our vending machine software helps you achieve your business goals with powerful features and insights."
      />

      {/* Business Goals Grid */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          {error && <AlertMessage type="warning" message={error} className="mb-6" onRetry={retry} dismissible />}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {businessGoals.map((goal) => (
              <div key={goal.id} className="group relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="aspect-video overflow-hidden rounded-md">
                  <OptimizedImage
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

