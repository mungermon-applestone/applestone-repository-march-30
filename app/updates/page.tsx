"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/content-utils"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"

// Define the type for our updates data
interface Update {
  id: number
  title: string
  excerpt: string
  content?: string
  date: string
  category: string
  slug: string
  image_url?: string
}

// Fallback updates in case the fetch fails
const fallbackUpdates: Update[] = [
  {
    id: 1,
    title: "New Mobile App Features Released",
    excerpt: "We've added new features to our mobile app to help you manage your vending machines on the go.",
    content:
      "Our latest mobile app update includes real-time inventory tracking, push notifications for low stock alerts, and a new dashboard for quick performance insights. Download the latest version today!",
    date: "2023-11-15",
    category: "Product Update",
    slug: "mobile-app-features",
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "AppleStone Solutions Expands to European Market",
    excerpt: "We're excited to announce our expansion into the European market with new offices in London and Berlin.",
    content:
      "After years of success in North America, we're bringing our vending machine software solutions to Europe. Our new offices in London and Berlin will serve as hubs for our European operations, allowing us to better serve our growing customer base in the region.",
    date: "2023-10-22",
    category: "Company News",
    slug: "european-expansion",
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Introducing Temperature Monitoring for Refrigerated Machines",
    excerpt:
      "Our new temperature monitoring feature helps ensure your refrigerated products stay at the optimal temperature.",
    content:
      "With our new temperature monitoring feature, you can track the temperature of your refrigerated vending machines in real-time. Set custom alerts for temperature fluctuations and view historical temperature data to ensure your products are always stored safely.",
    date: "2023-09-18",
    category: "Product Update",
    slug: "temperature-monitoring",
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "Partnership with PayQuick for Faster Payment Processing",
    excerpt:
      "We've partnered with PayQuick to offer faster and more secure payment processing for your vending machines.",
    content:
      "Our new partnership with PayQuick brings industry-leading payment processing to our platform. Customers will enjoy faster transactions, and operators will benefit from lower processing fees and quicker deposits. This integration is available to all customers starting next month.",
    date: "2023-08-05",
    category: "Partnership",
    slug: "payquick-partnership",
    image_url: "/placeholder.svg?height=300&width=400",
  },
]

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUpdates() {
      try {
        // Simple fetch with a timeout to prevent hanging
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch("/api/updates", {
          signal: controller.signal,
          next: { revalidate: 3600 }, // Cache for 1 hour
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`Failed to fetch updates: ${response.status}`)
        }

        const data = await response.json()

        if (data && Array.isArray(data) && data.length > 0) {
          setUpdates(data)
        } else {
          // If no data or empty array, use fallback data
          setUpdates(fallbackUpdates)
        }
      } catch (err) {
        console.error("Error fetching updates:", err)
        setError("Failed to load updates. Using fallback data.")
        // Use fallback data on error
        setUpdates(fallbackUpdates)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUpdates()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <PageHeader
        pageKey="updates"
        defaultTitle="Updates & News"
        defaultDescription="Stay up to date with the latest product updates, company news, and industry insights."
      />

      {/* Updates List */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center items-center" style={{ minHeight: "400px" }}>
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <>
              {error && <p className="text-amber-600 text-sm mb-4">{error}</p>}

              {updates.length > 0 ? (
                <div className="grid gap-8">
                  {updates.map((update) => (
                    <div key={update.id} className="group relative overflow-hidden rounded-lg border bg-background p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {update.image_url && (
                          <div className="md:w-1/4">
                            <div className="aspect-video relative rounded-md overflow-hidden">
                              <Image
                                src={update.image_url || "/placeholder.svg"}
                                alt={update.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}
                        <div className={update.image_url ? "md:w-3/4" : "w-full"}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {update.category}
                            </span>
                            <span className="text-xs text-muted-foreground">{formatDate(update.date)}</span>
                          </div>
                          <h3 className="text-2xl font-bold mb-2">{update.title}</h3>
                          <p className="text-muted-foreground mb-4">{update.excerpt}</p>
                          <Link
                            href={`/updates/${update.slug}`}
                            className="inline-flex items-center text-sm font-medium text-primary"
                          >
                            Read more
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="ml-1 h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">No updates found. Check back later for news and updates.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Subscribe to Our Newsletter</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get the latest updates delivered directly to your inbox.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

