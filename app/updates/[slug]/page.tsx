"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useParams, useRouter } from "next/navigation"
import { formatDate } from "@/lib/content-utils"

// Define the type for our update data
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

export default function UpdateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const [update, setUpdate] = useState<Update | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    async function fetchUpdateDetail() {
      try {
        // Simple fetch with a timeout to prevent hanging
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch(`/api/updates/${slug}`, {
          signal: controller.signal,
          next: { revalidate: 3600 }, // Cache for 1 hour
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Update not found")
          }
          throw new Error(`Failed to fetch update: ${response.status}`)
        }

        const data = await response.json()

        if (data) {
          setUpdate(data)
        } else {
          throw new Error("Update not found")
        }
      } catch (err) {
        console.error("Error fetching update:", err)
        setError(err instanceof Error ? err.message : "Failed to load update")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUpdateDetail()
  }, [slug])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center" style={{ minHeight: "60vh" }}>
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (error || !update) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">{error || "Update not found"}</p>
          <Button onClick={() => router.push("/updates")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Updates
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/updates"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Updates
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary">{update.category}</span>
            <span className="text-sm text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(update.date)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{update.title}</h1>

          {update.image_url && (
            <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
              <Image src={update.image_url || "/placeholder.svg"} alt={update.title} fill className="object-cover" />
            </div>
          )}

          <div className="prose max-w-none">
            <p className="text-xl text-muted-foreground mb-6">{update.excerpt}</p>

            {update.content ? (
              <div className="space-y-4">
                {update.content.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p>No additional content available for this update.</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Updates Section */}
      <section className="w-full py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">More Updates</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This would normally be populated with related updates, but for now we'll use placeholders */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden bg-card">
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Related update"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Related Update {i}</h3>
                  <p className="text-sm text-muted-foreground">This is a placeholder for a related update.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

