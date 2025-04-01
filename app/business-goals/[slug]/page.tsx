"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, ChevronRight } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useParams, useRouter } from "next/navigation"

// Define the type for our business goal data
interface BusinessGoal {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  benefits?: string[]
}

// Fallback business goals for related content
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

export default function BusinessGoalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const [businessGoal, setBusinessGoal] = useState<BusinessGoal | null>(null)
  const [relatedGoals, setRelatedGoals] = useState<BusinessGoal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    async function fetchData() {
      try {
        // First, try to find the goal in our fallback data
        const fallbackGoal = fallbackBusinessGoals.find((goal) => goal.slug === slug)

        // If we found a matching fallback goal, use it immediately
        if (fallbackGoal) {
          setBusinessGoal(fallbackGoal)

          // Set related goals from fallback data
          const related = fallbackBusinessGoals.filter((goal) => goal.slug !== slug).slice(0, 3)

          setRelatedGoals(related)
        }

        // Simple fetch with a timeout to prevent hanging
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        // Try to fetch from API
        const goalResponse = await fetch(`/api/business-goals/${slug}`, {
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        // If API call was successful, update with API data
        if (goalResponse.ok) {
          const goalData = await goalResponse.json()

          if (goalData) {
            setBusinessGoal(goalData)

            // If we didn't already set fallback related goals
            if (relatedGoals.length === 0) {
              // Set related goals from fallback data
              const related = fallbackBusinessGoals.filter((goal) => goal.slug !== slug).slice(0, 3)

              setRelatedGoals(related)
            }
          }
        } else {
          // If API call failed but we have fallback data, show a warning
          if (fallbackGoal) {
            setError("Using fallback data due to connection issues.")
          } else {
            // If API call failed and we don't have fallback data, show an error
            throw new Error("Business goal not found")
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err)

        // If we already set a fallback goal, just show a warning
        if (businessGoal) {
          setError("Using fallback data due to connection issues.")
        } else {
          // Otherwise show the full error
          setError(err instanceof Error ? err.message : "Failed to load business goal")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center" style={{ minHeight: "60vh" }}>
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!businessGoal) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Business Goal Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || "The business goal you're looking for doesn't exist."}</p>
          <Button onClick={() => router.push("/business-goals")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Business Goals
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          {error && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Link
                  href="/business-goals"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Back to Business Goals
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{businessGoal.title}</h1>
                <p className="text-muted-foreground md:text-xl">{businessGoal.description}</p>
              </div>

              {businessGoal.benefits && businessGoal.benefits.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Key Benefits</h2>
                  <ul className="space-y-2">
                    {businessGoal.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button size="lg" asChild>
                  <Link href="/request-demo">Request Demo</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src={businessGoal.image_url || "/placeholder.svg?height=400&width=600"}
                alt={businessGoal.title}
                width={600}
                height={400}
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Content Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">Related Solutions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedGoals.length > 0
              ? relatedGoals.map((relatedGoal) => (
                  <Link
                    href={`/business-goals/${relatedGoal.slug}`}
                    key={relatedGoal.id}
                    className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={relatedGoal.image_url || "/placeholder.svg?height=300&width=400"}
                        alt={relatedGoal.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{relatedGoal.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{relatedGoal.description}</p>
                      <div className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                        Learn more <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))
              : // Fallback if no related goals are available
                [1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg overflow-hidden bg-card">
                    <div className="aspect-video relative">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Related solution"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Related Solution {i}</h3>
                      <p className="text-sm text-muted-foreground">This is a placeholder for a related solution.</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  )
}

